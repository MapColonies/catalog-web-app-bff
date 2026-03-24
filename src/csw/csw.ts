import { get } from 'lodash';
import { inject, singleton } from 'tsyringe';
import { FilterField, ResultType } from '@map-colonies/csw-client';
import { Logger } from '@map-colonies/js-logger';
import { PycswLayerCatalogRecord, Pycsw3DCatalogRecord, PycswDemCatalogRecord, VectorBestMetadata, RecordType } from '@map-colonies/mc-model-types';
import { ProductType } from '@map-colonies/types';
import { CatalogRecordType, Services } from '../common/constants';
import { IConfig, IContext } from '../common/interfaces';
import { CSWCatalog, CSWCatalogs } from '../graphql/csw';
import { Domain } from '../graphql/domain';
import { SearchOptions } from '../graphql/inputTypes';
import { extractErrorMessage } from '../utils';
import { CswClientWrapper } from './cswClientWrapper';
import { CswWfsClientWrapper } from './CswWfsClientWrapper';

type SecondaryFilter = {
  recordType: RecordType;
  include: boolean;
};

type Entities = {
  main: RecordType;
  // If other record types exist in the same PYCSW,
  // you may want to retrieve them as well. They are duplicates of the
  // main record and are intended for viewing only.
  // secondary?: RecordType | RecordType[];
  secondary: SecondaryFilter[];
};

interface CswClient {
  instance: CswClientWrapper | CswWfsClientWrapper;
  entities: Entities;
}

type CswClients = Record<Domain, CswClient>;
const NOT_FOUND = -1;

@singleton()
export class CSW {
  public readonly cswClients: CswClients = {} as CswClients;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.cswClients.RASTER = {
      instance: new CswClientWrapper(
        'mc:MCRasterRecord',
        [...PycswLayerCatalogRecord.getPyCSWMappings()],
        'http://schema.mapcolonies.com/raster',
        this.config.get('csw.raster')
      ),
      entities: {
        main: RecordType.RECORD_RASTER,
        secondary: [],
      },
    };

    this.cswClients['3D'] = {
      instance: new CswClientWrapper(
        'mc:MC3DRecord',
        [...Pycsw3DCatalogRecord.getPyCSWMappings()],
        'http://schema.mapcolonies.com/3d',
        this.config.get('csw.3d')
      ),
      entities: {
        main: RecordType.RECORD_3D,
        secondary: [
          {
            recordType: RecordType.RECORD_DEM,
            include: false,
          },
        ],
      },
    };

    this.cswClients.DEM = {
      instance: new CswClientWrapper(
        'mc:MCDEMRecord',
        PycswDemCatalogRecord.getPyCSWMappings(),
        'http://schema.mapcolonies.com/dem',
        this.config.get('csw.dem')
      ),
      entities: {
        main: RecordType.RECORD_DEM,
        secondary: [],
      },
    };

    this.cswClients.VECTOR = {
      instance: new CswWfsClientWrapper(VectorBestMetadata.getWFSMappings(), this.config.get('wfs')),
      entities: {
        main: RecordType.RECORD_VECTOR,
        secondary: [],
      },
    };
  }

  private entitiesFilter(secondaryFilters: SecondaryFilter[], baseFilterOpt?: SearchOptions): SearchOptions | undefined {
    const othersEntities = secondaryFilters.filter((sec) => {
      return sec.recordType !== RecordType.RECORD_ALL;
    });

    const filterWithEntities = othersEntities.map((entity) => {
      return {
        field: 'mc:type',
        [entity.include ? 'eq' : 'neq']: entity.recordType,
        ...(entity.include ? { or: true } : {}),
      };
    }) as FilterField[];

    const updatedFilter = {
      ...baseFilterOpt,
      filter: [...(baseFilterOpt?.filter ?? []), ...filterWithEntities],
      ...(baseFilterOpt?.sort ? { sort: baseFilterOpt?.sort } : {}),
    };

    return updatedFilter;
  }

  public async getRecordsResponse(ctx: IContext, resultType?: ResultType, start?: number, end?: number, opts?: SearchOptions): Promise<CSWCatalogs> {
    this.logger.info(
      `[CSW][getRecords] options: ${JSON.stringify(opts)}, start: ${String(start ?? '')}, end: ${String(end ?? '')}, resultType: ${resultType}`
    );

    /* TODO: remove when ORTHOPHOTO_HISTORY will be revealed in UI in proper place */
    const rasterOpts: SearchOptions = {
      filter: [
        ...(opts?.filter?.map((filterField) => ({
          ...filterField,
          field: filterField.field === 'mc:insertDate' ? 'mc:ingestionDate' : filterField.field,
        })) ?? []),
        {
          field: 'mc:productType',
          neq: ProductType.ORTHOPHOTO_HISTORY,
        },
      ],
      sort: opts?.sort,
    };

    let returnedRecord: CSWCatalogs = {};
    const typeFilterIdx = opts?.filter?.findIndex((item) => item.field === 'mc:type') as number;

    if (typeFilterIdx > NOT_FOUND) {
      const fetchRecordType = get(opts?.filter, `[${typeFilterIdx}].eq`) as keyof typeof RecordType;
      const recordType = RecordType[fetchRecordType];

      const domain = this.recordTypeToDomain(recordType);

      returnedRecord = {
        [`_${domain}`]: await this.fetchRecords(domain, ctx, resultType, start, end, opts, rasterOpts),
      };
    }

    return returnedRecord;
  }

  public async getRecordsById(idList: string[], ctx: IContext): Promise<CatalogRecordType[]> {
    this.logger.info(`[CSW][getRecordsById] idList: ${JSON.stringify(idList)}`);

    const getRecords = [];
    getRecords.push(...this.getAllowedDomainsOfCswEntities().map(async (domain) => this.cswClients[domain].instance.getRecordsById(idList, ctx)));
    const data = await Promise.all(getRecords);
    return data.flat();
  }

  public async getDomain(domain: string, recType: RecordType, ctx: IContext): Promise<string[]> {
    this.logger.info(`[CSW][getDomain] domain: ${domain}, entity: ${recType}`);

    const clientType = this.recordTypeToDomain(recType);
    const data = await this.cswClients[clientType].instance.getDomain(domain, ctx);
    return data;
  }

  private recordTypeToDomain(recordType: RecordType): Domain {
    switch (recordType) {
      case RecordType.RECORD_DEM:
        return Domain.DEM;
      case RecordType.RECORD_3D:
        return Domain['3D'];
      case RecordType.RECORD_VECTOR:
        return Domain.VECTOR;
      default:
        return Domain.RASTER;
    }
  }

  private domainToRecordType(domain: Domain): RecordType {
    switch (domain) {
      case Domain.DEM:
        return RecordType.RECORD_DEM;
      case Domain['3D']:
        return RecordType.RECORD_3D;
      case Domain.VECTOR:
        return RecordType.RECORD_VECTOR;
      default:
        return RecordType.RECORD_RASTER;
    }
  }

  private getAllowedDomainsOfCswEntities(): Domain[] {
    const servedEntities = this.config.get<string>('servedEntityTypes').split(',');
    const allowedEntities = (Object.keys(this.cswClients) as (keyof CswClients)[]).filter((cswClient) => {
      return servedEntities.includes(this.domainToRecordType(cswClient).toString());
    });
    return allowedEntities;
  }

  private async fetchRecords(
    domain: Domain,
    ctx: IContext,
    resultType?: ResultType,
    start?: number,
    end?: number,
    filterOpts?: SearchOptions,
    rasterOpts?: SearchOptions
  ): Promise<CSWCatalog> {
    const baseOpts = domain === Domain.RASTER ? rasterOpts : filterOpts;
    try {
      const optionsForClient = this.entitiesFilter(this.cswClients[domain].entities.secondary, baseOpts);
      return await this.cswClients[domain].instance.getRecords(ctx, resultType, start, end, optionsForClient);
    } catch (err) {
      throw this.cswError(domain);
    }
  }

  private cswError(domain: Domain): Error {
    return new Error(`Failed to fetch records for catalog (${domain})`);
  }
}
