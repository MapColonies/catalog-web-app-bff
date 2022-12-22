import { RecordType } from '@map-colonies/mc-model-types';
import { JobsSearchParams, JobUpdateData, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
import { IContext } from '../interfaces';

export interface IJobManagerService {
  getJobs: (ctx: IContext, params?: JobsSearchParams) => Promise<Job[]>;
  getTasks: (params: TasksSearchParams, ctx: IContext) => Promise<Task[]>;
  updateJobHandler: (id: string, params: JobUpdateData, ctx: IContext) => Promise<string>;
  abortJobHandler: (id: string, ctx: IContext) => Promise<string>;
  resetJobHandler: (id: string, ctx: IContext) => Promise<string>;
  transformRecordsToEntity?: (cswArray: Job[]) => Job[];
  transformRecordToEntity: (cswJob: Job) => Job;
}

export type JobWithRecordType = Job & { domain: RecordType };
