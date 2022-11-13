import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { Services } from '../constants';
import { IConfig, IContext } from '../interfaces';
import { JobsSearchParams, JobUpdateData } from '../../graphql/inputTypes';
import { Job } from '../../graphql/job';
import { IJobManagerService } from './job-manager.interface';
import { JobManagerRaster } from './job-manager-raster';
import { JobManager3D } from './job-manager-3d';

type JobManagerServices = { [key in RecordType]?: IJobManagerService };

@singleton()
export class JobManager implements IJobManagerService {
  private readonly jobManagers: JobManagerServices = {} as JobManagerServices;
  private readonly servedEntities: RecordType[] = [] as RecordType[];

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    const rasterJobManager = new JobManagerRaster(config, logger);
    const jobManager3d = new JobManager3D(config, logger);
    this.servedEntities = this.config.get<string>('servedEntityTypes').split(',') as RecordType[];

    const jobManagersOptions = { [RecordType.RECORD_RASTER]: rasterJobManager, [RecordType.RECORD_3D]: jobManager3d } as JobManagerServices;

    this.jobManagers = this.getJobManagers(jobManagersOptions);
  }

  public async getJobs(ctx: IContext, params?: JobsSearchParams): Promise<Job[]> {
    const combinedJobs = await Promise.all(
      Object.values(this.jobManagers).map(async (jobManager) => {
        return jobManager.getJobs(ctx, params);
      })
    );

    return combinedJobs.flat(1);
  }

  //   public transformRecordsToEntity(cswArray: Job[]): Job[] {

  //   }

  //   public async updateJobHandler(id: string, params: JobUpdateData, ctx: IContext): Promise<string> {

  //   }

  //   public async abortJobHandler(id: string, ctx: IContext): Promise<string> {}

  private getJobManagers(jobManagersOptions: JobManagerServices): JobManagerServices {
    return this.servedEntities.reduce((jobManagers, currentEntity) => {
      return {
        ...jobManagers,
        [currentEntity]: jobManagersOptions[currentEntity],
      };
    }, {} as JobManagerServices);
  }
}
