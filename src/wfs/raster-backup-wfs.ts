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
import { extractErrorMessage, stringifyObject } from '../utils';
import { IGetFeatureOptionsByFeature } from './wfs-client/interfaces';
// import { createWfsClient } from './wfs-client-factory';

// const UNAVAILABLE_ERROR = 'Failed to execute request to Raster Backup WFS service. Service is unavailable';

const bboxesOverlap = (a: BBox, b: BBox): boolean => a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];

const POLYGON_PARTS_MOCK_PATH = path.join(__dirname, '../graphql/MOCKS/raster-backup/center_1st_WFS.geojson');

interface CapturedGetPolygonPartsFeatureResponse {
  data: { getPolygonPartsFeature: GetFeature };
}

@singleton()
export class RasterBackupWFS {
  private readonly service: IService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('rasterBackup');
  }

  public async getFeature(options: IGetFeatureOptionsByFeature, ctx: IContext): Promise<GetFeature> {
    this.logger.info(`[RasterBackupWFS][getFeature] ${stringifyObject(options)}`);
    // const wfsClient = createWfsClient({
    //   service: this.service,
    //   logger: this.logger,
    //   context: ctx,
    //   logPrefix: 'RasterBackupWFS',
    //   unavailableMessage: UNAVAILABLE_ERROR,
    // });
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
      // const res = await wfsClient.getFeatureByFeature({ ...options });
      // return res as GetFeature;
    } catch (err) {
      const error = 'Failed to retrieve Polygon Parts feature data';
      this.logger.error(`[RasterBackupWFS][getFeature][ERROR] ${extractErrorMessage(err)}`);
      throw new Error(error);
    }
  }
}
