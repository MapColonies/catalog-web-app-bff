import { get } from 'lodash';
import {
  basemapModel,
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
import { notCatalogRecordUIAspects } from '../common/notCatalogRecord.ui-aspect';
import categoriesTranslation from '../common/ui-aspects/category.trsanslation';
import { CategoryConfig, EntityDescriptor, FieldConfig, FilterableFieldConfig } from '../graphql/entityDescriptor';
import { Group, groupBy } from './group-by';

const FIRST_CATEGORY = FieldCategory.MAIN;
const recordUIAspects = { ...pycswCatalogRecordUIAspects, ...notCatalogRecordUIAspects };

function buildField(field: IPropFieldConfigInfo, recordType: string, fieldComplexType?: string): FieldConfig {
  const { prop, complexType, category, subFields, ...restFieldConfigProps } = field;
  const fieldUIApect = fieldComplexType !== undefined ? `${fieldComplexType}.${prop}` : prop;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const uiAspectFieldConfig = recordUIAspects[recordType][fieldUIApect];

  // Field pattern validation from field config should be used for filters as well.
  // eslint-disable-next-line
  if (typeof (uiAspectFieldConfig as FieldConfig)?.isFilterable !== 'undefined') {
    const filterableConfig = (uiAspectFieldConfig as FieldConfig).isFilterable as FilterableFieldConfig;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    uiAspectFieldConfig.isFilterable = {
      ...filterableConfig,
      validation: {
        ...(filterableConfig.validation ?? {}),
        pattern: restFieldConfigProps.validation?.find((validation) => validation.pattern != undefined && validation.pattern !== '')?.pattern,
      },
    } as FilterableFieldConfig;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const fieldConfig: FieldConfig = {
    fieldName: prop,
    label: '**** NO TRANSLATION KEY ****',

    ...uiAspectFieldConfig,
    ...restFieldConfigProps,
    validation: [...(get(uiAspectFieldConfig, 'validation', []) as []), ...(get(restFieldConfigProps, 'validation', []) as [])],

    isRequired:
      restFieldConfigProps.validation !== undefined &&
      // eslint-disable-next-line
      restFieldConfigProps.validation.findIndex((validation) => validation.required === true) > -1
        ? true
        : restFieldConfigProps.isRequired ?? false,
  };

  // Recurses to any depth (not just one level) - needed once a complex type's own fields are
  // themselves complex (e.g. basemap's `layers[].source.uniqueness`/`.details`), which none of the
  // other entities' field trees happened to exercise before.
  if (subFields !== undefined) {
    const complexTypeValue = complexType ? complexType.value.toLowerCase() : undefined;
    fieldConfig.subFields = subFields.fields.map((subField) => buildField(subField, recordType, complexTypeValue));
  }

  return fieldConfig;
}

function arrangeCategories(categories: CategoryConfig[]): CategoryConfig[] {
  const fromIndex = categories.findIndex((cat) => cat.category === FIRST_CATEGORY);
  const category = categories[fromIndex];
  const arrangedArr = [...categories];

  arrangedArr.splice(fromIndex, 1);
  arrangedArr.splice(0, 0, category);

  return arrangedArr;
}

// `basemapModel` (a zod-backed `AnnotatedZodObject`, see `@map-colonies/mc-model-types`) has no PyCSW/
// shapefile mappings - basemaps aren't sourced from CSW catalogs or shapefiles - so those two methods
// are optional here, unlike on the decorator-based `Pycsw*`/`VectorBestMetadata`/`PolygonPartRecord`
// classes below, which always implement them.
interface DescriptorSource {
  name: string;
  getFieldConfigs: () => IPropFieldConfigInfo[];
  getPyCSWMappings?: () => ReturnType<typeof PycswLayerCatalogRecord.getPyCSWMappings>;
  getShpMappings?: () => ReturnType<typeof PycswLayerCatalogRecord.getShpMappings>;
}

export function buildDescriptor(
  recordType:
    | typeof PycswLayerCatalogRecord
    | typeof Pycsw3DCatalogRecord
    | typeof PycswDemCatalogRecord
    | typeof VectorBestMetadata
    | typeof PycswQuantizedMeshBestCatalogRecord
    | typeof PolygonPartRecord
    | DescriptorSource
): EntityDescriptor {
  const fieldConfigs = groupBy(recordType.getFieldConfigs(), { keys: ['category'] });
  const recordCswMappings = recordType.getPyCSWMappings?.() ?? [];
  const recordShapeFileMappings = recordType.getShpMappings?.() ?? [];
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
    basemapModel,
  ].map((recordType) => buildDescriptor(recordType));
}
