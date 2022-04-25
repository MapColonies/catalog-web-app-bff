import { Logger } from '@map-colonies/js-logger';
import { inject, singleton } from 'tsyringe';
import { Capability } from '../../graphql/capability';
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

  public async getCapabilities(idList: string[]): Promise<Capability[]> {
    this.logger.info(`[CapabilitiesManager][getCapabilities] calling getCapabilities`);
    const rasterCapabilities = await this.mapServices.RASTER.getCapabilities(idList);
    const demCapabilities = await this.mapServices.DEM.getCapabilities(idList);
    return [...rasterCapabilities, ...demCapabilities];
  }
}
