import { Logger } from '@map-colonies/js-logger';
import { xmlToCapabilities } from '../../../src/helpers/xml';

const mockLogger = { info: jest.fn(), debug: jest.fn(), error: jest.fn(), warn: jest.fn() } as unknown as Logger;

const DOC_HEADER = `<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" version="1.0.0">`;

const VALID_DEFAULT_LAYER = `
  <Layer>
    <ows:Identifier>valid-default</ows:Identifier>
    <Style isDefault="true"><ows:Identifier>default</ows:Identifier></Style>
    <Format>image/jpeg</Format>
    <TileMatrixSetLink><TileMatrixSet>WorldCRS84</TileMatrixSet></TileMatrixSetLink>
    <ResourceURL format="image/jpeg" resourceType="tile" template="https://mapproxy/wmts/valid-default/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.jpeg"/>
  </Layer>`;

const VALID_NON_DEFAULT_LAYER = `
  <Layer>
    <ows:Identifier>valid-non-default</ows:Identifier>
    <Style><ows:Identifier>default</ows:Identifier></Style>
    <Format>image/png</Format>
    <TileMatrixSetLink><TileMatrixSet>WorldCRS84</TileMatrixSet></TileMatrixSetLink>
    <ResourceURL format="image/png" resourceType="tile" template="https://mapproxy/wmts/valid-non-default/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png"/>
  </Layer>`;

// No <Format> element at all - produces a `format: undefined` candidate, which fails CapabilitySchema (format is a required array).
const INVALID_MISSING_FORMAT_LAYER = `
  <Layer>
    <ows:Identifier>invalid-missing-format</ows:Identifier>
    <Style><ows:Identifier>default</ows:Identifier></Style>
    <TileMatrixSetLink><TileMatrixSet>WorldCRS84</TileMatrixSet></TileMatrixSetLink>
    <ResourceURL format="image/png" resourceType="tile" template="https://mapproxy/wmts/invalid/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png"/>
  </Layer>`;

const DOC_TILE_MATRIX_SET = `
  <TileMatrixSet>
    <ows:Identifier>WorldCRS84</ows:Identifier>
    <TileMatrix><ows:Identifier>0</ows:Identifier></TileMatrix>
    <TileMatrix><ows:Identifier>1</ows:Identifier></TileMatrix>
  </TileMatrixSet>`;

function doc(...layers: string[]): string {
  return `${DOC_HEADER}<Contents>${layers.join('')}${DOC_TILE_MATRIX_SET}</Contents></Capabilities>`;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('xmlToCapabilities', () => {
  it('returns a default style with isDefault "true"', () => {
    const result = xmlToCapabilities(['valid-default'], doc(VALID_DEFAULT_LAYER), mockLogger);

    expect(result).toEqual([expect.objectContaining({ id: 'valid-default', style: [{ value: 'default', isDefault: 'true' }] })]);
  });

  it('returns a non-default style with isDefault null (not omitted) - matches the shared CapabilitySchema', () => {
    const result = xmlToCapabilities(['valid-non-default'], doc(VALID_NON_DEFAULT_LAYER), mockLogger);

    expect(result).toEqual([expect.objectContaining({ id: 'valid-non-default', style: [{ value: 'default', isDefault: null }] })]);
    expect(mockLogger.warn).not.toHaveBeenCalled();
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('drops an individual capability that fails schema validation, logging a warning with its id, while keeping valid ones', () => {
    const result = xmlToCapabilities(
      ['valid-default', 'valid-non-default', 'invalid-missing-format'],
      doc(VALID_DEFAULT_LAYER, VALID_NON_DEFAULT_LAYER, INVALID_MISSING_FORMAT_LAYER),
      mockLogger
    );

    expect(result.map((capability) => capability.id)).toEqual(['valid-default', 'valid-non-default']);
    expect(mockLogger.warn).toHaveBeenCalledTimes(1);
    expect(mockLogger.warn).toHaveBeenCalledWith(expect.stringContaining('invalid-missing-format'));
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('emits a single error summary (in addition to the per-item warning) when every capability in the batch fails validation', () => {
    const result = xmlToCapabilities(['invalid-missing-format'], doc(INVALID_MISSING_FORMAT_LAYER), mockLogger);

    expect(result).toEqual([]);
    expect(mockLogger.warn).toHaveBeenCalledTimes(1);
    expect(mockLogger.error).toHaveBeenCalledTimes(1);
    expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('1/1'));
  });

  it('returns an empty list without warning or error when no layer matches the requested ids', () => {
    const result = xmlToCapabilities(['does-not-exist'], doc(VALID_DEFAULT_LAYER), mockLogger);

    expect(result).toEqual([]);
    expect(mockLogger.warn).not.toHaveBeenCalled();
    expect(mockLogger.error).not.toHaveBeenCalled();
  });
});
