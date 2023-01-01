import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { IContext } from '../../common/interfaces';
import { WFS } from '../../wfs/WFS';
import { WfsGetFeatureParams } from '../inputTypes';
import { GetFeature, GetFeatureTypes, IFeatureTypesConfigs } from '../wfs';

export const FEATURE_DESCRIPTORS_FALLBACK_PROPERTY = 'default';

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
    const { pointCoordinates, typeName, count, dWithin } = data;
    const getFeatureResponse = await this.wfs.getFeature({ pointCoordinates, typeName, count, dWithin }, ctx);

    return getFeatureResponse;
  }

  @Query((type) => GetFeatureTypes)
  public async getFeatureTypes(
    @Ctx()
    ctx: IContext
  ): Promise<GetFeatureTypes> {
    const getFeatureTypesResponse = await this.wfs.getFeatureTypes(ctx);
    const featureTypesConfigs = this.getFeatureTypesConfigs();

    return { typesArr: getFeatureTypesResponse, featureConfigs: featureTypesConfigs };
  }

  private getFeatureTypesConfigs(): IFeatureTypesConfigs {
    return {
      addrs: {
        color: '#4fe368',
        outlineColor: '#017d16',
        dWithin: 30,
        isVisualized: false,
      },
      buildings: {
        color: '#7ebded',
        outlineColor: '#0465b0',
        dWithin: 3,
        isVisualized: true,
        translationId: 'actions.wfs.buildings-title',
        icon: 'location_city',
      },
      roads: {
        color: '#ffb405',
        dWithin: 10,
        isVisualized: true,
      },
      [FEATURE_DESCRIPTORS_FALLBACK_PROPERTY]: {
        dWithin: 5,
        isVisualized: false,
      },
    };
  }
}
