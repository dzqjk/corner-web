/**
 * 任务相关的接口
 */
import request from '@/utils/request'
import type { TableInfoResponse, TaskCondition, TaskInfoResponse } from '@/api/task/type'
import type { SimpleSourceTypeResponse } from '@/api/source/type'

enum API {
  TASK_LIST_URL = '/task/list/',
  TASK_LIST_PAGE_URL = '/task/page/',
  TASK_SOURCE_TYPE_URL = '/task/sourceType/',
  TASK_SINK_TYPE_URL = '/task/sinkType/',
  TASK_DETAIL_URL = '/task/',
  TASK_ADD_URL = '/task/add',
  TASK_RUN_URL = '/task/run/',
  TASK_STOP_URL = '/task/stop/',
  TASK_RESTART_URL = '/task/restart/',
  TABLE_INFO_URL = '/common/jdbc/table/info/'
}

export const reqTaskList = (pageNo: number, pageSize: number, condition: TaskCondition) =>
  request.get<any, any>(
    API.TASK_LIST_PAGE_URL +
      `${pageNo}/${pageSize}?runStatus=${condition.runStatus}&sourceType=${condition.sourceType}&sourceId=${condition.sourceId}` +
      `&sinkType=${condition.sinkType}&conditionFlag=${condition.conditionFlag}&conditionValue=${condition.conditionValue}`
  )
// 获取任务所有的数据源类型
export const reqTaskSourceType = () =>
  request.get<any, SimpleSourceTypeResponse>(API.TASK_SOURCE_TYPE_URL)

// 获取任务所有的数据去向类型
export const reqTaskSinkType = () =>
  request.get<any, SimpleSourceTypeResponse>(API.TASK_SINK_TYPE_URL)

export const reqDeleteTask = (taskId: number) =>
  request.delete<any, any>(API.TASK_DETAIL_URL + `${taskId}`)

export const reqTaskInfo = (taskId: number) =>
  request.get<any, TaskInfoResponse>(API.TASK_DETAIL_URL + `${taskId}`)

export const reqTableInfo = (sourceId: number, databaseName: string, tableName: string) =>
  request.get<any, TableInfoResponse>(
    API.TABLE_INFO_URL + `${sourceId}?databaseName=${databaseName}&tableName=${tableName}`
  )
