import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { FieldCategory } from '@map-colonies/mc-model-types';

registerEnumType(FieldCategory, { name: 'FieldCategory' });

@ObjectType()
export class FieldConfig {
  @Field({ nullable: false })
  public fieldName: string;

  @Field({ nullable: false })
  public label: string;

  @Field({ nullable: true })
  public fullWidth?: boolean;

  @Field({ nullable: true })
  public isManuallyEditable?: boolean; // is field might be edited after creation

  @Field({ nullable: true })
  public isFilterable?: boolean; // is field might participate in filter/search params

  @Field({ nullable: true })
  public isSortable?: boolean; // is field might participate in sorting

  @Field({ nullable: true })
  public isRequired?: boolean; // is field mandatory

  @Field({ nullable: true })
  public isAutoGenerated?: boolean; // is field auto-generated

  @Field((type) => [FieldConfig], { nullable: true })
  public subFields?: FieldConfig[];
}

@ObjectType()
export class CategoryConfig {
  @Field((type) => FieldCategory, { nullable: false })
  public category: FieldCategory;

  @Field({ nullable: false })
  public categoryTitle: string;

  @Field((type) => [FieldConfig], { nullable: false })
  public fields: FieldConfig[];
}

@ObjectType()
export class EntityDescriptor {
  @Field({ nullable: false })
  public type: string;

  @Field((type) => [CategoryConfig], { nullable: false })
  public categories: CategoryConfig[];
}
