import { DateGranularity } from '../../graphql/entityDescriptor';

const pycsw3DCatalogRecordAspects = {
  id: {
    label: 'field-names.3d.id',
    order: 2,
    isBriefField: {
      order: 1,
    },
  },
  productId: {
    label: 'field-names.3d.productId',
    order: 1,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
  },
  productName: {
    label: 'field-names.3d.productName',
    order: 3,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
  },
  productVersion: {
    label: 'field-names.3d.productVersion',
    order: 6,
    isBriefField: {
      order: 6,
    },
  },
  productType: {
    label: 'field-names.3d.productType',
    order: 4,
    isBriefField: {
      order: 9,
    },
  },
  description: {
    label: 'field-names.3d.description',
    order: 100,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 12,
    },
  },
  creationDate: {
    label: 'field-names.3d.creationDate',
    order: 107,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  updateDate: {
    label: 'field-names.3d.updateDate',
    order: 5,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateStart: {
    label: 'field-names.3d.sourceDateStart',
    order: 105,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 3,
    },
  },
  sourceDateEnd: {
    label: 'field-names.3d.sourceDateEnd',
    order: 106,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges and require special treatment
      order: 1,
    },
    isBriefField: {
      order: 4,
    },
    isInfoTooltip: true,
  },
  minResolutionMeter: {
    label: 'field-names.3d.minResolutionMeter',
    order: 7,
  },
  maxResolutionMeter: {
    label: 'field-names.3d.maxResolutionMeter',
    order: 8,
  },
  maxAccuracyCE90: {
    label: 'field-names.3d.maxAccuracyCE90',
    order: 202,
    isBriefField: {
      order: 7,
    },
  },
  absoluteAccuracyLE90: {
    label: 'field-names.3d.absoluteAccuracyLE90',
    order: 203,
    isBriefField: {
      order: 8,
    },
  },
  accuracySE90: {
    label: 'field-names.3d.accuracySE90',
    order: 205,
  },
  relativeAccuracySE90: {
    label: 'field-names.3d.relativeAccuracySE90',
    order: 206,
  },
  visualAccuracy: {
    label: 'field-names.3d.visualAccuracy',
    order: 207,
    fullWidth: true,
  },
  sensors: {
    label: 'field-names.3d.sensors',
    order: 109,
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.3d.footprint',
    order: 204,
    fullWidth: true,
    isCopyable: true,
  },
  heightRangeFrom: {
    label: 'field-names.3d.heightRangeFrom',
    order: 208,
  },
  heightRangeTo: {
    label: 'field-names.3d.heightRangeTo',
    order: 209,
  },
  srsId: {
    label: 'field-names.3d.srsId',
    order: 201,
  },
  srsName: {
    label: 'field-names.3d.srsName',
    order: 200,
  },
  region: {
    label: 'field-names.3d.region',
    order: 110,
    fullWidth: true,
  },
  classification: {
    label: 'field-names.3d.classification',
    order: 101,
    fullWidth: true,
    isBriefField: {
      order: 10,
    },
    // enumValues: {
    //   dictionary: {
    //     "SHAMUR": { displayKey: 'lookups.classification.shamur', tooltipKey: 'lookups.classification.shamur.tooltip', icon: 'mc-icon-shamur' },
    //   },
    // },
  },
  productionSystem: {
    label: 'field-names.3d.productionSystem',
    order: 103,
  },
  productionSystemVer: {
    label: 'field-names.3d.productionSystemVer',
    order: 104,
  },
  producerName: {
    label: 'field-names.3d.producerName',
    order: 102,
    fullWidth: true,
  },
  minFlightAlt: {
    label: 'field-names.3d.minFlightAlt',
    order: 210,
  },
  maxFlightAlt: {
    label: 'field-names.3d.maxFlightAlt',
    order: 211,
  },
  geographicArea: {
    label: 'field-names.3d.geographicArea',
    order: 111,
    fullWidth: true,
  },
  productSource: {
    label: 'field-names.3d.productSource',
    order: 9,
    fullWidth: true,
    isBriefField: {
      order: 11,
    },
  },
  productStatus: {
    label: 'field-names.3d.productStatus',
    order: 10,
    isBriefField: {
      order: 2,
    },
  },
  productBoundingBox: {
    label: 'field-names.3d.productBoundingBox',
    order: 212,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  links: {
    label: 'field-names.3d.links',
    order: 113,
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.3d.link.name',
    order: 114,
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.3d.link.description',
    order: 115,
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.3d.link.protocol',
    order: 116,
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.3d.link.url',
    order: 117,
    fullWidth: true,
  },
  type: {
    label: 'field-names.3d.type',
    order: 999,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  typeName: {
    label: 'field-names.3d.typeName',
    order: 999,
  },
  schema: {
    label: 'field-names.3d.schema',
    order: 999,
  },
  mdSource: {
    label: 'field-names.3d.mdSource',
    order: 999,
  },
  xml: {
    label: 'field-names.3d.xml',
    order: 999,
  },
  anyText: {
    label: 'field-names.3d.anyText',
    order: 999,
  },
  insertDate: {
    label: 'field-names.3d.insertDate',
    order: 108,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges and require special treatment
      order: 0,
    },
    isBriefField: {
      order: 5,
    },
    isInfoTooltip: true,
  },
  wktGeometry: {
    label: 'field-names.3d.wktGeometry',
    order: 213,
  },
  keywords: {
    label: 'field-names.3d.keywords',
    order: 112,
    fullWidth: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const pycsw3DCatalogRecordUIAspects = pycsw3DCatalogRecordAspects;
