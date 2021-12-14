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
  productType: {
    label: 'field-names.dem.productType',
  },
  description: {
    label: 'field-names.dem.description',
    fullWidth: true,
  },
  updateDate: {
    label: 'field-names.dem.updateDate',
  },
  sourceDateStart: {
    label: 'field-names.dem.sourceDateStart',
  },
  sourceDateEnd: {
    label: 'field-names.dem.sourceDateEnd',
  },
  resolutionDegree: {
    label: 'field-names.dem.resolutionDegree',
  },
  resolutionMeter: {
    label: 'field-names.dem.resolutionMeter',
  },
  absoluteAccuracyLEP90: {
    label: 'field-names.dem.absoluteAccuracyLEP90',
  },
  relativeAccuracyLEP90: {
    label: 'field-names.dem.relativeAccuracyLEP90',
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
  layerPolygonParts: {
    label: 'field-names.dem.layerPolygonParts',
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
  producerName: {
    label: 'field-names.dem.producerName',
  },
  geographicArea: {
    label: 'field-names.dem.geographicArea',
  },
  productBoundingBox: {
    label: 'field-names.dem.productBoundingBox',
  },
  verticalDatum: {
    label: 'field-names.dem.verticalDatum',
  },
  units: {
    label: 'field-names.dem.units',
  },
  undulationModel: {
    label: 'field-names.dem.undulationModel',
  },
  dataType: {
    label: 'field-names.dem.dataType',
  },
  noDateValue: {
    label: 'field-names.dem.noDateValue',
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
