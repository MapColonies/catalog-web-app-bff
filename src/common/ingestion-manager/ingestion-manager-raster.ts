import { AxiosRequestConfig } from 'axios';
import { Logger } from '@map-colonies/js-logger';
import { IngestionData } from '../../graphql/inputTypes';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import { IIngestionManagerService } from './ingestion-manager.interface';

export class IngestionManagerRaster implements IIngestionManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('ingestionServices.raster.url');
  }

  public async ingest(data: IngestionData): Promise<IngestionData> {
    const res = await requestHandler(`${this.serviceURL}/layers`, 'POST', this.buildPayload(data));
    return data;
  }

  private buildPayload(data: IngestionData): AxiosRequestConfig {
    const payloadData = {
      originDirectory: data.directory,
      fileNames: data.fileNames,
      metadata: {
        ...data.metadata,
        producerName: 'IDFMU',
      },
    };
    return {
      data: {
        ...payloadData,
      },
    };
  }
}
