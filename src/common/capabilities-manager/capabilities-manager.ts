import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { Domain } from '../../graphql/domain';
import { Capability } from '../../graphql/capability';
import { CapabilitiesLayersSearchParams } from '../../graphql/inputTypes';
import { IConfig, IContext } from '../interfaces';
import { Services } from '../constants';
import { CapabilitiesManagerRaster } from './capabilities-manager-raster';
import { ICapabilitiesManagerInstance, ICapabilitiesManagerService } from './capabilities-manager.interface';

type MapServices = Record<Domain, ICapabilitiesManagerInstance>;

@singleton()
export class CapabilitiesManager implements ICapabilitiesManagerService {
  private readonly mapServices: MapServices = {} as MapServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.mapServices.RASTER = new CapabilitiesManagerRaster(this.config, this.logger);
  }

  public async getCapabilities(params: CapabilitiesLayersSearchParams, ctx: IContext): Promise<Capability[]> {
    this.logger.info(`[CapabilitiesManager][getCapabilities] calling getCapabilities manager`);
    const capabilities = await Promise.all(
      params.data.map(async (item) => {
        return this.getManagerInstance(item.recordType).getCapabilities(item.idList, ctx);
      })
    );
    return capabilities.flat(1);
  }

  private getManagerInstance(recordType: RecordType): ICapabilitiesManagerInstance {
    let capabilitiesManagerInstance: ICapabilitiesManagerInstance;

    switch (RecordType[recordType]) {
      default:
        capabilitiesManagerInstance = this.mapServices.RASTER;
        break;
    }

    return capabilitiesManagerInstance;
  }
}
