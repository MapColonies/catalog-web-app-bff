/* eslint-disable @typescript-eslint/naming-convention */
import { pycsw3DCatalogRecordUIAspects } from './translations/record-3d-fields.translation';
import { pycswLayerCatalogRecordUIAspects } from './translations/record-raster-fields.translation';

export const pycswCatalogRecordUIAspects = {
  PycswLayerCatalogRecord: pycswLayerCatalogRecordUIAspects,
  Pycsw3DCatalogRecord: pycsw3DCatalogRecordUIAspects,
} as Record<string, any>;
