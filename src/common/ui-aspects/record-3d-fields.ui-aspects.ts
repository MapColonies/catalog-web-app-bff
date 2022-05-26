import { DateGranularity } from '../../graphql/entityDescriptor';

const pycsw3DCatalogRecordAspects = {
  id: {
    label: 'field-names.3d.id',
  },
  productId: {
    label: 'field-names.3d.productId',
  },
  productName: {
    label: 'field-names.3d.productName',
  },
  productVersion: {
    label: 'field-names.3d.productVersion',
  },
  productType: {
    label: 'field-names.3d.productType',
  },
  description: {
    label: 'field-names.3d.description',
    fullWidth: true,
  },
  creationDate: {
    label: 'field-names.3d.creationDate',
    fullWidth: true,
  },
  updateDate: {
    label: 'field-names.3d.updateDate',
  },
  sourceDateStart: {
    label: 'field-names.3d.sourceDateStart',
    dateGranularity: DateGranularity.DATE,
  },
  sourceDateEnd: {
    label: 'field-names.3d.sourceDateEnd',
    dateGranularity: DateGranularity.DATE,
  },
  minResolutionMeter: {
    label: 'field-names.3d.minResolutionMeter',
  },
  maxResolutionMeter: {
    label: 'field-names.3d.maxResolutionMeter',
  },
  nominalResolution: {
    label: 'field-names.3d.nominalResolution',
  },
  maxAccuracyCE90: {
    label: 'field-names.3d.maxAccuracyCE90',
  },
  absoluteAccuracyLEP90: {
    label: 'field-names.3d.absoluteAccuracyLEP90',
  },
  accuracySE90: {
    label: 'field-names.3d.accuracySE90',
  },
  relativeAccuracyLEP90: {
    label: 'field-names.3d.relativeAccuracyLEP90',
  },
  visualAccuracy: {
    label: 'field-names.3d.visualAccuracy',
  },
  sensors: {
    label: 'field-names.3d.sensors',
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.3d.footprint',
    fullWidth: true,
  },
  heightRangeFrom: {
    label: 'field-names.3d.heightRangeFrom',
  },
  heightRangeTo: {
    label: 'field-names.3d.heightRangeTo',
  },
  srsId: {
    label: 'field-names.3d.srsId',
  },
  srsName: {
    label: 'field-names.3d.srsName',
  },
  srsOrigin: {
    label: 'field-names.3d.srsOrigin',
    fullWidth: true,
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
  productionSystem: {
    label: 'field-names.3d.productionSystem',
  },
  productionSystemVer: {
    label: 'field-names.3d.productionSystemVer',
  },
  producerName: {
    label: 'field-names.3d.producerName',
  },
  productionMethod: {
    label: 'field-names.3d.productionMethod',
  },
  minFlightAlt: {
    label: 'field-names.3d.minFlightAlt',
  },
  maxFlightAlt: {
    label: 'field-names.3d.maxFlightAlt',
  },
  geographicArea: {
    label: 'field-names.3d.geographicArea',
  },
  productBoundingBox: {
    label: 'field-names.3d.productBoundingBox',
  },
  links: {
    label: 'field-names.3d.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.3d.link.name',
    isCopyable: true,
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
  type: {
    label: 'field-names.3d.type',
  },
  typeName: {
    label: 'field-names.3d.typeName',
  },
  schema: {
    label: 'field-names.3d.schema',
  },
  mdSource: {
    label: 'field-names.3d.mdSource',
  },
  xml: {
    label: 'field-names.3d.xml',
  },
  anyText: {
    label: 'field-names.3d.anyText',
  },
  insertDate: {
    label: 'field-names.3d.insertDate',
  },
  wktGeometry: {
    label: 'field-names.3d.wktGeometry',
  },
  keywords: {
    label: 'field-names.3d.keywords',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;

export const pycsw3DCatalogRecordUIAspects = pycsw3DCatalogRecordAspects;
