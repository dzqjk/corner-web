/**
 * 数据源相关的类型
 */
import type { ResponseData } from '@/api/interface/type'

export interface SourInfoCondition {
  typeId: number
  conditionFlag: number
  conditionValue: string
}

// 获取所有数据源信息类型
export interface SourceType {
  id: number
  typeName: string
  logoUrl: string
  total: number
  children: SourceInfo[]
}

export interface SourceInfoBody {
  sourceId?: number
  typeId: number
  sourceName: string
  sourceFlag: string
  sourceUrl: string
  sourceCategory: string
  userUUId: string
  account: string
  password: string
}

export interface SourceInfo {
  createTime: string
  userId: number
  account: string
  password: string
  sourceCategory: string
  sourceFlag: string
  sourceId: number
  sourceName: string
  sourceUrl: string
  typeId: number
  updateTime: string
  isDel: number
  sourceType: {
    id: number
    typeName: string
    logoUrl: string
  }
}

export type SourceTypeList = SourceType[]
export type SourceInfoList = SourceInfo[]

export type SourceTypeMenu = {
  list: SourceTypeList
  total: number
}

export interface SourceTypeResponse extends ResponseData {
  data: SourceTypeMenu
}

export interface SimpleSourceTypeResponse extends ResponseData {
  data: SourceTypeList
}

export interface SourceInfoResponse extends ResponseData {
  data: SourceInfo
}

export interface SourceInfoListResponse extends ResponseData {
  data: SourceInfoList
}
