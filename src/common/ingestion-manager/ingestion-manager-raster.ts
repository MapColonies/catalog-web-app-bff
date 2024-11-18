import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IIngestionManagerService, ISourceInfoService } from './ingestion-manager.interface';
import { IngestionData, IngestionRasterData, SourceValidationParams } from '../../graphql/inputTypes';
import { absoluteToRelativePath } from '../../helpers/string';
import { requestExecutor } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { SourceValidation } from '../../graphql/sourceValidation';

export class IngestionManagerRaster implements IIngestionManagerService, ISourceInfoService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('ingestionServices.raster');
  }
  public async sourceInfo(data: SourceValidationParams, ctx: IContext): Promise<SourceValidation> {
    // 1. ingestion-trigger/ingestion/validateSources
    // 2. ingestion-trigger/ingestion/sourcesInfo
    const validateSourcesResp: AxiosResponse<SourceValidation> = await requestExecutor(
      {
        url: `${this.service.url}/ingestion/validateSources`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildValidationPayload(data),
      ctx
    );

    let sourcesInfo: AxiosResponse<SourceValidation> | null = null;
    if (validateSourcesResp.data.isValid) {
      sourcesInfo = await requestExecutor(
        {
          url: `${this.service.url}/ingestion/sourcesInfo`,
          exposureType: this.service.exposureType,
        },
        'POST',
        this.buildValidationPayload(data),
        ctx
      );
    }

    return {
      ...validateSourcesResp.data,
      ...(sourcesInfo
        ? {
            srs: (sourcesInfo.data as any)[0].crs,
            fileFormat: (sourcesInfo.data as any)[0].fileFormat,
            resolutionDegree: (sourcesInfo.data as any)[0].pixelSize,
            extentPolygon: (sourcesInfo.data as any)[0].extentPolygon,
          }
        : {}),
    };
  }

  public async ingest(data: IngestionData, ctx: IContext): Promise<IngestionData> {
    await requestExecutor(
      {
        url: `${this.service.url}/ingestion`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildPayload(data as IngestionRasterData),
      ctx
    );
    return data;
  }

  public async updateGeopkg(data: IngestionData, ctx: IContext): Promise<IngestionData> {
    await requestExecutor(
      {
        url: `${this.service.url}/ingestion/${data.metadata.id}`,
        exposureType: this.service.exposureType,
      },
      'PUT',
      this.buildPayload(data as IngestionRasterData),
      ctx
    );
    return data;
  }

  private buildPayload(data: IngestionRasterData): AxiosRequestConfig {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...metadata } = data.metadata;
    const payloadData = {
      inputFiles: {
        originDirectory: absoluteToRelativePath(data.directory),
        fileNames: data.fileNames,
      },
      metadata: metadata,
      partsData: data.partsData,
    };

    this.logger.info(`[IngestionManagerRaster][buildPayload] generated payload: ${JSON.stringify(payloadData)}.`);

    return {
      data: {
        ...payloadData,
      },
    };
  }

  private buildValidationPayload(data: SourceValidationParams): AxiosRequestConfig {
    const payloadData = {
      originDirectory: absoluteToRelativePath(data.originDirectory),
      fileNames: data.fileNames,
    };

    this.logger.info(`[IngestionManagerRaster][buildValidationPayload] generated validation payload: ${JSON.stringify(payloadData)}.`);

    return {
      data: {
        ...payloadData,
      },
    };
  }
}
