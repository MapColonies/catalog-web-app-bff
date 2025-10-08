import { Logger } from '@map-colonies/js-logger';
import { RecordDeletePartial, RecordUpdatePartial } from '../../graphql/inputTypes';
import { IConfig, IContext, IService } from '../interfaces';
import { ICatalogManagerService } from './catalog-manager.interface';

export class CatalogManagerDem implements ICatalogManagerService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('catalogServices.dem');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async updateStatus(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    return Promise.reject('Unimplemented service');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async updateMetadata(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    return Promise.reject('Unimplemented service');
  }

  public async deleteLayer(record: RecordDeletePartial, ctx: IContext): Promise<RecordDeletePartial> {
    return Promise.reject('Unimplemented service');
  }
}
