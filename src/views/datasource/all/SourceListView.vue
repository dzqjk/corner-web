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

const tableData = [
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  },
  {
    id: 1001,
    sourceType: 'Mysql',
    sourceName: 'content_01',
    sourceFlag: 'content_01',
    sourceCategory: '物理数据源',
    sourceUrl: 'jdbc:mysql://localhost:3306/content',
    ownerName: '张三',
    updateTime: '2024-04-01 21:33:32',
    createTime: '2024-04-01 21:33:32'
  }
]

// 页面挂载时需要完成的操作
onMounted(() => {})

// 点击编辑按钮的回调
const goDetail = (row: any, type: string) => {
  $router.push({ path: '/source/sourceDetail', query: { type: type, sourceId: row.id } })
}
</script>

<template>
  <div class="content">
    <div class="head">
      <span>数据源管理</span>
      <el-button @click="goDetail('/source/sourceDetail', 'add')" type="primary" size="small"
        >添加数据源
      </el-button>
    </div>
    <div class="source-manager">
      <div class="top">
        <el-form inline size="small" ref="conditionRef" :model="conditionData">
          <el-form-item style="margin-right: 0">
            <div class="right">
              <el-input
                v-model="conditionData.filterVal"
                :prefix-icon="Search"
                style="width: 400px"
                :placeholder="
                  conditionData.filterFlag == 0
                    ? '请输入数据源名称'
                    : conditionData.filterFlag == 1
                      ? '请输入数据源分类'
                      : '请输入数据源类型'
                "
              >
                <template #prepend>
                  <el-select v-model="conditionData.filterFlag" style="width: 120px">
                    <el-option label="数据源名称" value="0" />
                    <el-option label="数据源分类" value="1" />
                    <el-option label="数据源类型" value="2" />
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
          <el-table-column fixed prop="id" label="数据源ID" width="100" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="sourceType" label="数据源类型" width="100" show-overflow-tooltip />
          <el-table-column prop="sourceName" label="数据源名称" width="150" show-overflow-tooltip>
            <template #default="scope">
              <el-link @click="goDetail(scope.row, 'view')" :underline="false" type="primary">
                {{ scope.row.sourceName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="sourceFlag" label="数据源标识" width="150" show-overflow-tooltip />
          <el-table-column
            prop="sourceCategory"
            label="数据源分类"
            width="150"
            show-overflow-tooltip
          />
          <el-table-column prop="sourceUrl" label="数据源连接" width="250" show-overflow-tooltip />
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
              <el-button link type="primary" size="small">测试连接</el-button>
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
  </div>
</template>

<style scoped lang="scss">
.content {
  min-height: 800px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #cccccc;
    font-size: 14px;
  }

  .source-manager {
    margin-top: 20px;

    .top {
      display: flex;
      justify-content: right;
    }

    .pagination {
      display: flex;
      justify-content: right;
      margin-top: 20px;
    }
  }
}
</style>
