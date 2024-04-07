// 对axios进行二次封装，方便请求api接口
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/stores/modules/user'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000 //超时时间
})

// 请求拦截器
request.interceptors.request.use((config: any) => {
  // 用户登录携带token给后台服务器
  // 获取用户仓库数据
  const userStore = useUserStore()
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response: any) => {
    // 处理响应数据
    return response.data
  },
  (error: any) => {
    // 处理错误请求
    const status = error.response.status
    switch (status) {
      case 404:
        //错误提示信息
        ElMessage({
          type: 'error',
          showClose: true,
          center: true,
          message: '请求失败路径出现问题'
        })
        break
      case 500 | 501 | 502 | 503 | 504 | 505:
        ElMessage({
          type: 'error',
          showClose: true,
          center: true,
          message: '服务器挂了'
        })
        break
      case 401:
        ElMessage({
          type: 'error',
          showClose: true,
          center: true,
          message: '参数有误'
        })
        break
    }
    return Promise.reject(new Error(error.message))
  }
)
export default request
