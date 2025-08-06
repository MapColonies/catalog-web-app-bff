import { Stream } from 'stream';
import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import { RecordType } from '@map-colonies/types';
import { StatusCodes } from 'http-status-codes';
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
      const file = req.file;

      const stream = await this.storageExplorerManager.writeStreamFile({ path: path as string, type: type as RecordType }, file, ctx);

      req.pipe(stream);

      stream.on('error', (err) => {
        res.status(StatusCodes.BAD_REQUEST).send(`Error streaming file: ${JSON.stringify(err)}`);
      });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  };
}
