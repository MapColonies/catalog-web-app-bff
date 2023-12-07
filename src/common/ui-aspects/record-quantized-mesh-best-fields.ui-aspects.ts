import { DateGranularity } from '../../graphql/entityDescriptor';

export const pycswQuantizedMeshBestCatalogRecordAspects = {
  id: {
    label: 'field-names.quantized-mesh.id',
    isBriefField: {
      order: 1,
    },
  },
  productId: {
    label: 'field-names.quantized-mesh.productId',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 2,
    },
  },
  productName: {
    label: 'field-names.quantized-mesh.productName',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
  },
  productVersion: {
    label: 'field-names.quantized-mesh.productVersion',
    isBriefField: {
      order: 3,
    },
  },
  productType: {
    label: 'field-names.quantized-mesh.productType',
    isBriefField: {
      order: 9,
    },
    isInfoTooltip: true,
  },
  description: {
    label: 'field-names.quantized-mesh.description',
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 13,
    },
  },
  creationDate: {
    label: 'field-names.quantized-mesh.creationDate',
    fullWidth: true,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  updateDate: {
    label: 'field-names.quantized-mesh.updateDate',
    fullWidth: true,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  sourceDateStart: {
    label: 'field-names.quantized-mesh.sourceDateStart',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 5,
    },
  },
  sourceDateEnd: {
    label: 'field-names.quantized-mesh.sourceDateEnd',
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
    label: 'field-names.quantized-mesh.minResolutionMeter',
  },
  maxResolutionMeter: {
    label: 'field-names.quantized-mesh.maxResolutionMeter',
    isInfoTooltip: true,
  },
  maxAccuracyCE90: {
    label: 'field-names.quantized-mesh.maxAccuracyCE90',
  },
  sensors: {
    label: 'field-names.quantized-mesh.sensors',
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.quantized-mesh.footprint',
    fullWidth: true,
    isCopyable: true,
  },
  heightRangeFrom: {
    label: 'field-names.quantized-mesh.heightRangeFrom',
  },
  heightRangeTo: {
    label: 'field-names.quantized-mesh.heightRangeTo',
  },
  srsId: {
    label: 'field-names.quantized-mesh.srsId',
  },
  srsName: {
    label: 'field-names.quantized-mesh.srsName',
  },
  region: {
    label: 'field-names.quantized-mesh.region',
    fullWidth: true,
  },
  classification: {
    label: 'field-names.quantized-mesh.classification',
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
  },
  productionSystemVer: {
    label: 'field-names.quantized-mesh.productionSystemVer',
  },
  producerName: {
    label: 'field-names.quantized-mesh.producerName',
  },
  geographicArea: {
    label: 'field-names.quantized-mesh.geographicArea',
  },
  productSource: {
    label: 'field-names.quantized-mesh.productSource',
    fullWidth: true,
  },
  productStatus: {
    label: 'field-names.quantized-mesh.productStatus',
  },
  productBoundingBox: {
    label: 'field-names.quantized-mesh.productBoundingBox',
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  links: {
    label: 'field-names.quantized-mesh.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.quantized-mesh.link.name',
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.quantized-mesh.link.description',
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.quantized-mesh.link.protocol',
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.quantized-mesh.link.url',
    fullWidth: true,
  },
  type: {
    label: 'field-names.quantized-mesh.type',
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  typeName: {
    label: 'field-names.quantized-mesh.typeName',
  },
  schema: {
    label: 'field-names.quantized-mesh.schema',
  },
  mdSource: {
    label: 'field-names.quantized-mesh.mdSource',
  },
  xml: {
    label: 'field-names.quantized-mesh.xml',
  },
  anyText: {
    label: 'field-names.quantized-mesh.anyText',
  },
  insertDate: {
    label: 'field-names.quantized-mesh.insertDate',
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
    label: 'field-names.quantized-mesh.wktGeometry',
  },
  keywords: {
    label: 'field-names.quantized-mesh.keywords',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;
