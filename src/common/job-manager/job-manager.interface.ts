import { RecordType } from '@map-colonies/mc-model-types';
import { JobActionParams, JobsSearchParams, JobUpdateData, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
import { IContext } from '../interfaces';

export interface IJobManagerService {
  getJobs: (ctx: IContext, params?: JobsSearchParams) => Promise<Job[]>;
  getJob: (id: string, ctx: IContext) => Promise<Job>;
  getTasks: (params: TasksSearchParams, ctx: IContext) => Promise<Task[]>;
  findTasks: (params: TasksSearchParams, ctx: IContext) => Promise<Task[]>;
  updateJobHandler: (id: string, params: JobUpdateData, ctx: IContext) => Promise<string>;
  abortJobHandler: (jobAbortParams: JobActionParams, ctx: IContext) => Promise<string>;
  resetJobHandler: (jobRetryParams: JobActionParams, ctx: IContext) => Promise<string>;
  transformRecordsToEntity?: (records: (Job | Task)[] | Job | Task) => (Job | Task)[] | Job | Task;
  transformRecordToEntity: (record: Job | Task) => Job | Task;
}

export type JobWithRecordType = Job & { domain: RecordType };
