import { Logger } from '@map-colonies/js-logger';
import { IngestionData } from '../../graphql/inputTypes';
import { IConfig, IContext, IService } from '../interfaces';
import { IIngestionManagerService } from './ingestion-manager.interface';
import { IngestionResultData } from '../../graphql/ingestion';

export class IngestionManagerDem implements IIngestionManagerService {
  private readonly service: IService;

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.service = this.config.get('ingestionServices.dem');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async ingest(data: IngestionData, ctx: IContext): Promise<IngestionResultData> {
    return Promise.reject('Unimplemented service');
  }
}
