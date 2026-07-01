/* eslint-disable import/first */
// this import must be called before the first import of tsyring
import 'reflect-metadata';
import { createServer } from 'http';
import config from 'config';
import { execute, subscribe } from 'graphql';
import { useServer } from 'graphql-ws/use/ws';
import { container } from 'tsyringe';
import { WebSocketServer } from 'ws';
import { createTerminus } from '@godaddy/terminus';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
//import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { Logger } from '@map-colonies/js-logger';
import { Tracing } from '@map-colonies/telemetry';
import { DEFAULT_SERVER_PORT, IGNORED_INCOMING_TRACE_ROUTES, IGNORED_OUTGOING_TRACE_ROUTES, Services } from './common/constants';
import { getWSResolvers } from './graphql/resolvers';
import { taskSubscriptionTypeDefs } from './graphql/resolvers/task-subscription.resolver';

const tracing = new Tracing('app_tracer', [
  new HttpInstrumentation({ ignoreOutgoingUrls: IGNORED_OUTGOING_TRACE_ROUTES, ignoreIncomingPaths: IGNORED_INCOMING_TRACE_ROUTES }),
  // new ExpressInstrumentation(),
]);

import { getApp } from './app';

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
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
