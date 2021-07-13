import { FieldCategory } from '@map-colonies/mc-model-types';
import { updateDictionary } from './enum.translation';

// const categoriesTranslation = {} as Record<FieldCategory, string>;
// categoriesTranslation[FieldCategory.MAIN] = 'fields-categories.main';
// categoriesTranslation[FieldCategory.GENERAL] = 'fields-categories.general';
// categoriesTranslation[FieldCategory.GEO_INFO] = 'fields-categories.geo';

const categoriesTranslation = updateDictionary('fieldCategory', FieldCategory) as Record<FieldCategory, string>;

export default categoriesTranslation;
