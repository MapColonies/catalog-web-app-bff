import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { Services } from '../constants';
import { IConfig } from '../interfaces';
import { LayerMetadataUnionType } from '../../graphql/resolvers/csw.resolver';
import { CatalogRecordItems } from '../../utils';
import { ICatalogManagerService } from './catalog-manager.interface';
import { CatalogManagerRaster } from './catalog-manager-raster';
import { CatalogManager3D } from './catalog-manager-3d';

type CatalogServices = Record<CatalogRecordItems, ICatalogManagerService>;

@singleton()
export class CatalogManager implements ICatalogManagerService {
  private readonly catalogServices: CatalogServices = {} as CatalogServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.catalogServices.RASTER = new CatalogManagerRaster(this.config, this.logger);
    this.catalogServices['3D'] = new CatalogManager3D(this.config, this.logger);
  }

  public async updateMetadata(record: LayerMetadataUnionType): Promise<LayerMetadataUnionType> {
    let catalogManagerInstance: ICatalogManagerService;

    const fetchRecordType = record.type as RecordType;
    switch (RecordType[fetchRecordType]) {
      case RecordType.RECORD_3D:
        catalogManagerInstance = this.catalogServices['3D'];
        break;
      default:
        catalogManagerInstance = this.catalogServices.RASTER;
        break;
    }

    const updatedData = await catalogManagerInstance.updateMetadata(record);
    return updatedData;
  }
}
