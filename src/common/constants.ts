/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import he from 'he';
import { Status } from '../graphql/job';
import { LayerMetadataUnionType } from '../graphql/resolvers/csw.resolver';

export const DEFAULT_SERVER_PORT = 80;

export const START = 1;
export const END = 2;

export const IGNORED_OUTGOING_TRACE_ROUTES = [/^.*\/v1\/metrics.*$/];
export const IGNORED_INCOMING_TRACE_ROUTES = [/^.*\/docs.*$/];

export enum Services {
  LOGGER = 'ILogger',
  CONFIG = 'IConfig',
  PUBSUB = 'PUBSUB',
  TRACER = 'TRACER',
  METER = 'METER',
}

export type CatalogRecordType = LayerMetadataUnionType;

export const fieldTypes = {
  isFootprint: (fieldName: string): boolean => fieldName === 'footprint',
  isLayerPolygonParts: (fieldName: string): boolean => fieldName === 'layerPolygonParts',
  isDate: (fieldName: string): boolean =>
    [
      'creationDate',
      'ingestionDate',
      'updateDate',
      'sourceDateStart',
      'sourceDateEnd',
      'insertDate',
      'validationDate',
      'creationDateUTC',
      'updateDateUTC',
      'imagingTimeBeginUTC',
      'imagingTimeEndUTC',
    ].includes(fieldName),
  isDiscrete: (fieldName: string): boolean => fieldName === 'discretes',
  isLinks: (fieldName: string): boolean => fieldName === 'links',
  isKeywords: (fieldName: string): boolean => fieldName === 'keywords',
  isSensor: (fieldName: string): boolean => ['sensorType', 'sensors'].includes(fieldName),
  isBoolean: (fieldName: string): boolean => ['hasTerrain'].includes(fieldName),
  isRegion: (fieldName: string): boolean => ['region'].includes(fieldName),
  isProductVersion: (fieldName: string): boolean => fieldName === 'productVersion',
};

export const fieldTypesVector = {
  isId: (fieldName: string): boolean => fieldName === 'id',
  isType: (fieldName: string): boolean => fieldName === 'type',
  isProductName: (fieldName: string): boolean => fieldName === 'productName',
  isClassification: (fieldName: string): boolean => fieldName === 'classification',
  isSrsId: (fieldName: string): boolean => fieldName === 'srsId',
  isSrsName: (fieldName: string): boolean => fieldName === 'srsName',
  isProducerName: (fieldName: string): boolean => fieldName === 'producerName',
  isFootprint: (fieldName: string): boolean => fieldName === 'footprint',
  isDescription: (fieldName: string): boolean => fieldName === 'description',
  isProductType: (fieldName: string): boolean => fieldName === 'productType',
  isFeatureStructure: (fieldName: string): boolean => fieldName === 'featureStructure',
  isLinks: (fieldName: string): boolean => fieldName === 'links',
  isKeywords: (fieldName: string): boolean => fieldName === 'keywords',
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

export const statusMap: Record<Status, string> = {
  [Status.Pending]: 'PENDING',
  [Status.InProgress]: 'IN_PROGRESS',
  [Status.Completed]: 'COMPLETED',
  [Status.Failed]: 'FAILED',
  [Status.Expired]: 'EXPIRED',
  [Status.Aborted]: 'ABORTED',
  [Status.Suspended]: 'SUSPENDED',
};

// #region to be removed
// TODO: should be taken from @map-colonies/types
export interface CallBack<T> {
  jobId: string;
  taskId: string;
  jobType: string;
  taskType: string;
  productId: string;
  productType: string;
  version: string;
  status: Status;
  progress: number;
  message?: string;
  error?: string;
  params: T;
}
// #endregion to be removed
