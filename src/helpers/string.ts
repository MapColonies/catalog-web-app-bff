export const camelize = (value: string): string => {
  return value.toLowerCase().replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1: string, p2: string, offset) => {
    if (p2) {
      return p2.toUpperCase();
    }
    return p1.toLowerCase();
  });
};

export const absoluteToRelativePath = (path: string): string => {
  const pathArr = path.split('/');
  pathArr.shift();

  return pathArr.join('/');
};

export const absolutePathToNfs = (path: string): string => {
  return path.replace(/\//g, '\\');
};
