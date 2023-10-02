import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { middleware as OpenApiMiddleware } from 'express-openapi-validator';
import { GraphQLError, printSchema } from 'graphql';
import { get } from 'lodash';
import { inject, injectable } from 'tsyringe';
import { buildSchemaSync } from 'type-graphql';
//import { getErrorHandlerMiddleware } from '@map-colonies/error-express-handler';
import httpLogger from '@map-colonies/express-access-log-middleware';
import { Logger } from '@map-colonies/js-logger';
import { OpenapiViewerRouter, OpenapiRouterConfig } from '@map-colonies/openapi-express-viewer';
import { Services } from './common/constants';
import { IConfig, IContext } from './common/interfaces';
import { getResolvers } from './graphql/resolvers';

@injectable()
export class ServerBuilder {
  private readonly serverInstance: express.Application;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.serverInstance = express();
  }

  public build(): express.Application {
    this.registerPreRoutesMiddleware();
    this.buildRoutes();
    this.buildGraphQL();
    this.registerPostRoutesMiddleware();

    return this.serverInstance;
  }

  private buildDocsRoutes(): void {
    const openapiRouter = new OpenapiViewerRouter(this.config.get<OpenapiRouterConfig>('openapiConfig'));
    openapiRouter.setup();
    this.serverInstance.use(this.config.get<string>('openapiConfig.basePath'), openapiRouter.getRouter());
  }

  private buildRoutes(): void {
    this.buildDocsRoutes();
  }

  private registerPreRoutesMiddleware(): void {
    // @ts-expect-error the signature is wrong
    this.serverInstance.use(httpLogger({ logger: this.logger }));

    this.serverInstance.use(cors());

    if (this.config.get<boolean>('server.response.compression.enabled')) {
      this.serverInstance.use(compression(this.config.get<compression.CompressionFilter>('server.response.compression.options')));
    }

    this.serverInstance.use(bodyParser.json(this.config.get<bodyParser.Options>('server.request.payload')));

    const ignorePathRegex = new RegExp(`^${this.config.get<string>('openapiConfig.basePath')}/.*`, 'i');
    const apiSpecPath = this.config.get<string>('openapiConfig.filePath');
    this.serverInstance.use(OpenApiMiddleware({ apiSpec: apiSpecPath, validateRequests: true, ignorePaths: ignorePathRegex }));
  }

  private registerPostRoutesMiddleware(): void {
    // this.serverInstance.use(getErrorHandlerMiddleware());
  }

  private buildGraphQL(): void {
    const resolvers = getResolvers();
    const schema = buildSchemaSync({ resolvers });
    const server = new ApolloServer({
      schema,
      context: ({ req }): IContext => ({
        requestHeaders: req.headers,
      }),
      formatError: (formattedError: GraphQLError) => {
        const serverResponse = get(formattedError, 'extensions.exception.response') as Record<string, unknown>;
        if (get(formattedError, 'extensions.exception.isAxiosError') === true && serverResponse.data) {
          const resMessage = (get(serverResponse, 'data.message') as string | undefined) ?? '';

          return {
            ...formattedError,
            serverResponse: {
              data: { ...(serverResponse.data as Record<string, unknown>), message: `${serverResponse.statusText as string} : ${resMessage}` },
              status: serverResponse.status,
              statusText: serverResponse.statusText,
            },
          };
        }
        return formattedError;
      },
    });
    this.logger.info(`Started GraphQL server with schema: ${printSchema(schema)}`);
    server.applyMiddleware({ app: this.serverInstance });
  }
}
