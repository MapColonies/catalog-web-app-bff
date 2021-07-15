import { enumKeys } from '../../helpers/enums';

export function updateDictionary(propName: string, type: any): Record<string, unknown> {
  const dictionary: Record<string, unknown> = {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  for (const value of enumKeys<object>(type)) {
    dictionary[value] = {
      displayKey: `lookups.${propName}.${(value as string).toLowerCase()}`,
      tooltipKey: '',
      icon: '',
    };
  }
  return dictionary;
}
