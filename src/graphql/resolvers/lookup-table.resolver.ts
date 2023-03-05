import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IConfig } from 'config';
import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { getDescriptors } from '../../helpers/entityDescriptor.helpers';
import { requestHandler } from '../../utils';
import { GetLookupTablesParams } from '../inputTypes';
import { LookupOption, LookupTableData, LookupTableField } from '../lookupTablesData';

@Resolver()
export class LookupTablesResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly serviceURL: string;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.serviceURL = this.config.get('lookupTablesService.url');
  }

  @Query(() => LookupTableData)
  public async getLookupTablesData(
    @Ctx()
    ctx: IContext,
    @Arg('data')
    { lookupFields }: GetLookupTablesParams
  ): Promise<LookupTableData> {
    try {
      const dictionary = await this.fetchLookupTablesData(ctx, lookupFields);
      return dictionary;
    } catch (error) {
      this.logger.error('[LookupTablesResolver][getLookupTablesData]', error as string);
      throw error;
    }
  }

  public async fetchLookupTablesData(ctx: IContext, lookupFields?: LookupTableField[]): Promise<LookupTableData> {
    this.logger.info('[LookupTablesResolver][fetchLookupTablesData] fetching lookup tables data');
    const requestedLookupTables = lookupFields ?? ([] as LookupTableField[]);
    const lookupTableField: LookupTableField[] = [...this.extractLookupFieldsFromDescriptors(), ...requestedLookupTables];
    const lookupKeyToExcludeFields = this.mapLookupKeyToExcludeFields(lookupTableField);
    const lookupKeys = Array.from(lookupKeyToExcludeFields.keys());

    const promises = this.buildPromises(lookupKeyToExcludeFields, ctx);
    const dictionary = await this.buildDictionary(lookupKeys, promises);

    return { dictionary };
  }

  private async buildDictionary(lookupKeys: string[], promises: Promise<AxiosResponse<LookupOption[]>>[]): Promise<Record<string, LookupOption[]>> {
    const lookupDataMap: Record<string, LookupOption[]> = {};
    const allResponses = await Promise.all<AxiosResponse<LookupOption[]>>(promises);
    for (let i = 0; i < lookupKeys.length; i++) {
      const key = lookupKeys[i];
      const { data } = allResponses[i];
      lookupDataMap[key] = data;
    }

    return lookupDataMap;
  }

  private buildPromises(lookupKeyToExcludeFields: Map<string, string[]>, ctx: IContext): Promise<AxiosResponse<LookupOption[]>>[] {
    const promises: Promise<AxiosResponse<LookupOption[]>>[] = [];
    for (const [lookupKey, lookupExcludeFields] of lookupKeyToExcludeFields.entries()) {
      const url = `${this.serviceURL}/lookupData/${lookupKey}`;
      const payload: AxiosRequestConfig = this.buildPayload(lookupExcludeFields);
      promises.push(requestHandler(url, 'GET', payload, ctx) as Promise<AxiosResponse<LookupOption[]>>);
    }

    return promises;
  }

  private buildPayload(lookupExcludeFields: string[]): AxiosRequestConfig {
    if (lookupExcludeFields.length === 0) {
      return {};
    }

    const excludeFieldsQuery = lookupExcludeFields.join(',');
    return {
      params: {
        excludeFieldsQuery,
      },
    };
  }

  private mapLookupKeyToExcludeFields(lookupTableField: LookupTableField[]): Map<string, string[]> {
    const lookupMap: Map<string, string[]> = new Map<string, string[]>();
    for (const { lookupTable, lookupExcludeFields } of lookupTableField) {
      // We decide to take the FIRST exclude fields that match our lookupKey
      if (lookupTable !== undefined && !lookupMap.has(lookupTable)) {
        lookupMap.set(lookupTable, lookupExcludeFields ?? []);
      }
    }

    return lookupMap;
  }

  private extractLookupFieldsFromDescriptors(): LookupTableField[] {
    const descriptors = getDescriptors();

    return descriptors
      .map((e) =>
        e.categories
          .map((c) => c.fields)
          .flat()
          .filter((f) => f.lookupTable)
          .map(({ lookupTable, lookupExcludeFields }) => ({ lookupTable, lookupExcludeFields }))
      )
      .flat();
  }
}
