/* eslint-disable @typescript-eslint/no-explicit-any */
import { basemapModel } from '@map-colonies/mc-model-types';
import { basemapRecordUIAspects } from './ui-aspects/record-basemap-fields.ui-aspects';

// Parallel to `pycswCatalogRecordUIAspects` (`./pycswRecord.ui-aspect`), for entities that aren't
// PYCSW/catalog records at all (not ingested, not CSW/shapefile-mapped) - basemap today, kept separate
// so the catalog-record registry doesn't carry entities outside that domain.
export const notCatalogRecordUIAspects = {
  [basemapModel.name]: basemapRecordUIAspects,
} as Record<string, any>;
