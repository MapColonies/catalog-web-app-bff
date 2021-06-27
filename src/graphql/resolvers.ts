import { NonEmptyArray } from 'type-graphql';
import { LayerMetadataMixedResolver } from './resolvers/csw.resolver';
import { EntityDescriptorResolver } from './resolvers/entity-descriptor.resolver';

// eslint-disable-next-line @typescript-eslint/ban-types
export function getResolvers(): NonEmptyArray<Function> | NonEmptyArray<string> {
  return [LayerMetadataMixedResolver, EntityDescriptorResolver];
}
