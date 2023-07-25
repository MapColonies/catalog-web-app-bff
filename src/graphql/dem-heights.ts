import { Field, ObjectType } from 'type-graphql';

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

  @Field((type) => Date, { nullable: true })
  public updateDate?: Date | string;

  @Field((type) => Number, { nullable: true })
  public resolutionMeter?: number;

  @Field((type) => String, { nullable: true })
  public productType?: string;
}

@ObjectType()
export class PositionsWithHeights {
  @Field((type) => [PositionWithHeight], { nullable: false })
  public data!: PositionWithHeight[];
}
