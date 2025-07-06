import { DateGranularity, FractionType, OperationType } from '../../graphql/entityDescriptor';

const pycswLayerCatalogRecordAspects = {
  id: {
    label: 'field-names.raster.id',
    order: 2,
    isBriefField: {
      order: 2,
    },
  },
  productId: {
    label: 'field-names.raster.productId',
    order: 1,
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
    order: 4,
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
      order: 6,
    },
  },
  productType: {
    label: 'field-names.raster.productType',
    order: 5,
    updateRules: {
      freeze: true,
    },
    isBriefField: {
      order: 9,
    },
  },
  productName: {
    label: 'field-names.raster.productName',
    order: 3,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
  },
  type: {
    label: 'field-names.raster.type',
    order: 999,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  maxResolutionDeg: {
    label: 'field-names.raster.maxResolutionDeg',
    order: 8,
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
    order: 106,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'dateRange', // Date filters will be ranges and require special treatment
      order: 0,
    },
  },
  updateDateUTC: {
    label: 'field-names.raster.update-date',
    order: 14,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  description: {
    label: 'field-names.raster.description',
    order: 100,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 13,
    },
  },
  sensors: {
    label: 'field-names.raster.sensors',
    order: 107,
    fullWidth: true,
  },
  region: {
    label: 'field-names.raster.region',
    order: 108,
    fullWidth: true,
  },
  classification: {
    label: 'field-names.raster.classification',
    order: 101,
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
    order: 110,
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.raster.link.name',
    order: 111,
    fullWidth: true,
    isCopyable: true,
  },
  'link.description': {
    label: 'field-names.raster.link.description',
    order: 112,
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.raster.link.protocol',
    order: 113,
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.raster.link.url',
    order: 114,
    fullWidth: true,
  },
  creationDateUTC: {
    label: 'field-names.raster.creation-date',
    order: 105,
    dateGranularity: DateGranularity.DATE_AND_TIME,
  },
  ingestionDate: {
    label: 'field-names.raster.ingestion-date',
    order: 13,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 5,
    },
    isInfoTooltip: true,
  },
  imagingTimeBeginUTC: {
    label: 'field-names.raster.imagingTimeBeginUTC',
    order: 103,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 3,
    },
  },
  imagingTimeEndUTC: {
    label: 'field-names.raster.imagingTimeEndUTC',
    order: 104,
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
  minHorizontalAccuracyCE90: {
    label: 'field-names.raster.minHorizontalAccuracyCE90',
    order: 202,
  },
  maxHorizontalAccuracyCE90: {
    label: 'field-names.raster.maxHorizontalAccuracyCE90',
    order: 203,
  },
  srs: {
    isDisabled: true,
    label: 'field-names.raster.srs',
    order: 201,
  },
  srsName: {
    isDisabled: true,
    label: 'field-names.raster.srs-name',
    order: 200,
  },
  keywords: {
    label: 'field-names.raster.keywords',
    order: 109,
    fullWidth: true,
  },
  productSubType: {
    label: 'field-names.raster.productSubType',
    order: 6,
    isBriefField: {
      order: 10,
    },
  },
  minResolutionDeg: {
    label: 'field-names.raster.minResolutionDeg',
    order: 7,
  },
  minResolutionMeter: {
    label: 'field-names.raster.minResolutionMeter',
    order: 9,
  },
  maxResolutionMeter: {
    label: 'field-names.raster.maxResolutionMeter',
    order: 10,
    isBriefField: {
      order: 7,
    },
    isDisabled: true,
    isInfoTooltip: true,
  },
  productBoundingBox: {
    label: 'field-names.raster.productBoundingBox',
    order: 999,
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'bbox',
    },
  },
  scale: {
    label: 'field-names.raster.scale',
    order: 205,
  },
  footprint: {
    label: 'field-names.raster.footprint',
    order: 204,
    fullWidth: true,
    isCopyable: true,
  },
  producerName: {
    label: 'field-names.raster.producerName',
    order: 102,
    fullWidth: true,
  },
  layerPolygonParts: {
    label: 'field-names.raster.layerPolygonParts',
    order: 999,
    fullWidth: true,
    isCopyable: true,
  },
  transparency: {
    label: 'field-names.raster.transparency',
    order: 11,
    isBriefField: {
      order: 8,
    },
  },
  productStatus: {
    label: 'field-names.raster.productStatus',
    order: 12,
    isBriefField: {
      order: 12,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const pycswLayerCatalogRecordUIAspects = pycswLayerCatalogRecordAspects;
