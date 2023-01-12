import { GraphQLScalarType } from 'graphql';
import { Field, ObjectType } from 'type-graphql';
import { Geometry, Feature, GeoJsonProperties } from 'geojson';
import { CRS } from '../wfs/wfs-client/interfaces';

export const geoJsonObject = new GraphQLScalarType({ name: 'geoJsonObject' });
export const crsObject = new GraphQLScalarType({ name: 'crsObject' });
export const featureProperties = new GraphQLScalarType({ name: 'featureProperties' });
export const featureConfigs = new GraphQLScalarType({ name: 'featureConfigs' });

@ObjectType()
export class WfsFeature {
  @Field((type) => String, { nullable: false })
  public type: string;

  @Field((type) => geoJsonObject, { nullable: false })
  public geometry: Geometry;

  @Field((type) => String, { nullable: true })
  public id?: string;

  @Field((type) => featureProperties, { nullable: false })
  public properties: GeoJsonProperties;
}

@ObjectType()
export class GetFeature {
  @Field((type) => String, { nullable: true })
  public type?: string;

  @Field((type) => [WfsFeature], { nullable: true })
  public features?: Feature[];

  @Field((type) => Number, { nullable: true })
  public totalFeatures?: number;

  @Field((type) => Number, { nullable: true })
  public numberMatched?: number;

  @Field((type) => Number, { nullable: true })
  public numberReturned?: number;

  @Field((type) => String, { nullable: true })
  public timeStamp?: Date;

  @Field((type) => crsObject, { nullable: true })
  public crs?: CRS;
}

export interface IFeatureTypesConfigs {
  [featureType: string]: {
    isVisualized?: boolean;
    color?: string;
    outlineColor?: string;
    dWithin?: number;
    icon?: string;
    translationId?: string;
    outlineWidth?: number;
  };
}

@ObjectType()
export class GetFeatureTypes {
  @Field((type) => [String], { nullable: true })
  public typesArr?: string[];

  @Field((type) => featureConfigs, { nullable: true })
  public featureConfigs: IFeatureTypesConfigs;
}
