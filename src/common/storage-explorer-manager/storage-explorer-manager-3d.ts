import { Logger } from '@map-colonies/js-logger';
import MOCK_3D_DATA, { MOCK_FILE } from '../../graphql/MOCKS/storage-explorer/3D/MOCK_DATA';
import { File } from '../../graphql/storage-explorer';
import { ExplorerGetByPathSuffix, ExplorerGetById } from '../../graphql/inputTypes';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import { IStorageExplorerManagerService } from './storage-explorer.interface';

export class StorageExplorerManager3D implements IStorageExplorerManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('storageExplorerServices.3d.url');
  }

  public async getDirectory(data: ExplorerGetByPathSuffix): Promise<File[]> {
    // REAL LOGIC
    // const res = await requestHandler(`${this.serviceURL}/directory?pathSuffix=${data.pathSuffix}`, 'GET', {})
    //   .then((res) => res.data as File[])
    //   .then((files) => {
    //     return Object.values(files);
    //   });

    // return res;

    // MOCK DATA
    return Promise.resolve(Object.values(MOCK_3D_DATA));
  }

  public async getDirectoryById(data: ExplorerGetById): Promise<File[]> {
    const res = await requestHandler(`${this.serviceURL}/directorybyid?id=${data.id}`, 'GET', {})
      .then((res) => res.data as File[])
      .then((files) => {
        return Object.values(files);
      });

    return res;
  }

  public async getFile(data: ExplorerGetByPathSuffix): Promise<{ data: Record<string, unknown> }> {
    // REAL LOGIC
    // const res = await requestHandler(`${this.serviceURL}/file?pathSuffix=${data.pathSuffix}`, 'GET', {}).then(
    //   (res) => res.data as { data: Record<string, unknown> }
    // );

    // return { data: res };

    // MOCK DATA
    return Promise.resolve({ data: MOCK_FILE });
  }

  public async getFileById(data: ExplorerGetById): Promise<{ data: Record<string, unknown> }> {
    const res = await requestHandler(`${this.serviceURL}/filebyid?id=${data.id}`, 'GET', {}).then(
      (res) => res.data as { data: Record<string, unknown> }
    );

    return res;
  }

  public async getDecryptedId(data: ExplorerGetById): Promise<{ data: string }> {
    const res = await requestHandler(`${this.serviceURL}/decryptid?id=${data.id}`, 'GET', {}).then((res) => res.data as { data: string });

    return res;
  }
}
