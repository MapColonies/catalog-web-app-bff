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

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  public async deleteLayer(dataParam: RecordDeleteData, ctx: IContext): Promise<boolean> {
    const data = dataParam as RecordDeleteRaster;
    this.logger.info(`[CatalogManager][Raster][deleteLayer] ${stringifyObject(data)}`);

    if (data.approvalCode === this.deleteLayerApprovalCode) {
      return Promise.reject('The code is right, but the service is unimplemented');
    }

    return Promise.reject('Unimplemented service');

    // await requestExecutor(
    //   {
    //     url: `${this.service.url}/models/${data.id}`,
    //     exposureType: this.service.exposureType,
    //   },
    //   'DELETE',
    //   {
    //     data: {
    //       approverName: data.approverName,
    //       approvalCode: data.approvalCode
    //     }
    //   },
    //   ctx
    // );
    // return true;
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
