/**
 * 任务相关的数据类型
 */
import type { SourceInfo, SourceType } from '@/api/source/type'
import type { ResponseData } from '@/api/interface/type'
import type { UserDetail } from '@/api/user/type'

export interface TaskInfo {
  taskId: number
  taskName: string
  runStatus: number
  sourceType: number
  sourceTypeInfo: SourceType
  sourceId: number
  sourceInfo: SourceInfo
  sourceDatabase: string
  sourceTable: string
  sourceColumns: string
  sourceCondition: string
  sinkType: number
  sinkTypeInfo: SourceType
  sinkId: number
  sinkInfo: SourceInfo
  sinkDatabase: string
  sinkTable: string
  sinkColumns: string
  sinkInsertMode: number
  sinkPartition: string
  sinkPartitionVal: string
  taskDescription: string
  userUUId: string
  ownerInfo: UserDetail
  createTime: string
  updateTime: string
  isDel: number
  isOnline: number
  runLog: string
}

export interface TaskCondition {
  runStatus: number
  sourceType: number
  sinkType: number
  sourceId: number
  conditionFlag: number
  conditionValue: string
}

export interface ColumnInfo {
  columnName: string
  columnType: string
  partitionColumn: boolean
}

export type ColumnInfoList = ColumnInfo[]

export interface TableInfo {
  databaseName: string
  tableName: string
  partition: boolean
  partitionColumn: string
  columnInfoList: ColumnInfoList
}

export type TableInfoList = TableInfo[]

export type TaskInfoList = TaskInfo[]

export interface TaskInfoListResponse extends ResponseData {
  data: TaskInfoList
}

export interface TaskInfoResponse extends ResponseData {
  data: TaskInfo
}

export interface TableInfoResponse extends ResponseData {
  data: TableInfo
}
