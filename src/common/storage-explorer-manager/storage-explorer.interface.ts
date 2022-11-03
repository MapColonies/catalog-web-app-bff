import { ExplorerGetById, ExplorerGetByPathSuffix, ExplorerResolveMetadataAsModel } from '../../graphql/inputTypes';
import { LayerMetadataMixedUnion } from '../../graphql/resolvers/csw.resolver';
import { File } from '../../graphql/storage-explorer';
import { IContext } from '../interfaces';

export interface IStorageExplorerManagerService {
  getDirectory: (data: ExplorerGetByPathSuffix, ctx: IContext) => Promise<File[]>;
  getDirectoryById: (data: ExplorerGetById, ctx: IContext) => Promise<File[]>;
  getFile: (data: ExplorerGetByPathSuffix, ctx: IContext) => Promise<typeof LayerMetadataMixedUnion>;
  resolveMetadataAsModel: (data: ExplorerResolveMetadataAsModel, ctx: IContext) => Promise<typeof LayerMetadataMixedUnion>;
  getFileById: (data: ExplorerGetById, ctx: IContext) => Promise<typeof LayerMetadataMixedUnion>;
  getDecryptedId: (data: ExplorerGetById, ctx: IContext) => Promise<{ data: string }>;
}
