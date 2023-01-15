import { GraphQLScalarType } from 'graphql';
import { Field, ObjectType } from 'type-graphql';

export interface LookupTableField {
  lookupTable?: string;
  lookupExcludeFields?: string[];
}

export const properties = new GraphQLScalarType({ name: 'properties' });
export const lookupTableDataType = new GraphQLScalarType({ name: 'LookupTableDataType' });

@ObjectType()
export class LookupOption {
  @Field((type) => String, { nullable: false })
  public value: string;

  @Field((type) => String, { nullable: false })
  public translationCode: string;

  @Field((type) => properties, { nullable: true })
  public properties?: Record<string, unknown>;
}

@ObjectType()
export class LookupTableData {
  @Field((type) => lookupTableDataType, { nullable: false })
  public dictionary: Record<string, LookupOption[]>;
}
