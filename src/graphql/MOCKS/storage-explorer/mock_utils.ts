import { File } from '../../storage-explorer';

export default function searchMockData(path: string, mockData: Record<string, File>): File[] {
  const isRoot = path === '/';
  const rootDir = Object.values(mockData).filter((file) => file.name.startsWith('\\'));

  if (isRoot) {
    return rootDir.map((file) => {
      if ('childrenCount' in file && 'childrenIds' in file) {
        const { childrenCount, childrenIds, ...restFile } = file;
        return { ...restFile, selectable: !restFile.isDir };
      }
    }) as File[];
  }

  if (path.endsWith('/')) {
    const omitLastIdx = -1;
    path = path.slice(0, omitLastIdx);
  }

  const selected = (mockData as Record<string, unknown>)[path] as typeof rootDir[0];

  if (typeof selected !== 'undefined' && 'childrenIds' in selected) {
    const childs = selected.childrenIds?.map((child) => {
      return { ...Object.values(mockData).find((file) => file.id === child) };
    }) as File[];

    return childs;
  }

  return [] as File[];
}
