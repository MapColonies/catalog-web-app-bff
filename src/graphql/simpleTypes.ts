import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class StringArrayObjectType {
  @Field((type) => [String])
  public value: string[];
}
