import { Readable, Stream } from 'stream';
import { Request, Response } from 'express';
import { AxiosError } from 'axios';
import { container, injectable } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';
import { RecordType } from '@map-colonies/types';
import { HttpError } from '@map-colonies/error-types';
import { StorageExplorerManager } from '../common/storage-explorer-manager/storage-explorer-manager';

export type GetStreamer = Stream;

@injectable()
export class StreamController {
  private readonly storageExplorerManager: StorageExplorerManager;

  public constructor() {
    this.storageExplorerManager = container.resolve(StorageExplorerManager);
  }

  public getStreamFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { path, type } = req.query;
      const ctx = { requestHeaders: req.headers };

      const stream = await this.storageExplorerManager.getStreamFile(
        {
          path: path as string,
          type: type as RecordType,
        },
        ctx
      );

      if (stream instanceof Readable) {
        console.log('The response is instance of Readable');
      }

      stream.pipe(res);

      stream.on('error', (err) => {
        res.status(StatusCodes.BAD_REQUEST).send(`Error streaming file: ${JSON.stringify(err)}`);
      });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  public writeStreamFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { path, type } = req.query;
      const ctx = { requestHeaders: req.headers };

      const response = await this.storageExplorerManager.writeStreamFile({ path: path as string, type: type as RecordType }, req, ctx);

      // if(response instanceof Readable){
      //   console.log('The response is instance of Readable')
      // }
      // stream.pipe(res);

      // res.status(response.status).send(response.data);
      res.status(StatusCodes.CREATED).send(response.data);
    } catch (err) {
      // res.status(StatusCodes.INTERNAL_SERVER_ERROR).send((err as HttpError).message);
      res.status((err as AxiosError).response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR).send((err as HttpError).message);
    }
  };
}
