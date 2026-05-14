import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { RasterJobType } from '../common/job-manager/job-manager-raster';

const RasterJobTypeRegister = registerEnumType(RasterJobType, { name: 'RasterJobType' });

@ObjectType()
export class DummyForTypesOnClient {
  @Field((type) => RasterJobType, { nullable: true })
  public dummy1?: RasterJobType | string;
}
