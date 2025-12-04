import { registerEnumType } from 'type-graphql';

export enum Domain {
  RASTER = 'RASTER',
  '3D' = '3D',
  DEM = 'DEM',
  VECTOR = 'VECTOR',
  QUANTIZED_MESH_BEST = 'QUANTIZED_MESH_BEST',
}

registerEnumType(Domain, { name: 'Domain' });
