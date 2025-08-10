import { Stream } from 'stream';
import { Request, Response } from 'express';
import axios from 'axios';
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

      stream.pipe(res);

      stream.on('error', (streamErr) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send((streamErr as Error).message);
      });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  public writeStreamFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { path, type } = req.query;
      const ctx = { requestHeaders: req.headers };

      const response = await this.storageExplorerManager.writeStreamFile(
        {
          path: path as string,
          type: type as RecordType,
        },
        req,
        ctx
      );

      res.status(StatusCodes.CREATED).send(response.data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  private handleError(err: unknown, res: Response): void {
    if (axios.isAxiosError(err)) {
      const data = err.response?.data as { error?: { message?: string } } | undefined;
      const axiosMessage: string = data?.error?.message ?? err.message;
      res.status(err.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR).send(axiosMessage);
    } else {
      const message = (err as HttpError)?.message ?? 'Internal server error';
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(message);
    }
  }
}
