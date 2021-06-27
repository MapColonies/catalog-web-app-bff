import { FieldCategory } from '@map-colonies/mc-model-types';

const categoriesTranslation = {} as Record<FieldCategory, string>;
categoriesTranslation[FieldCategory.MAIN] = 'fields-categories.main';
categoriesTranslation[FieldCategory.GENERAL] = 'fields-categories.general';
categoriesTranslation[FieldCategory.GEO_INFO] = 'fields-categories.geo';

export default categoriesTranslation;
