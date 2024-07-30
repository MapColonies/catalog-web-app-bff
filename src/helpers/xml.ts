/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { convertToJson, getTraversalObj } from 'fast-xml-parser';
import { xmlParserOptions } from '../common/constants';
import { Capability, ResourceURL } from '../graphql/capability';

interface TileMatrixLimits {
  TileMatrix: string;
  MinTileRow: number;
  MaxTileRow: number;
  MinTileCol: number;
  MaxTileCol: number;
}

export const xmlToCapabilities = (idList: string[], xmlData: string): Capability[] => {
  const traversalObj = getTraversalObj(xmlData, xmlParserOptions);
  const jsonObj = convertToJson(traversalObj, xmlParserOptions);
  const tileMatrixSetMap = new Map();
  jsonObj?.Capabilities?.Contents?.TileMatrixSet?.forEach((tileMatrixSet: { [x: string]: any }) => {
    tileMatrixSetMap.set(
      tileMatrixSet['ows:Identifier'],
      tileMatrixSet.TileMatrix.map((tileMatrix: { [x: string]: any }) => String(tileMatrix['ows:Identifier']))
    );
  });
  const layerList = jsonObj?.Capabilities?.Contents?.Layer?.filter((layer: { [x: string]: any }) => idList.includes(layer['ows:Identifier']));
  const capabilityList: Capability[] = layerList?.map((layer: { [x: string]: any }) => ({
    id: layer['ows:Identifier'],
    style: layer.Style.map((style: { [x: string]: any }) => {
      const isDefault = style.attr?.isDefault;
      return { value: style['ows:Identifier'], ...(isDefault === 'true' ? { isDefault } : {}) };
    }),
    format: layer.Format,
    tileMatrixSet: layer.TileMatrixSetLink.map((link: { TileMatrixSet: string[]; TileMatrixSetLimits: Record<string, unknown> }) => {
      // Because we use fast-xml-parser 3.x the TAG arrayMode definition is cross XML.
      // In 4.x we can define how the TAG behaves in different nesting levels (by xPath)
      const tileMatrixSetID = link.TileMatrixSet[0]; // Because of cross XML TAG definition, rather then WMTS schema
      const tileMatrixLabels =
        link.TileMatrixSetLimits !== undefined
          ? (link.TileMatrixSetLimits.TileMatrixLimits as TileMatrixLimits[]).map((tileMatrixLimits: TileMatrixLimits) => tileMatrixLimits.TileMatrix)
          : tileMatrixSetMap.get(tileMatrixSetID);
      return {
        tileMatrixSetID,
        tileMatrixLabels,
      };
    }),
    url: layer.ResourceURL.map((resourceURL: { attr: ResourceURL }) => resourceURL.attr).filter(
      (resource: { resourceType: string }) => resource.resourceType === 'tile'
    ),
  }));
  return capabilityList ?? [];
};

export const compactXML = (xmlStr: string): string => {
  return xmlStr
    .replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, '')
    .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns')
    .replace(/>\s{0,}</g, '><');
};
