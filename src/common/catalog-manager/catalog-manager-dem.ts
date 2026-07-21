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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async updateStatus(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    this.logger.info(`[CatalogManager][DEM][updateStatus] ${stringifyObject(record)}`);
    return Promise.reject(new Error(`[BFF][CatalogManagerDem][updateStatus] ${UNIMPLEMENTED_SERVICE}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async updateMetadata(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    this.logger.info(`[CatalogManager][DEM][updateMetadata] ${stringifyObject(record)}`);
    return Promise.reject(new Error(`[BFF][CatalogManagerDem][updateMetadata] ${UNIMPLEMENTED_SERVICE}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async deleteLayer(data: RecordDeleteData /* should be specific data type, like RecordDeleteDEM */, ctx: IContext): Promise<void> {
    this.logger.info(`[CatalogManager][DEM][deleteLayer] ${stringifyObject(data)}`);
    return Promise.reject(new Error(`[BFF][CatalogManagerDem][deleteLayer] ${UNIMPLEMENTED_SERVICE}`));
  }
}
