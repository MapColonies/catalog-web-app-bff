import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Logger } from '@map-colonies/js-logger';
import { BasemapManager } from '../../../../src/common/basemap-manager/basemap-manager';
import { Basemap, CreateBasemapInput, ImportReview, SourceType, Status, UpdateBasemapInput } from '../../../../src/graphql/basemap';
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
const CTX: IContext = { requestHeaders: {} };

const mockConfig = { get: jest.fn().mockReturnValue(SERVICE) } as unknown as IConfig;
const mockLogger = { info: jest.fn(), debug: jest.fn(), error: jest.fn(), warn: jest.fn() } as unknown as Logger;

function axiosRes<T>(data: T, headers: Record<string, string> = {}): AxiosResponse<T> {
  return { data, status: 200, statusText: 'OK', headers, config: {} };
}

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
    mockConfig.get = jest.fn().mockReturnValue(SERVICE);
    manager = new BasemapManager(mockConfig, mockLogger);
  });

  describe('getBasemaps', () => {
    it('GETs /basemaps and returns the list', async () => {
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes([SAMPLE_BASEMAP]));

      const result = await manager.getBasemaps(CTX);

      expect(result).toEqual([SAMPLE_BASEMAP]);
      expect(mockedRequestExecutor).toHaveBeenCalledWith({ url: 'http://basemap-api/basemaps', exposureType: 'SERVICE' }, 'GET', {}, CTX);
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
        status: Status.UNRESOLVED,
        layer: null,
        capabilities: null,
      },
    });
    const externalLayer = {
      id: 'l2',
      order: 1,
      opacity: 1,
      source: { type: SourceType.EXTERNAL, status: Status.RESOLVED, details: { protocol: 'XYZ', name: 'n', url: 'u' } },
    };

    it('is replaced by null (GraphQL cannot serialize it) while known values, nulls and external layers are untouched', async () => {
      const basemap = {
        id: '1',
        name: 'b',
        layers: [catalogLayer('NotARealProductType'), catalogLayer('Orthophoto'), catalogLayer(null), externalLayer],
      };
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes([basemap]));

      const [result] = await manager.getBasemaps(CTX);

      expect(result.layers).toEqual([catalogLayer(null), catalogLayer('Orthophoto'), catalogLayer(null), externalLayer]);
      expect(mockLogger.warn).toHaveBeenCalledTimes(1);
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
      thumbnailBase64: Buffer.from('fake-png-bytes').toString('base64'),
      thumbnailContentType: 'image/png',
    };

    it('uploads the thumbnail first, then creates the basemap with the returned thumbnail reference', async () => {
      mockedRequestExecutor
        .mockResolvedValueOnce(axiosRes({ url: 'http://blob/thumb.png', width: 128, height: 128 }))
        .mockResolvedValueOnce(axiosRes(SAMPLE_BASEMAP));

      const result = await manager.createBasemap(input, CTX);

      expect(result).toEqual(SAMPLE_BASEMAP);
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(2);

      const [thumbnailCall, createCall] = mockedRequestExecutor.mock.calls;
      expect(thumbnailCall[0].url).toBe('http://basemap-api/basemaps/thumbnails');
      expect(thumbnailCall[1]).toBe('POST');

      expect(createCall[0].url).toBe('http://basemap-api/basemaps');
      expect(createCall[1]).toBe('POST');
      const body = createCall[2].data as { thumbnail: unknown; layers: unknown[] };
      expect(body.thumbnail).toEqual({ url: 'http://blob/thumb.png', width: 128, height: 128 });
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
      mockedRequestExecutor.mockResolvedValueOnce(axiosRes({ url: 'http://blob/thumb.png', width: 128, height: 128 }));
      const badInput = { ...input, layers: [{ id: 'l', order: 0, opacity: 1, source }] } as CreateBasemapInput;

      await expect(manager.createBasemap(badInput, CTX)).rejects.toThrow(expectedError);
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(1); // thumbnail upload only - nothing persisted
    });

    it('forwards an incomplete uniqueness as-is - the basemap service stores it and returns the layer as UNRESOLVED', async () => {
      mockedRequestExecutor
        .mockResolvedValueOnce(axiosRes({ url: 'http://blob/thumb.png', width: 128, height: 128 }))
        .mockResolvedValueOnce(axiosRes(SAMPLE_BASEMAP));
      const partial = {
        ...input,
        layers: [
          { id: 'l', order: 0, opacity: 1, source: { type: SourceType.CATALOG_RESOURCE, domain: Domain.RASTER, uniqueness: { productId: null } } },
        ],
      } as CreateBasemapInput;

      await manager.createBasemap(partial, CTX);

      const body = mockedRequestExecutor.mock.calls[1][2].data as { layers: { source: unknown }[] };
      expect(body.layers[0].source).toEqual({ type: 'CATALOG_RESOURCE', domain: 'RASTER', uniqueness: { productId: null, productType: undefined } });
    });

    it('propagates thumbnail upload failures and never attempts to persist the basemap', async () => {
      mockedRequestExecutor.mockRejectedValueOnce(new Error('upload failed'));

      await expect(manager.createBasemap(input, CTX)).rejects.toThrow('upload failed');
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(1);
    });

    it('propagates basemap persistence failures after a successful thumbnail upload', async () => {
      mockedRequestExecutor
        .mockResolvedValueOnce(axiosRes({ url: 'http://blob/thumb.png', width: 128, height: 128 }))
        .mockRejectedValueOnce(new Error('persist failed'));

      await expect(manager.createBasemap(input, CTX)).rejects.toThrow('persist failed');
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(2);
    });
  });

  describe('updateBasemap', () => {
    const inputWithNewThumbnail: UpdateBasemapInput = {
      name: 'renamed',
      isCurrent: true,
      isForPreview: false,
      layers: SAMPLE_LAYERS,
      thumbnailBase64: Buffer.from('new-bytes').toString('base64'),
      thumbnailContentType: 'image/webp',
    };

    const inputWithoutNewThumbnail: UpdateBasemapInput = {
      name: 'renamed',
      isCurrent: true,
      isForPreview: false,
      layers: SAMPLE_LAYERS,
    };

    it('uploads a new thumbnail when one is provided', async () => {
      mockedRequestExecutor
        .mockResolvedValueOnce(axiosRes({ url: 'http://blob/new.webp', width: 128, height: 128 }))
        .mockResolvedValueOnce(axiosRes(SAMPLE_BASEMAP));

      const result = await manager.updateBasemap('1', inputWithNewThumbnail, CTX);

      expect(result).toEqual(SAMPLE_BASEMAP);
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(2);
      const [thumbnailCall, updateCall] = mockedRequestExecutor.mock.calls;
      expect(thumbnailCall[0].url).toBe('http://basemap-api/basemaps/thumbnails');
      expect(updateCall[0].url).toBe('http://basemap-api/basemaps/1');
      expect(updateCall[1]).toBe('PUT');
      const body = updateCall[2].data as { thumbnail: unknown };
      expect(body.thumbnail).toEqual({ url: 'http://blob/new.webp', width: 128, height: 128 });
    });

    it('does not re-upload when no new thumbnail is provided, and keeps the existing thumbnail reference', async () => {
      const existingBasemap = { ...SAMPLE_BASEMAP, thumbnail: { url: 'http://blob/existing.png', width: 64, height: 64 } };
      mockedRequestExecutor
        .mockResolvedValueOnce(axiosRes(existingBasemap)) // GET existing basemap (to read its thumbnail)
        .mockResolvedValueOnce(axiosRes(SAMPLE_BASEMAP)); // PUT

      const result = await manager.updateBasemap('1', inputWithoutNewThumbnail, CTX);

      expect(result).toEqual(SAMPLE_BASEMAP);
      expect(mockedRequestExecutor).toHaveBeenCalledTimes(2);
      const [getCall, updateCall] = mockedRequestExecutor.mock.calls;
      expect(getCall[1]).toBe('GET');
      expect(getCall[0].url).toBe('http://basemap-api/basemaps/1');
      // Never hits /basemaps/thumbnails when no new thumbnailBase64 was given.
      expect(mockedRequestExecutor.mock.calls.some((call) => call[0].url.endsWith('/thumbnails'))).toBe(false);
      const body = updateCall[2].data as { thumbnail: unknown };
      expect(body.thumbnail).toEqual({ url: 'http://blob/existing.png', width: 64, height: 64 });
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
