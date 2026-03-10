import { IConfig } from 'config';
import { Logger } from '@map-colonies/js-logger';
import { EstimatedSize, FreeDiskSpace, TriggerExportTask } from '../../graphql/export-layer';
import { GetExportEstimatedSizeInput, GetFreeDiskSpaceInput, TriggerExportTaskInput } from '../../graphql/inputTypes';
import {
  // getEstimatedSize,
  // getFreeDiskSpace,
  triggerExportTask,
} from '../../graphql/MOCKS/export-layer';
import { stringifyParams } from '../../utils';
import { IContext } from '../interfaces';
import { IExportLayerManagerService } from './export-layer.interface';

const TIMEOUT = 2000;
export class ExportLayerManager3D implements IExportLayerManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('exportLayerServices.3d.url');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getEstimatedSize(data: GetExportEstimatedSizeInput, ctx: IContext): Promise<EstimatedSize> {
    this.logger.info(`[ExportLayer][3D][getEstimatedSize] ${stringifyParams(data)}`);

    // MOCK RES
    // const res = await Promise.resolve(getEstimatedSize);

    // return res;

    return new Promise((res, rej) => {
      setTimeout(() => rej('N/A'), TIMEOUT);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getFreeDiskSpace(data: GetFreeDiskSpaceInput, ctx: IContext): Promise<FreeDiskSpace> {
    this.logger.info(`[ExportLayer][3D][getFreeDiskSpace] ${stringifyParams(data)}`);

    // MOCK RES
    // const res = await Promise.resolve(getFreeDiskSpace);

    // return res;

    return new Promise((res, rej) => {
      setTimeout(() => rej('N/A'), TIMEOUT);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async triggerExportTask(data: TriggerExportTaskInput, ctx: IContext): Promise<TriggerExportTask> {
    this.logger.info(`[ExportLayer][3D][triggerExportTask] ${stringifyParams(data)}`);

    // MOCK RES
    const res = await Promise.resolve(triggerExportTask);

    return res;
  }
}
