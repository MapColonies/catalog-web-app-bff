/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import he from 'he';
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
  isBoolean: (fieldName: string): boolean => ['hasTerrain'].includes(fieldName),
  isRegion: (fieldName: string): boolean => ['region'].includes(fieldName),
  isProductVersion: (fieldName: string): boolean => fieldName === 'productVersion',
};

export const xmlParserOptions = {
  attributeNamePrefix: '',
  attrNodeName: 'attr',
  textNodeName: '#text',
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: '__cdata',
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: false,
  numParseOptions: {
    hex: true,
    leadingZeros: true,
  },
  arrayMode: (name: string): boolean =>
    name === 'Layer' ||
    name === 'Style' ||
    name === 'Format' ||
    name === 'TileMatrixSetLink' ||
    name === 'ResourceURL' ||
    name === 'TileMatrixLimits' ||
    name === 'TileMatrixSet',
  attrValueProcessor: (val: string): string => he.decode(val, { isAttributeValue: true }),
  tagValueProcessor: (val: string): string => he.decode(val),
  alwaysCreateTextNode: false,
};
