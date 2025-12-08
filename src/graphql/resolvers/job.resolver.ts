import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { JobManager } from '../../common/job-manager/job-manager';
import { JobAbortParams, JobsSearchParams, JobUpdateData } from '../inputTypes';
import { Job } from '../job';

@Resolver()
export class JobResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly jobManager: JobManager;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.jobManager = container.resolve(JobManager);
  }

  @Query((type) => [Job])
  public async jobs(
    @Ctx()
    ctx: IContext,
    @Arg('params', { nullable: true })
    params?: JobsSearchParams
  ): Promise<Job[]> {
    try {
      const data = await Promise.resolve(this.jobManager.getJobs(ctx, params));
      return this.jobManager.transformRecordsToEntity(data) as Job[];
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  @Query((type) => Job)
  public async job(
    @Arg('id')
    id: string,
    @Ctx()
    ctx: IContext
  ): Promise<Job> {
    try {
      const data = await Promise.resolve(this.jobManager.getJob(id, ctx));
      return this.jobManager.transformRecordsToEntity(data) as Job;
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  @Mutation((type) => String)
  public async updateJob(
    @Arg('id')
    id: string,
    @Arg('data')
    data: JobUpdateData,
    @Ctx()
    ctx: IContext
  ): Promise<string> {
    try {
      await this.jobManager.updateJobHandler(id, data, ctx);
      return 'ok';
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  @Mutation((type) => String)
  public async jobRetry(
    @Arg('id')
    id: string,
    @Ctx()
    ctx: IContext
  ): Promise<string> {
    try {
      const response = await this.jobManager.resetJobHandler(id, ctx);
      return response;
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  @Mutation((type) => String)
  public async jobAbort(
    @Arg('JobAbortParams')
    jobAbortParams: JobAbortParams,
    @Ctx()
    ctx: IContext
  ): Promise<string> {
    try {
      await this.jobManager.abortJobHandler(jobAbortParams, ctx);
      return 'ok';
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }
}
