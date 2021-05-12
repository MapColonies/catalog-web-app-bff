import { Logger } from '@map-colonies/js-logger';
import { inject, singleton } from 'tsyringe';
import { Services } from './common/constants';
import { IConfig } from './common/interfaces';
import { CswClientWrapper } from './cswClientWrapper';
import { CatalogRecordItems, GetRecordsOptions } from './utils';

type CswClients = Record<CatalogRecordItems, CswClientWrapper>;

@singleton()
export class CSW {
  private cswClients: CswClients = {} as CswClients;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.cswClients.RASTER = new CswClientWrapper('mc:MCRasterRecord', 'http://schema.mapcolonies.com/raster', this.config.get('csw.raster.url'));
    this.cswClients['3D'] = new CswClientWrapper('mc:MC3DRecord', 'http://schema.mapcolonies.com/3d', this.config.get('csw.3d.url'));
  }

  public async getRecords(start?: number, end?: number, opts?: GetRecordsOptions) {
    /*  TODO: range of elements (start-end) is per CSW-client-instance. */
    const getRecords = Object.values(this.cswClients).map((client) => client.getRecords(start, end, opts));
    const data = await Promise.all(getRecords);
    return data.flat();
  }
}
