import { GraphQLScalarType } from 'graphql';

export const servicesAvailability = new GraphQLScalarType({ name: 'servicesAvailability' });

export interface IServicesAvailability {
  [serviceConfigPath: string]: boolean;
}
