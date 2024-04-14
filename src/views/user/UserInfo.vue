<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reqUserDetail } from '@/api/user'
import type { UserDetail } from '@/api/user/type'
import useUserStore from '@/stores/modules/user'

let isEdit = ref<boolean>(false)
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()

let avatarUrl = ref<string>('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

let infoFormRef = ref<FormInstance>()
let userInfoData = reactive<UserDetail>({
  id: -1,
  uuid: '',
  phone: '',
  nickName: '',
  email: '',
  sex: '',
  avatar: '',
  createTime: '',
  updateTime: ''
})

// 表单被修改时
const changeData = () => {
  isEdit.value = true
}

// 取消编辑
const cancelEdit = () => {
  $router.back()
}

// 页面挂载时
onMounted(() => {
  // 获取用户详细信息
  getUserDetail()
})

// 获取用户详细信息
const getUserDetail = async () => {
  const result = await reqUserDetail($route.query.uuid as string)
  if (result.code == 200) {
    console.log('获取用户信息')
    Object.assign(userInfoData, result.data)
    console.log(result.data)
    console.log(userInfoData)
  } else {
    ElMessage({
      type: 'error',
      showClose: true,
      center: true,
      message: result.message
    })
  }
}

// 提交按钮点击回调
const editUser = async () => {
  try {
    // 确保表单数据都符合格式
    await infoFormRef.value?.validate()
    // 发起修改请求
    await userStore.userUpdate(userInfoData)
    // 修改成功后操作
    ElMessage({
      type: 'success',
      center: true,
      showClose: true,
      message: '修改成功'
    })
    isEdit.value = false
    getUserDetail()
  } catch (error) {
    ElMessage({
      type: 'error',
      center: true,
      showClose: true,
      message: (error as Error).message
    })
  }
}
</script>

<template>
  <div class="userInfo">
    <el-row>
      <el-col :span="24">
        <el-divider content-position="left">
          个人信息 (对表单内容修改之后点击提交按钮可以修改个人信息)
        </el-divider>
      </el-col>
      <el-col :span="12">
        <el-form
          ref="infoFormRef"
          :model="userInfoData"
          class="infoForm"
          label-position="left"
          label-width="15%"
          size="small"
          :rules="$rules"
        >
          <el-form-item label="头像：" prop="avatar">
            <el-upload
              ref="uploadRef"
              :auto-upload="false"
              :show-file-list="false"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            >
              <template #trigger>
                <el-avatar :src="userInfoData.avatar != '' ? userInfoData.avatar : avatarUrl" />
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="唯一账号标识：" prop="uuid">
            <el-input
              v-model="userInfoData.uuid"
              placeholder="唯一账号标识"
              readonly
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item label="昵称：" prop="nickName">
            <el-input
              v-model="userInfoData.nickName"
              placeholder="请输入昵称"
              style="width: 50%"
              @change="changeData"
            />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="userInfoData.sex" @change="changeData">
              <el-radio label="未知性别" value="0">未知性别</el-radio>
              <el-radio label="男" value="1">男</el-radio>
              <el-radio label="女" value="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input
              v-model="userInfoData.phone"
              placeholder="请输入手机号码"
              readonly
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item label="邮箱绑定：" prop="email">
            <el-input
              v-model="userInfoData.email"
              placeholder="请输入邮箱"
              style="width: 50%"
              @change="changeData"
            />
          </el-form-item>

          <el-form-item>
            <el-button v-show="isEdit" type="primary" @click="editUser">提交</el-button>
            <el-button type="info" @click="cancelEdit">
              {{ isEdit ? '取消' : '返回' }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.userInfo {
  .infoForm {
    min-height: 900px;
    margin: 25px;
  }

  :deep(.el-divider__text) {
    font-size: 12px;
  }
}
</style>
