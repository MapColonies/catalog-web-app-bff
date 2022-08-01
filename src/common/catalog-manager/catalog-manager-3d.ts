import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig } from 'axios';
import { RecordUpdatePartial } from '../../graphql/inputTypes';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import { ICatalogManagerService } from './catalog-manager.interface';

export class CatalogManager3D implements ICatalogManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('catalogServices.3d.url');
  }

  public async updateMetadata(record: RecordUpdatePartial): Promise<RecordUpdatePartial> {
    await requestHandler(`${this.serviceURL}/metadata/${record.id}`, 'PATCH', this.buildPayload(record));
    return record;
  }

  private buildPayload(data: RecordUpdatePartial): AxiosRequestConfig {
    const payloadData = {
      ...data.partialRecordData,
    };

    this.logger.info(`[CatalogManager3D][buildPayload] generated payload: ${JSON.stringify(payloadData)}.`);

    return {
      data: {
        ...payloadData,
      },
    };
  }
}
