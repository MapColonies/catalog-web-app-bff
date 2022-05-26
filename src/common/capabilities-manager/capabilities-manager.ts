import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { Capability } from '../../graphql/capability';
import { CapabilitiesLayersSearchParams } from '../../graphql/inputTypes';
import { CatalogRecordItems } from '../../utils';
import { IConfig } from '../interfaces';
import { Services } from '../constants';
import { CapabilitiesManagerDem } from './capabilities-manager-dem';
import { CapabilitiesManagerRaster } from './capabilities-manager-raster';
import { ICapabilitiesManagerInstance, ICapabilitiesManagerService } from './capabilities-manager.interface';

type MapServices = Record<CatalogRecordItems, ICapabilitiesManagerInstance>;

@singleton()
export class CapabilitiesManager implements ICapabilitiesManagerService {
  private readonly mapServices: MapServices = {} as MapServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.mapServices.RASTER = new CapabilitiesManagerRaster(this.config, this.logger);
    this.mapServices.DEM = new CapabilitiesManagerDem(this.config, this.logger);
  }

  public async getCapabilities(params: CapabilitiesLayersSearchParams): Promise<Capability[]> {
    this.logger.info(`[CapabilitiesManager][getCapabilities] calling getCapabilities manager`);
    const capabilities = await Promise.all(
      params.data.map(async (item) => {
        return this.getManagerInstance(item.recordType).getCapabilities(item.idList);
      })
    );
    return capabilities.flat(1);
  }

  private getManagerInstance(recordType: RecordType): ICapabilitiesManagerInstance {
    let capabilitiesManagerInstance: ICapabilitiesManagerInstance;

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
