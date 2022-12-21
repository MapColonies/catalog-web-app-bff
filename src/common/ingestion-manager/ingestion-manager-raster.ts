import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig } from 'axios';
import { IngestionData } from '../../graphql/inputTypes';
import { absoluteToRelativePath } from '../../helpers/string';
import { requestHandler } from '../../utils';
import { IConfig, IContext } from '../interfaces';
import { IIngestionManagerService } from './ingestion-manager.interface';

export class IngestionManagerRaster implements IIngestionManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('ingestionServices.raster.url');
  }

  public async ingest(data: IngestionData, ctx: IContext): Promise<IngestionData> {
    await requestHandler(`${this.serviceURL}/layers`, 'POST', this.buildPayload(data), ctx);
    return data;
  }

  public async updateGeopkg(data: IngestionData, ctx: IContext): Promise<IngestionData> {
    await requestHandler(`${this.serviceURL}/layers`, 'POST', this.buildPayload(data), ctx);
    return data;
  }

  private buildPayload(data: IngestionData): AxiosRequestConfig {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...metadata } = data.metadata;
    const payloadData = {
      originDirectory: absoluteToRelativePath(data.directory),
      fileNames: data.fileNames,
      metadata,
    };

    this.logger.info(`[IngestionManagerRaster][buildPayload] generated payload: ${JSON.stringify(payloadData)}.`);

    return {
      data: {
        ...payloadData,
      },
    };
  }
}
