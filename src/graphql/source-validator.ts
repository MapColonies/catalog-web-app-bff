import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { Services } from '../common/constants';
import { IContext, IService } from '../common/interfaces';
import { requestExecutor, stringifyObject } from '../utils';
import { SourceValidationParams } from './inputTypes';
import { SourceValidation } from './sourceValidation';

@singleton()
export class SourceValidator {
  private readonly service: IService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('validationService.raster');
  }

  public async validateSources(params: SourceValidationParams, ctx: IContext): Promise<SourceValidation> {
    this.logger.info(`[SourceValidator][validateSources] ${stringifyObject(params)}`);

    const response = await requestExecutor(
      {
        url: `${this.service.url}/layers/validateSources`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildPayload(params),
      ctx
    );

    const validationResponse: SourceValidation = {
      isValid: get(response.data, 'isValid') as boolean,
      message: (get(response.data, 'reason') as string | undefined) ?? 'Files are valid',
    };

    return validationResponse;
  }

  private buildPayload(data: SourceValidationParams): AxiosRequestConfig {
    return { data };
  }
}
