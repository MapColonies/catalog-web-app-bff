import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { isEmpty } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MOCK_JOBS from '../../graphql/MOCKS/job-manager/common/MOCK_JOBS';

import { JobsSearchParams, JobUpdateData, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
import { requestHandler } from '../../utils';
import { IConfig, IContext } from '../interfaces';
import { IJobManagerService } from './job-manager.interface';

export default class JobManagerCommon implements IJobManagerService {
  private readonly serviceURL: string = '';
  // private readonly jobManagerType: string = RecordType.RECORD_RASTER;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('jobServices.common.url');
  }

  public async getJobs(ctx: IContext, params?: JobsSearchParams): Promise<Job[]> {
    const res = await requestHandler(
      `${this.serviceURL}/jobs`,
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
    await requestHandler(
      `${this.serviceURL}/jobs/${id}`,
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
    await requestHandler(`${this.serviceURL}/tasks/abort/${id}`, 'POST', {}, ctx);
    return 'ok';
  }

  public async resetJobHandler(id: string, ctx: IContext): Promise<string> {
    const YEAR_IN_MS = 3.154e10;
    await requestHandler(
      `${this.serviceURL}/jobs/${id}/reset`,
      'POST',
      {
        data: {
          // TODO: Use decided value.
          newExpirationDate: new Date(new Date().getTime() + YEAR_IN_MS),
        },
      },
      ctx
    );
    return 'ok';
  }

  public async getTasks(params: TasksSearchParams, ctx: IContext): Promise<Task[]> {
    const res = await requestHandler(`${this.serviceURL}/jobs/${params.jobId}/tasks`, 'GET', {}, ctx);

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
