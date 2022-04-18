import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Capability {
  @Field((type) => String, { nullable: false })
  public id!: string;

  @Field((type) => String, { nullable: false })
  public style!: string;

  @Field((type) => [String], { nullable: false })
  public format!: [string];

  @Field((type) => [String], { nullable: false })
  public tileMatrixSet!: [string];

  // Partial and can be extended according to the full OWS format of getCapabilities
}
