// this import must be called before the first import of tsyringe
import 'reflect-metadata';
import { createServer } from 'http';
import config from 'config';
import { execute, subscribe } from 'graphql';
import { useServer } from 'graphql-ws/use/ws';
import { container } from 'tsyringe';
import { WebSocketServer } from 'ws';
import { createTerminus } from '@godaddy/terminus';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Logger } from '@map-colonies/js-logger';
import { Tracing } from '@map-colonies/tracing';
import { DEFAULT_SERVER_PORT, IGNORED_INCOMING_TRACE_ROUTES, IGNORED_OUTGOING_TRACE_ROUTES, Services } from './common/constants';
import { getWSResolvers } from './graphql/resolvers';
import { taskSubscriptionTypeDefs } from './graphql/resolvers/task-subscription.resolver';

import { getApp } from './app';

const tracing = new Tracing({
  autoInstrumentationsConfigMap: {
    '@opentelemetry/instrumentation-http': {
      ignoreIncomingRequestHook: (request): boolean =>
        IGNORED_INCOMING_TRACE_ROUTES.some((route) => request.url !== undefined && route.test(request.url)),
      ignoreOutgoingRequestHook: (request): boolean =>
        IGNORED_OUTGOING_TRACE_ROUTES.some((route) => typeof request.path === 'string' && route.test(request.path)),
    },
  },
});

interface IServerConfig {
  port: string;
}

const serverConfig = config.get<IServerConfig>('server');
const port: number = parseInt(serverConfig.port) || DEFAULT_SERVER_PORT;

// Apollo Server 4/5 build() is async (server.start() must run before mounting middleware), so bootstrap asynchronously.
async function bootstrap(): Promise<void> {
  const app = await getApp(tracing);

  const logger = container.resolve<Logger>(Services.LOGGER);

  const httpServer = createServer(app);

  createTerminus(httpServer, { healthChecks: { '/liveness': async () => Promise.resolve() }, onSignal: container.resolve('onSignal') });
  const schema = makeExecutableSchema({
    typeDefs: taskSubscriptionTypeDefs,
    resolvers: getWSResolvers(),
  });
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql-ws',
  });
  useServer(
    {
      schema,
      execute,
      subscribe,
    },
    wsServer
  );

  httpServer.listen(port, () => {
    logger.info(`HTTP GraphQL queries/mutations ready at ${port} /graphql`);
    logger.info(`WebSocket GraphQL subscriptions ready at ${port} /graphql-ws`);
  });
}

void bootstrap();
