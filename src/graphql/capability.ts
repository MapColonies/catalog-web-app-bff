import { Field, ObjectType } from 'type-graphql';
import type {
  Capability as CapabilityContract,
  Style as StyleContract,
  TileMatrixSet as TileMatrixSetContract,
  ResourceURL as ResourceURLContract,
} from '@map-colonies/types';

@ObjectType('Style')
export class StyleType implements StyleContract {
  @Field((type) => String, { nullable: false })
  public value!: string;

  @Field((type) => String, { nullable: true })
  public isDefault!: string | null;
}

@ObjectType('TileMatrixSet')
export class TileMatrixSetType implements TileMatrixSetContract {
  @Field((type) => String, { nullable: false })
  public tileMatrixSetID!: string;

  @Field((type) => [String], { nullable: false })
  public tileMatrixLabels!: string[];
}

@ObjectType('ResourceURL')
export class ResourceURLType implements ResourceURLContract {
  @Field((type) => String, { nullable: false })
  public format!: string;

  @Field((type) => String, { nullable: false })
  public resourceType!: string;

  @Field((type) => String, { nullable: false })
  public template!: string;
}

@ObjectType('Capability')
export class CapabilityType implements CapabilityContract {
  @Field((type) => String, { nullable: false })
  public id!: string;

  @Field((type) => [StyleType], { nullable: false })
  public style!: StyleType[];

  @Field((type) => [String], { nullable: false })
  public format!: string[];

  @Field((type) => [TileMatrixSetType], { nullable: false })
  public tileMatrixSet!: TileMatrixSetType[];

  @Field((type) => [ResourceURLType], { nullable: false })
  public url!: ResourceURLType[];

  // Partial and can be extended according to the full OWS format of getCapabilities
}
