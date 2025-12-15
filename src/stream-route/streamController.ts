import axios from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Readable, Stream } from 'stream';
import { container, injectable } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/types';
import { Services } from '../common/constants';
import { StorageExplorerManager } from '../common/storage-explorer-manager/storage-explorer-manager';

export type GetStreamer = Stream;

@injectable()
export class StreamController {
  private readonly storageExplorerManager: StorageExplorerManager;
  private readonly logger: Logger;

  public constructor() {
    this.storageExplorerManager = container.resolve(StorageExplorerManager);
    this.logger = container.resolve(Services.LOGGER);
  }

  public getZipShapefile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { folder, name, type } = req.query;

      if (folder === undefined || name === undefined || type === undefined) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: 'Missing query parameters' });
        return;
      }

      const ctx = { requestHeaders: req.headers };

      const response = await this.storageExplorerManager.getZipShapefile(
        {
          folder: folder as string,
          name: name as string,
          type: type as RecordType,
        },
        ctx
      );

      Object.entries(response.headers).forEach(([key, value]) => {
        res.setHeader(key, value as string);
      });

      response.data.on('error', (streamErr) => {
        this.logger.error('[getZipShapefile] Stream error: ', streamErr.message);
        res.destroy(streamErr);
      });

      response.data.pipe(res);
    } catch (err) {
      await this.handleError(err, res);
    }
  };

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

      response.data.on('error', (streamErr) => {
        this.logger.error('Stream error: ', streamErr.message);
        res.destroy(streamErr);
      });

      response.data.pipe(res);
    } catch (err) {
      await this.handleError(err, res);
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
      await this.handleError(err, res);
    }
  };

  private async handleError(err: unknown, res: Response): Promise<void> {
    this.logger.error(err);

    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      const data: unknown = err.response?.data;
      let errorMessage: string = err.message;

      if (data !== undefined && this.isReadableStream(data)) {
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of data) {
            chunks.push(chunk);
          }
          const buffer = Buffer.concat(chunks);
          const parsed: Record<string, unknown> = JSON.parse(buffer.toString('utf-8')) as Record<string, unknown>;

          errorMessage = (parsed.message as string | undefined) ?? JSON.stringify(parsed);
        } catch (streamParseErr) {
          this.logger.error('Failed to parse stream error response:', streamParseErr);
          errorMessage = 'Unexpected response stream received';
        }
      } else if (typeof data === 'string') {
        try {
          const parsed: Record<string, unknown> = JSON.parse(data) as Record<string, unknown>;
          errorMessage = (parsed.message as string | undefined) ?? data;
        } catch {
          errorMessage = data;
        }
      } else if (typeof data === 'object' && data !== null) {
        errorMessage = (data as { message: string | undefined }).message ?? err.message;
      }

      res.status(status).send({ message: errorMessage });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    }
  }

  private isReadableStream(obj: unknown): obj is Readable {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof (obj as Record<string, unknown>).pipe === 'function' &&
      typeof (obj as { [Symbol.asyncIterator]: () => AsyncIterator<unknown> })[Symbol.asyncIterator] === 'function'
    );
  }
}
