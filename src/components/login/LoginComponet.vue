<script lang="ts" setup>
import useUserStore from '@/stores/modules/user'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'
import { GET_USER_TOKEN } from '@/utils/persistent_data'
// 引入倒计时组件
import CountdownComponent from '@/components/count_down/CountdownComponent.vue'

let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()

// 收集表单数据
let formRef = ref<FormInstance>()
let loginParams = reactive({
  phone: '', // 手机号码
  code: '' // 收集验证码
})

// 标记获取验证码是否需要倒计时
let isDown = ref<boolean>(false) // true为倒计时

// 计时器组件自定义方法
const getFlag = (value: boolean) => {
  // 倒计时为0时展现获取验证码按钮
  isDown.value = value
}

// 获取验证码请求
const getCode = async () => {
  try {
    // 将验证码获取时间改为倒计时
    isDown.value = true
    // 获取验证码成功
    await userStore.getCode(loginParams.phone)
    loginParams.code = userStore.code
  } catch (error) {
    // 获取验证码失败
    ElMessage.error((error as Error).message)
  }
}

// 点击用户登录
const login = async () => {
  try {
    // 确保表单数据都符合格式
    await formRef.value?.validate()
    // 发起登录请求
    await userStore.userLogin(loginParams)
    // 登录成功提示以及关闭对话框
    userStore.visible = false
    const redirect = $route.query.redirect
    if (redirect) {
      $router.push({ path: redirect as string })
    } else {
      $router.push({ path: '/home' })
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      center: true,
      showClose: true,
      message: (error as Error).message
    })
  }
}

// 关闭登录页面
const closeDialog = () => {
  Object.assign(loginParams, { phone: '', code: '' })
  formRef.value?.resetFields()
  if (GET_USER_TOKEN()) {
    ElMessage({
      type: 'success',
      showClose: true,
      center: true,
      grouping: true,
      message: '登录成功'
    })
  } else {
    ElMessage({
      type: 'warning',
      showClose: true,
      center: true,
      grouping: true,
      message: '取消登录'
    })
  }
}

// 计算手机号是否正常冰动态冻结获取验证码按钮
let isPhone = computed(() => {
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
  return reg.test(loginParams.phone)
})
</script>

<template>
  <div class="login_container">
    <el-dialog v-model="userStore.visible" title="注册/登录" @close="closeDialog">
      <el-row>
        <el-col :span="16" :offset="4">
          <div class="login">
            <el-form ref="formRef" :model="loginParams" :rules="$rules" status-icon>
              <el-form-item prop="phone">
                <el-input
                  v-model="loginParams.phone"
                  :prefix-icon="User"
                  placeholder="请输入手机号码"
                  type="phone"
                />
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  v-model="loginParams.code"
                  :disabled="!isPhone ? true : false"
                  :prefix-icon="Lock"
                  placeholder="请输入手机验证码"
                  type="text"
                />
              </el-form-item>
              <el-row>
                <el-col :span="10">
                  <el-form-item>
                    <el-button
                      :disabled="!isPhone || isDown ? true : false"
                      type="success"
                      @click="getCode()"
                    >
                      <CountdownComponent v-if="isDown" :isDown="isDown" @getFlag="getFlag" />
                      <span v-else>获取验证码</span>
                    </el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item>
                    <span class="tip">未注册的手机号第一次登录自动注册</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="footer">
              <el-button
                :disabled="!isPhone || loginParams.code.length != 6 ? true : false"
                class="login_button"
                size="default"
                type="primary"
                @click="login"
              >
                用户登录
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="danger" @click="userStore.visible = false"> 关闭界面</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.login_container {
  .login {
    padding: 16px;
    border: 1px solid #ccc;
    margin: 16px;

    .footer {
      display: flex;
      flex-direction: column;
      align-items: center;

      .wechat_opt,
      .phone_opt {
        cursor: pointer;
      }

      .login_button {
        width: 100%;
      }

      p {
        font-size: 12px;
        margin: 10px 0;
      }
    }

    .tip {
      font-size: 12px;
    }
  }

  .dialog-footer {
    padding-bottom: 16px;
    padding-right: 16px;
  }
}
</style>
