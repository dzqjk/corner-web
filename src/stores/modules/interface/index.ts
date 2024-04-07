// 定义用户仓库内部的医院详情数据
import type { UserInfo } from '@/api/user/type'

export interface UserState {
  visible: boolean //控制登录组件中的dialog是否显示
  code: '' // 验证码
  userInfo: UserInfo
}
