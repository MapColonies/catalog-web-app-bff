import { IConfig } from 'config';
import { Logger } from 'pino';
import { container } from 'tsyringe';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Services } from '../../common/constants';
import { IContext, IService } from '../../common/interfaces';
import { requestExecutor } from '../../utils';
import { DeploymentWithServices } from '../service-discovery';
// import { MOCK_DEPS_AND_SERVICES } from '../MOCKS/service-discovery/depAndServicesMock';

@Resolver((of) => DeploymentWithServices)
export class ServiceDiscoveryResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly service: IService;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.service = this.config.get('serviceDiscovery');
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

    const res = await requestExecutor(
      {
        url: `${this.service}/getDeploymentsAndServices`,
        exposureType: this.service.exposureType,
      },
      'GET',
      {},
      ctx
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data;
    // return Promise.resolve(MOCK_DEPS_AND_SERVICES);
  }
}
