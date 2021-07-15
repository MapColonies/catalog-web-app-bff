import { SensorType } from '@map-colonies/mc-model-types';
import { updateDictionary } from './enum.translation';

const pycsw3DCatalogRecordAspects = {
  id: {
    label: 'field-names.3d.id',
  },
  productName: {
    label: 'field-names.3d.productName',
  },
  type: {
    label: 'field-names.3d.type',
  },
  resolution: {
    label: 'field-names.3d.resolution',
  },
  updateDate: {
    label: 'field-names.3d.update-date',
  },
  description: {
    label: 'field-names.3d.description',
    fullWidth: true,
  },
  sensorType: {
    label: 'field-names.3d.sensor-type',
    fullWidth: true,
    enumValues: {
      dictionary: updateDictionary('sensorType', SensorType),
    },
  },
  region: {
    label: 'field-names.3d.region',
    fullWidth: true,
  },
  classification: {
    label: 'field-names.3d.classification',
    fullWidth: true,
    // enumValues: {
    //   dictionary: {
    //     "SHAMUR": { displayKey: 'lookups.classification.shamur', tooltipKey: 'lookups.classification.shamur.tooltip', icon: 'mc-icon-shamur' },
    //   },
    // },
  },
  links: {
    label: 'field-names.3d.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.3d.link.name',
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.3d.link.description',
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.3d.link.protocol',
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.3d.link.url',
    fullWidth: true,
  },
  creationDate: {
    label: 'field-names.3d.creation-date',
  },
  ingestionDate: {
    label: 'field-names.3d.ingestion-date',
  },
  sourceDateStart: {
    label: 'field-names.3d.source-start-date',
  },
  sourceDateEnd: {
    label: 'field-names.3d.source-end-date',
  },
  accuracyCE90: {
    label: 'field-names.3d.accuracyCE90',
  },
  accuracyLE90: {
    label: 'field-names.3d.accuracyLE90',
  },
  srsId: {
    label: 'field-names.3d.srs',
  },
  keywords: {
    label: 'field-names.3d.keywords',
  },
  version: {
    label: 'field-names.3d.version',
  },
  producerName: {
    label: 'field-names.3d.producer-name',
  },
  projectName: {
    label: 'field-names.3d.project-name',
  },
  validationDate: {
    label: 'field-names.3d.validation-date',
  },
  centroid: {
    label: 'field-names.3d.centroid',
  },
  relativeAccuracyCE90: {
    label: 'field-names.3d.relativeAccuracyCE90',
  },
  estimatedPrecision: {
    label: 'field-names.3d.estimated-precision',
  },
  measuredPrecision: {
    label: 'field-names.3d.measured-precision',
  },
  nominalResolution: {
    label: 'field-names.3d.nominal-resolution',
  },
  wktGeometry: {
    label: 'field-names.3d.wktGeometry',
  },
} as Record<string, any>;

export const pycsw3DCatalogRecordUIAspects = pycsw3DCatalogRecordAspects;
