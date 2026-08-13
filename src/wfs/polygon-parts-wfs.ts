import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../common/constants';
import { IContext, IService } from '../common/interfaces';
import { extractErrorMessage, stringifyObject } from '../utils';
import { IGetFeatureOptionsByFeature, IGetFeatureResponse } from './wfs-client/interfaces';
import { createWfsClient } from './wfs-client-factory';

const UNAVAILABLE_ERROR = 'Failed to execute request to Polygon Parts WFS service. Service is unavailable';

@singleton()
export class PolygonPartsWFS {
  private readonly service: IService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('polygonParts');
  }

  public async getFeature(options: IGetFeatureOptionsByFeature, ctx: IContext): Promise<IGetFeatureResponse> {
    this.logger.info(`[PolygonPartsWFS][getFeature] ${stringifyObject(options)}`);
    const wfsClient = createWfsClient({
      service: this.service,
      logger: this.logger,
      context: ctx,
      logPrefix: 'PolygonPartsWFS',
      unavailableMessage: UNAVAILABLE_ERROR,
    });
    try {
      const res = await wfsClient.getFeatureByFeature({ ...options });
      return res as IGetFeatureResponse;
    } catch (err) {
      const error = 'Failed to retrieve Polygon Parts feature data';
      this.logger.error(`[PolygonPartsWFS][getFeature][ERROR] ${extractErrorMessage(err)}`);
      throw new Error(error);
    }
  }
}
