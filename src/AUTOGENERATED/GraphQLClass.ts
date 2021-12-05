/* This file was auto-generated by MC-GENERATOR, DO NOT modify it manually */
/* eslint-disable */
/* tslint:disable */
import { InputType, ObjectType, Field, Resolver, registerEnumType } from "type-graphql";
import { GraphQLScalarType } from "graphql";
import { RecordType, SensorType, ProductType } from "@map-colonies/mc-model-types";

@InputType()
export class LinkInput {
    @Field({ nullable: true })
    public name?: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: false })
    public protocol: string;
    @Field({ nullable: false })
    public url: string;
}

@InputType()
export class DiscreteOrderInput {
    @Field({ nullable: false })
    public id: string;
    @Field({ nullable: false })
    public zOrder: number;
}

@InputType()
export class LayerRasterRecordInput {
    @Field((type) => RecordType, { nullable: true })
    public type?: RecordType;
    @Field({ nullable: true })
    public classification?: string;
    @Field({ nullable: false })
    public productName: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public srsId?: string;
    @Field({ nullable: true })
    public producerName?: string;
    @Field({ nullable: true })
    public creationDate?: Date;
    @Field({ nullable: true })
    public ingestionDate?: Date;
    @Field({ nullable: true })
    public updateDate?: Date;
    @Field({ nullable: true })
    public sourceDateStart?: Date;
    @Field({ nullable: true })
    public sourceDateEnd?: Date;
    @Field({ nullable: true })
    public accuracyCE90?: number;
    @Field((type) => [SensorType], { nullable: true })
    public sensorType?: SensorType[];
    @Field({ nullable: true })
    public region?: string;
    @Field({ nullable: false })
    public productId: string;
    @Field({ nullable: true })
    public productVersion?: string;
    @Field((type) => ProductType, { nullable: false })
    public productType: ProductType;
    @Field({ nullable: true })
    public productSubType?: string;
    @Field({ nullable: true })
    public srsName?: string;
    @Field({ nullable: true })
    public resolution?: number;
    @Field({ nullable: true })
    public maxResolutionMeter?: number;
    @Field({ nullable: true })
    public rms?: number;
    @Field({ nullable: true })
    public scale?: string;
    @Field((type) => footprintObject, { nullable: true })
    public footprint?: Record<string, unknown>;
    @Field((type) => layerPolygonPartsObject, { nullable: true })
    public layerPolygonParts?: Record<string, unknown>;
    @Field((type) => [String], { nullable: true })
    public includedInBests?: string[];
    @Field({ nullable: true })
    public productBoundingBox?: string;
    @Field({ nullable: false })
    public id: string;
    @Field({ nullable: true })
    public insertDate?: Date;
    @Field({ nullable: true })
    public keywords?: string;
    @Field((type) => [LinkInput], { nullable: true })
    public links?: LinkInput[];
}

export const footprintObject = new GraphQLScalarType({ name: "footprintObject"});
export const layerPolygonPartsObject = new GraphQLScalarType({ name: "layerPolygonPartsObject"});

@InputType()
export class Layer3DRecordInput {
    @Field((type) => RecordType, { nullable: true })
    public type?: RecordType;
    @Field({ nullable: false })
    public productId: string;
    @Field({ nullable: false })
    public productName: string;
    @Field({ nullable: true })
    public productVersion?: string;
    @Field((type) => ProductType, { nullable: false })
    public productType: ProductType;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public creationDate?: Date;
    @Field({ nullable: true })
    public updateDate?: Date;
    @Field({ nullable: true })
    public sourceDateStart?: Date;
    @Field({ nullable: true })
    public sourceDateEnd?: Date;
    @Field({ nullable: true })
    public minResolutionMeter?: number;
    @Field({ nullable: true })
    public maxResolutionMeter?: number;
    @Field({ nullable: true })
    public nominalResolution?: number;
    @Field({ nullable: true })
    public maxAccuracyCE90?: number;
    @Field({ nullable: true })
    public absoluteAccuracyLEP90?: number;
    @Field({ nullable: true })
    public accuracySE90?: number;
    @Field({ nullable: true })
    public relativeAccuracyLEP90?: number;
    @Field({ nullable: true })
    public visualAccuracy?: number;
    @Field((type) => [SensorType], { nullable: true })
    public sensorType?: SensorType[];
    @Field((type) => footprintObject, { nullable: true })
    public footprint?: Record<string, unknown>;
    @Field({ nullable: true })
    public heightRangeFrom?: number;
    @Field({ nullable: true })
    public heightRangeTo?: number;
    @Field({ nullable: true })
    public srsId?: string;
    @Field({ nullable: true })
    public srsName?: string;
    @Field({ nullable: true })
    public srsOrigin?: string;
    @Field({ nullable: true })
    public region?: string;
    @Field({ nullable: true })
    public classification?: string;
    @Field({ nullable: true })
    public productionSystem?: string;
    @Field({ nullable: true })
    public productionSystemVer?: string;
    @Field({ nullable: true })
    public producerName?: string;
    @Field({ nullable: true })
    public productionMethod?: string;
    @Field({ nullable: true })
    public minFlightAlt?: number;
    @Field({ nullable: true })
    public maxFlightAlt?: number;
    @Field({ nullable: true })
    public geographicArea?: string;
    @Field({ nullable: true })
    public productBoundingBox?: string;
    @Field({ nullable: false })
    public id: string;
    @Field({ nullable: true })
    public insertDate?: Date;
    @Field({ nullable: true })
    public wktGeometry?: string;
    @Field({ nullable: true })
    public keywords?: string;
    @Field((type) => [LinkInput], { nullable: true })
    public links?: LinkInput[];
}

@InputType()
export class BestRecordInput {
    @Field((type) => RecordType, { nullable: true })
    public type?: RecordType;
    @Field({ nullable: true })
    public classification?: string;
    @Field({ nullable: false })
    public productName: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public srsId?: string;
    @Field({ nullable: true })
    public producerName?: string;
    @Field({ nullable: true })
    public creationDate?: Date;
    @Field({ nullable: true })
    public ingestionDate?: Date;
    @Field({ nullable: true })
    public updateDate?: Date;
    @Field({ nullable: true })
    public sourceDateStart?: Date;
    @Field({ nullable: true })
    public sourceDateEnd?: Date;
    @Field({ nullable: true })
    public accuracyCE90?: number;
    @Field((type) => [SensorType], { nullable: true })
    public sensorType?: SensorType[];
    @Field({ nullable: true })
    public region?: string;
    @Field({ nullable: false })
    public productId: string;
    @Field({ nullable: true })
    public productVersion?: string;
    @Field((type) => ProductType, { nullable: false })
    public productType: ProductType;
    @Field({ nullable: true })
    public srsName?: string;
    @Field({ nullable: true })
    public resolution?: number;
    @Field({ nullable: true })
    public rms?: number;
    @Field({ nullable: true })
    public scale?: string;
    @Field((type) => footprintObject, { nullable: true })
    public footprint?: Record<string, unknown>;
    @Field((type) => layerPolygonPartsObject, { nullable: true })
    public layerPolygonParts?: Record<string, unknown>;
    @Field((type) => [DiscreteOrderInput], { nullable: true })
    public discretes?: DiscreteOrderInput[];
    @Field({ nullable: false })
    public id: string;
    @Field({ nullable: true })
    public insertDate?: Date;
    @Field({ nullable: true })
    public keywords?: string;
    @Field((type) => [LinkInput], { nullable: true })
    public links?: LinkInput[];
}

@InputType()
export class LayerDEMRecordInput {
    @Field((type) => RecordType, { nullable: true })
    public type?: RecordType;
    @Field({ nullable: false })
    public classification: string;
    @Field({ nullable: false })
    public productName: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public srsId?: string;
    @Field({ nullable: false })
    public srsName: string;
    @Field({ nullable: true })
    public producerName?: string;
    @Field({ nullable: true })
    public updateDate?: Date;
    @Field({ nullable: false })
    public sourceDateStart: Date;
    @Field({ nullable: false })
    public sourceDateEnd: Date;
    @Field((type) => [SensorType], { nullable: true })
    public sensorType?: SensorType[];
    @Field({ nullable: true })
    public region?: string;
    @Field({ nullable: false })
    public productId: string;
    @Field((type) => ProductType, { nullable: false })
    public productType: ProductType;
    @Field((type) => footprintObject, { nullable: false })
    public footprint: Record<string, unknown>;
    @Field({ nullable: false })
    public absoluteAccuracyLEP90: number;
    @Field({ nullable: false })
    public relativeAccuracyLEP90: number;
    @Field({ nullable: true })
    public resolutionDegree?: number;
    @Field({ nullable: false })
    public resolutionMeter: number;
    @Field((type) => layerPolygonPartsObject, { nullable: true })
    public layerPolygonParts?: Record<string, unknown>;
    @Field({ nullable: true })
    public productBoundingBox?: string;
    @Field({ nullable: false })
    public heightRangeFrom: number;
    @Field({ nullable: false })
    public heightRangeTo: number;
    @Field({ nullable: true })
    public geographicArea?: string;
    @Field({ nullable: false })
    public id: string;
    @Field({ nullable: true })
    public insertDate?: Date;
    @Field({ nullable: true })
    public wktGeometry?: string;
    @Field({ nullable: true })
    public keywords?: string;
    @Field((type) => [LinkInput], { nullable: true })
    public links?: LinkInput[];
}

@ObjectType()
export class Link {
    @Field({ nullable: true })
    public name?: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: false })
    public protocol: string;
    @Field({ nullable: false })
    public url: string;
}

@ObjectType()
export class DiscreteOrder {
    @Field({ nullable: false })
    public id: string;
    @Field({ nullable: false })
    public zOrder: number;
}

@ObjectType()
export class LayerRasterRecord {
    @Field((type) => RecordType, { nullable: true })
    public type?: RecordType;
    @Field({ nullable: true })
    public classification?: string;
    @Field({ nullable: false })
    public productName: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public srsId?: string;
    @Field({ nullable: true })
    public producerName?: string;
    @Field({ nullable: true })
    public creationDate?: Date;
    @Field({ nullable: true })
    public ingestionDate?: Date;
    @Field({ nullable: true })
    public updateDate?: Date;
    @Field({ nullable: true })
    public sourceDateStart?: Date;
    @Field({ nullable: true })
    public sourceDateEnd?: Date;
    @Field({ nullable: true })
    public accuracyCE90?: number;
    @Field((type) => [SensorType], { nullable: true })
    public sensorType?: SensorType[];
    @Field({ nullable: true })
    public region?: string;
    @Field({ nullable: false })
    public productId: string;
    @Field({ nullable: true })
    public productVersion?: string;
    @Field((type) => ProductType, { nullable: false })
    public productType: ProductType;
    @Field({ nullable: true })
    public productSubType?: string;
    @Field({ nullable: true })
    public srsName?: string;
    @Field({ nullable: true })
    public resolution?: number;
    @Field({ nullable: true })
    public maxResolutionMeter?: number;
    @Field({ nullable: true })
    public rms?: number;
    @Field({ nullable: true })
    public scale?: string;
    @Field((type) => footprintObject, { nullable: true })
    public footprint?: Record<string, unknown>;
    @Field((type) => layerPolygonPartsObject, { nullable: true })
    public layerPolygonParts?: Record<string, unknown>;
    @Field((type) => [String], { nullable: true })
    public includedInBests?: string[];
    @Field({ nullable: true })
    public productBoundingBox?: string;
    @Field({ nullable: false })
    public id: string;
    @Field({ nullable: true })
    public insertDate?: Date;
    @Field({ nullable: true })
    public keywords?: string;
    @Field((type) => [Link], { nullable: true })
    public links?: Link[];
}

@ObjectType()
export class Layer3DRecord {
    @Field((type) => RecordType, { nullable: true })
    public type?: RecordType;
    @Field({ nullable: false })
    public productId: string;
    @Field({ nullable: false })
    public productName: string;
    @Field({ nullable: true })
    public productVersion?: string;
    @Field((type) => ProductType, { nullable: false })
    public productType: ProductType;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public creationDate?: Date;
    @Field({ nullable: true })
    public updateDate?: Date;
    @Field({ nullable: true })
    public sourceDateStart?: Date;
    @Field({ nullable: true })
    public sourceDateEnd?: Date;
    @Field({ nullable: true })
    public minResolutionMeter?: number;
    @Field({ nullable: true })
    public maxResolutionMeter?: number;
    @Field({ nullable: true })
    public nominalResolution?: number;
    @Field({ nullable: true })
    public maxAccuracyCE90?: number;
    @Field({ nullable: true })
    public absoluteAccuracyLEP90?: number;
    @Field({ nullable: true })
    public accuracySE90?: number;
    @Field({ nullable: true })
    public relativeAccuracyLEP90?: number;
    @Field({ nullable: true })
    public visualAccuracy?: number;
    @Field((type) => [SensorType], { nullable: true })
    public sensorType?: SensorType[];
    @Field((type) => footprintObject, { nullable: true })
    public footprint?: Record<string, unknown>;
    @Field({ nullable: true })
    public heightRangeFrom?: number;
    @Field({ nullable: true })
    public heightRangeTo?: number;
    @Field({ nullable: true })
    public srsId?: string;
    @Field({ nullable: true })
    public srsName?: string;
    @Field({ nullable: true })
    public srsOrigin?: string;
    @Field({ nullable: true })
    public region?: string;
    @Field({ nullable: true })
    public classification?: string;
    @Field({ nullable: true })
    public productionSystem?: string;
    @Field({ nullable: true })
    public productionSystemVer?: string;
    @Field({ nullable: true })
    public producerName?: string;
    @Field({ nullable: true })
    public productionMethod?: string;
    @Field({ nullable: true })
    public minFlightAlt?: number;
    @Field({ nullable: true })
    public maxFlightAlt?: number;
    @Field({ nullable: true })
    public geographicArea?: string;
    @Field({ nullable: true })
    public productBoundingBox?: string;
    @Field({ nullable: false })
    public id: string;
    @Field({ nullable: true })
    public insertDate?: Date;
    @Field({ nullable: true })
    public wktGeometry?: string;
    @Field({ nullable: true })
    public keywords?: string;
    @Field((type) => [Link], { nullable: true })
    public links?: Link[];
}

@ObjectType()
export class BestRecord {
    @Field((type) => RecordType, { nullable: true })
    public type?: RecordType;
    @Field({ nullable: true })
    public classification?: string;
    @Field({ nullable: false })
    public productName: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public srsId?: string;
    @Field({ nullable: true })
    public producerName?: string;
    @Field({ nullable: true })
    public creationDate?: Date;
    @Field({ nullable: true })
    public ingestionDate?: Date;
    @Field({ nullable: true })
    public updateDate?: Date;
    @Field({ nullable: true })
    public sourceDateStart?: Date;
    @Field({ nullable: true })
    public sourceDateEnd?: Date;
    @Field({ nullable: true })
    public accuracyCE90?: number;
    @Field((type) => [SensorType], { nullable: true })
    public sensorType?: SensorType[];
    @Field({ nullable: true })
    public region?: string;
    @Field({ nullable: false })
    public productId: string;
    @Field({ nullable: true })
    public productVersion?: string;
    @Field((type) => ProductType, { nullable: false })
    public productType: ProductType;
    @Field({ nullable: true })
    public srsName?: string;
    @Field({ nullable: true })
    public resolution?: number;
    @Field({ nullable: true })
    public rms?: number;
    @Field({ nullable: true })
    public scale?: string;
    @Field((type) => footprintObject, { nullable: true })
    public footprint?: Record<string, unknown>;
    @Field((type) => layerPolygonPartsObject, { nullable: true })
    public layerPolygonParts?: Record<string, unknown>;
    @Field((type) => [DiscreteOrder], { nullable: true })
    public discretes?: DiscreteOrder[];
    @Field({ nullable: false })
    public id: string;
    @Field({ nullable: true })
    public insertDate?: Date;
    @Field({ nullable: true })
    public keywords?: string;
    @Field((type) => [Link], { nullable: true })
    public links?: Link[];
}

@ObjectType()
export class LayerDEMRecord {
    @Field((type) => RecordType, { nullable: true })
    public type?: RecordType;
    @Field({ nullable: false })
    public classification: string;
    @Field({ nullable: false })
    public productName: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public srsId?: string;
    @Field({ nullable: false })
    public srsName: string;
    @Field({ nullable: true })
    public producerName?: string;
    @Field({ nullable: true })
    public updateDate?: Date;
    @Field({ nullable: false })
    public sourceDateStart: Date;
    @Field({ nullable: false })
    public sourceDateEnd: Date;
    @Field((type) => [SensorType], { nullable: true })
    public sensorType?: SensorType[];
    @Field({ nullable: true })
    public region?: string;
    @Field({ nullable: false })
    public productId: string;
    @Field((type) => ProductType, { nullable: false })
    public productType: ProductType;
    @Field((type) => footprintObject, { nullable: false })
    public footprint: Record<string, unknown>;
    @Field({ nullable: false })
    public absoluteAccuracyLEP90: number;
    @Field({ nullable: false })
    public relativeAccuracyLEP90: number;
    @Field({ nullable: true })
    public resolutionDegree?: number;
    @Field({ nullable: false })
    public resolutionMeter: number;
    @Field((type) => layerPolygonPartsObject, { nullable: true })
    public layerPolygonParts?: Record<string, unknown>;
    @Field({ nullable: true })
    public productBoundingBox?: string;
    @Field({ nullable: false })
    public heightRangeFrom: number;
    @Field({ nullable: false })
    public heightRangeTo: number;
    @Field({ nullable: true })
    public geographicArea?: string;
    @Field({ nullable: false })
    public id: string;
    @Field({ nullable: true })
    public insertDate?: Date;
    @Field({ nullable: true })
    public wktGeometry?: string;
    @Field({ nullable: true })
    public keywords?: string;
    @Field((type) => [Link], { nullable: true })
    public links?: Link[];
}

@Resolver(Link)
export class LinkResolver {
}

@Resolver(DiscreteOrder)
export class DiscreteOrderResolver {
}

@Resolver(LayerRasterRecord)
export class LayerRasterRecordResolver {
}

@Resolver(Layer3DRecord)
export class Layer3DRecordResolver {
}

@Resolver(BestRecord)
export class BestRecordResolver {
}

@Resolver(LayerDEMRecord)
export class LayerDEMRecordResolver {
}

const RecordTypeRegister = registerEnumType(RecordType, {name: "RecordType"});
const SensorTypeRegister = registerEnumType(SensorType, {name: "SensorType"});
const ProductTypeRegister = registerEnumType(ProductType, {name: "ProductType"});
