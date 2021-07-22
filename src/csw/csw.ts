import { Logger } from '@map-colonies/js-logger';
import { PycswLayerCatalogRecord, PycswBestCatalogRecord, Pycsw3DCatalogRecord, RecordType, IPropPYCSWMapping } from '@map-colonies/mc-model-types';
import { inject, singleton } from 'tsyringe';
import { get } from 'lodash';
import { CatalogRecordType, Services } from '../common/constants';
import { IConfig } from '../common/interfaces';
import { SearchOptions } from '../graphql/inputTypes';
import { CatalogRecordItems } from '../utils';
import { CswClientWrapper } from './cswClientWrapper';

type CswClients = Record<CatalogRecordItems, CswClientWrapper>;
const NOT_FOUND = -1;

@singleton()
export class CSW {
  private readonly cswClients: CswClients = {} as CswClients;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.cswClients.RASTER = new CswClientWrapper(
      'mc:MCRasterRecord',
      [...PycswLayerCatalogRecord.getPyCSWMappings(), ...(PycswBestCatalogRecord.getPyCSWMappings() as IPropPYCSWMapping[])],
      'http://schema.mapcolonies.com/raster',
      this.config.get('csw.raster.url')
    );

    this.cswClients['3D'] = new CswClientWrapper(
      'mc:MC3DRecord',
      Pycsw3DCatalogRecord.getPyCSWMappings(),
      'http://schema.mapcolonies.com/3d',
      this.config.get('csw.3d.url')
    );
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

    if (typeFilterIdx > NOT_FOUND) {
      const fetchRecordType = get(opts?.filter, `[${typeFilterIdx}].eq`) as keyof typeof RecordType;
      switch (RecordType[fetchRecordType]) {
        case RecordType.RECORD_ALL:
          getRecords.push(...Object.values(this.cswClients).map(async (client) => client.getRecords(start, end, newOpts)));
          break;
        case RecordType.RECORD_RASTER:
          getRecords.push(this.cswClients.RASTER.getRecords(start, end, newOpts));
          break;
        case RecordType.RECORD_3D:
          getRecords.push(this.cswClients['3D'].getRecords(start, end, newOpts));
          break;
      }
    } else {
      getRecords.push(...Object.values(this.cswClients).map(async (client) => client.getRecords(start, end, newOpts)));
    }

    const data = await Promise.all(getRecords);
    return data.flat();
  }
}
