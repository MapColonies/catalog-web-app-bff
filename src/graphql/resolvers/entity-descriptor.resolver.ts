/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logger } from '@map-colonies/js-logger';
import { container } from 'tsyringe';
import { Resolver, Query } from 'type-graphql';
import { Services } from '../../common/constants';
import { getDescriptors } from '../../helpers/entityDescriptor.helpers';
import { EntityDescriptor } from '../entityDescriptor';

@Resolver()
export class EntityDescriptorResolver {
  private readonly logger: Logger;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((type) => [EntityDescriptor])
  public async entityDescriptors(): Promise<EntityDescriptor[]> {
    try {
      const data = await Promise.resolve(getDescriptors());
      return data;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
