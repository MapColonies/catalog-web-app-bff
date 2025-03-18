/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any */
import { pycsw3DCatalogRecordUIAspects } from './ui-aspects/record-3d-fields.ui-aspects';
import { pycswDemCatalogRecordUIAspects } from './ui-aspects/record-dem-fields.ui-aspects';
import { pycswLayerCatalogRecordUIAspects } from './ui-aspects/record-raster-fields.ui-aspects';
import { vectorCatalogRecordAspects } from './ui-aspects/record-vector-fields.ui-aspects';
import { pycswQuantizedMeshBestCatalogRecordAspects } from './ui-aspects/record-quantized-mesh-best-fields.ui-aspects';
import { polygonPartRecordUIAspects } from './ui-aspects/record-polygon-part-fields.ui-aspects';

export const pycswCatalogRecordUIAspects = {
  PycswLayerCatalogRecord: pycswLayerCatalogRecordUIAspects,
  Pycsw3DCatalogRecord: pycsw3DCatalogRecordUIAspects,
  PycswDemCatalogRecord: pycswDemCatalogRecordUIAspects,
  VectorBestMetadata: vectorCatalogRecordAspects,
  PycswQuantizedMeshBestCatalogRecord: pycswQuantizedMeshBestCatalogRecordAspects,
  PolygonPartRecord: polygonPartRecordUIAspects,
} as Record<string, any>;
