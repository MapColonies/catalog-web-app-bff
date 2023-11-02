import { DateGranularity } from '../../graphql/entityDescriptor';

const pycswDemCatalogRecordAspects = {
  id: {
    label: 'field-names.dem.id',
    isBriefField: {
      order: 1,
    },
  },
  productId: {
    label: 'field-names.dem.productId',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
    isBriefField: {
      order: 2,
    },
  },
  productName: {
    label: 'field-names.dem.productName',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
  },
  productType: {
    label: 'field-names.dem.productType',
    isBriefField: {
      order: 3,
    },
  },
  description: {
    label: 'field-names.dem.description',
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 11,
    },
  },
  updateDate: {
    label: 'field-names.dem.updateDate',
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateStart: {
    label: 'field-names.dem.sourceDateStart',
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateEnd: {
    label: 'field-names.dem.sourceDateEnd',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges. requires special treatment.
      order: 1,
    },
  },
  resolutionDegree: {
    label: 'field-names.dem.resolutionDegree',
    isBriefField: {
      order: 5,
    },
  },
  resolutionMeter: {
    label: 'field-names.dem.resolutionMeter',
    isBriefField: {
      order: 6,
    },
  },
  absoluteAccuracyLEP90: {
    label: 'field-names.dem.absoluteAccuracyLEP90',
    isBriefField: {
      order: 7,
    },
  },
  relativeAccuracyLEP90: {
    label: 'field-names.dem.relativeAccuracyLEP90',
    isBriefField: {
      order: 8,
    },
  },
  sensors: {
    label: 'field-names.dem.sensors',
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.dem.footprint',
    fullWidth: true,
  },
  layerPolygonParts: {
    label: 'field-names.dem.layerPolygonParts',
    fullWidth: true,
  },
  heightRangeFrom: {
    label: 'field-names.dem.heightRangeFrom',
  },
  heightRangeTo: {
    label: 'field-names.dem.heightRangeTo',
  },
  srsId: {
    label: 'field-names.dem.srsId',
  },
  srsName: {
    label: 'field-names.dem.srsName',
  },
  region: {
    label: 'field-names.dem.region',
    fullWidth: true,
  },
  classification: {
    label: 'field-names.dem.classification',
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
    fullWidth: true,
  },
  productStatus: {
    label: 'field-names.dem.productStatus',
    isBriefField: {
      order: 4,
    },
  },
  // hasTerrain: {
  //   label: 'field-names.dem.hasTerrain',
  // },
  imagingSortieAccuracyCEP90: {
    label: 'field-names.dem.imagingSortieAccuracyCEP90',
  },
  geographicArea: {
    label: 'field-names.dem.geographicArea',
  },
  productBoundingBox: {
    label: 'field-names.dem.productBoundingBox',
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  undulationModel: {
    label: 'field-names.dem.undulationModel',
  },
  dataType: {
    label: 'field-names.dem.dataType',
  },
  noDataValue: {
    label: 'field-names.dem.noDataValue',
  },
  links: {
    label: 'field-names.dem.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.dem.link.name',
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.dem.link.description',
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.dem.link.protocol',
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.dem.link.url',
    fullWidth: true,
  },
  type: {
    label: 'field-names.dem.type',
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  typeName: {
    label: 'field-names.dem.typeName',
  },
  schema: {
    label: 'field-names.dem.schema',
  },
  mdSource: {
    label: 'field-names.dem.mdSource',
  },
  xml: {
    label: 'field-names.dem.xml',
  },
  anyText: {
    label: 'field-names.dem.anyText',
  },
  insertDate: {
    label: 'field-names.dem.insertDate',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges. requires special treatment.
      order: 0,
    },
    isBriefField: {
      order: 9,
    },
  },
  wktGeometry: {
    label: 'field-names.dem.wktGeometry',
  },
  keywords: {
    label: 'field-names.dem.keywords',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const pycswDemCatalogRecordUIAspects = pycswDemCatalogRecordAspects;
