import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig } from 'axios';
import { LayerMetadataUnionType } from '../../graphql/resolvers/csw.resolver';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import { ICatalogManagerService } from './catalog-manager.interface';

export class CatalogManager3D implements ICatalogManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('catalogServices.3d.url');
  }

  public async updateMetadata(record: LayerMetadataUnionType): Promise<LayerMetadataUnionType> {
    const res = await requestHandler(`${this.serviceURL}/metadata/${record.id}`, 'PATCH', this.buildPayload(record));
    return record;
  }

  private buildPayload(data: LayerMetadataUnionType): AxiosRequestConfig {
    const payloadData = {
      title: data.productName,
      description: data.description,
      sensorType: data.sensorType?.join(','),
      classification: data.classification,
      keywords: data.keywords,
    };
    return {
      data: {
        ...payloadData,
      },
    };
  }
}
