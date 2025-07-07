import { DateGranularity } from '../../graphql/entityDescriptor';

export const pycswQuantizedMeshBestCatalogRecordAspects = {
  id: {
    label: 'field-names.quantized-mesh.id',
    order: 4,
    isBriefField: {
      order: 1,
    },
  },
  productId: {
    label: 'field-names.quantized-mesh.productId',
    order: 2,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
  },
  productName: {
    label: 'field-names.quantized-mesh.productName',
    order: 1,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
  },
  productVersion: {
    label: 'field-names.quantized-mesh.productVersion',
    order: 3,
    isBriefField: {
      order: 6,
    },
  },
  productType: {
    label: 'field-names.quantized-mesh.productType',
    order: 5,
    isBriefField: {
      order: 2,
    },
    isInfoTooltip: true,
  },
  description: {
    label: 'field-names.quantized-mesh.description',
    order: 112,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 8,
    },
  },
  creationDate: {
    label: 'field-names.quantized-mesh.creationDate',
    order: 106,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  updateDate: {
    label: 'field-names.quantized-mesh.updateDate',
    order: 6,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateStart: {
    label: 'field-names.quantized-mesh.sourceDateStart',
    order: 104,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 3,
    },
  },
  sourceDateEnd: {
    label: 'field-names.quantized-mesh.sourceDateEnd',
    order: 105,
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
    label: 'field-names.quantized-mesh.minResolutionMeter',
    order: 7,
  },
  maxResolutionMeter: {
    label: 'field-names.quantized-mesh.maxResolutionMeter',
    order: 8,
    isInfoTooltip: true,
  },
  maxAccuracyCE90: {
    label: 'field-names.quantized-mesh.maxAccuracyCE90',
    order: 202,
  },
  sensors: {
    label: 'field-names.quantized-mesh.sensors',
    order: 103,
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.quantized-mesh.footprint',
    order: 203,
    fullWidth: true,
    isCopyable: true,
  },
  heightRangeFrom: {
    label: 'field-names.quantized-mesh.heightRangeFrom',
    order: 204,
  },
  heightRangeTo: {
    label: 'field-names.quantized-mesh.heightRangeTo',
    order: 205,
  },
  srsId: {
    label: 'field-names.quantized-mesh.srsId',
    order: 201,
  },
  srsName: {
    label: 'field-names.quantized-mesh.srsName',
    order: 200,
  },
  region: {
    label: 'field-names.quantized-mesh.region',
    order: 101,
    fullWidth: true,
  },
  classification: {
    label: 'field-names.quantized-mesh.classification',
    order: 100,
    fullWidth: true,
    isBriefField: {
      order: 7,
    },
    // enumValues: {
    //   dictionary: {
    //     "SHAMUR": { displayKey: 'lookups.classification.shamur', tooltipKey: 'lookups.classification.shamur.tooltip', icon: 'mc-icon-shamur' },
    //   },
    // },
  },
  productionSystem: {
    label: 'field-names.quantized-mesh.productionSystem',
    order: 109,
  },
  productionSystemVer: {
    label: 'field-names.quantized-mesh.productionSystemVer',
    order: 110,
  },
  producerName: {
    label: 'field-names.quantized-mesh.producerName',
    order: 108,
    fullWidth: true,
  },
  geographicArea: {
    label: 'field-names.quantized-mesh.geographicArea',
    order: 102,
    fullWidth: true,
  },
  productSource: {
    label: 'field-names.quantized-mesh.productSource',
    order: 9,
    fullWidth: true,
  },
  productStatus: {
    label: 'field-names.quantized-mesh.productStatus',
    order: 10,
  },
  productBoundingBox: {
    label: 'field-names.quantized-mesh.productBoundingBox',
    order: 206,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  links: {
    label: 'field-names.quantized-mesh.links',
    order: 113,
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.quantized-mesh.link.name',
    order: 114,
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.quantized-mesh.link.description',
    order: 115,
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.quantized-mesh.link.protocol',
    order: 116,
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.quantized-mesh.link.url',
    order: 117,
    fullWidth: true,
  },
  type: {
    label: 'field-names.quantized-mesh.type',
    order: 999,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  typeName: {
    label: 'field-names.quantized-mesh.typeName',
    order: 999,
  },
  schema: {
    label: 'field-names.quantized-mesh.schema',
    order: 999,
  },
  mdSource: {
    label: 'field-names.quantized-mesh.mdSource',
    order: 999,
  },
  xml: {
    label: 'field-names.quantized-mesh.xml',
    order: 999,
  },
  anyText: {
    label: 'field-names.quantized-mesh.anyText',
    order: 999,
  },
  insertDate: {
    label: 'field-names.quantized-mesh.insertDate',
    order: 107,
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
    label: 'field-names.quantized-mesh.wktGeometry',
    order: 207,
  },
  keywords: {
    label: 'field-names.quantized-mesh.keywords',
    order: 111,
    fullWidth: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;
