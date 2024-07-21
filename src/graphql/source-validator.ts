import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { SourceValidationParams } from './inputTypes';
import { SourceValidation } from './sourceValidation';
import { SourceInfo } from './sourceInfo';
import { Services } from '../common/constants';
import { IContext, IService } from '../common/interfaces';
import { requestExecutor } from '../utils';

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

  public async sourcesInfo(sourceData: SourceValidationParams, ctx: IContext): Promise<SourceInfo[]> {
    // this.logger.info(`[SourceValidator][sourcesInfo]get info for sources ${sourceData.originDirectory}.`);

    // const response = await requestExecutor(
    //     {
    //       url: `${this.service.url}/ingestion/sourcesInfo`,
    //       exposureType: this.service.exposureType,
    //     },
    //     'POST',
    //     this.buildPayload(sourceData),
    //     ctx
    //   );
    //   return response.data as SourceInfo[];

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
          fileName: 'file',
        },
      ]);
    });
  }

  private buildPayload(data: any): import('axios').AxiosRequestConfig {
    throw new Error('Method not implemented.');
  }
}
