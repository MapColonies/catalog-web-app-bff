import { Logger } from '@map-colonies/js-logger';
import { PycswLayerCatalogRecord } from '@map-colonies/mc-model-types';
import { AxiosRequestConfig } from 'axios';
import { LayerMetadataUnionType } from '../../graphql/resolvers/csw.resolver';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import { ICatalogManagerService } from './catalog-manager.interface';

export class CatalogManagerRaster implements ICatalogManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('catalogServices.raster.url');
  }

  public async updateMetadata(record: LayerMetadataUnionType): Promise<LayerMetadataUnionType> {
    const res = await requestHandler(`${this.serviceURL}/records/${record.id}`, 'PUT', this.buildPayload(record));
    return record;
  }

  private buildPayload(data: LayerMetadataUnionType): AxiosRequestConfig {
    const payloadData: Record<string, any> = {};
    const editableFields = PycswLayerCatalogRecord.getFieldConfigs().filter((field) => field.isManuallyEditable === true);

    // mapping one to one can be performed becuase of payload properties derived from mc-models YAML(managed)
    editableFields.forEach((field) => {
      payloadData[field.prop] = data[field.prop as keyof LayerMetadataUnionType];
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
