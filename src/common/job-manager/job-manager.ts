import { Logger } from '@map-colonies/js-logger';
import { inject, singleton } from 'tsyringe';
import { Services } from '../constants';
import { IConfig, IContext } from '../interfaces';
import { JobsSearchParams, JobUpdateData, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
import { IJobManagerService } from './job-manager.interface';
import JobManagerCommon from './job-manager-common';
import { ProductType } from '@map-colonies/mc-model-types';

type JobManagerType = Omit<IJobManagerService, 'transformRecordToEntity'>;
@singleton()
export class JobManager implements JobManagerType {
  private readonly jobManager: IJobManagerService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    const commonJobManager = new JobManagerCommon(config, logger);

    this.jobManager = commonJobManager;
  }

  public async getJobs(ctx: IContext, params?: JobsSearchParams): Promise<Job[]> {
    this.logger.info(`[JobManager][getJobs] Fetching jobs with params ${JSON.stringify(params)}`);

    const jobsData = await this.jobManager.getJobs(ctx, params);
    // return jobsData;

    // Temporarily
    return this.temporarilySetFieldValues(jobsData);
  }

  public transformRecordsToEntity(cswArray: Job[]): Job[] {
    return cswArray.map((job) => {
      return this.jobManager.transformRecordToEntity(job);
    });
  }

  public async updateJobHandler(id: string, params: JobUpdateData, ctx: IContext): Promise<string> {
    this.logger.info(`[JobManager][updateJobHandler] Updating job with params ${JSON.stringify(params)}`);

    const response = await this.jobManager.updateJobHandler(id, params, ctx);
    return response;
  }

  public async abortJobHandler(id: string, ctx: IContext): Promise<string> {
    this.logger.info(`[JobManager][abortJobHandler] Aborting job with id ${id}`);

    const response = await this.jobManager.abortJobHandler(id, ctx);
    return response;
  }

  public async resetJobHandler(id: string, ctx: IContext): Promise<string> {
    this.logger.info(`[JobManager][resetJobHandler] Aborting job with id ${id}`);

    const response = await this.jobManager.resetJobHandler(id, ctx);
    return response;
  }

  public async getTasks(params: TasksSearchParams, ctx: IContext): Promise<Task[]> {
    this.logger.info(`[JobManager][getTasks] Fetching tasks with params ${JSON.stringify(params)}`);

    const response = await this.jobManager.getTasks(params, ctx);
    return response;
  }

  // Only until isResettable and isAbortable fields will be implemented.
  private temporarilySetFieldValues(jobs: Job[]): Job[] {
    return jobs.map((job) => ({
      ...job,
      isResettable: job.productType === ProductType.ORTHOPHOTO,
      isAbortable: job.productType === ProductType.ORTHOPHOTO,
      domain: job.productType === ProductType.ORTHOPHOTO ? 'RASTER' : '3D',
    }));
  }
}
