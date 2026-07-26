import { AxiosRequestConfig } from 'axios';
import { Logger } from '@map-colonies/js-logger';
import { RecordDeleteData, RecordDeleteRaster, RecordUpdatePartial } from '../../graphql/inputTypes';
import { requestExecutor, stringifyObject } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { ICatalogManagerService } from './catalog-manager.interface';

export class CatalogManagerRaster implements ICatalogManagerService {
  private readonly service: IService;
  private readonly deleteLayerApprovalCode: string;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('catalogServices.raster');
    this.deleteLayerApprovalCode = this.config.get('deleteLayerApprovalCode');
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

  public async deleteLayer(dataParam: RecordDeleteData, ctx: IContext): Promise<void> {
    const data = dataParam as RecordDeleteRaster;
    this.logger.info(`[CatalogManager][Raster][deleteLayer] ${stringifyObject(data)}`);

    if (data.approvalCode === this.deleteLayerApprovalCode) {
      const ingestionService: IService = this.config.get('ingestionServices.raster');
      await requestExecutor(
        {
          url: `${ingestionService.url}/ingestion/${data.id}`,
          exposureType: this.service.exposureType,
        },
        'DELETE',
        {
          data: {
            approver: data.approverName,
          },
        },
        ctx
      );
    } else {
      throw new Error('BFF: Wrong Approval Code');
    }
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
