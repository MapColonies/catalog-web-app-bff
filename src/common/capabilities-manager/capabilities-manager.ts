import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { Capability } from '../../graphql/capability';
import { Domain } from '../../graphql/domain';
import { CapabilitiesLayersSearchParams } from '../../graphql/inputTypes';
import { Services } from '../constants';
import { IConfig, IContext } from '../interfaces';
import { ICapabilitiesManagerInstance, ICapabilitiesManagerService } from './capabilities-manager.interface';
import { CapabilitiesManagerRaster } from './capabilities-manager-raster';

type MapServices = Record<Domain, ICapabilitiesManagerInstance>;

@singleton()
export class CapabilitiesManager implements ICapabilitiesManagerService {
  private readonly mapServices: MapServices = {} as MapServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.mapServices.RASTER = new CapabilitiesManagerRaster(this.config, this.logger);
  }

  public async getCapabilities(params: CapabilitiesLayersSearchParams, ctx: IContext): Promise<Capability[]> {
    const capabilities = await Promise.all(
      params.data.map(async (item) => {
        return this.getManagerInstance(item.recordType).getCapabilities(item.idList, ctx);
      })
    );
    return capabilities.flat(1);
  }

  private getManagerInstance(recordType: RecordType): ICapabilitiesManagerInstance {
    switch (recordType) {
      case RecordType.RECORD_RASTER:
        return this.mapServices.RASTER;
      default:
        throw new Error(`Unsupported record type: ${recordType}`);
    }
  }
}
