import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { IContext } from '../../common/interfaces';
import DemHeightsManager from '../../common/dem-heights-manager/dem-heights-manager';
import { GetDemPointsHeightsInput } from '../inputTypes';
import { PositionWithHeight, PositionsWithHeights, Product } from '../dem-heights';

@Resolver((of) => PositionWithHeight)
export class DemHeightsResolver {
  private readonly demHeightsManager: DemHeightsManager;

  public constructor() {
    this.demHeightsManager = container.resolve(DemHeightsManager);
  }

  @Query((type) => PositionsWithHeights)
  public async getPointsHeights(
    @Arg('data')
    data: GetDemPointsHeightsInput,
    @Ctx()
    ctx: IContext
  ): Promise<PositionsWithHeights> {
    const positionsWithHeights = await this.demHeightsManager.getPointsHeights(data.positions, ctx, data.productType);

    return positionsWithHeights;
  }
}
