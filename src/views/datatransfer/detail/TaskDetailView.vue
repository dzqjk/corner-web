<script lang="ts" setup>
import { ArrowLeft, QuestionFilled } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { reqUserList } from '@/api/user'
import type { UserDetailList } from '@/api/user/type'
import useUserStore from '@/stores/modules/user'
import { reqAddTask, reqEditTask, reqTableInfo, reqTaskInfo } from '@/api/task'
import type { TableInfo, TaskInfo } from '@/api/task/type'
import type { SourceInfoList, SourceTypeList } from '@/api/source/type'
import {
  reqSourceDatabasesByName,
  reqSourceInfoByName,
  reqSourceTablesByName,
  reqSourceTypeByName
} from '@/api/source'

let $route = useRoute()
let $router = useRouter()
let userStore = useUserStore()

// 存储用户列表
let userList = ref<UserDetailList>()

// 存储数据来源信息
let sourceTypeList = ref<SourceTypeList>()
let sourceInfoList = ref<SourceInfoList>()
let sourceDatabaseList = ref<string[]>()
let sourceTableList = ref<string[]>()
let sourceTableInfo = ref<TableInfo>()

// 存储数据去向信息
let sinkInfoList = ref<SourceInfoList>()
let sinkDatabaseList = ref<string[]>()
let sinkTableList = ref<string[]>()
let sinkTableInfo = ref<TableInfo>()

// 存储任务信息
let basicRef = ref<FormInstance>()
let taskFormData = reactive<TaskInfo>({
  taskId: 0,
  taskName: '', // 任务名称
  userUUId: userStore.userInfo.uuid, // 负责人uuid
  ownerInfo: {},
  sourceId: undefined, // 数据来源id
  sourceInfo: {},
  sourceType: undefined, // 数据来源类型
  sourceTypeInfo: {},
  sourceDatabase: '', // 数据来源库
  sourceTable: '', // 数据来源表
  sourceColumns: '',
  sourceCondition: '', // 数据来源过滤条件
  sinkId: undefined, // 数据去向id
  sinkInfo: {},
  sinkTypeInfo: {},
  sinkType: undefined, // 数据去向类型
  sinkDatabase: '', // 数据去向库
  sinkTable: '', // 数据去向表
  sinkInsertMode: 0,
  sinkPartition: '',
  sinkPartitionVal: '',
  sinkColumns: '',
  taskDescription: ''
})

// 页面挂载时进行的操作
onMounted(() => {
  if ($route.query.type != 'add') {
    // 获取任务详情
    getTaskInfo()
  }
  // 获取用户列表
  getUserList()
  // 获取数据源类型列表
  getSourceTypeByKey('')
  // 获取数据源信息
  getSourceInfoByKey('')
  // 获取数据去向信息
  getSinkInfoByKey('')
})

// 监听数据来源表是否改变
watch(
  () => taskFormData.sourceTable,
  () => {
    // 改变则获取数据表信息
    getSourceTableInfo()
  }
)
// 监听数据去向表是否改变
watch(
  () => taskFormData.sinkTable,
  () => {
    // 改变则获取数据表信息
    getSinkTableInfo()
  }
)

// 获取用户列表
const getUserList = async () => {
  const result = await reqUserList()
  if (result.code == 200) {
    userList.value = result.data
  }
}

// 获取任务详情
const getTaskInfo = async () => {
  const result = await reqTaskInfo($route.query.taskId ? Number($route.query.taskId) : 0)
  if (result.code == 200) {
    Object.assign(taskFormData, result.data)
  }
}

// 点击取消按钮或返回
const cancelAdd = () => {
  $router.back()
  // 重置表单数据
  resetTaskForm()
}

// 取消添加或编辑任务
const cancelEdit = () => {
  $router.back()
}

// 获取数据源类型
const getSourceTypeByKey = async (key: string) => {
  const result = await reqSourceTypeByName(key)
  if (result.code == 200) {
    sourceTypeList.value = result.data
  }
}

// 获取数据源信息
const getSourceInfoByKey = async (key: string) => {
  const result = await reqSourceInfoByName(
    taskFormData.sourceType ? taskFormData.sourceType : 0,
    key
  )
  if (result.code == 200) {
    sourceInfoList.value = result.data
  }
}

// 获取数据去向信息
const getSinkInfoByKey = async (key: string) => {
  const result = await reqSourceInfoByName(taskFormData.sinkType ? taskFormData.sinkType : 0, key)
  if (result.code == 200) {
    sinkInfoList.value = result.data
  }
}

// 获取数据源对应的数据库
const getSourceDatabasesByName = async (key: string) => {
  const result = await reqSourceDatabasesByName(taskFormData.sourceId, key)
  if (result.code == 200) {
    sourceDatabaseList.value = result.data
  }
}

// 获取数据去向对应的数据库
const getSinkDatabasesByName = async (key: string) => {
  const result = await reqSourceDatabasesByName(taskFormData.sinkId, key)
  if (result.code == 200) {
    sinkDatabaseList.value = result.data
  }
}

// 获取数据源对应的数据表
const getSourceTablesByName = async (key: string) => {
  const result = await reqSourceTablesByName(
    taskFormData.sourceId,
    taskFormData.sourceDatabase,
    key
  )
  if (result.code == 200) {
    sourceTableList.value = result.data
  }
}

// 获取数据去向对应的数据表
const getSinkTablesByName = async (key: string) => {
  const result = await reqSourceTablesByName(taskFormData.sinkId, taskFormData.sinkDatabase, key)
  if (result.code == 200) {
    sinkTableList.value = result.data
  }
}

// 获取来源表信息
const getSourceTableInfo = async () => {
  const result = await reqTableInfo(
    taskFormData.sourceId,
    taskFormData.sourceDatabase,
    taskFormData.sourceTable
  )
  if (result.code == 200) {
    sourceTableInfo.value = result.data
    taskFormData.sourceColumns = sourceTableInfo.value.columnInfoList
      .filter((item) => !item.partitionColumn)
      .map((item) => item.columnName)
      .join('$$')
  }
}

// 获取去向表信息
const getSinkTableInfo = async () => {
  const result = await reqTableInfo(
    taskFormData.sinkId,
    taskFormData.sinkDatabase,
    taskFormData.sinkTable
  )
  if (result.code == 200) {
    sinkTableInfo.value = result.data
    taskFormData.sinkColumns = sinkTableInfo.value.columnInfoList
      .filter((item) => !item.partitionColumn)
      .map((item) => item.columnName)
      .join('$$')
    taskFormData.sinkPartition = sinkTableInfo.value.partitionColumn
  }
}

// 点击提交按钮
const submitEdit = async () => {
  if ($route.query.type == 'add') {
    const result = await reqAddTask(taskFormData)
    if (result.code == 200) {
      ElMessage({
        message: '添加成功',
        type: 'success',
        duration: 2000,
        showClose: true,
        center: true
      })
      // 返回之列表页
      $router.back()
      resetTaskForm()
    } else {
      ElMessage({
        message: result.message,
        type: 'error',
        duration: 2000,
        showClose: true,
        center: true
      })
      // 返回之列表页
      $router.back()
      resetTaskForm()
    }
  } else if ($route.query.type == 'edit') {
    const result = await reqEditTask(taskFormData)
    if (result.code == 200) {
      ElMessage({
        message: '编辑成功',
        type: 'success',
        duration: 2000,
        showClose: true,
        center: true
      })
      // 返回之列表页
      $router.push({ path: '/transfer/taskList' })
      // 重置表单数据
      resetTaskForm()
    } else {
      ElMessage({
        message: result.message,
        type: 'error',
        duration: 2000,
        showClose: true,
        center: true
      })
      // 重置表单数据
      resetTaskForm()
    }
  }
}

const resetTaskForm = () => {
  Object.assign(taskFormData, {
    taskId: 0,
    taskName: '', // 任务名称
    userUUId: userStore.userInfo.uuid, // 负责人uuid
    ownerInfo: {},
    sourceId: undefined, // 数据来源id
    sourceInfo: {},
    sourceType: undefined, // 数据来源类型
    sourceTypeInfo: {},
    sourceDatabase: '', // 数据来源库
    sourceTable: '', // 数据来源表
    sourceColumns: '',
    sourceCondition: '', // 数据来源过滤条件
    sinkId: undefined, // 数据去向id
    sinkInfo: {},
    sinkTypeInfo: {},
    sinkType: undefined, // 数据去向类型
    sinkDatabase: '', // 数据去向库
    sinkTable: '', // 数据去向表
    sinkInsertMode: 0,
    sinkPartition: '',
    sinkPartitionVal: '',
    sinkColumns: '',
    taskDescription: ''
  })
}
</script>

<template>
  <div class="addTask">
    <!-- 头部返回按钮 -->
    <div class="top">
      <el-row :gutter="10">
        <el-col :span="12" class="left">
          <el-button :icon="ArrowLeft" link type="primary" @click="cancelAdd">返回</el-button>
        </el-col>
        <el-col v-if="$route.query.type == 'view'" :span="12" class="right">
          <el-button
            size="small"
            type="primary"
            @click="
              $router.push({
                path: '/transfer/taskDetail',
                query: { taskId: $route.query.taskId, type: 'edit' }
              })
            "
            >编辑
          </el-button>
        </el-col>
      </el-row>
    </div>
    <!--  内容展示区  -->
    <div class="content">
      <!-- 基本信息 -->
      <el-divider content-position="left">1、基本信息</el-divider>
      <div class="basic-info">
        <el-form
          class="basic-form"
          label-position="left"
          label-width="200"
          size="small"
          status-icon
        >
          <el-row gutter="10">
            <el-col :span="12">
              <el-form-item label="任务名称">
                <el-input
                  v-model="taskFormData.taskName"
                  :disabled="$route.query.type == 'view'"
                  placeholder="请输入任务名称"
                  style="width: 80%"
                />
              </el-form-item>
              <el-form-item label="描述">
                <el-input
                  v-model="taskFormData.taskDescription"
                  :disabled="$route.query.type == 'view'"
                  placeholder="输入任务描述，最多不超过128各字符"
                  style="width: 80%"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人">
                <el-select
                  v-model="taskFormData.userUUId"
                  :disabled="$route.query.type == 'view'"
                  clearable
                  placeholder="请选择负责人"
                  style="width: 80%"
                >
                  <el-option
                    v-for="item in userList"
                    :key="item.id"
                    :label="item.nickName + ` (${item.phone})`"
                    :value="item.uuid"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 数据来源与去向 -->
      <el-divider content-position="left">2、数据来源与去向</el-divider>
      <div class="source-info">
        <div class="left">
          <el-row>
            <span class="text">数据来源</span>
          </el-row>
          <div class="source-box">
            <el-form label-position="left" label-width="10%" size="small">
              <el-form-item label="数据源:">
                <el-select
                  v-model="taskFormData.sourceType"
                  :disabled="$route.query.type == 'view'"
                  :remote-method="getSourceTypeByKey"
                  clearable
                  filterable
                  placeholder="请选择数据源类型"
                  remote
                  style="width: 30%"
                >
                  <el-option
                    v-for="item in sourceTypeList"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="taskFormData.sourceId"
                  :disabled="$route.query.type == 'view'"
                  :remote-method="getSourceInfoByKey"
                  clearable
                  filterable
                  placeholder="请选择数据源"
                  remote
                  style="width: 60%"
                >
                  <el-option
                    v-for="item in sourceInfoList"
                    :key="item.sourceId"
                    :label="item.sourceName"
                    :value="item.sourceId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="库表选择:">
                <el-select
                  v-model="taskFormData.sourceDatabase"
                  :disabled="$route.query.type == 'view'"
                  :remote-method="getSourceDatabasesByName"
                  clearable
                  filterable
                  placeholder="请选择数据库"
                  remote
                  style="width: 30%"
                >
                  <el-option
                    v-for="(item, index) in sourceDatabaseList"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
                <el-select
                  v-model="taskFormData.sourceTable"
                  :disabled="$route.query.type == 'view'"
                  :remote-method="getSourceTablesByName"
                  clearable
                  filterable
                  placeholder="请选择表"
                  remote
                  style="width: 60%"
                >
                  <el-option
                    v-for="(item, index) in sourceTableList"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="数据过滤:">
                <el-input
                  v-model="taskFormData.sourceCondition"
                  :disabled="$route.query.type == 'view'"
                  placeholder="输入where关键词之后的条件"
                  style="width: 90%"
                  type="textarea"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="right">
          <el-row>
            <span class="text">数据去向</span>
          </el-row>
          <div class="source-box">
            <el-form label-position="left" label-width="10%" size="small">
              <el-form-item label="数据源:">
                <el-select
                  v-model="taskFormData.sinkType"
                  :disabled="$route.query.type == 'view'"
                  :remote-method="getSourceTypeByKey"
                  clearable
                  filterable
                  placeholder="请选择数据源类型"
                  remote
                  style="width: 30%"
                >
                  <el-option
                    v-for="item in sourceTypeList"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.id"
                  />
                </el-select>
                <el-select
                  v-model="taskFormData.sinkId"
                  :disabled="$route.query.type == 'view'"
                  :remote-method="getSinkInfoByKey"
                  clearable
                  filterable
                  placeholder="请选择数据源"
                  remote
                  style="width: 60%"
                >
                  <el-option
                    v-for="item in sinkInfoList"
                    :key="item.sourceId"
                    :label="item.sourceName"
                    :value="item.sourceId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="库表选择:">
                <el-select
                  v-model="taskFormData.sinkDatabase"
                  :disabled="$route.query.type == 'view'"
                  :remote-method="getSinkDatabasesByName"
                  clearable
                  filterable
                  placeholder="请选择数据库"
                  remote
                  style="width: 30%"
                >
                  <el-option
                    v-for="(item, index) in sinkDatabaseList"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
                <el-select
                  v-model="taskFormData.sinkTable"
                  :disabled="$route.query.type == 'view'"
                  :remote-method="getSinkTablesByName"
                  clearable
                  filterable
                  placeholder="请选择表"
                  remote
                  style="width: 60%"
                >
                  <el-option
                    v-for="(item, index) in sinkTableList"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-if="sinkTableInfo?.partition" label="分区设置:">
                <el-input
                  v-model="taskFormData.sinkPartitionVal"
                  :disabled="$route.query.type == 'view'"
                  placeholder="输入分区值"
                  style="width: 30%"
                />
              </el-form-item>
              <el-form-item label="写入规则:">
                <el-select
                  v-model="taskFormData.sinkInsertMode"
                  :disabled="$route.query.type == 'view'"
                  style="width: 30%"
                >
                  <el-option :value="0" label="Insert append（追加）" />
                  <el-option :value="1" label="Insert overwrite（覆盖）" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 字段映射 -->
      <el-divider content-position="left">3、字段映射</el-divider>
      <div class="field-mapping">
        <el-empty
          v-if="taskFormData.sourceTable == '' && taskFormData.sinkTable == ''"
          description="选择数据来源和去向后显示字段映射"
          style="height: 500px"
        />
        <div v-else>
          <el-row :gutter="20">
            <el-col :span="12" class="sourceField">
              <el-table
                :data="sourceTableInfo?.columnInfoList.filter((item) => !item.partitionColumn)"
                size="small"
              >
                <el-table-column label="数据源字段" prop="columnName" />
                <el-table-column label="数据源字段类型" prop="columnType" />
              </el-table>
            </el-col>
            <el-col :span="12" class="sinkField">
              <el-table
                :data="sinkTableInfo?.columnInfoList.filter((item) => !item.partitionColumn)"
                size="small"
              >
                <el-table-column label="数据去向字段" prop="columnName" />
                <el-table-column label="数据去向字段类型" prop="columnType" />
              </el-table>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 提交 -->
      <div class="footer">
        <el-button
          v-if="$route.query.type != 'view'"
          size="small"
          type="primary"
          @click="submitEdit"
          >提交
        </el-button>
        <el-popconfirm
          v-if="$route.query.type != 'view'"
          :icon="QuestionFilled"
          :title="`确定取消${$route.query.type == 'edit' ? '编辑' : '添加'}任务吗?`"
          cancel-button-text="否"
          confirm-button-text="是"
          icon-color="red"
          width="150"
          @confirm="cancelEdit"
        >
          <template #reference>
            <el-button size="small">取消</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.addTask {
  min-height: 800px;

  .top {
    height: 50px;
    border-bottom: 1px solid #cccccc;
    padding: 0px 15px 0 15px;

    .left {
      line-height: 50px;
    }

    .right {
      line-height: 50px;
      text-align: right;
    }
  }

  .content {
    margin: 15px 20px;

    :deep(.el-divider__text) {
      font-size: 13px;
      color: #7f7f7f;
      font-weight: 900;
      padding: 0 10px;
    }

    .source-info {
      display: flex;
      height: 100%;

      .left {
        flex: 5;
        height: 100%;
        margin-right: 20px;

        .text {
          padding: 5px 5px;
          color: white;
          background-color: #7f7f7f;
        }

        .source-box {
          min-height: 300px;
          border: 8px solid #cccccc;
          padding: 15px 20px;
        }
      }

      .right {
        flex: 5;
        height: 100%;

        .text {
          padding: 5px 5px;
          color: white;
          background-color: #7f7f7f;
        }

        .source-box {
          min-height: 300px;
          border: 8px solid #cccccc;
          padding: 15px 20px;
        }
      }
    }

    .field-mapping {
      min-height: 300px;
      margin-bottom: 20px;
    }
  }
}
</style>
