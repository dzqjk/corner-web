<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

let $router = useRouter()
let $route = useRoute()
// 存储表单数据
let sourceInfoRef = ref<FormInstance>()
let sourceInfo = reactive({
  sourceType: '',
  sourceName: '',
  sourceFlag: '',
  account: '',
  password: '',
  sourceCategory: '',
  sourceUrl: '',
  ownerName: ''
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
    sourceType: '',
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
onMounted(() => {})

// 点击编辑按钮
const goDetail = (type: string) => {
  $router.push({
    path: '/source/sourceDetail',
    query: { type: type, sourceId: $route.query.sourceId }
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
          @click="goDetail('edit')"
          type="primary"
          size="small"
          >编辑
        </el-button>
        <el-button @click="cancel()" type="primary" size="small">
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
        size="small"
        style="width: 60%"
        :ref="sourceInfoRef"
        model="sourceInfo"
        label-position="left"
        label-width="100"
      >
        <el-form-item label="数据源分类：">
          <el-select
            style="width: 15%"
            v-model="sourceInfo.sourceCategory"
            :disabled="$route.query.type == 'view'"
            clearable
          >
            <el-option label="物理数据源" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据源类型：">
          <el-select
            style="width: 15%"
            v-model="sourceInfo.sourceType"
            :disabled="$route.query.type == 'view'"
            clearable
          >
            <el-option label="Mysql" value="0" />
            <el-option label="StarRocks" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据源连接：">
          <el-input
            v-model="sourceInfo.sourceUrl"
            style="width: 40%"
            type="text"
            placeholder="请输入数据源连接"
            :disabled="$route.query.type == 'view'"
            clearable
          />
        </el-form-item>
        <el-form-item label="数据源名称：">
          <el-input
            v-model="sourceInfo.sourceName"
            style="width: 40%"
            type="text"
            placeholder="请输入数据源名称"
            :disabled="$route.query.type == 'view'"
            clearable
          />
        </el-form-item>
        <el-form-item label="数据源标识：">
          <el-input
            v-model="sourceInfo.sourceFlag"
            style="width: 40%"
            type="text"
            placeholder="请输入数据源标识"
            :disabled="$route.query.type == 'view'"
            clearable
          />
        </el-form-item>
        <el-form-item label="数据源账号：">
          <el-input
            v-model="sourceInfo.account"
            style="width: 40%"
            type="text"
            placeholder="请输入数据源账号"
            :disabled="$route.query.type == 'view'"
            clearable
          />
        </el-form-item>
        <el-form-item label="数据源密码：">
          <el-input
            v-model="sourceInfo.password"
            style="width: 40%"
            type="password"
            placeholder="请输入数据源密码"
            show-password
            :disabled="$route.query.type == 'view'"
            clearable
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer" v-if="$route.query.type != 'view'">
      <el-form-item>
        <el-button type="primary" size="small">提交</el-button>
        <el-button @click="resetData" type="primary" size="small">重置</el-button>
      </el-form-item>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
