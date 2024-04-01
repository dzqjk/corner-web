<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'

let $route = useRoute()
let $router = useRouter()

// 保存表单数据
let conditionRef = ref<FormInstance>()
let conditionData = reactive<any>({
  runStatus: '-1', // -1表示所有运行状态 0表示已运行 1表示运行失败 2表示未运行
  sourceType: '-1', // -1表示所有运行状态 0表示已运行 1表示运行失败 2表示未运行
  sinkType: '-1', // -1表示所有数据去向 0表示MySql 1表示Hive
  filterFlag: '0', // 0 表示任务名称 1 表示来源信息 2表示去向信息
  filterVal: '' // 与filterFlag对应input的值
})
// 存储分页信息
let pageNo = ref<number>(1)
let pageSize = ref<number>(25)
let total = ref<number>(300)

// 重置条件
const restCondition = () => {
  conditionRef.value?.resetFields()
  Object.assign(conditionData, {
    taskStatus: '-1', // -1表示所有任务状态 0表示已提交 1表示未提交
    runStatus: '-1', // -1表示所有运行状态 0表示已运行 1表示运行失败 2表示未运行
    sinkType: '-1', // -1表示所有数据去向 0表示MySql 1表示Hive
    filterFlag: '0', // 0 表示任务名称 1 表示来源信息 2表示去向信息
    filterVal: '' // 与filterFlag对应input的值
  })
}

const tableData = [
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01_portal_tmp_test_01_portal_tmp_test_01_',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  },
  {
    taskName: 'portal_tmp_test_01',
    taskStatus: '已提交',
    runStatus: '运行成功',
    sourceType: 'MySql',
    sourceInfo: 'test.test-01',
    sinkType: 'Hive',
    sinkInfo: 'portal.tmp_test_01',
    ownerName: '张三',
    updateTime: '2024-03-28 22:10:01',
    createTime: '2024-03-28 22:09:30'
  }
]

// 页面挂载时需要完成的操作
onMounted(() => {})

// 点击编辑按钮的回调
const goDetail = (row: any, type: string) => {
  $router.push({ path: '/transfer/taskDetail', query: { type: type, taskId: row.id } })
}
</script>

<template>
  <el-tabs class="content-card" type="card">
    <el-tab-pane label="任务管理">
      <div class="task-manager">
        <div class="top">
          <el-form inline size="small" ref="conditionRef" :model="conditionData">
            <el-form-item label="运行状态:" prop="runStatus">
              <el-select size="small" v-model="conditionData.runStatus">
                <el-option label="全部" value="-1" />
                <el-option label="运行成功" value="0" />
                <el-option label="运行失败" value="1" />
                <el-option label="未运行" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="数据来源类型:" prop="sourceType">
              <el-select size="small" v-model="conditionData.sourceType">
                <el-option label="全部" value="-1" />
                <el-option label="MySql" value="0" />
                <el-option label="Hive" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="数据去向类型:" prop="sinkType">
              <el-select size="small" v-model="conditionData.sinkType">
                <el-option label="全部" value="-1" />
                <el-option label="MySql" value="0" />
                <el-option label="Hive" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="restCondition" link type="primary" size="small">重置</el-button>
            </el-form-item>
            <el-form-item style="margin-right: 0">
              <div class="right">
                <el-input
                  v-model="conditionData.filterVal"
                  :prefix-icon="Search"
                  style="width: 400px"
                  :placeholder="
                    conditionData.filterFlag == 0
                      ? '请输入任务名称'
                      : conditionData.filterFlag == 1
                        ? '请输入来源信息'
                        : '请输入去向信息'
                  "
                >
                  <template #prepend>
                    <el-select v-model="conditionData.filterFlag" style="width: 90px">
                      <el-option label="任务名称" value="0" />
                      <el-option label="来源信息" value="1" />
                      <el-option label="去向信息" value="2" />
                    </el-select>
                  </template>
                </el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="content">
          <el-table
            :data="tableData"
            style="width: 100%"
            max-height="900"
            table-layout="auto"
            row-class-name="row"
          >
            <el-table-column
              fixed
              prop="taskName"
              label="任务名称"
              width="200"
              show-overflow-tooltip
            >
              <template #default="scope">
                <el-link @click="goDetail(scope.row, 'view')" :underline="false" type="primary">
                  {{ scope.row.taskName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="runStatus" label="运行状态" width="100" show-overflow-tooltip />
            <el-table-column
              prop="sourceType"
              label="数据来源类型"
              width="150"
              show-overflow-tooltip
            />
            <el-table-column prop="sourceInfo" label="来源信息" width="200" show-overflow-tooltip />
            <el-table-column
              prop="sinkType"
              label="数据去向类型"
              width="150"
              show-overflow-tooltip
            />
            <el-table-column prop="sinkInfo" label="去向信息" width="200" show-overflow-tooltip />
            <el-table-column prop="ownerName" label="负责人" width="100" show-overflow-tooltip />
            <el-table-column
              prop="updateTime"
              label="最近修改时间"
              width="200"
              show-overflow-tooltip
            />
            <el-table-column prop="createTime" label="创建时间" width="200" show-overflow-tooltip />
            <el-table-column fixed="right" label="操作" width="200" show-overflow-tooltip>
              <template #default="scop">
                <el-button @click="goDetail(scop.row, 'edit')" link type="primary" size="small">
                  编辑
                </el-button>
                <el-button link type="primary" size="small">运行</el-button>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            :total="total"
            :page-sizes="[25, 50, 100]"
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :small="true"
            layout="total,prev, pager, next, sizes,jumper"
            background
          />
        </div>
      </div>
    </el-tab-pane>
    <!--        <el-tab-pane label="线上任务">线上任务</el-tab-pane>-->
  </el-tabs>
</template>

<style scoped lang="scss">
.content-card {
  min-height: 800px;
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

    .content {
      height: 90%;

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
</style>
