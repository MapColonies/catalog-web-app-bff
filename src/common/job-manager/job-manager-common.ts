import { isEmpty } from 'lodash';
import { Logger } from '@map-colonies/js-logger';
import { ActiveJobFindParams, JobActionParams, JobsSearchParams, JobUpdateData, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
// import MOCK_JOBS from '../../graphql/MOCKS/job-manager/common/MOCK_JOBS';
import { requestExecutor, stringifyObject } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { IJobManagerService } from './job-manager.interface';

export default class JobManagerCommon implements IJobManagerService {
  protected readonly service: IService;

  public constructor(public readonly config: IConfig, protected readonly logger: Logger) {
    this.service = this.config.get('jobServices.common');
  }

  public async getJobs(ctx: IContext, params?: JobsSearchParams): Promise<Job[]> {
    this.logger.info(`[JobManager][Common][getJobs] ${stringifyObject(params)}`);
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
          shouldExcludeParameters: true,
        },
      },
      ctx
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = (!isEmpty(res.data) ? res.data : []) as Job[];
    return result;
  }

  public async getJob(id: string, ctx: IContext): Promise<Job> {
    this.logger.info(`[JobManager][Common][getJob] id: ${id}`);
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

  // eslint-disable-next-line
  public async findActiveJob(params: ActiveJobFindParams, ctx: IContext): Promise<Job | null> {
    this.logger.info(`[JobManager][Common][findActiveJob] ${stringifyObject(params)}`);
    await Promise.resolve();
    throw new Error('Not implemented');
  }

  public async updateJobHandler(id: string, params: JobUpdateData, ctx: IContext): Promise<string> {
    this.logger.info(`[JobManager][Common][updateJobHandler] id: ${id}, ${stringifyObject(params)}`);
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

  public async abortJobHandler(params: JobActionParams, ctx: IContext): Promise<string> {
    this.logger.info(`[JobManager][Common][abortJobHandler] ${stringifyObject(params)}`);
    await requestExecutor(
      {
        url: `${this.service.url}/tasks/abort/${params.id}`,
        exposureType: this.service.exposureType,
      },
      'POST',
      {},
      ctx
    );
    return 'ok';
  }

  public async resetJobHandler(params: JobActionParams, ctx: IContext): Promise<string> {
    this.logger.info(`[JobManager][Common][resetJobHandler] ${stringifyObject(params)}`);
    await requestExecutor(
      {
        url: `${this.service.url}/jobs/${params.id}/reset`,
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
    this.logger.info(`[JobManager][Common][getTasks] ${stringifyObject(params)}`);
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
    this.logger.info(`[JobManager][Common][findTasks] ${stringifyObject(params)}`);
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
