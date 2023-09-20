import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { IContext } from '../../common/interfaces';
import { WfsPolygonPartsGetFeatureParams } from '../inputTypes';
import { GetFeature } from '../wfs';
import { PolygonPartsWFS } from '../../wfs/polygon-parts-wfs';

@Resolver()
export class PolygonPartsWfsResolver {
  private readonly polygonPartsWFS: PolygonPartsWFS;

  public constructor() {
    this.polygonPartsWFS = container.resolve(PolygonPartsWFS);
  }

  @Query((type) => GetFeature)
  public async getPolygonPartsFeature(
    @Arg('data')
    data: WfsPolygonPartsGetFeatureParams,
    @Ctx()
    ctx: IContext
  ): Promise<GetFeature> {
    const getFeatureResponse = await this.polygonPartsWFS.getFeature(data, ctx);

    return getFeatureResponse;
  }
}
