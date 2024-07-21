import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { SourceValidationParams } from './inputTypes';
import { SourceValidation } from './sourceValidation';
import { ValidationManager } from '../common/validation-manager/validation-manager';
import { Services } from '../common/constants';
import { IContext } from '../common/interfaces';

@singleton()
export class SourceValidator {
  private readonly validationService: ValidationManager = {} as ValidationManager;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.validationService = new ValidationManager(this.config, this.logger);
  }

  public async validateSources(sourceData: SourceValidationParams, ctx?: IContext): Promise<SourceValidation[]> {
    // this.logger.info(`[SourceValidator][validateSource] start validation for source ${sourceData.originDirectory}.`);

    // const updatedData = await ValidationManager.validate(sourceData, ctx);
    // return updatedData;

    return new Promise((resolve, reject) => {
      resolve([
        {
          srs: '8888', //crs
          fileFormat: 'gpkg',
          resolutionDegree: 0.00274658203125, //pixelSize
          extentPolygon: {
            coordinates: [
              [
                [45.55709751400781, 35.165318109968524],
                [45.55709751400781, 29.371448852577814],
                [50.94014988868878, 29.371448852577814],
                [50.94014988868878, 35.165318109968524],
                [45.55709751400781, 35.165318109968524],
              ],
            ],
            type: 'Polygon',
          },
        },
      ]);
    });
  }
}
