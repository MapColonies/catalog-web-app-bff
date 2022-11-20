import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { isEmpty } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MOCK_JOBS from '../../graphql/MOCKS/job-manager/raster/MOCK_JOBS';

import { JobsSearchParams, JobUpdateData, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
import { requestHandler } from '../../utils';
import { IConfig, IContext } from '../interfaces';
import { IJobManagerService } from './job-manager.interface';

export class JobManagerRaster implements IJobManagerService {
  private readonly serviceURL: string = '';
  private readonly jobManagerType: string = RecordType.RECORD_RASTER;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('jobServices.raster.url');
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
        },
      },
      ctx
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = (!isEmpty(res.data) ? res.data : []) as Job[];

    // // Mock Jobs
    // const result = await Promise.resolve(MOCK_JOBS);

    return result.map((job) => ({ ...job, domain: this.jobManagerType }));
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

  public async getTasks(params: TasksSearchParams, ctx: IContext): Promise<Task[]> {
    const res = await requestHandler(`${this.serviceURL}/jobs/${params.jobId}/tasks`, 'GET', {}, ctx);

    return res.data as Task[];
  }

  public readonly transformRecordToEntity = (cswJob: Job): Job => {
    return Object.entries(cswJob).reduce((transformedJob, [key, value]) => {
      switch (key) {
        case 'created':
        case 'updated':
          return { ...transformedJob, [key]: new Date(value as string) };

        default:
          return { ...transformedJob, [key]: value as unknown };
      }
    }, {} as Job);
  };
}
