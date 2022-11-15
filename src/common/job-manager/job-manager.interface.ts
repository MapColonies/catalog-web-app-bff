import { RecordType } from '@map-colonies/mc-model-types';
import { JobsSearchParams, JobUpdateData } from '../../graphql/inputTypes';
import { Job } from '../../graphql/job';
import { IContext } from '../interfaces';

export interface IJobManagerService {
  getJobs: (ctx: IContext, params?: JobsSearchParams) => Promise<Job[]>;
  updateJobHandler?: (id: string, params: JobUpdateData, ctx: IContext, domain?: RecordType) => Promise<string>;
  abortJobHandler?: (id: string, ctx: IContext, domain?: RecordType) => Promise<string>;
  transformRecordsToEntity?: (cswArray: Job[]) => Job[];
  transformRecordToEntity: (cswJob: Job) => Job;
}

export type JobWithRecordType = Job & { domain: RecordType };
