import { GraphQLScalarType } from 'graphql';
import { ObjectType, InputType, Field, Int, registerEnumType, createUnionType } from 'type-graphql';
import { ProductType } from '@map-colonies/types';

export const resolvedRasterLayerData = new GraphQLScalarType({ name: 'resolvedRasterLayerData' });

export enum ExternalProtocol {
  XYZ = 'XYZ',
  WMTS = 'WMTS',
  WMS = 'WMS',
  OSM = 'OSM',
}
registerEnumType(ExternalProtocol, { name: 'ExternalProtocol' });

export enum BasemapLayerSourceType {
  RASTER_RESOURCE = 'RASTER_RESOURCE',
  EXTERNAL = 'EXTERNAL',
}
registerEnumType(BasemapLayerSourceType, { name: 'BasemapLayerSourceType' });

export enum ImportReviewLayerStatus {
  RESOLVED = 'RESOLVED',
  UNRESOLVED = 'UNRESOLVED',
}
registerEnumType(ImportReviewLayerStatus, { name: 'ImportReviewLayerStatus' });

@ObjectType()
export class BasemapThumbnail {
  @Field({ nullable: false })
  public url: string;

  @Field((type) => Int, { nullable: false })
  public width: number;

  @Field((type) => Int, { nullable: false })
  public height: number;
}

@InputType()
export class ExternalLayerDetailsInput {
  @Field((type) => ExternalProtocol, { nullable: false })
  public protocol: ExternalProtocol;

  @Field({ nullable: false })
  public name: string;

  @Field({ nullable: false })
  public url: string;
}

@ObjectType()
export class ExternalLayerDetails {
  @Field((type) => ExternalProtocol, { nullable: false })
  public protocol: ExternalProtocol;

  @Field({ nullable: false })
  public name: string;

  @Field({ nullable: false })
  public url: string;
}

@ObjectType()
export class ExternalLayerSource {
  @Field((type) => ExternalLayerDetails, { nullable: false })
  public details: ExternalLayerDetails;
}

@ObjectType()
export class RasterResolvedResourceSource {
  @Field((type) => resolvedRasterLayerData, { nullable: true })
  public layer?: unknown;
}

export const BasemapLayerSourceUnion = createUnionType({
  name: 'BasemapLayerSource',
  types: () => [RasterResolvedResourceSource, ExternalLayerSource] as const,
  resolveType: (value: RasterResolvedResourceSource | ExternalLayerSource) =>
    'details' in value ? ExternalLayerSource : RasterResolvedResourceSource,
});

@ObjectType()
export class BasemapLayer {
  @Field({ nullable: false })
  public id: string;

  @Field((type) => Int, { nullable: false })
  public order: number;

  @Field({ nullable: false })
  public opacity: number;

  @Field({ nullable: true })
  public shouldBeUsedInModelDraping?: boolean;

  @Field((type) => BasemapLayerSourceUnion, { nullable: false })
  public source: typeof BasemapLayerSourceUnion;
}

@ObjectType()
export class Basemap {
  @Field({ nullable: false })
  public id: string;

  @Field({ nullable: false })
  public name: string;

  @Field((type) => BasemapThumbnail, { nullable: false })
  public thumbnail: BasemapThumbnail;

  @Field({ nullable: false })
  public isCurrent: boolean;

  @Field({ nullable: false })
  public isForPreview: boolean;

  @Field((type) => [BasemapLayer], { nullable: false })
  public layers: BasemapLayer[];
}

@InputType()
export class BasemapLayerSourceInput {
  @Field((type) => BasemapLayerSourceType, { nullable: false })
  public type: BasemapLayerSourceType;

  /** Present only when `type === RASTER_RESOURCE`. */
  @Field({ nullable: true })
  public productId?: string;

  /** Present only when `type === RASTER_RESOURCE`. */
  @Field((type) => ProductType, { nullable: true })
  public productType?: ProductType;

  /** Present only when `type === EXTERNAL`. */
  @Field((type) => ExternalLayerDetailsInput, { nullable: true })
  public details?: ExternalLayerDetailsInput;
}

@InputType()
export class BasemapLayerInput {
  @Field({ nullable: false })
  public id: string;

  @Field((type) => Int, { nullable: false })
  public order: number;

  @Field({ nullable: false })
  public opacity: number;

  @Field({ nullable: true })
  public shouldBeUsedInModelDraping?: boolean;

  @Field((type) => BasemapLayerSourceInput, { nullable: false })
  public source: BasemapLayerSourceInput;
}

@InputType()
export class CreateBasemapInput {
  @Field({ nullable: false })
  public name: string;

  @Field({ nullable: false })
  public isCurrent: boolean;

  @Field({ nullable: false })
  public isForPreview: boolean;

  @Field((type) => [BasemapLayerInput], { nullable: false })
  public layers: BasemapLayerInput[];

  @Field({ nullable: false })
  public thumbnailBase64: string;

  @Field({ nullable: false })
  public thumbnailContentType: string;
}

@InputType()
export class UpdateBasemapInput {
  @Field({ nullable: false })
  public name: string;

  @Field({ nullable: false })
  public isCurrent: boolean;

  @Field({ nullable: false })
  public isForPreview: boolean;

  @Field((type) => [BasemapLayerInput], { nullable: false })
  public layers: BasemapLayerInput[];

  @Field({ nullable: true })
  public thumbnailBase64?: string;

  @Field({ nullable: true })
  public thumbnailContentType?: string;
}

@ObjectType()
export class BasemapExportPackage {
  @Field({ nullable: false })
  public filename: string;

  @Field({ nullable: false })
  public contentBase64: string;
}

@ObjectType()
export class ImportReviewRoleConflict {
  @Field({ nullable: false })
  public basemapId: string;

  @Field({ nullable: false })
  public basemapName: string;
}

@ObjectType()
export class BasemapLayerSourceView {
  @Field((type) => BasemapLayerSourceType, { nullable: false })
  public type: BasemapLayerSourceType;

  @Field({ nullable: true })
  public productId?: string;

  @Field((type) => ProductType, { nullable: true })
  public productType?: ProductType;

  @Field((type) => ExternalLayerDetails, { nullable: true })
  public details?: ExternalLayerDetails;
}

@ObjectType()
export class ImportReviewLayer {
  @Field((type) => ImportReviewLayerStatus, { nullable: false })
  public status: ImportReviewLayerStatus;

  @Field({ nullable: false })
  public opacity: number;

  @Field({ nullable: true })
  public shouldBeUsedInModelDraping?: boolean;

  @Field((type) => BasemapLayerSourceView, { nullable: false })
  public source: BasemapLayerSourceView;
}

@ObjectType()
export class ImportReviewThumbnail {
  @Field({ nullable: false })
  public included: boolean;

  @Field((type) => Int, { nullable: true })
  public width?: number;

  @Field((type) => Int, { nullable: true })
  public height?: number;

  @Field({ nullable: true })
  public mimeType?: string;

  @Field({ nullable: true })
  public dataBase64?: string;
}

@ObjectType()
export class ImportReview {
  @Field({ nullable: false })
  public name: string;

  @Field({ nullable: false })
  public isCurrent: boolean;

  @Field({ nullable: false })
  public isForPreview: boolean;

  @Field((type) => ImportReviewRoleConflict, { nullable: true })
  public currentRoleConflict?: ImportReviewRoleConflict;

  @Field((type) => ImportReviewRoleConflict, { nullable: true })
  public previewRoleConflict?: ImportReviewRoleConflict;

  @Field((type) => ImportReviewThumbnail, { nullable: false })
  public thumbnail: ImportReviewThumbnail;

  @Field((type) => [ImportReviewLayer], { nullable: false })
  public layers: ImportReviewLayer[];
}
