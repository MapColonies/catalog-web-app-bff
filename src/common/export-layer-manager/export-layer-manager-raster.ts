import { IConfig } from 'config';
import { Logger } from '@map-colonies/js-logger';
import { EstimatedSize, FreeDiskSpace, TriggerExportTask } from '../../graphql/export-layer';
import { GetExportEstimatedSizeInput, GetFreeDiskSpaceInput, TriggerExportTaskInput } from '../../graphql/inputTypes';
// import { getEstimatedSize, getFreeDiskSpace, triggerExportTask } from '../../graphql/MOCKS/export-layer';
import { requestExecutor, stringifyObject } from '../../utils';
import { IContext, IService } from '../interfaces';
import { IExportLayerManagerService } from './export-layer.interface';

const TIMEOUT = 2000;
export class ExportLayerManagerRaster implements IExportLayerManagerService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('exportLayerServices.raster');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getEstimatedSize(data: GetExportEstimatedSizeInput, ctx: IContext): Promise<EstimatedSize> {
    this.logger.info(`[ExportLayer][Raster][getEstimatedSize] ${stringifyObject(data)}`);
    return new Promise((res, rej) => {
      setTimeout(() => rej('N/A'), TIMEOUT);
    });
  }

  public async getFreeDiskSpace(data: GetFreeDiskSpaceInput, ctx: IContext): Promise<FreeDiskSpace> {
    this.logger.info(`[ExportLayer][Raster][getFreeDiskSpace] ${stringifyObject(data)}`);
    const res = await requestExecutor(
      {
        url: `${this.service.url}/storage`,
        exposureType: this.service.exposureType,
      },
      'GET',
      {},
      ctx
    );
    const resData = res.data as Record<string, unknown>;
    return {
      freeDiskSpaceBytes: resData.free as number,
    };
  }

  public async triggerExportTask(data: TriggerExportTaskInput, ctx: IContext): Promise<TriggerExportTask> {
    this.logger.info(`[ExportLayer][Raster][triggerExportTask] ${stringifyObject(data)}`);
    const res = await requestExecutor(
      {
        url: `${this.service.url}/export`,
        exposureType: this.service.exposureType,
      },
      'POST',
      {
        data: {
          ...data.parameters,
          dbId: data.catalogRecordID,
          roi: (data.parameters.isFullLayerExport as boolean) ? undefined : data.parameters.roi,
          callbackURLs: [],
        },
      },
      ctx
    );
    const resData = res.data as Record<string, unknown>;
    return {
      jobId: resData.jobId as string,
    };
  }
}
