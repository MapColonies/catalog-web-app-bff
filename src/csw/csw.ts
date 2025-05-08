import { Logger } from '@map-colonies/js-logger';
import { FilterField } from '@map-colonies/csw-client';
import {
  PycswLayerCatalogRecord,
  Pycsw3DCatalogRecord,
  PycswDemCatalogRecord,
  PycswQuantizedMeshBestCatalogRecord,
  RecordType,
  IPropPYCSWMapping,
  VectorBestMetadata,
} from '@map-colonies/mc-model-types';
import { ProductType } from '@map-colonies/types';
import { inject, singleton } from 'tsyringe';
import { get, intersection } from 'lodash';
import { CatalogRecordType, Services } from '../common/constants';
import { IConfig, IContext } from '../common/interfaces';
import { SearchOptions } from '../graphql/inputTypes';
import { CatalogRecordItems } from '../utils';
import { CswClientWrapper } from './cswClientWrapper';
import { CswWfsClientWrapper } from './wfsClientWrapper';

interface CswClient {
  instance: CswClientWrapper | CswWfsClientWrapper;
  entities: RecordType[];
}

type CswClients = Record<CatalogRecordItems, CswClient>;
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
      entities: [RecordType.RECORD_RASTER],
    };

    this.cswClients['3D'] = {
      instance: new CswClientWrapper(
        'mc:MC3DRecord',
        [...Pycsw3DCatalogRecord.getPyCSWMappings(), ...(PycswQuantizedMeshBestCatalogRecord.getPyCSWMappings() as IPropPYCSWMapping[])],
        'http://schema.mapcolonies.com/3d',
        this.config.get('csw.3d')
      ),
      entities: [RecordType.RECORD_3D],
    };

    this.cswClients.DEM = {
      instance: new CswClientWrapper(
        'mc:MCDEMRecord',
        PycswDemCatalogRecord.getPyCSWMappings(),
        'http://schema.mapcolonies.com/dem',
        this.config.get('csw.dem')
      ),
      entities: [RecordType.RECORD_DEM],
    };

    this.cswClients.VECTOR = {
      instance: new CswWfsClientWrapper(VectorBestMetadata.getWFSMappings(), this.config.get('csw.vector')),
      entities: [RecordType.RECORD_VECTOR],
    };
  }

  public async getRecords(ctx: IContext, start?: number, end?: number, opts?: SearchOptions): Promise<CatalogRecordType[]> {
    this.logger.info(
      `[CSW][getRecords] getting records. start: ${start?.toString() as string}, end: ${end?.toString() as string}, options: ${JSON.stringify(opts)}.`
    );

    const getCatalogs: Promise<CatalogRecordType[]>[] = [];
    const typeFilterIdx = opts?.filter?.findIndex((item) => item.field === 'mc:type') as number;
    const newOpts: SearchOptions = {
      filter:
        typeFilterIdx > NOT_FOUND
          ? // @ts-ignore
            [...opts?.filter?.filter((item) => item.field !== 'mc:type')]
          : opts?.filter
          ? [...opts.filter]
          : undefined,
      // @ts-ignore
      sort: opts?.sort ? [...opts.sort] : undefined,
    };

    /* TODO: remove when ORTHOPHOTO_HISTORY will be revealed in UI in proper place */
    const rasterOpts = {
      filter: [
        ...(newOpts.filter as FilterField[]).map((filterField) => {
          return {
            ...filterField,
            field: filterField.field === 'mc:insertDate' ? 'mc:ingestionDate' : filterField.field,
          };
        }),
        {
          field: 'mc:productType',
          neq: ProductType.ORTHOPHOTO_HISTORY,
        },
      ],
      sort: newOpts.sort,
    };

    if (typeFilterIdx > NOT_FOUND) {
      const fetchRecordType = get(opts?.filter, `[${typeFilterIdx}].eq`) as keyof typeof RecordType;
      const catalog: CatalogRecordItems = this.recordTypeToEntity(RecordType[fetchRecordType]);
      switch (RecordType[fetchRecordType]) {
        case RecordType.RECORD_ALL:
          getCatalogs.push(
            ...this.getEntitiesCswInstances().map(async (client) => {
              try {
                return client.entities.includes(RecordType.RECORD_RASTER)
                  ? await client.instance.getRecords(ctx, start, end, rasterOpts)
                  : await client.instance.getRecords(ctx, start, end, newOpts);
              } catch (error) {
                throw this.cswError(client);
              }
            })
          );
          break;
        case RecordType.RECORD_RASTER:
          getCatalogs.push(this.fetchRecords(this.cswClients[catalog].instance, catalog, ctx, start, end, rasterOpts));
          this.addVectorRecordIfExist(getCatalogs, catalog, ctx, newOpts, opts, start, end);
          break;
        case RecordType.RECORD_3D:
        case RecordType.RECORD_DEM:
          getCatalogs.push(this.fetchRecords(this.cswClients[catalog].instance, catalog, ctx, start, end, newOpts));
          this.addVectorRecordIfExist(getCatalogs, catalog, ctx, newOpts, opts, start, end);
          break;
        case RecordType.RECORD_VECTOR:
          this.addVectorRecordIfExist(getCatalogs, catalog, ctx, newOpts, opts, start, end);
          break;
      }
    } else {
      getCatalogs.push(
        ...this.getEntitiesCswInstances().map(async (client) => {
          try {
            return await client.instance.getRecords(ctx, start, end, newOpts);
          } catch (error) {
            throw this.cswError(client);
          }
        })
      );
    }

    const data = await Promise.all(getCatalogs);
    return data.flat();
  }

  private addVectorRecordIfExist(
    getCatalogs: Promise<CatalogRecordType[]>[],
    catalog: CatalogRecordItems,
    ctx: IContext,
    searchOptions: SearchOptions,
    opts?: SearchOptions,
    start?: number,
    end?: number
  ) {
    const isIncludeVector = this.getEntitiesCswInstances().some((client) => client.entities.includes(RecordType.RECORD_VECTOR));

    if (opts && opts.filter && opts?.filter?.length < 2 && isIncludeVector) {
      getCatalogs.push(this.fetchRecords(this.cswClients[CatalogRecordItems.VECTOR].instance, catalog, ctx, start, end, searchOptions));
    }
  }

  public async getRecordsById(idList: string[], ctx: IContext): Promise<CatalogRecordType[]> {
    this.logger.info(`[CSW][getRecordsById] getting records by id, idList: ${JSON.stringify(idList)}`);

    const getRecords = [];
    getRecords.push(...this.getEntitiesCswInstances().map(async (client) => client.instance.getRecordsById(idList, ctx)));
    const data = await Promise.all(getRecords);
    return data.flat();
  }

  public async getDomain(domain: string, recType: RecordType, ctx: IContext): Promise<string[]> {
    this.logger.info(`[CSW][getDomain] getting domain ${domain}, for entity ${recType}`);

    const clientType = this.recordTypeToEntity(recType);
    const data = await this.cswClients[clientType].instance.getDomain(domain, ctx);
    return data;
  }

  private recordTypeToEntity(recordType: RecordType): CatalogRecordItems {
    switch (recordType) {
      case RecordType.RECORD_DEM:
        return CatalogRecordItems.DEM;
      case RecordType.RECORD_3D:
        return CatalogRecordItems['3D'];
      case RecordType.RECORD_VECTOR:
        return CatalogRecordItems.VECTOR;
      default:
        return CatalogRecordItems.RASTER;
    }
  }

  private getEntitiesCswInstances(): CswClient[] {
    const servedEntities = this.config.get<string>('servedEntityTypes').split(',');
    return Object.values(this.cswClients).filter((cswClient) => {
      return intersection(cswClient.entities, servedEntities).length > 0;
    });
  }

  private async fetchRecords(
    instance: CswClientWrapper | CswWfsClientWrapper,
    catalog: CatalogRecordItems,
    ctx: IContext,
    start?: number,
    end?: number,
    options?: SearchOptions
  ): Promise<CatalogRecordType[]> {
    try {
      return await instance.getRecords(ctx, start, end, options);
    } catch (error) {
      throw new Error(`Failed to fetch ${catalog} records`);
    }
  }

  private cswError(client: CswClient): Error {
    const catalog = this.recordTypeToEntity(client.entities[0]);
    return new Error(`Failed to fetch records for at least one of the catalogs (${catalog})`);
  }
}
