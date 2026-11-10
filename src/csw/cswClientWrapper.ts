import { CswClient, IRequestExecutor, ResultType } from '@map-colonies/csw-client';
import { mcCswFieldRules, transformRecordsToEntity } from '@map-colonies/csw-client/adapters';
import { IPropPYCSWMapping } from '@map-colonies/mc-model-types';
import { get } from 'lodash';
import { CatalogRecordType } from '../common/constants';
import { SearchOptions } from '../graphql/inputTypes';
import { requestExecutor } from '../utils';
import { IContext, IService } from '../common/interfaces';
import { CSWCatalog } from '../graphql/csw';

export class CswClientWrapper {
  private readonly typename: string;
  private readonly outputSchema: string;
  private readonly pyCSWKeys: IPropPYCSWMapping[];
  private readonly cswService: IService;
  private readonly defaultRequestHandler?: IRequestExecutor;

  public constructor(typename: string, pyCSWKeys: IPropPYCSWMapping[], outputSchema: string, cswService: IService, request?: IRequestExecutor) {
    this.typename = typename;
    this.outputSchema = outputSchema;
    this.pyCSWKeys = pyCSWKeys;
    this.cswService = cswService;
    this.defaultRequestHandler = request;
  }

  public async getRecords(ctx: IContext, opts?: SearchOptions, start?: number, end?: number, resultType?: ResultType): Promise<CSWCatalog> {
    const cswClient = this.getCswClient(ctx);

    /* eslint-disable */
    const response = await cswClient.GetRecords(this.outputSchema, start, end, opts, resultType);
    let data = response?.[this.typename];
    const metadata = response.$;
    /* eslint-disable */

    if (data === undefined) {
      return {
        records: [],
        cswQuerySummary: metadata,
      };
    }
    data = Array.isArray(data) ? data : [data];
    const parsedData = transformRecordsToEntity<CatalogRecordType>(data, this.pyCSWKeys, mcCswFieldRules);
    return {
      records: parsedData,
      cswQuerySummary: metadata,
    };
  }

  public async getRecordsById(idList: string[], ctx: IContext): Promise<CatalogRecordType[]> {
    const cswClient = this.getCswClient(ctx);

    let data = (await cswClient.GetRecordsById(this.outputSchema, idList))?.[this.typename];
    if (data === undefined) {
      return [];
    }
    data = Array.isArray(data) ? data : [data];
    const parsedData = transformRecordsToEntity<CatalogRecordType>(data, this.pyCSWKeys, mcCswFieldRules);
    return parsedData;
  }

  public async getDomain(domain: string, ctx: IContext): Promise<string[]> {
    const cswClient = this.getCswClient(ctx);

    let domainResp = (await cswClient.GetDomain(domain))?.['csw:GetDomainResponse'];
    if (domainResp === undefined) {
      return [];
    }
    const valList = get(domainResp, 'domainValues[0].listOfValues.value') as Record<string, unknown>[];
    const parsedData = valList.map((val) => get(val, 'content[0]') as string);

    return parsedData;
  }

  private getCswClient(ctx: IContext): CswClient {
    const cswRequestHandlerFallback = async (url: string, method: string, params: Record<string, unknown>): Promise<unknown> =>
      requestExecutor(this.cswService, method, params, ctx);

    const cswClient = new CswClient('NOT_IN_USE.COM', this.defaultRequestHandler ?? cswRequestHandlerFallback);

    return cswClient;
  }
}
