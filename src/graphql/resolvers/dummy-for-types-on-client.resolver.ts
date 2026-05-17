import { container } from 'tsyringe';
import { Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import { DummyForTypesOnClient } from '../dummy-for-types-on-client';

@Resolver()
export class DummyForTypesOnClientResolver {
  private readonly logger: Logger;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
  }

  @Query(() => DummyForTypesOnClient, { nullable: true })
  public async dummyForTypesOnClient(): Promise<DummyForTypesOnClient> {
    this.logger.info('Fetching dummy data for types on client');
    return await Promise.resolve({} as DummyForTypesOnClient);
  }
}
