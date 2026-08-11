import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { extractErrorMessage } from '../../utils';
import { PolygonPartsWFS } from '../../wfs/polygon-parts-wfs';
import { RasterBackupWFS } from '../../wfs/raster-backup-wfs';
import { RasterBackupParams, WfsPolygonPartsGetFeatureParams } from '../inputTypes';
import { GetFeature } from '../wfs';

const GEOMETRY_COLUMN = 'footprint';

@Resolver()
export class PolygonPartsWfsResolver {
  private readonly logger: Logger;
  private readonly polygonPartsWFS: PolygonPartsWFS;
  private readonly rasterBackupWFS: RasterBackupWFS;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.polygonPartsWFS = container.resolve(PolygonPartsWFS);
    this.rasterBackupWFS = container.resolve(RasterBackupWFS);
  }

  @Query((type) => GetFeature)
  public async getPolygonPartsFeature(
    @Arg('data')
    data: WfsPolygonPartsGetFeatureParams,
    @Ctx()
    ctx: IContext
  ): Promise<GetFeature> {
    try {
      const getFeatureResponse = await this.polygonPartsWFS.getFeature(
        {
          ...data,
          geomRefFieldName: GEOMETRY_COLUMN,
        },
        ctx
      );
      return getFeatureResponse;
    } catch (err) {
      this.logger.error(`[PolygonPartsWFS][getPolygonPartsFeature][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query((type) => GetFeature)
  public async getRasterBackupPolygonParts(
    @Arg('data')
    data: RasterBackupParams
  ): Promise<GetFeature> {
    try {
      const getFeatureResponse = await this.rasterBackupWFS.getPolygonParts(data);
      return getFeatureResponse;
    } catch (err) {
      this.logger.error(`[PolygonPartsWFS][getRasterBackupPolygonParts][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query((type) => GetFeature)
  public async getRasterBackupOuterPerimeter(
    @Arg('data')
    data: RasterBackupParams
  ): Promise<GetFeature> {
    try {
      const getFeatureResponse = await this.rasterBackupWFS.getOuterPerimeter(data);
      return getFeatureResponse;
    } catch (err) {
      this.logger.error(`[PolygonPartsWFS][getRasterBackupOuterPerimeter][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }
}
