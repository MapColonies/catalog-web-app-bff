import * as fs from 'fs';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { unwrapResolverError } from '@apollo/server/errors';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { middleware as OpenApiMiddleware } from 'express-openapi-validator';
import { GraphQLFormattedError, printSchema } from 'graphql';
import { get, isEmpty } from 'lodash';
import { LevelWithSilent } from 'pino';
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
  private readonly openapiSpecFolder: string;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.serverInstance = express();
    const serverBasePath = this.config.get<string>('server.basePath');
    this.openapiSpecFolder = serverBasePath ? '/tmp' : '';
  }

  public async build(): Promise<express.Application> {
    this.registerPreRoutesMiddleware();
    this.buildRoutes();
    await this.setupGraphQL();
    this.registerPostRoutesMiddleware();

    return this.serverInstance;
  }

  private registerPreRoutesMiddleware(): void {
    const customLogLevel = (_req: Record<string, unknown>, res: { statusCode: number | undefined }, err: unknown): LevelWithSilent => {
      return err !== undefined ||
        (res.statusCode !== undefined &&
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          res.statusCode >= 400)
        ? 'error'
        : 'debug';
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.serverInstance.use(httpLogger({ logger: this.logger, customLogLevel }));
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

  private async setupGraphQL(): Promise<void> {
    const resolvers = getResolvers();
    const schema = buildSchemaSync({ resolvers });
    const server = new ApolloServer<IContext>({
      schema,
      // Apollo Server 4/5 removed `extensions.exception`; unwrap the resolver error to read the original (axios) error.
      formatError: (formattedError, error): GraphQLFormattedError => {
        const originalError = unwrapResolverError(error);
        const serverResponse = get(originalError, 'response') as Record<string, unknown> | undefined;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (get(originalError, 'isAxiosError') === true && serverResponse !== undefined && !isEmpty(serverResponse.data)) {
          const resMessage = (get(serverResponse, 'data.message') as string | undefined) ?? '';
          return {
            ...formattedError,
            serverResponse: {
              data: { ...(serverResponse.data as Record<string, unknown>), message: `${serverResponse.statusText as string} : ${resMessage}` },
              status: serverResponse.status,
              statusText: serverResponse.statusText,
            },
          } as GraphQLFormattedError;
        }
        return formattedError;
      },
    });
    // Apollo Server 4/5 requires an explicit start() before the express middleware can be mounted.
    await server.start();
    this.logger.info(`Started GraphQL server with schema: ${printSchema(schema)}`);
    this.serverInstance.use(
      '/graphql',
      expressMiddleware(server, {
        context: ({ req }): Promise<IContext> => Promise.resolve({ requestHeaders: req.headers }),
      })
    );
  }

  private registerPostRoutesMiddleware(): void {
    // this.serverInstance.use(getErrorHandlerMiddleware());
  }
}
