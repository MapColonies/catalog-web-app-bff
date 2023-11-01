import { container } from 'tsyringe';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { IContext } from '../../common/interfaces';
import { GetDemPointsHeightsInput } from '../inputTypes';
import DemHeightsManager from '../../common/dem-heights-manager/dem-heights-manager';
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

  // There is an issue serializing dates that comes in string format with TypeGraphQL, this is a workaround
  @FieldResolver()
  public updateDate(@Root() product: Product): Date | null {
    if (product.updateDate instanceof Date) {
      return product.updateDate;
    }

    if (typeof product.updateDate === 'string') {
      return new Date(product.updateDate);
    }

    return null;
  }
}
