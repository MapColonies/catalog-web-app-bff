import { Query, Resolver } from 'type-graphql';
import { DummyForTypesOnClient } from '../dummy-for-types-on-client';

@Resolver()
export class DummyForTypesOnClientResolver {
  public constructor() {}

  @Query(() => DummyForTypesOnClient, { nullable: true })
  public async dummyForTypesOnClient(): Promise<DummyForTypesOnClient> {
    return {} as DummyForTypesOnClient;
  }
}
