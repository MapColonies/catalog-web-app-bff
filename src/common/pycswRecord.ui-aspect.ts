/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Pycsw3DCatalogRecord,
  PycswDemCatalogRecord,
  PycswLayerCatalogRecord,
  PycswQuantizedMeshBestCatalogRecord,
  PolygonPartRecord,
  VectorBestMetadata,
} from '@map-colonies/mc-model-types';
import { pycsw3DCatalogRecordUIAspects } from './ui-aspects/record-3d-fields.ui-aspects';
import { pycswDemCatalogRecordUIAspects } from './ui-aspects/record-dem-fields.ui-aspects';
import { pycswLayerCatalogRecordUIAspects } from './ui-aspects/record-raster-fields.ui-aspects';
import { vectorCatalogRecordAspects } from './ui-aspects/record-vector-fields.ui-aspects';
import { pycswQuantizedMeshBestCatalogRecordAspects } from './ui-aspects/record-quantized-mesh-best-fields.ui-aspects';
import { polygonPartRecordUIAspects } from './ui-aspects/record-polygon-part-fields.ui-aspects';

export const pycswCatalogRecordUIAspects = {
  [PycswLayerCatalogRecord.name]: pycswLayerCatalogRecordUIAspects,
  [Pycsw3DCatalogRecord.name]: pycsw3DCatalogRecordUIAspects,
  [PycswDemCatalogRecord.name]: pycswDemCatalogRecordUIAspects,
  [VectorBestMetadata.name]: vectorCatalogRecordAspects,
  [PycswQuantizedMeshBestCatalogRecord.name]: pycswQuantizedMeshBestCatalogRecordAspects,
  [PolygonPartRecord.name]: polygonPartRecordUIAspects,
} as Record<string, any>;
