import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { middleware as OpenApiMiddleware } from 'express-openapi-validator';
import * as fs from 'fs';
import { GraphQLError, printSchema } from 'graphql';
import { get, isEmpty } from 'lodash';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { buildSchemaSync } from 'type-graphql';
import httpLogger from '@map-colonies/express-access-log-middleware';
import { Logger } from '@map-colonies/js-logger';
import { OpenapiViewerRouter, OpenapiRouterConfig } from '@map-colonies/openapi-express-viewer';
import { callbackRouter } from './callback/callbackRouter';
import { Services } from './common/constants';
import { IConfig, IContext } from './common/interfaces';
import { getResolvers } from './graphql/resolvers';
import { streamingRouter } from './streaming/streamingRouter';

@injectable()
export class ServerBuilder {
  private readonly serverInstance: express.Application;
  private openapiSpecFolder: string;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.serverInstance = express();
    const serverBasePath = this.config.get<string>('server.basePath');
    this.openapiSpecFolder = serverBasePath ? '/tmp' : '';
  }

  public build(): express.Application {
    this.registerPreRoutesMiddleware();
    this.buildRoutes();
    this.setupGraphQL();
    this.registerPostRoutesMiddleware();

    return this.serverInstance;
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
    const serverBasePath = this.config.get<string>('server.basePath');
    const spec = fs.readFileSync(apiSpecPath, 'utf8').replace(/\${BASE_PATH}/g, serverBasePath || "''");
    fs.writeFileSync(path.join(this.openapiSpecFolder, apiSpecPath), spec, 'utf8');
    this.serverInstance.use(OpenApiMiddleware({ apiSpec: apiSpecPath, validateRequests: true, ignorePaths: ignorePathRegex }));
  }

  private buildRoutes(): void {
    this.buildRestRoutes();
    this.buildDocsRoutes();
  }

  private buildRestRoutes(): void {
    this.serverInstance.use('/api', streamingRouter());
    this.serverInstance.use('/callback', callbackRouter());
  }

  private buildDocsRoutes(): void {
    const openapiConfig: OpenapiRouterConfig = { ...this.config.get<OpenapiRouterConfig>('openapiConfig') };
    openapiConfig.filePath = path.join(this.openapiSpecFolder, openapiConfig.filePath);
    const openapiRouter = new OpenapiViewerRouter(openapiConfig);
    openapiRouter.setup();
    this.serverInstance.use(this.config.get<string>('openapiConfig.basePath'), openapiRouter.getRouter());
  }

  private setupGraphQL(): void {
    const resolvers = getResolvers();
    const schema = buildSchemaSync({ resolvers });
    const server = new ApolloServer({
      schema,
      context: ({ req }): IContext => ({
        requestHeaders: req.headers,
      }),
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      formatError: (formattedError: GraphQLError) => {
        const serverResponse = get(formattedError, 'extensions.exception.response') as Record<string, unknown>;
        if (get(formattedError, 'extensions.exception.isAxiosError') === true && !isEmpty(serverResponse.data)) {
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

  private registerPostRoutesMiddleware(): void {
    // this.serverInstance.use(getErrorHandlerMiddleware());
  }
}
