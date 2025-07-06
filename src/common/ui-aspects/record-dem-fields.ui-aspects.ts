import { DateGranularity } from '../../graphql/entityDescriptor';

const pycswDemCatalogRecordAspects = {
  id: {
    label: 'field-names.dem.id',
    order: 2,
    isBriefField: {
      order: 2,
    },
  },
  productId: {
    label: 'field-names.dem.productId',
    order: 1,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
    isBriefField: {
      order: 1,
    },
  },
  productName: {
    label: 'field-names.dem.productName',
    order: 3,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
  },
  productType: {
    label: 'field-names.dem.productType',
    order: 4,
    isBriefField: {
      order: 3,
    },
    isInfoTooltip: true,
  },
  description: {
    label: 'field-names.dem.description',
    order: 100,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 11,
    },
  },
  updateDate: {
    label: 'field-names.dem.updateDate',
    order: 6,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateStart: {
    label: 'field-names.dem.sourceDateStart',
    order: 104,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateEnd: {
    label: 'field-names.dem.sourceDateEnd',
    order: 105,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges and require special treatment
      order: 1,
    },
    isInfoTooltip: true,
  },
  resolutionDegree: {
    label: 'field-names.dem.resolutionDegree',
    order: 7,
    isBriefField: {
      order: 5,
    },
  },
  resolutionMeter: {
    label: 'field-names.dem.resolutionMeter',
    order: 8,
    isBriefField: {
      order: 6,
    },
    isInfoTooltip: true,
  },
  absoluteAccuracyLEP90: {
    label: 'field-names.dem.absoluteAccuracyLEP90',
    order: 204,
    isBriefField: {
      order: 7,
    },
  },
  relativeAccuracyLEP90: {
    label: 'field-names.dem.relativeAccuracyLEP90',
    order: 205,
    isBriefField: {
      order: 8,
    },
  },
  sensors: {
    label: 'field-names.dem.sensors',
    order: 108,
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.dem.footprint',
    order: 210,
    fullWidth: true,
  },
  layerPolygonParts: {
    label: 'field-names.dem.layerPolygonParts',
    order: 208,
    fullWidth: true,
    isCopyable: true,
  },
  heightRangeFrom: {
    label: 'field-names.dem.heightRangeFrom',
    order: 202,
  },
  heightRangeTo: {
    label: 'field-names.dem.heightRangeTo',
    order: 203,
  },
  srsId: {
    label: 'field-names.dem.srsId',
    order: 201,
  },
  srsName: {
    label: 'field-names.dem.srsName',
    order: 200,
  },
  region: {
    label: 'field-names.dem.region',
    order: 109,
    fullWidth: true,
  },
  classification: {
    label: 'field-names.dem.classification',
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
  producerName: {
    label: 'field-names.dem.producerName',
    order: 102,
  },
  productStatus: {
    label: 'field-names.dem.productStatus',
    order: 9,
    isBriefField: {
      order: 4,
    },
  },
  // hasTerrain: {
  //   label: 'field-names.dem.hasTerrain',
  //   order: 999,
  // },
  imagingSortieAccuracyCEP90: {
    label: 'field-names.dem.imagingSortieAccuracyCEP90',
    order: 5,
  },
  geographicArea: {
    label: 'field-names.dem.geographicArea',
    order: 999,
  },
  productBoundingBox: {
    label: 'field-names.dem.productBoundingBox',
    order: 206,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  undulationModel: {
    label: 'field-names.dem.undulationModel',
    order: 209,
  },
  dataType: {
    label: 'field-names.dem.dataType',
    order: 106,
  },
  noDataValue: {
    label: 'field-names.dem.noDataValue',
    order: 107,
  },
  links: {
    label: 'field-names.dem.links',
    order: 111,
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.dem.link.name',
    order: 112,
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.dem.link.description',
    order: 113,
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.dem.link.protocol',
    order: 114,
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.dem.link.url',
    order: 115,
    fullWidth: true,
  },
  type: {
    label: 'field-names.dem.type',
    order: 999,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  typeName: {
    label: 'field-names.dem.typeName',
    order: 999,
  },
  schema: {
    label: 'field-names.dem.schema',
    order: 999,
  },
  mdSource: {
    label: 'field-names.dem.mdSource',
    order: 999,
  },
  xml: {
    label: 'field-names.dem.xml',
    order: 999,
  },
  anyText: {
    label: 'field-names.dem.anyText',
    order: 999,
  },
  insertDate: {
    label: 'field-names.dem.insertDate',
    order: 103,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges and require special treatment
      order: 0,
    },
    isBriefField: {
      order: 9,
    },
    isInfoTooltip: true,
  },
  wktGeometry: {
    label: 'field-names.dem.wktGeometry',
    order: 207,
  },
  keywords: {
    label: 'field-names.dem.keywords',
    order: 110,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const pycswDemCatalogRecordUIAspects = pycswDemCatalogRecordAspects;
