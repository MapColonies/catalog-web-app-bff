import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { Services } from '../constants';
import { IConfig } from '../interfaces';
import { IngestionData } from '../../graphql/inputTypes';
import { CatalogRecordItems } from '../../utils';
import { IIngestionManagerService } from './ingestion-manager.interface';
import { IngestionManagerRaster } from './ingestion-manager-raster';
import { IngestionManager3D } from './ingestion-manager-3d';

type IngestionServices = Record<CatalogRecordItems, IIngestionManagerService>;

@singleton()
export class IngestionManager implements IIngestionManagerService {
  private readonly ingestionServices: IngestionServices = {} as IngestionServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.ingestionServices.RASTER = new IngestionManagerRaster(this.config, this.logger);
    this.ingestionServices['3D'] = new IngestionManager3D(this.config, this.logger);
  }

  public async ingest(record: IngestionData): Promise<IngestionData> {
    const catalogManagerInstance = this.getManagerInstance(record.type as RecordType);
    const updatedData = await catalogManagerInstance.ingest(record);
    return updatedData;
  }

  private getManagerInstance(recordType: RecordType): IIngestionManagerService {
    let catalogManagerInstance: IIngestionManagerService;

    switch (RecordType[recordType]) {
      case RecordType.RECORD_3D:
        catalogManagerInstance = this.ingestionServices['3D'];
        break;
      default:
        catalogManagerInstance = this.ingestionServices.RASTER;
        break;
    }

    return catalogManagerInstance;
  }
}
