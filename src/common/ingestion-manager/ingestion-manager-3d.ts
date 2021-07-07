import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig } from 'axios';
import { IngestionData } from '../../graphql/inputTypes';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import { IIngestionManagerService } from './ingestion-manager.interface';

export class IngestionManager3D implements IIngestionManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('catalogServices.3d.url');
  }

  public async ingest(data: IngestionData): Promise<IngestionData> {
    const res = await requestHandler(`${this.serviceURL}/models`, 'POST', this.buildPayload(data));
    return data;
  }

  private buildPayload(data: IngestionData): AxiosRequestConfig {
    const payloadData = {
      modelPath: data.directory,
      metadata: data.metadata,
      tilesetFilename: data.fileNames[0],
    };
    return {
      data: {
        ...payloadData,
      },
    };
  }
}
