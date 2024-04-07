import request from '@/utils/request'
import type { LoginData } from '@/api/user/type'

enum API {
  USER_LOGIN_URL = '/user/login/', // 用户登录API接口地址
  GET_CAPTCHA_URL = '/sms/send/' // 用户获取验证码API接口地址
}

// 用户登录具体api的实现
export const reqUserLogin = (data: LoginData) => request.post<any, any>(API.USER_LOGIN_URL, data)
// 用户获取验证码具体api的实现
export const reqCaptcha = (phone: string) => request.get<any, any>(API.GET_CAPTCHA_URL + phone)
