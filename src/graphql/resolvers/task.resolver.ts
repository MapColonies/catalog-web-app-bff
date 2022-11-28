/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import moment from 'moment';
import { Services } from '../../common/constants';
import { TasksSearchParams } from '../inputTypes';
import { TasksGroup } from '../tasksGroup';
import { Task } from '../job';
import { IContext } from '../../common/interfaces';
import { JobManager } from '../../common/job-manager/job-manager';
//import { MOCK_TASKS_DATA } from '../MOCKS/MOCK_TASKS_DATA';

@Resolver()
export class TaskResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly jobManager: JobManager;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.jobManager = container.resolve(JobManager);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((type) => [TasksGroup])
  public async tasks(
    @Arg('params', { nullable: true })
    params: TasksSearchParams,
    @Ctx()
    ctx: IContext
  ): Promise<TasksGroup[]> {
    try {
      const data: Task[] = await this.jobManager.getTasks(params, ctx);

      return this.groupTasks(data);
      // const data = await Promise.resolve(this.groupTasks(MOCK_TASKS_DATA));
      // return data;
    } catch (err) {
      this.logger.error(err as string);
      throw err;
    }
  }

  /*
    We should group tasks by:
    type and status.
    if status Failed, then we should group by fail reason as well.
    add count column to sum the group members and return it as well. (istead of attempts).
  */

  private readonly groupsMapToArray = (groupsMap: Map<string, Task[] | Task | TasksGroup[]>, removeKeys?: string[]): TasksGroup[] => {
    const groupsCopy = new Map(groupsMap);

    groupsMap.forEach((value, key) => {
      const taskGroup: TasksGroup[] | undefined = groupsCopy.get(key) as TasksGroup[];

      interface DatesType {
        createdDates: moment.Moment[];
        updatedDates: moment.Moment[];
        minDate: null | moment.Moment;
        maxDate: null | moment.Moment;
      }

      const dates: DatesType = {
        createdDates: [],
        updatedDates: [],
        minDate: null,
        maxDate: null,
      };

      for (const { created, updated } of taskGroup) {
        dates.createdDates.push(moment(created as Date));
        dates.updatedDates.push(moment(updated as Date));
      }

      dates.minDate = moment.min(dates.createdDates as unknown as moment.Moment[]);
      dates.maxDate = moment.max(dates.updatedDates as unknown as moment.Moment[]);

      const groupRepresentor: TasksGroup = taskGroup[0];

      // Remove requested non-relevant keys from the representor.
      if (typeof removeKeys !== 'undefined') {
        for (const removeKey of removeKeys) {
          // @ts-ignore
          delete groupRepresentor[removeKey];
        }
      }

      // Add counts, and min-max dates of the groups to task data.

      groupRepresentor.counts = (value as []).length;

      // Convert moment back to Date Object.
      groupRepresentor.created = dates.minDate.toDate();
      groupRepresentor.updated = dates.maxDate.toDate();

      groupsCopy.set(key, groupRepresentor as TasksGroup[]);
    });

    const finalGroupsArr = [...groupsCopy].map((groupEntry) => groupEntry[1]);

    return finalGroupsArr as TasksGroup[];
  };

  private readonly groupTasks = (tasksArr: Task[]): TasksGroup[] => {
    const GROUPING_KEYS = ['type', 'status', 'reason'];
    const REMOVE_KEYS = ['attempts', 'id'];

    const groups = new Map();

    for (const task of tasksArr) {
      let groupKey: { [key: string]: string } | string = {};

      // Building group key.
      for (const key of GROUPING_KEYS) {
        // @ts-ignore
        groupKey[key] = task[key];
      }

      groupKey = JSON.stringify(groupKey);

      if (!groups.has(groupKey)) {
        groups.set(groupKey, [task]);
      } else {
        const currentGroup = groups.get(groupKey);
        groups.set(groupKey, [...currentGroup, task]);
      }
    }

    return this.groupsMapToArray(groups, REMOVE_KEYS);
  };
}
