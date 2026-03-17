import { Logger } from '@map-colonies/js-logger';
import { FilterField, ResultType } from '@map-colonies/csw-client';
import {
  PycswLayerCatalogRecord,
  Pycsw3DCatalogRecord,
  PycswDemCatalogRecord,
  PycswQuantizedMeshBestCatalogRecord,
  VectorBestMetadata,
  RecordType,
} from '@map-colonies/mc-model-types';
import { ProductType } from '@map-colonies/types';
import { inject, singleton } from 'tsyringe';
import { get } from 'lodash';
import { CatalogRecordType, Services } from '../common/constants';
import { IConfig, IContext } from '../common/interfaces';
import { Domain } from '../graphql/domain';
import { SearchOptions } from '../graphql/inputTypes';
import { CswClientWrapper, GetRecordsResponse } from './cswClientWrapper';
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
}

interface CswClient {
  instance: CswClientWrapper | CswWfsClientWrapper;
  entities: Entities;
}

type PromiseRecordsResponse = Partial<Record<Domain, Promise<GetRecordsResponse>>>;

export type RecordResponse = Partial<Record<Domain, GetRecordsResponse>>;

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
        secondary: []
      },
    };

    this.cswClients['3D'] = {
      instance: new CswClientWrapper(
        'mc:MC3DRecord',
        [...Pycsw3DCatalogRecord.getPyCSWMappings()], // check here if the mappings is correct and we should be taken from 3D only or from qmesh.
        'http://schema.mapcolonies.com/3d',
        this.config.get('csw.3d')
      ),
      entities: {
        main: RecordType.RECORD_3D,
        secondary: [
          {
            recordType: RecordType.RECORD_DEM,
            include: false
          }
        ]
      }
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
        secondary: []
      }
    };

    this.cswClients.VECTOR = {
      instance: new CswWfsClientWrapper(VectorBestMetadata.getWFSMappings(), this.config.get('wfs')),
      entities: {
        main: RecordType.RECORD_VECTOR,
        secondary: []
      }
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
        ...(entity.include ? { or: true } : {})
      }
    }) as FilterField[];

    const updatedFilter = {
      ...baseFilterOpt,
      filter: [
        ...(baseFilterOpt?.filter ?? []),
        ...filterWithEntities
      ],
      ...(baseFilterOpt?.sort ? { sort: baseFilterOpt?.sort } : {})
    };

    return updatedFilter;
  }

  public async getRecordsResponse(
    ctx: IContext,
    resultType?: ResultType,
    start?: number,
    end?: number,
    opts?: SearchOptions
  ): Promise<RecordResponse> {
    this.logger.info(
      `[CSW][getRecords] getting records. start: ${start?.toString() as string}, end: ${end?.toString() as string}, options: ${JSON.stringify(opts)}.`
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

    const promisesRecordsResponse: PromiseRecordsResponse = {};
    const typeFilterIdx = opts?.filter?.findIndex((item) => item.field === 'mc:type') as number;

    const fetchRecordAll = () => {
      const filterWithoutRecordAllOpt: SearchOptions = {
        ...opts,
        filter: (opts?.filter ?? []).filter(
          (filterField) => filterField.field !== 'mc:type'
        )
      };

      const rasterWithoutRecordAllOpts: SearchOptions = {
        ...rasterOpts,
        filter: (rasterOpts.filter ?? []).filter(
          (filterField) => filterField.field !== 'mc:type'
        )
      };

      for (const domain of this.getAllowedDomainsOfCswEntities()) {
        promisesRecordsResponse[domain] = this.fetchRecords(
          domain,
          ctx,
          resultType,
          start,
          end,
          {
            ...filterWithoutRecordAllOpt,
            filter: [
              ...(filterWithoutRecordAllOpt?.filter ?? []),
              {
                field: 'mc:type',
                eq: this.domainToRecordType(domain)
              }
            ]
          },
          {
            ...rasterWithoutRecordAllOpts,
            filter: [
              ...(rasterWithoutRecordAllOpts?.filter ?? []),
              {
                field: 'mc:type',
                eq: this.domainToRecordType(domain)
              }
            ]
          },
        );
      }
    };

    if (typeFilterIdx > NOT_FOUND) {
      const fetchRecordType = get(opts?.filter, `[${typeFilterIdx}].eq`) as keyof typeof RecordType;
      const recordType = RecordType[fetchRecordType];

      if (recordType === RecordType.RECORD_ALL) {
        fetchRecordAll();
      } else {
        const domain = this.recordTypeToDomain(recordType);

        promisesRecordsResponse[domain] = this.fetchRecords(
          domain,
          ctx,
          resultType,
          start,
          end,
          opts,
          rasterOpts
        );
      }
    } else {
      fetchRecordAll();
    }

    const entries = Object.entries(promisesRecordsResponse);

    const resolvedRecordsResponse = await Promise.all(
      entries.map(async ([domain, promise]) => {
        const res = await promise as GetRecordsResponse;
        return [domain, res] as [string, GetRecordsResponse];
      })
    );

    const resolvedCatalogs: RecordResponse = Object.fromEntries(resolvedRecordsResponse);

    return resolvedCatalogs;
  }

  public async getRecordsById(idList: string[], ctx: IContext): Promise<CatalogRecordType[]> {
    this.logger.info(`[CSW][getRecordsById] getting records by id, idList: ${JSON.stringify(idList)}`);

    const getRecords = [];
    getRecords.push(...this.getAllowedDomainsOfCswEntities().map(async (domain) => this.cswClients[domain].instance.getRecordsById(idList, ctx)));
    const data = await Promise.all(getRecords);
    return data.flat();
  }

  public async getDomain(domain: string, recType: RecordType, ctx: IContext): Promise<string[]> {
    this.logger.info(`[CSW][getDomain] getting domain ${domain}, for entity ${recType}`);

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

  private fetchRecords(
    domain: Domain,
    ctx: IContext,
    resultType?: ResultType,
    start?: number,
    end?: number,
    filterOpt?: SearchOptions,
    rasterOpts?: SearchOptions
  ): Promise<GetRecordsResponse> {
    const baseOpts = domain === Domain.RASTER ? rasterOpts : filterOpt;

    const optionsForClient = this.entitiesFilter(
      this.cswClients[domain].entities.secondary,
      baseOpts
    );

    try {
      return this.cswClients[domain].instance.getRecords(
        ctx,
        resultType,
        start,
        end,
        optionsForClient
      );
    } catch {
      throw this.cswError(domain);
    }
  }

  private cswError(domain: Domain): Error {
    return new Error(`Failed to fetch records for catalog (${domain})`);
  }
}
