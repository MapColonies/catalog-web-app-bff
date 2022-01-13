/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any */
import { pycsw3DCatalogRecordUIAspects } from './ui-aspects/record-3d-fields.ui-aspects';
import { pycswBestCatalogRecordUIAspects } from './ui-aspects/record-best-fields.ui-aspects';
import { pycswDemCatalogRecordUIAspects } from './ui-aspects/record-dem-fields.ui-aspects';
import { pycswLayerCatalogRecordUIAspects } from './ui-aspects/record-raster-fields.ui-aspects';
import { pycswVectorBestCatalogRecordAspects } from './ui-aspects/record-vector-best-fields.ui-aspects';

export const pycswCatalogRecordUIAspects = {
  PycswLayerCatalogRecord: pycswLayerCatalogRecordUIAspects,
  Pycsw3DCatalogRecord: pycsw3DCatalogRecordUIAspects,
  PycswDemCatalogRecord: pycswDemCatalogRecordUIAspects,
  PycswBestCatalogRecord: pycswBestCatalogRecordUIAspects,
  PycswVectorBestCatalogRecord: pycswVectorBestCatalogRecordAspects,
} as Record<string, any>;
