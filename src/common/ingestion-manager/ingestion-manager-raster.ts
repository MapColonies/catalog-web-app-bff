import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IngestionData, IngestionRasterData, SourceGPKGValidationParams, SourceValidationInputParams } from '../../graphql/inputTypes';
import { absoluteToRelativePath } from '../../helpers/string';
import { requestExecutor } from '../../utils';
import { IConfig, IContext, IService } from '../interfaces';
import { SourceValidation } from '../../graphql/sourceValidation';
import { RasterIngestion } from '../../graphql/ingestion';
import { IIngestionManagerService, ISourceInfoService } from './ingestion-manager.interface';

export class IngestionManagerRaster implements IIngestionManagerService, ISourceInfoService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('ingestionServices.raster');
  }
  public async sourceInfo(data: SourceValidationInputParams, ctx: IContext): Promise<SourceValidation> {
    const ONLY_ONE_SOURCE = 0;
    // 1. ingestion-trigger/ingestion/validateSources
    // 2. ingestion-trigger/ingestion/sourcesInfo
    const validateSourcesResp: AxiosResponse<SourceValidation> = (await requestExecutor(
      {
        url: `${this.service.url}/ingestion/validateSources`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildValidationPayload(data as SourceGPKGValidationParams),
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
        this.buildValidationPayload(data as SourceGPKGValidationParams),
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

  public async ingest(data: IngestionData, ctx: IContext): Promise<RasterIngestion> {
    const result: AxiosResponse<Record<string, string>> | null = await requestExecutor(
      {
        url: `${this.service.url}/ingestion`,
        exposureType: this.service.exposureType,
      },
      'POST',
      this.buildPayload(data as IngestionRasterData),
      ctx
    );
    return {
      jobId: result.data.jobId,
    };
  }

  public async updateGeopkg(data: IngestionData, ctx: IContext): Promise<RasterIngestion> {
    const result: AxiosResponse<Record<string, string>> | null = await requestExecutor(
      {
        url: `${this.service.url}/ingestion/${data.metadata.id}`,
        exposureType: this.service.exposureType,
      },
      'PUT',
      this.buildPayload(data as IngestionRasterData),
      ctx
    );
    return {
      jobId: result.data.jobId,
    };
  }

  private buildPayload(data: IngestionRasterData): AxiosRequestConfig {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...metadata } = data.metadata;
    const payloadData = {
      inputFiles: {
        gpkgFilesPath: data.inputFiles.gpkgFilesPath.map((filePath) => absoluteToRelativePath(filePath)),
        metadataShapefilePath: absoluteToRelativePath(data.inputFiles.metadataShapefilePath),
        productShapefilePath: absoluteToRelativePath(data.inputFiles.productShapefilePath),
      },
      metadata: metadata,
      ingestionResolution: data.ingestionResolution,
      callbackUrls: ['https://bff/api/callback'],
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.logger.info(`[IngestionManagerRaster][buildPayload] generated payload: ${JSON.stringify(payloadData)}.`);

    return {
      data: {
        ...payloadData,
      },
    };
  }

  private buildValidationPayload(data: SourceGPKGValidationParams): AxiosRequestConfig {
    //TODO: REPLACE WITH NEW
    const gpkgFileNameSplitted = data.gpkgFilesPath[0].split('/');
    const gpkgFileName = gpkgFileNameSplitted.pop();
    const payloadData = {
      originDirectory: absoluteToRelativePath(gpkgFileNameSplitted.join('/')),
      fileNames: [gpkgFileName],
    };

    this.logger.info(`[IngestionManagerRaster][buildValidationPayload] generated validation payload: ${JSON.stringify(payloadData)}.`);

    return {
      data: {
        ...payloadData,
      },
    };
  }

  private buildValidationPayloadNEW(data: SourceGPKGValidationParams): AxiosRequestConfig {
    this.logger.info(`[IngestionManagerRaster][buildValidationPayload] generated validation payload: ${JSON.stringify(data)}.`);

    return {
      data: {
        gpkgFilesPath: data.gpkgFilesPath.map((filePath) => absoluteToRelativePath(filePath)),
      },
    };
  }
}
