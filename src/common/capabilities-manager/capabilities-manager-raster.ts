import { Logger } from '@map-colonies/js-logger';
import { WmtsClient } from '@map-colonies/wmts-client';
import { CapabilityType } from '../../graphql/capability';
import { stringifyObject, urlHandler } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { ICapabilitiesManagerInstance } from './capabilities-manager.interface';

export class CapabilitiesManagerRaster implements ICapabilitiesManagerInstance {
  private readonly service: IService;
  private readonly injectionPath = '/wmts/1.0.0/WMTSCapabilities.xml';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('mapServices.raster');
  }

  public async getCapabilities(idList: string[], ctx: IContext): Promise<CapabilityType[]> {
    this.logger.info(`[Capabilities][Raster][getCapabilities] ${stringifyObject({ idList })}`);
    // `this.logger` is typed against this (very old) BFF's own @map-colonies/js-logger major version; WmtsClient only
    // calls the common pino debug/info/warn/error methods, which both versions implement identically at runtime.
    const wmtsClient = new WmtsClient(
      this.logger as unknown as ConstructorParameters<typeof WmtsClient>[0],
      this.injectWmts(urlHandler(this.service))
    );
    const capabilities = await wmtsClient.GetCapabilities();
    return capabilities.filter((capability) => idList.includes(capability.id));
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
