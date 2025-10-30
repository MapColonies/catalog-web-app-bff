import { Field, ObjectType } from 'type-graphql';
import { Ingestion3DData, IngestionDemData } from './inputTypes';

@ObjectType()
export class RasterIngestion {
  @Field((type) => String)
  public jobId: string;
}

export type IngestionResultData = IngestionDemData | Ingestion3DData | RasterIngestion;
