import { Logger } from '@map-colonies/js-logger';
import {
  PycswLayerCatalogRecord,
  PycswBestCatalogRecord,
  Pycsw3DCatalogRecord,
  PycswDEMCatalogRecord,
  RecordType,
  IPropPYCSWMapping,
  ProductType,
} from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { get, intersection } from 'lodash';
import { CatalogRecordType, Services } from '../common/constants';
import { IConfig } from '../common/interfaces';
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
  private readonly cswClients: CswClients = {} as CswClients;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.cswClients.RASTER = {
      instance: new CswClientWrapper(
        'mc:MCRasterRecord',
        [...PycswLayerCatalogRecord.getPyCSWMappings(), ...(PycswBestCatalogRecord.getPyCSWMappings() as IPropPYCSWMapping[])],
        'http://schema.mapcolonies.com/raster',
        this.config.get('csw.raster.url')
      ),
      entities: [RecordType.RECORD_RASTER],
    };

    this.cswClients['3D'] = {
      instance: new CswClientWrapper(
        'mc:MC3DRecord',
        Pycsw3DCatalogRecord.getPyCSWMappings(),
        'http://schema.mapcolonies.com/3d',
        this.config.get('csw.3d.url')
      ),
      entities: [RecordType.RECORD_3D],
    };

    this.cswClients.DEM = {
      instance: new CswClientWrapper(
        'mc:MCDEMRecord',
        PycswDEMCatalogRecord.getPyCSWMappings(),
        'http://schema.mapcolonies.com/dem',
        this.config.get('csw.dem.url')
      ),
      entities: [RecordType.RECORD_DEM],
    };
  }

  public async getRecords(start?: number, end?: number, opts?: SearchOptions): Promise<CatalogRecordType[]> {
    /*  TODO: range of elements (start-end) is per CSW-client-instance. */
    const getRecords = [];
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

    /*  TODO: remove when ORTHOPHOTO_HISTORY will be revealed in UI in proper place */
    const rasterOpts = {
      filter: [
        ...newOpts.filter,
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
              return client.entities.includes(RecordType.RECORD_RASTER)
                ? client.instance.getRecords(start, end, rasterOpts)
                : client.instance.getRecords(start, end, newOpts);
            })
          );
          break;
        case RecordType.RECORD_RASTER:
          getRecords.push(this.cswClients.RASTER.instance.getRecords(start, end, rasterOpts));
          break;
        case RecordType.RECORD_3D:
          getRecords.push(this.cswClients['3D'].instance.getRecords(start, end, newOpts));
          break;
        case RecordType.RECORD_DEM:
          getRecords.push(this.cswClients.DEM.instance.getRecords(start, end, newOpts));
          break;
      }
    } else {
      getRecords.push(...this.getEntitiesCswInstances().map(async (client) => client.instance.getRecords(start, end, newOpts)));
    }

    const data = await Promise.all(getRecords);
    // console.log('\n\n******** Response: ********\n', JSON.stringify(data.flat()), '\n\n\n\n');
    return data.flat();
  }

  public async getRecordsById(idList: string[]): Promise<CatalogRecordType[]> {
    const getRecords = [];
    getRecords.push(...this.getEntitiesCswInstances().map(async (client) => client.instance.getRecordsById(idList)));
    const data = await Promise.all(getRecords);
    return data.flat();
  }

  public async getDomain(domain: string, recType: RecordType): Promise<string[]> {
    const clientType = this.recordTypeToEntity(recType);
    const data = await this.cswClients[clientType].instance.getDomain(domain);
    return data;
  }

  private recordTypeToEntity(recType: RecordType): CatalogRecordItems {
    switch (recType) {
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
