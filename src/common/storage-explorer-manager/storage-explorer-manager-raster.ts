import { Logger } from '@map-colonies/js-logger';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import {
  ExplorerGetDirectory,
  ExplorerGetDecryptedId,
  ExplorerGetDirectoryById,
  ExplorerGetFile,
  ExplorerGetFileById,
} from '../../graphql/inputTypes';
import { IFile, IFileMap, IStorageExplorerManagerService } from './storage-explorer.interface';

export class StorageExplorerManagerRaster implements IStorageExplorerManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('storageExplorerServices.raster.url');
  }

  public async getDirectory(data: ExplorerGetDirectory): Promise<IFile[]> {
    const res = await requestHandler(`${this.serviceURL}/directory?pathSuffix=${data.pathSuffix}`, 'GET', {})
      .then((res) => (res.data as IFileMap<IFile>).data)
      .then((files) => {
        return Object.values(files) as IFile[];
      });

    return res;
  }

  public async getDirectoryById(data: ExplorerGetDirectoryById): Promise<IFile[]> {
    const res = await requestHandler(`${this.serviceURL}/directorybyid?id=${data.id}`, 'GET', {})
      .then((res) => (res.data as IFileMap<IFile>).data)
      .then((files) => {
        return Object.values(files) as IFile[];
      });

    return res;
  }

  public async getFile(data: ExplorerGetFile): Promise<{ data: Record<any, any> }> {
    const res = await requestHandler(`${this.serviceURL}/file?pathSuffix=${data.pathSuffix}`, 'GET', {}).then(
      (res) => res.data as { data: Record<any, any> }
    );

    return { data: res };
  }

  public async getFileById(data: ExplorerGetFileById): Promise<{ data: Record<any, any> }> {
    const res = await requestHandler(`${this.serviceURL}/filebyid?id=${data.id}`, 'GET', {}).then((res) => res.data as { data: Record<any, any> });

    return { data: res };
  }

  public async getDecryptedId(data: ExplorerGetDecryptedId): Promise<{ data: string }> {
    const res = await requestHandler(`${this.serviceURL}/decryptid?id=${data.id}`, 'GET', {}).then((res) => res.data as { data: string });

    return res;
  }
}
