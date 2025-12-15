import { registerEnumType } from 'type-graphql';

// This enum also declared in the APP, the reason for this
// dupplication is that we want to maintain this code as internal code for APP and for BFF

// eslint-disable-next-line import/exports-last
export enum Domain {
  RASTER = 'RASTER',
  '3D' = '3D',
  DEM = 'DEM',
  VECTOR = 'VECTOR',
}

registerEnumType(Domain, { name: 'Domain' });
