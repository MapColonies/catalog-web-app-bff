import { DateGranularity } from '../../graphql/entityDescriptor';

const pycsw3DCatalogRecordAspects = {
  id: {
    label: 'field-names.3d.id',
    isBriefField: {
      order: 1,
    },
  },
  productId: {
    label: 'field-names.3d.productId',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
  },
  productName: {
    label: 'field-names.3d.productName',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
  },
  productVersion: {
    label: 'field-names.3d.productVersion',
    isBriefField: {
      order: 3,
    },
  },
  productType: {
    label: 'field-names.3d.productType',
    isBriefField: {
      order: 9,
    },
  },
  description: {
    label: 'field-names.3d.description',
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 13,
    },
  },
  creationDate: {
    label: 'field-names.3d.creationDate',
    fullWidth: true,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  updateDate: {
    label: 'field-names.3d.updateDate',
    fullWidth: true,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateStart: {
    label: 'field-names.3d.sourceDateStart',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 5,
    },
  },
  sourceDateEnd: {
    label: 'field-names.3d.sourceDateEnd',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges. requires special treatment.
      order: 1,
    },
    isBriefField: {
      order: 6,
    },
  },
  minResolutionMeter: {
    label: 'field-names.3d.minResolutionMeter',
  },
  maxResolutionMeter: {
    label: 'field-names.3d.maxResolutionMeter',
  },
  maxAccuracyCE90: {
    label: 'field-names.3d.maxAccuracyCE90',
    isBriefField: {
      order: 7,
    },
  },
  absoluteAccuracyLE90: {
    label: 'field-names.3d.absoluteAccuracyLE90',
    isBriefField: {
      order: 8,
    },
  },
  accuracySE90: {
    label: 'field-names.3d.accuracySE90',
  },
  relativeAccuracySE90: {
    label: 'field-names.3d.relativeAccuracySE90',
  },
  visualAccuracy: {
    label: 'field-names.3d.visualAccuracy',
  },
  sensors: {
    label: 'field-names.3d.sensors',
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.3d.footprint',
    fullWidth: true,
    isCopyable: true,
  },
  heightRangeFrom: {
    label: 'field-names.3d.heightRangeFrom',
  },
  heightRangeTo: {
    label: 'field-names.3d.heightRangeTo',
  },
  srsId: {
    label: 'field-names.3d.srsId',
  },
  srsName: {
    label: 'field-names.3d.srsName',
  },
  region: {
    label: 'field-names.3d.region',
    fullWidth: true,
  },
  classification: {
    label: 'field-names.3d.classification',
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
  },
  productionSystemVer: {
    label: 'field-names.3d.productionSystemVer',
  },
  producerName: {
    label: 'field-names.3d.producerName',
  },
  minFlightAlt: {
    label: 'field-names.3d.minFlightAlt',
  },
  maxFlightAlt: {
    label: 'field-names.3d.maxFlightAlt',
  },
  geographicArea: {
    label: 'field-names.3d.geographicArea',
  },
  productSource: {
    label: 'field-names.3d.productSource',
    fullWidth: true,
    isBriefField: {
      order: 11,
    },
  },
  productStatus: {
    label: 'field-names.3d.productStatus',
    isBriefField: {
      order: 2,
    },
  },
  productBoundingBox: {
    label: 'field-names.3d.productBoundingBox',
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  links: {
    label: 'field-names.3d.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.3d.link.name',
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.3d.link.description',
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.3d.link.protocol',
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.3d.link.url',
    fullWidth: true,
  },
  type: {
    label: 'field-names.3d.type',
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  typeName: {
    label: 'field-names.3d.typeName',
  },
  schema: {
    label: 'field-names.3d.schema',
  },
  mdSource: {
    label: 'field-names.3d.mdSource',
  },
  xml: {
    label: 'field-names.3d.xml',
  },
  anyText: {
    label: 'field-names.3d.anyText',
  },
  insertDate: {
    label: 'field-names.3d.insertDate',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges. requires special treatment.
      order: 0,
    },
    isBriefField: {
      order: 4,
    },
  },
  wktGeometry: {
    label: 'field-names.3d.wktGeometry',
  },
  keywords: {
    label: 'field-names.3d.keywords',
    fullWidth: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const pycsw3DCatalogRecordUIAspects = pycsw3DCatalogRecordAspects;
