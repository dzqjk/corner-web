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
  sourceCount: number
  sourceList: SourceInfo[]
}

export interface SourceInfoBody {
  sourceId?: number
  typeId: number
  sourceName: string
  sourceFlag: string
  sourceUrl: string
  sourceCategory: string
  ownerName: string
  account: string
  password: string
}

export interface SourceInfo {
  createTime: string
  ownerName: string
  account: string
  password: string
  sourceCategory: string
  sourceFlag: string
  sourceId: number
  sourceName: string
  sourceUrl: string
  typeId: number
  updateTime: string
  sourceType: {
    id: number
    typeName: string
    logoUrl: string
  }
}

export type SourceTypeList = SourceType[]
export type SourceInfoList = SourceInfo[]

export interface SourceTypeResponse extends ResponseData {
  data: {
    list: SourceTypeList
    total: number
  }
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
