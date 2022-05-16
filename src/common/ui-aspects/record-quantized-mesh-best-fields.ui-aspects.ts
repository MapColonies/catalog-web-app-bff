import { DateGranularity } from '../../graphql/entityDescriptor';

export const pycswQuantizedMeshBestCatalogRecordAspects = {
  id: {
    label: 'field-names.quantized-mesh.id',
  },
  productId: {
    label: 'field-names.quantized-mesh.productId',
  },
  productName: {
    label: 'field-names.quantized-mesh.productName',
  },
  productVersion: {
    label: 'field-names.quantized-mesh.productVersion',
  },
  productType: {
    label: 'field-names.quantized-mesh.productType',
  },
  description: {
    label: 'field-names.quantized-mesh.description',
    fullWidth: true,
  },
  creationDate: {
    label: 'field-names.quantized-mesh.creationDate',
    fullWidth: true,
  },
  updateDate: {
    label: 'field-names.quantized-mesh.updateDate',
  },
  sourceDateStart: {
    label: 'field-names.quantized-mesh.sourceDateStart',
    dateGranularity: DateGranularity.DATE,
  },
  sourceDateEnd: {
    label: 'field-names.quantized-mesh.sourceDateEnd',
    dateGranularity: DateGranularity.DATE,
  },
  minResolutionMeter: {
    label: 'field-names.quantized-mesh.minResolutionMeter',
  },
  maxResolutionMeter: {
    label: 'field-names.quantized-mesh.maxResolutionMeter',
  },
  nominalResolution: {
    label: 'field-names.quantized-mesh.nominalResolution',
  },
  maxAccuracyCE90: {
    label: 'field-names.quantized-mesh.maxAccuracyCE90',
  },
  absoluteAccuracyLEP90: {
    label: 'field-names.quantized-mesh.absoluteAccuracyLEP90',
  },
  accuracySE90: {
    label: 'field-names.quantized-mesh.accuracySE90',
  },
  relativeAccuracyLEP90: {
    label: 'field-names.quantized-mesh.relativeAccuracyLEP90',
  },
  visualAccuracy: {
    label: 'field-names.quantized-mesh.visualAccuracy',
  },
  sensors: {
    label: 'field-names.quantized-mesh.sensors',
    fullWidth: true,
  },
  footprint: {
    label: 'field-names.quantized-mesh.footprint',
    fullWidth: true,
  },
  heightRangeFrom: {
    label: 'field-names.quantized-mesh.heightRangeFrom',
  },
  heightRangeTo: {
    label: 'field-names.quantized-mesh.heightRangeTo',
  },
  srsId: {
    label: 'field-names.quantized-mesh.srsId',
  },
  srsName: {
    label: 'field-names.quantized-mesh.srsName',
  },
  srsOrigin: {
    label: 'field-names.quantized-mesh.srsOrigin',
    fullWidth: true,
  },
  region: {
    label: 'field-names.quantized-mesh.region',
    fullWidth: true,
  },
  classification: {
    label: 'field-names.quantized-mesh.classification',
    fullWidth: true,
    // enumValues: {
    //   dictionary: {
    //     "SHAMUR": { displayKey: 'lookups.classification.shamur', tooltipKey: 'lookups.classification.shamur.tooltip', icon: 'mc-icon-shamur' },
    //   },
    // },
  },
  productionSystem: {
    label: 'field-names.quantized-mesh.productionSystem',
  },
  productionSystemVer: {
    label: 'field-names.quantized-mesh.productionSystemVer',
  },
  producerName: {
    label: 'field-names.quantized-mesh.producerName',
  },
  productionMethod: {
    label: 'field-names.quantized-mesh.productionMethod',
  },
  minFlightAlt: {
    label: 'field-names.quantized-mesh.minFlightAlt',
  },
  maxFlightAlt: {
    label: 'field-names.quantized-mesh.maxFlightAlt',
  },
  geographicArea: {
    label: 'field-names.quantized-mesh.geographicArea',
  },
  productBoundingBox: {
    label: 'field-names.quantized-mesh.productBoundingBox',
  },
  links: {
    label: 'field-names.quantized-mesh.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.quantized-mesh.link.name',
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.quantized-mesh.link.description',
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.quantized-mesh.link.protocol',
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.quantized-mesh.link.url',
    fullWidth: true,
  },
  type: {
    label: 'field-names.quantized-mesh.type',
  },
  typeName: {
    label: 'field-names.quantized-mesh.typeName',
  },
  schema: {
    label: 'field-names.quantized-mesh.schema',
  },
  mdSource: {
    label: 'field-names.quantized-mesh.mdSource',
  },
  xml: {
    label: 'field-names.quantized-mesh.xml',
  },
  anyText: {
    label: 'field-names.quantized-mesh.anyText',
  },
  insertDate: {
    label: 'field-names.quantized-mesh.insertDate',
  },
  wktGeometry: {
    label: 'field-names.quantized-mesh.wktGeometry',
  },
  keywords: {
    label: 'field-names.quantized-mesh.keywords',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;
