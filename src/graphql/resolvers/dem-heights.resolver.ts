import { container } from 'tsyringe';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { IContext } from '../../common/interfaces';
import { GetDemPointsHeightsInput } from '../inputTypes';
import DemHeightsManager from '../../common/dem-heights-manager/dem-heights-manager';
import { PositionWithHeight, PositionsWithHeights } from '../dem-heights';

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
    const positionsWithHeights = await this.demHeightsManager.getPointsHeights(data.positions, ctx);

    return positionsWithHeights;
  }

  // There is an issue serializing dates that comes in string format with TypeGraphQL, this is a workaround
  @FieldResolver()
  public updateDate(@Root() position: PositionWithHeight): Date | null {
    if (position.updateDate instanceof Date) {
      return position.updateDate;
    }

    if (typeof position.updateDate === 'string') {
      return new Date(position.updateDate);
    }

    return null;
  }
}
