import { FieldCategory } from '@map-colonies/mc-model-types';
import { updateDictionary } from './enum.translation';

const categoriesTranslation = updateDictionary('fieldCategory', FieldCategory) as Record<FieldCategory, string>;

export default categoriesTranslation;
