import { ExplorerGetById, ExplorerGetByPathSuffix } from '../../graphql/inputTypes';

export interface IStorageExplorerManagerService {
  getDirectory: (data: ExplorerGetByPathSuffix) => Promise<IFile[]>;
  getDirectoryById: (data: ExplorerGetById) => Promise<IFile[]>;
  getFile: (data: ExplorerGetByPathSuffix) => Promise<{ data: Record<string, unknown> }>;
  getFileById: (data: ExplorerGetById) => Promise<{ data: Record<string, unknown> }>;
  getDecryptedId: (data: ExplorerGetById) => Promise<{ data: string }>;
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
