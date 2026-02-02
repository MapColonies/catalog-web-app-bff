import { Logger } from '@map-colonies/js-logger';
import { requestExecutor } from '../../utils';
import { ActiveJobFindParams, JobActionParams } from '../../graphql/inputTypes';
import { Job, Status } from '../../graphql/job';
import { IConfig, IContext, IService } from '../interfaces';
import JobManagerCommon from './job-manager-common';

export enum RasterJobTypeEnum {
  NEW = 'Ingestion_New',
  UPDATE = 'Ingestion_Update',
  SWAP_UPDATE = 'Ingestion_Swap_Update',
}

export default class JobManagerRaster extends JobManagerCommon {
  public constructor(config: IConfig, logger: Logger) {
    super(config, logger);
  }

  public async abortJobHandler(jobAbortParams: JobActionParams, ctx: IContext): Promise<string> {
    if (this.shouldBeTreatedByRaster(jobAbortParams.type)) {
      const service: IService = this.config.get('ingestionServices.raster');
      await requestExecutor(
        {
          url: `${service.url}/ingestion/${jobAbortParams.id}/abort`,
          exposureType: service.exposureType,
        },
        'POST',
        {},
        ctx
      );
    } else {
      await super.abortJobHandler(jobAbortParams, ctx);
    }
    return 'ok';
  }

  public async resetJobHandler(jobRetryParams: JobActionParams, ctx: IContext): Promise<string> {
    if (this.shouldBeTreatedByRaster(jobRetryParams.type)) {
      const service: IService = this.config.get('ingestionServices.raster');
      await requestExecutor(
        {
          url: `${service.url}/ingestion/${jobRetryParams.id}/retry`,
          exposureType: service.exposureType,
        },
        'PUT',
        {},
        ctx
      );
    } else {
      await super.resetJobHandler(jobRetryParams, ctx);
    }
    return 'ok';
  }

  public async findActiveJob(params: ActiveJobFindParams, ctx: IContext): Promise<Job | null> {
    const res = await requestExecutor(
      {
        url: `${this.service.url}/jobs/find`,
        exposureType: this.service.exposureType,
      },
      'POST',
      {
        data: {
          ...params,
          statuses: [Status.Pending, Status.InProgress, Status.Suspended, Status.Failed],
          types: [RasterJobTypeEnum.NEW, RasterJobTypeEnum.UPDATE, RasterJobTypeEnum.SWAP_UPDATE],
          shouldReturnTasks: false,
          shouldReturnAvailableActions: true,
        },
      },
      ctx
    );
    const resJobs = res.data as Job[];
    return resJobs.length !== 0 ? resJobs[0] : null;
  }

  private shouldBeTreatedByRaster(type: string): boolean {
    return [RasterJobTypeEnum.NEW, RasterJobTypeEnum.UPDATE, RasterJobTypeEnum.SWAP_UPDATE].includes(type as RasterJobTypeEnum);
  }
}
