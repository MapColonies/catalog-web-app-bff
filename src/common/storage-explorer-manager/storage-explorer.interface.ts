import { ExplorerGetById, ExplorerGetByPathSuffix } from '../../graphql/inputTypes';
import { File } from '../../graphql/storage-explorer';

export interface IStorageExplorerManagerService {
  getDirectory: (data: ExplorerGetByPathSuffix) => Promise<File[]>;
  getDirectoryById: (data: ExplorerGetById) => Promise<File[]>;
  getFile: (data: ExplorerGetByPathSuffix) => Promise<{ data: Record<string, unknown> }>;
  getFileById: (data: ExplorerGetById) => Promise<{ data: Record<string, unknown> }>;
  getDecryptedId: (data: ExplorerGetById) => Promise<{ data: string }>;
}
