// eslint-disable-next-line @typescript-eslint/ban-types
export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

export function updateDictionary(recordTranslation: Record<string, any>, propName: string, type: any): void {
  const dictionary: Record<string, string> = {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  for (const value of enumKeys<object>(type)) {
    dictionary[value] = `lookups.sensorType.${(value as string).toLowerCase()}`;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  recordTranslation[propName].translate.dictionary = dictionary;
}
