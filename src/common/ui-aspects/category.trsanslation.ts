import { FieldCategory } from '@map-colonies/mc-model-types';
import { IUIDisplayAspect, updateDictionary } from './enum.translation';

const categoriesTranslation = updateDictionary('fieldCategory', FieldCategory) as Record<FieldCategory, IUIDisplayAspect>;

export default categoriesTranslation;
