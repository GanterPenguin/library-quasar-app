import axios, { AxiosResponse } from 'axios';
import { removeEmpty } from 'lib/utils';
import { cloneDeep } from 'lodash';
import { SearchParams } from 'models/filters';
import { Library } from 'models/Library';

export function request<T>(
  method: string,
  url: string,
  data?: Record<string, string> | string | ArrayBuffer,
  params?: SearchParams,
  headers?: Record<string, string>,
  responseType?: string,
): Promise<AxiosResponse<T>> {
  let paramsCopy;
  if (params) {
    paramsCopy = cloneDeep(params);
    removeEmpty(paramsCopy);
  }
  const axiosArguments: Record<string, unknown> = {
    method,
    url,
    data,
    params: paramsCopy,
    headers,
    responseType,
  };
  Object.keys(axiosArguments).forEach((key) => {
    if (!axiosArguments[key]) delete axiosArguments[key];
  });
  return axios(axiosArguments);
}

export async function getLibrariesList(
  params: SearchParams = { _limit: 10 },
) {
  return request<Library[]>('get', '/api/libraries/', undefined, params);
}

export async function getLibrariyDetail(id: number) {
  return request<Library>('get', `/api/libraries/${id}`);
}
