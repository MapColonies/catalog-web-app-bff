import { LayerMetadataUnionType } from '../graphql/resolvers/csw.resolver';

export const DEFAULT_SERVER_PORT = 80;

export const IGNORED_OUTGOING_TRACE_ROUTES = [/^.*\/v1\/metrics.*$/];
export const IGNORED_INCOMING_TRACE_ROUTES = [/^.*\/docs.*$/];

export enum Services {
  LOGGER = 'ILogger',
  CONFIG = 'IConfig',
  TRACER = 'TRACER',
  METER = 'METER',
}

export type CatalogRecordType = LayerMetadataUnionType;

export const fieldTypes = {
  isFootprint: (fieldName: string): boolean => fieldName === 'footprint',
  isLayerPolygonParts: (fieldName: string): boolean => fieldName === 'layerPolygonParts',
  isDate: (fieldName: string): boolean =>
    ['creationDate', 'ingestionDate', 'updateDate', 'sourceDateStart', 'sourceDateEnd', 'insertDate', 'validationDate'].includes(fieldName),
  isDiscrete: (fieldName: string): boolean => fieldName === 'discretes',
  isLinks: (fieldName: string): boolean => fieldName === 'links',
  isKeywords: (fieldName: string): boolean => fieldName === 'keywords',
  isSensor: (fieldName: string): boolean => ['sensorType', 'sensors'].includes(fieldName),
};
