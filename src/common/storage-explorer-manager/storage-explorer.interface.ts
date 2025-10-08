import { Readable } from 'stream';
import { Request } from 'express';
import { AxiosResponse } from 'axios';
import { File } from '../../graphql/storage-explorer';
import { ExplorerGetByFolderPath, ExplorerGetById, ExplorerGetByPath, ExplorerResolveMetadataAsModel } from '../../graphql/inputTypes';
import { LayerMetadataMixedUnion } from '../../graphql/resolvers/csw.resolver';
import { IContext } from '../interfaces';

export interface IStorageExplorerManagerService {
  getDirectory: (data: ExplorerGetByPath, ctx: IContext) => Promise<File[]>;
  getDirectoryById: (data: ExplorerGetById, ctx: IContext) => Promise<File[]>;
  getFile: (data: ExplorerGetByPath, ctx: IContext) => Promise<typeof LayerMetadataMixedUnion>;
  getStreamFile: (data: ExplorerGetByPath, ctx: IContext) => Promise<AxiosResponse<Readable>>;
  getZipShapefile: (data: ExplorerGetByFolderPath, ctx: IContext) => Promise<AxiosResponse<Readable>>;
  writeStreamFile: (data: ExplorerGetByPath, req: Request, ctx: IContext) => Promise<AxiosResponse>;
  resolveMetadataAsModel: (data: ExplorerResolveMetadataAsModel, ctx: IContext) => Promise<typeof LayerMetadataMixedUnion>;
  getFileById: (data: ExplorerGetById, ctx: IContext) => Promise<typeof LayerMetadataMixedUnion>;
  getDecryptedId: (data: ExplorerGetById, ctx: IContext) => Promise<{ data: string }>;
}
