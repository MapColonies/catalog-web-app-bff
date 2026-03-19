import { AxiosRequestConfig } from 'axios';
import { Logger } from '@map-colonies/js-logger';
import { RecordDeletePartial, RecordUpdatePartial } from '../../graphql/inputTypes';
import { requestExecutor, stringifyObject } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { ICatalogManagerService } from './catalog-manager.interface';

export class CatalogManagerRaster implements ICatalogManagerService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('catalogServices.raster');
  }

  public async updateStatus(record: RecordUpdatePartial, ctx: IContext): Promise<RecordUpdatePartial> {
    this.logger.info(`[CatalogManager][Raster][updateStatus] ${stringifyObject(record)}`);
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
    this.logger.info(`[CatalogManager][Raster][updateMetadata] ${stringifyObject(record)}`);
    await requestExecutor(
      {
        url: `${this.service.url}/records/metadata/${record.id}`,
        exposureType: this.service.exposureType,
      },
      'PUT',
      this.buildPayload(record, true),
      ctx
    );
    return record;
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  public async deleteLayer(record: RecordDeletePartial, ctx: IContext): Promise<RecordDeletePartial> {
    this.logger.info(`[CatalogManager][Raster][deleteLayer] ${stringifyObject(record)}`);
    return Promise.reject('Unimplemented service');
  }

  private buildPayload(data: RecordUpdatePartial, isMetadata = false): AxiosRequestConfig {
    const payloadData = {
      ...data.partialRecordData,
    };

    if (isMetadata) {
      return {
        data: {
          metadata: {
            ...payloadData,
          },
        },
      };
    }

    return {
      data: {
        ...payloadData,
      },
    };
  }
}
