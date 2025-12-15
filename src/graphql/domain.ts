import { registerEnumType } from 'type-graphql';

// eslint-disable-next-line import/exports-last
export enum Domain {
  RASTER = 'RASTER',
  '3D' = '3D',
  DEM = 'DEM',
  VECTOR = 'VECTOR',
}

registerEnumType(Domain, { name: 'Domain' });
