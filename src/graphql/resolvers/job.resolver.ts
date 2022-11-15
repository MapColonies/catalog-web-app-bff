/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
import { Services } from '../../common/constants';
import { JobsSearchParams, JobUpdateData } from '../inputTypes';
import { Job } from '../job';
import { IContext } from '../../common/interfaces';
import { JobManager } from '../../common/job-manager/job-manager';
//import { MOCK_JOBS_DATA } from '../MOCKS/MOCK_JOBS_DATA';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((type) => [Job])
  public async jobs(
    @Ctx()
    ctx: IContext,
    @Arg('params', { nullable: true })
    params?: JobsSearchParams
  ): Promise<Job[]> {
    try {
      this.logger.info(`[JobResolver][jobs] searching jobs with params: ${JSON.stringify(params)}`);

      // TODO: use a real call
      const data = await Promise.resolve(this.jobManager.getJobs(ctx, params));
      // const data = await Promise.resolve(MOCK_JOBS_DATA);
      return this.jobManager.transformRecordsToEntity(data);
      // return data;
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((type) => String)
  public async updateJob(
    @Arg('id')
    id: string,
    @Arg('data')
    data: JobUpdateData,
    @Arg('domain')
    domain: RecordType,
    @Ctx()
    ctx: IContext
  ): Promise<string> {
    try {
      this.logger.info(`[JobResolver][updateJob] updating job with id: ${id}, domain: ${domain}, data: ${JSON.stringify(data)} `);

      await this.jobManager.updateJobHandler(id, data, ctx, domain);
      return 'ok';
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  @Mutation((type) => String)
  public async jobRetry(
    @Arg('id')
    id: string
  ): Promise<string> {
    try {
      this.logger.info(`[JobResolver][jobRetry] retrying job with id: ${id}`);

      const response = await Promise.resolve(`Ok! Mutate job retry! Job Id: ${id}`);
      return response;
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  @Mutation((type) => String)
  public async jobAbort(
    @Arg('id')
    id: string,
    @Arg('domain')
    domain: RecordType,
    @Ctx()
    ctx: IContext
  ): Promise<string> {
    try {
      this.logger.info(`[JobResolver][jobAbort] aborting job with id: ${id}, domain: ${domain}`);

      await this.jobManager.abortJobHandler(id, ctx, domain);
      return 'ok';
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }
}
