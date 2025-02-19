/* eslint-disable @typescript-eslint/naming-convention */
import { Feature } from 'geojson';

interface IDescribeFeatureElement {
  TYPE_NAME?: string;
  name?: string;
  substitutionGroup?: SubstitutionGroup;
  type?: SubstitutionGroup;
  otherAttributes?: OtherAttributes;
}

interface OtherAttributes {
  name?: string;
  substitutionGroup?: string;
  type?: string;
}

interface SubstitutionGroup {
  namespaceURI?: string;
  localPart?: string;
  prefix?: string;
  key?: string;
  string?: string;
}

interface IDescribeFeatureComplexType {
  TYPE_NAME?: string;
  name?: string;
  otherAttributes?: OtherAttributes;
  complexContent?: ComplexContent;
}

interface ComplexContent {
  TYPE_NAME?: string;
  extension?: unknown[];
}

interface OtherAttributes {
  name?: string;
}

interface Name {
  namespaceURI?: string;
  localPart?: string;
  prefix?: string;
  key?: string;
  string?: string;
}

interface Value {
  TYPE_NAME?: string;
  elementFormDefault?: string;
  targetNamespace?: string;
  otherAttributes?: OtherAttributes;
  _import?: unknown[];
  complexType?: IDescribeFeatureComplexType[];
  element?: IDescribeFeatureElement[];
}

interface OtherAttributes {
  '{http://www.w3.org/2000/xmlns/}xsd'?: string;
  '{http://www.w3.org/2000/xmlns/}gml'?: string;
  '{http://www.w3.org/2000/xmlns/}osm'?: string;
  '{http://www.w3.org/2000/xmlns/}wfs'?: string;
  elementFormDefault?: string;
  targetNamespace?: string;
}

export interface IDescribeFeatureResponse {
  name?: Name;
  value?: Value;
}

export interface IRequestExecutor {
  (url: string, method: string, params: Record<string, unknown>): Promise<unknown>;
}

export interface IRequestOptions {
  request: string;
  method?: string;
  config?: Record<string, unknown>;
}

export type OutputFormat = 'GML3' | 'application/json';

export interface IWFSClientOptions {
  /**
   * @param baseUrl WFS service to query with this client.
   */
  baseUrl: string;

  /**
   * @param requestExecutor Used for fetching the data.
   */
  requestExecutor: IRequestExecutor;

  /**
   * @param count The default maximum number of features to fetch for each query.
   * @defaultValue `100`
   */
  count?: number;

  /**
   * @param srsName The default srsName to use for each query.
   * @defaultValue `EPSG:4326`
   */
  srsName?: string;

  /**
   * @param version The default version of WFS protocol to use for each query.
   * @defaultValue `2.0.0`
   */
  version?: string;
}

export interface PropertyFilter {
  propertyName: string;
  propertyValue: unknown;
}

export interface IGetFeatureOptions {
  /**
   * @param pointCoordinates Coordinates to search features at intersection.
   */
  pointCoordinates: [string, string];

  /**
   * @param typeNames Feature types to query.
   */
  typeName: string;

  /**
   * @param typeNames Geometry refference field name.
   */
  geomRefFieldName: string;

  /**
   * @param count The maximum number of features to fetch.
   * @defaultValue `100`
   */
  count?: number;

  /**
   * @param dWithin Search distance from point in meters.
   */
  dWithin?: number;

  // filter?: string;

  /**
   * @param filterProperties Literal property names and values to match. (Using `PropertyIsEqualTo` filter)
   */
  filterProperties?: PropertyFilter[];
}

export interface IGetFeatureOptionsByFeature {
  /**
   * @param feature Feature to search features that intersect with.
   */
  feature: Feature;

  /**
   * @param typeNames Feature types to query.
   */
  typeName: string;

  /**
   * @param typeNames Geometry refference field name.
   */
  geomRefFieldName: string;
  /**
   * @param count The maximum number of features to fetch.
   * @defaultValue `100`
   */
  count?: number;

  /**
   * @param startIndex The maximum number of features to fetch.
   * @defaultValue `0`
   */
  startIndex?: number;

  /**
   * @param dWithin Search distance from point in meters.
   */
  dWithin?: number;

  /**
   * @param filterProperties Literal property names and values to match. (Using `PropertyIsEqualTo` filter)
   */
  filterProperties?: PropertyFilter[];
}

export interface IGetFeatureResponse {
  type: string;
  features: Feature[];
  totalFeatures: number;
  numberMatched: number;
  numberReturned: number;
  timeStamp: Date;
  crs: CRS;
}

export interface CRS {
  type: string;
  properties: CRSProperties;
}

export interface CRSProperties {
  name: string;
}
