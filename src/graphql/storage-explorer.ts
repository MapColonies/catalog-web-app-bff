import GraphQLJSON from 'graphql-type-json';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class File {
  @Field((type) => String, { nullable: false })
  public id!: string;

  @Field((type) => String, { nullable: false })
  public name!: string;

  @Field((type) => String, { nullable: false })
  public parentId!: string;

  @Field((type) => String, { nullable: true })
  public ext?: string;

  @Field((type) => Boolean, { nullable: true })
  public isDir?: boolean;

  @Field((type) => Boolean, { nullable: true })
  public isHidden?: boolean;

  @Field((type) => Number, { nullable: true })
  public size?: number;

  @Field((type) => Date, { nullable: true })
  public modDate?: Date | string;

  @Field((type) => [String], { defaultValue: [] })
  public childrenIds?: string[];

  @Field((type) => Number, { defaultValue: 0 })
  public childrenCount?: number;
}

@ObjectType()
export class FileJsonResponse {
  @Field((type) => GraphQLJSON)
  public data: Record<string, unknown>;
}

@ObjectType()
export class DecryptedId {
  @Field((type) => String)
  public data: string;
}
