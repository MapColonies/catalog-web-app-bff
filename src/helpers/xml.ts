export const compactXML = (xmlStr: string): string => {
  /* eslint-disable */
  return xmlStr
    .replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, '')
    .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns')
    .replace(/>\s{0,}</g, '><');
  /* eslint-enable */
};
