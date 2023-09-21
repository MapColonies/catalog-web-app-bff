import { DateGranularity } from '../../graphql/entityDescriptor';

export const pycswVectorBestCatalogRecordAspects = {
  type: {
    label: 'field-names.vector-raster.type',
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  classification: {
    label: 'field-names.vector-raster.classification',
    fullWidth: true,
  },
  productName: {
    label: 'field-names.vector-raster.productName',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
  },
  description: {
    label: 'field-names.vector-raster.description',
    fullWidth: true,
    rows: 4,
  },
  srsId: {
    label: 'field-names.vector-raster.srsId',
  },
  producerName: {
    label: 'field-names.vector-raster.producerName',
  },
  creationDate: {
    label: 'field-names.vector-raster.creationDate',
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  ingestionDate: {
    label: 'field-names.vector-raster.ingestionDate',
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  updateDate: {
    label: 'field-names.vector-raster.updateDate',
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  region: {
    label: 'field-names.vector-raster.region',
    fullWidth: true,
  },
  productVersion: {
    label: 'field-names.vector-raster.productVersion',
  },
  productType: {
    label: 'field-names.vector-raster.productType',
  },
  srsName: {
    label: 'field-names.vector-raster.srsName',
  },
  scale: {
    label: 'field-names.vector-raster.scale',
  },
  footprint: {
    label: 'field-names.vector-raster.footprint',
  },
  id: {
    label: 'field-names.vector-raster.id',
  },
  insertDate: {
    label: 'field-names.vector-raster.insertDate',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges. requires special treatment.
      order: 0,
    },
  },
  keywords: {
    label: 'field-names.vector-raster.keywords',
  },
  links: {
    label: 'field-names.vector-raster.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.vector-raster.link.name',
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.vector-raster.link.description',
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.vector-raster.link.protocol',
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.vector-raster.link.url',
    fullWidth: true,
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;
