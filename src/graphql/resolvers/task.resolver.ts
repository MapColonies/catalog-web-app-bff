/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg } from 'type-graphql';
import { transform, mapKeys, mapValues } from 'lodash';
import { TasksSearchParams } from '../inputTypes';
import { Task } from '../job';
import { Services } from '../../common/constants';
import { requestHandler } from '../../utils';
import { MOCK_TASKS_DATA } from './MOCK_TASKS_DATA';

@Resolver()
export class TaskResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly serviceURL: string = '';

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.serviceURL = this.config.get('jobServices.raster.url');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((type) => [Task])
  public async tasks(
    @Arg('params', { nullable: true })
    params: TasksSearchParams
  ): Promise<Task[]> {
    try {
      const data = await Promise.resolve(this.getTasks(params));
      return this.transformRecordsToEntity(data);
      // const data = await Promise.resolve(MOCK_TASKS_DATA);
      // return data;
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  private async getTasks(params: TasksSearchParams): Promise<Task[]> {
    const res = await requestHandler(`${this.serviceURL}/jobs/${params.jobId}/tasks`, 'GET', {});
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data;
  }

  private readonly transformRecordsToEntity = (cswArray: Task[]): Task[] => {
    const taskParsedArray = transform(
      cswArray,
      (result: Record<string, unknown>[], cswValue) => {
        const parsedKeys = mapKeys(cswValue, (value, key) => key);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const finalParsed = mapValues(parsedKeys, (val, key, obj) => {
          switch (key) {
            case 'created':
            case 'updated':
              return new Date(val as string);
            default:
              return val;
          }
        });
        result.push(finalParsed);
      },
      []
    );
    //@ts-ignore
    return taskParsedArray;
  };
}
