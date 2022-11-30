import { GraphQLScalarType } from 'graphql';
import { Field, ObjectType } from 'type-graphql';

const tileMatrix = new GraphQLScalarType({ name: 'tileMatrix' });

@ObjectType()
export class TileMatrixSet {
  @Field((type) => String, { nullable: true })
  public tileMatrixSetID: string;

  @Field((type) => tileMatrix, { nullable: true })
  public tileMatrixLabels: Record<string, unknown>;
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
