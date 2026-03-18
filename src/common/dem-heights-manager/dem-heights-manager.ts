import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { Position, PositionsWithHeights } from '../../graphql/dem-heights';
import { requestExecutor, stringifyObject } from '../../utils';
import { Services } from '../constants';
import { IContext, IService } from '../interfaces';
import { IDemHeightsManagerService } from './dem-heights.interface';

@singleton()
export default class DemHeightsManager implements IDemHeightsManagerService {
  private readonly service: IService;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.service = this.config.get('demHeightsService');
  }

  public async getPointsHeights(positions: Position[], ctx: IContext, productType?: string): Promise<PositionsWithHeights> {
    this.logger.info(`[DemHeights][getPointsHeights] ${stringifyObject({ positions, productType })}`);
    const res = await requestExecutor(
      {
        url: `${this.service.url}/points`,
        exposureType: this.service.exposureType,
      },
      'POST',
      {
        data: {
          positions,
          productType,
        },
      },
      ctx
    ).then((res) => res.data as PositionsWithHeights);
    return res;
  }
}
