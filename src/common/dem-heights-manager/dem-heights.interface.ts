import { Position, PositionsWithHeights } from '../../graphql/dem-heights';
import { IContext } from '../interfaces';

export interface IDemHeightsManagerService {
  getPointsHeights: (positions: Position[], ctx: IContext, productType?: string, excludeFields?: string[]) => Promise<PositionsWithHeights>;
}
