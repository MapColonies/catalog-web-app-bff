import { get } from 'lodash';
import {
  FieldCategory,
  IPropFieldConfigInfo,
  Pycsw3DCatalogRecord,
  PycswDemCatalogRecord,
  PycswLayerCatalogRecord,
  PycswQuantizedMeshBestCatalogRecord,
  PolygonPartRecord,
  VectorBestMetadata,
} from '@map-colonies/mc-model-types';
import { pycswCatalogRecordUIAspects } from '../common/pycswRecord.ui-aspect';
import categoriesTranslation from '../common/ui-aspects/category.trsanslation';
import { CategoryConfig, EntityDescriptor, FieldConfig, FilterableFieldConfig } from '../graphql/entityDescriptor';
import { Group, groupBy } from './group-by';

const FIRST_CATEGORY = 'MAIN';

function buildField(field: IPropFieldConfigInfo, recordType: string, fieldComplexType?: string): FieldConfig {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { prop, complexType, category, subFields, ...restFieldConfigProps } = field;
  const fieldUIApect = fieldComplexType !== undefined ? `${fieldComplexType}.${prop}` : prop;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const uiAspectFieldConfig = pycswCatalogRecordUIAspects[recordType][fieldUIApect];

  // Field pattern validation from field config should be used for filters as well.
  // eslint-disable-next-line
  if (typeof (uiAspectFieldConfig as FieldConfig)?.isFilterable !== 'undefined') {
    const filterableConfig = (uiAspectFieldConfig as FieldConfig).isFilterable as FilterableFieldConfig;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    uiAspectFieldConfig.isFilterable = {
      ...filterableConfig,
      validation: {
        ...(filterableConfig.validation ?? {}),
        pattern: restFieldConfigProps.validation?.find((validation) => validation.pattern)?.pattern,
      },
    } as FilterableFieldConfig;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    fieldName: prop,
    label: '**** NO TRANSLATION KEY ****',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...uiAspectFieldConfig,
    ...restFieldConfigProps,
    validation: [...(get(uiAspectFieldConfig, 'validation', []) as []), ...(get(restFieldConfigProps, 'validation', []) as [])],
    // eslint-disable-next-line
    isRequired:
      restFieldConfigProps.validation !== undefined &&
      // eslint-disable-next-line
      restFieldConfigProps.validation.findIndex((validation) => validation.required === true) > -1
        ? true
        : restFieldConfigProps.isRequired ?? false,
  };
}

function arrangeCategories(categories: CategoryConfig[]): CategoryConfig[] {
  const fromIndex = categories.findIndex((cat) => cat.category === FIRST_CATEGORY);
  const category = categories[fromIndex];
  const arrangedArr = [...categories];

  arrangedArr.splice(fromIndex, 1);
  arrangedArr.splice(0, 0, category);

  return arrangedArr;
}

export function buildDescriptor(
  recordType:
    | typeof PycswLayerCatalogRecord
    | typeof Pycsw3DCatalogRecord
    | typeof PycswDemCatalogRecord
    | typeof VectorBestMetadata
    | typeof PycswQuantizedMeshBestCatalogRecord
    | typeof PolygonPartRecord
): EntityDescriptor {
  const fieldConfigs = groupBy(recordType.getFieldConfigs(), { keys: ['category'] });
  const recordCswMappings = recordType.getPyCSWMappings();
  const recordShapeFileMappings = recordType.getShpMappings();
  const categoriesMapped = fieldConfigs.map((categoryInfo: Group) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const category = categoryInfo.key.category as FieldCategory;
    return {
      category: category,
      categoryTitle: categoriesTranslation[category].displayKey,
      fields: categoryInfo.items.map((field: IPropFieldConfigInfo) => {
        const fieldConfig = buildField(field, recordType.name);
        // TODO: CHECK, does getPyCSWMapping might be faulty? this does not always return the correct value
        // For example, check the value of recordType.getPyCSWMapping('insertDate')?.queryableField

        // Add pycsw queryable name to field config
        // fieldConfig.queryableName = recordType.getPyCSWMapping(field.prop)?.queryableField ?? '';
        fieldConfig.queryableName = recordCswMappings.find((mapping) => mapping.prop === field.prop)?.queryableField ?? '';

        fieldConfig.shapeFileMapping = recordShapeFileMappings
          .find((mapping) => mapping.prop === field.prop)
          ?.shapeFileMappings.map(({ provider, valuePath }) => ({ provider, valuePath }));

        if (field.subFields !== undefined) {
          const complexType = field.complexType ? field.complexType.value.toLowerCase() : undefined;
          fieldConfig.subFields = field.subFields.fields.map((subField) => buildField(subField, recordType.name, complexType));
        }
        return fieldConfig;
      }),
    };
  }) as CategoryConfig[];

  const arrangedCategories = arrangeCategories(categoriesMapped);

  return {
    type: recordType.name,
    categories: arrangedCategories,
  };
}

export function getDescriptors(): EntityDescriptor[] {
  return [
    PycswLayerCatalogRecord,
    Pycsw3DCatalogRecord,
    PycswDemCatalogRecord,
    VectorBestMetadata,
    PycswQuantizedMeshBestCatalogRecord,
    PolygonPartRecord,
  ].map((recordType) => buildDescriptor(recordType));
}
