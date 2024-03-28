<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

// 保存表单数据
let conditionRef = ref<FormInstance>()
let conditionData = reactive<any>({
  taskStatus: '-1', // -1表示所有任务状态 0表示已提交 1表示未提交
  runStatus: '-1', // -1表示所有运行状态 0表示已运行 1表示运行失败 2表示未运行
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
</script>

<template>
  <div class="transfer">
    <!-- 左侧菜单区 -->
    <div class="left">
      <div class="logo">
        <svg
          t="1711550431828"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3290"
          width="24"
          height="24"
        >
          <path
            d="M302.545 733.603h418.91c115.665 0 209.454-86.016 209.454-192.186 0-90.02-67.444-165.562-158.487-186.461C758.83 233.984 647.447 139.636 512 139.636c-135.447 0-246.83 94.348-260.422 215.32-91.043 20.899-158.487 96.442-158.487 186.46 0 106.124 93.789 192.233 209.454 192.233z m289.886-401.78c18.804 0 33.978 15.36 33.978 34.35v206.15h46.452c14.708 0 19.828 19.689 6.982 26.996l-100.166 56.786a14.29 14.29 0 0 1-21.318-12.568V366.173c0-18.99 15.267-34.35 34.072-34.35zM334.476 486.959c-13.964 0-20.992-15.547-11.125-24.623l118.365-108.59a14.29 14.29 0 0 1 23.925 10.705v272.477c0 17.222-15.267 31.185-34.072 31.185-18.804 0-33.978-13.963-33.978-31.185v-149.97H334.43zM233.519 812.31a35.84 35.84 0 0 0-35.7 36.026 35.84 35.84 0 0 0 35.7 36.027H790.48a35.84 35.84 0 0 0 35.7-36.027 35.84 35.84 0 0 0-35.7-36.026H233.52z"
            fill="#2c2c2c"
            p-id="3291"
          ></path>
        </svg>
        <span>数据传输</span>
      </div>
      <div class="option">
        <button class="create-job">新建任务</button>
      </div>
      <!-- 菜单 -->
      <el-menu default-active="1">
        <el-menu-item class="allSource" index="1"> 全部数据来源(1484)</el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <span>ClickHouse(2)</span>
          </template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <span>MySql(20)</span>
          </template>
          <el-menu-item index="3-1">item one</el-menu-item>
          <el-menu-item index="3-2">item two</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <span>Hive(11)</span>
          </template>
          <el-menu-item index="4-1">item one</el-menu-item>
          <el-menu-item index="4-2">item two</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <!-- 右侧内容区 -->
    <div class="right">
      <el-tabs class="content-card" type="card">
        <el-tab-pane label="任务管理">
          <div class="task-manager">
            <div class="top">
              <el-form inline size="small" ref="conditionRef" :model="conditionData">
                <el-form-item label="任务状态:" prop="taskStatus">
                  <el-select
                    size="small"
                    v-model="conditionData.taskStatus"
                    placeholder="选择任务状态"
                  >
                    <el-option label="全部" value="-1" />
                    <el-option label="已提交" value="0" />
                    <el-option label="未提交" value="1" />
                  </el-select>
                </el-form-item>
                <el-form-item label="运行状态:" prop="runStatus">
                  <el-select size="small" v-model="conditionData.runStatus">
                    <el-option label="全部" value="-1" />
                    <el-option label="运行成功" value="0" />
                    <el-option label="运行失败" value="1" />
                    <el-option label="未运行" value="2" />
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
                  <el-button @click="restCondition" link type="primary" size="small"
                    >重置
                  </el-button>
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
                />
                <el-table-column
                  prop="taskStatus"
                  label="任务状态"
                  width="100"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="runStatus"
                  label="运行状态"
                  width="100"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="sourceType"
                  label="数据来源类型"
                  width="150"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="sourceInfo"
                  label="来源信息"
                  width="200"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="sinkType"
                  label="数据去向类型"
                  width="150"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="sinkInfo"
                  label="去向信息"
                  width="200"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="ownerName"
                  label="负责人"
                  width="100"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="updateTime"
                  label="最近修改时间"
                  width="200"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  width="200"
                  show-overflow-tooltip
                />
                <el-table-column prop="createTime" label="测试" width="200" show-overflow-tooltip />
                <el-table-column fixed="right" label="操作" width="200" show-overflow-tooltip>
                  <template #default>
                    <el-button link type="primary" size="small">编辑</el-button>
                    <el-button link type="primary" size="small">提交</el-button>
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.transfer {
  height: 100%;
  display: flex;

  .left {
    width: 13%;
    border-right: 0.5px solid #cccccc;

    .logo {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: left;
      border-bottom: 1px solid #cccccc;
      padding-left: 15px;

      span {
        font-size: 14px;
        margin-left: 5px;
      }
    }

    .option {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: left;
      border-bottom: 1px solid #cccccc;
      padding-left: 15px;

      .create-job {
        width: 80px;
        background-color: dodgerblue;
        border: 1px solid dodgerblue;
        color: white;
        cursor: pointer;
        height: 30px;
      }
    }

    :deep(.el-sub-menu__title) {
      height: 30px;
      padding: 10px 14px;
      font-size: 12px;
    }

    :deep(.el-menu-item) {
      height: 30px;
      padding: 5px 18px;
      font-size: 12px;
    }

    .allSource {
      height: 30px;
      padding: 10px 8px;
      font-size: 12px;
    }
  }

  .right {
    width: 87%;
    padding: 15px 20px;

    :deep(.el-tabs__header) {
      margin-bottom: 0;
    }

    .content-card {
      .task-manager {
        .top {
          padding-left: 12px;
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
          margin-top: 10px;
          display: flex;
          justify-content: right;
        }
      }
    }
  }
}
</style>
