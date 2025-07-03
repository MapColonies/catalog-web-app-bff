import { DateGranularity } from '../../graphql/entityDescriptor';

const pycsw3DCatalogRecordAspects = {
  id: {
    label: 'field-names.3d.id',
    order: 1,
    isBriefField: {
      order: 1,
    },
  },
  productId: {
    label: 'field-names.3d.productId',
    order: 0,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
  },
  productName: {
    label: 'field-names.3d.productName',
    order: 0,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
  },
  productVersion: {
    label: 'field-names.3d.productVersion',
    order: 3,
    isBriefField: {
      order: 3,
    },
  },
  productType: {
    label: 'field-names.3d.productType',
    order: 0,
    isBriefField: {
      order: 9,
    },
  },
  description: {
    label: 'field-names.3d.description',
    order: 0,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 13,
    },
  },
  creationDate: {
    label: 'field-names.3d.creationDate',
    order: 0,
    fullWidth: true,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  updateDate: {
    label: 'field-names.3d.updateDate',
    order: 0,
    fullWidth: true,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateStart: {
    label: 'field-names.3d.sourceDateStart',
    order: 0,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 5,
    },
  },
  sourceDateEnd: {
    label: 'field-names.3d.sourceDateEnd',
    order: 0,
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
  minResolutionMeter: {
    label: 'field-names.3d.minResolutionMeter',
    order: 0,
  },
  maxResolutionMeter: {
    label: 'field-names.3d.maxResolutionMeter',
    order: 0,
  },
  maxAccuracyCE90: {
    label: 'field-names.3d.maxAccuracyCE90',
    order: 0,
    isBriefField: {
      order: 7,
    },
  },
  absoluteAccuracyLE90: {
    label: 'field-names.3d.absoluteAccuracyLE90',
    order: 0,
    isBriefField: {
      order: 8,
    },
  },
  accuracySE90: {
    label: 'field-names.3d.accuracySE90',
    order: 0,
  },
  relativeAccuracySE90: {
    label: 'field-names.3d.relativeAccuracySE90',
    order: 0,
  },
  visualAccuracy: {
    label: 'field-names.3d.visualAccuracy',
    order: 0,
  },
  sensors: {
    label: 'field-names.3d.sensors',
    order: 0,
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.3d.footprint',
    order: 0,
    fullWidth: true,
    isCopyable: true,
  },
  heightRangeFrom: {
    label: 'field-names.3d.heightRangeFrom',
    order: 0,
  },
  heightRangeTo: {
    label: 'field-names.3d.heightRangeTo',
    order: 0,
  },
  srsId: {
    label: 'field-names.3d.srsId',
    order: 0,
  },
  srsName: {
    label: 'field-names.3d.srsName',
    order: 0,
  },
  region: {
    label: 'field-names.3d.region',
    order: 0,
    fullWidth: true,
  },
  classification: {
    label: 'field-names.3d.classification',
    order: 0,
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
    order: 0,
  },
  productionSystemVer: {
    label: 'field-names.3d.productionSystemVer',
    order: 0,
  },
  producerName: {
    label: 'field-names.3d.producerName',
    order: 0,
  },
  minFlightAlt: {
    label: 'field-names.3d.minFlightAlt',
    order: 0,
  },
  maxFlightAlt: {
    label: 'field-names.3d.maxFlightAlt',
    order: 0,
  },
  geographicArea: {
    label: 'field-names.3d.geographicArea',
    order: 0,
  },
  productSource: {
    label: 'field-names.3d.productSource',
    order: 0,
    fullWidth: true,
    isBriefField: {
      order: 11,
    },
  },
  productStatus: {
    label: 'field-names.3d.productStatus',
    order: 2,
    isBriefField: {
      order: 2,
    },
  },
  productBoundingBox: {
    label: 'field-names.3d.productBoundingBox',
    order: 0,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  links: {
    label: 'field-names.3d.links',
    order: 0,
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.3d.link.name',
    order: 0,
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.3d.link.description',
    order: 0,
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.3d.link.protocol',
    order: 0,
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.3d.link.url',
    order: 0,
    fullWidth: true,
  },
  type: {
    label: 'field-names.3d.type',
    order: 0,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  typeName: {
    label: 'field-names.3d.typeName',
    order: 0,
  },
  schema: {
    label: 'field-names.3d.schema',
    order: 0,
  },
  mdSource: {
    label: 'field-names.3d.mdSource',
    order: 0,
  },
  xml: {
    label: 'field-names.3d.xml',
    order: 0,
  },
  anyText: {
    label: 'field-names.3d.anyText',
    order: 0,
  },
  insertDate: {
    label: 'field-names.3d.insertDate',
    order: 0,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges. requires special treatment.
      order: 0,
    },
    isBriefField: {
      order: 4,
    },
    isInfoTooltip: true,
  },
  wktGeometry: {
    label: 'field-names.3d.wktGeometry',
    order: 0,
  },
  keywords: {
    label: 'field-names.3d.keywords',
    order: 0,
    fullWidth: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const pycsw3DCatalogRecordUIAspects = pycsw3DCatalogRecordAspects;
