/* eslint-disable @typescript-eslint/no-unused-vars */
import { BBOX as BBOXCswClient, FilterField as FilterFieldCswClient, SortField as SortFieldCswClient } from '@map-colonies/csw-client';
import { RecordType } from '@map-colonies/mc-model-types';
import { GraphQLScalarType } from 'graphql';
import { InputType, Field, Int } from 'type-graphql';
import { Layer3DRecordInput, LayerDemRecordInput, LayerRasterRecordInput } from '../AUTOGENERATED/GraphQLClass';
import { Status } from './job';

const paramsObject = new GraphQLScalarType({ name: 'paramsObject' });

@InputType()
export class BBOX extends BBOXCswClient {
  @Field({ nullable: false })
  public llat: number;
  @Field({ nullable: false })
  public llon: number;
  @Field({ nullable: false })
  public ulat: number;
  @Field({ nullable: false })
  public ulon: number;
}

@InputType()
export class FilterField extends FilterFieldCswClient {
  @Field({ nullable: true })
  public or?: boolean;
  @Field({ nullable: false })
  public field: string;
  @Field({ nullable: true })
  public like?: string;
  @Field({ nullable: true })
  public eq?: string;
  @Field({ nullable: true })
  public neq?: string;
  @Field({ nullable: true })
  public gt?: string;
  @Field({ nullable: true })
  public lt?: string;
  @Field({ nullable: true })
  public gteq?: string;
  @Field({ nullable: true })
  public lteq?: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String, String], { nullable: true })
  public in?: [string, string];
  @Field({ nullable: true })
  public bbox?: BBOX;
}

@InputType()
export class SortField extends SortFieldCswClient {
  @Field({ nullable: false })
  public field: string;
  @Field({ nullable: true })
  public desc?: boolean;
}

@InputType()
export class SearchOptions {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [FilterField], { nullable: true })
  public filter?: FilterField[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [SortField], { nullable: true })
  public sort?: SortField[];
}

// TODO: might be auto-generated due to isManuallyEditable flag while decorated
@InputType()
export class RecordsEditableFields {
  @Field({ nullable: true })
  public productName?: string;

  @Field({ nullable: true })
  public description?: string;

  // @Field((type) => [SensorType], { nullable: true })
  // public sensorType?: SensorType[];

  @Field({ nullable: true })
  public productSubType?: string;

  @Field({ nullable: true })
  public producerName?: string;

  @Field({ nullable: true })
  public classification?: string;

  @Field({ nullable: true })
  public keywords?: string;
}

@InputType()
export class RecordUpdatePartial extends RecordsEditableFields {
  @Field({ nullable: false })
  public id: string;

  @Field((type) => RecordType, { nullable: false })
  public type?: RecordType;
}

@InputType()
export class IngestionDemData {
  @Field({ nullable: false })
  public directory: string;

  @Field((type) => [String], { nullable: false })
  public fileNames: string[];

  @Field({ nullable: false })
  public metadata: LayerDemRecordInput;

  @Field((type) => RecordType, { nullable: false })
  public type?: RecordType;
}

@InputType()
export class Ingestion3DData {
  @Field({ nullable: false })
  public directory: string;

  @Field((type) => [String], { nullable: false })
  public fileNames: string[];

  @Field({ nullable: false })
  public metadata: Layer3DRecordInput;

  @Field((type) => RecordType, { nullable: false })
  public type?: RecordType;
}

@InputType()
export class IngestionRasterData {
  @Field({ nullable: false })
  public directory: string;

  @Field((type) => [String], { nullable: false })
  public fileNames: string[];

  @Field({ nullable: false })
  public metadata: LayerRasterRecordInput;

  @Field((type) => RecordType, { nullable: false })
  public type?: RecordType;
}

@InputType()
export class JobsSearchParams {
  @Field({ nullable: true })
  public resourceId?: string;

  @Field({ nullable: true })
  public version?: string;

  @Field({ nullable: true })
  public isCleaned?: boolean;

  @Field((type) => Status, { nullable: true })
  public status?: Status;

  @Field({ nullable: true })
  public type?: string;

  @Field((type) => Date, { nullable: true })
  public fromDate?: Date;

  @Field((type) => Date, { nullable: true })
  public tillDate?: Date;
}
@InputType()
export class TasksSearchParams {
  @Field({ nullable: false })
  public jobId: string;
}

@InputType()
export class JobUpdateData {
  @Field((type) => paramsObject, { nullable: true })
  public parameters?: Record<string, unknown>;

  @Field({ nullable: true })
  public status?: string;

  @Field({ nullable: true })
  public percentage?: number;

  @Field({ nullable: true })
  public reason?: string;

  @Field({ nullable: true })
  public isCleaned?: boolean;

  @Field((type) => Int, { nullable: true })
  public priority?: number;
}

@InputType()
export class StringArray {
  @Field((type) => [String])
  public value: string[];
}
@InputType()
export class ExplorerGetById {
  @Field((type) => String, { nullable: false })
  public id!: string;

  @Field((type) => RecordType, { nullable: false })
  public type!: RecordType;
}

@InputType()
export class ExplorerGetByPathSuffix {
  @Field((type) => String, { nullable: false })
  public pathSuffix!: string;

  @Field((type) => RecordType, { nullable: false })
  public type!: RecordType;
}

export type IngestionData = IngestionDemData | Ingestion3DData | IngestionRasterData;
