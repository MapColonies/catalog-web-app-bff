import { DateGranularity, ValidationValueType } from '../../graphql/entityDescriptor';

const polygonPartRecordAspects = {
  sourceId: {
    label: 'field-names.raster.id',
    order: 2,
    isBriefField: {
      order: 2,
    },
  },
  version: {
    label: 'field-names.raster.productVersion',
    order: 3,
    isBriefField: {
      order: 4,
    },
  },
  sourceName: {
    label: 'field-names.raster.productName',
    order: 1,
    isInfoTooltip: true,
  },
  resolutionDegree: {
    label: 'field-names.raster.maxResolutionDeg',
    order: 999,
    lookupTable: 'zoomlevelresolutions',
    lookupTableBinding: {
      valueFromPropertyName: 'resolutionDeg',
    },
    // UI field for filter resolution degree options
    validation: [
      {
        errorMsgCode: 'DUMMY_NOT_IN_USE',
        valueType: ValidationValueType.FIELD,
        max: 'resolutionDegreeMaxValue',
      },
    ],
    dependentField: {
      name: 'resolutionMeter',
      valueFromPropertyName: 'resolutionMeter',
    },
  },
  ingestionDateUTC: {
    label: 'field-names.raster.ingestion-date',
    order: 5,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 3,
    },
    isInfoTooltip: true,
  },
  description: {
    label: 'field-names.raster.description',
    order: 100,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 12,
    },
  },
  sensors: {
    label: 'field-names.raster.sensors',
    order: 104,
    fullWidth: true,
  },
  countries: {
    label: 'field-names.polygon-parts.countries',
    order: 105,
    fullWidth: true,
  },
  cities: {
    label: 'field-names.polygon-parts.cities',
    order: 106,
    fullWidth: true,
  },
  classification: {
    label: 'field-names.raster.classification',
    order: 101,
    fullWidth: true,
    isBriefField: {
      order: 11,
    },
  },
  imagingTimeBeginUTC: {
    label: 'field-names.raster.imagingTimeBeginUTC',
    order: 102,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 5,
    },
  },
  imagingTimeEndUTC: {
    label: 'field-names.raster.imagingTimeEndUTC',
    order: 103,
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
  horizontalAccuracyCE90: {
    label: 'field-names.raster.minHorizontalAccuracyCE90',
    order: 200,
  },
  resolutionMeter: {
    label: 'field-names.raster.maxResolutionMeter',
    order: 999,
    isBriefField: {
      order: 7,
    },
    isDisabled: true,
    isInfoTooltip: true,
  },
  sourceResolutionMeter: {
    label: 'field-names.polygon-parts.sourceResolutionMeter',
    order: 4,
    isBriefField: {
      order: 8,
    },
    isInfoTooltip: true,
  },
  footprint: {
    label: 'field-names.raster.footprint',
    order: 201,
    fullWidth: true,
    isCopyable: true,
  },
  recordId: {
    // *** PROBABLY NO NEED
    label: 'field-names.raster.id',
    order: 999,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const polygonPartRecordUIAspects = polygonPartRecordAspects;
