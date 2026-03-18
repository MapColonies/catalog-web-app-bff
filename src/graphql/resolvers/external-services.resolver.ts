import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { Services } from '../../common/constants';
import { extractErrorMessage } from '../../utils';
import { ExternalService, ServiceType } from '../external-services';

@Resolver((of) => ExternalService)
export class ExternalServicesResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly externalServices: Record<string, string>;
  private readonly seperator = '-';

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.externalServices = this.config.get<Record<string, string>>('externalServices');
  }

  @Query((type) => [ExternalService])
  public getExternalServices(): ExternalService[] {
    this.logger.info(`[ExternalServices][getExternalServices]`);
    try {
      return this.generateExternalServices();
    } catch (err) {
      this.logger.error(`[ExternalServices][getExternalServices][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  private generateExternalServices(): ExternalService[] {
    const extServices = this.externalServices;
    const extServicesArr: ExternalService[] = [];

    for (const [key, url] of Object.entries(extServices)) {
      const [type, entity] = key.split(this.seperator);
      const displayType = type.toLowerCase();
      const displayEntity = entity.split('_')[1].toLowerCase();
      const displayText = `${displayType}.${displayEntity}.url`;

      const extService: ExternalService = {
        type: type as ServiceType,
        display: displayText,
        url,
        entity: entity as RecordType,
      };

      extServicesArr.push(extService);
    }

    return extServicesArr;
  }
}
