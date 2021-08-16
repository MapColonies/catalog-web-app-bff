import { CswClient, IRequestExecutor } from '@map-colonies/csw-client';
import { IPropPYCSWMapping, RecordType } from '@map-colonies/mc-model-types';
import { transform, mapKeys, mapValues, get } from 'lodash';
import { lineString } from '@turf/helpers';
import bbox from '@turf/bbox';
import bboxPolygon from '@turf/bbox-polygon';
import { Link } from '../AUTOGENERATED/GraphQLClass';
import { CatalogRecordType } from '../common/constants';
import { SearchOptions } from '../graphql/inputTypes';
import { requestHandler } from '../utils';

export class CswClientWrapper {
  private readonly typename: string;
  private readonly outputSchema: string;
  private readonly cswClient: CswClient;
  private readonly pyCSWKeys: IPropPYCSWMapping[];

  public constructor(typename: string, pyCSWKeys: IPropPYCSWMapping[], outputSchema: string, cswUrl: string, request?: IRequestExecutor) {
    this.typename = typename;
    this.outputSchema = outputSchema;
    this.cswClient = new CswClient(cswUrl, request ?? requestHandler);
    this.pyCSWKeys = pyCSWKeys;
  }

  public async getRecords(start?: number, end?: number, opts?: SearchOptions): Promise<CatalogRecordType[]> {
    // eslint-disable-next-line
    let data = (await this.cswClient.GetRecords(this.outputSchema, start, end, opts))?.[this.typename];
    if (data === undefined) {
      return [];
    }
    data = Array.isArray(data) ? data : [data];
    const parsedData = this.transformRecordsToEntity(data);
    return parsedData;
  }

  public async getRecordsById(idList: string[]): Promise<CatalogRecordType[]> {
    // eslint-disable-next-line
    let data = (await this.cswClient.GetRecordsById(this.outputSchema, idList))?.[this.typename];
    if (data === undefined) {
      return [];
    }
    data = Array.isArray(data) ? data : [data];
    const parsedData = this.transformRecordsToEntity(data);
    return parsedData;
  }

  private readonly transformRecordsToEntity = (cswArray: CatalogRecordType[]): CatalogRecordType[] => {
    const cswParsedArray = transform(
      cswArray,
      (result: Record<string, unknown>[], cswValue) => {
        const parsedKeys = mapKeys(cswValue, (value, key) => {
          const fixedKey = this.pyCSWKeys.find((cswMapping) => cswMapping.xmlElement === key)?.prop ?? key;
          return fixedKey;
        });
        const finalParsed = mapValues(parsedKeys, (val, key, obj) => {
          const recordType = get(obj, 'type') as RecordType;
          switch (key) {
            case 'footprint': {
              switch (recordType) {
                case RecordType.RECORD_3D: {
                  const lowercorner = (get(obj, "['ows:BoundingBox']['ows:LowerCorner']") as string).split(' ');
                  const uppercorner = (get(obj, "['ows:BoundingBox']['ows:UpperCorner']") as string).split(' ');
                  const line = lineString([
                    [parseFloat(lowercorner[1]), parseFloat(lowercorner[0])],
                    [parseFloat(uppercorner[1]), parseFloat(uppercorner[0])],
                  ]);
                  const boxPolygon = bboxPolygon(bbox(line)).geometry;
                  return boxPolygon;
                }
                case RecordType.RECORD_RASTER:
                  // eslint-disable-next-line
                  return JSON.parse(val as string);
                default:
                  return {};
              }
            }
            case 'layerPolygonParts': {
              switch (recordType) {
                case RecordType.RECORD_RASTER:
                  // eslint-disable-next-line
                  return JSON.parse(val as string);
                default:
                  return {};
              }
            }
            case 'discretes': {
              switch (recordType) {
                case RecordType.RECORD_RASTER:
                  // eslint-disable-next-line
                  return JSON.parse(val as string);
                default:
                  return undefined;
              }
            }
            case 'links': {
              const linksArr = Array.isArray(val) ? val : [val];
              const processedLinks = linksArr.map((item: any): Link => {
                return {
                  protocol: get(item, '$.scheme') as string,
                  url: get(item, '_') as string,
                };
              });
              return processedLinks;
            }
            case 'creationDate':
            case 'ingestionDate':
            case 'updateDate':
            case 'sourceDateStart':
            case 'sourceDateEnd':
            case 'insertDate':
            case 'validationDate':
              return new Date(val as string);
            case 'keywords':
              return val?.toString(); //might be an Array
            case 'sensorType':
              return val !== undefined ? (val as string).split(',') : [];
            default:
              return val;
          }
        });
        result.push(finalParsed);
      },
      []
    );
    //@ts-ignore
    return cswParsedArray;
  };
}
