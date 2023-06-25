import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { requestExecutor } from '../utils';
import { Services } from '../common/constants';
import { IContext, IService } from '../common/interfaces';
import WfsClient from './wfs-client/wfs-client';
import { IGetFeatureOptions, IGetFeatureResponse, IWFSClientOptions } from './wfs-client/interfaces';

@singleton()
export class WFS {
  private readonly service: IService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('wfs');
  }

  public async getCapabilities(ctx?: IContext): Promise<Record<string, unknown>> {
    const wfsClient = this.getWfsClient(ctx);
    const res = await wfsClient.getCapabilities();

    return res as Record<string, unknown>;
  }

  public async getFeatureTypes(ctx?: IContext): Promise<string[]> {
    const wfsClient = this.getWfsClient(ctx);
    const res = await wfsClient.getFeatureTypeList();

    return res;
  }

  public async getFeature(options: IGetFeatureOptions, ctx?: IContext): Promise<IGetFeatureResponse> {
    const wfsClient = this.getWfsClient(ctx);
    const res = await wfsClient.getFeature(options);

    return res as IGetFeatureResponse;
  }

  private getWfsClient(ctx?: IContext): WfsClient {
    const wfsClientOptions: IWFSClientOptions = {
      baseUrl: 'NOT_IN_USE.COM',
      requestExecutor: async (url, method, params): Promise<unknown> => {
        return requestExecutor(this.service, method, params, ctx as IContext);
      },
    };

    const wfsClient = new WfsClient(wfsClientOptions, this.logger);

    return wfsClient;
  }
}
