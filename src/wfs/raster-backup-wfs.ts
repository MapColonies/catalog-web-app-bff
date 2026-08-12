import fs from 'fs';
import path from 'path';
import { IConfig } from 'config';
import { BBox } from 'geojson';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import turfBbox from '@turf/bbox';
import { Services } from '../common/constants';
import { IContext, IService } from '../common/interfaces';
import { GeojsonFeatureCollection } from '../graphql/export-layer';
import { RasterBackupParams } from '../graphql/inputTypes';
import { GetFeature } from '../graphql/wfs';
import { extractErrorMessage, requestExecutor, stringifyObject } from '../utils';
import { IGetFeatureOptionsByFeature, IWFSClientOptions } from './wfs-client/interfaces';
import WfsClient from './wfs-client/wfs-client';

const bboxesOverlap = (a: BBox, b: BBox): boolean => a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];

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

  public async getFeature(options: IGetFeatureOptionsByFeature, ctx?: IContext): Promise<GetFeature> {
    this.logger.info(`[RasterBackupWFS][getFeature] ${stringifyObject(options)}`);
    try {
      const raw = fs.readFileSync(POLYGON_PARTS_MOCK_PATH, 'utf-8');
      const parsed = JSON.parse(raw) as CapturedGetPolygonPartsFeatureResponse;
      const response = parsed.data.getPolygonPartsFeature;
      const queryBbox = turfBbox(options.feature);
      const matchedFeatures = (response.features ?? []).filter((feature) => bboxesOverlap(turfBbox(feature), queryBbox));
      const startIndex = options.startIndex ?? 0;
      const count = options.count ?? matchedFeatures.length;
      const pageFeatures = matchedFeatures.slice(startIndex, startIndex + count);
      return await Promise.resolve({
        ...response,
        features: pageFeatures,
        totalFeatures: matchedFeatures.length,
        numberMatched: matchedFeatures.length,
        numberReturned: pageFeatures.length,
      });
      // const wfsClient = this.getWfsClient(ctx);
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
