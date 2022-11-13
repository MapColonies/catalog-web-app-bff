import { Logger } from '@map-colonies/js-logger';
import { File } from '../../graphql/storage-explorer';
import { ExplorerGetByPathSuffix, ExplorerGetById, ExplorerResolveMetadataAsModel } from '../../graphql/inputTypes';
import { requestHandler } from '../../utils';
import { IConfig, IContext } from '../interfaces';
import { Layer3DRecord } from '../../AUTOGENERATED/GraphQLClass';
// import searchMockData from '../../graphql/MOCKS/storage-explorer/mock_utils';
// import MOCK_3D_DATA, { MOCK_FILE } from '../../graphql/MOCKS/storage-explorer/3D/MOCK_DATA';
import { IStorageExplorerManagerService } from './storage-explorer.interface';

export class StorageExplorerManager3D implements IStorageExplorerManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('storageExplorerServices.3d.url');
  }

  public async getDirectory(data: ExplorerGetByPathSuffix, ctx: IContext): Promise<File[]> {
    this.logger.info(`[StorageExplorerManager3D][getDirectory] fetching directory with data: ${JSON.stringify(data)}.`);

    // REAL LOGIC
    const res = await requestHandler(`${this.serviceURL}/directory?pathSuffix=${data.pathSuffix}`, 'GET', {}, ctx)
      .then((res) => res.data as File[])
      .then((files) => {
        return Object.values(files.map((file) => ({ ...file, selectable: !file.isDir && file.name !== 'metadata.json' })));
      });

    return res;

    // MOCK DATA
    // return Promise.resolve(searchMockData(data.pathSuffix, MOCK_3D_DATA)).then((data) => {
    //   return data.map((file) => ({ ...file, selectable: !file.isDir && file.name !== 'metadata.json' }));
    // });
  }

  public async getDirectoryById(data: ExplorerGetById, ctx: IContext): Promise<File[]> {
    this.logger.info(`[StorageExplorerManager3D][getDirectoryById] fetching directory by id with data: ${JSON.stringify(data)}.`);

    const res = await requestHandler(`${this.serviceURL}/directorybyid?id=${data.id}`, 'GET', {}, ctx)
      .then((res) => res.data as File[])
      .then((files) => {
        return Object.values(files);
      });

    return res;
  }

  public async getFile(data: ExplorerGetByPathSuffix, ctx: IContext): Promise<Layer3DRecord> {
    this.logger.info(`[StorageExplorerManager3D][getFile] fetching file with data: ${JSON.stringify(data)}.`);

    // REAL LOGIC
    const res = await requestHandler(`${this.serviceURL}/file?pathSuffix=${data.pathSuffix}`, 'GET', {}, ctx).then(
      (res) => res.data as Layer3DRecord
    );

    return res;

    // MOCK DATA
    // return Promise.resolve(MOCK_FILE);
  }

  public async resolveMetadataAsModel({ metadata }: ExplorerResolveMetadataAsModel, ctx: IContext): Promise<Layer3DRecord> {
    this.logger.info(`[StorageExplorerManager3D][resolveMetadataAsModel] resolve file metadata: ${JSON.stringify(metadata)}.`);

    const res = await Promise.resolve(JSON.parse(metadata) as Layer3DRecord);

    return res;
  }

  public async getFileById(data: ExplorerGetById, ctx: IContext): Promise<Layer3DRecord> {
    this.logger.info(`[StorageExplorerManager3D][getFileById] fetching file by id with data: ${JSON.stringify(data)}.`);

    const res = await requestHandler(`${this.serviceURL}/filebyid?id=${data.id}`, 'GET', {}, ctx).then((res) => res.data as Layer3DRecord);

    return res;
  }

  public async getDecryptedId(data: ExplorerGetById, ctx: IContext): Promise<{ data: string }> {
    this.logger.info(`[StorageExplorerManager3D][getDecryptedId] decrypting id with data: ${JSON.stringify(data)}.`);

    const res = await requestHandler(`${this.serviceURL}/decryptid?id=${data.id}`, 'GET', {}, ctx).then((res) => res.data as { data: string });

    return res;
  }
}
