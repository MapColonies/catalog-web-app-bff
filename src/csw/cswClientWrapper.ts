import { CswClient, IRequestExecutor } from '@map-colonies/csw-client';
import { LayerMetadata } from '@map-colonies/mc-model-types';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { transform, mapKeys } from 'lodash';
import { CatalogRecordType } from '../common/constants';
import { GETRECORDS_START_INDEX, GETRECORDS_END_INDEX, GetRecordsOptions } from '../utils';

export class CswClientWrapper {
  private readonly typename: string;
  private readonly outputSchema: string;
  private readonly cswClient: CswClient;

  public constructor(typename: string, outputSchema: string, cswUrl: string, request?: IRequestExecutor) {
    this.typename = typename;
    this.outputSchema = outputSchema;
    const thisRequest = this.request.bind(this);
    this.cswClient = new CswClient(cswUrl, request ?? thisRequest);
  }

  public async getRecords(
    start: number = GETRECORDS_START_INDEX,
    end: number = GETRECORDS_END_INDEX,
    opts: GetRecordsOptions = {}
  ): Promise<CatalogRecordType[]> {
    // eslint-disable-next-line
    let data = (await this.cswClient.GetRecords(start, end, opts, this.outputSchema))?.[this.typename];
    data = Array.isArray(data) ? data : [data];
    const parsedData = this.transformRecordsToEntity(data);
    return parsedData;
  }

  private readonly transformRecordsToEntity = (cswArray: CatalogRecordType[]): CatalogRecordType[] => {
    const pyCSWKeys = LayerMetadata.getPyCSWMappings();

    const cswParsedArray = transform(
      cswArray,
      (result: Record<string, unknown>[], cswValue) => {
        const parsedKeys = mapKeys(cswValue, (value, key) => {
          const fixedKey = pyCSWKeys.find((cswMapping) => cswMapping.xmlElement === key)?.prop ?? key;
          return fixedKey;
        });
        result.push(parsedKeys);
      },
      []
    );
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
