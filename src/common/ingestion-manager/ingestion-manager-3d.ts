import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig } from 'axios';
import { IngestionData } from '../../graphql/inputTypes';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import { IIngestionManagerService } from './ingestion-manager.interface';

export class IngestionManager3D implements IIngestionManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('ingestionServices.3d.url');
  }

  public async ingest(data: IngestionData): Promise<IngestionData> {
    const res = await requestHandler(`${this.serviceURL}/models`, 'POST', this.buildPayload(data));
    return data;
  }

  private buildPayload(data: IngestionData): AxiosRequestConfig {
    const payloadData = {
      modelPath: data.directory,
      metadata: {
        ...data.metadata,
        identifier: data.metadata.id,
        typename: '3D',
        schema: '3d_schema',
        mdSource: '3d_mdSource',
        xml: '3d_xml',
        anytext: `${data.metadata.productName} ${data.metadata.description ?? ''} ${
          data.metadata.sensorType ? data.metadata.sensorType.join(',') : ''
        } ${data.metadata.version ?? ''}`,
        insertDate: new Date().toISOString(),
      },
      tilesetFilename: data.fileNames[0],
    };
    return {
      data: {
        ...payloadData,
      },
    };
  }
}
