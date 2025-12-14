import { Logger } from '@map-colonies/js-logger';
import { requestExecutor } from '../../utils';
import { JobActionParams } from '../../graphql/inputTypes';
import { IConfig, IContext, IService } from '../interfaces';
import JobManagerCommon from './job-manager-common';

export default class JobManagerRaster extends JobManagerCommon {
  public constructor(config: IConfig, logger: Logger) {
    super(config, logger);
  }

  public async abortJobHandler(jobAbortParams: JobActionParams, ctx: IContext): Promise<string> {
    const service: IService = this.config.get('ingestionServices.raster');
    await requestExecutor(
      {
        url: `${service.url}/KUKU/abort/${jobAbortParams.id}`,
        exposureType: service.exposureType,
      },
      'POST',
      {},
      ctx
    );
    return 'ok';
  }

  public async resetJobHandler(resetJobHandlerParams: JobActionParams, ctx: IContext): Promise<string> {
    const service: IService = this.config.get('ingestionServices.raster');
    await requestExecutor(
      {
        url: `${service.url}/injestion/${resetJobHandlerParams.id}/retry`,
        exposureType: service.exposureType,
      },
      'PUT',
      {},
      ctx
    );
    return 'ok';
  }
}
