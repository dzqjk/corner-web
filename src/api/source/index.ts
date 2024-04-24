import request from '@/utils/request'
import type {
  SimpleSourceTypeResponse,
  SourceInfo,
  SourceInfoBody,
  SourceInfoListResponse,
  SourceInfoResponse,
  SourceTypeResponse,
  SourInfoCondition
} from '@/api/source/type'

enum API {
  SOURCE_TYPE_URL = '/source/type/list/', // 获取数据源类型信息API接口地址
  SIMPLE_SOURCE_TYPE_URL = '/source/type/simple/', // 获取数据源类型(简单信息)信息API接口地址
  SOURCE_INFO_URL = '/source/info/page/', // 获取数据源信息API接口地址
  GET_SOURCE_INFO_URL = '/source/info/', // 获取数据源信息API接口地址
  ADD_SOURCE_INFO_URL = '/source/info/add/', // 添加数据源信息API接口地址
  EDIT_SOURCE_INFO_URL = '/source/info/', // 添加数据源信息API接口地址
  TEST_SOURCE_INFO_URL = '/source/info/test/' // 测试数据源信息API接口地址
}

export const reqSourceType = () => request.get<any, SourceTypeResponse>(API.SOURCE_TYPE_URL)

export const reqSimpleSourceType = () =>
  request.get<any, SimpleSourceTypeResponse>(API.SIMPLE_SOURCE_TYPE_URL)

export const reqSourceInfo = (sourceId: number) =>
  request.get<any, SourceInfoResponse>(API.GET_SOURCE_INFO_URL + `${sourceId}`)

export const reqEditSourceInfo = (data: SourceInfoBody) =>
  request.put<any, any>(API.EDIT_SOURCE_INFO_URL + `${data.sourceId}`, data)

export const reqDeleteSourceInfo = (sourceId: number) =>
  request.delete<any, any>(API.GET_SOURCE_INFO_URL + `${sourceId}`)

export const reqSourceInfoList = (pageNo: number, pageSize: number, condition: SourInfoCondition) =>
  request.get<any, SourceInfoListResponse>(
    API.SOURCE_INFO_URL +
      `${pageNo}/${pageSize}?typeId=${condition.typeId}&conditionFlag=${condition.conditionFlag}&conditionValue=${condition.conditionValue}`
  )

export const reqAddSourceInfo = (data: SourceInfoBody) =>
  request.post<any, any>(API.ADD_SOURCE_INFO_URL, data)

export const reqTestSourceInfo = (data: SourceInfo) =>
  request.post<any, any>(API.TEST_SOURCE_INFO_URL, data)
