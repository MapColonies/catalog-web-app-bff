import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { extractErrorMessage } from '../../utils';
import { PolygonPartsWFS } from '../../wfs/polygon-parts-wfs';
import { WfsPolygonPartsGetFeatureParams } from '../inputTypes';
import { GetFeature } from '../wfs';

const GEOMETRY_COLUMN = 'footprint';

@Resolver()
export class PolygonPartsWfsResolver {
  private readonly logger: Logger;
  private readonly polygonPartsWFS: PolygonPartsWFS;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.polygonPartsWFS = container.resolve(PolygonPartsWFS);
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
}
