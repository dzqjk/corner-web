import request from '@/utils/request'
import type { SourceTypeResponse, SourInfoCondition } from '@/api/source/type'

enum API {
  SOURCE_TYPE_URL = '/source/type/list/', // 获取数据源类型信息API接口地址
  SOURCE_INFO_URL = '/source/info/page/' // 获取数据源信息API接口地址
}

export const reqSourceType = () => request.get<any, SourceTypeResponse>(API.SOURCE_TYPE_URL)

export const reqSourceInfo = (pageNo: number, pageSize: number, condition: SourInfoCondition) =>
  request.get<any, any>(
    API.SOURCE_INFO_URL +
      `${pageNo}/${pageSize}?typeId=${condition.typeId}&conditionFlag=${condition.conditionFlag}&conditionValue=${condition.conditionValue}`
  )
