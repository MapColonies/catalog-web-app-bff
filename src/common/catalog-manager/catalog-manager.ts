import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { Services } from '../constants';
import { IConfig, IContext } from '../interfaces';
import { Domain } from '../../graphql/domain';
import { RecordDeletePartial, RecordUpdatePartial } from '../../graphql/inputTypes';
import { ICatalogManagerService } from './catalog-manager.interface';
import { CatalogManagerRaster } from './catalog-manager-raster';
import { CatalogManager3D } from './catalog-manager-3d';
import { CatalogManagerDem } from './catalog-manager-dem';

type CatalogServices = Record<Domain, ICatalogManagerService>;

@singleton()
export class CatalogManager implements ICatalogManagerService {
  private readonly catalogServices: CatalogServices = {} as CatalogServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.catalogServices.RASTER = new CatalogManagerRaster(this.config, this.logger);
    this.catalogServices['3D'] = new CatalogManager3D(this.config, this.logger);
    this.catalogServices.DEM = new CatalogManagerDem(this.config, this.logger);
  }

  public async updateStatus(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    this.logger.info(`[CatalogManager][updateStatus] starting status update for entity ${record.type}.`);

    const catalogManagerInstance = this.getManagerInstance(record.type);
    const updatedData = await catalogManagerInstance.updateStatus(record, ctx);
    return updatedData;
  }

  public async updateMetadata(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    this.logger.info(`[CatalogManager][updateMetadata] starting metadata update for entity ${record.type}.`);

    const catalogManagerInstance = this.getManagerInstance(record.type);
    const updatedData = await catalogManagerInstance.updateMetadata(record, ctx);
    return updatedData;
  }

  public async deleteLayer(record: RecordDeletePartial, ctx: IContext): Promise<RecordDeletePartial> {
    this.logger.info(`[CatalogManager][deleteLayer] starting deleting layer for entity ${record.type}.`);

    const catalogManagerInstance = this.getManagerInstance(record.type);
    const deletedLayer = await catalogManagerInstance.deleteLayer(record, ctx);
    return deletedLayer;
  }

  private getManagerInstance(recordType: RecordType): ICatalogManagerService {
    let catalogManagerInstance: ICatalogManagerService;

    switch (RecordType[recordType]) {
      case RecordType.RECORD_DEM:
        catalogManagerInstance = this.catalogServices.DEM;
        break;
      case RecordType.RECORD_3D:
        catalogManagerInstance = this.catalogServices['3D'];
        break;
      default:
        catalogManagerInstance = this.catalogServices.RASTER;
        break;
    }

    return catalogManagerInstance;
  }
}
