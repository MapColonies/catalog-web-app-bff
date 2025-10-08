import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { StreamController } from './streamController';

export const streamFileRouter = (): Router => {
  const router = Router();
  const controller = new StreamController();

  router.get('/file', (req, res) => {
    controller.getStreamFile(req, res).catch((err) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
  });
  router.get('/zipshape', (req, res) => {
    controller.getZipShapefile(req, res).catch((error) => {
      res.send(error);
    });
  });
  // router.post('/file', (req, res) => {
  //   controller.writeStreamFile(req, res).catch((err) => {
  //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  //   });
  // });

  return router;
};
