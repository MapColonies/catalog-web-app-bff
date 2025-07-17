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

  public getStreamFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pathSuffix, type } = req.query;
      const ctx = req.body;

      const fileContent = await this.storageExplorerManager.getStreamFile({ pathSuffix: pathSuffix as string, type: type as RecordType }, ctx);

      fileContent.pipe(res);

      next();
    } catch (err) {
      next(err);
    }
  };
}
