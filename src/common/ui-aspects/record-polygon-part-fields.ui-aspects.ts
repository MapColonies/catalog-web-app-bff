import { DateGranularity, FractionType, OperationType } from '../../graphql/entityDescriptor';

const polygonPartRecordAspects = {
  id: {
    label: 'field-names.raster.id',
    isBriefField: {
      order: 2,
    },
  },
  version: {
    label: 'field-names.raster.productVersion',
    isBriefField: {
      order: 4,
    },
  },
  name: {
    label: 'field-names.raster.productName',
    isInfoTooltip: true,
  },
  resolutionDegree: {
    label: 'field-names.raster.maxResolutionDeg',
    lookupTable: 'zoomlevelresolutions',
    lookupTableBinding: {
      valueFromPropertyName: 'resolutionDeg',
    },
    dependentField: {
      name: 'resolutionMeter',
      valueFromPropertyName: 'resolutionMeter',
    },
  },
  ingestionDateUTC: {
    label: 'field-names.raster.ingestion-date',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 3,
    },
    isInfoTooltip: true,
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
  countries: {
    label: 'field-names.polygon-parts.countries',
    fullWidth: true,
  },
  cities: {
    label: 'field-names.polygon-parts.cities',
    fullWidth: true,
  },
  classification: {
    label: 'field-names.raster.classification',
    fullWidth: true,
    isBriefField: {
      order: 11,
    },
  },
  imagingTimeBeginUTC: {
    label: 'field-names.raster.sourceDateStart',
    dateGranularity: DateGranularity.DATE_AND_TIME,
    isBriefField: {
      order: 5,
    },
  },
  imagingTimeEndUTC: {
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
    isInfoTooltip: true,
  },
  horizontalAccuracyCE90: {
    label: 'field-names.raster.minHorizontalAccuracyCE90',
  },
  resolutionMeter: {
    label: 'field-names.raster.maxResolutionMeter',
    isBriefField: {
      order: 7,
    },
    isDisabled: true,
    isInfoTooltip: true,
  },
  geometry: {
    label: 'field-names.raster.footprint',
    fullWidth: true,
    isCopyable: true,
  },
  recordId: {
    // *** RPBABLY NO NEED
    label: 'field-names.raster.id',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const polygonPartRecordUIAspects = polygonPartRecordAspects;
