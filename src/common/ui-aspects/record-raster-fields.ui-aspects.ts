import { SensorType } from '@map-colonies/mc-model-types';
import { DateGranularity } from '../../graphql/entityDescriptor';
import { updateDictionary } from './enum.translation';

const pycswLayerCatalogRecordAspects = {
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
    enumValues: {
      dictionary: updateDictionary('sensorType', SensorType),
    },
  },
  region: {
    label: 'field-names.raster.region',
    fullWidth: true,
  },
  classification: {
    label: 'field-names.raster.classification',
    fullWidth: true,
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
  },
  ingestionDate: {
    label: 'field-names.raster.ingestion-date',
  },
  sourceDateStart: {
    label: 'field-names.raster.sourceDateStart',
    dateGranularity: DateGranularity.DATE,
  },
  sourceDateEnd: {
    label: 'field-names.raster.sourceDateEnd',
    dateGranularity: DateGranularity.DATE,
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
  productSubType: {
    label: 'field-names.raster.productSubType',
    fullWidth: true,
  },
  maxResolutionMeter: {
    label: 'field-names.raster.maxResolutionMeter',
  },
  productBoundingBox: {
    label: 'field-names.raster.productBoundingBox',
  },
  scale: {
    label: 'field-names.raster.scale',
  },
  footprint: {
    label: 'field-names.raster.footprint',
    fullWidth: true,
  },
  producerName: {
    label: 'field-names.raster.producerName',
    fullWidth: true,
  },
  layerPolygonParts: {
    label: 'field-names.raster.layerPolygonParts',
    fullWidth: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const pycswLayerCatalogRecordUIAspects = pycswLayerCatalogRecordAspects;
