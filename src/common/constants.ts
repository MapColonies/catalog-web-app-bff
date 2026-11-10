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
}

export type CatalogRecordType = LayerMetadataUnionType;

export const fieldTypes = {
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
// TODO: should be taken from @map-colonies/raster-shared
export interface CallbackResponse<T> {
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
  data: T;
}
// #endregion to be removed
