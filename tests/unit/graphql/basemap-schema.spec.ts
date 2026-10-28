/* eslint-disable @typescript-eslint/naming-convention -- __typename is dictated by GraphQL */
import 'reflect-metadata';
import { graphql, GraphQLSchema } from 'graphql';
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
        type: 'RESOLVED_CATALOG_RESOURCE',
        domain: 'RASTER',
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
      source: { type: 'UNRESOLVED_CATALOG_RESOURCE', domain: 'RASTER', uniqueness: { productId: 'gone', productType: 'OrthophotoBest' } },
    },
    {
      id: 'external',
      order: 2,
      opacity: 0.5,
      source: { type: 'EXTERNAL', details: { protocol: 'XYZ', name: 'osm', url: 'http://tiles/{z}/{x}/{y}' } },
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
        ... on ResolvedCatalogResourceSource { type domain layer { id productType } capabilities { id format } }
        ... on UnresolvedCatalogResourceSource { type domain uniqueness { productId productType } }
        ... on ExternalLayerSource { type details { protocol name url } }
      }
    }
  }
}`;

describe('Basemap GraphQL schema', () => {
  let schema: GraphQLSchema;

  beforeAll(() => {
    container.register(Services.LOGGER, { useValue: { info: jest.fn(), error: jest.fn(), debug: jest.fn(), warn: jest.fn() } });
    container.register(BasemapManager, { useValue: { getBasemaps: jest.fn().mockResolvedValue([REST_BASEMAP]) } as unknown as BasemapManager });
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
                __typename: 'ResolvedCatalogResourceSource',
                type: 'RESOLVED_CATALOG_RESOURCE',
                domain: 'RASTER',
                layer: { id: 'record-1', productType: 'ORTHOPHOTO' },
                capabilities: { id: 'prod-1-Orthophoto', format: ['image/jpeg'] },
              },
            },
            {
              id: 'unresolved',
              source: {
                __typename: 'UnresolvedCatalogResourceSource',
                type: 'UNRESOLVED_CATALOG_RESOURCE',
                domain: 'RASTER',
                uniqueness: { productId: 'gone', productType: 'ORTHOPHOTO_BEST' },
              },
            },
            {
              id: 'external',
              source: {
                __typename: 'ExternalLayerSource',
                type: 'EXTERNAL',
                details: { protocol: 'XYZ', name: 'osm', url: 'http://tiles/{z}/{x}/{y}' },
              },
            },
          ],
        },
      ],
    });
  });
});
