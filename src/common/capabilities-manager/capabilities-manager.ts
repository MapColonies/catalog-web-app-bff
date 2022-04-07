import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { RecordUpdatePartial } from '../../graphql/inputTypes';
import { CatalogRecordItems } from '../../utils';
import { IConfig } from '../interfaces';
import { Services } from '../constants';
import { ICapabilitiesManagerService } from './capabilities-manager.interface';

type MapServices = Record<CatalogRecordItems, ICapabilitiesManagerService>;

@singleton()
export class CapabilitiesManager implements ICapabilitiesManagerService {
  private readonly mapServices: MapServices = {} as MapServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.mapServices.RASTER = new CapabilitiesManagerRaster(this.config, this.logger);
    this.mapServices.DEM = new CapabilitiesManagerDem(this.config, this.logger);
  }

  public async getCapabilities(record: RecordUpdatePartial): Promise<RecordUpdatePartial> {
    const catalogManagerInstance = this.getManagerInstance(record.type as RecordType);
    const updatedData = await catalogManagerInstance.updateMetadata(record);
    return updatedData;
  }

  private getManagerInstance(recordType: RecordType): ICatalogManagerService {
    let catalogManagerInstance: ICatalogManagerService;

    switch (RecordType[recordType]) {
      case RecordType.RECORD_DEM:
        catalogManagerInstance = this.mapServices.DEM;
        break;
      default:
        catalogManagerInstance = this.mapServices.RASTER;
        break;
    }

    return catalogManagerInstance;
  }
}
