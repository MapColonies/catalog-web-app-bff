import { IConfig } from 'config';
import fs from 'fs';
import path from 'path';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../common/constants';
import { IContext, IService } from '../common/interfaces';
import { GeojsonFeatureCollection } from '../graphql/export-layer';
import { RasterBackupParams } from '../graphql/inputTypes';
import { GetFeature } from '../graphql/wfs';
import { extractErrorMessage, requestExecutor, stringifyObject } from '../utils';
import { IGetFeatureOptionsByFeature, IGetFeatureResponse, IWFSClientOptions } from './wfs-client/interfaces';
import WfsClient from './wfs-client/wfs-client';

const POLYGON_PARTS_MOCK_PATH = path.join(__dirname, '../graphql/MOCKS/raster-backup/center_1st_WFS.geojson');
const OUTER_PERIMETER_MOCK_PATH = path.join(__dirname, '../graphql/MOCKS/raster-backup/center_1st_footprint.geojson');

interface CapturedGetPolygonPartsFeatureResponse {
  data: { getPolygonPartsFeature: GetFeature };
}

@singleton()
export class RasterBackupWFS {
  private readonly service: IService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('rasterBackup');
  }

  public async getOuterPerimeter(params: RasterBackupParams): Promise<GeojsonFeatureCollection> {
    this.logger.info(`[RasterBackupWFS][getOuterPerimeter] ${stringifyObject(params)}`);
    const raw = fs.readFileSync(OUTER_PERIMETER_MOCK_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as GeojsonFeatureCollection;
    return Promise.resolve(parsed);
  }

  public async getFeature(options: IGetFeatureOptionsByFeature, ctx?: IContext): Promise<IGetFeatureResponse> {
    this.logger.info(`[RasterBackupWFS][getFeature] ${stringifyObject(options)}`);
    const wfsClient = this.getWfsClient(ctx);
    try {
      const raw = fs.readFileSync(POLYGON_PARTS_MOCK_PATH, 'utf-8');
      const parsed = JSON.parse(raw) as CapturedGetPolygonPartsFeatureResponse;
      return Promise.resolve(parsed.data.getPolygonPartsFeature);
      // const res = await wfsClient.getFeatureByFeature({ ...options });
      // return res as IGetFeatureResponse;
    } catch (err) {
      const error = 'Failed to retrieve Polygon Parts feature data';
      this.logger.error(`[RasterBackupWFS][getFeature][ERROR] ${extractErrorMessage(err)}`);
      throw new Error(error);
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
          this.logger.error(`[RasterBackupWFS][requestExecutor][ERROR] ${extractErrorMessage(err)}`);
          throw new Error(error);
        }
      },
    };

    const wfsClient = new WfsClient(wfsClientOptions, this.logger);
    return wfsClient;
  }
}
