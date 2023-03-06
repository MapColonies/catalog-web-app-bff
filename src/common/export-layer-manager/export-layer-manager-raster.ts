import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { IContext } from '../interfaces';
import { IExportLayerManagerService } from './export-layer.interface';

export class ExportLayerManagerRaster implements IExportLayerManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('exportLayerServices.raster.url');
  }

  public async getEstimatedSize(data: unknown, ctx: IContext): Promise<unknown> {
    this.logger.info(`[ExportLayerManagerRaster][getEstimatedSize] estimating export size with data: ${JSON.stringify(data)}.`);

    const res = await Promise.resolve();

    return res;
  }

  public async getFreeDiskSpace(data: unknown, ctx: IContext): Promise<unknown> {
    this.logger.info(`[ExportLayerManagerRaster][getFreeDiskSpace] getting free disk space for domain.`);

    const res = await Promise.resolve();

    return res;
  }

  public async triggerExportTask(data: unknown, ctx: IContext): Promise<unknown> {
    this.logger.info(`[ExportLayerManagerRaster][triggerExportTask] triggering export task with data: ${JSON.stringify(data)}.`);

    const res = await Promise.resolve();

    return res;
  }
}
