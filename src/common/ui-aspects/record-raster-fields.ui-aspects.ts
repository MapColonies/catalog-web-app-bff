import { DateGranularity, FractionType, OperationType } from '../../graphql/entityDescriptor';

const pycswLayerCatalogRecordAspects = {
  id: {
    label: 'field-names.raster.id',
    isBriefField: {
      order: 2,
    },
  },
  productId: {
    label: 'field-names.raster.productId',
    updateRules: {
      freeze: true,
      value: {
        operation: {
          type: OperationType.COPY,
        },
      },
    },
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
    updateRules: {
      freeze: true,
      value: {
        operation: {
          type: OperationType.INCREMENT,
          fraction: FractionType.MAJOR,
          value: 1,
        },
      },
    },
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
    lookupTable: 'zoomlevelresolutions',
    lookupTableBinding: {
      valueFromPropertyName: 'resolutionDeg',
    },
    dependentField: {
      name: 'maxResolutionMeter',
      valueFromPropertyName: 'resolutionMeter',
    },
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
    fullWidth: true,
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
    fullWidth: true,
  },
  productSubType: {
    label: 'field-names.raster.productSubType',
    fullWidth: true,
    isBriefField: {
      order: 10,
    },
  },
  maxResolutionMeter: {
    label: 'field-names.raster.maxResolutionMeter',
    isBriefField: {
      order: 7,
    },
    isDisabled: true,
  },
  productBoundingBox: {
    label: 'field-names.raster.productBoundingBox',
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  scale: {
    label: 'field-names.raster.scale',
  },
  footprint: {
    label: 'field-names.raster.footprint',
    fullWidth: true,
    isCopyable: true,
  },
  producerName: {
    label: 'field-names.raster.producerName',
    fullWidth: true,
  },
  layerPolygonParts: {
    label: 'field-names.raster.layerPolygonParts',
    fullWidth: true,
    isCopyable: true,
  },
  transparency: {
    label: 'field-names.raster.transparency',
    isBriefField: {
      order: 8,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const pycswLayerCatalogRecordUIAspects = pycswLayerCatalogRecordAspects;
