import { Request, Response, NextFunction } from 'express';
import { container, injectable } from 'tsyringe';
import { Stream } from 'stream';
import { StorageExplorerManager } from '../common/storage-explorer-manager/storage-explorer-manager';
import { RecordType } from '@map-colonies/types';

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
      const ctx = req.body;

      const stream = await this.storageExplorerManager.getStreamFile(
        {
          path: path as string,
          type: type as RecordType,
        },
        ctx
      );

      stream.pipe(res);

      stream.on('error', (err) => {
        res.status(400).send('Error streaming file: File not found');
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  public writeStreamFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { path, type } = req.query;
      const ctx = { requestHeaders: req.headers };
      const file = req.file;

      const stream = await this.storageExplorerManager.writeStreamFile({ path: path as string, type: type as RecordType }, file, ctx);

      stream.pipe(res);

      stream.on('error', (err) => {
        res.status(400).send('Error streaming file: File not found');
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };
}
