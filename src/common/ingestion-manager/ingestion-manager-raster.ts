import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig } from 'axios';
import { IngestionData } from '../../graphql/inputTypes';
import { absoluteToRelativePath } from '../../helpers/string';
import { requestExecutor } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { IIngestionManagerService } from './ingestion-manager.interface';

export class IngestionManagerRaster implements IIngestionManagerService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('ingestionServices.raster');
  }

  public async ingest(data: IngestionData, ctx: IContext): Promise<IngestionData> {
    await requestExecutor(
      {
        url: `${this.service.url}/layers`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildPayload(data),
      ctx
    );
    return data;
  }

  public async updateGeopkg(data: IngestionData, ctx: IContext): Promise<IngestionData> {
    await requestExecutor(
      {
        url: `${this.service.url}/layers`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildPayload(data),
      ctx
    );
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
