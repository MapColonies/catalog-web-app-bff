import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { Capability } from '../../graphql/capability';
import { LayerSearchParams } from '../../graphql/inputTypes';
import { CatalogRecordItems } from '../../utils';
import { IConfig } from '../interfaces';
import { Services } from '../constants';
import { CapabilitiesManagerDem } from './capabilities-manager-dem';
import { CapabilitiesManagerRaster } from './capabilities-manager-raster';
import { ICapabilitiesManagerService } from './capabilities-manager.interface';

type MapServices = Record<CatalogRecordItems, ICapabilitiesManagerService>;

@singleton()
export class CapabilitiesManager implements ICapabilitiesManagerService {
  private readonly mapServices: MapServices = {} as MapServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.mapServices.RASTER = new CapabilitiesManagerRaster(this.config, this.logger);
    this.mapServices.DEM = new CapabilitiesManagerDem(this.config, this.logger);
  }

  public async getCapabilities(layer: LayerSearchParams): Promise<Capability> {
    this.logger.info(`[CapabilitiesManager][getCapabilities] calling getCapabilities for layer ${layer.id} (${layer.type as RecordType}).`);
    const capabilitiesManagerInstance = this.getManagerInstance(layer.type as RecordType);
    const capability = await capabilitiesManagerInstance.getCapabilities(layer);
    return capability;
  }

  private getManagerInstance(recordType: RecordType): ICapabilitiesManagerService {
    let capabilitiesManagerInstance: ICapabilitiesManagerService;

    switch (RecordType[recordType]) {
      case RecordType.RECORD_DEM:
        capabilitiesManagerInstance = this.mapServices.DEM;
        break;
      default:
        capabilitiesManagerInstance = this.mapServices.RASTER;
        break;
    }

    return capabilitiesManagerInstance;
  }
}
