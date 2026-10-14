import FormData from 'form-data';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import {
  Basemap,
  BasemapExportPackage,
  BasemapLayerInput,
  BasemapLayerSourceInput,
  BasemapLayerSourceType,
  CreateBasemapInput,
  ImportReview,
  UpdateBasemapInput,
} from '../../graphql/basemap';
import { requestExecutor, stringifyObject } from '../../utils';
import { Services } from '../constants';
import { IConfig, IContext, IService } from '../interfaces';

interface IRestThumbnail {
  url: string;
  width: number;
  height: number;
}

type IRestLayerSource =
  | { type: 'RASTER_RESOURCE'; productId: string; productType: string }
  | { type: 'EXTERNAL'; details: { protocol: string; name: string; url: string } };

interface IRestLayer {
  id: string;
  order: number;
  opacity: number;
  shouldBeUsedInModelDraping?: boolean;
  source: IRestLayerSource;
}

interface IRestBasemapWriteInput {
  name: string;
  thumbnail: IRestThumbnail;
  isCurrent: boolean;
  isForPreview: boolean;
  layers: IRestLayer[];
}

const DEFAULT_EXPORT_FILENAME = 'basemap.zip';
const CONTENT_DISPOSITION_FILENAME_PATTERN = /filename="?([^";]+)"?/i;
const SAFE_FILENAME_PATTERN = /^[\w.\- ]+\.zip$/i;

@singleton()
export class BasemapManager {
  private readonly service: IService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('basemapServices');
  }

  public async getBasemaps(ctx: IContext): Promise<Basemap[]> {
    this.logger.info('[BasemapManager][getBasemaps]');
    const res = await requestExecutor({ url: `${this.service.url}/basemaps`, exposureType: this.service.exposureType }, 'GET', {}, ctx);
    return res.data as Basemap[];
  }

  public async getBasemap(id: string, ctx: IContext): Promise<Basemap> {
    this.logger.info(`[BasemapManager][getBasemap] id: ${id}`);
    const res = await requestExecutor(
      { url: `${this.service.url}/basemaps/${encodeURIComponent(id)}`, exposureType: this.service.exposureType },
      'GET',
      {},
      ctx
    );
    return res.data as Basemap;
  }

  public async createBasemap(input: CreateBasemapInput, ctx: IContext): Promise<Basemap> {
    this.logger.info(`[BasemapManager][createBasemap] ${stringifyObject({ name: input.name })}`);
    const thumbnail = await this.uploadThumbnail(input.thumbnailBase64, input.thumbnailContentType, ctx);
    const body = this.toRestWriteInput(input, thumbnail);
    const res = await requestExecutor({ url: `${this.service.url}/basemaps`, exposureType: this.service.exposureType }, 'POST', { data: body }, ctx);
    return res.data as Basemap;
  }

  public async updateBasemap(id: string, input: UpdateBasemapInput, ctx: IContext): Promise<Basemap> {
    this.logger.info(`[BasemapManager][updateBasemap] id: ${id}, ${stringifyObject({ name: input.name })}`);
    const thumbnail =
      input.thumbnailBase64 !== undefined
        ? await this.uploadThumbnail(input.thumbnailBase64, input.thumbnailContentType ?? '', ctx)
        : (await this.getBasemap(id, ctx)).thumbnail;
    const body = this.toRestWriteInput(input, thumbnail);
    const res = await requestExecutor(
      { url: `${this.service.url}/basemaps/${encodeURIComponent(id)}`, exposureType: this.service.exposureType },
      'PUT',
      { data: body },
      ctx
    );
    return res.data as Basemap;
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
    return res.data as ImportReview;
  }

  private async uploadThumbnail(thumbnailBase64: string, contentType: string, ctx: IContext): Promise<IRestThumbnail> {
    const buffer = Buffer.from(thumbnailBase64, 'base64');
    const form = new FormData();
    const extension = contentType === 'image/webp' ? 'webp' : 'png';
    form.append('thumbnail', buffer, { filename: `thumbnail.${extension}`, contentType });

    const res = await requestExecutor(
      { url: `${this.service.url}/basemaps/thumbnails`, exposureType: this.service.exposureType },
      'POST',
      { data: form, headers: form.getHeaders() },
      ctx
    );
    return res.data as IRestThumbnail;
  }

  private toRestWriteInput(input: CreateBasemapInput | UpdateBasemapInput, thumbnail: IRestThumbnail): IRestBasemapWriteInput {
    return {
      name: input.name,
      thumbnail,
      isCurrent: input.isCurrent,
      isForPreview: input.isForPreview,
      layers: input.layers.map((layer) => this.toRestLayer(layer)),
    };
  }

  private toRestLayer(layer: BasemapLayerInput): IRestLayer {
    return {
      id: layer.id,
      order: layer.order,
      opacity: layer.opacity,
      shouldBeUsedInModelDraping: layer.shouldBeUsedInModelDraping,
      source: this.toRestLayerSource(layer.source),
    };
  }

  private toRestLayerSource(source: BasemapLayerSourceInput): IRestLayerSource {
    switch (source.type) {
      case BasemapLayerSourceType.RASTER_RESOURCE:
        if (source.productId === undefined || source.productType === undefined) {
          throw new Error('BasemapLayerSourceInput of type RASTER_RESOURCE is missing productId/productType');
        }
        return { type: 'RASTER_RESOURCE', productId: source.productId, productType: source.productType };
      case BasemapLayerSourceType.EXTERNAL:
        if (source.details === undefined) {
          throw new Error('BasemapLayerSourceInput of type EXTERNAL is missing details');
        }
        return { type: 'EXTERNAL', details: { protocol: source.details.protocol, name: source.details.name, url: source.details.url } };
      /* istanbul ignore next */
      default:
        throw new Error(`unknown BasemapLayerSourceInput type "${String(source.type)}"`);
    }
  }

  private resolveExportFilename(headers: Record<string, string> | undefined): string {
    const contentDisposition = headers?.['content-disposition'];
    const match = contentDisposition !== undefined ? CONTENT_DISPOSITION_FILENAME_PATTERN.exec(contentDisposition) : null;
    const candidate = match?.[1];
    return candidate !== undefined && SAFE_FILENAME_PATTERN.test(candidate) ? candidate : DEFAULT_EXPORT_FILENAME;
  }
}
