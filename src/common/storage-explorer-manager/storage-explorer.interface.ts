import { ExplorerGetById, ExplorerGetByPath, ExplorerResolveMetadataAsModel } from '../../graphql/inputTypes';
import { LayerMetadataMixedUnion } from '../../graphql/resolvers/csw.resolver';
import { File } from '../../graphql/storage-explorer';
import { IContext } from '../interfaces';
import { Stream } from 'stream';

export interface IStorageExplorerManagerService {
  getDirectory: (data: ExplorerGetByPath, ctx: IContext) => Promise<File[]>;
  getDirectoryById: (data: ExplorerGetById, ctx: IContext) => Promise<File[]>;
  getFile: (data: ExplorerGetByPath, ctx: IContext) => Promise<typeof LayerMetadataMixedUnion>;
  getStreamFile: (data: ExplorerGetByPath, ctx: IContext) => Promise<Stream>;
  writeStreamFile: (data: ExplorerGetByPath, file: Express.Multer.File, ctx: IContext) => Promise<Stream>;
  resolveMetadataAsModel: (data: ExplorerResolveMetadataAsModel, ctx: IContext) => Promise<typeof LayerMetadataMixedUnion>;
  getFileById: (data: ExplorerGetById, ctx: IContext) => Promise<typeof LayerMetadataMixedUnion>;
  getDecryptedId: (data: ExplorerGetById, ctx: IContext) => Promise<{ data: string }>;
}
