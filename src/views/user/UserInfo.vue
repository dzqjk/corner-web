<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reqUserDetail } from '@/api/user'
import type { UserDetail } from '@/api/user/type'
import useUserStore from '@/stores/modules/user'
import { SAVE_USER_TOKEN } from '@/utils/persistent_data'

let isEdit = ref<boolean>(false)
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()

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
      message: '更新用户信息成功'
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

// 头像上传成功回调
// 上传文件成功的方法
const successHandler: UploadProps['onSuccess'] = (response, uploadFiles) => {
  // 上传成功将返回的头像地址赋值给表单的avatar字段
  userInfoData.avatar = response.data.avatar
  userStore.userInfo = response.data
  SAVE_USER_TOKEN(JSON.stringify(response.data))
  // 提醒用户
  ElMessage({
    type: 'success',
    message: '更新头像成功',
    showClose: true,
    center: true
  })
}

// 上传文件超出限制的方法
const exceedHandler: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage({
    type: 'error',
    message: '证件照最多只能上传一张！',
    showClose: true,
    center: true
  })
}
// 上传文件前的方法
const beforeUploadHandler: UploadProps['beforeUpload'] = (rawFile) => {
  const isImage = rawFile.type === 'image/jpeg' || rawFile.type === 'image/png'
  const isLt2M = rawFile.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage({
      type: 'error',
      message: '上传头像图片只能是 JPG/PNG 格式!',
      showClose: true,
      center: true
    })
    return false
  }
  if (!isLt2M) {
    ElMessage({
      type: 'error',
      message: '上传头像图片大小不能超过 2MB!',
      showClose: true,
      center: true
    })
    return false
  }
  return true // 只有返回 true 或 Promise 时才会继续上传
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
          :rules="$rules"
          class="infoForm"
          label-position="left"
          label-width="15%"
          size="small"
        >
          <el-form-item label="头像：" prop="avatar">
            <el-upload
              ref="uploadRef"
              :action="'api/user/avatar/' + userInfoData.uuid"
              :auto-upload="true"
              :before-upload="beforeUploadHandler"
              :limit="1"
              :on-exceed="exceedHandler"
              :on-success="successHandler"
              :show-file-list="false"
            >
              <template #trigger>
                <el-avatar :src="userInfoData.avatar" />
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
