import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TileMatrixSet {
  @Field((type) => String, { nullable: false })
  public tileMatrixSetID!: string;

  @Field((type) => [String], { nullable: false })
  public tileMatrixLabels: string[];
}

@ObjectType()
export class ResourceURL {
  @Field((type) => String, { nullable: false })
  public format!: string;

  @Field((type) => String, { nullable: false })
  public resourceType!: string;

  @Field((type) => String, { nullable: false })
  public template!: string;
}

@ObjectType()
export class Capability {
  @Field((type) => String, { nullable: false })
  public id!: string;

  @Field((type) => String, { nullable: false })
  public style!: string;

  @Field((type) => [String], { nullable: false })
  public format!: string[];

  @Field((type) => [TileMatrixSet], { nullable: false })
  public tileMatrixSet!: TileMatrixSet[];

  @Field((type) => [ResourceURL], { nullable: false })
  public url!: ResourceURL[];

  // Partial and can be extended according to the full OWS format of getCapabilities
}
