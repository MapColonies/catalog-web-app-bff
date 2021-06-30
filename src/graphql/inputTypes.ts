import { BBOX as BBOXCswClient, FilterField as FilterFieldCswClient, SortField as SortFieldCswClient } from '@map-colonies/csw-client';
import { RecordType, SensorType } from '@map-colonies/mc-model-types';
import { InputType, Field } from 'type-graphql';

@InputType()
export class BBOX extends BBOXCswClient {
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
export class FilterField extends FilterFieldCswClient {
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
  public bbox?: BBOX;
}

@InputType()
export class SortField extends SortFieldCswClient {
  @Field({ nullable: false })
  public field: string;
  @Field({ nullable: true })
  public desc?: boolean;
}

@InputType()
export class SearchOptions {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [FilterField], { nullable: true })
  public filter?: FilterField[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [SortField], { nullable: true })
  public sort?: SortField[];
}

// TODO: might be auto-generated due to isManuallyEditable flag while decorated
@InputType()
export class RecordUpdatePartial {
  @Field({ nullable: false })
  public id: string;

  @Field((type) => RecordType, { nullable: false })
  public type?: RecordType;

  @Field({ nullable: true })
  public productName?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field((type) => [SensorType], { nullable: true })
  public sensorType?: SensorType[];

  @Field({ nullable: true })
  public classification?: string;

  @Field({ nullable: true })
  public keywords?: string;
}
