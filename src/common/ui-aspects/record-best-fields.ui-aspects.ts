import { DateGranularity } from '../../graphql/entityDescriptor';

const pycswBestCatalogRecordAspects = {
  id: {
    label: 'field-names.raster.id',
    isBriefField: {
      order: 2,
    },
  },
  productId: {
    label: 'field-names.raster.productId',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
    isBriefField: {
      order: 1,
    },
  },
  productVersion: {
    label: 'field-names.raster.productVersion',
    isBriefField: {
      order: 4,
    },
  },
  productType: {
    label: 'field-names.raster.productType',
    updateRules: {
      freeze: true,
    },
    isBriefField: {
      order: 9,
    },
  },
  productName: {
    label: 'field-names.raster.productName',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
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
    isBriefField: {
      order: 12,
    },
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
    isBriefField: {
      order: 11,
    },
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
    isBriefField: {
      order: 3,
    },
  },
  sourceDateStart: {
    label: 'field-names.raster.sourceDateStart',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 5,
    },
  },
  sourceDateEnd: {
    label: 'field-names.raster.sourceDateEnd',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges. requires special treatment.
      order: 1,
    },
    isBriefField: {
      order: 6,
    },
    isInfoTooltip: true,
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
