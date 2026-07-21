import { container } from 'tsyringe';
import config from 'config';
import { PubSub } from 'graphql-subscriptions';
import { trace } from '@opentelemetry/api';
import { Tracing } from '@map-colonies/tracing';
import { getOtelMixin } from '@map-colonies/tracing-utils';
import jsLogger, { LoggerOptions } from '@map-colonies/js-logger';
import { Services } from './common/constants';

function registerExternalValues(tracing: Tracing): void {
  const loggerConfig = config.get<LoggerOptions>('logger');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const logger = jsLogger({ ...loggerConfig, prettyPrint: false, mixin: getOtelMixin() });
  container.register(Services.CONFIG, { useValue: config });
  container.register(Services.LOGGER, { useValue: logger });
  container.registerInstance(Services.PUBSUB, new PubSub());

  tracing.start();
  const tracer = trace.getTracer('app_tracer');
  container.register(Services.TRACER, { useValue: tracer });

  container.register('onSignal', {
    useValue: async (): Promise<void> => {
      await tracing.stop();
    },
  });
}

export { registerExternalValues };
