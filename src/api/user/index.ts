import request from '@/utils/request'
import type {
  LoginData,
  UserDetail,
  UserDetailListResponse,
  UserDetailResponse
} from '@/api/user/type'

enum API {
  USER_LOGIN_URL = '/user/login/', // 用户登录API接口地址
  GET_CAPTCHA_URL = '/common/captcha/send/', // 用户获取验证码API接口地址
  GET_USER_DETAIL_URL = '/user/',
  UPDATE_USER_DETAIL_URL = '/user/',
  GET_USER_BY_NAME_LIST = '/user/byName/', // 获取用户列表
  GET_USER_LIST = '/user/all/' // 获取用户列表
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
// 根据用户名称模糊获取用户列表
export const reqUserByNameList = (userName: string) =>
  request.get<any, UserDetailListResponse>(API.GET_USER_BY_NAME_LIST + `?userName=${userName}`)
// 获取用户列表
export const reqUserList = () => request.get<any, UserDetailListResponse>(API.GET_USER_LIST)
