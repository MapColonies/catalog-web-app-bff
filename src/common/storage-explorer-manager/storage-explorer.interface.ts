import {
  ExplorerGetDecryptedId,
  ExplorerGetDirectory,
  ExplorerGetDirectoryById,
  ExplorerGetFile,
  ExplorerGetFileById,
} from '../../graphql/inputTypes';

export interface IStorageExplorerManagerService {
  getDirectory: (data: ExplorerGetDirectory) => Promise<IFile[]>;
  getDirectoryById: (data: ExplorerGetDirectoryById) => Promise<IFile[]>;
  getFile: (data: ExplorerGetFile) => Promise<{ data: Record<any, any> }>;
  getFileById: (data: ExplorerGetFileById) => Promise<{ data: Record<any, any> }>;
  getDecryptedId: (data: ExplorerGetDecryptedId) => Promise<{ data: string }>;
}

export interface IFile {
  id: string;
  name: string;
  parentId: string;
  ext?: string;
  isDir?: boolean;
  isHidden?: boolean;
  size?: number;
  modDate?: Date | string;
  childrenCount?: number;
}

export interface IFileMap<FT extends IFile> {
  [fieldId: string]: FT;
}
