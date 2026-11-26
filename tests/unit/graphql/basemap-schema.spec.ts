/* eslint-disable @typescript-eslint/naming-convention -- __typename is dictated by GraphQL */
import 'reflect-metadata';
import { graphql, GraphQLNamedType, GraphQLSchema, printType } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import { container } from 'tsyringe';
import { BasemapManager } from '../../../src/common/basemap-manager/basemap-manager';
import { Services } from '../../../src/common/constants';
import { BasemapResolver } from '../../../src/graphql/resolvers/basemap.resolver';

const REST_BASEMAP = {
  id: 'b1',
  name: 'basemap',
  thumbnail: { url: 'http://blob/thumb.png', width: 128, height: 128 },
  isCurrent: true,
  isForPreview: false,
  layers: [
    {
      id: 'resolved',
      order: 0,
      opacity: 1,
      source: {
        type: 'CATALOG_RESOURCE',
        domain: 'RASTER',
        uniqueness: { productId: 'prod-1', productType: 'Orthophoto' },
        status: 'RESOLVED',
        layer: { id: 'record-1', productId: 'prod-1', productType: 'Orthophoto', productName: 'France' },
        capabilities: {
          id: 'prod-1-Orthophoto',
          style: [{ value: 'default', isDefault: 'true' }],
          format: ['image/jpeg'],
          tileMatrixSet: [],
          url: [],
        },
      },
    },
    {
      id: 'unresolved',
      order: 1,
      opacity: 1,
      source: {
        type: 'CATALOG_RESOURCE',
        domain: 'RASTER',
        uniqueness: { productId: 'gone', productType: 'OrthophotoBest' },
        status: 'UNRESOLVED',
        layer: null,
        capabilities: null,
      },
    },
    {
      id: 'external',
      order: 2,
      opacity: 0.5,
      source: { type: 'EXTERNAL', status: 'RESOLVED', details: { protocol: 'XYZ', name: 'osm', url: 'http://tiles/{z}/{x}/{y}' } },
    },
  ],
};

const QUERY = `{
  basemaps {
    id
    layers {
      id
      source {
        __typename
        ... on CatalogResourceSource { type domain status uniqueness { productId productType } layer { id productType } capabilities { id format } }
        ... on ExternalLayerSource { type status details { protocol name url } }
      }
    }
  }
}`;

describe('Basemap GraphQL schema', () => {
  let schema: GraphQLSchema;

  const createBasemap = jest.fn().mockResolvedValue(REST_BASEMAP);

  beforeAll(() => {
    container.register(Services.LOGGER, { useValue: { info: jest.fn(), error: jest.fn(), debug: jest.fn(), warn: jest.fn() } });
    container.register(BasemapManager, {
      useValue: { getBasemaps: jest.fn().mockResolvedValue([REST_BASEMAP]), createBasemap } as unknown as BasemapManager,
    });
    schema = buildSchemaSync({ resolvers: [BasemapResolver] });
  });

  it('resolves every output source variant by its type and serializes ProductType wire values to GraphQL enum names', async () => {
    const result = await graphql({ schema, source: QUERY, contextValue: { requestHeaders: {} } });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      basemaps: [
        {
          id: 'b1',
          layers: [
            {
              id: 'resolved',
              source: {
                __typename: 'CatalogResourceSource',
                type: 'CATALOG_RESOURCE',
                domain: 'RASTER',
                status: 'RESOLVED',
                uniqueness: { productId: 'prod-1', productType: 'ORTHOPHOTO' },
                layer: { id: 'record-1', productType: 'ORTHOPHOTO' },
                capabilities: { id: 'prod-1-Orthophoto', format: ['image/jpeg'] },
              },
            },
            {
              id: 'unresolved',
              source: {
                __typename: 'CatalogResourceSource',
                type: 'CATALOG_RESOURCE',
                domain: 'RASTER',
                status: 'UNRESOLVED',
                uniqueness: { productId: 'gone', productType: 'ORTHOPHOTO_BEST' },
                layer: null,
                capabilities: null,
              },
            },
            {
              id: 'external',
              source: {
                __typename: 'ExternalLayerSource',
                type: 'EXTERNAL',
                status: 'RESOLVED',
                details: { protocol: 'XYZ', name: 'osm', url: 'http://tiles/{z}/{x}/{y}' },
              },
            },
          ],
        },
      ],
    });
  });

  describe('createBasemap input', () => {
    const MUTATION = `mutation create($data: CreateBasemapInput!) { createBasemap(data: $data) { id } }`;
    const layer = (overrides: Record<string, unknown> = {}): Record<string, unknown> => ({
      id: 'l1',
      order: 0,
      opacity: 1,
      source: { type: 'CATALOG_RESOURCE', domain: 'RASTER', uniqueness: { productId: 'prod-1', productType: 'ORTHOPHOTO' } },
      ...overrides,
    });
    const data = (layers: Record<string, unknown>[]): Record<string, unknown> => ({
      name: 'b',
      isCurrent: false,
      isForPreview: false,
      layers,
      thumbnailBase64: 'AAAA',
      thumbnailContentType: 'image/png',
    });

    beforeEach(() => createBasemap.mockClear());

    it('maps the ProductType enum name to the wire value basemap-management stores and resolves against', async () => {
      const result = await graphql({ schema, source: MUTATION, variableValues: { data: data([layer()]) }, contextValue: { requestHeaders: {} } });

      expect(result.errors).toBeUndefined();
      expect(createBasemap.mock.calls).toMatchObject([
        // second argument is the GraphQL context
        [{ layers: [{ source: { uniqueness: { productId: 'prod-1', productType: 'Orthophoto' } } }] }, {}],
      ]);
    });

    it.each([
      [
        'a ProductType wire value instead of its enum name',
        layer({ source: { type: 'CATALOG_RESOURCE', domain: 'RASTER', uniqueness: { productType: 'Orthophoto' } } }),
      ],
      ['a non-integer order', layer({ order: 1.5 })],
    ])('rejects %s before reaching the manager', async (_label, invalidLayer) => {
      const result = await graphql({
        schema,
        source: MUTATION,
        variableValues: { data: data([invalidLayer]) },
        contextValue: { requestHeaders: {} },
      });

      expect(result.errors).toBeDefined();
      expect(createBasemap).not.toHaveBeenCalled();
    });
  });

  it('keeps the public basemap type contract (Int fields, ProductType enum, no generated-only types)', () => {
    const print = (name: string): string => printType(schema.getType(name) as GraphQLNamedType);

    expect(print('RasterUniqueness')).toContain('productType: ProductType');
    expect(print('RasterUniquenessInput')).toContain('productType: ProductType');
    expect(print('BasemapLayer')).toContain('order: Int!');
    expect(print('BasemapLayerInput')).toContain('order: Int!');
    expect(print('BasemapThumbnail')).toMatch(/width: Int!\s+height: Int!/);
    expect(print('ImportReviewLayer')).toContain('order: Int!');
    expect(print('ResourceResolutionStatus')).toMatch(/RESOLVED\s+UNRESOLVED/);
    expect(schema.getType('BasemapInput')).toBeUndefined();
    expect(schema.getType('BasemapThumbnailInput')).toBeUndefined();
  });
});
