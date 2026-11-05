/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/naming-convention -- field names dictated by the OGC WMTS capabilities XML schema */
import { convertToJson, getTraversalObj } from 'fast-xml-parser';
import { Logger } from '@map-colonies/js-logger';
import { CapabilitySchema } from '@map-colonies/types';
import { xmlParserOptions } from '../common/constants';
import { CapabilityType, ResourceURLType } from '../graphql/capability';

interface TileMatrixLimits {
  TileMatrix: string;
  MinTileRow: number;
  MaxTileRow: number;
  MinTileCol: number;
  MaxTileCol: number;
}

export const xmlToCapabilities = (idList: string[], xmlData: string, logger: Logger): CapabilityType[] => {
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
  const candidates: unknown[] =
    layerList?.map((layer: { [x: string]: any }) => ({
      id: layer['ows:Identifier'],
      style: layer.Style.map((style: { [x: string]: any }) => {
        const isDefault: string | undefined = style.attr?.isDefault;
        return { value: style['ows:Identifier'], isDefault: isDefault === 'true' ? isDefault : null };
      }),
      format: layer.Format,
      tileMatrixSet: layer.TileMatrixSetLink.map((link: { TileMatrixSet: string[]; TileMatrixSetLimits: Record<string, unknown> }) => {
        // Because we use fast-xml-parser 3.x the TAG arrayMode definition is cross XML.
        // In 4.x we can define how the TAG behaves in different nesting levels (by xPath)
        const tileMatrixSetID = link.TileMatrixSet[0]; // Because of cross XML TAG definition, rather then WMTS schema
        const tileMatrixLabels =
          link.TileMatrixSetLimits !== undefined
            ? (link.TileMatrixSetLimits.TileMatrixLimits as TileMatrixLimits[]).map(
                (tileMatrixLimits: TileMatrixLimits) => tileMatrixLimits.TileMatrix
              )
            : tileMatrixSetMap.get(tileMatrixSetID);
        return {
          tileMatrixSetID,
          tileMatrixLabels,
        };
      }),
      url: layer.ResourceURL.map((resourceURL: { attr: ResourceURLType }) => resourceURL.attr).filter(
        (resource: { resourceType: string }) => resource.resourceType === 'tile'
      ),
    })) ?? [];

  const valid: CapabilityType[] = [];
  let failedCount = 0;
  candidates.forEach((candidate) => {
    const result = CapabilitySchema.safeParse(candidate);
    if (result.success) {
      valid.push(result.data);
    } else {
      failedCount += 1;
      const id = (candidate as { id?: unknown }).id;
      logger.warn(`[xmlToCapabilities] capability "${String(id)}" failed schema validation and was dropped: ${result.error.message}`);
    }
  });
  if (candidates.length > 0 && failedCount === candidates.length) {
    logger.error(
      `[xmlToCapabilities] all ${failedCount}/${candidates.length} capabilities failed schema validation - possible contract mismatch with @map-colonies/types`
    );
  }

  return valid;
};

export const compactXML = (xmlStr: string): string => {
  /* eslint-disable */
  return xmlStr
    .replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, '')
    .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns')
    .replace(/>\s{0,}</g, '><');
  /* eslint-enable */
};
