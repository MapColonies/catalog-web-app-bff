import { Logger } from '@map-colonies/js-logger';
import { RecordUpdatePartial } from '../../graphql/inputTypes';
import { IConfig } from '../interfaces';
import { ICatalogManagerService } from './catalog-manager.interface';

export class CatalogManagerDem implements ICatalogManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('catalogServices.dem.url');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async updateMetadata(record: RecordUpdatePartial): Promise<RecordUpdatePartial> {
    return Promise.reject('Unimplemented service');
  }
}
