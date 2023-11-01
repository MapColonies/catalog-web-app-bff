import { GraphQLScalarType } from 'graphql';
import { Field, ObjectType } from 'type-graphql';

export const productsDataType = new GraphQLScalarType({ name: 'ProductsDataType' });

@ObjectType()
export class Position {
  @Field((type) => Number, { nullable: false })
  public latitude!: number;

  @Field((type) => Number, { nullable: false })
  public longitude!: number;
}

@ObjectType()
export class PositionWithHeight {
  @Field((type) => Number, { nullable: false })
  public latitude!: number;

  @Field((type) => Number, { nullable: false })
  public longitude!: number;

  @Field((type) => Number, { nullable: true })
  public height!: number;

  @Field((type) => String, { nullable: true })
  public productId?: string;
}

@ObjectType()
export class Product {
  @Field((type) => String, { nullable: false })
  public productType!: string;

  @Field((type) => Date, { nullable: false })
  public updateDate!: Date | string;

  @Field((type) => Number, { nullable: false })
  public resolutionMeter!: number;

  @Field((type) => Number, { nullable: false })
  public absoluteAccuracyLEP90!: number;
}

@ObjectType()
export class PositionsWithHeights {
  @Field((type) => [PositionWithHeight], { nullable: false })
  public data!: PositionWithHeight[];

  @Field((type) => productsDataType, { nullable: false })
  public products!: Record<string, Product>;
}
