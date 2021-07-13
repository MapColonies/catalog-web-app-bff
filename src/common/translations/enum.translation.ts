import { enumKeys } from '../../helpers/enums';

export function updateDictionary(propName: string, type: any): Record<string, string> {
  const dictionary: Record<string, string> = {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  for (const value of enumKeys<object>(type)) {
    dictionary[value] = `lookups.${propName}.${(value as string).toLowerCase()}`;
  }
  return dictionary;
}
