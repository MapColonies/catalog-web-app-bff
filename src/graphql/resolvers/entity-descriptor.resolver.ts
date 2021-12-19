/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logger } from '@map-colonies/js-logger';
import {
  FieldCategory,
  IPropFieldConfigInfo,
  Pycsw3DCatalogRecord,
  PycswBestCatalogRecord,
  PycswDemCatalogRecord,
  PycswLayerCatalogRecord,
} from '@map-colonies/mc-model-types';
import { container } from 'tsyringe';
import { Resolver, Query } from 'type-graphql';
import { Services } from '../../common/constants';
import { pycswCatalogRecordUIAspects } from '../../common/pycswRecord.ui-aspect';
import categoriesTranslation from '../../common/ui-aspects/category.trsanslation';
import { Group, groupBy } from '../../helpers/group-by';
import { CategoryConfig, EntityDescriptor, FieldConfig } from '../entityDescriptor';

const FIRST_CATEGORY = 'MAIN';

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
      const data = await Promise.resolve(this.getDescriptors());
      return data;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  private buildField(field: IPropFieldConfigInfo, recordType: string, fieldComplexType?: string): FieldConfig {
    const { prop, complexType, category, subFields, ...restFieldConfigProps } = field;
    const fieldUIApect = fieldComplexType !== undefined ? `${fieldComplexType}.${prop}` : prop;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      fieldName: prop,
      label: '**** NO TRANSLATION KEY ****',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...pycswCatalogRecordUIAspects[recordType][fieldUIApect],
      ...restFieldConfigProps,
      // eslint-disable-next-line
      isRequired:
        restFieldConfigProps.validation !== undefined &&
        // eslint-disable-next-line
        restFieldConfigProps.validation.findIndex((validation) => validation.required === true) > -1
          ? true
          : restFieldConfigProps.isRequired ?? false,
    };
  }

  private arrangeCategories(categories: CategoryConfig[]): CategoryConfig[] {
    const fromIndex = categories.findIndex((cat) => cat.category === FIRST_CATEGORY);
    const category = categories[fromIndex];
    const arrangedArr = [...categories];

    arrangedArr.splice(fromIndex, 1);
    arrangedArr.splice(0, 0, category);

    return arrangedArr;
  }

  private buildDescriptor(
    recordType: typeof PycswLayerCatalogRecord | typeof Pycsw3DCatalogRecord | typeof PycswDemCatalogRecord | typeof PycswBestCatalogRecord
  ): EntityDescriptor {
    const fieldConfigs = groupBy(recordType.getFieldConfigs(), { keys: ['category'] });

    const categoriesMapped = fieldConfigs.map((categoryInfo: Group): CategoryConfig => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const category = categoryInfo.key.category as FieldCategory;
      return {
        category: category,
        categoryTitle: categoriesTranslation[category].displayKey,
        fields: categoryInfo.items.map((field: IPropFieldConfigInfo) => {
          const fieldConfig = this.buildField(field, recordType.name);
          if (field.subFields !== undefined) {
            const complexType = field.complexType ? field.complexType.value.toLowerCase() : undefined;
            fieldConfig.subFields = field.subFields.fields.map((subField) => this.buildField(subField, recordType.name, complexType));
          }
          return fieldConfig;
        }),
      };
    });

    const arrangedCategories = this.arrangeCategories(categoriesMapped);

    return {
      type: recordType.name,
      categories: arrangedCategories,
    };
  }

  private getDescriptors(): EntityDescriptor[] {
    return [PycswLayerCatalogRecord, Pycsw3DCatalogRecord, PycswDemCatalogRecord, PycswBestCatalogRecord].map((recordType) =>
      this.buildDescriptor(recordType)
    );
  }
}
