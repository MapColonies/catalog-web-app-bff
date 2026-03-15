/* eslint-disable @typescript-eslint/naming-convention */
import { PubSub } from 'graphql-subscriptions';
import { IResolvers } from 'graphql-tools';
import { container } from 'tsyringe';
import { CallBack, Services } from '../../common/constants';
import { stringifyObject } from '../../utils';

export const taskSubscriptionTypeDefs = `
  scalar parametersObject

  enum Status {
    PENDING
    IN_PROGRESS
    COMPLETED
    FAILED
    EXPIRED
    ABORTED
    SUSPENDED
  }

  type Query {
    _empty: String
  }

  type Subscription {
    taskUpdateDetails: TaskNotification!
  }
    
  type TaskNotification {
    jobId: String!
    taskId: String
    jobType: String
    taskType: String
    productId: String
    productType: String
    version: String
    status: Status
    progress: Int
    message: String
    error: String
    params: parametersObject
  }
`;

export const TaskSubscriptionResolver: IResolvers = {
  Query: {
    _empty: (): string => 'This is a placeholder query',
  },
  Subscription: {
    taskUpdateDetails: {
      subscribe: (): AsyncIterator<PubSub> => {
        const pubSub = container.resolve<PubSub>(Services.PUBSUB);
        return pubSub.asyncIterator('TASK_UPDATE');
      },
      resolve: (payload: CallBack<Record<string, unknown>>): Record<string, unknown> => {
        const logger = container.resolve<{ debug: (message: string) => void }>(Services.LOGGER);
        logger.debug(`[PUBSUB][TASK_UPDATE] ${stringifyObject(payload)}`);
        return { ...payload };
      },
    },
  },
};
