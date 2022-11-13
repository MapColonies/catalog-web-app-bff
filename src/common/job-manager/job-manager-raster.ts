import { Logger } from '@map-colonies/js-logger';
import { mapKeys, mapValues, transform } from 'lodash';
import { JobsSearchParams, JobUpdateData } from '../../graphql/inputTypes';
import { Job } from '../../graphql/job';
import { requestHandler } from '../../utils';
import { IConfig, IContext } from '../interfaces';
import { IJobManagerService } from './job-manager.interface';

export class JobManagerRaster implements IJobManagerService {
  private readonly serviceURL: string = '';

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data;
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

  public readonly transformRecordsToEntity = (cswArray: Job[]): Job[] => {
    const jobParsedArray = transform(
      cswArray,
      (result: Record<string, unknown>[], cswValue) => {
        const parsedKeys = mapKeys(cswValue, (value, key) => key);
        const finalParsed = mapValues(parsedKeys, (val, key) => {
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
    return jobParsedArray as unknown as Job[];
  };
}
