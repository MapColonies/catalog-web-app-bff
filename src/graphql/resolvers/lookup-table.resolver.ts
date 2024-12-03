import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IConfig } from 'config';
import { get } from 'lodash';
import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { zoomLevelToResolutionDeg, zoomLevelToResolutionMeter } from '@map-colonies/mc-utils';
import { Services } from '../../common/constants';
import { IContext, IService } from '../../common/interfaces';
import { getDescriptors } from '../../helpers/entityDescriptor.helpers';
import { requestExecutor } from '../../utils';
import { GetLookupTablesParams } from '../inputTypes';
import { LookupOption, LookupTableData, LookupTableField } from '../lookupTablesData';

const CUSTOM_LOOKUP_TABLES = ['zoomlevelresolutions'];

@Resolver()
export class LookupTablesResolver {
  private readonly logger: Logger;
  private readonly config: IConfig;
  private readonly service: IService;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.config = container.resolve(Services.CONFIG);
    this.service = this.config.get('lookupTablesService');
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
      this.logger.error('[LookupTablesResolver][getLookupTablesData]', error);
      throw new Error('Failed to fetch lookup tables data. Please try again later');
    }
  }

  private async fetchLookupTablesData(ctx: IContext, lookupFields?: LookupTableField[]): Promise<LookupTableData> {
    this.logger.info('[LookupTablesResolver][fetchLookupTablesData] fetching lookup tables data');
    const requestedLookupTables = lookupFields ?? ([] as LookupTableField[]);
    const lookupTableField: LookupTableField[] = [...this.extractLookupFieldsFromDescriptors(), ...requestedLookupTables];
    const lookupKeyToExcludeFields = this.mapLookupKeyToExcludeFields(lookupTableField);
    const lookupKeys = Array.from(lookupKeyToExcludeFields.keys());

    const promises = this.buildPromises(lookupKeyToExcludeFields, ctx);
    this.addCustomLookupTables(promises, lookupKeys);

    try {
      const dictionary = await this.buildDictionary(lookupKeys, promises);
      return { dictionary };
    } catch (error) {
      this.logger.error('[LookupTablesResolver][fetchLookupTablesData][buildDictionary]', error);
      throw new Error('Error building dictionary from lookup tables. Please check the service availability.');
    }
  }

  private addCustomLookupTables(promises: Promise<AxiosResponse<LookupOption[]>>[], lookupKeys: string[]): void {
    const getResolutionsLookup: () => Promise<AxiosResponse<LookupOption[]>> = async () => {
      const MAX_RESOLUTION = 22;
      const resArr = [];
      for (let i = 0; i < MAX_RESOLUTION + 1; i++) {
        resArr[i] = {
          value: `${i}`,
          translationCode: `${i}`,
          properties: {
            resolutionDeg: zoomLevelToResolutionDeg(i),
            resolutionMeter: zoomLevelToResolutionMeter(i),
          },
        };
      }
      return Promise.resolve<AxiosResponse<LookupOption[]>>({
        data: resArr as LookupOption[],
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      });
    };

    lookupKeys.push(...CUSTOM_LOOKUP_TABLES);

    promises.push(getResolutionsLookup());
  }

  private async buildDictionary(lookupKeys: string[], promises: Promise<AxiosResponse<LookupOption[]>>[]): Promise<Record<string, LookupOption[]>> {
    const lookupDataMap: Record<string, LookupOption[]> = {};

    try {
      const allResponses = await Promise.all<AxiosResponse<LookupOption[]>>(promises);
      for (let i = 0; i < lookupKeys.length; i++) {
        const key = lookupKeys[i];
        const response = allResponses[i];
        lookupDataMap[key] = response.data;
      }
    } catch (error) {
      this.logger.error('[LookupTablesResolver][buildDictionary] Error fetching data', error);
      throw new Error('Failed to retrieve lookup data. Please ensure the lookup-tables service is available.');
    }

    return lookupDataMap;
  }

  private buildPromises(lookupKeyToExcludeFields: Map<string, string[]>, ctx: IContext): Promise<AxiosResponse<LookupOption[]>>[] {
    const promises: Promise<AxiosResponse<LookupOption[]>>[] = [];
    for (const [lookupKey, lookupExcludeFields] of lookupKeyToExcludeFields.entries()) {
      const url = `${this.service.url}/lookup-tables/lookupData/${lookupKey}`;
      const payload: AxiosRequestConfig = this.buildPayload(lookupExcludeFields);
      promises.push(
        requestExecutor(
          {
            url,
            exposureType: this.service.exposureType,
          },
          'GET',
          payload,
          ctx
        ) as Promise<AxiosResponse<LookupOption[]>>
      );
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
          .filter((f) => f.lookupTable && !CUSTOM_LOOKUP_TABLES.includes(f.lookupTable))
          .map(({ lookupTable, lookupExcludeFields }) => ({ lookupTable, lookupExcludeFields }))
      )
      .flat();
  }
}
