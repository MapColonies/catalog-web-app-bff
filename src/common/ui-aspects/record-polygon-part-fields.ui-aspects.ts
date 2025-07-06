import { DateGranularity, ValidationValueType } from '../../graphql/entityDescriptor';

const polygonPartRecordAspects = {
  sourceId: {
    label: 'field-names.raster.id',
    order: 0,
    isBriefField: {
      order: 2,
    },
  },
  version: {
    label: 'field-names.raster.productVersion',
    order: 0,
    isBriefField: {
      order: 4,
    },
  },
  sourceName: {
    label: 'field-names.raster.productName',
    order: 0,
    isInfoTooltip: true,
  },
  resolutionDegree: {
    label: 'field-names.raster.maxResolutionDeg',
    order: 0,
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
    order: 0,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 3,
    },
    isInfoTooltip: true,
  },
  description: {
    label: 'field-names.raster.description',
    order: 0,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 12,
    },
  },
  sensors: {
    label: 'field-names.raster.sensors',
    order: 0,
    fullWidth: true,
  },
  countries: {
    label: 'field-names.polygon-parts.countries',
    order: 0,
    fullWidth: true,
  },
  cities: {
    label: 'field-names.polygon-parts.cities',
    order: 0,
    fullWidth: true,
  },
  classification: {
    label: 'field-names.raster.classification',
    order: 0,
    fullWidth: true,
    isBriefField: {
      order: 11,
    },
  },
  imagingTimeBeginUTC: {
    label: 'field-names.raster.imagingTimeBeginUTC',
    order: 0,
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 5,
    },
  },
  imagingTimeEndUTC: {
    label: 'field-names.raster.imagingTimeEndUTC',
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
  horizontalAccuracyCE90: {
    label: 'field-names.raster.minHorizontalAccuracyCE90',
    order: 0,
  },
  resolutionMeter: {
    label: 'field-names.raster.maxResolutionMeter',
    order: 0,
    isBriefField: {
      order: 7,
    },
    isDisabled: true,
    isInfoTooltip: true,
  },
  sourceResolutionMeter: {
    label: 'field-names.polygon-parts.sourceResolutionMeter',
    order: 0,
    isBriefField: {
      order: 8,
    },
    isInfoTooltip: true,
  },
  footprint: {
    label: 'field-names.raster.footprint',
    order: 0,
    fullWidth: true,
    isCopyable: true,
  },
  recordId: {
    // *** PROBABLY NO NEED
    label: 'field-names.raster.id',
    order: 0,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const polygonPartRecordUIAspects = polygonPartRecordAspects;
