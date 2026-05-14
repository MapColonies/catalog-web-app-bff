import { Query, Resolver } from 'type-graphql';
import { DummyForTypesOnClient } from '../dummy-for-types-on-client';

@Resolver()
export class DummyForTypesGenerationResolver {
  public constructor() {}

  @Query(() => DummyForTypesOnClient, { nullable: true })
  public async dummyForTypesGeneration(): Promise<DummyForTypesOnClient> {
    try {
      return {} as DummyForTypesOnClient;
    } catch (err) {
      throw err;
    }
  }
}
