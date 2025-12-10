import { Logger } from '@map-colonies/js-logger';
import JobManagerCommon from './job-manager-common';
import { IConfig, IContext, IService } from '../interfaces';
import { requestExecutor } from '../../utils';
import { JobActionParams } from '../../graphql/inputTypes';

export default class JobManagerRaster extends JobManagerCommon {
  public constructor(config: IConfig, logger: Logger) {
    super(config, logger);
  }

  public async abortJobHandler(jobAbortParams: JobActionParams, ctx: IContext): Promise<string> {
    await requestExecutor(
      {
        url: `${(this.config.get('ingestionServices.raster') as IService).url}/KUKU/abort/${jobAbortParams.id}`,
        exposureType: (this.config.get('ingestionServices.raster') as IService).exposureType,
      },
      'POST',
      {},
      ctx
    );
    return 'ok';
  }

  public async resetJobHandler(resetJobHandlerParams: JobActionParams, ctx: IContext): Promise<string> {
    await requestExecutor(
      {
        url: `${(this.config.get('ingestionServices.raster') as IService).url}/KUKU/${resetJobHandlerParams.id}/reset`,
        exposureType: (this.config.get('ingestionServices.raster') as IService).exposureType,
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
}
