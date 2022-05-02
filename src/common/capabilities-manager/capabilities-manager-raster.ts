/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getTraversalObj, convertToJson } from 'fast-xml-parser';
import { Logger } from '@map-colonies/js-logger';
import { Capability } from '../../graphql/capability';
// import MAP_SERVICE_MOCK_RESPONSE from '../../graphql/MOCKS/get-capabilities/RASTER/MAP-PROXY';
import { requestHandlerWithToken } from '../../utils';
import { IConfig } from '../interfaces';
import { xmlParserOptions } from '../constants';
import { ICapabilitiesManagerService } from './capabilities-manager.interface';

export class CapabilitiesManagerRaster implements ICapabilitiesManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('mapServices.raster.url');
  }

  public async getCapabilities(idList: string[]): Promise<Capability[]> {
    const response = await requestHandlerWithToken(`${this.serviceURL}`, 'GET', {});
    // MOCK DATA - start
    // const response = await Promise.resolve(MAP_SERVICE_MOCK_RESPONSE);
    // MOCK DATA - end
    const traversalObj = getTraversalObj(response.data as string, xmlParserOptions);
    const jsonObj = convertToJson(traversalObj, xmlParserOptions);
    const layerList = jsonObj.Capabilities.Contents.Layer.filter((layer: { [x: string]: any }) => idList.includes(layer['ows:Identifier']));
    const capabilityList: Capability[] = layerList.map((layer: { [x: string]: any }) => ({
      id: layer['ows:Identifier'],
      style: layer['Style']['ows:Identifier'],
      format: layer['Format'],
      tileMatrixSet: layer['TileMatrixSetLink'].map((link: { TileMatrixSet: string }) => link.TileMatrixSet),
    }));
    return capabilityList;
  }
}
