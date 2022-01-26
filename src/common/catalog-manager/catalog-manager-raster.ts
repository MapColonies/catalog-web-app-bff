import { Logger } from '@map-colonies/js-logger';
import { PycswLayerCatalogRecord } from '@map-colonies/mc-model-types';
import { AxiosRequestConfig } from 'axios';
import { RecordUpdatePartial } from '../../graphql/inputTypes';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import { ICatalogManagerService } from './catalog-manager.interface';

export class CatalogManagerRaster implements ICatalogManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('catalogServices.raster.url');
  }

  public async updateMetadata(record: RecordUpdatePartial): Promise<RecordUpdatePartial> {
    await requestHandler(`${this.serviceURL}/records/${record.id}`, 'PUT', this.buildPayload(record));
    return record;
  }

  private buildPayload(data: RecordUpdatePartial): AxiosRequestConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payloadData: Record<string, any> = {};
    const editableFields = PycswLayerCatalogRecord.getFieldConfigs().filter((field) => field.isManuallyEditable === true);

    // mapping one to one can be performed because of payload properties derived from mc-models YAML(managed)
    editableFields.forEach((field) => {
      payloadData[field.prop] = data[field.prop as keyof RecordUpdatePartial];
    });

    return {
      data: {
        metadata: {
          ...payloadData,
        },
      },
    };
  }
}
