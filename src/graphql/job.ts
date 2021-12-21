/* eslint-disable import/exports-last, @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars */
import { GraphQLScalarType } from 'graphql';
import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { ProductType } from '@map-colonies/mc-model-types';

export const parametersObject = new GraphQLScalarType({ name: 'parametersObject' });

export enum Status {
  Pending = 'Pending',
  InProgress = 'In-Progress',
  Completed = 'Completed',
  Failed = 'Failed',
}

@ObjectType()
export class Task {
  @Field({ nullable: false })
  public id: string;

  @Field({ nullable: true })
  public jobId?: string;

  @Field({ nullable: true })
  public type?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field((type) => parametersObject, { nullable: true })
  public parameters?: Record<string, unknown>;

  @Field({ nullable: true })
  public created?: Date;

  @Field({ nullable: true })
  public updated?: Date;

  @Field((type) => Status, { nullable: true })
  public status?: Status;

  @Field({ nullable: true })
  public percentage?: number;

  @Field({ nullable: true })
  public reason?: string;

  @Field({ nullable: true })
  public attempts?: number;
}

@ObjectType()
export class Job {
  @Field({ nullable: false })
  public id: string;

  @Field({ nullable: true })
  public resourceId?: string;

  @Field({ nullable: true })
  public version?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field((type) => parametersObject, { nullable: true })
  public parameters?: Record<string, unknown>;

  @Field((type) => Status, { nullable: true })
  public status?: Status;

  @Field({ nullable: true })
  public reason?: string;

  @Field({ nullable: true })
  public type?: string;

  @Field({ nullable: true })
  public percentage?: number;

  @Field({ nullable: true })
  public priority?: number;

  @Field({ nullable: true })
  public expirationDate?: Date;

  @Field({ nullable: true })
  public internalId?: string;

  @Field({ nullable: true })
  public producerName?: string;

  @Field({ nullable: true })
  public productName?: string;

  @Field((type) => ProductType, { nullable: true })
  public productType?: ProductType;

  @Field({ nullable: true })
  public created?: Date;

  @Field({ nullable: true })
  public updated?: Date;

  @Field({ nullable: true })
  public taskCount?: number;

  @Field({ nullable: true })
  public completedTasks?: number;

  @Field({ nullable: true })
  public failedTasks?: number;

  @Field({ nullable: true })
  public expiredTasks?: number;

  @Field({ nullable: true })
  public pendingTasks?: number;

  @Field({ nullable: true })
  public inProgressTasks?: number;

  @Field({ nullable: true })
  public isCleaned?: boolean;
}

const ProductTypeRegister = registerEnumType(ProductType, { name: 'ProductType' });
const StatusRegister = registerEnumType(Status, { name: 'Status' });
