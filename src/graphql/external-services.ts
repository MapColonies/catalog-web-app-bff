import { RecordType } from '@map-colonies/mc-model-types';
import { Field, ObjectType, registerEnumType } from 'type-graphql';

// eslint-disable-next-line import/exports-last
export enum ServiceType {
  PYCSW = 'PYCSW',
  MAP_SERVER = 'MAP_SERVER',
}
registerEnumType(ServiceType, { name: 'ServiceType' });

@ObjectType()
export class ExternalService {
  @Field((type) => String)
  public url: string;

  @Field((type) => ServiceType)
  public type: ServiceType;

  @Field((type) => String)
  public display: string;

  @Field((type) => RecordType)
  public entity: RecordType;
}
