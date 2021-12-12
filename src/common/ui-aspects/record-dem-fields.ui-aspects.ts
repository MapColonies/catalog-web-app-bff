import { SensorType } from '@map-colonies/mc-model-types';
import { updateDictionary } from './enum.translation';

const pycswDemCatalogRecordAspects = {
  id: {
    label: 'field-names.dem.id',
  },
  productId: {
    label: 'field-names.dem.productId',
  },
  productName: {
    label: 'field-names.dem.productName',
  },
  productVersion: {
    label: 'field-names.dem.productVersion',
  },
  productType: {
    label: 'field-names.dem.productType',
  },
  description: {
    label: 'field-names.dem.description',
    fullWidth: true,
  },
  creationDate: {
    label: 'field-names.dem.creationDate',
    fullWidth: true,
  },
  sourceDateStart: {
    label: 'field-names.dem.sourceDateStart',
  },
  sourceDateEnd: {
    label: 'field-names.dem.sourceDateEnd',
  },
  minResolutionMeter: {
    label: 'field-names.dem.minResolutionMeter',
  },
  maxResolutionMeter: {
    label: 'field-names.dem.maxResolutionMeter',
  },
  nominalResolution: {
    label: 'field-names.dem.nominalResolution',
  },
  maxAccuracyCE90: {
    label: 'field-names.dem.maxAccuracyCE90',
  },
  absoluteAccuracyLEP90: {
    label: 'field-names.dem.absoluteAccuracyLEP90',
  },
  accuracySE90: {
    label: 'field-names.dem.accuracySE90',
  },
  relativeAccuracyLEP90: {
    label: 'field-names.dem.relativeAccuracyLEP90',
  },
  visualAccuracy: {
    label: 'field-names.dem.visualAccuracy',
  },
  sensorType: {
    label: 'field-names.dem.sensorType',
    fullWidth: true,
    enumValues: {
      dictionary: updateDictionary('sensorType', SensorType),
    },
  },
  footprint: {
    label: 'field-names.dem.footprint',
    fullWidth: true,
  },
  heightRangeFrom: {
    label: 'field-names.dem.heightRangeFrom',
  },
  heightRangeTo: {
    label: 'field-names.dem.heightRangeTo',
  },
  srsId: {
    label: 'field-names.dem.srsId',
  },
  srsName: {
    label: 'field-names.dem.srsName',
  },
  srsOrigin: {
    label: 'field-names.dem.srsOrigin',
    fullWidth: true,
  },
  region: {
    label: 'field-names.dem.region',
    fullWidth: true,
  },
  classification: {
    label: 'field-names.dem.classification',
    fullWidth: true,
    // enumValues: {
    //   dictionary: {
    //     "SHAMUR": { displayKey: 'lookups.classification.shamur', tooltipKey: 'lookups.classification.shamur.tooltip', icon: 'mc-icon-shamur' },
    //   },
    // },
  },
  productionSystem: {
    label: 'field-names.dem.productionSystem',
  },
  productionSystemVer: {
    label: 'field-names.dem.productionSystemVer',
  },
  producerName: {
    label: 'field-names.dem.producerName',
  },
  productionMethod: {
    label: 'field-names.dem.productionMethod',
  },
  minFlightAlt: {
    label: 'field-names.dem.minFlightAlt',
  },
  maxFlightAlt: {
    label: 'field-names.dem.maxFlightAlt',
  },
  geographicArea: {
    label: 'field-names.dem.geographicArea',
  },
  productBoundingBox: {
    label: 'field-names.dem.productBoundingBox',
  },
  links: {
    label: 'field-names.dem.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.dem.link.name',
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.dem.link.description',
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.dem.link.protocol',
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.dem.link.url',
    fullWidth: true,
  },
  type: {
    label: 'field-names.dem.type',
  },
  typeName: {
    label: 'field-names.dem.typeName',
  },
  schema: {
    label: 'field-names.dem.schema',
  },
  mdSource: {
    label: 'field-names.dem.mdSource',
  },
  xml: {
    label: 'field-names.dem.xml',
  },
  anyText: {
    label: 'field-names.dem.anyText',
  },
  insertDate: {
    label: 'field-names.dem.insertDate',
  },
  wktGeometry: {
    label: 'field-names.dem.wktGeometry',
  },
  keywords: {
    label: 'field-names.dem.keywords',
  },
} as Record<string, any>;

export const pycswDemCatalogRecordUIAspects = pycswDemCatalogRecordAspects;
