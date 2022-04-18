/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getTraversalObj, convertToJson } from 'fast-xml-parser';
import { Logger } from '@map-colonies/js-logger';
import { Capability } from '../../graphql/capability';
import MAP_SERVICE_MOCK_RESPONSE from '../../graphql/MOCKS/get-capabilities/DEM/GEOSERVER';
import { CapabilitiesLayerSearchParams } from '../../graphql/inputTypes';
import { requestHandlerWithToken } from '../../utils';
import { IConfig } from '../interfaces';
import { xmlParserOptions } from '../constants';
import { ICapabilitiesManagerService } from './capabilities-manager.interface';

export class CapabilitiesManagerDem implements ICapabilitiesManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('mapServices.dem.url');
  }

  public async getCapabilities(params: CapabilitiesLayerSearchParams): Promise<Capability | undefined> {
    const response = await requestHandlerWithToken(`${this.serviceURL}`, 'GET', {});
    // MOCK DATA - start
    // const response = await Promise.resolve(MAP_SERVICE_MOCK_RESPONSE);
    // MOCK DATA - end
    const traversalObj = getTraversalObj(response.data as string, xmlParserOptions);
    const jsonObj = convertToJson(traversalObj, xmlParserOptions);
    const layer = jsonObj.Capabilities.Contents.Layer.find((layer: { [x: string]: string }) => layer['ows:Identifier'] === params.id);
    if (layer === undefined) {
      return undefined;
    }
    return {
      id: layer['ows:Identifier'],
      style: layer['Style']['ows:Identifier'],
      format: layer['Format'],
      tileMatrixSet: layer['TileMatrixSetLink'].map((link: { TileMatrixSet: string }) => link.TileMatrixSet),
    };
  }
}
