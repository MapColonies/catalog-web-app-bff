import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import DemHeightsManager from '../../common/dem-heights-manager/dem-heights-manager';
import { IContext } from '../../common/interfaces';
import { extractErrorMessage } from '../../utils';
import { PositionWithHeight, PositionsWithHeights } from '../dem-heights';
import { GetDemPointsHeightsInput } from '../inputTypes';

@Resolver((of) => PositionWithHeight)
export class DemHeightsResolver {
  private readonly logger: Logger;
  private readonly demHeightsManager: DemHeightsManager;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.demHeightsManager = container.resolve(DemHeightsManager);
  }

  @Query((type) => PositionsWithHeights)
  public async getPointsHeights(
    @Arg('data')
    data: GetDemPointsHeightsInput,
    @Ctx()
    ctx: IContext
  ): Promise<PositionsWithHeights> {
    try {
      const positionsWithHeights = await this.demHeightsManager.getPointsHeights(data.positions, ctx, data.productType);
      return positionsWithHeights;
    } catch (err) {
      this.logger.error(`[DemHeights][getPointsHeights][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  // There is an issue serializing dates that comes in string format with TypeGraphQL, this is a workaround
  // @FieldResolver()
  // public updateDate(@Root() product: Product): Date | null {
  //   if (product.updateDate instanceof Date) {
  //     return product.updateDate;
  //   }

  //   if (typeof product.updateDate === 'string') {
  //     return new Date(product.updateDate);
  //   }

  //   return null;
  // }
}
