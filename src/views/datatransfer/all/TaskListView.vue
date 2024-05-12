<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { Download, Search } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import {
  reqDeleteTask,
  reqRunTask,
  reqTaskList,
  reqTaskSinkType,
  reqTaskSourceType
} from '@/api/task'
import type { SourceTypeList } from '@/api/source/type'

let $router = useRouter()
let $route = useRoute()

// 保存条件表单数据
let conditionRef = ref<FormInstance>()
let conditionData = reactive<any>({
  runStatus: -1, // -1表示所有运行状态 0表示已运行 1表示运行失败 2表示未运行
  sourceType: 0, // 0表示所有数据源，其他值为对于的数据源类型
  sinkType: 0, // 0 表示所有数据去向类型，其余值为对于的数据去向类型
  sourceId: 0, // 0表示所有数据类型 0表示MySql 1表示Hive
  conditionFlag: 0, // 0 表示任务名称 1 表示来源信息 2表示去向信息
  conditionValue: '' // 与filterFlag对应input的值
})
// 存储分页信息
let pageNo = ref<number>(1)
let pageSize = ref<number>(25)
// 存储表格数据
let taskInfoList = ref<any>()

// 存储任务的来源与去向数据源类型
let taskSourceType = ref<SourceTypeList>()
let taskSinkType = ref<SourceTypeList>()

// 对路由进行监听
watch(
  () => $route.query,
  () => {
    // 路由变化时将query参数赋值给conditionData
    conditionData.sourceId = $route.query.sourceId ? Number($route.query.sourceId) : 0
    conditionData.sourceType = $route.query.sourceType ? Number($route.query.sourceType) : 0
    // 并重新执行查询任务信息数据
    getTaskList()
  }
)

// 页面挂载时需要完成的操作
onMounted(() => {
  // 获取任务列表
  getTaskList()
  // 获取任务来源数据源类型
  getTaskSourceType()
  // 获取任务去向数据源类型
  getTaskSinkType()
})

// 获取任务列表
const getTaskList = async () => {
  const result = await reqTaskList(pageNo.value, pageSize.value, conditionData)
  if (result.code == 200) {
    taskInfoList.value = result.data
  }
}

// 获取任务来源数据源类型
const getTaskSourceType = async () => {
  const result = await reqTaskSourceType()
  if (result.code == 200) {
    taskSourceType.value = result.data
  }
}

// 获取任务去向数据源类型
const getTaskSinkType = async () => {
  const result = await reqTaskSinkType()
  if (result.code == 200) {
    taskSinkType.value = result.data
  }
}

// 重置条件
const restCondition = () => {
  conditionRef.value?.resetFields()
  Object.assign(conditionData, {
    runStatus: -1, // -1表示所有运行状态 0表示已运行 1表示运行失败 2表示未运行
    sourceType: 0, // 0表示所有数据源，其他值为对于的数据源类型
    sinkType: 0, // 0 表示所有数据去向类型，其余值为对于的数据去向类型
    sourceId: 0, // 0表示所有数据类型 0表示MySql 1表示Hive
    conditionFlag: 0, // 0 表示任务名称 1 表示来源信息 2表示去向信息
    conditionValue: '' // 与filterFlag对应input的值
  })
  // 重置后重新获取数据
  getTaskList()
}

// 点击编辑按钮的回调
const goDetail = (row: any, type: string) => {
  $router.push({ path: '/transfer/taskDetail', query: { type: type, taskId: row.taskId } })
}

// 分页栏点击回调
const paginationChange = () => {
  // 重新获取数据
  getTaskList()
}

// 条件查询
const conditionChange = () => {
  // 重新获取数据
  getTaskList()
}

// 删除任务回调
const deleteTask = async (row: any) => {
  const result = await reqDeleteTask(row.taskId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
      duration: 2000,
      showClose: true,
      center: true
    })
    // 重新获取数据
    getTaskList()
  } else {
    ElMessage({
      type: 'error',
      message: result.msg,
      duration: 2000,
      showClose: true,
      center: true
    })
  }
}

// 取消删除任务回调
const cancelDeleteTask = () => {
  ElMessage({
    type: 'info',
    message: '取消删除',
    duration: 2000,
    showClose: true,
    center: true
  })
}

// 点击运行按钮的回调
const runTask = async (taskInfo: any) => {
  const result = await reqRunTask(taskInfo)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '执行成功',
      duration: 2000,
      showClose: true,
      center: true
    })
    // 重新获取数据
    getTaskList()
  } else {
    ElMessage({
      type: 'error',
      message: result.msg,
      duration: 2000,
      showClose: true,
      center: true
    })
  }
}
</script>

<template>
  <div class="content">
    <el-tabs class="content-card" type="card">
      <el-tab-pane label="任务管理">
        <div class="task-manager">
          <div class="top">
            <el-form ref="conditionRef" :model="conditionData" inline size="small">
              <el-row :gutter="20">
                <el-col :span="16">
                  <el-form-item label="运行状态:" prop="runStatus">
                    <el-select
                      v-model="conditionData.runStatus"
                      size="small"
                      @change="conditionChange"
                    >
                      <el-option :value="-1" label="全部" />
                      <el-option :value="0" label="未运行" />
                      <el-option :value="1" label="运行中" />
                      <el-option :value="2" label="运行成功" />
                      <el-option :value="3" label="运行失败" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数据来源类型:" prop="sourceType">
                    <el-select
                      v-model="conditionData.sourceType"
                      size="small"
                      @change="conditionChange"
                    >
                      <el-option :value="0" label="全部" />
                      <el-option
                        v-for="item in taskSourceType"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数据去向类型:" prop="sinkType">
                    <el-select
                      v-model="conditionData.sinkType"
                      size="small"
                      @change="conditionChange"
                    >
                      <el-option :value="0" label="全部" />
                      <el-option
                        v-for="item in taskSinkType"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button link size="small" type="primary" @click="restCondition"
                      >重置
                    </el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item style="margin-right: 0">
                    <div class="right">
                      <el-input
                        v-model="conditionData.conditionValue"
                        :placeholder="
                          conditionData.conditionFlag == 0
                            ? '请输入任务名称'
                            : conditionData.conditionFlag == 1
                              ? '请输入来源信息'
                              : '请输入去向信息'
                        "
                        :prefix-icon="Search"
                        style="width: 400px"
                        @change="conditionChange"
                      >
                        <template #prepend>
                          <el-select v-model="conditionData.conditionFlag" style="width: 90px">
                            <el-option :value="0" label="任务名称" />
                            <el-option :value="1" label="来源信息" />
                            <el-option :value="2" label="去向信息" />
                          </el-select>
                        </template>
                      </el-input>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="taskList">
            <el-table
              :data="taskInfoList?.list"
              max-height="900"
              row-class-name="row"
              style="width: 100%"
              table-layout="auto"
            >
              <el-table-column
                fixed
                label="任务名称"
                prop="taskName"
                show-overflow-tooltip
                width="200"
              >
                <template #default="scope">
                  <el-link :underline="false" type="primary" @click="goDetail(scope.row, 'view')">
                    {{ scope.row.taskName }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column label="运行状态" prop="runStatus" show-overflow-tooltip width="100">
                <template #default="scope">
                  <el-tag v-if="scope.row.runStatus == 0" effect="dark" size="small" type="info">
                    未运行
                  </el-tag>
                  <el-tag v-if="scope.row.runStatus == 1" effect="dark" size="small" type="success">
                    运行中
                  </el-tag>
                  <el-tag v-if="scope.row.runStatus == 2" effect="dark" size="small" type="success">
                    运行成功
                  </el-tag>
                  <el-tag v-if="scope.row.runStatus == 3" effect="dark" size="small" type="danger">
                    运行失败
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="运行日志" prop="runStatus" show-overflow-tooltip width="150">
                <template #default="scope">
                  <el-link
                    v-if="scope.row.runLog"
                    :href="scope.row.runLog"
                    :icon="Download"
                    target="_blank"
                    type="primary"
                    >下载日志
                  </el-link>
                  <el-text v-else type="warning">暂无运行日志</el-text>
                </template>
              </el-table-column>
              <el-table-column
                label="数据来源类型"
                prop="sourceType"
                show-overflow-tooltip
                width="150"
              >
                <template #default="scope">
                  <el-text>
                    {{ scope.row.sourceTypeInfo.typeName }}
                  </el-text>
                </template>
              </el-table-column>
              <el-table-column label="来源信息" prop="sourceInfo" show-overflow-tooltip width="200">
                <template #default="scope">
                  <el-text> {{ scope.row.sourceDatabase }}.{{ scope.row.sourceTable }}</el-text>
                </template>
              </el-table-column>
              <el-table-column
                label="数据去向类型"
                prop="sinkType"
                show-overflow-tooltip
                width="150"
              >
                <template #default="scope">
                  <el-text>
                    {{ scope.row.sinkTypeInfo.typeName }}
                  </el-text>
                </template>
              </el-table-column>
              <el-table-column label="去向信息" prop="sinkInfo" show-overflow-tooltip width="200">
                <template #default="scope">
                  <el-text> {{ scope.row.sinkDatabase }}.{{ scope.row.sinkTable }}</el-text>
                </template>
              </el-table-column>
              <el-table-column label="负责人" prop="ownerInfo" show-overflow-tooltip width="100">
                <template #default="scope">
                  <el-text> {{ scope.row.ownerInfo.nickName }}</el-text>
                </template>
              </el-table-column>
              <el-table-column
                label="最近修改时间"
                prop="updateTime"
                show-overflow-tooltip
                width="200"
              />
              <el-table-column
                label="创建时间"
                prop="createTime"
                show-overflow-tooltip
                width="200"
              />
              <el-table-column fixed="right" label="操作" show-overflow-tooltip width="200">
                <template #default="scop">
                  <el-button link size="small" type="primary" @click="goDetail(scop.row, 'edit')">
                    编辑
                  </el-button>
                  <el-button link size="small" type="primary" @click="runTask(scop.row)"
                    >运行
                  </el-button>
                  <el-popconfirm
                    :title="`确定删除任务：${scop.row.taskName}吗?`"
                    cancel-button-text="取消"
                    confirm-button-text="确认"
                    confirm-button-type="danger"
                    width="200"
                    @cancel="cancelDeleteTask"
                    @confirm="deleteTask(scop.row)"
                  >
                    <template #reference>
                      <el-button link size="small" type="danger">删除</el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination
              v-model:current-page="pageNo"
              v-model:page-size="pageSize"
              :page-sizes="[25, 50, 100]"
              :small="true"
              :total="taskInfoList?.total"
              background
              layout="total,prev, pager, next, sizes,jumper"
              @change="paginationChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <!--        <el-tab-pane label="线上任务">线上任务</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.content {
  min-height: 890px;

  .content-card {
    padding: 15px 20px;

    .task-manager {
      .top {
        padding-left: 12px;
        margin-bottom: 10px;
        height: 5%;

        :deep(.el-select__wrapper) {
          width: 90px;
        }

        :deep(.el-form-item) {
          margin-bottom: 0;
        }
      }

      .taskList {
        .row {
          color: #1e1e1e;
        }

        :deep(.el-button) {
          margin-left: 0;
          margin-right: 5px;
        }
      }

      .pagination {
        height: 5%;
        margin-top: 15px;
        display: flex;
        justify-content: right;
      }
    }
  }
}
</style>
