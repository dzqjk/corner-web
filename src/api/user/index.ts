import request from '@/utils/request'
import type { LoginData, UserDetail, UserDetailResponse } from '@/api/user/type'

enum API {
  USER_LOGIN_URL = '/user/login/', // 用户登录API接口地址
  GET_CAPTCHA_URL = '/common/send/', // 用户获取验证码API接口地址
  GET_USER_DETAIL_URL = '/user/',
  UPDATE_USER_DETAIL_URL = '/user/'
}

// 用户登录具体api的实现
export const reqUserLogin = (data: LoginData) => request.post<any, any>(API.USER_LOGIN_URL, data)
// 用户获取验证码具体api的实现
export const reqCaptcha = (phone: string) => request.get<any, any>(API.GET_CAPTCHA_URL + phone)
// 获取用户信息
export const reqUserDetail = (uuid: string) =>
  request.get<any, UserDetailResponse>(API.GET_USER_DETAIL_URL + uuid)
// 修改用户信息
export const reqEditUserDetail = (userDetail: UserDetail) =>
  request.put<any, any>(API.UPDATE_USER_DETAIL_URL + userDetail.uuid, userDetail)
