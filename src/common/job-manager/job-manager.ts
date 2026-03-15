import { isArray } from 'lodash';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { Domain } from '../../graphql/domain';
import { ActiveJobFindParams, JobActionParams, JobsSearchParams, JobUpdateData, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
import { addRasterJobActions } from '../../utils';
import { Services } from '../constants';
import { IConfig, IContext } from '../interfaces';
import { IJobManagerService } from './job-manager.interface';
import JobManagerCommon from './job-manager-common';
import JobManagerRaster from './job-manager-raster';

enum JobManagerServiceType {
  RASTER = 'RASTER',
  COMMON = 'COMMON',
}

type JobManagerType = Omit<IJobManagerService, 'transformRecordToEntity'>;
type JobServices = Record<JobManagerServiceType, IJobManagerService>;

@singleton()
export class JobManager implements JobManagerType {
  private readonly jobrServices: JobServices = {} as JobServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.jobrServices.RASTER = new JobManagerRaster(this.config, this.logger);
    this.jobrServices.COMMON = new JobManagerCommon(this.config, this.logger);
  }

  public async getJobs(ctx: IContext, params?: JobsSearchParams): Promise<Job[]> {
    const jobsData = await this.jobrServices.COMMON.getJobs(ctx, params);
    jobsData.forEach((job) => {
      switch (job.domain) {
        case Domain.RASTER:
          addRasterJobActions(job);
          break;
        case Domain['3D']:
          break;
        default:
          break;
      }
    });
    return jobsData;
  }

  public async getJob(id: string, ctx: IContext): Promise<Job> {
    const jobsData = await this.jobrServices.COMMON.getJob(id, ctx);
    return jobsData;
  }

  public async findActiveJob(params: ActiveJobFindParams, ctx: IContext): Promise<Job | null> {
    const jobManagerServiceType = this.convertStringToJobManagerServiceType(params.domain);
    const jobManagerInstance = this.getManagerInstance(jobManagerServiceType);
    const res = await jobManagerInstance.findActiveJob(params, ctx);
    return res;
  }

  public transformRecordsToEntity(records: (Job | Task)[] | Job | Task): (Job | Task | null)[] | Job | Task | null {
    return isArray(records)
      ? records.map((record) => {
          return this.jobrServices.COMMON.transformRecordToEntity(record);
        })
      : this.jobrServices.COMMON.transformRecordToEntity(records);
  }

  public async updateJobHandler(id: string, params: JobUpdateData, ctx: IContext): Promise<string> {
    const response = await this.jobrServices.COMMON.updateJobHandler(id, params, ctx);
    return response;
  }

  public async abortJobHandler(params: JobActionParams, ctx: IContext): Promise<string> {
    const jobManagerServiceType = this.convertStringToJobManagerServiceType(params.domain);
    const jobManagerInstance = this.getManagerInstance(jobManagerServiceType);
    const response = await jobManagerInstance.abortJobHandler(params, ctx);
    return response;
  }

  public async resetJobHandler(params: JobActionParams, ctx: IContext): Promise<string> {
    const jobManagerServiceType = this.convertStringToJobManagerServiceType(params.domain);
    const jobManagerInstance = this.getManagerInstance(jobManagerServiceType);
    const response = await jobManagerInstance.resetJobHandler(params, ctx);
    return response;
  }

  public async getTasks(params: TasksSearchParams, ctx: IContext): Promise<Task[]> {
    const response = await this.jobrServices.COMMON.getTasks(params, ctx);
    return response;
  }

  public async findTasks(params: TasksSearchParams, ctx: IContext): Promise<Task[]> {
    const response = await this.jobrServices.COMMON.findTasks(params, ctx);
    return response;
  }

  private convertStringToJobManagerServiceType(str: string): JobManagerServiceType {
    if (str === JobManagerServiceType.RASTER) {
      return JobManagerServiceType.RASTER;
    } else {
      return JobManagerServiceType.COMMON;
    }
  }

  private getManagerInstance(jobManagerServiceType: JobManagerServiceType): IJobManagerService {
    switch (jobManagerServiceType) {
      case 'COMMON':
        return this.jobrServices.COMMON;
      case 'RASTER':
        return this.jobrServices.RASTER;
      default:
        return this.jobrServices.COMMON;
    }
  }
}
