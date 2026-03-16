import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { Readable } from 'stream';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { CSW } from '../../csw/csw';
import { Domain } from '../../graphql/domain';
import { ExplorerGetByFolderPath, ExplorerGetById, ExplorerGetByPath, ExplorerResolveMetadataAsModel } from '../../graphql/inputTypes';
import { LayerMetadataMixedUnion } from '../../graphql/resolvers/csw.resolver';
import { File } from '../../graphql/storage-explorer';
import { CatalogRecordType, fieldTypes, Services } from '../constants';
import { IConfig, IContext } from '../interfaces';
import { StorageExplorerManager3D } from './storage-explorer-manager-3d';
import { StorageExplorerManagerRaster } from './storage-explorer-manager-raster';
import { IStorageExplorerManagerService } from './storage-explorer.interface';

type ExplorerServices = Record<Domain, IStorageExplorerManagerService>;

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

  public async getDirectory(data: ExplorerGetByPath, ctx: IContext): Promise<File[]> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const directoryContent = await storageExplorerManagerInstance.getDirectory(data, ctx);
    return directoryContent;
  }

  public async getDirectoryById(data: ExplorerGetById, ctx: IContext): Promise<File[]> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const directoryContent = await storageExplorerManagerInstance.getDirectoryById(data, ctx);
    return directoryContent;
  }

  public async getFile(data: ExplorerGetByPath, ctx: IContext): Promise<typeof LayerMetadataMixedUnion> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const fileContent = await storageExplorerManagerInstance.getFile(data, ctx);
    const transformedMetadata = this.transformMetadataJsonToEntity(fileContent);
    return transformedMetadata;
  }

  public async getZipShapefile(data: ExplorerGetByFolderPath, ctx: IContext): Promise<AxiosResponse<Readable>> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    return storageExplorerManagerInstance.getZipShapefile(data, ctx);
  }

  public async getStreamFile(data: ExplorerGetByPath, ctx: IContext): Promise<AxiosResponse<Readable>> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    return storageExplorerManagerInstance.getStreamFile(data, ctx);
  }

  public async writeStreamFile(data: ExplorerGetByPath, req: Request, ctx: IContext): Promise<AxiosResponse> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    return storageExplorerManagerInstance.writeStreamFile(data, req, ctx);
  }

  public async resolveMetadataAsModel(data: ExplorerResolveMetadataAsModel, ctx: IContext): Promise<typeof LayerMetadataMixedUnion> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const fileContent = await storageExplorerManagerInstance.resolveMetadataAsModel(data, ctx);
    const transformedMetadata = this.transformMetadataJsonToEntity(fileContent);
    return transformedMetadata;
  }

  public async getFileById(data: ExplorerGetById, ctx: IContext): Promise<typeof LayerMetadataMixedUnion> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const fileContent = await storageExplorerManagerInstance.getFileById(data, ctx);
    return fileContent;
  }

  public async getDecryptedId(data: ExplorerGetById, ctx: IContext): Promise<{ data: string }> {
    const storageExplorerManagerInstance = this.getManagerInstance(data.type);
    const decryptedId = await storageExplorerManagerInstance.getDecryptedId(data, ctx);
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
