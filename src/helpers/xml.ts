/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { convertToJson, getTraversalObj } from 'fast-xml-parser';
import { xmlParserOptions } from '../common/constants';
import { Capability, ResourceURL } from '../graphql/capability';

export const xmlToCapabilities = (idList: string[], xmlData: string): Capability[] => {
  const traversalObj = getTraversalObj(xmlData, xmlParserOptions);
  const jsonObj = convertToJson(traversalObj, xmlParserOptions);
  const tileMatrixSet = jsonObj?.Capabilities?.Contents?.TileMatrixSet?.map((tileMatrix: { [x: string]: any }) => {
    return {
      TileMatrixSetID: tileMatrix['ows:Identifier'],
      SupportedCRS: tileMatrix['ows:SupportedCRS'],
      TileMatrixLabels: tileMatrix.TileMatrix,
    };
  });
  const layerList = jsonObj?.Capabilities?.Contents?.Layer?.filter((layer: { [x: string]: any }) => idList.includes(layer['ows:Identifier']));
  const capabilityList: Capability[] = layerList?.map((layer: { [x: string]: any }) => ({
    id: layer['ows:Identifier'],
    style: layer['Style']['ows:Identifier'],
    format: layer['Format'],
    tileMatrixSet: layer['TileMatrixSetLink'].map((link: { TileMatrixSet: string; TileMatrixSetLimits: Record<string, unknown> }) => {
      const TileMatrixSetID = link.TileMatrixSet;
      const TileMatrixLabels =
        link.TileMatrixSetLimits?.TileMatrixLimits ??
        tileMatrixSet.find((tileMatrix: { [x: string]: any }) => tileMatrix.TileMatrixSetID === TileMatrixSetID)?.TileMatrixLabels;
      return {
        TileMatrixSetID,
        TileMatrixLabels,
      };
    }),
    url: layer['ResourceURL']
      .map((resourceURL: { attr: ResourceURL }) => resourceURL.attr)
      .filter((resource: { resourceType: string }) => resource.resourceType === 'tile'),
  }));
  return capabilityList ?? [];
};
