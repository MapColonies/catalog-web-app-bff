import { IConfig } from 'config';
import { isEmpty } from 'lodash';
import { container } from 'tsyringe';
import { Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import { IServicesAvailability, servicesAvailability } from '../services-availability';

@Resolver()
export class ServicesAvailabilityResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
  }

  @Query((type) => servicesAvailability)
  public servicesAvailability(): IServicesAvailability {
    this.logger.info('[ServicesAvailability][servicesAvailability]');

    const EXCLUDE_CONFIG_KEYS = [
      'openapiConfig',
      'logger',
      'server',
      'response',
      'externalServices',
      'accessToken',
      'servedEntityTypes',
      'wfsServicesConfig',
    ];

    const servicesConfig = this.config.util.toObject() as Record<string, unknown>;
    const filteredObject = Object.fromEntries(
      Object.entries(servicesConfig).filter(([key]) => {
        return !EXCLUDE_CONFIG_KEYS.includes(key);
      })
    );

    const mappedNestedServicesToUrlPaths = this.getFlatObjWithPaths(filteredObject, 'url');

    const servicesAvailability = Object.entries(mappedNestedServicesToUrlPaths).map(([key, val]) => {
      return [key, (val as string).startsWith('http')];
    });

    const result = Object.fromEntries(servicesAvailability) as IServicesAvailability;

    if (isEmpty(result)) {
      const error = 'No services. Server is unavailable';
      this.logger.error(`[ServicesAvailability][servicesAvailability][ERROR] ${error}`);
      throw new Error(error);
    }

    return result;
  }

  private getFlatObjWithPaths(
    obj: Record<string, unknown>,
    key: string,
    currentPath = '',
    visited: Set<Record<string, unknown>> = new Set()
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    visited.add(obj);

    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        const newPath = currentPath ? `${currentPath}.${prop}` : prop;

        if (prop === key) {
          // use current path to exclude the requested key from final result
          result[currentPath] = obj[prop];
        }

        if (obj[prop] !== null && typeof obj[prop] === 'object' && !Array.isArray(obj[prop]) && !visited.has(obj[prop] as Record<string, unknown>)) {
          const nested = this.getFlatObjWithPaths(obj[prop] as Record<string, unknown>, key, newPath, visited);
          Object.assign(result, nested);
        }
      }
    }

    visited.delete(obj);

    return result;
  }
}
