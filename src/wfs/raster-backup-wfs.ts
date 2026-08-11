import fs from 'fs';
import path from 'path';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../common/constants';
import { GeojsonFeatureCollection } from '../graphql/export-layer';
import { RasterBackupParams } from '../graphql/inputTypes';
import { GetFeature } from '../graphql/wfs';
import { stringifyObject } from '../utils';

const POLYGON_PARTS_MOCK_PATH = path.join(__dirname, '../graphql/MOCKS/raster-backup/center_1st_WFS.geojson');
const OUTER_PERIMETER_MOCK_PATH = path.join(__dirname, '../graphql/MOCKS/raster-backup/center_1st_footprint.geojson');

interface CapturedGetPolygonPartsFeatureResponse {
  data: { getPolygonPartsFeature: GetFeature };
}

@singleton()
export class RasterBackupWFS {
  public constructor(@inject(Services.LOGGER) private readonly logger: Logger) {}

  public async getPolygonParts(params: RasterBackupParams): Promise<GetFeature> {
    this.logger.info(`[RasterBackupWFS][getPolygonParts] ${stringifyObject(params)}`);
    const raw = fs.readFileSync(POLYGON_PARTS_MOCK_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as CapturedGetPolygonPartsFeatureResponse;
    return Promise.resolve(parsed.data.getPolygonPartsFeature);
  }

  public async getOuterPerimeter(params: RasterBackupParams): Promise<GeojsonFeatureCollection> {
    this.logger.info(`[RasterBackupWFS][getOuterPerimeter] ${stringifyObject(params)}`);
    const raw = fs.readFileSync(OUTER_PERIMETER_MOCK_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as GeojsonFeatureCollection;
    return Promise.resolve(parsed);
  }
}
