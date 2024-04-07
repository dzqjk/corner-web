<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'

let isEdit = ref<boolean>(false)
let $router = useRouter()

let avatarUrl = ref<string>('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

let infoFormRef = ref<FormInstance>()
let useInfoData = reactive({
  account: '',
  phone: '',
  email: '',
  nickName: ''
})

// 表单被修改时
const changeData = () => {
  isEdit.value = true
}

// 取消编辑
const cancelEdit = () => {
  $router.back()
}

// 重置表单数据
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
          :ref="infoFormRef"
          model="useInfoData"
          class="infoForm"
          label-width="15%"
          label-position="left"
          size="small"
        >
          <el-form-item label="头像：">
            <el-upload
              ref="uploadRef"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :auto-upload="false"
              :show-file-list="false"
            >
              <template #trigger>
                <el-avatar :src="avatarUrl" />
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="账号：">
            <el-input
              v-model="useInfoData.account"
              style="width: 50%"
              readonly
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input
              v-model="useInfoData.phone"
              style="width: 50%"
              readonly
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="邮箱绑定：">
            <el-input
              v-model="useInfoData.email"
              @change="changeData"
              style="width: 50%"
              placeholder="请输入邮箱"
            />
          </el-form-item>
          <el-form-item label="昵称：">
            <el-input
              v-model="useInfoData.nickName"
              @change="changeData"
              style="width: 50%"
              placeholder="请输入昵称"
            />
          </el-form-item>
          <el-form-item>
            <el-button v-show="isEdit" type="primary">提交</el-button>
            <el-button @click="cancelEdit" type="info">
              {{ isEdit ? '取消' : '返回' }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
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
