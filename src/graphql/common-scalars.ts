import { GraphQLScalarType } from 'graphql';

export const geoJsonObject = new GraphQLScalarType({ name: 'geoJsonObject' });
export const geojsonFeatureProperties = new GraphQLScalarType({ name: 'geojsonFeatureProperties' });
