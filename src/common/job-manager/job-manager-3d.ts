import { Logger } from '@map-colonies/js-logger';
import { mapKeys, mapValues, transform } from 'lodash';
import { JobsSearchParams } from '../../graphql/inputTypes';
import { Job } from '../../graphql/job';
import { requestHandler } from '../../utils';
import { IConfig, IContext } from '../interfaces';
import { IJobManagerService } from './job-manager.interface';

export class JobManager3D implements IJobManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('jobServices.3d.url');
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
