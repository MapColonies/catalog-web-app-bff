import { Router } from 'express';
import { CallbackController } from './callbackController';

export const callbackRouter = (): Router => {
  const router = Router();
  const controller = new CallbackController();

  router.post('/task', controller.publishTaskUpdate);

  return router;
};
