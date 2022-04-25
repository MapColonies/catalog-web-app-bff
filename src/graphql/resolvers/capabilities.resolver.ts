import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg } from 'type-graphql';
import { CapabilitiesManager } from '../../common/capabilities-manager/capabilities-manager';
import { Services } from '../../common/constants';
import { Capability } from '../capability';
import { StringArray } from '../inputTypes';

@Resolver()
export class CapabilitiesResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly capabilitiesManager: CapabilitiesManager;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.capabilitiesManager = container.resolve(CapabilitiesManager);
  }

  @Query((type) => [Capability])
  public async capabilities(
    @Arg('idList', { nullable: false })
    idList: StringArray
  ): Promise<Capability[]> {
    try {
      this.logger.info(`[CapabilitiesResolver][capabilities] fetching layers capabilities`);
      const capabilityList = await this.capabilitiesManager.getCapabilities(idList.value);
      return capabilityList;
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }
}
