/*
 * 存储用户相关数据的仓库
 * */
import { defineStore } from 'pinia'
import type { UserState } from '@/stores/modules/interface'
import { GET_USER_TOKEN, REMOVE_USER_INFO, SAVE_USER_TOKEN } from '@/utils/persistent_data'
import type { LoginData } from '@/api/user/type'
import { reqCaptcha, reqUserLogin } from '@/api/user'

const useUserStore = defineStore('User', {
  state(): UserState {
    return {
      visible: false, //控制登录组件中的dialog是否显示
      code: '', // 验证码
      userInfo: JSON.parse(GET_USER_TOKEN() as string) || {}
    }
  },
  actions: {
    // 用户登录
    async userLogin(loginData: LoginData) {
      const result = await reqUserLogin(loginData)
      if (result.code == 200) {
        this.userInfo = result.data
        // 持久化数据
        SAVE_USER_TOKEN(JSON.stringify(this.userInfo))
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取验证码
    async getCode(phone: string) {
      const result = await reqCaptcha(phone)
      if (result.code == 200) {
        this.code = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户退出登录
    async loginOut() {
      this.userInfo = {
        nickName: '',
        token: ''
      }
      REMOVE_USER_INFO()
    },
    queryState() {
      // 启动定时器每隔一段时间是否拥有信息
      const timer = setInterval(() => {
        // 本地存储已有数据
        if (GET_USER_TOKEN()) {
          // 关闭dialog
          this.visible = false
          // 获取用户信息
          this.userInfo = JSON.parse(GET_USER_TOKEN() as string)
          // 清除定时器
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  getters: {}
})

export default useUserStore
