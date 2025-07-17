import { Router } from 'express';
import { FactoryFunction } from 'tsyringe';
import { StreamController } from './streamController';

const streamFileRouterFactory: FactoryFunction<Router> = (dependencyContainer) => {
  const router = Router();
  const controller = dependencyContainer.resolve(StreamController);

  router.get('/api/files', controller.getStreamFile);
  // router.get('/:longitude/:latitude', controller.getHeight);

  return router;
};

export const STREAM_FILE_ROUTER_SYMBOL = Symbol('streamFileRouterFactory');

export { streamFileRouterFactory };
