/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { transform, mapKeys, mapValues, get } from 'lodash';
import { Services } from '../../common/constants';
import { requestHandler } from '../../utils';
import { JobsSearchParams, JobUpdateData } from '../inputTypes';
import { Job } from '../job';
import { MOCK_JOBS_DATA } from './MOCK_JOBS_DATA';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await this.updateJobHandler(id, data);
      return 'ok';
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  private async getJobs(params?: JobsSearchParams): Promise<Job[]> {
    const res = await requestHandler(`${this.serviceURL}/jobs`, 'GET', {
      data: {
        ...params,
        shouldReturnTasks: false,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data;
  }

  private async updateJobHandler(id: string, params: JobUpdateData): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await requestHandler(`${this.serviceURL}/jobs/${id}`, 'PUT', {
      data: {
        ...params,
        shouldReturnTasks: false,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
