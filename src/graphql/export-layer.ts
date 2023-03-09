import { Field, ObjectType } from 'type-graphql';
import { Geometry, Feature, GeoJsonProperties } from 'geojson';
import { geojsonFeatureProperties, geoJsonObject } from './common-scalars';

@ObjectType()
export class GeojsonFeature {
  @Field((type) => String, { nullable: false })
  public type!: string;

  @Field((type) => geoJsonObject, { nullable: false })
  public geometry!: Geometry;

  @Field((type) => String, { nullable: true })
  public id?: string;

  @Field((type) => [Number], { nullable: true })
  public bbox?: number[];

  @Field((type) => geojsonFeatureProperties, { nullable: false })
  public properties!: GeoJsonProperties;
}

@ObjectType()
export class GeojsonFeatureCollection {
  @Field((type) => String, { nullable: false })
  public type!: string;

  @Field((type) => [GeojsonFeature], { nullable: false })
  public features!: Feature[];
}

@ObjectType()
export class EstimatedSize {
  @Field((type) => Number, { nullable: true })
  public estimatedSizeInKb?: number;
}

@ObjectType()
export class FreeDiskSpace {
  @Field((type) => Number, { nullable: true })
  public freeDiskSpaceInKb?: number;
}

@ObjectType()
export class TriggerExportTask {
  @Field((type) => String, { nullable: false })
  public jobId!: string;
}
