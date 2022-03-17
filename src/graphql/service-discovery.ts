import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class DeploymentWithServices {
  @Field((type) => String, { nullable: true })
  public name?: string;

  @Field((type) => String, { nullable: true })
  public status?: string;

  @Field((type) => String, { nullable: true })
  public image?: string;

  @Field((type) => [K8sService], { nullable: true })
  public services?: K8sService[];
}

@ObjectType()
export class K8sService {
  @Field((type) => String, { nullable: true })
  public name?: string;

  @Field((type) => String, { nullable: true })
  public uid?: string;

  @Field((type) => [String], { nullable: true })
  public addresses?: string[];
}
