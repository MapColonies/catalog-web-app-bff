import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export enum CatalogRecordItems {
  RASTER = 'RASTER',
  '3D' = '3D',
  DEM = 'DEM',
}

export const requestHandler = async (url: string, method: string, params: AxiosRequestConfig): Promise<AxiosResponse> => {
  return axios
    .request({ url, method: method as Method, ...params })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};
