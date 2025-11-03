import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Logger } from '@map-colonies/js-logger';
import { Ingestion3DData, IngestionData, SourceValidationInputParams, SourceValidationParams } from '../../graphql/inputTypes';
import { absolutePathToNfs } from '../../helpers/string';
import { requestExecutor } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { SourceValidation } from '../../graphql/sourceValidation';
import { IngestionResultData } from '../../graphql/ingestion';
import { IIngestionManagerService, ISourceInfoService } from './ingestion-manager.interface';

export class IngestionManager3D implements IIngestionManagerService, ISourceInfoService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('ingestionServices.3d');
  }

  public async sourceInfo(data: SourceValidationInputParams, ctx: IContext): Promise<SourceValidation> {
    // 1. 3d-gateway/models/validate
    const validateSourcesResp: AxiosResponse<SourceValidation> = (await requestExecutor(
      {
        url: `${this.service.url}/models/validate`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildValidationPayload(data as SourceValidationParams),
      ctx
    )) as AxiosResponse<SourceValidation>;
    return validateSourcesResp.data;
  }

  public async ingest(data: IngestionData, ctx: IContext): Promise<IngestionResultData> {
    await requestExecutor(
      {
        url: `${this.service.url}/models`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildPayload(data as Ingestion3DData),
      ctx
    );
    return data as IngestionResultData;
  }

  private buildPayload(data: Ingestion3DData): AxiosRequestConfig {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...metadata } = data.metadata;
    const payloadData = {
      modelPath: absolutePathToNfs(data.directory),
      tilesetFilename: data.fileNames[0],
      metadata: {
        ...metadata,
      },
    };

    this.logger.info(`[IngestionManager3D][buildPayload] generated payload: ${JSON.stringify(payloadData)}.`);

    return {
      data: {
        ...payloadData,
      },
    };
  }

  private buildValidationPayload(data: SourceValidationParams): AxiosRequestConfig {
    const payloadData = {
      modelPath: absolutePathToNfs(data.originDirectory),
      tilesetFilename: data.fileNames[0],
    };

    this.logger.info(`[IngestionManager3D][buildValidationPayload] generated validation payload: ${JSON.stringify(payloadData)}.`);

    return {
      data: {
        ...payloadData,
      },
    };
  }
}
