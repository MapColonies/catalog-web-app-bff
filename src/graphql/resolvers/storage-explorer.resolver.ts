/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg, FieldResolver, Root, Ctx } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { StorageExplorerManager } from '../../common/storage-explorer-manager/storage-explorer-manager';
import { extractErrorMessage } from '../../utils';
import { ExplorerGetById, ExplorerGetByPath, ExplorerResolveMetadataAsModel } from '../inputTypes';
import { DecryptedId, File } from '../storage-explorer';
import { LayerMetadataMixedUnion } from './csw.resolver';

@Resolver((of) => File)
export class StorageExplorerResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly storageExplorerManager: StorageExplorerManager;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.storageExplorerManager = container.resolve(StorageExplorerManager);
  }

  @Query((type) => [File])
  public async getDirectory(
    @Arg('data')
    data: ExplorerGetByPath,
    @Ctx()
    ctx: IContext
  ): Promise<File[]> {
    try {
      const { path, type, rasterIngestionFilesTypeConfig } = data;
      const dirContent = await this.storageExplorerManager.getDirectory({ path, type, rasterIngestionFilesTypeConfig }, ctx);
      return dirContent;
    } catch (err) {
      this.logger.error(`[StorageExplorer][getDirectory][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query((type) => [File])
  public async getDirectoryById(
    @Arg('data')
    data: ExplorerGetById,
    @Ctx()
    ctx: IContext
  ): Promise<File[]> {
    try {
      const { id, type } = data;
      const dirContent = await this.storageExplorerManager.getDirectoryById({ id, type }, ctx);
      return dirContent;
    } catch (err) {
      this.logger.error(`[StorageExplorer][getDirectoryById][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query((type) => LayerMetadataMixedUnion)
  public async getFile(
    @Arg('data')
    data: ExplorerGetByPath,
    @Ctx()
    ctx: IContext
  ): Promise<typeof LayerMetadataMixedUnion> {
    try {
      const { path, type } = data;
      const fileContent = await this.storageExplorerManager.getFile({ path, type }, ctx);
      return fileContent;
    } catch (err) {
      this.logger.error(`[StorageExplorer][getFile][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query((type) => LayerMetadataMixedUnion)
  public async resolveMetadataAsModel(
    @Arg('data')
    data: ExplorerResolveMetadataAsModel,
    @Ctx()
    ctx: IContext
  ): Promise<typeof LayerMetadataMixedUnion> {
    try {
      const fileContent = await this.storageExplorerManager.resolveMetadataAsModel(data, ctx);
      return fileContent;
    } catch (err) {
      this.logger.error(`[StorageExplorer][resolveMetadataAsModel][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query((type) => LayerMetadataMixedUnion)
  public async getFileById(
    @Arg('data')
    data: ExplorerGetById,
    @Ctx()
    ctx: IContext
  ): Promise<typeof LayerMetadataMixedUnion> {
    try {
      const { id, type } = data;
      const fileContent = await this.storageExplorerManager.getFileById({ id, type }, ctx);
      return fileContent;
    } catch (err) {
      this.logger.error(`[StorageExplorer][getFileById][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query((type) => DecryptedId)
  public async getDecryptedId(
    @Arg('data')
    data: ExplorerGetById,
    @Ctx()
    ctx: IContext
  ): Promise<DecryptedId> {
    try {
      const { id, type } = data;
      const decryptedId = await this.storageExplorerManager.getDecryptedId({ id, type }, ctx);
      return decryptedId;
    } catch (err) {
      this.logger.error(`[StorageExplorer][getDecryptedId][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @FieldResolver()
  public modDate(@Root() file: File): Date | null {
    if (file.modDate instanceof Date) {
      return file.modDate;
    }
    if (typeof file.modDate === 'string') {
      return new Date(file.modDate);
    }
    return null;
  }
}
