<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import {
  reqAddSourceInfo,
  reqEditSourceInfo,
  reqSimpleSourceType,
  reqSourceInfo
} from '@/api/source'
import type { SourceInfoBody, SourceTypeList } from '@/api/source/type'

let $router = useRouter()
let $route = useRoute()

// 存储数据源类型数据
let sourceTypeList = ref<SourceTypeList>([])

// 存储表单数据
let sourceInfoRef = ref<FormInstance>()
let sourceInfo = reactive<SourceInfoBody>({
  sourceId: -1,
  typeId: 2,
  sourceName: '',
  sourceFlag: '',
  sourceUrl: '',
  sourceCategory: '',
  ownerName: '',
  account: '',
  password: ''
})

// 取消添加或编辑或查看详情的按钮回调
const cancel = () => {
  $router.back()
}

// 点击重置按钮时生效
const resetData = () => {
  // 表单对象数据重置
  sourceInfoRef.value?.resetFields()
  // 自定义的reactive对象数据重置
  Object.assign(sourceInfo, {
    sourceId: -1,
    typeId: 2,
    sourceName: '',
    sourceFlag: '',
    account: '',
    password: '',
    sourceCategory: '',
    sourceUrl: '',
    ownerName: ''
  })
}

// 页面挂载时执行
onMounted(() => {
  // 获取数据源类型信息（简单）
  getSimpleSourceType()
  if ($route.query.type == 'add') {
    // 重置表单数据
    resetData()
  } else if ($route.query.type == 'edit') {
    // 获取数据源信息
    getSourceInfo()
  } else if ($route.query.type == 'view') {
    // 获取数据源信息
    getSourceInfo()
  }
})

// 获取简单数据源信息
const getSimpleSourceType = async () => {
  const result = await reqSimpleSourceType()
  if (result.code == 200) {
    sourceTypeList.value = result.data
  }
}

// 获取数据源信息
const getSourceInfo = async () => {
  const result = await reqSourceInfo(Number($route.params.sourceId))
  if (result.code == 200) {
    Object.assign(sourceInfo, result.data)
  }
}

// 点击提交按钮
const submitInfo = async () => {
  // 表单验证
  await sourceInfoRef.value?.validate()
  // 提交数据
  if ($route.query.type == 'add') {
    const result = await reqAddSourceInfo(sourceInfo)
    if (result.code == 200) {
      ElMessage({
        message: '添加数据源成功',
        type: 'success',
        showClose: true,
        center: true
      })
      // 成功后返回
      $router.push({ path: '/source/list' })
      // 重置表单数据
      resetData()
    } else {
      ElMessage({
        message: result.message,
        type: 'error',
        showClose: true,
        center: true
      })
    }
  } else if ($route.query.type == 'edit') {
    const result = await reqEditSourceInfo(sourceInfo)
    if (result.code == 200) {
      ElMessage({
        message: '编辑数据源成功',
        type: 'success',
        showClose: true,
        center: true
      })
      // 成功后返回管理页面
      $router.push({ path: '/source/list' })
      // 重置表单数据
      resetData()
    } else {
      ElMessage({
        message: result.message,
        type: 'error',
        showClose: true,
        center: true
      })
    }
  }
}

// 点击编辑按钮
const goDetail = (type: string) => {
  $router.push({
    path: '/source/detail/' + $route.params.sourceId,
    query: { type: type }
  })
}
</script>

<template>
  <div class="source-detail">
    <div class="head">
      <span>
        {{
          $route.query.type == 'add' ? '添加' : $route.query.type == 'edit' ? '编辑' : '查看'
        }}数据源
      </span>
      <div>
        <el-button
          v-if="$route.query.type == 'view'"
          size="small"
          type="primary"
          @click="goDetail('edit')"
          >编辑
        </el-button>
        <el-button size="small" type="primary" @click="cancel()">
          {{
            $route.query.type == 'add'
              ? '取消添加'
              : $route.query.type == 'edit'
                ? '取消编辑'
                : '返回'
          }}
        </el-button>
      </div>
    </div>
    <div class="content">
      <el-form
        :ref="sourceInfoRef"
        label-position="left"
        label-width="100"
        model="sourceInfo"
        size="small"
        style="width: 60%"
      >
        <el-form-item label="数据源分类：">
          <el-select
            v-model="sourceInfo.sourceCategory"
            :disabled="$route.query.type == 'view'"
            clearable
            style="width: 15%"
          >
            <el-option label="物理数据源" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据源类型：">
          <el-select
            v-model="sourceInfo.typeId"
            :disabled="$route.query.type == 'view'"
            clearable
            style="width: 15%"
          >
            <el-option
              v-for="item in sourceTypeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人：">
          <el-input
            v-model="sourceInfo.ownerName"
            :disabled="$route.query.type == 'view'"
            clearable
            placeholder="请输入负责人名称"
            style="width: 40%"
            type="text"
          />
        </el-form-item>
        <el-form-item label="数据源连接：">
          <el-input
            v-model="sourceInfo.sourceUrl"
            :disabled="$route.query.type == 'view'"
            clearable
            placeholder="请输入数据源连接"
            style="width: 40%"
            type="text"
          />
        </el-form-item>
        <el-form-item label="数据源名称：">
          <el-input
            v-model="sourceInfo.sourceName"
            :disabled="$route.query.type == 'view'"
            clearable
            placeholder="请输入数据源名称"
            style="width: 40%"
            type="text"
          />
        </el-form-item>
        <el-form-item label="数据源标识：">
          <el-input
            v-model="sourceInfo.sourceFlag"
            :disabled="$route.query.type == 'view'"
            clearable
            placeholder="请输入数据源标识"
            style="width: 40%"
            type="text"
          />
        </el-form-item>
        <el-form-item label="数据源账号：">
          <el-input
            v-model="sourceInfo.account"
            :disabled="$route.query.type == 'view'"
            clearable
            placeholder="请输入数据源账号"
            style="width: 40%"
            type="text"
          />
        </el-form-item>
        <el-form-item label="数据源密码：">
          <el-input
            v-model="sourceInfo.password"
            :disabled="$route.query.type == 'view'"
            clearable
            placeholder="请输入数据源密码"
            show-password
            style="width: 40%"
            type="password"
          />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="$route.query.type != 'view'" class="footer">
      <el-form-item>
        <el-button size="small" type="primary" @click="submitInfo">提交</el-button>
        <el-button size="small" type="primary" @click="resetData">重置</el-button>
      </el-form-item>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.source-detail {
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #cccccc;
    font-size: 14px;
  }

  .content {
    margin-top: 20px;
    display: flex;
    justify-content: left;
    min-height: 800px;
  }
}
</style>
