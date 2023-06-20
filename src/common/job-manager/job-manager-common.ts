import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { isEmpty } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MOCK_JOBS from '../../graphql/MOCKS/job-manager/common/MOCK_JOBS';

import { JobsSearchParams, JobUpdateData, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
import { requestExecutor } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { IJobManagerService } from './job-manager.interface';

export default class JobManagerCommon implements IJobManagerService {
  private readonly service: IService;
  // private readonly jobManagerType: string = RecordType.RECORD_RASTER;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('jobServices.common');
  }

  public async getJobs(ctx: IContext, params?: JobsSearchParams): Promise<Job[]> {
    const res = await requestExecutor(
      {
        url: `${this.service.url}/jobs`,
        exposureType: this.service.exposureType,
      },
      'GET',
      {
        params: {
          ...params,
          fromDate: encodeURIComponent((params?.fromDate as Date).toISOString()),
          tillDate: encodeURIComponent((params?.tillDate as Date).toISOString()),
          shouldReturnTasks: false,
          shouldReturnAvailableActions: true,
        },
      },
      ctx
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = (!isEmpty(res.data) ? res.data : []) as Job[];

    // // Mock Jobs
    // const result = await Promise.resolve(MOCK_JOBS);

    // return result.map((job) => ({ ...job, domain: this.jobManagerType }));

    return result;
  }

  public async updateJobHandler(id: string, params: JobUpdateData, ctx: IContext): Promise<string> {
    await requestExecutor(
      {
        url: `${this.service.url}/jobs/${id}`,
        exposureType: this.service.exposureType,
      },
      'PUT',
      {
        data: {
          ...params,
        },
      },
      ctx
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return 'ok';
  }

  public async abortJobHandler(id: string, ctx: IContext): Promise<string> {
    await requestExecutor(
      {
        url: `${this.service.url}/tasks/abort/${id}`,
        exposureType: this.service.exposureType,
      },
      'POST',
      {},
      ctx
    );
    return 'ok';
  }

  public async resetJobHandler(id: string, ctx: IContext): Promise<string> {
    await requestExecutor(
      {
        url: `${this.service.url}/jobs/${id}/reset`,
        exposureType: this.service.exposureType,
      },
      'POST',
      {
        data: {
          newExpirationDate: undefined,
        },
      },
      ctx
    );
    return 'ok';
  }

  public async getTasks(params: TasksSearchParams, ctx: IContext): Promise<Task[]> {
    const res = await requestExecutor(
      {
        url: `${this.service.url}/jobs/${params.jobId}/tasks`,
        exposureType: this.service.exposureType,
      },
      'GET',
      {},
      ctx
    );

    return res.data as Task[];
  }

  public readonly transformRecordToEntity = (cswJob: Job): Job => {
    return Object.entries(cswJob).reduce((transformedJob, [key, value]) => {
      switch (key) {
        case 'created':
        case 'updated':
        case 'expirationDate':
          return { ...transformedJob, [key]: new Date(value as string) };

        default:
          return { ...transformedJob, [key]: value as unknown };
      }
    }, {} as Job);
  };
}
