import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { IContext } from '../interfaces';
import { IExportLayerManagerService } from './export-layer.interface';

export class ExportLayerManager3D implements IExportLayerManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('exportLayerServices.3d.url');
  }

  public async getEstimatedSize(data: unknown, ctx: IContext): Promise<unknown> {
    this.logger.info(`[ExportLayerManager3D][getEstimatedSize] estimating export size with data: ${JSON.stringify(data)}.`);

    const res = await Promise.resolve();

    return res;
  }

  public async getFreeDiskSpace(data: unknown, ctx: IContext): Promise<unknown> {
    this.logger.info(`[ExportLayerManager3D][getFreeDiskSpace] getting free disk space for domain.`);

    const res = await Promise.resolve();

    return res;
  }

  public async triggerExportTask(data: unknown, ctx: IContext): Promise<unknown> {
    this.logger.info(`[ExportLayerManager3D][triggerExportTask] triggering export task with data: ${JSON.stringify(data)}.`);

    const res = await Promise.resolve();

    return res;
  }
}
