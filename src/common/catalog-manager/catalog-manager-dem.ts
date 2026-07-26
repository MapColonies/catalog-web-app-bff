import { Logger } from '@map-colonies/js-logger';
import { UNIMPLEMENTED_SERVICE } from '../../constants';
import { RecordDeleteData, RecordUpdatePartial } from '../../graphql/inputTypes';
import { stringifyObject } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { ICatalogManagerService } from './catalog-manager.interface';

export class CatalogManagerDem implements ICatalogManagerService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('catalogServices.dem');
  }

  public async updateStatus(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    this.logger.info(`[CatalogManager][DEM][updateStatus] ${stringifyObject(record)}`);
    return Promise.reject(new Error(`[BFF][CatalogManagerDem][updateStatus] ${UNIMPLEMENTED_SERVICE}`));
  }

  public async updateMetadata(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    this.logger.info(`[CatalogManager][DEM][updateMetadata] ${stringifyObject(record)}`);
    return Promise.reject(new Error(`[BFF][CatalogManagerDem][updateMetadata] ${UNIMPLEMENTED_SERVICE}`));
  }
}
