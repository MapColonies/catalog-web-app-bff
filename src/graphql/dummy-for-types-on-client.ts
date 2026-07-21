import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { RasterIngestionJobType, RasterJobType } from '../common/job-manager/job-manager-raster';

registerEnumType(RasterIngestionJobType, { name: 'RasterIngestionJobType' });
registerEnumType(RasterJobType, { name: 'RasterJobType' });

@ObjectType()
export class DummyForTypesOnClient {
  @Field((type) => RasterIngestionJobType, { nullable: true })
  public dummy1?: RasterIngestionJobType;

  @Field((type) => RasterJobType, { nullable: true })
  public dummy2?: RasterJobType;
}
