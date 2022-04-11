//import { getTraversalObj, convertToJson } from 'fast-xml-parser';
import { Logger } from '@map-colonies/js-logger';
import { Capability } from '../../graphql/capability';
import { LayerSearchParams } from '../../graphql/inputTypes';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
//import { options } from '../constants';
import { ICapabilitiesManagerService } from './capabilities-manager.interface';

export class CapabilitiesManagerDem implements ICapabilitiesManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('mapServices.dem.url');
  }

  public async getCapabilities(params: LayerSearchParams): Promise<Capability> {
    const response = await requestHandler(`${this.serviceURL}`, 'GET', {});
    // const traversalObj = getTraversalObj(response.data as string, options);
    // const jsonObj = convertToJson(traversalObj, options);
    // const result = jsonObj['csw:GetRecordsResponse']['csw:SearchResults'];
    // const records =
    //   result['mc:MCDEMRecord'] === undefined
    //     ? []
    //     : // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //       result['mc:MCDEMRecord'].map((record: any) => ({
    //         coverageId: record['mc:coverageID'],
    //         resolution: record['mc:resolutionMeter'],
    //         imagingEndDate: record['mc:imagingTimeEndUTC'],
    //         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //         // bbox: owsBoundingBoxToBbox({
    //         //   lowerCorner: record['ows:BoundingBox']['ows:LowerCorner'],
    //         //   upperCorner: record['ows:BoundingBox']['ows:UpperCorner'],
    //         // }),
    //       }));
    return {
      id: '',//result['attr']['Identifier'],
      style: '',//result['attr']['Style'],
      format: [''],//result['attr']['Format'],
      tileMatrixSet: [''],//result['attr']['TileMatrixSetId'],
    };
  }
}
