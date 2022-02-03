import { NonEmptyArray } from 'type-graphql';
import { LayerMetadataMixedResolver } from './resolvers/csw.resolver';
import { EntityDescriptorResolver } from './resolvers/entity-descriptor.resolver';
import { JobResolver } from './resolvers/job.resolver';
import { StorageExplorerResolver } from './resolvers/storage-explorer.resolver';
import { TaskResolver } from './resolvers/task.resolver';

// eslint-disable-next-line @typescript-eslint/ban-types
export function getResolvers(): NonEmptyArray<Function> | NonEmptyArray<string> {
  return [LayerMetadataMixedResolver, EntityDescriptorResolver, JobResolver, TaskResolver, StorageExplorerResolver];
}
