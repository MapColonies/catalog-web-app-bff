import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { CatalogRecordType, fieldTypes, Services } from '../constants';
import { IConfig } from '../interfaces';
import { CatalogRecordItems } from '../../utils';
import { ExplorerGetById, ExplorerGetByPathSuffix, ExplorerResolveMetadataAsModel } from '../../graphql/inputTypes';
import { File } from '../../graphql/storage-explorer';
import { CSW } from '../../csw/csw';
import { LayerMetadataMixedUnion } from '../../graphql/resolvers/csw.resolver';
import { IStorageExplorerManagerService } from './storage-explorer.interface';
import { StorageExplorerManagerRaster } from './storage-explorer-manager-raster';
import { StorageExplorerManager3D } from './storage-explorer-manager-3d';

type ExplorerServices = Record<CatalogRecordItems, IStorageExplorerManagerService>;

@singleton()
export class StorageExplorerManager implements IStorageExplorerManagerService {
  private readonly explorerServices: ExplorerServices = {} as ExplorerServices;

  public constructor(
    @inject(Services.CONFIG) private readonly config: IConfig,
    @inject(Services.LOGGER) private readonly logger: Logger,
    @inject(CSW) private readonly csw: CSW
  ) {
    this.explorerServices.RASTER = new StorageExplorerManagerRaster(this.config, this.logger);
    this.explorerServices['3D'] = new StorageExplorerManager3D(this.config, this.logger);
  }

  public async getDirectory(data: ExplorerGetByPathSuffix): Promise<File[]> {
    this.logger.info(`[StorageExplorerManager][getDirectory] start getting directory for type ${data.type}.`);

    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const directoryContent = await storageExplorerManagerInstance.getDirectory(data);

    return directoryContent;
  }

  public async getDirectoryById(data: ExplorerGetById): Promise<File[]> {
    this.logger.info(`[StorageExplorerManager][getDirectoryById] start getting directory by id for type ${data.type}.`);

    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const directoryContent = await storageExplorerManagerInstance.getDirectoryById(data);

    return directoryContent;
  }

  public async getFile(data: ExplorerGetByPathSuffix): Promise<typeof LayerMetadataMixedUnion> {
    this.logger.info(`[StorageExplorerManager][getFile] start getting file for type ${data.type}.`);

    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const fileContent = await storageExplorerManagerInstance.getFile(data);

    const transformedMetadata = this.transformMetadataJsonToEntity(fileContent);

    return transformedMetadata;
  }

  public async resolveMetadataAsModel(data: ExplorerResolveMetadataAsModel): Promise<typeof LayerMetadataMixedUnion> {
    this.logger.info(`[StorageExplorerManager][resolveMetadataAsModel] resolving metadata for type ${data.type}.`);

    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const fileContent = await storageExplorerManagerInstance.resolveMetadataAsModel(data);

    const transformedMetadata = this.transformMetadataJsonToEntity(fileContent);

    return transformedMetadata;
  }

  public async getFileById(data: ExplorerGetById): Promise<typeof LayerMetadataMixedUnion> {
    this.logger.info(`[StorageExplorerManager][getFileById] start getting file by id for type ${data.type}.`);

    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const fileContent = await storageExplorerManagerInstance.getFileById(data);

    return fileContent;
  }

  public async getDecryptedId(data: ExplorerGetById): Promise<{ data: string }> {
    this.logger.info(`[StorageExplorerManager][getFileById] start decrypting id for type ${data.type}.`);

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

  private transformMetadataJsonToEntity(metadata: CatalogRecordType): CatalogRecordType {
    const { isDate } = fieldTypes;

    const metadataWithFakeId: Record<string, unknown> = { ...metadata, id: 'UNDEFINED' };
    const SHOULD_SPECIAL_TREAT_FIELD = true;

    for (const [fieldName, val] of Object.entries(metadata)) {
      switch (SHOULD_SPECIAL_TREAT_FIELD) {
        case isDate(fieldName):
          metadataWithFakeId[fieldName] = new Date(val as string);
          break;
      }
    }

    return metadataWithFakeId as unknown as CatalogRecordType;
  }
}
