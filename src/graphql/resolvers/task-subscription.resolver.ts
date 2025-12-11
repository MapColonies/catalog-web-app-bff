import { PubSub } from 'graphql-subscriptions';
import { IResolvers } from 'graphql-tools';
import { container } from 'tsyringe';

export const TaskSubscriptionTypeDefs = `
  type Query {
    _empty: String
  }
  type Subscription {
    jobStatusUpdate: JobStatus!
  }
  type JobStatus {
    jobId: String!
    status: String!
  }
`;

export const TaskSubscriptionResolver: IResolvers = {
  Query: {
    _empty: () => 'This is a placeholder query',
  },
  Subscription: {
    jobStatusUpdate: {
      subscribe: () => {
        const pubSub = container.resolve<PubSub>('PUBSUB');
        return pubSub.asyncIterator('JOB_STATUS_UPDATE');
      },
      resolve: (payload: any) => {
        console.log('Subscription received payload:', payload);
        return {
          jobId: payload.jobId || '',
          status: payload.status || '',
        };
      },
    },
  },
};
