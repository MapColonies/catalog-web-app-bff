import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IngestionData, IngestionRasterData, SourceValidationParams } from '../../graphql/inputTypes';
import { absoluteToRelativePath } from '../../helpers/string';
import { requestExecutor } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { SourceValidation } from '../../graphql/sourceValidation';
import { IIngestionManagerService, ISourceInfoService } from './ingestion-manager.interface';

export class IngestionManagerRaster implements IIngestionManagerService, ISourceInfoService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('ingestionServices.raster');
  }
  public async sourceInfo(data: SourceValidationParams, ctx: IContext): Promise<SourceValidation> {
    const ONLY_ONE_SOURCE = 0;
    // 1. ingestion-trigger/ingestion/validateSources
    // 2. ingestion-trigger/ingestion/sourcesInfo
    const validateSourcesResp: AxiosResponse<SourceValidation> = (await requestExecutor(
      {
        url: `${this.service.url}/ingestion/validateSources`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildValidationPayload(data),
      ctx
    )) as AxiosResponse<SourceValidation>;

    let sourcesInfo: AxiosResponse<Record<string, unknown>[]> | null = null;
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
            srs: sourcesInfo.data[ONLY_ONE_SOURCE].crs as string,
            fileFormat: sourcesInfo.data[ONLY_ONE_SOURCE].fileFormat as string,
            resolutionDegree: sourcesInfo.data[ONLY_ONE_SOURCE].pixelSize as number,
            extentPolygon: sourcesInfo.data[ONLY_ONE_SOURCE].extentPolygon as Record<string, unknown>,
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

    const { partsData, ...payloadWithoutParts } = payloadData;
    this.logger.info(`[IngestionManagerRaster][buildPayload] generated payload: ${JSON.stringify(payloadWithoutParts)}.`);

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
