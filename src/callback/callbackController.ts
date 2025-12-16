import { Request, Response, NextFunction } from 'express';
import { PubSub } from 'graphql-subscriptions';
import { StatusCodes } from 'http-status-codes';
import { container, injectable } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { CallBack, Services, statusMap } from '../common/constants';

@injectable()
export class CallbackController {
  private readonly pubSub: PubSub;
  private readonly logger: Logger;

  public constructor() {
    this.pubSub = container.resolve<PubSub>(Services.PUBSUB);
    this.logger = container.resolve(Services.LOGGER);
  }

  public publishTaskUpdate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req.body as CallBack<unknown>;
      const statusKey = payload.status;
      await this.pubSub.publish('TASK_UPDATE', {
        ...payload,
        status: statusMap[statusKey],
      });
      res.status(StatusCodes.OK).json({ message: 'Task update received' });
      next();
    } catch (err) {
      this.logger.error('[publishTaskUpdate] Error:', err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to process task update' });
      next(err);
    }
  };
}
