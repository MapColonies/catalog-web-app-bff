import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { StreamController } from './streamController';
/* FOR UPLOAD API */
// import multer from 'multer';

export const streamFileRouter = (): Router => {
  const router = Router();
  const controller = new StreamController();

  router.get('/file', (req, res) => {
    controller.getStreamFile(req, res).catch((err) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
  });
  /* FOR UPLOAD API */
  // const upload = multer();
  // router.post('/file', upload.single('file'), controller.writeStreamFile);

  return router;
};
