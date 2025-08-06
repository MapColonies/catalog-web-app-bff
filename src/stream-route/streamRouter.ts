import express, { Router } from 'express';
import { FactoryFunction } from 'tsyringe';
import { StreamController } from './streamController';
import multer from 'multer';

const streamFileRouterFactory: FactoryFunction<Router> = (dependencyContainer) => {
  const router = Router();
  const controller = dependencyContainer.resolve(StreamController);
  const upload = multer();

  router.get('/file', controller.getStreamFile);
  router.post('/file', upload.single('file'), controller.writeStreamFile);

  return router;
};

export const STREAM_FILE_ROUTER_SYMBOL = Symbol('streamFileRouterFactory');

export { streamFileRouterFactory };
