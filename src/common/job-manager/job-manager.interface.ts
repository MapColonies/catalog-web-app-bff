import { RecordType } from '@map-colonies/mc-model-types';
import { JobAbortParams, JobsSearchParams, JobUpdateData, ResetJobHandlerParams, TasksSearchParams } from '../../graphql/inputTypes';
import { Job, Task } from '../../graphql/job';
import { IContext } from '../interfaces';

export interface IJobManagerService {
  getJobs: (ctx: IContext, params?: JobsSearchParams) => Promise<Job[]>;
  getJob: (id: string, ctx: IContext) => Promise<Job>;
  getTasks: (params: TasksSearchParams, ctx: IContext) => Promise<Task[]>;
  findTasks: (params: TasksSearchParams, ctx: IContext) => Promise<Task[]>;
  updateJobHandler: (id: string, params: JobUpdateData, ctx: IContext) => Promise<string>;
  abortJobHandler: (jobAbortParams: JobAbortParams, ctx: IContext) => Promise<string>;
  resetJobHandler: (resetJobHandlerParams: ResetJobHandlerParams, ctx: IContext) => Promise<string>;
  transformRecordsToEntity?: (records: (Job | Task)[] | Job | Task) => (Job | Task)[] | Job | Task;
  transformRecordToEntity: (record: Job | Task) => Job | Task;
}

export type JobWithRecordType = Job & { domain: RecordType };
