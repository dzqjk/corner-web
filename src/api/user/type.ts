/*
 * 用户相关的数据类型
 * */

// 用户登录响应返回的数据类型
export interface UserInfo {
  nickName: string
  token: string
}

// 用户登录所需携带的信息
export interface LoginData {
  phone: string
  code: string
}
