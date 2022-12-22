import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Style {
  @Field((type) => String, { nullable: false })
  public value!: string;

  @Field((type) => String, { nullable: true })
  public isDefault: string;
}

@ObjectType()
export class TileMatrixSet {
  @Field((type) => String, { nullable: false })
  public tileMatrixSetID!: string;

  @Field((type) => [String], { nullable: false })
  public tileMatrixLabels!: string[];
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

  @Field((type) => [Style], { nullable: false })
  public style!: Style[];

  @Field((type) => [String], { nullable: false })
  public format!: string[];

  @Field((type) => [TileMatrixSet], { nullable: false })
  public tileMatrixSet!: TileMatrixSet[];

  @Field((type) => [ResourceURL], { nullable: false })
  public url!: ResourceURL[];

  // Partial and can be extended according to the full OWS format of getCapabilities
}
