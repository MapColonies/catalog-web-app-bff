/* eslint-disable @typescript-eslint/naming-convention */
import { pycsw3DCatalogRecordUIAspects } from './ui-aspects/record-3d-fields.ui-aspects';
import { pycswBestCatalogRecordUIAspects } from './ui-aspects/record-best-fields.ui-aspects';
import { pycswDEMCatalogRecordUIAspects } from './ui-aspects/record-dem-fields.ui-aspects';
import { pycswLayerCatalogRecordUIAspects } from './ui-aspects/record-raster-fields.ui-aspects';

export const pycswCatalogRecordUIAspects = {
  PycswLayerCatalogRecord: pycswLayerCatalogRecordUIAspects,
  Pycsw3DCatalogRecord: pycsw3DCatalogRecordUIAspects,
  PycswDemCatalogRecord: pycswDEMCatalogRecordUIAspects,
  PycswBestCatalogRecord: pycswBestCatalogRecordUIAspects,
} as Record<string, any>;
