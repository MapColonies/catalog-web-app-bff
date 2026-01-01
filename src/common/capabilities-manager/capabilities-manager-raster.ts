import { Logger } from '@map-colonies/js-logger';
import { Capability } from '../../graphql/capability';
import { xmlToCapabilities } from '../../helpers/xml';
// import MAP_SERVICE_MOCK_RESPONSE from '../../graphql/MOCKS/get-capabilities/RASTER/MAP-PROXY';
import { requestExecutor } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { ICapabilitiesManagerInstance } from './capabilities-manager.interface';

export class CapabilitiesManagerRaster implements ICapabilitiesManagerInstance {
  private readonly service: IService;
  private readonly injectionPath = '/wmts/1.0.0/WMTSCapabilities.xml';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('mapServices.raster');
  }
  public async getCapabilities(idList: string[], ctx: IContext): Promise<Capability[]> {
    this.logger.info(`[CapabilitiesManagerRaster][getCapabilities] calling RASTER getCapabilities: ${this.service.url}${this.injectionPath}`);
    const response = await requestExecutor(
      {
        url: this.injectWmts(this.service.url),
        exposureType: this.service.exposureType,
      },
      'GET',
      {},
      ctx
    );
    // MOCK DATA - start
    // const response = await Promise.resolve(MAP_SERVICE_MOCK_RESPONSE);
    // MOCK DATA - end
    return xmlToCapabilities(idList, response.data);
  }

  private injectWmts(urlString: string): string {
    const url = new URL(urlString);

    // Avoid double-injecting
    if (!url.pathname.endsWith(this.injectionPath)) {
      url.pathname = url.pathname.replace(/\/$/, '') + this.injectionPath;
    }

    return url.toString();
  }
}
