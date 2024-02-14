import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserLogin {
  @Field((type) => Boolean, { nullable: false })
  public isValid: boolean;
}
