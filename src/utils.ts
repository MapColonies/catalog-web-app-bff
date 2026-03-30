/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import axiosRetry from 'axios-retry';
import config from 'config';
import _, { get, isEmpty } from 'lodash';
import { container } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { Services } from './common/constants';
import { IContext, IService } from './common/interfaces';
import { RasterJobTypeEnum } from './common/job-manager/job-manager-raster';
import { Domain } from './graphql/domain';
import { Job } from './graphql/job';

//@ts-ignore
axiosRetry(axios, {
  retries: 0,
});

const timeout = Number(config.get('requestTimeout'));
const axiosInstance = axios.create({
  timeout: isNaN(timeout) ? 30000 : timeout,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

const isHeader = (injectionType: string): boolean => {
  return injectionType.toLowerCase() === 'header';
};

const isQueryParam = (injectionType: string): boolean => {
  return injectionType.toLowerCase() === 'queryparam';
};

export const requestHandler = async (url: string, method: string, params: AxiosRequestConfig, ctx?: IContext): Promise<AxiosResponse> => {
  const origin = ctx?.requestHeaders.origin;

  const requestConfig: AxiosRequestConfig = {
    url,
    method: method as Method,
    ...params,
    headers: {
      ...{
        ...(params.headers ?? {}),
        ...(typeof origin === 'string' && { origin }),
      },
    } as Record<string, unknown>,
  };

  return axiosInstance
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
  /* eslint-disable */
  const logger = container.resolve<Logger>(Services.LOGGER);
  // @ts-ignore
  const { headers, handleAs, ...rest } = params;
  /* eslint-enable */
  logger.debug(`[Utils][requestExecutor] {_METHOD: '${method}', _SERVICE: {${stringifyObject(service)}}, ${stringifyObject(rest)}}`);
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

export const addRasterJobActions = (job: Job): void => {
  if (job.domain === Domain.RASTER) {
    const isRestorable = job.type === RasterJobTypeEnum.NEW || job.type === RasterJobTypeEnum.UPDATE || job.type === RasterJobTypeEnum.SWAP_UPDATE; // Important: job.parameters === null, getJobs API excludes parameters field
    job.availableActions = {
      ...(job.availableActions ?? { isResumable: false, isAbortable: false }),
      ...(isRestorable ? { isRestorable: true } : {}),
    };
  }
};

/* eslint-disable */
export const stringifyObject = (obj: any): string => {
  /* eslint-enable */
  return _.map(obj, (value, key) => {
    return `${key}: ${JSON.stringify(value)}`;
  })
    .join(', ')
    .replace(/\\*"/g, "'")
    .replace(/data:\s*'(.*)>'/, 'data: "$1>"');
};

export const extractErrorMessage = (err: unknown): string => {
  let message;
  let status;
  if (!isEmpty(err)) {
    const httpError = err as Record<string, unknown>;
    if (!isEmpty(httpError.response)) {
      status = String(get(httpError, 'response.status', ''));
      message = get(httpError, 'response.data.message', undefined) ?? get(httpError, 'response.statusText');
    } else if (!isEmpty(get(err, 'message'))) {
      message = get(err, 'message') as string;
    }
  }
  const errorMessage = message ?? String(err);
  return !isEmpty(status) ? `httpStatus: ${status as string} | ${errorMessage as string}` : (errorMessage as string);
};
