import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { IContext } from '../../common/interfaces';
import { WFS } from '../../wfs/WFS';
import { WfsGetFeatureParams } from '../inputTypes';
import { GetFeature, GetFeatureTypes } from '../wfs';

@Resolver()
export class WfsResolver {
  private readonly wfs: WFS;

  public constructor() {
    this.wfs = container.resolve(WFS);
  }

  @Query((type) => GetFeature)
  public async getFeature(
    @Arg('data')
    data: WfsGetFeatureParams,
    @Ctx()
    ctx: IContext
  ): Promise<GetFeature> {
    const { pointCoordinates, typeNames, count } = data;
    const getFeatureResponse = await this.wfs.getFeature({ pointCoordinates, typeNames, count }, ctx);

    return getFeatureResponse;
  }

  @Query((type) => GetFeatureTypes)
  public async getFeatureTypes(
    @Ctx()
    ctx: IContext
  ): Promise<GetFeatureTypes> {
    const getFeatureTypesResponse = await this.wfs.getFeatureTypes(ctx);

    return { typesArr: getFeatureTypesResponse };
  }
}
