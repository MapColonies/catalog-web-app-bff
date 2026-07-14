import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { Domain } from '../../graphql/domain';
import { SourceValidationInputParams } from '../../graphql/inputTypes';
import { SourceValidation } from '../../graphql/sourceValidation';
import { Services } from '../constants';
import { IngestionManager3D } from '../ingestion-manager/ingestion-manager-3d';
import { IngestionManagerRaster } from '../ingestion-manager/ingestion-manager-raster';
import { ISourceInfoService } from '../ingestion-manager/ingestion-manager.interface';
import { IConfig, IContext } from '../interfaces';

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
    switch (recordType) {
      case RecordType.RECORD_DEM:
        return this.ingestionServices.DEM;
      case RecordType.RECORD_3D:
        return this.ingestionServices['3D'];
      case RecordType.RECORD_RASTER:
        return this.ingestionServices.RASTER;
      default:
        throw new Error(`Unsupported record type: ${recordType}`);
    }
  }
}
