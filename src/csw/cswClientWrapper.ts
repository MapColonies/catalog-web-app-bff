import { CswClient, IRequestExecutor } from '@map-colonies/csw-client';
import { IPropPYCSWMapping } from '@map-colonies/mc-model-types';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { CheckResultAndHandleErrors } from 'graphql-tools';
import { transform, mapKeys } from 'lodash';
import { CatalogRecordType } from '../common/constants';
import { SearchOptions } from '../graphql/inputTypes';
import { GETRECORDS_START_INDEX, GETRECORDS_END_INDEX } from '../utils';

export class CswClientWrapper {
  private readonly typename: string;
  private readonly outputSchema: string;
  private readonly cswClient: CswClient;
  private readonly pyCSWKeys: IPropPYCSWMapping[];

  public constructor(typename: string, pyCSWKeys: IPropPYCSWMapping[], outputSchema: string, cswUrl: string, request?: IRequestExecutor) {
    this.typename = typename;
    this.outputSchema = outputSchema;
    const thisRequest = this.request.bind(this);
    this.cswClient = new CswClient(cswUrl, request ?? thisRequest);
    this.pyCSWKeys = pyCSWKeys;
  }

  public async getRecords(
    start: number = GETRECORDS_START_INDEX,
    end: number = GETRECORDS_END_INDEX,
    opts: SearchOptions = {}
  ): Promise<CatalogRecordType[]> {
    // eslint-disable-next-line
    let data = (await this.cswClient.GetRecords(start, end, opts, this.outputSchema))?.[this.typename];
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
        result.push(parsedKeys);
      },
      []
    );
    //@ts-ignore
    return cswParsedArray;
  };

  private async request(url: string, method: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
    return axios
      .request({ url, method: method as Method, ...params })
      .then((res) => res)
      .catch((error) => {
        throw error;
      });
  }
}
