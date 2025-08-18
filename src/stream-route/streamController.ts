import { Stream } from 'stream';
import { Request, Response } from 'express';
import axios from 'axios';
import { container, injectable } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';
import { RecordType } from '@map-colonies/types';
import { get } from 'lodash';
import { HttpError } from '@map-colonies/error-types';
import { Logger } from '@map-colonies/js-logger';
import { StorageExplorerManager } from '../common/storage-explorer-manager/storage-explorer-manager';
import { Services } from '../common/constants';

export type GetStreamer = Stream;

@injectable()
export class StreamController {
  private readonly storageExplorerManager: StorageExplorerManager;
  private readonly logger: Logger;

  public constructor() {
    this.storageExplorerManager = container.resolve(StorageExplorerManager);
    this.logger = container.resolve(Services.LOGGER);
  }

  public getStreamFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { path, type } = req.query;

      if (path === undefined || type === undefined) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: 'Missing query parameters' });
        return;
      }

      const ctx = { requestHeaders: req.headers };

      const response = await this.storageExplorerManager.getStreamFile(
        {
          path: path as string,
          type: type as RecordType,
        },
        ctx
      );

      Object.entries(response.headers).forEach(([key, value]) => {
        res.setHeader(key, value as string);
      });

      response.data.pipe(res);

      response.data.on('error', (streamErr: Error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(streamErr.message);
      });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  public writeStreamFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { path, type } = req.query;
      const ctx = { requestHeaders: req.headers };

      if (path === undefined || type === undefined) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: 'Missing query parameters' });
        return;
      }

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
    this.logger.error(err);
    if (axios.isAxiosError(err)) {
      const data = err.response?.data as { error?: { message?: string } } | undefined;
      const axiosMessage: string = data?.error?.message ?? err.message;
      res.status(err.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR).send({ error: axiosMessage });
    } else if (err instanceof HttpError) {
      res.status(err.status).send({ error: err.message });
    } else {
      const message = get(err as Record<string, unknown>, 'message', 'Internal server error');
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: message });
    }
  }
}
