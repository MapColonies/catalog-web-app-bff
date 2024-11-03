/* eslint-disable @typescript-eslint/no-unused-vars */
import { BBOX as BBOXCswClient, FilterField as FilterFieldCswClient, SortField as SortFieldCswClient } from '@map-colonies/csw-client';
import { RecordType } from '@map-colonies/mc-model-types';
import { GraphQLScalarType } from 'graphql';
import { InputType, Field, Int } from 'type-graphql';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import { Layer3DRecordInput, LayerDemRecordInput, LayerRasterRecordInput } from '../AUTOGENERATED/GraphQLClass';
import { LookupTableField } from './lookupTablesData';
import { Status } from './job';
import { GeojsonFeature, GeojsonFeatureCollection } from './export-layer';
import { geojsonFeatureProperties, geoJsonObject } from './common-scalars';

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

@InputType()
export class RecordUpdatePartial {
  @Field({ nullable: false })
  public id: string;

  @Field((type) => RecordType, { nullable: false })
  public type: RecordType;

  @Field((type) => paramsObject, { nullable: false })
  public partialRecordData: Record<string, unknown>;
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

@InputType()
export class ExplorerResolveMetadataAsModel {
  @Field((type) => String, { nullable: false })
  public metadata!: string;

  @Field((type) => RecordType, { nullable: false })
  public type!: RecordType;
}

@InputType()
export class CapabilitiesLayersSearchParam {
  @Field((type) => RecordType)
  public recordType: RecordType;

  @Field((type) => [String])
  public idList: string[];
}

@InputType()
export class CapabilitiesLayersSearchParams {
  @Field((type) => [CapabilitiesLayersSearchParam])
  public data: CapabilitiesLayersSearchParam[];
}

@InputType()
export class WfsGetFeatureParams {
  @Field((type) => [String, String], { nullable: false })
  public pointCoordinates!: [string, string];

  @Field((type) => String, { nullable: false })
  public typeName!: string;

  @Field((type) => Number, { nullable: true })
  public count?: number;

  @Field((type) => Number, { nullable: true })
  public dWithin?: number;
}

@InputType()
export class WfsFilterPropertyParam {
  @Field((type) => String, { nullable: false })
  public propertyName!: string;

  @Field((type) => String, { nullable: false })
  public propertyValue!: unknown;
}
@InputType()
export class WfsPolygonPartsGetFeatureParams {
  @Field((type) => GeojsonFeatureInput, { nullable: false })
  public feature!: Feature;

  @Field((type) => String, { nullable: false })
  public typeName!: string;

  @Field((type) => Number, { nullable: true })
  public count?: number;

  @Field((type) => Number, { nullable: true })
  public dWithin?: number;

  @Field((type) => [WfsFilterPropertyParam], { nullable: true })
  public filterProperties?: WfsFilterPropertyParam[];
}

@InputType()
export class LookupTableFieldInput implements LookupTableField {
  @Field((type) => String, { nullable: true })
  public lookupTable?: string;

  @Field((type) => String, { nullable: true })
  public lookupExcludeFields?: string[];
}

@InputType()
export class GetLookupTablesParams {
  @Field((type) => [LookupTableFieldInput], { nullable: true })
  public lookupFields?: LookupTableField[];
}

@InputType()
export class GeojsonFeatureInput implements GeojsonFeature {
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

@InputType()
export class GeojsonFeatureCollectionInput implements GeojsonFeatureCollection {
  @Field((type) => String, { nullable: false })
  public type!: string;

  @Field((type) => [GeojsonFeatureInput], { nullable: false })
  public features!: Feature[];
}

@InputType()
export class GetExportEstimatedSizeInput {
  @Field((type) => RecordType, { nullable: false })
  public type!: RecordType;

  @Field((type) => GeojsonFeatureCollectionInput, { nullable: false })
  public selections!: GeojsonFeatureCollection;
}

@InputType()
export class GetFreeDiskSpaceInput {
  @Field((type) => RecordType, { nullable: false })
  public type!: RecordType;
}

@InputType()
export class TriggerExportTaskInput {
  @Field((type) => RecordType, { nullable: false })
  public type!: RecordType;

  @Field((type) => String, { nullable: false })
  public catalogRecordID!: string;

  @Field((type) => paramsObject, { nullable: false })
  public parameters!: Record<string, unknown>;
}

@InputType()
export class DemHeightsPositionInput {
  @Field((type) => Number, { nullable: false })
  public latitude!: number;

  @Field((type) => Number, { nullable: false })
  public longitude!: number;
}

@InputType()
export class GetDemPointsHeightsInput {
  @Field((type) => [DemHeightsPositionInput], { nullable: false })
  public positions!: DemHeightsPositionInput[];

  @Field((type) => String, { nullable: true })
  public productType?: string;
}

@InputType()
export class UserLoginParams {
  @Field((type) => String, { nullable: false })
  public userName!: string;

  @Field((type) => String, { nullable: false })
  public userPassword!: string;
}

@InputType()
export class SourceValidationParams {
  @Field((type) => String, { nullable: false })
  public originDirectory!: string;

  @Field((type) => [String], { nullable: false })
  public fileNames!: string[];

  @Field((type) => RecordType, { nullable: false })
  public type!: RecordType;
}

export type IngestionData = IngestionDemData | Ingestion3DData | IngestionRasterData;
