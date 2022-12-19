import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import config from 'config';
import { IContext } from './common/interfaces';

export enum CatalogRecordItems {
  RASTER = 'RASTER',
  '3D' = '3D',
  DEM = 'DEM',
  VECTOR_BEST = 'VECTOR_BEST',
  QUANTIZED_MESH_BEST = 'QUANTIZED_MESH_BEST',
}

export const requestHandler = async (url: string, method: string, params: AxiosRequestConfig, ctx?: IContext): Promise<AxiosResponse> => {
  const requestConfig: AxiosRequestConfig = {
    url,
    method: method as Method,
    ...params,
    headers: {
      ...{ ...(params.headers ?? {}), ...(ctx ? { origin: ctx.requestHeaders.origin } : {}) },
    } as Record<string, unknown>,
  };

  return axios
    .request(requestConfig)
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const requestHandlerWithToken = async (url: string, method: string, params: AxiosRequestConfig, ctx: IContext): Promise<AxiosResponse> => {
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

  return requestHandler(url, method, reqConfig, ctx);
};
