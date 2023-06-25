import { IncomingHttpHeaders } from 'http';

export interface IConfig {
  get: <T>(setting: string) => T;
  has: (setting: string) => boolean;
}

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
}
