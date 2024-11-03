import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { Services } from '../constants';
import { IConfig, IContext } from '../interfaces';
import { SourceValidationParams } from '../../graphql/inputTypes';
import { CatalogRecordItems } from '../../utils';
import { IngestionManagerRaster } from '../ingestion-manager/ingestion-manager-raster';
import { IngestionManager3D } from '../ingestion-manager/ingestion-manager-3d';
import { ISourceInfoService } from '../ingestion-manager/ingestion-manager.interface';
import { SourceValidation } from '../../graphql/sourceValidation';

type IngestionServices = Record<CatalogRecordItems, ISourceInfoService>;

@singleton()
export class SourceValidatorManager implements ISourceInfoService {
  private readonly ingestionServices: IngestionServices = {} as IngestionServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.ingestionServices.RASTER = new IngestionManagerRaster(this.config, this.logger);
    this.ingestionServices['3D'] = new IngestionManager3D(this.config, this.logger);
    // this.ingestionServices.DEM = new IngestionManagerDem(this.config, this.logger);
  }

  public async sourceInfo(data: SourceValidationParams, ctx: IContext): Promise<SourceValidation> {
    this.logger.info(`[SourceValidatorManager][sourceInfo] get source info  ${data.type as RecordType}.`);

    const sourceValidatorInstance = this.getManagerInstance(data.type as RecordType);

    const updatedData = await sourceValidatorInstance.sourceInfo(data, ctx);
    return updatedData;
  }

  private getManagerInstance(recordType: RecordType): ISourceInfoService {
    let catalogManagerInstance: ISourceInfoService;

    switch (RecordType[recordType]) {
      case RecordType.RECORD_DEM:
        catalogManagerInstance = this.ingestionServices.DEM;
        break;
      case RecordType.RECORD_3D:
        catalogManagerInstance = this.ingestionServices['3D'];
        break;
      default:
        catalogManagerInstance = this.ingestionServices.RASTER;
        break;
    }

    return catalogManagerInstance;
  }
}

// import { Logger } from '@map-colonies/js-logger';
// import { IConfig } from 'config';
// import { inject, singleton } from 'tsyringe';
// import { Services } from '../constants';
// import { IContext } from '../interfaces';
// import { SourceValidationParams } from '../../graphql/inputTypes';
// import { SourceValidation } from '../../graphql/sourceValidation';

// @singleton()
// export class SourceValidator {
//   public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {}

//   public async validateSource(sourceData: SourceValidationParams, ctx?: IContext): Promise<SourceValidation[]> {
//     return new Promise((resolve, reject) => {
//       // Currently returns DUMMY data
//       // Should be performed two API calls
//       // 1. ingestion-trigger/ingestion/validateSources
//       // 2. ingestion-trigger/ingestion/sourcesInfo

//       // *** Also should translate gdalinfo props to entity props
//       resolve([
//         {
//           srs: '8888', //crs
//           fileFormat: 'gpkg',
//           resolutionDegree: 0.00274658203125, //pixelSize
//           extentPolygon: {
//             coordinates: [
//               [
//                 [45.55709751400781, 35.165318109968524],
//                 [45.55709751400781, 29.371448852577814],
//                 [50.94014988868878, 29.371448852577814],
//                 [50.94014988868878, 35.165318109968524],
//                 [45.55709751400781, 35.165318109968524],
//               ],
//             ],
//             type: 'Polygon',
//           },
//         },
//       ]);
//     });
//   }
// }
