import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../common/constants';
import { IContext, IService } from '../common/interfaces';
import { extractErrorMessage, requestExecutor } from '../utils';
import { IGetFeatureOptionsByFeature, IGetFeatureResponse, IWFSClientOptions } from './wfs-client/interfaces';
import WfsClient from './wfs-client/wfs-client';

@singleton()
export class PolygonPartsWFS {
  private readonly service: IService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('polygonParts');
  }

  public async getFeature(options: IGetFeatureOptionsByFeature, ctx?: IContext): Promise<IGetFeatureResponse> {
    const wfsClient = this.getWfsClient(ctx);

    try {
      // TODO service.wfsFeatureType should be recieved or calculated due to naming convension (REMOVE OVERRIDE)
      // ----- polygon_parts:{lowercase(productId)}_{lowercase(productType)}
      const res = await wfsClient.getFeatureByFeature({ ...options /*, typeName: 'polygon_parts:orthophoto_best_orthophotobest' */ });
      return res as IGetFeatureResponse;
    } catch (err) {
      this.logger.error(`[PolygonPartsWFS][getFeature][ERROR] ${extractErrorMessage(err)}`);
      throw new Error('Failed to retrieve Polygon Parts feature data');
    }
  }

  private getWfsClient(ctx?: IContext): WfsClient {
    const wfsClientOptions: IWFSClientOptions = {
      baseUrl: 'NOT_IN_USE.COM',
      requestExecutor: async (url, method, params): Promise<unknown> => {
        try {
          return await requestExecutor(this.service, method, params, ctx as IContext);
        } catch (err) {
          const error = 'Failed to execute request to Polygon Parts WFS service. Service is unavailable';
          this.logger.error(`[PolygonPartsWFS][requestExecutor][ERROR] ${extractErrorMessage(err)}`);
          throw new Error(error);
        }
      },
    };

    const wfsClient = new WfsClient(wfsClientOptions, this.logger);
    return wfsClient;
  }
}
