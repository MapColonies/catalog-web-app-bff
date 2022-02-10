import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { Services } from '../constants';
import { IConfig } from '../interfaces';
import { CatalogRecordItems } from '../../utils';
import { ExplorerGetById, ExplorerGetByPathSuffix } from '../../graphql/inputTypes';
import { File } from '../../graphql/storage-explorer';
import { LayerMetadataMixedUnion } from '../../graphql/resolvers/csw.resolver';
import { IStorageExplorerManagerService } from './storage-explorer.interface';
import { StorageExplorerManagerRaster } from './storage-explorer-manager-raster';
import { StorageExplorerManager3D } from './storage-explorer-manager-3d';

type ExplorerServices = Record<CatalogRecordItems, IStorageExplorerManagerService>;

@singleton()
export class StorageExplorerManager implements IStorageExplorerManagerService {
  private readonly explorerServices: ExplorerServices = {} as ExplorerServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.explorerServices.RASTER = new StorageExplorerManagerRaster(this.config, this.logger);
    this.explorerServices['3D'] = new StorageExplorerManager3D(this.config, this.logger);
  }

  public async getDirectory(data: ExplorerGetByPathSuffix): Promise<File[]> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const directoryContent = await storageExplorerManagerInstance.getDirectory(data);

    return directoryContent;
  }

  public async getDirectoryById(data: ExplorerGetById): Promise<File[]> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const directoryContent = await storageExplorerManagerInstance.getDirectoryById(data);

    return directoryContent;
  }

  public async getFile(data: ExplorerGetByPathSuffix): Promise<typeof LayerMetadataMixedUnion> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const fileContent = await storageExplorerManagerInstance.getFile(data);

    return fileContent;
  }

  public async getFileById(data: ExplorerGetById): Promise<typeof LayerMetadataMixedUnion> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const fileContent = await storageExplorerManagerInstance.getFileById(data);

    return fileContent;
  }

  public async getDecryptedId(data: ExplorerGetById): Promise<{ data: string }> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const decryptedId = await storageExplorerManagerInstance.getDecryptedId(data);

    return decryptedId;
  }

  private getManagerInstance(recordType: RecordType): IStorageExplorerManagerService {
    let storageExplorerManagerInstance: IStorageExplorerManagerService;

    switch (RecordType[recordType]) {
      case RecordType.RECORD_3D:
        storageExplorerManagerInstance = this.explorerServices['3D'];
        break;
      default:
        storageExplorerManagerInstance = this.explorerServices.RASTER;
        break;
    }

    return storageExplorerManagerInstance;
  }
}
