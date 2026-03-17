import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { extractErrorMessage } from '../../utils';
import { WFS } from '../../wfs/WFS';
import { WfsGetFeatureParams } from '../inputTypes';
import { GetFeature, GetFeatureTypes, IFeatureTypesConfigs } from '../wfs';

const GEOMETRY_COLUMN = 'osm:geom';

@Resolver()
export class WfsResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly wfs: WFS;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
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
    try {
      const getFeatureResponse = await this.wfs.getFeature(
        {
          pointCoordinates,
          typeName,
          count,
          dWithin,
          geomRefFieldName: GEOMETRY_COLUMN,
        },
        ctx
      );
      return getFeatureResponse;
    } catch (err) {
      const error = 'Failed to retrieve WFS feature data';
      this.logger.error(`[WFS][getFeature][ERROR] ${error}: ${extractErrorMessage(err)}`);
      throw new Error(error);
    }
  }

  @Query((type) => GetFeatureTypes)
  public async getFeatureTypes(
    @Ctx()
    ctx: IContext
  ): Promise<GetFeatureTypes> {
    try {
      const getFeatureTypesResponse = await this.wfs.getFeatureTypes(ctx);
      const featureTypesConfigs = this.getFeatureTypesConfigs(getFeatureTypesResponse);
      return { typesArr: getFeatureTypesResponse, featureConfigs: featureTypesConfigs };
    } catch (err) {
      const error = 'Failed to retrieve WFS feature types';
      this.logger.error(`[WFS][getFeatureTypes][ERROR] ${error}: ${extractErrorMessage(err)}`);
      throw new Error(error);
    }
  }

  private getFeatureTypesConfigs(features: string[]): IFeatureTypesConfigs {
    const DEFAULT_CONFIG = {
      dWithin: 5,
      isVisualized: false,
      outlineWidth: 5,
    };

    const defaultFeaturesConfigs = features.reduce((featuresConfig, featureType) => {
      return {
        ...featuresConfig,
        [featureType]: DEFAULT_CONFIG,
      };
    }, {} as IFeatureTypesConfigs);

    try {
      const featureTypesConfig = JSON.parse(this.config.get('wfsServicesConfig')) as IFeatureTypesConfigs;
      const featureDescFromConfig: IFeatureTypesConfigs = {};
      for (const [key, val] of Object.entries(defaultFeaturesConfigs)) {
        featureDescFromConfig[key] = { ...val, ...((featureTypesConfig[key] as Record<string, unknown> | undefined) ?? {}) };
      }
      return featureDescFromConfig;
    } catch (err) {
      this.logger.error(`[WFS][getFeatureTypesConfigs][ERROR] ${extractErrorMessage(err)}`);
      return defaultFeaturesConfigs;
    }
  }
}
