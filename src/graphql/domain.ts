import { registerEnumType } from 'type-graphql';

export enum Domain {
  RASTER = 'RASTER',
  '3D' = '3D',
  DEM = 'DEM',
  VECTOR = 'VECTOR',
}

registerEnumType(Domain, { name: 'Domain' });
