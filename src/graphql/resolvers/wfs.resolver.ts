import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { WFS } from '../../wfs/WFS';
import { WfsGetFeatureParams } from '../inputTypes';
import { GetFeature, GetFeatureTypes, IFeatureTypesConfigs } from '../wfs';

@Resolver()
export class WfsResolver {
  private readonly wfs: WFS;
  private readonly config: IConfig;

  public constructor() {
    this.wfs = container.resolve(WFS);
    this.config = container.resolve(Services.CONFIG);
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
    const featureTypesConfigs = this.getFeatureTypesConfigs(getFeatureTypesResponse);

    return { typesArr: getFeatureTypesResponse, featureConfigs: featureTypesConfigs };
  }

  private getFeatureTypesConfigs(features: string[]): IFeatureTypesConfigs {
    const DEFAULT_CONFIG = {
      dWithin: 5,
      isVisualized: false,
    };

    const defaultFeaturesConfigs = features.reduce((featuresConfig, featureType) => {
      return {
        ...featuresConfig,
        [featureType]: DEFAULT_CONFIG,
      };
    }, {} as IFeatureTypesConfigs);

    try {
      const featureTypesConfig = JSON.parse(this.config.get('wfsServicesConfig')) as IFeatureTypesConfigs;
      const featureDescFromConfig = { ...defaultFeaturesConfigs, ...featureTypesConfig };
      return featureDescFromConfig;
    } catch (e) {
      return defaultFeaturesConfigs;
    }
  }
}
