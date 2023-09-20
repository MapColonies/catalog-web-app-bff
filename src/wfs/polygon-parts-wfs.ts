import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { requestExecutor } from '../utils';
import { Services } from '../common/constants';
import { IContext, IService } from '../common/interfaces';
import WfsClient from './wfs-client/wfs-client';
import { IGetFeatureOptions, IGetFeatureResponse, IWFSClientOptions } from './wfs-client/interfaces';

@singleton()
export class PolygonPartsWFS {
  private readonly service: IService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('polygonParts');
  }

  public async getFeature(options: Omit<IGetFeatureOptions, 'typeName'>, ctx?: IContext): Promise<IGetFeatureResponse> {
    const wfsClient = this.getWfsClient(ctx);
    const res = await wfsClient.getFeature({ ...options, typeName: this.service.wfsFeatureType ?? '' });

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
