import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import axiosRetry from 'axios-retry';
import config from 'config';
import { RasterJobTypeEnum } from './common/job-manager/job-manager-raster';
import { IContext, IService } from './common/interfaces';
import { Job } from './graphql/job';
import { Domain } from './graphql/domain';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
axiosRetry(axios, {
  retries: 0,
});

const isHeader = (injectionType: string): boolean => {
  return injectionType.toLowerCase() === 'header';
};

const isQueryParam = (injectionType: string): boolean => {
  return injectionType.toLowerCase() === 'queryparam';
};

export const addRasterJobActions = (job: Job): void => {
  if (job.domain === Domain.RASTER) {
    const isRestorable = job.type === RasterJobTypeEnum.NEW || job.type === RasterJobTypeEnum.UPDATE; // Important: job.parameters === null, getJobs API excludes parameters field
    job.availableActions = {
      ...(job.availableActions ?? { isResumable: false, isAbortable: false }),
      ...(isRestorable ? { isRestorable: true } : {}),
    };
  }
};

export const requestHandler = async (url: string, method: string, params: AxiosRequestConfig, ctx?: IContext): Promise<AxiosResponse> => {
  const origin = ctx?.requestHeaders.origin;

  const requestConfig: AxiosRequestConfig = {
    url,
    method: method as Method,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    ...params,
    headers: {
      ...{
        ...(params.headers ?? {}),
        ...(typeof origin === 'string' && { origin }),
      },
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

  if (isHeader(injectionType)) {
    reqConfig.headers = {
      ...reqConfig.headers,
      [attributeName]: tokenValue,
    } as Record<string, unknown>;
  } else if (isQueryParam(injectionType)) {
    reqConfig.params = {
      ...reqConfig.params,
      [attributeName]: tokenValue,
    } as Record<string, unknown>;
  }

  return requestHandler(url, method, reqConfig, ctx);
};

export const requestExecutor = async (service: IService, method: string, params: AxiosRequestConfig, ctx: IContext): Promise<AxiosResponse> => {
  return service.exposureType === 'ROUTE'
    ? requestHandlerWithToken(service.url, method, params, ctx)
    : requestHandler(service.url, method, params, ctx);
};

export const urlHandler = (service: IService): string => {
  const injectionType = config.get<string>('accessToken.injectionType');
  const attributeName = config.get<string>('accessToken.attributeName');
  const tokenValue = config.get<string>('accessToken.tokenValue');

  if (service.exposureType === 'ROUTE' && isQueryParam(injectionType)) {
    return `${service.url}?${attributeName}=${tokenValue}`;
  }

  return service.url;
};
