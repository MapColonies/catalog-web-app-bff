/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg } from 'type-graphql';
import { Services } from '../../common/constants';
import { StorageExplorerManager } from '../../common/storage-explorer-manager/storage-explorer-manager';
import { ExplorerGetDecryptedId, ExplorerGetDirectory, ExplorerGetDirectoryById, ExplorerGetFile, ExplorerGetFileById } from '../inputTypes';
import { DecryptedId, File, FileJsonResponse } from '../storage-explorer';

@Resolver()
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
  public async getDirectory(@Arg('data') data: ExplorerGetDirectory): Promise<File[]> {
    const { pathSuffix, type } = data;
    const dirContent = await this.storageExplorerManager.getDirectory({ pathSuffix, type });

    return dirContent;
  }

  @Query((type) => [File])
  public async getDirectoryById(@Arg('data') data: ExplorerGetDirectoryById): Promise<File[]> {
    const { id, type } = data;
    const dirContent = await this.storageExplorerManager.getDirectoryById({ id, type });

    return dirContent;
  }

  @Query((type) => FileJsonResponse)
  public async getFile(@Arg('data') data: ExplorerGetFile): Promise<FileJsonResponse> {
    const { pathSuffix, type } = data;
    const fileContent = await this.storageExplorerManager.getFile({ pathSuffix, type });

    return fileContent;
  }
  @Query((type) => FileJsonResponse)
  public async getFileById(@Arg('data') data: ExplorerGetFileById): Promise<FileJsonResponse> {
    const { id, type } = data;
    const fileContent = await this.storageExplorerManager.getFileById({ id, type });

    return fileContent;
  }

  @Query((type) => DecryptedId)
  public async getDecryptedId(@Arg('data') data: ExplorerGetDecryptedId): Promise<DecryptedId> {
    const { id, type } = data;
    const decryptedId = await this.storageExplorerManager.getDecryptedId({ id, type });

    return decryptedId;
  }
}
