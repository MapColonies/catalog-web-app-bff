import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { Services } from '../common/constants';
import { IContext } from '../common/interfaces';
import { SourceValidationParams } from './inputTypes';
import { SourceValidation } from './sourceValidation';

@singleton()
export class SourceValidator {
  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {}

  public async validateSource(sourceData: SourceValidationParams, ctx?: IContext): Promise<SourceValidation[]> {
    return new Promise((resolve, reject) => {
      // Currently returns DUMMY data
      // Should be performed two API calls
      // 1. ingestion-trigger/ingestion/validateSources
      // 2. ingestion-trigger/ingestion/sourcesInfo

      // *** Also should translate gdalinfo props to entity props
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
