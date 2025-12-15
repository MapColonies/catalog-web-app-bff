import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { middleware as OpenApiMiddleware } from 'express-openapi-validator';
import { GraphQLError, printSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { get, isEmpty } from 'lodash';
import { container, inject, injectable } from 'tsyringe';
import { buildSchemaSync } from 'type-graphql';
import httpLogger from '@map-colonies/express-access-log-middleware';
import { Logger } from '@map-colonies/js-logger';
import { OpenapiViewerRouter, OpenapiRouterConfig } from '@map-colonies/openapi-express-viewer';
import { CallBack, Services, statusMap } from './common/constants';
import { IConfig, IContext } from './common/interfaces';
import { Status } from './graphql/job';
import { getResolvers } from './graphql/resolvers';
import { streamFileRouter } from './stream-route/streamRouter';

@injectable()
export class ServerBuilder {
  private readonly serverInstance: express.Application;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.serverInstance = express();
  }

  public build(): express.Application {
    this.registerPreRoutesMiddleware();
    this.buildRestRoutes();
    this.buildDocsRoutes();
    this.setupGraphQL();
    this.registerPostRoutesMiddleware();

    return this.serverInstance;
  }

  private registerPreRoutesMiddleware(): void {
    this.serverInstance.use(httpLogger({ logger: this.logger as unknown as any }));
    this.serverInstance.use(cors());
    if (this.config.get<boolean>('server.response.compression.enabled')) {
      this.serverInstance.use(compression(this.config.get<compression.CompressionFilter>('server.response.compression.options')));
    }
    this.serverInstance.use(bodyParser.json(this.config.get<bodyParser.Options>('server.request.payload')));
    const ignorePathRegex = new RegExp(`^${this.config.get<string>('openapiConfig.basePath')}/.*`, 'i');
    const apiSpecPath = this.config.get<string>('openapiConfig.filePath');
    this.serverInstance.use(OpenApiMiddleware({ apiSpec: apiSpecPath, validateRequests: true, ignorePaths: ignorePathRegex }));
  }

  private buildRestRoutes(): void {
    this.serverInstance.use('/api', streamFileRouter());
    // this.serverInstance.use('/callback', callbackRouter());
    this.buildJobRoutes();
  }

  private buildJobRoutes(): void {
    const pubSub = container.resolve<PubSub>(Services.PUBSUB);
    this.serverInstance.post('/callback', async (req: express.Request, res: express.Response) => {
      const payload = req.body as CallBack<unknown>;
      const statusKey = (payload.status ?? Status.Pending) as Status;
      await pubSub.publish('TASK_UPDATE', {
        ...payload,
        status: statusMap[statusKey],
      });
      res.status(200).json({ message: 'Task update received' });
    });
  }

  private buildDocsRoutes(): void {
    const openapiRouter = new OpenapiViewerRouter(this.config.get<OpenapiRouterConfig>('openapiConfig'));
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
