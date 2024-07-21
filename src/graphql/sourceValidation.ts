import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class SourceValidation {
  @Field((type) => Boolean, { nullable: false })
  public isValid: boolean;

  @Field((type) => String, { nullable: false })
  public message: string;
}
