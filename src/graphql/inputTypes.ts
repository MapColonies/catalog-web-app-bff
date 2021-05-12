import { BBOX, FilterField, SortField } from '@map-colonies/csw-client';
import { InputType, Field } from 'type-graphql';

@InputType()
export class BBOXImplementation extends BBOX {
  @Field({ nullable: false })
  llat: number;
  @Field({ nullable: false })
  llon: number;
  @Field({ nullable: false })
  ulat: number;
  @Field({ nullable: false })
  ulon: number;
}

@InputType()
export class FilterFieldImplementation extends FilterField {
  @Field({ nullable: true })
  or?: boolean;
  @Field({ nullable: false })
  field: string;
  @Field({ nullable: true })
  like?: string;
  @Field({ nullable: true })
  eq?: string;
  @Field({ nullable: true })
  neq?: string;
  @Field({ nullable: true })
  gt?: string;
  @Field({ nullable: true })
  lt?: string;
  @Field({ nullable: true })
  gteq?: string;
  @Field({ nullable: true })
  lteq?: string;
  @Field((type) => [String, String], { nullable: true })
  in?: [string, string];
  @Field({ nullable: true })
  bbox?: BBOXImplementation;
}

@InputType()
export class SortFieldImplementation extends SortField {
  @Field({ nullable: false })
  field: string;
  @Field({ nullable: true })
  desc?: boolean;
}

@InputType()
export class GetRecordOptions {
  @Field((type) => [FilterFieldImplementation], { nullable: true })
  filter?: FilterFieldImplementation[];

  @Field((type) => [SortFieldImplementation], { nullable: true })
  sort?: SortFieldImplementation[];
}
