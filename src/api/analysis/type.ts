/**
 * 自助分析的类对象
 */
import type { ResponseData } from '@/api/interface/type'

export interface QueryInfo {
  queryId: number
  uuid: string
  sourceId: number
  querySql: string
  queryResult: string
  runStatus: number
  runLog: string
  runDuration: number
  runEngine: string
  runStartTime: string
}

export type QueryInfoList = QueryInfo[]

export interface QueryInfoListResponse extends ResponseData {
  data: QueryInfoList
}

export interface QueryInfoResponse extends ResponseData {
  data: QueryInfo
}
