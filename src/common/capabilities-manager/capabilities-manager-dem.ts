import { Logger } from '@map-colonies/js-logger';
import { Capability } from '../../graphql/capability';
import { xmlToCapabilities } from '../../helpers/xml';
// import MAP_SERVICE_MOCK_RESPONSE from '../../graphql/MOCKS/get-capabilities/DEM/GEOSERVER';
import { requestHandlerWithToken } from '../../utils';
import { IConfig, IContext } from '../interfaces';
import { ICapabilitiesManagerInstance } from './capabilities-manager.interface';

export class CapabilitiesManagerDem implements ICapabilitiesManagerInstance {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('mapServices.dem.url');
  }

  public async getCapabilities(idList: string[], ctx: IContext): Promise<Capability[]> {
    this.logger.info(
      `[CapabilitiesManagerDem][getCapabilities] calling DEM getCapabilities: ${this.serviceURL}/gwc/service/wmts?REQUEST=GetCapabilities`
    );
    const response = await requestHandlerWithToken(`${this.serviceURL}/gwc/service/wmts?REQUEST=GetCapabilities`, 'GET', {}, ctx);
    // MOCK DATA - start
    // const response = await Promise.resolve(MAP_SERVICE_MOCK_RESPONSE);
    // MOCK DATA - end
    return xmlToCapabilities(idList, response.data);
  }
}