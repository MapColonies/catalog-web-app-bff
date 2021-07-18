/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { transform, mapKeys, mapValues, get } from 'lodash';
import { Services } from '../../common/constants';
import { requestHandler } from '../../utils';
import { JobsSearchParams, JobUpdateData } from '../inputTypes';
import { Job, Status } from '../job';

const MOCK_JOBS_DATA = [
  {
    id: '108f23b2-a0af-433e-be30-981d89e10656',
    resourceId: '1_discete_ext',
    version: 'string',
    type: 'Discrete-Tiling',
    description: 'string',
    parameters: {},
    status: Status.Pending,
    percentage: 0,
    reason: 'string',
    isCleaned: false,
    priority: 0,
    tasks: [
      {
        id: 'cbe00422-acf4-4b81-9a7c-90a9a51bdf2b',
        jobId: '108f23b2-a0af-433e-be30-981d89e10656',
        type: 'string',
        description: 'string',
        parameters: {},
        status: Status.Pending,
        percentage: 0,
        reason: 'string',
        attempts: 1,
        created: new Date('2021-05-24T05:33:22.199Z'),
        updated: new Date('2021-05-24T08:48:16.411Z'),
      },
      {
        id: 'cbe00422-acf4-4b81-9a7c-90a9a51bdf2c',
        jobId: '108f23b2-a0af-433e-be30-981d89e10656',
        type: 'string',
        description: 'string',
        parameters: {},
        status: Status.Completed,
        percentage: 0,
        reason: 'string',
        attempts: 1,
        created: new Date('2021-05-24T05:33:22.199Z'),
        updated: new Date('2021-05-24T08:48:16.411Z'),
      },
      {
        id: 'cbe00422-acf4-4b81-9a7c-90a9a51bdf2d',
        jobId: '108f23b2-a0af-433e-be30-981d89e10656',
        type: 'string',
        description: 'string',
        parameters: {},
        status: Status.Failed,
        percentage: 0,
        reason: 'string',
        attempts: 1,
        created: new Date('2021-05-24T05:33:22.199Z'),
        updated: new Date('2021-05-24T08:48:16.411Z'),
      },
    ],
    created: new Date('2021-05-24T05:33:22.199Z'),
    updated: new Date('2021-05-24T05:33:22.199Z'),
  },
  {
    id: '5907d4de-3afc-41f2-bc32-a904e34adbc0',
    resourceId: '2_discete_ext',
    version: 'string',
    type: '3D',
    description: 'string',
    parameters: {},
    status: Status.Pending,
    percentage: 0,
    reason: 'string',
    isCleaned: false,
    priority: 0,
    tasks: [
      {
        id: 'df9c0c87-44b8-4a6c-8585-d47ef02ccd77',
        jobId: '5907d4de-3afc-41f2-bc32-a904e34adbc0',
        type: 'string',
        description: 'string',
        parameters: {},
        status: Status.Pending,
        percentage: 0,
        reason: 'string',
        attempts: 0,
        created: new Date('2021-05-24T05:33:51.990Z'),
        updated: new Date('2021-05-24T05:33:51.990Z'),
      },
      {
        id: 'df9c0c87-44b8-4a6c-8585-d47ef02ccd78',
        jobId: '5907d4de-3afc-41f2-bc32-a904e34adbc0',
        type: 'string',
        description: 'string',
        parameters: {},
        status: Status.InProgress,
        percentage: 0,
        reason: 'string',
        attempts: 0,
        created: new Date('2021-05-24T05:33:51.990Z'),
        updated: new Date('2021-05-24T05:33:51.990Z'),
      },
    ],
    created: new Date('2021-05-24T05:33:51.990Z'),
    updated: new Date('2021-05-24T05:33:51.990Z'),
  },
];

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
      return this.transformRecordsToEntity(data);
      // const data = await Promise.resolve(MOCK_JOBS_DATA);
      // return data;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  @Mutation((type) => String)
  public async updateJob(
    @Arg('id')
    id: string,
    @Arg('data')
    data: JobUpdateData
  ): Promise<string> {
    try {
      const response = await this.updateJobHandler(id, data);
      return 'ok';
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  private async getJobs(params?: JobsSearchParams): Promise<Job[]> {
    const res = await requestHandler(`${this.serviceURL}/jobs`, 'GET', {
      data: {
        ...params,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data;
  }

  private async updateJobHandler(id: string, params: JobUpdateData): Promise<string> {
    const res = await requestHandler(`${this.serviceURL}/jobs/${id}`, 'PUT', {
      data: {
        ...params,
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
            case 'tasks':
              return this.transformRecordsToEntity(val as Job[]);
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
