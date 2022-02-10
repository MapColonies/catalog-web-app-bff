import { ExplorerGetById, ExplorerGetByPathSuffix } from '../../graphql/inputTypes';
import { LayerMetadataMixedUnion } from '../../graphql/resolvers/csw.resolver';
import { File } from '../../graphql/storage-explorer';

export interface IStorageExplorerManagerService {
  getDirectory: (data: ExplorerGetByPathSuffix) => Promise<File[]>;
  getDirectoryById: (data: ExplorerGetById) => Promise<File[]>;
  getFile: (data: ExplorerGetByPathSuffix) => Promise<typeof LayerMetadataMixedUnion>;
  getFileById: (data: ExplorerGetById) => Promise<typeof LayerMetadataMixedUnion>;
  getDecryptedId: (data: ExplorerGetById) => Promise<{ data: string }>;
}
