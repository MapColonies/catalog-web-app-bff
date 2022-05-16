import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import config from 'config';

export enum CatalogRecordItems {
  RASTER = 'RASTER',
  '3D' = '3D',
  DEM = 'DEM',
  VECTOR_BEST = 'VECTOR_BEST',
  QUANTIZED_MESH_BEST = 'QUANTIZED_MESH_BEST',
}

export const requestHandler = async (url: string, method: string, params: AxiosRequestConfig): Promise<AxiosResponse> => {
  return axios
    .request({ url, method: method as Method, ...params })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const requestHandlerWithToken = async (url: string, method: string, params: AxiosRequestConfig): Promise<AxiosResponse> => {
  const injectionType = config.get<string>('accessToken.injectionType');
  const attributeName = config.get<string>('accessToken.attributeName');
  const tokenValue = config.get<string>('accessToken.tokenValue');
  const reqConfig = { ...params };

  if (injectionType.toLowerCase() === 'header') {
    reqConfig.headers = {
      ...reqConfig.headers,
      [attributeName]: tokenValue,
    } as Record<string, unknown>;
  } else if (injectionType.toLowerCase() === 'queryparam') {
    reqConfig.params = {
      ...reqConfig.params,
      [attributeName]: tokenValue,
    } as Record<string, unknown>;
  }

  return requestHandler(url, method, reqConfig);
};

export const absoluteToRelativePath = (path: string): string => {
  const pathArr = path.split('/');
  pathArr.shift();

  return pathArr.join('/');
};

export const absolutePathToNfs = (path: string): string => {
  return path.replace(/\//g, '\\');
};
