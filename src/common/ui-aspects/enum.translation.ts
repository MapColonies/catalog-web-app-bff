import { enumKeys } from '../../helpers/enums';
import { camelize } from '../../helpers/string';

export interface IUIDisplayAspect {
  displayKey: string;
  tooltipKey?: string;
  icon?: string;
}

export function updateDictionary(propName: string, type: any): Record<string, IUIDisplayAspect> {
  const dictionary: Record<string, IUIDisplayAspect> = {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  for (const value of enumKeys<object>(type)) {
    dictionary[value] = {
      displayKey: `lookups.${propName}.${(value as string).toLowerCase()}`,
      tooltipKey: `lookups.${propName}.${(value as string).toLowerCase()}.tooltip`,
      icon: `mc-icon-${camelize(value)}`,
    };
  }
  return dictionary;
}
