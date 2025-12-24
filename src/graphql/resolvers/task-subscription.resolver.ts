/* eslint-disable @typescript-eslint/naming-convention */
import { PubSub } from 'graphql-subscriptions';
import { IResolvers } from 'graphql-tools';
import { container } from 'tsyringe';
import { CallBack } from '../../common/constants';

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
        const pubSub = container.resolve<PubSub>('PUBSUB');
        return pubSub.asyncIterator('TASK_UPDATE');
      },
      resolve: (payload: CallBack<Record<string, unknown>>): Record<string, unknown> => {
        console.log('Subscription received payload:', payload);
        return { ...payload };
      },
    },
  },
};
