import { Logger } from '@map-colonies/js-logger';
import { ActiveJobFindParams, JobActionParams, JobApproveAndResumeData } from '../../graphql/inputTypes';
import { Job, Status } from '../../graphql/job';
import { requestExecutor, stringifyObject } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import JobManagerCommon from './job-manager-common';

export enum RasterIngestionJobType {
  NEW = 'Ingestion_New',
  UPDATE = 'Ingestion_Update',
  SWAP_UPDATE = 'Ingestion_Swap_Update',
}

export enum RasterJobType {
  NEW = RasterIngestionJobType.NEW,
  UPDATE = RasterIngestionJobType.UPDATE,
  SWAP_UPDATE = RasterIngestionJobType.SWAP_UPDATE,
  TILES_SEEDING = 'TilesSeeding',
  EXPORT = 'Export',
}

export default class JobManagerRaster extends JobManagerCommon {
  public constructor(config: IConfig, logger: Logger) {
    super(config, logger);
  }

  public async findActiveJob(params: ActiveJobFindParams, ctx: IContext): Promise<Job | null> {
    this.logger.info(`[JobManager][Raster][findActiveJob] ${stringifyObject(params)}`);
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
          types: Object.values(RasterIngestionJobType),
          shouldReturnTasks: false,
          shouldReturnAvailableActions: true,
        },
      },
      ctx
    );
    const resJobs = res.data as Job[];
    return resJobs.length !== 0 ? resJobs[0] : null;
  }

  public async abortJobHandler(params: JobActionParams, ctx: IContext): Promise<string> {
    this.logger.info(`[JobManager][Raster][abortJobHandler] ${stringifyObject(params)}`);
    if (this.shouldBeTreatedByRaster(params.type)) {
      const service: IService = this.config.get('ingestionServices.raster');
      await requestExecutor(
        {
          url: `${service.url}/ingestion/${params.id}/abort`,
          exposureType: service.exposureType,
        },
        'PUT',
        {},
        ctx
      );
    } else {
      await super.abortJobHandler(params, ctx);
    }
    return 'ok';
  }

  public async resetJobHandler(params: JobActionParams, ctx: IContext): Promise<string> {
    this.logger.info(`[JobManager][Raster][resetJobHandler] ${stringifyObject(params)}`);
    if (this.shouldBeTreatedByRaster(params.type)) {
      const service: IService = this.config.get('ingestionServices.raster');
      await requestExecutor(
        {
          url: `${service.url}/ingestion/${params.id}/retry`,
          exposureType: service.exposureType,
        },
        'PUT',
        {},
        ctx
      );
    } else {
      await super.resetJobHandler(params, ctx);
    }
    return 'ok';
  }

  public async approveAndResumeJobHandler(params: JobActionParams, data: JobApproveAndResumeData, ctx: IContext): Promise<string> {
    this.logger.info(`[JobManager][Raster][approveAndResumeJobHandler] ${stringifyObject(params)}`);
    if (this.shouldBeTreatedByRaster(params.type)) {
      const service: IService = this.config.get('ingestionServices.raster');
      await requestExecutor(
        {
          url: `${service.url}/ingestion/${params.id}/bypass-validation-errors`,
          exposureType: service.exposureType,
        },
        'POST',
        {
          data: {
            allowedValidationErrors: ['resolution'],
            approver: data.approver,
          },
        },
        ctx
      );
    } else {
      await super.approveAndResumeJobHandler(params, data, ctx);
    }
    return 'ok';
  }

  private shouldBeTreatedByRaster(type: string): boolean {
    return Object.values(RasterIngestionJobType).includes(type as RasterIngestionJobType);
  }
}
