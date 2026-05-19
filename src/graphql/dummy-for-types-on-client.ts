/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars */
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { RasterIngestionJobType, RasterJobType } from '../common/job-manager/job-manager-raster';

const RasterIngestionJobTypeRegister = registerEnumType(RasterIngestionJobType, { name: 'RasterIngestionJobType' });
const RasterJobTypeRegister = registerEnumType(RasterJobType, { name: 'RasterJobType' });

@ObjectType()
export class DummyForTypesOnClient {
  @Field((type) => RasterIngestionJobType, { nullable: true })
  public dummy1?: RasterIngestionJobType;

  @Field((type) => RasterJobType, { nullable: true })
  public dummy2?: RasterJobType;
}
