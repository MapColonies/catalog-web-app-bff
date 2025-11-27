import { isEmpty } from 'lodash';
import { Logger } from '@map-colonies/js-logger';
import { ProductType } from '@map-colonies/types';
import { JobsSearchParams, JobUpdateData, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
// import MOCK_JOBS from '../../graphql/MOCKS/job-manager/common/MOCK_JOBS';
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

  public async getJob(id: string, ctx: IContext): Promise<Job> {
    const res = await requestExecutor(
      {
        url: `${this.service.url}/jobs/${encodeURI(id)}`,
        exposureType: this.service.exposureType,
      },
      'GET',
      {},
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

  public readonly transformRecordToEntity = (record: Job | Task): Job | Task => {
    return Object.entries(record).reduce((transformed, [key, value]) => {
      switch (key) {
        case 'created':
        case 'updated':
        case 'expirationDate':
          return { ...transformed, [key]: new Date(value as string) };
        case 'parameters':
          if (value?.metadata && 'domain' in record && record.domain === 'RASTER') {
            const productTypeKey = Object.entries(ProductType).find(([_, v]) => v === value.metadata.productType)?.[0] as
              | keyof typeof ProductType
              | undefined;
            if (productTypeKey) {
              value.metadata.productType = productTypeKey;
            }
            return { ...transformed, [key]: { ...value, metadata: { ...value.metadata } } };
          }
          return { ...transformed, [key]: value as unknown };
        default:
          return { ...transformed, [key]: value as unknown };
      }
    }, {} as Job | Task);
  };
}
