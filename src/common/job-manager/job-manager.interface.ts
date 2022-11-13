import { JobsSearchParams, JobUpdateData } from '../../graphql/inputTypes';
import { Job } from '../../graphql/job';
import { IContext } from '../interfaces';

export interface IJobManagerService {
  getJobs: (ctx: IContext, params?: JobsSearchParams) => Promise<Job[]>;
  updateJobHandler?: (id: string, params: JobUpdateData, ctx: IContext) => Promise<string>;
  abortJobHandler?: (id: string, ctx: IContext) => Promise<string>;
  transformRecordsToEntity: (cswArray: Job[]) => Job[];
}
