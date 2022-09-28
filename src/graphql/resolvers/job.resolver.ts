/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { transform, mapKeys, mapValues } from 'lodash';
import { Services } from '../../common/constants';
import { requestHandler } from '../../utils';
import { JobsSearchParams, JobUpdateData } from '../inputTypes';
import { Job } from '../job';
//import { MOCK_JOBS_DATA } from '../MOCKS/MOCK_JOBS_DATA';

@Resolver()
export class JobResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly serviceURL: string = '';

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.serviceURL = this.config.get('jobServices.raster.url');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((type) => [Job])
  public async jobs(
    @Arg('params', { nullable: true })
    params?: JobsSearchParams
  ): Promise<Job[]> {
    try {
      this.logger.info(`[JobResolver][jobs] searching jobs with params: ${JSON.stringify(params)}`);

      // TODO: use a real call
      const data = await Promise.resolve(this.getJobs(params));
      // const data = await Promise.resolve(MOCK_JOBS_DATA);
      return this.transformRecordsToEntity(data);
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
    data: JobUpdateData
  ): Promise<string> {
    try {
      this.logger.info(`[JobResolver][updateJob] updating job with id: ${id}, data: ${JSON.stringify(data)} `);

      await this.updateJobHandler(id, data);
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
    id: string
  ): Promise<string> {
    try {
      this.logger.info(`[JobResolver][jobAbort] aborting job with id: ${id}`);

      await this.abortJobHandler(id);
      return 'ok';
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  private async getJobs(params?: JobsSearchParams): Promise<Job[]> {
    const res = await requestHandler(`${this.serviceURL}/jobs`, 'GET', {
      params: {
        ...params,
        fromDate: encodeURIComponent((params?.fromDate as Date).toISOString()),
        tillDate: encodeURIComponent((params?.tillDate as Date).toISOString()),
        shouldReturnTasks: false,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data;
  }

  private async updateJobHandler(id: string, params: JobUpdateData): Promise<string> {
    await requestHandler(`${this.serviceURL}/jobs/${id}`, 'PUT', {
      data: {
        ...params,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return 'ok';
  }

  private async abortJobHandler(id: string): Promise<string> {
    await requestHandler(`${this.serviceURL}/tasks/abort/${id}`, 'POST', {});
    return 'ok';
  }

  private readonly transformRecordsToEntity = (cswArray: Job[]): Job[] => {
    const jobParsedArray = transform(
      cswArray,
      (result: Record<string, unknown>[], cswValue) => {
        const parsedKeys = mapKeys(cswValue, (value, key) => key);
        const finalParsed = mapValues(parsedKeys, (val, key, obj) => {
          switch (key) {
            case 'created':
            case 'updated':
              return new Date(val as string);
            default:
              return val;
          }
        });
        result.push(finalParsed);
      },
      []
    );
    //@ts-ignore
    return jobParsedArray;
  };
}
