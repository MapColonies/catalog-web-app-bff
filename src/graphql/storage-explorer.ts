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

  @Field((type) => Boolean, { nullable: true })
  public isDir!: boolean;

  @Field((type) => Date, { nullable: true })
  public modDate!: Date | string;

  @Field((type) => String, { nullable: true })
  public ext?: string;

  @Field((type) => Number, { nullable: true })
  public size?: number;

  @Field((type) => [String], { nullable: true })
  public childrenIds?: string[];

  @Field((type) => Number, { nullable: true })
  public childrenCount?: number;
}

@ObjectType()
export class DecryptedId {
  @Field((type) => String)
  public data: string;
}
