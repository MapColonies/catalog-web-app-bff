/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, registerEnumType, createUnionType } from 'type-graphql';
import { FieldCategory } from '@map-colonies/mc-model-types';
import { GraphQLScalarType } from 'graphql';
import { TMCEnums } from '../AUTOGENERATED/GraphQLClass';

// eslint-disable-next-line import/exports-last
export enum AutocompletionType {
  DOMAIN = 'domain',
  SERVICE = 'service',
}
registerEnumType(AutocompletionType, { name: 'AutocompletionType' });

// eslint-disable-next-line import/exports-last
export enum ValidationValueType {
  VALUE = 'value',
  FIELD = 'field',
}
registerEnumType(ValidationValueType, { name: 'ValidationValueType' });

// eslint-disable-next-line import/exports-last
export enum DateGranularity {
  DATE = 'date',
  DATE_AND_TIME = 'dateAndTime',
}
registerEnumType(DateGranularity, { name: 'DateGranularityType' });

registerEnumType(FieldCategory, { name: 'FieldCategory' });

// eslint-disable-next-line import/exports-last
export enum OperationType {
  INCREMENT,
  EXPLICIT,
  COPY,
}

// eslint-disable-next-line import/exports-last
export enum FractionType {
  MAJOR,
  MINOR,
  PATCH,
  DAYS,
  MONTHS,
  YEARS,
}

registerEnumType(OperationType, { name: 'OperationType' });
registerEnumType(FractionType, { name: 'FractionType' });

export const enumDictionary = new GraphQLScalarType({ name: 'enumDictionary' });

@ObjectType()
export class EnumDictionary {
  @Field({ nullable: false })
  public displayKey: string;

  @Field({ nullable: true })
  public tooltipKey?: string;

  @Field({ nullable: true })
  public icon?: string;
}

@ObjectType()
export class EnumAspects {
  @Field((type) => enumDictionary, { nullable: false })
  public dictionary: Record<string, EnumDictionary>;
}

@ObjectType()
export class Autocompletion {
  @Field((type) => AutocompletionType, { nullable: false })
  public type: AutocompletionType;

  @Field({ nullable: false })
  public value: string;
}

@ObjectType()
export class UpdateRulesOperation {
  @Field((type) => OperationType, { nullable: true })
  public type: OperationType;

  @Field((type) => FractionType, { nullable: true })
  public fraction: FractionType;

  @Field({ nullable: true })
  public value: number;
}

@ObjectType()
export class UpdateRulesValue {
  @Field((type) => UpdateRulesOperation, { nullable: false })
  public operation: UpdateRulesOperation;
}

@ObjectType()
export class UpdateRules {
  @Field({ nullable: true })
  public freeze: boolean;

  @Field((type) => UpdateRulesValue, { nullable: true })
  public value: UpdateRulesValue;
}

@ObjectType()
export class ValidationConfig {
  @Field({ nullable: false })
  public errorMsgCode: string;

  @Field((type) => ValidationValueType, { nullable: true })
  public valueType: ValidationValueType;

  @Field({ nullable: true })
  public min?: string; //number | string | '$NOW';

  @Field({ nullable: true })
  public max?: string; //number | string;

  @Field({ nullable: true })
  public minLength?: number;

  @Field({ nullable: true })
  public maxLength?: number;

  @Field({ nullable: true })
  public pattern?: string;

  @Field({ nullable: true })
  public errorMsgTranslation: string;

  @Field({ nullable: true })
  public required: boolean;

  @Field({ nullable: true })
  public json: boolean;
}

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

  @Field({ nullable: true })
  public isLifecycleEnvolved?: boolean; // Is field might be changed during product's life cycle.

  @Field({ nullable: true })
  public isCopyable?: boolean; // is field might be copied

  @Field({ nullable: true })
  public rows?: number; // should present string as text-area controller. rows represents the maximum number of rows to present.

  @Field((type) => Autocompletion, { nullable: true })
  public autocomplete?: Autocompletion;

  @Field((type) => [String], { nullable: true })
  public infoMsgCode?: string[];

  @Field((type) => [ValidationConfig], { nullable: true })
  public validation?: ValidationConfig[];

  @Field((type) => EnumAspects, { nullable: true })
  public enumValues?: EnumAspects;

  @Field((type) => [FieldConfig], { nullable: true })
  public subFields?: FieldConfig[];

  @Field((type) => String, { nullable: true })
  public default?: string;

  @Field((type) => DateGranularity, { nullable: true })
  public dateGranularity?: DateGranularity;

  @Field((type) => UpdateRules, { nullable: true })
  public updateRules?: UpdateRules;
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

export const mcEnumsScalar = new GraphQLScalarType({
  name: 'mcEnums',
  description: 'MC Enums dictionary',
});

@ObjectType()
export class MCEnums {
  @Field((type) => mcEnumsScalar, { nullable: false })
  public enums: TMCEnums;
}
