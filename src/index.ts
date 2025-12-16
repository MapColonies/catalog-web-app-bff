/* eslint-disable import/first */
// this import must be called before the first import of tsyring
import 'reflect-metadata';
import { execute, subscribe } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { container } from 'tsyringe';
import * as WebSocket from 'ws';
import { get } from 'config';
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

const serverConfig = get<IServerConfig>('server');
const port: number = parseInt(serverConfig.port) || DEFAULT_SERVER_PORT;

const app = getApp(tracing);

const logger = container.resolve<Logger>(Services.LOGGER);
createTerminus(app, { healthChecks: { '/liveness': true }, onSignal: container.resolve('onSignal') });

const httpServer = createServer(app);
const schema = makeExecutableSchema({
  typeDefs: taskSubscriptionTypeDefs,
  resolvers: getWSResolvers(),
});
const wsServer = new WebSocket.Server({
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
