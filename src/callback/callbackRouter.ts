import { Router } from 'express';
import { CallbackController } from './callbackController';

export const callbackRouter = (): Router => {
  const router = Router();
  const controller = new CallbackController();

  router.post('/task', (req, res, next) => {
    controller.publishTaskUpdate(req, res, next).catch(next);
  });

  return router;
};
