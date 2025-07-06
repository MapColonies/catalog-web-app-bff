import { DateGranularity } from '../../graphql/entityDescriptor';

export const pycswQuantizedMeshBestCatalogRecordAspects = {
  id: {
    label: 'field-names.quantized-mesh.id',
    order: 2,
    isBriefField: {
      order: 1,
    },
  },
  productId: {
    label: 'field-names.quantized-mesh.productId',
    order: 1,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
  },
  productName: {
    label: 'field-names.quantized-mesh.productName',
    order: 3,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
  },
  productVersion: {
    label: 'field-names.quantized-mesh.productVersion',
    order: 4,
    isBriefField: {
      order: 3,
    },
  },
  productType: {
    label: 'field-names.quantized-mesh.productType',
    order: 5,
    isBriefField: {
      order: 9,
    },
    isInfoTooltip: true,
  },
  description: {
    label: 'field-names.quantized-mesh.description',
    order: 100,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 13,
    },
  },
  creationDate: {
    label: 'field-names.quantized-mesh.creationDate',
    order: 105,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  updateDate: {
    label: 'field-names.quantized-mesh.updateDate',
    order: 6,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateStart: {
    label: 'field-names.quantized-mesh.sourceDateStart',
    order: 106,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 5,
    },
  },
  sourceDateEnd: {
    label: 'field-names.quantized-mesh.sourceDateEnd',
    order: 107,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges and require special treatment
      order: 1,
    },
    isBriefField: {
      order: 6,
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
    order: 108,
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.quantized-mesh.footprint',
    order: 207,
    fullWidth: true,
    isCopyable: true,
  },
  heightRangeFrom: {
    label: 'field-names.quantized-mesh.heightRangeFrom',
    order: 203,
  },
  heightRangeTo: {
    label: 'field-names.quantized-mesh.heightRangeTo',
    order: 204,
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
    order: 109,
    fullWidth: true,
  },
  classification: {
    label: 'field-names.quantized-mesh.classification',
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
    label: 'field-names.quantized-mesh.productionSystem',
    order: 103,
  },
  productionSystemVer: {
    label: 'field-names.quantized-mesh.productionSystemVer',
    order: 104,
  },
  producerName: {
    label: 'field-names.quantized-mesh.producerName',
    order: 102,
  },
  geographicArea: {
    label: 'field-names.quantized-mesh.geographicArea',
    order: 110,
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
    order: 205,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  links: {
    label: 'field-names.quantized-mesh.links',
    order: 112,
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.quantized-mesh.link.name',
    order: 113,
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.quantized-mesh.link.description',
    order: 114,
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.quantized-mesh.link.protocol',
    order: 115,
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.quantized-mesh.link.url',
    order: 116,
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
    order: 999,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges and require special treatment
      order: 0,
    },
    isBriefField: {
      order: 4,
    },
    isInfoTooltip: true,
  },
  wktGeometry: {
    label: 'field-names.quantized-mesh.wktGeometry',
    order: 206,
  },
  keywords: {
    label: 'field-names.quantized-mesh.keywords',
    order: 111,
    fullWidth: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;
