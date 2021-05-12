import { FilterField, SortField } from '@map-colonies/csw-client';

export interface GetRecordsOptions {
  filter?: FilterField[];
  sort?: SortField[];
}

export const GETRECORDS_START_INDEX = 1;
export const GETRECORDS_END_INDEX = 5;

export enum CatalogRecordItems {
  RASTER = 'RASTER',
  '3D' = '3D',
}
