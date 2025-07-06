export const vectorCatalogRecordAspects = {
  type: {
    label: 'field-names.vector.type',
    order: 999,
  },
  classification: {
    label: 'field-names.vector.classification',
    order: 101,
    fullWidth: true,
    isBriefField: {
      order: 3,
    },
  },
  productName: {
    label: 'field-names.vector.productName',
    order: 2,
    isInfoTooltip: true,
  },
  description: {
    label: 'field-names.vector.description',
    order: 100,
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 5,
    },
  },
  srsId: {
    label: 'field-names.vector.srsId',
    order: 201,
  },
  producerName: {
    label: 'field-names.vector.producerName',
    order: 102,
  },
  productType: {
    label: 'field-names.vector.productType',
    order: 3,
  },
  srsName: {
    label: 'field-names.vector.srsName',
    order: 200,
    isBriefField: {
      order: 2,
    },
  },
  footprint: {
    label: 'field-names.vector.footprint',
    order: 202,
    fullWidth: true,
    isCopyable: true,
  },
  featureStructure: {
    label: 'field-names.vector.featureStructure',
    order: 4,
    fullWidth: true,
    isBriefField: {
      order: 4,
    },
  },
  id: {
    label: 'field-names.vector.id',
    order: 1,
    isBriefField: {
      order: 1,
    },
  },
  keywords: {
    label: 'field-names.vector.keywords',
    order: 103,
    fullWidth: true,
  },
  links: {
    label: 'field-names.vector.links',
    order: 104,
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.vector.link.name',
    order: 105,
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.vector.link.description',
    order: 106,
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.vector.link.protocol',
    order: 107,
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.vector.link.url',
    order: 108,
    fullWidth: true,
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;
