import { IncomingHttpHeaders } from 'http';
// import { IConfig } from 'config';

export { IConfig } from 'config';
export interface OpenApiConfig {
  filePath: string;
  basePath: string;
  jsonPath: string;
  uiPath: string;
}

export interface IContext {
  requestHeaders: IncomingHttpHeaders;
}

export interface IService {
  url: string;
  exposureType: 'SERVICE' | 'ROUTE';
  wfsFeatureType?: string;
}
