import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { requestHandler, requestHandlerWithToken } from '../utils';
import { Services } from '../common/constants';
import { IContext } from '../common/interfaces';
import WfsClient from './wfs-client/wfs-client';
import { IGetFeatureOptions, IGetFeatureResponse, IWFSClientOptions } from './wfs-client/interfaces';

@singleton()
export class WFS {
  private readonly baseWfsUrl: string;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.baseWfsUrl = this.config.get<string>('wfs.url');
  }

  public async getCapabilities(ctx?: IContext): Promise<Record<string, unknown>> {
    const wfsClient = this.getWfsClient(ctx);
    const res = await wfsClient.getCapabilities();

    return res as Record<string, unknown>;
  }

  public async getFeature(options: IGetFeatureOptions, ctx?: IContext): Promise<IGetFeatureResponse> {
    const wfsClient = this.getWfsClient(ctx);
    const res = await wfsClient.getFeature(options);

    return res as IGetFeatureResponse;
  }

  private getWfsClient(ctx?: IContext): WfsClient {
    const wfsClientOptions: IWFSClientOptions = {
      baseUrl: this.baseWfsUrl,
      requestExecutor: async (url, method, params): Promise<unknown> => {
        return requestHandler(url, method, params, ctx);
      },
    };

    const wfsClient = new WfsClient(wfsClientOptions, this.logger);

    return wfsClient;
  }
}
