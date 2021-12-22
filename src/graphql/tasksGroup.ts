import { ObjectType, Field } from 'type-graphql';
import { parametersObject, Status } from './job';

@ObjectType()
export class TasksGroup {
  @Field({ nullable: true })
  public jobId?: string;

  @Field({ nullable: true })
  public type?: string;

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
  public counts?: number;
}
