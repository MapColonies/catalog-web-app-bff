import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Logger } from '@map-colonies/js-logger';
import { BasemapManager } from '../../../../src/common/basemap-manager/basemap-manager';
import { Basemap, CreateBasemapInput, ImportReview, ResourceResolutionStatus, SourceType, UpdateBasemapInput } from '../../../../src/graphql/basemap';
import { Domain } from '../../../../src/graphql/domain';
import { IConfig, IContext, IService } from '../../../../src/common/interfaces';
import { requestExecutor } from '../../../../src/utils';

jest.mock('../../../../src/utils', () => ({
  ...jest.requireActual('../../../../src/utils'),
  requestExecutor: jest.fn(),
}));

type RequestExecutorCall = [IService, string, AxiosRequestConfig, IContext];
const mockedRequestExecutor = requestExecutor as unknown as jest.Mock<Promise<AxiosResponse>, RequestExecutorCall>;

const SERVICE: IService = { url: 'http://basemap-api', exposureType: 'SERVICE' };
const DATA_SERVICE: IService = { url: 'http://data-service', exposureType: 'SERVICE' };
const THUMBNAIL_MAX_SIZE_BYTES = 2 * 1024 * 1024;
const CTX: IContext = { requestHeaders: {} };

function configGet(key: string): unknown {
  if (key === 'dataService') {
    return DATA_SERVICE;
  }
  if (key === 'thumbnailUpload.maxSizeBytes') {
    return THUMBNAIL_MAX_SIZE_BYTES;
  }
  return SERVICE;
}

const mockConfig = { get: jest.fn(configGet) } as unknown as IConfig;
const mockLogger = { info: jest.fn(), debug: jest.fn(), error: jest.fn(), warn: jest.fn() } as unknown as Logger;

function axiosRes<T>(data: T, headers: Record<string, string> = {}): AxiosResponse<T> {
  return { data, status: 200, statusText: 'OK', headers, config: {} };
}

function buildPngBuffer(width: number, height: number): Buffer {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const chunkLength = Buffer.alloc(4);
  chunkLength.writeUInt32BE(13);
  const chunkType = Buffer.from('IHDR', 'ascii');
  const widthBuf = Buffer.alloc(4);
  widthBuf.writeUInt32BE(width);
  const heightBuf = Buffer.alloc(4);
  heightBuf.writeUInt32BE(height);
  const rest = Buffer.alloc(9);
  return Buffer.concat([signature, chunkLength, chunkType, widthBuf, heightBuf, rest]);
}

function buildWebpBuffer(width: number, height: number): Buffer {
  const riff = Buffer.from('RIFF', 'ascii');
  const fileSize = Buffer.alloc(4);
  const webp = Buffer.from('WEBP', 'ascii');
  const vp8x = Buffer.from('VP8X', 'ascii');
  const chunkSize = Buffer.alloc(4);
  const flags = Buffer.from([0x00]);
  const reserved = Buffer.from([0x00, 0x00, 0x00]);
  const widthMinusOne = Buffer.alloc(3);
  widthMinusOne.writeUIntLE(width - 1, 0, 3);
  const heightMinusOne = Buffer.alloc(3);
  heightMinusOne.writeUIntLE(height - 1, 0, 3);
  return Buffer.concat([riff, fileSize, webp, vp8x, chunkSize, flags, reserved, widthMinusOne, heightMinusOne]);
}

const VALID_PNG_THUMBNAIL_BASE64 = buildPngBuffer(128, 128).toString('base64');
const VALID_WEBP_THUMBNAIL_BASE64 = buildWebpBuffer(128, 128).toString('base64');

const SAMPLE_BASEMAP = { id: '1', name: 'basemap-1', layers: [] } as unknown as Basemap;

const SAMPLE_LAYERS = [
  {
    id: 'layer-1',
    order: 0,
    opacity: 1,
    source: { type: SourceType.CATALOG_RESOURCE, domain: Domain.RASTER, uniqueness: { productId: 'prod-1', productType: 'OrthophotoHistory' } },
  },
  {
    id: 'layer-2',
    order: 1,
    opacity: 0.5,
    source: { type: SourceType.EXTERNAL, details: { protocol: 'XYZ', name: 'osm', url: 'http://tiles' } },
  },
] as CreateBasemapInput['layers'];

describe('BasemapManager', () => {
  let manager: BasemapManager;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig.get = jest.fn(configGet) as unknown as IConfig['get'];
    manager = new BasemapManager(mockConfig, mockLogger);
  });

  describe('getBasemaps', () => {
    const RESOLVED_BASEMAP = {
      id: 'b1',
      name: 'resolved',
      layers: [
        {
          id: 'l1',
          order: 0,
          opacity: 1,
          source: {
            type: SourceType.CATALOG_RESOURCE,
            domain: Domain.RASTER,
            uniqueness: { productId: 'p', productType: 'Orthophoto' },
            status: ResourceResolutionStatus.RESOLVED,
            layer: { id: 'record-1', productId: 'p', productType: 'Orthophoto' },
            capabilities: { id: 'p-Orthophoto', style: [], format: ['image/png'], tileMatrixSet: [], url: [] },
          },
        },
      ],
    };

    it('GETs /basemaps from basemap-management and returns its resolution result unchanged', async () => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes([RESOLVED_BASEMAP, SAMPLE_BASEMAP]));

      const result = await manager.getBasemaps(CTX);

      expect(result).toEqual([RESOLVED_BASEMAP, SAMPLE_BASEMAP]);
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(1);
      expect(mockedRequestExecutor.mock.calls[0][0]).toEqual({ url: 'http://basemap-api/basemaps', exposureType: 'SERVICE' });
      expect(mockedRequestExecutor.mock.calls[0][1]).toBe('GET');
    });

    it('propagates upstream errors', async () => {
      mockedRequestExecutor.mockRejectedValueOnce(new Error('basemap-management unreachable'));

      await expect(manager.getBasemaps(CTX)).rejects.toThrow('basemap-management unreachable');
    });
  });

  describe('unknown productType in a returned catalog reference', () => {
    const catalogLayer = (productType: string | null): Record<string, unknown> => ({
      id: 'l1',
      order: 0,
      opacity: 1,
      source: {
        type: SourceType.CATALOG_RESOURCE,
        domain: Domain.RASTER,
        uniqueness: { productId: 'p', productType },
        status: ResourceResolutionStatus.UNRESOLVED,
        layer: null,
        capabilities: null,
      },
    });
    const externalLayer = {
      id: 'l2',
      order: 1,
      opacity: 1,
      source: { type: SourceType.EXTERNAL, status: ResourceResolutionStatus.RESOLVED, details: { protocol: 'XYZ', name: 'n', url: 'u' } },
    };

    it('is replaced by null (GraphQL cannot serialize it) while known values, nulls and external layers are untouched', async () => {
      const basemap = {
        id: '1',
        name: 'b',
        layers: [catalogLayer('NotARealProductType'), catalogLayer('Orthophoto'), catalogLayer(null), externalLayer],
      };
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes(basemap));

      const result = await manager.getBasemap('1', CTX);

      expect(result.layers).toEqual([catalogLayer(null), catalogLayer('Orthophoto'), catalogLayer(null), externalLayer]);
      expect(mockLogger.warn).toHaveBeenCalledTimes(1);
    });

    it('is also replaced in the list', async () => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes([{ id: '1', name: 'b', layers: [catalogLayer('NotARealProductType')] }]));

      const [basemap] = await manager.getBasemaps(CTX);

      expect(basemap.layers).toEqual([catalogLayer(null)]);
    });

    it('is also replaced in the import review', async () => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes({ name: 'imported', layers: [catalogLayer('NotARealProductType')] }));

      const review = await manager.validateBasemapImport(Buffer.from('zip').toString('base64'), 'package.zip', CTX);

      expect(review.layers).toEqual([catalogLayer(null)]);
    });
  });

  describe('getBasemap', () => {
    it('GETs /basemaps/:id with the id encoded', async () => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes(SAMPLE_BASEMAP));

      const result = await manager.getBasemap('with space', CTX);

      expect(result).toEqual(SAMPLE_BASEMAP);
      expect(mockedRequestExecutor.mock.calls[0][0].url).toBe('http://basemap-api/basemaps/with%20space');
    });
  });

  describe('createBasemap', () => {
    const input: CreateBasemapInput = {
      name: 'new-basemap',
      isCurrent: false,
      isForPreview: false,
      layers: SAMPLE_LAYERS,
      thumbnailBase64: VALID_PNG_THUMBNAIL_BASE64,
      thumbnailContentType: 'image/png',
    };

    it('uploads the thumbnail to data-service first, then creates the basemap with the resulting thumbnail reference', async () => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes('ok')).mockResolvedValueOnce(axiosRes(SAMPLE_BASEMAP));

      const result = await manager.createBasemap(input, CTX);

      expect(result).toEqual(SAMPLE_BASEMAP);
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(2);

      const [thumbnailCall, createCall] = mockedRequestExecutor.mock.calls;
      expect(thumbnailCall[0].url).toBe('http://data-service/pvc/upload?path=basemaps%2Fthumbnails');
      expect(thumbnailCall[1]).toBe('POST');
      const multipart = (thumbnailCall[2].data as { getBuffer: () => Buffer }).getBuffer().toString('latin1');
      expect(multipart).toMatch(/name="file"; filename="[^"]+\.png"/);
      expect(multipart).toContain('Content-Type: image/png');

      expect(createCall[0].url).toBe('http://basemap-api/basemaps');
      expect(createCall[1]).toBe('POST');
      const body = createCall[2].data as { thumbnail: { url: string; width: number; height: number }; layers: unknown[] };
      expect(body.thumbnail.url).toMatch(/^http:\/\/data-service\/pvc\/files\/basemaps\/thumbnails\/[^/]+\.png$/);
      expect(body.thumbnail.width).toBe(128);
      expect(body.thumbnail.height).toBe(128);
      expect(body.layers).toEqual([
        {
          id: 'layer-1',
          order: 0,
          opacity: 1,
          shouldBeUsedInModelDraping: undefined,
          source: { type: 'CATALOG_RESOURCE', domain: 'RASTER', uniqueness: { productId: 'prod-1', productType: 'OrthophotoHistory' } },
        },
        {
          id: 'layer-2',
          order: 1,
          opacity: 0.5,
          shouldBeUsedInModelDraping: undefined,
          source: { type: 'EXTERNAL', details: { protocol: 'XYZ', name: 'osm', url: 'http://tiles' } },
        },
      ]);
    });

    it.each([
      [
        'an unsupported domain',
        { type: SourceType.CATALOG_RESOURCE, domain: Domain.VECTOR, uniqueness: { productId: 'p', productType: 'Orthophoto' } },
        /only RASTER/,
      ],
      ['a missing uniqueness', { type: SourceType.CATALOG_RESOURCE, domain: Domain.RASTER }, /missing uniqueness/],
    ])('rejects a CATALOG_RESOURCE layer with %s before calling the basemap API', async (_label, source, expectedError) => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes('ok'));
      const badInput = { ...input, layers: [{ id: 'l', order: 0, opacity: 1, source }] } as CreateBasemapInput;

      await expect(manager.createBasemap(badInput, CTX)).rejects.toThrow(expectedError);
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(1);
    });

    it('does not duplicate basemap-management validation: shared-schema violations are forwarded and its 400 propagates', async () => {
      const upstreamError = new Error('Request failed with status code 400');
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes('ok')).mockRejectedValueOnce(upstreamError);
      const badInput = { ...input, name: '   ', layers: [{ ...SAMPLE_LAYERS[0], opacity: 1.5 }] };

      await expect(manager.createBasemap(badInput, CTX)).rejects.toBe(upstreamError);
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(2);
      expect((mockedRequestExecutor.mock.calls[1][2].data as { name: string }).name).toBe('   ');
    });

    it('forwards an incomplete uniqueness as-is - the basemap service stores it and returns the layer as UNRESOLVED', async () => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes('ok')).mockResolvedValueOnce(axiosRes(SAMPLE_BASEMAP));
      const partial: CreateBasemapInput = {
        ...input,
        layers: [
          {
            id: 'l',
            order: 0,
            opacity: 1,
            source: { type: SourceType.CATALOG_RESOURCE, domain: Domain.RASTER, uniqueness: { productId: undefined } },
          },
        ],
      };

      await manager.createBasemap(partial, CTX);

      const body = mockedRequestExecutor.mock.calls[1][2].data as { layers: { source: unknown }[] };
      expect(body.layers[0].source).toEqual({
        type: 'CATALOG_RESOURCE',
        domain: 'RASTER',
        uniqueness: { productId: undefined, productType: undefined },
      });
    });

    it('propagates thumbnail upload failures and never attempts to persist the basemap', async () => {
      mockedRequestExecutor.mockRejectedValueOnce(new Error('upload failed'));

      await expect(manager.createBasemap(input, CTX)).rejects.toThrow('upload failed');
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(1);
    });

    it('propagates basemap persistence failures after a successful thumbnail upload', async () => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes('ok')).mockRejectedValueOnce(new Error('persist failed'));

      await expect(manager.createBasemap(input, CTX)).rejects.toThrow('persist failed');
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(2);
    });

    it.each([
      ['an empty file', '', /not a valid PNG or WebP/],
      ['a buffer that is not a valid PNG or WebP image', Buffer.from('not an image').toString('base64'), /not a valid PNG or WebP/],
      ['a valid PNG with the wrong dimensions', buildPngBuffer(64, 64).toString('base64'), /must be exactly 128x128/],
    ])('rejects a thumbnail that is %s, without calling data-service or basemap-management', async (_label, badBase64, expectedError) => {
      const badInput = { ...input, thumbnailBase64: badBase64 };

      await expect(manager.createBasemap(badInput, CTX)).rejects.toThrow(expectedError);
      expect(mockedRequestExecutor).not.toHaveBeenCalled();
    });

    it('rejects a thumbnail exceeding the configured maximum size', async () => {
      const oversized = Buffer.concat([buildPngBuffer(128, 128), Buffer.alloc(THUMBNAIL_MAX_SIZE_BYTES)]);
      const badInput = { ...input, thumbnailBase64: oversized.toString('base64') };

      await expect(manager.createBasemap(badInput, CTX)).rejects.toThrow(/exceeds the maximum allowed size/);
      expect(mockedRequestExecutor).not.toHaveBeenCalled();
    });
  });

  describe('updateBasemap', () => {
    const inputWithNewThumbnail: UpdateBasemapInput = {
      name: 'renamed',
      isCurrent: true,
      isForPreview: false,
      layers: SAMPLE_LAYERS,
      thumbnailBase64: VALID_WEBP_THUMBNAIL_BASE64,
      thumbnailContentType: 'image/webp',
    };

    const inputWithoutNewThumbnail: UpdateBasemapInput = {
      name: 'renamed',
      isCurrent: true,
      isForPreview: false,
      layers: SAMPLE_LAYERS,
    };

    it('uploads a new thumbnail to data-service when one is provided', async () => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes('ok')).mockResolvedValueOnce(axiosRes(SAMPLE_BASEMAP));

      const result = await manager.updateBasemap('1', inputWithNewThumbnail, CTX);

      expect(result).toEqual(SAMPLE_BASEMAP);
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(2);
      const [thumbnailCall, updateCall] = mockedRequestExecutor.mock.calls;
      expect(thumbnailCall[0].url).toBe('http://data-service/pvc/upload?path=basemaps%2Fthumbnails');
      expect(updateCall[0].url).toBe('http://basemap-api/basemaps/1');
      expect(updateCall[1]).toBe('PUT');
      const body = updateCall[2].data as { thumbnail: { url: string; width: number; height: number } };
      expect(body.thumbnail.url).toMatch(/^http:\/\/data-service\/pvc\/files\/basemaps\/thumbnails\/[^/]+\.webp$/);
      expect(body.thumbnail.width).toBe(128);
      expect(body.thumbnail.height).toBe(128);
    });

    it('does not re-upload when no new thumbnail is provided, and keeps the existing thumbnail reference', async () => {
      const existingBasemap = { ...SAMPLE_BASEMAP, thumbnail: { url: 'http://blob/existing.png', width: 64, height: 64 } };
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes(existingBasemap)).mockResolvedValueOnce(axiosRes(SAMPLE_BASEMAP));

      const result = await manager.updateBasemap('1', inputWithoutNewThumbnail, CTX);

      expect(result).toEqual(SAMPLE_BASEMAP);
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(2);
      const [getCall, updateCall] = mockedRequestExecutor.mock.calls;
      expect(getCall[1]).toBe('GET');
      expect(getCall[0].url).toBe('http://basemap-api/basemaps/1');
      expect(mockedRequestExecutor.mock.calls.some((call) => call[0].url.includes('/pvc/upload'))).toBe(false);
      const body = updateCall[2].data as { thumbnail: unknown };
      expect(body.thumbnail).toEqual({ url: 'http://blob/existing.png', width: 64, height: 64 });
    });

    it.each([
      ['an invalid image buffer', Buffer.from('not an image').toString('base64'), /not a valid PNG or WebP/],
      ['a buffer with the wrong dimensions', buildPngBuffer(64, 64).toString('base64'), /must be exactly 128x128/],
    ])('rejects a thumbnail update with %s before calling basemap-management', async (_label, badBase64, expectedError) => {
      const badInput = { ...inputWithNewThumbnail, thumbnailBase64: badBase64 };

      await expect(manager.updateBasemap('1', badInput, CTX)).rejects.toThrow(expectedError);
      expect(mockedRequestExecutor).not.toHaveBeenCalled();
    });
  });

  describe('deleteBasemap', () => {
    it('DELETEs /basemaps/:id and returns "ok"', async () => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes(undefined));

      const result = await manager.deleteBasemap('1', CTX);

      expect(result).toBe('ok');
      expect(mockedRequestExecutor).toHaveBeenCalledWith({ url: 'http://basemap-api/basemaps/1', exposureType: 'SERVICE' }, 'DELETE', {}, CTX);
    });
  });

  describe('exportBasemap', () => {
    it('base64-encodes the arraybuffer response and uses the Content-Disposition filename when safe', async () => {
      const buffer = Buffer.from('zip-bytes');
      mockedRequestExecutor.mockResolvedValueOnce(
        axiosRes(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength), {
          'content-disposition': 'attachment; filename="my-export.zip"',
        })
      );

      const result = await manager.exportBasemap('1', CTX);

      expect(result.contentBase64).toBe(buffer.toString('base64'));
      expect(result.filename).toBe('my-export.zip');
      expect(mockedRequestExecutor.mock.calls[0][0].url).toBe('http://basemap-api/basemaps/1/export');
      expect(mockedRequestExecutor.mock.calls[0][2]).toEqual({ responseType: 'arraybuffer' });
    });

    it('falls back to the default filename when Content-Disposition is absent or unsafe', async () => {
      const buffer = Buffer.from('zip-bytes');
      mockedRequestExecutor.mockResolvedValueOnce(
        axiosRes(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength), {
          'content-disposition': 'attachment; filename="../../etc/passwd"',
        })
      );

      const result = await manager.exportBasemap('1', CTX);

      expect(result.filename).toBe('basemap.zip');
    });

    it('propagates upstream errors', async () => {
      mockedRequestExecutor.mockRejectedValueOnce(new Error('upstream export failed'));

      await expect(manager.exportBasemap('1', CTX)).rejects.toThrow('upstream export failed');
    });
  });

  describe('validateBasemapImport', () => {
    it('forwards the decoded file as multipart/form-data and returns the review', async () => {
      const review = { name: 'imported', layers: [] } as unknown as ImportReview;
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes(review));

      const fileBase64 = Buffer.from('zip-bytes').toString('base64');
      const result = await manager.validateBasemapImport(fileBase64, 'package.zip', CTX);

      expect(result).toEqual(review);
      const call = mockedRequestExecutor.mock.calls[0];
      expect(call[0].url).toBe('http://basemap-api/basemaps/import/validate');
      expect(call[1]).toBe('POST');
      expect(call[2].headers).toBeDefined();
    });

    it('propagates upstream validation errors', async () => {
      mockedRequestExecutor.mockRejectedValueOnce(new Error('invalid package'));

      await expect(manager.validateBasemapImport('ZmFrZQ==', 'package.zip', CTX)).rejects.toThrow('invalid package');
    });
  });
});
