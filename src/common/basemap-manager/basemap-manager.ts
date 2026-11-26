import { randomUUID } from 'node:crypto';
import FormData from 'form-data';
import { inject, singleton } from 'tsyringe';
import {
  type BasemapLayerInput as RestBasemapLayerInput,
  type BasemapThumbnail,
  type BasemapWriteInput as RestBasemapWriteInput,
} from '@map-colonies/app-shared';
import { Logger } from '@map-colonies/js-logger';
import { ProductType, Domain as RestDomain } from '@map-colonies/types';
import {
  Basemap,
  BasemapExportPackage,
  BasemapLayerInput,
  BasemapLayerSourceInput,
  CreateBasemapInput,
  ImportReview,
  SourceType,
  UpdateBasemapInput,
} from '../../graphql/basemap';
import { Domain } from '../../graphql/domain';
import { requestExecutor, stringifyObject } from '../../utils';
import { Services } from '../constants';
import { IConfig, IContext, IService } from '../interfaces';
import { sniffImage } from './imageFormat';

type RestLayerSource = RestBasemapLayerInput['source'];

interface ILayersHolder {
  layers: { id: string; source: unknown }[];
}

const KNOWN_PRODUCT_TYPES = new Set<string>(Object.values(ProductType));
const DEFAULT_EXPORT_FILENAME = 'basemap.zip';
const CONTENT_DISPOSITION_FILENAME_PATTERN = /filename="?([^";]+)"?/i;
const SAFE_FILENAME_PATTERN = /^[\w.\- ]+\.zip$/i;
const THUMBNAIL_DIMENSION_PIXELS = 128;
const THUMBNAIL_UPLOAD_PATH = 'basemaps/thumbnails';
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const DEFAULT_THUMBNAIL_MAX_SIZE_BYTES = 2 * 1024 * 1024;

@singleton()
export class BasemapManager {
  private readonly service: IService;
  private readonly dataService: IService;
  private readonly thumbnailMaxSizeBytes: number;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('basemapService');
    this.dataService = this.config.get('dataService');
    const configuredMaxSize = Number(this.config.get('thumbnailUpload.maxSizeBytes'));
    this.thumbnailMaxSizeBytes = Number.isFinite(configuredMaxSize) && configuredMaxSize > 0 ? configuredMaxSize : DEFAULT_THUMBNAIL_MAX_SIZE_BYTES;
  }

  public async getBasemaps(ctx: IContext): Promise<Basemap[]> {
    this.logger.info('[BasemapManager][getBasemaps]');
    const res = await requestExecutor({ url: `${this.service.url}/basemaps`, exposureType: this.service.exposureType }, 'GET', {}, ctx);
    return (res.data as Basemap[]).map((basemap) => this.withRepresentableProductTypes(basemap));
  }

  public async getBasemap(id: string, ctx: IContext): Promise<Basemap> {
    this.logger.info(`[BasemapManager][getBasemap] id: ${id}`);
    const res = await requestExecutor(
      { url: `${this.service.url}/basemaps/${encodeURIComponent(id)}`, exposureType: this.service.exposureType },
      'GET',
      {},
      ctx
    );
    return this.withRepresentableProductTypes(res.data as Basemap);
  }

  public async createBasemap(input: CreateBasemapInput, ctx: IContext): Promise<Basemap> {
    this.logger.info(`[BasemapManager][createBasemap] ${stringifyObject({ name: input.name })}`);
    const thumbnail = await this.uploadThumbnail(input.thumbnailBase64, ctx);
    const body = this.toRestWriteInput(input, thumbnail);
    const res = await requestExecutor({ url: `${this.service.url}/basemaps`, exposureType: this.service.exposureType }, 'POST', { data: body }, ctx);
    return this.withRepresentableProductTypes(res.data as Basemap);
  }

  public async updateBasemap(id: string, input: UpdateBasemapInput, ctx: IContext): Promise<Basemap> {
    this.logger.info(`[BasemapManager][updateBasemap] id: ${id}, ${stringifyObject({ name: input.name })}`);
    const thumbnail =
      input.thumbnailBase64 !== undefined
        ? await this.uploadThumbnail(input.thumbnailBase64, ctx)
        : ((await this.getBasemap(id, ctx)).thumbnail as BasemapThumbnail);
    const body = this.toRestWriteInput(input, thumbnail);
    const res = await requestExecutor(
      { url: `${this.service.url}/basemaps/${encodeURIComponent(id)}`, exposureType: this.service.exposureType },
      'PUT',
      { data: body },
      ctx
    );
    return this.withRepresentableProductTypes(res.data as Basemap);
  }

  public async deleteBasemap(id: string, ctx: IContext): Promise<string> {
    this.logger.info(`[BasemapManager][deleteBasemap] id: ${id}`);
    await requestExecutor(
      { url: `${this.service.url}/basemaps/${encodeURIComponent(id)}`, exposureType: this.service.exposureType },
      'DELETE',
      {},
      ctx
    );
    return 'ok';
  }

  public async exportBasemap(id: string, ctx: IContext): Promise<BasemapExportPackage> {
    this.logger.info(`[BasemapManager][exportBasemap] id: ${id}`);
    const res = await requestExecutor(
      { url: `${this.service.url}/basemaps/${encodeURIComponent(id)}/export`, exposureType: this.service.exposureType },
      'GET',
      { responseType: 'arraybuffer' },
      ctx
    );
    const contentBase64 = Buffer.from(res.data as ArrayBuffer).toString('base64');
    const filename = this.resolveExportFilename(res.headers as Record<string, string> | undefined);
    return { filename, contentBase64 };
  }

  public async validateBasemapImport(fileBase64: string, filename: string, ctx: IContext): Promise<ImportReview> {
    this.logger.info(`[BasemapManager][validateBasemapImport] filename: ${filename}`);
    const buffer = Buffer.from(fileBase64, 'base64');
    const form = new FormData();
    form.append('package', buffer, { filename, contentType: 'application/zip' });

    const res = await requestExecutor(
      { url: `${this.service.url}/basemaps/import/validate`, exposureType: this.service.exposureType },
      'POST',
      { data: form, headers: form.getHeaders() },
      ctx
    );
    return this.withRepresentableProductTypes(res.data as ImportReview);
  }

  private async uploadThumbnail(thumbnailBase64: string, ctx: IContext): Promise<BasemapThumbnail> {
    const buffer = Buffer.from(thumbnailBase64, 'base64');
    if (buffer.length > this.thumbnailMaxSizeBytes) {
      throw new Error(`the thumbnail exceeds the maximum allowed size of ${this.thumbnailMaxSizeBytes} bytes`);
    }
    const sniffed = sniffImage(buffer);
    if (!sniffed) {
      throw new Error('the uploaded file is not a valid PNG or WebP image');
    }
    if (sniffed.width !== THUMBNAIL_DIMENSION_PIXELS || sniffed.height !== THUMBNAIL_DIMENSION_PIXELS) {
      throw new Error(
        `the thumbnail must be exactly ${THUMBNAIL_DIMENSION_PIXELS}x${THUMBNAIL_DIMENSION_PIXELS} pixels, got ${sniffed.width}x${sniffed.height}`
      );
    }

    const extension = sniffed.mimeType === 'image/png' ? 'png' : 'webp';
    const fileName = `${randomUUID()}.${extension}`;
    const form = new FormData();
    form.append('file', buffer, { filename: fileName, contentType: sniffed.mimeType });

    await requestExecutor(
      { url: `${this.dataService.url}/pvc/upload?path=${encodeURIComponent(THUMBNAIL_UPLOAD_PATH)}`, exposureType: this.dataService.exposureType },
      'POST',
      { data: form, headers: form.getHeaders() },
      ctx
    );

    return {
      url: `${this.dataService.url}/pvc/files/${THUMBNAIL_UPLOAD_PATH}/${fileName}`,
      width: THUMBNAIL_DIMENSION_PIXELS,
      height: THUMBNAIL_DIMENSION_PIXELS,
    };
  }

  private toRestWriteInput(input: CreateBasemapInput | UpdateBasemapInput, thumbnail: BasemapThumbnail): RestBasemapWriteInput {
    const candidate: RestBasemapWriteInput = {
      name: input.name,
      thumbnail,
      isCurrent: input.isCurrent,
      isForPreview: input.isForPreview,
      layers: input.layers.map((layer) => this.toRestLayer(layer)),
    };

    return candidate;
  }

  private toRestLayer(layer: BasemapLayerInput): RestBasemapLayerInput {
    return {
      id: layer.id,
      order: layer.order,
      opacity: layer.opacity,
      shouldBeUsedInModelDraping: layer.shouldBeUsedInModelDraping,
      source: this.toRestLayerSource(layer.source),
    };
  }

  private toRestLayerSource(source: BasemapLayerSourceInput): RestLayerSource {
    switch (source.type) {
      case SourceType.CATALOG_RESOURCE:
        if (source.domain !== Domain.RASTER) {
          throw new Error(
            `BasemapLayerSourceInput of type CATALOG_RESOURCE has unsupported domain "${String(source.domain)}" - only RASTER is supported`
          );
        }
        if (source.uniqueness === undefined) {
          throw new Error('BasemapLayerSourceInput of type CATALOG_RESOURCE is missing uniqueness');
        }
        return {
          type: 'CATALOG_RESOURCE',
          domain: RestDomain.RASTER,
          uniqueness: { productId: source.uniqueness.productId, productType: source.uniqueness.productType },
        };
      case SourceType.EXTERNAL:
        if (source.details === undefined) {
          throw new Error('BasemapLayerSourceInput of type EXTERNAL is missing details');
        }
        return {
          type: 'EXTERNAL',
          details: {
            protocol: source.details.protocol,
            name: source.details.name,
            url: source.details.url,
            extras: source.details.extras ?? undefined,
          },
        };
      /* istanbul ignore next */
      default:
        throw new Error(`unknown BasemapLayerSourceInput type "${String(source.type)}"`);
    }
  }

  private withRepresentableProductTypes<T extends ILayersHolder>(holder: T): T {
    return {
      ...holder,
      layers: holder.layers.map((layer) => {
        const source = layer.source as { type?: unknown; uniqueness?: { productType?: string | null } };
        const productType = source.uniqueness?.productType;
        if (
          source.type !== SourceType.CATALOG_RESOURCE ||
          productType === undefined ||
          productType === null ||
          KNOWN_PRODUCT_TYPES.has(productType)
        ) {
          return layer;
        }
        this.logger.warn(`[BasemapManager] layer "${layer.id}" has an unknown productType "${productType}" - returned as null`);
        return { ...layer, source: { ...source, uniqueness: { ...source.uniqueness, productType: null } } };
      }),
    };
  }

  private resolveExportFilename(headers: Record<string, string> | undefined): string {
    const contentDisposition = headers?.['content-disposition'];
    const match = contentDisposition !== undefined ? CONTENT_DISPOSITION_FILENAME_PATTERN.exec(contentDisposition) : null;
    const candidate = match?.[1];
    return candidate !== undefined && SAFE_FILENAME_PATTERN.test(candidate) ? candidate : DEFAULT_EXPORT_FILENAME;
  }
}
