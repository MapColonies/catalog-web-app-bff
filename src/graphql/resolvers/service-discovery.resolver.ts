import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import { IContext, IService } from '../../common/interfaces';
import { extractErrorMessage, requestExecutor } from '../../utils';
// import { MOCK_DEPS_AND_SERVICES } from '../MOCKS/service-discovery/depAndServicesMock';
import { DeploymentWithServices } from '../service-discovery';

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
      this.logger.info('[ServiceDiscovery][getClusterServices]');
      const clusterServices = await this.discoverClusterServices(ctx);
      return clusterServices;
    } catch (err) {
      this.logger.error(`[ServiceDiscovery][getClusterServices][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  private async discoverClusterServices(ctx: IContext): Promise<DeploymentWithServices[]> {
    const res = await requestExecutor(
      {
        url: `${this.service.url}/getDeploymentsAndServices`,
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
