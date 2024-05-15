/**
 * 自助分析API
 */
import request from '@/utils/request'
import type { QueryInfo, QueryInfoListResponse, QueryInfoResponse } from '@/api/analysis/type'

enum API {
  GET_QUERY_INFO_LIST_URL = '/analysis/list/',
  GET_QUERY_INFO_PAGE_URL = '/analysis/page/',
  GET_RUN_QUERY_URL = '/analysis/run/',
  GET_LAST_QUERY_URL = '/analysis/last/',
  GET_QUERY_INFO_URL = '/analysis/'
}

export const reqQueryInfoList = () =>
  request.get<any, QueryInfoListResponse>(API.GET_QUERY_INFO_LIST_URL)

export const reqQueryPageInfoList = (pageNo: number, pageSize: number) =>
  request.get<any, any>(API.GET_QUERY_INFO_PAGE_URL + `${pageNo}/${pageSize}`)

export const reqRunQuery = (queryBody: QueryInfo) =>
  request.post<any, any>(API.GET_RUN_QUERY_URL, queryBody)

export const reqLastQuery = () => request.get<any, QueryInfoResponse>(API.GET_LAST_QUERY_URL)

export const reqQueryInfo = (uuid: string) =>
  request.get<any, QueryInfoResponse>(API.GET_QUERY_INFO_URL + `${uuid}`)
