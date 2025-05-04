export const vectorCatalogRecordAspects = {
  type: {
    label: 'field-names.vector.type',
    isFilterable: {
      participateInFilterPanel: false,
      operation: 'eq',
    },
  },
  classification: {
    label: 'field-names.vector.classification',
    fullWidth: true,
    isBriefField: {
      order: 11,
    },
  },
  productName: {
    label: 'field-names.vector.productName',
    isFilterable: {
      participateInFilterPanel: true,
      operation: 'like',
      order: 3,
    },
    isInfoTooltip: true,
  },
  description: {
    label: 'field-names.vector.description',
    fullWidth: true,
    rows: 4,
    isBriefField: {
      order: 12,
    },
  },
  srsId: {
    label: 'field-names.vector.srsId',
  },
  producerName: {
    label: 'field-names.vector.producerName',
  },
  productType: {
    label: 'field-names.vector.productType',
    isBriefField: {
      order: 9,
    },
  },
  srsName: {
    label: 'field-names.vector.srsName',
  },
  footprint: {
    label: 'field-names.vector.footprint',
    fullWidth: true,
    isCopyable: true,
  },
  featureStructure: {
    label: 'field-names.vector.featureStructure',
    fullWidth: true,
    // isBriefField: {
    //   order: 9,
    // },
  },
  id: {
    label: 'field-names.vector.id',
    isBriefField: {
      order: 2,
    },
  },
  keywords: {
    label: 'field-names.vector.keywords',
  },
  links: {
    label: 'field-names.vector.links',
    fullWidth: true,
  },
  'link.name': {
    label: 'field-names.vector.link.name',
    isCopyable: true,
    fullWidth: true,
  },
  'link.description': {
    label: 'field-names.vector.link.description',
    fullWidth: true,
  },
  'link.protocol': {
    label: 'field-names.vector.link.protocol',
    fullWidth: true,
  },
  'link.url': {
    label: 'field-names.vector.link.url',
    fullWidth: true,
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<string, any>;
