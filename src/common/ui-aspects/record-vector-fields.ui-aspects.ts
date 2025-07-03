export const vectorCatalogRecordAspects = {
  type: {
    label: 'field-names.vector.type',
    order: 0,
  },
  classification: {
    label: 'field-names.vector.classification',
    order: 0,
    fullWidth: true,
    isBriefField: {
      order: 3,
    },
  },
  productName: {
    label: 'field-names.vector.productName',
    order: 0,
    isInfoTooltip: true,
  },
  description: {
    label: 'field-names.vector.description',
    order: 0,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 5,
    },
  },
  srsId: {
    label: 'field-names.vector.srsId',
    order: 0,
  },
  producerName: {
    label: 'field-names.vector.producerName',
    order: 0,
  },
  productType: {
    label: 'field-names.vector.productType',
    order: 0,
  },
  srsName: {
    label: 'field-names.vector.srsName',
    order: 0,
    isBriefField: {
      order: 2,
    },
  },
  footprint: {
    label: 'field-names.vector.footprint',
    order: 0,
    fullWidth: true,
    isCopyable: true,
  },
  featureStructure: {
    label: 'field-names.vector.featureStructure',
    order: 0,
    fullWidth: true,
    isBriefField: {
      order: 4,
    },
  },
  id: {
    label: 'field-names.vector.id',
    order: 0,
    isBriefField: {
      order: 1,
    },
  },
  keywords: {
    label: 'field-names.vector.keywords',
    order: 0,
  },
  links: {
    label: 'field-names.vector.links',
    order: 0,
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.vector.link.name',
    order: 0,
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.vector.link.description',
    order: 0,
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.vector.link.protocol',
    order: 0,
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.vector.link.url',
    order: 0,
    fullWidth: true,
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;
