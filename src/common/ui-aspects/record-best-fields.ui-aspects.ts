import { DateGranularity } from '../../graphql/entityDescriptor';

const pycswBestCatalogRecordAspects = {
  id: {
    label: 'field-names.raster.id',
  },
  productId: {
    label: 'field-names.raster.productId',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
  },
  productVersion: {
    label: 'field-names.raster.productVersion',
  },
  productType: {
    label: 'field-names.raster.productType',
    updateRules: {
      freeze: true,
    },
  },
  productName: {
    label: 'field-names.raster.productName',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
  },
  type: {
    label: 'field-names.raster.type',
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  maxResolutionDeg: {
    label: 'field-names.raster.maxResolutionDeg',
  },
  updateDate: {
    label: 'field-names.raster.update-date',
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  description: {
    label: 'field-names.raster.description',
    fullWidth: true,
    rows: 4,
  },
  sensors: {
    label: 'field-names.raster.sensors',
    fullWidth: true,
  },
  region: {
    label: 'field-names.raster.region',
    fullWidth: true,
  },
  classification: {
    label: 'field-names.raster.classification',
    fullWidth: true,
    // enumValues: {
    //   dictionary: {
    //     "SHAMUR": { displayKey: 'lookups.classification.shamur', tooltipKey: 'lookups.classification.shamur.tooltip', icon: 'mc-icon-shamur' },
    //   },
    // },
  },
  links: {
    label: 'field-names.raster.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.raster.link.name',
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.raster.link.description',
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.raster.link.protocol',
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.raster.link.url',
    fullWidth: true,
  },
  creationDate: {
    label: 'field-names.raster.creation-date',
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  ingestionDate: {
    label: 'field-names.raster.ingestion-date',
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateStart: {
    label: 'field-names.raster.sourceDateStart',
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateEnd: {
    label: 'field-names.raster.sourceDateEnd',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges. requires special treatment.
      order: 1,
    },
  },
  insertDate: {
    label: 'field-names.raster.insertDate',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges. requires special treatment.
      order: 0,
    },
  },
  minHorizontalAccuracyCE90: {
    label: 'field-names.raster.minHorizontalAccuracyCE90',
  },
  srsId: {
    label: 'field-names.raster.srs',
  },
  srsName: {
    label: 'field-names.raster.srs-name',
  },
  keywords: {
    label: 'field-names.raster.keywords',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const pycswBestCatalogRecordUIAspects = pycswBestCatalogRecordAspects;
