import { SensorType } from '@map-colonies/mc-model-types';
import { updateDictionary } from '../../helpers/enums';

const pycswLayerCatalogRecordTranslation = {
  id: {
    label: 'field-names.raster.id',
  },
  productId: {
    label: 'field-names.raster.productId',
  },
  productVersion: {
    label: 'field-names.raster.productVersion',
  },
  productType: {
    label: 'field-names.raster.productType',
  },
  productName: {
    label: 'field-names.raster.productName',
  },
  type: {
    label: 'field-names.raster.type',
  },
  resolution: {
    label: 'field-names.raster.resolution',
  },
  updateDate: {
    label: 'field-names.raster.update-date',
  },
  description: {
    label: 'field-names.raster.description',
    fullWidth: true,
  },
  sensorType: {
    label: 'field-names.raster.sensor-type',
    fullWidth: true,
    // translate: {
    //   dictionary: {
    //     VIS: 'field-values.sensorType.vis',
    //     RGB: 'field-values.sensorType.rgb',
    //     Pan_Sharpen: 'field-values.sensorType.pan_sharpen',
    //     OTHER: 'field-values.sensorType.other',
    //   },
    // },
  },
  region: {
    label: 'field-names.raster.region',
    fullWidth: true,
  },
  classification: {
    label: 'field-names.raster.classification',
    fullWidth: true,
    // translate: {
    //   dictionary: {
    //     CONFIDENTIAL: 'field-values.classification.confidential',
    //     SECRET: 'field-values.classification.secret',
    //     TOP_SECRET: 'field-values.classification.top_secret',
    //   },
    // },
  },
  links: {
    label: 'field-names.raster.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.raster.link.name',
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
  },
  ingestionDate: {
    label: 'field-names.raster.ingestion-date',
  },
  sourceDateStart: {
    label: 'field-names.raster.source-start-date',
  },
  sourceDateEnd: {
    label: 'field-names.raster.source-end-date',
  },
  accuracyCE90: {
    label: 'field-names.raster.accuracyCE90',
  },
  srsId: {
    label: 'field-names.raster.srs',
  },
  srsName: {
    label: 'field-names.raster.srs-name',
  },
  keywords: {
    label: 'field-names.raster.keywords',
  },
} as Record<string, any>;

updateDictionary(pycswLayerCatalogRecordTranslation, 'sensorType', SensorType);

export const pycswLayerCatalogRecordUIAspects = pycswLayerCatalogRecordTranslation;
