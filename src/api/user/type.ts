/*
 * 用户相关的数据类型
 * */

// 用户登录响应返回的数据类型
import type { ResponseData } from '@/api/interface/type'

export interface UserInfo {
  uuid: string
  nickName: string
  token: string
  avatar: string
}

// 用户登录所需携带的信息
export interface LoginData {
  phone: string
  code: string
}

// 用户获取个人信息接口响应具体的数据类型
export interface UserDetail {
  id: number
  uuid: string
  phone: string
  nickName: string
  email: string
  sex: string
  avatar: string
  createTime: string
  updateTime: string
}

// 用户信息集合
export type UserDetailList = UserDetail[]

export interface UserDetailResponse extends ResponseData {
  data: UserDetail
}

export interface UserDetailListResponse extends ResponseData {
  data: UserDetailList
}
