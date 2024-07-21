import { Logger } from '@map-colonies/js-logger';
import { IConfig, IContext, IService } from '../interfaces';
import { SourceValidationParams } from '../../graphql/inputTypes';
import { SourceValidation } from '../../graphql/sourceValidation';
import { requestExecutor } from '../../utils';

export class ValidationManager {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('validationService');
  }

  public async validate(data: SourceValidationParams, ctx: IContext): Promise<SourceValidation> {
    await requestExecutor(
      {
        url: `${this.service.url}`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildPayload(data),
      ctx
    );
    return {} as SourceValidation;
  }

  private buildPayload(data: SourceValidationParams): import('axios').AxiosRequestConfig {
    throw new Error('Method not implemented.');
  }
}
