import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { EstimatedSize, FreeDiskSpace, TriggerExportTask } from '../../graphql/export-layer';
import { GetExportEstimatedSizeInput, GetFreeDiskSpaceInput, TriggerExportTaskInput } from '../../graphql/inputTypes';
import { getEstimatedSize, getFreeDiskSpace, triggerExportTask } from '../../graphql/MOCKS/export-layer';
import { IContext } from '../interfaces';
import { IExportLayerManagerService } from './export-layer.interface';

export class ExportLayerManager3D implements IExportLayerManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('exportLayerServices.3d.url');
  }

  public async getEstimatedSize(data: GetExportEstimatedSizeInput, ctx: IContext): Promise<EstimatedSize> {
    this.logger.info(`[ExportLayerManager3D][getEstimatedSize] estimating export size with data: ${JSON.stringify(data)}.`);

    // MOCK RES
    const res = await Promise.resolve(getEstimatedSize);

    return res;
  }

  public async getFreeDiskSpace(data: GetFreeDiskSpaceInput, ctx: IContext): Promise<FreeDiskSpace> {
    this.logger.info(`[ExportLayerManager3D][getFreeDiskSpace] getting free disk space for domain.`);

    // MOCK RES
    const res = await Promise.resolve(getFreeDiskSpace);

    return res;
  }

  public async triggerExportTask(data: TriggerExportTaskInput, ctx: IContext): Promise<TriggerExportTask> {
    this.logger.info(`[ExportLayerManager3D][triggerExportTask] triggering export task with data: ${JSON.stringify(data)}.`);

    // MOCK RES
    const res = await Promise.resolve(triggerExportTask);

    return res;
  }
}