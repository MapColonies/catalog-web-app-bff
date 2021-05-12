import { BBOX, FilterField, SortField } from '@map-colonies/csw-client';
import { InputType, Field } from 'type-graphql';

@InputType()
export class BBOXImplementation extends BBOX {
  @Field({ nullable: false })
  public llat: number;
  @Field({ nullable: false })
  public llon: number;
  @Field({ nullable: false })
  public ulat: number;
  @Field({ nullable: false })
  public ulon: number;
}

@InputType()
export class FilterFieldImplementation extends FilterField {
  @Field({ nullable: true })
  public or?: boolean;
  @Field({ nullable: false })
  public field: string;
  @Field({ nullable: true })
  public like?: string;
  @Field({ nullable: true })
  public eq?: string;
  @Field({ nullable: true })
  public neq?: string;
  @Field({ nullable: true })
  public gt?: string;
  @Field({ nullable: true })
  public lt?: string;
  @Field({ nullable: true })
  public gteq?: string;
  @Field({ nullable: true })
  public lteq?: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String, String], { nullable: true })
  public in?: [string, string];
  @Field({ nullable: true })
  public bbox?: BBOXImplementation;
}

@InputType()
export class SortFieldImplementation extends SortField {
  @Field({ nullable: false })
  public field: string;
  @Field({ nullable: true })
  public desc?: boolean;
}

@InputType()
export class GetRecordOptions {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [FilterFieldImplementation], { nullable: true })
  public filter?: FilterFieldImplementation[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [SortFieldImplementation], { nullable: true })
  public sort?: SortFieldImplementation[];
}
