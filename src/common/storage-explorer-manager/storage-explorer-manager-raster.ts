import { Logger } from '@map-colonies/js-logger';
import { IFile, IFileMap } from '@map-colonies/storage-explorer-middleware';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import {
  ExplorerGetDirectory,
  ExplorerGetDecryptedId,
  ExplorerGetDirectoryById,
  ExplorerGetFile,
  ExplorerGetFileById,
} from '../../graphql/inputTypes';
import { IStorageExplorerManagerService } from './storage-explorer.interface';

export class StorageExplorerManagerRaster implements IStorageExplorerManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('storageExplorerServices.raster.url');
  }

  public async getDirectory(data: ExplorerGetDirectory): Promise<{ data: IFileMap<IFile> }> {
    const res = await requestHandler(`${this.serviceURL}/directory?pathSuffix=${data.pathSuffix}`, 'GET', {});
    return res;
  }

  public async getDirectoryById(data: ExplorerGetDirectoryById): Promise<{ data: IFileMap<IFile> }> {
    const res = await requestHandler(`${this.serviceURL}/directorybyid?id=${data.id}`, 'GET', {});
    return res;
  }

  public async getFile(data: ExplorerGetFile): Promise<Record<string, any>> {
    const res = await requestHandler(`${this.serviceURL}/file?pathSuffix=${data.pathSuffix}`, 'GET', {});
    return res;
  }

  public async getFileById(data: ExplorerGetFileById): Promise<Record<string, any>> {
    const res = await requestHandler(`${this.serviceURL}/filebyid?id=${data.id}`, 'GET', {});
    return res;
  }

  public async getDecryptedId(data: ExplorerGetDecryptedId): Promise<{ data: string }> {
    const res = await requestHandler(`${this.serviceURL}/decryptid?id=${data.id}`, 'GET', {});
    return res;
  }
}
