import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { Services } from '../constants';
import { IConfig, IContext } from '../interfaces';
import { Domain } from '../../graphql/domain';
import { SourceValidationInputParams } from '../../graphql/inputTypes';
import { IngestionManagerRaster } from '../ingestion-manager/ingestion-manager-raster';
import { IngestionManager3D } from '../ingestion-manager/ingestion-manager-3d';
import { ISourceInfoService } from '../ingestion-manager/ingestion-manager.interface';
import { SourceValidation } from '../../graphql/sourceValidation';

type IngestionServices = Record<Domain, ISourceInfoService>;

@singleton()
export class SourceValidatorManager implements ISourceInfoService {
  private readonly ingestionServices: IngestionServices = {} as IngestionServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.ingestionServices.RASTER = new IngestionManagerRaster(this.config, this.logger);
    this.ingestionServices['3D'] = new IngestionManager3D(this.config, this.logger);
    // this.ingestionServices.DEM = new IngestionManagerDem(this.config, this.logger);
  }

  public async sourceInfo(data: SourceValidationInputParams, ctx: IContext): Promise<SourceValidation> {
    const sourceValidatorInstance = this.getManagerInstance(data.type);

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
