import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { EstimatedSize, FreeDiskSpace, TriggerExportTask } from '../../graphql/export-layer';
import { GetExportEstimatedSizeInput, GetFreeDiskSpaceInput, TriggerExportTaskInput } from '../../graphql/inputTypes';
// import { getEstimatedSize, getFreeDiskSpace, triggerExportTask } from '../../graphql/MOCKS/export-layer';
import { requestHandlerWithToken } from '../../utils';
import { IContext } from '../interfaces';
import { IExportLayerManagerService } from './export-layer.interface';

export class ExportLayerManagerRaster implements IExportLayerManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('exportLayerServices.raster.url');
  }

  public async getEstimatedSize(data: GetExportEstimatedSizeInput, ctx: IContext): Promise<EstimatedSize> {
    this.logger.info(`[ExportLayerManagerRaster][getEstimatedSize] estimating export size with data: ${JSON.stringify(data)}.`);

    // MOCK RES
    // const res = await Promise.resolve(getEstimatedSize);

    return new Promise((res, rej) => {
      setTimeout(() => rej('N/A'), 1000);
    });
  }

  public async getFreeDiskSpace(data: GetFreeDiskSpaceInput, ctx: IContext): Promise<FreeDiskSpace> {
    this.logger.info(`[ExportLayerManagerRaster][getFreeDiskSpace] getting free disk space for domain.`);

    const res = await requestHandlerWithToken(`${this.serviceURL}/storage`, 'GET', {}, ctx);
    const resData = res.data as Record<string, unknown>;

    return {
      freeDiskSpaceBytes: resData.free as number,
    };

    // // MOCK RES
    // const res = await Promise.resolve(getFreeDiskSpace);

    // return new Promise((res, rej) => {
    //   setTimeout(() => rej('N/A'), 2000);
    // });
  }

  public async triggerExportTask(data: TriggerExportTaskInput, ctx: IContext): Promise<TriggerExportTask> {
    this.logger.info(`[ExportLayerManagerRaster][triggerExportTask] triggering export task with data: ${JSON.stringify(data)}.`);

    const res = await requestHandlerWithToken(
      `${this.serviceURL}/create/roi`,
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
      // jobId: resData.jobRequestId as string,
      jobId: resData.jobId as string,
    };

    // MOCK RES
    // const res = await Promise.resolve(triggerExportTask);

    // return res;
  }
}
