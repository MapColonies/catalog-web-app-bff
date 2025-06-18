import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig } from 'axios';
import { RecordUpdatePartial } from '../../graphql/inputTypes';
import { requestExecutor } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { ICatalogManagerService } from './catalog-manager.interface';

export class CatalogManagerRaster implements ICatalogManagerService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('catalogServices.raster');
  }

  public async updateStatus(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    await requestExecutor(
      {
        url: `${this.service.url}/records/status/${record.id}`,
        exposureType: this.service.exposureType,
      },
      'PUT',
      this.buildPayload(record),
      ctx
    );
    return record;
  }

  public async updateMetadata(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    await requestExecutor(
      {
        url: `${this.service.url}/records/metadata/${record.id}`,
        exposureType: this.service.exposureType,
      },
      'PUT',
      this.buildPayload(record),
      ctx
    );
    return record;
  }

  private buildPayload(data: RecordUpdatePartial): AxiosRequestConfig {
    const payloadData = {
      ...data.partialRecordData,
    };

    this.logger.info(`[CatalogManagerRaster][buildPayload] generated payload: ${JSON.stringify(payloadData)}.`);

    return {
      data: {
        ...payloadData,
      },
    };
  }
}
