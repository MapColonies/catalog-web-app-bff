import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { CapabilitiesManager } from '../../common/capabilities-manager/capabilities-manager';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { Capability } from '../capability';
import { CapabilitiesLayersSearchParams } from '../inputTypes';

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
    @Arg('params')
    params: CapabilitiesLayersSearchParams,
    @Ctx()
    ctx: IContext
  ): Promise<Capability[]> {
    try {
      this.logger.info(`[CapabilitiesResolver][capabilities] fetching layers capabilities`);
      const capabilityList = await this.capabilitiesManager.getCapabilities(params, ctx);
      return capabilityList;
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }
}
