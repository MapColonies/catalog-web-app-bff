import { Logger } from '@map-colonies/js-logger';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import RASTER_MOCK_DATA, { MOCK_FILE } from '../../graphql/MOCKS/storage-explorer/RASTER/MOCK_DATA';
import { ExplorerGetById, ExplorerGetByPathSuffix } from '../../graphql/inputTypes';
import { IFile, IFileMap, IStorageExplorerManagerService } from './storage-explorer.interface';

export class StorageExplorerManagerRaster implements IStorageExplorerManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('storageExplorerServices.raster.url');
  }

  public async getDirectory(data: ExplorerGetByPathSuffix): Promise<IFile[]> {
    // REAL LOGIC
    // const res = await requestHandler(`${this.serviceURL}/directory?pathSuffix=${data.pathSuffix}`, 'GET', {})
    //   .then((res) => (res.data as IFileMap<IFile>).data)
    //   .then((files) => {
    //     return Object.values(files) as IFile[];
    //   });

    // return res;

    // MOCK DATA
    return Promise.resolve(Object.values(RASTER_MOCK_DATA) as IFile[]);
  }

  public async getDirectoryById(data: ExplorerGetById): Promise<IFile[]> {
    const res = await requestHandler(`${this.serviceURL}/directorybyid?id=${data.id}`, 'GET', {})
      .then((res) => (res.data as IFileMap<IFile>).data)
      .then((files) => {
        return Object.values(files) as IFile[];
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

    return { data: res };
  }

  public async getDecryptedId(data: ExplorerGetById): Promise<{ data: string }> {
    const res = await requestHandler(`${this.serviceURL}/decryptid?id=${data.id}`, 'GET', {}).then((res) => res.data as { data: string });

    return res;
  }
}
