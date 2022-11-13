import { IConfig } from 'config';
import { Logger } from 'pino';
import { container } from 'tsyringe';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { requestHandler } from '../../utils';
import { DeploymentWithServices } from '../service-discovery';
// import { MOCK_DEPS_AND_SERVICES } from '../MOCKS/service-discovery/depAndServicesMock';

@Resolver((of) => DeploymentWithServices)
export class ServiceDiscoveryResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly serviceURL: string = '';

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.serviceURL = this.config.get('serviceDiscovery.url');
  }

  @Query((type) => [DeploymentWithServices])
  public async getClusterServices(
    @Ctx()
    ctx: IContext
  ): Promise<DeploymentWithServices[]> {
    try {
      const clusterServices = await this.discoverClusterServices(ctx);
      return clusterServices;
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  private async discoverClusterServices(ctx: IContext): Promise<DeploymentWithServices[]> {
    this.logger.info(`[ServiceDiscoveryResolver][discoverClusterServices] fetching services from cluster.`);

    const depsAndServices = await requestHandler(this.serviceURL, 'GET', {}, ctx);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return depsAndServices.data;
    // return Promise.resolve(MOCK_DEPS_AND_SERVICES);
  }
}
