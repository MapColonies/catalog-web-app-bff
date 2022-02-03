import { IFile, IFileMap } from '@map-colonies/storage-explorer-middleware';
import {
  ExplorerGetDecryptedId,
  ExplorerGetDirectory,
  ExplorerGetDirectoryById,
  ExplorerGetFile,
  ExplorerGetFileById,
} from '../../graphql/inputTypes';

export interface IStorageExplorerManagerService {
  getDirectory: (data: ExplorerGetDirectory) => Promise<{ data: IFileMap<IFile> }>;
  getDirectoryById: (data: ExplorerGetDirectoryById) => Promise<{ data: IFileMap<IFile> }>;
  getFile: (data: ExplorerGetFile) => Promise<Record<string, string>>;
  getFileById: (data: ExplorerGetFileById) => Promise<Record<string, string>>;
  getDecryptedId: (data: ExplorerGetDecryptedId) => Promise<{ data: string }>;
}
