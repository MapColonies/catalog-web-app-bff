import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { SourceValidationParams } from './inputTypes';
import { SourceValidation } from './sourceValidation';
import { Services } from '../common/constants';
import { IContext, IService } from '../common/interfaces';

@singleton()
export class SourceValidator {
  private readonly service: IService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('validationService');
  }

  public async validateSources(sourceData: SourceValidationParams, ctx: IContext): Promise<SourceValidation> {
    // this.logger.info(`[SourceValidator][validateSources] start validation for source ${sourceData.originDirectory}.`);

    // const response = await requestExecutor(
    //     {
    //       url: `${this.service.url}/ingestion/validateSources`,
    //       exposureType: this.service.exposureType,
    //     },
    //     'POST',
    //     this.buildPayload(sourceData),
    //     ctx
    //   );

    //   return response.data as SourceValidation;

    return new Promise((resolve, reject) => {
      resolve({
        isValid: true,
        message: 'Files are valid',
      });
    });
  }

  //   private buildPayload(data: any): import('axios').AxiosRequestConfig {
  //     throw new Error('Method not implemented.');
  //   }
}
