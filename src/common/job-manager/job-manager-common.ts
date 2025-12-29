import { isEmpty } from 'lodash';
import { Logger } from '@map-colonies/js-logger';
import { ActiveJobFindParams, JobActionParams, JobsSearchParams, JobUpdateData, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
// import MOCK_JOBS from '../../graphql/MOCKS/job-manager/common/MOCK_JOBS';
import { requestExecutor } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { IJobManagerService } from './job-manager.interface';

export default class JobManagerCommon implements IJobManagerService {
  protected readonly service: IService;
  // private readonly jobManagerType: string = RecordType.RECORD_RASTER;

  public constructor(public readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('jobServices.common');
  }

  public async getJobs(ctx: IContext, params?: JobsSearchParams): Promise<Job[]> {
    const res = await requestExecutor(
      {
        url: `${this.service.url}/jobs/find`,
        exposureType: this.service.exposureType,
      },
      'POST',
      {
        data: {
          ...params,
          fromDate: (params?.fromDate as Date).toISOString(),
          tillDate: (params?.tillDate as Date).toISOString(),
          types: String(this.config.get('jobServices.types') ?? '')
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0),
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

  // eslint-disable-next-line
  public async findActiveJob(params: ActiveJobFindParams, ctx: IContext): Promise<Job | null> {
    await Promise.resolve();
    throw new Error('Not implemented');
  }

  public async getJob(id: string, ctx: IContext): Promise<Job> {
    const res = await requestExecutor(
      {
        url: `${this.service.url}/jobs/${encodeURI(id)}`,
        exposureType: this.service.exposureType,
      },
      'GET',
      {
        params: {
          shouldReturnAvailableActions: true,
        },
      },
      ctx
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = (!isEmpty(res.data) ? res.data : []) as Job;

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

  public async abortJobHandler(jobAbortParams: JobActionParams, ctx: IContext): Promise<string> {
    await requestExecutor(
      {
        url: `${this.service.url}/tasks/abort/${jobAbortParams.id}`,
        exposureType: this.service.exposureType,
      },
      'POST',
      {},
      ctx
    );
    return 'ok';
  }

  public async resetJobHandler(jobRetryParams: JobActionParams, ctx: IContext): Promise<string> {
    await requestExecutor(
      {
        url: `${this.service.url}/jobs/${jobRetryParams.id}/reset`,
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
        url: `${this.service.url}/jobs/${params.jobId}/tasks?shouldExcludeParameters=true`,
        exposureType: this.service.exposureType,
      },
      'GET',
      {},
      ctx
    );

    return res.data as Task[];
  }

  public async findTasks(params: TasksSearchParams, ctx: IContext): Promise<Task[]> {
    const res = await requestExecutor(
      {
        url: `${this.service.url}/tasks/find`,
        exposureType: this.service.exposureType,
      },
      'POST',
      {
        data: {
          ...params,
        },
      },
      ctx
    );

    return res.data as Task[];
  }

  public readonly transformRecordToEntity = (record: Job | Task | null): Job | Task | null => {
    return record
      ? Object.entries(record).reduce((transformed, [key, value]) => {
          switch (key) {
            case 'created':
            case 'updated':
            case 'expirationDate':
              return { ...transformed, [key]: new Date(value as string) };
            default:
              return { ...transformed, [key]: value as unknown };
          }
        }, {} as Job | Task)
      : null;
  };
}
