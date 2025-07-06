import { DateGranularity } from '../../graphql/entityDescriptor';

export const pycswQuantizedMeshBestCatalogRecordAspects = {
  id: {
    label: 'field-names.quantized-mesh.id',
    order: 1,
    isBriefField: {
      order: 1,
    },
  },
  productId: {
    label: 'field-names.quantized-mesh.productId',
    order: 0,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
  },
  productName: {
    label: 'field-names.quantized-mesh.productName',
    order: 0,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
  },
  productVersion: {
    label: 'field-names.quantized-mesh.productVersion',
    order: 0,
    isBriefField: {
      order: 3,
    },
  },
  productType: {
    label: 'field-names.quantized-mesh.productType',
    order: 0,
    isBriefField: {
      order: 9,
    },
    isInfoTooltip: true,
  },
  description: {
    label: 'field-names.quantized-mesh.description',
    order: 0,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 13,
    },
  },
  creationDate: {
    label: 'field-names.quantized-mesh.creationDate',
    order: 0,
    fullWidth: true,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  updateDate: {
    label: 'field-names.quantized-mesh.updateDate',
    order: 0,
    fullWidth: true,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateStart: {
    label: 'field-names.quantized-mesh.sourceDateStart',
    order: 0,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 5,
    },
  },
  sourceDateEnd: {
    label: 'field-names.quantized-mesh.sourceDateEnd',
    order: 0,
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
    order: 0,
  },
  maxResolutionMeter: {
    label: 'field-names.quantized-mesh.maxResolutionMeter',
    order: 0,
    isInfoTooltip: true,
  },
  maxAccuracyCE90: {
    label: 'field-names.quantized-mesh.maxAccuracyCE90',
    order: 0,
  },
  sensors: {
    label: 'field-names.quantized-mesh.sensors',
    order: 0,
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.quantized-mesh.footprint',
    order: 0,
    fullWidth: true,
    isCopyable: true,
  },
  heightRangeFrom: {
    label: 'field-names.quantized-mesh.heightRangeFrom',
    order: 0,
  },
  heightRangeTo: {
    label: 'field-names.quantized-mesh.heightRangeTo',
    order: 0,
  },
  srsId: {
    label: 'field-names.quantized-mesh.srsId',
    order: 0,
  },
  srsName: {
    label: 'field-names.quantized-mesh.srsName',
    order: 0,
  },
  region: {
    label: 'field-names.quantized-mesh.region',
    order: 0,
    fullWidth: true,
  },
  classification: {
    label: 'field-names.quantized-mesh.classification',
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
    label: 'field-names.quantized-mesh.productionSystem',
    order: 0,
  },
  productionSystemVer: {
    label: 'field-names.quantized-mesh.productionSystemVer',
    order: 0,
  },
  producerName: {
    label: 'field-names.quantized-mesh.producerName',
    order: 0,
  },
  geographicArea: {
    label: 'field-names.quantized-mesh.geographicArea',
    order: 0,
  },
  productSource: {
    label: 'field-names.quantized-mesh.productSource',
    order: 0,
    fullWidth: true,
  },
  productStatus: {
    label: 'field-names.quantized-mesh.productStatus',
    order: 0,
  },
  productBoundingBox: {
    label: 'field-names.quantized-mesh.productBoundingBox',
    order: 0,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  links: {
    label: 'field-names.quantized-mesh.links',
    order: 0,
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.quantized-mesh.link.name',
    order: 0,
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.quantized-mesh.link.description',
    order: 0,
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.quantized-mesh.link.protocol',
    order: 0,
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.quantized-mesh.link.url',
    order: 0,
    fullWidth: true,
  },
  type: {
    label: 'field-names.quantized-mesh.type',
    order: 0,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  typeName: {
    label: 'field-names.quantized-mesh.typeName',
    order: 0,
  },
  schema: {
    label: 'field-names.quantized-mesh.schema',
    order: 0,
  },
  mdSource: {
    label: 'field-names.quantized-mesh.mdSource',
    order: 0,
  },
  xml: {
    label: 'field-names.quantized-mesh.xml',
    order: 0,
  },
  anyText: {
    label: 'field-names.quantized-mesh.anyText',
    order: 0,
  },
  insertDate: {
    label: 'field-names.quantized-mesh.insertDate',
    order: 0,
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
    order: 0,
  },
  keywords: {
    label: 'field-names.quantized-mesh.keywords',
    order: 0,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;
