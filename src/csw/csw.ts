import { Logger } from '@map-colonies/js-logger';
import { FilterField } from '@map-colonies/csw-client';
import {
  PycswLayerCatalogRecord,
  Pycsw3DCatalogRecord,
  PycswDemCatalogRecord,
  PycswVectorBestCatalogRecord,
  PycswQuantizedMeshBestCatalogRecord,
  RecordType,
  IPropPYCSWMapping,
  ProductType,
} from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { get, intersection } from 'lodash';
import { CatalogRecordType, Services } from '../common/constants';
import { IConfig, IContext } from '../common/interfaces';
import { SearchOptions } from '../graphql/inputTypes';
import { CatalogRecordItems } from '../utils';
import { CswClientWrapper } from './cswClientWrapper';

interface CswClient {
  instance: CswClientWrapper;
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
        [...PycswLayerCatalogRecord.getPyCSWMappings(), ...(PycswVectorBestCatalogRecord.getPyCSWMappings() as IPropPYCSWMapping[])],
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
  }

  public async getRecords(ctx: IContext, start?: number, end?: number, opts?: SearchOptions): Promise<CatalogRecordType[]> {
    this.logger.info(
      `[CSW][getRecords] getting records. start: ${start?.toString() as string}, end: ${end?.toString() as string}, options: ${JSON.stringify(opts)}.`
    );

    const getRecords: Promise<CatalogRecordType[]>[] = [];
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          neq: ProductType.ORTHOPHOTO_HISTORY,
        },
      ],
      sort: newOpts.sort,
    };

    if (typeFilterIdx > NOT_FOUND) {
      const fetchRecordType = get(opts?.filter, `[${typeFilterIdx}].eq`) as keyof typeof RecordType;
      switch (RecordType[fetchRecordType]) {
        case RecordType.RECORD_ALL:
          getRecords.push(
            ...this.getEntitiesCswInstances().map(async (client) => {
              try {
                return client.entities.includes(RecordType.RECORD_RASTER)
                  ? await client.instance.getRecords(ctx, start, end, rasterOpts)
                  : await client.instance.getRecords(ctx, start, end, newOpts);
              } catch (error) {
                const input = client.entities[0];
                throw new Error(`Failed to fetch records for at least one of the catalogs (${input.substring(input.lastIndexOf('_') + 1)})`);
              }
            })
          );
          break;
        case RecordType.RECORD_RASTER:
          getRecords.push(
            (async () => {
              try {
                return await this.cswClients.RASTER.instance.getRecords(ctx, start, end, rasterOpts);
              } catch (error) {
                throw new Error(`Failed to fetch RASTER records`);
              }
            })()
          );
          break;
        case RecordType.RECORD_3D:
          getRecords.push(
            (async () => {
              try {
                return await this.cswClients['3D'].instance.getRecords(ctx, start, end, newOpts);
              } catch (error) {
                throw new Error(`Failed to fetch 3D records`);
              }
            })()
          );
          break;
        case RecordType.RECORD_DEM:
          getRecords.push(
            (async () => {
              try {
                return await this.cswClients.DEM.instance.getRecords(ctx, start, end, newOpts);
              } catch (error) {
                throw new Error(`Failed to fetch DEM records`);
              }
            })()
          );
          break;
      }
    } else {
      getRecords.push(
        ...this.getEntitiesCswInstances().map(async (client) => {
          try {
            return await client.instance.getRecords(ctx, start, end, newOpts);
          } catch (error) {
            const input = client.entities[0];
            throw new Error(`Failed to fetch records for at least one of the catalogs (${input.substring(input.lastIndexOf('_') + 1)})`);
          }
        })
      );
    }

    const data = await Promise.all(getRecords);
    return data.flat();
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

  private recordTypeToEntity(recType: RecordType): CatalogRecordItems {
    switch (recType) {
      case RecordType.RECORD_DEM:
        return CatalogRecordItems.DEM;
      case RecordType.RECORD_3D:
        return CatalogRecordItems['3D'];
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
}
