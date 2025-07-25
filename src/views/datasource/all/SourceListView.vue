<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { reqDeleteSourceInfo, reqSourceInfoList, reqTestSourceInfo } from '@/api/source'
import type { SourInfoCondition } from '@/api/source/type'

let $route = useRoute()
let $router = useRouter()

// 列表数据
let sourceInfo = ref<any>()
// 保存表单数据
let conditionRef = ref<FormInstance>()
let conditionData = reactive<SourInfoCondition>({
  typeId: 0,
  conditionFlag: 0, // 0 表示数据源名称 1表示数据源类型 2表示数据源url
  conditionValue: '' // 与filterFlag对应input的值
})

// 存储分页信息
let pageNo = ref<number>(1)
let pageSize = ref<number>(25)

// 对路由进行监听
watch(
  () => $route.query,
  () => {
    // 路由变化时将query参数赋值给conditionData
    conditionData.typeId = $route.query.typeId ? Number($route.query.typeId) : 0
    // 并重新执行查询数据源信息数据
    getSourceInfoList()
  }
)

// 页面挂载时需要完成的操作
onMounted(() => {
  // 查询数据源信息数据
  getSourceInfoList()
})

// 查询数据源信息数据
const getSourceInfoList = async () => {
  const result = await reqSourceInfoList(pageNo.value, pageSize.value, conditionData)
  if (result.code == 200) {
    sourceInfo.value = result.data
  }
}

// 点击编辑按钮的回调
const goDetail = (row: any, type: string) => {
  $router.push({
    path: '/source/detail/' + row.sourceId,
    query: { type: type }
  })
}

// 点击测试连接按钮的回调
const testSource = async (row: any) => {
  const result = await reqTestSourceInfo(row)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '测试连接成功',
      showClose: true,
      center: true
    })
  } else {
    ElMessage({
      type: 'error',
      message: result.data,
      showClose: true,
      center: true
    })
  }
  // 无论测试成功还是失败 都要重新获取数据
  getSourceInfoList()
}

// 点击删除按钮的回调
const deleteSource = async (row: any) => {
  // 发送请求删除数据源
  const result = await reqDeleteSourceInfo(row.sourceId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
      showClose: true,
      center: true
    })
    // 删除成功 重新获取数据
    getSourceInfoList()
  }
}

// 取消删除回调
const cancelDelete = (row: any) => {
  ElMessage({
    type: 'success',
    message: `取消删除${row.sourceName}`,
    showClose: true,
    center: true,
    duration: 1000
  })
}

// 分页栏点击回调
const paginationChange = () => {
  // 重新获取数据
  getSourceInfoList()
}

// 条件查询
const conditionChange = () => {
  // 重新获取数据
  getSourceInfoList()
}
</script>

<template>
  <div class="content">
    <div class="head">
      <span>数据源管理</span>
      <el-button size="small" type="primary" @click="goDetail('/source/detail', 'add')"
        >添加数据源
      </el-button>
    </div>
    <div class="source-manager">
      <div class="top">
        <el-form ref="conditionRef" :model="conditionData" inline size="small">
          <el-form-item style="margin-right: 0">
            <div class="right">
              <el-input
                v-model="conditionData.conditionValue"
                :placeholder="
                  conditionData.conditionFlag == 0
                    ? '请输入数据源名称'
                    : conditionData.conditionFlag == 1
                      ? '请输入数据源分类'
                      : '请输入数据源类型'
                "
                :prefix-icon="Search"
                style="width: 400px"
                @change="conditionChange"
              >
                <template #prepend>
                  <el-select v-model="conditionData.conditionFlag" style="width: 120px">
                    <el-option :value="0" label="数据源名称" />
                    <el-option :value="1" label="数据源类型" />
                    <el-option :value="2" label="数据源连接" />
                  </el-select>
                </template>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table
          :data="sourceInfo?.list"
          max-height="900"
          row-class-name="row"
          style="width: 100%"
          table-layout="auto"
        >
          <el-table-column fixed label="数据源ID" prop="sourceId" show-overflow-tooltip width="100">
          </el-table-column>
          <el-table-column
            label="数据源类型"
            prop="sourceType.typeName"
            show-overflow-tooltip
            width="100"
          />
          <el-table-column label="数据源名称" prop="sourceName" show-overflow-tooltip width="150">
            <template #default="scope">
              <el-link :underline="false" type="primary" @click="goDetail(scope.row, 'view')">
                {{ scope.row.sourceName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="数据源标识" prop="sourceFlag" show-overflow-tooltip width="150" />
          <el-table-column
            label="数据源分类"
            prop="sourceCategory"
            show-overflow-tooltip
            width="150"
          >
            <template #default="scope">
              <span>
                {{ scope.row.sourceCategory == 0 ? '物理数据源' : '逻辑数据源' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="数据源连接" prop="sourceUrl" width="350">
            <template #default="scope">
              <el-row>
                <el-col :span="5">
                  <el-tag v-if="scope.row.isTest == 0" effect="dark" size="small" type="info">
                    未测试
                  </el-tag>
                  <el-tag v-if="scope.row.isTest == 1" effect="dark" size="small" type="success">
                    测试通过
                  </el-tag>
                  <el-tag v-if="scope.row.isTest == 2" effect="dark" size="small" type="danger">
                    测试失败
                  </el-tag>
                </el-col>
                <el-col :span="19">
                  <el-tooltip :content="scope.row.sourceUrl" placement="top-start">
                    <el-text class="source-url">
                      {{ scope.row.sourceUrl }}
                    </el-text>
                  </el-tooltip>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="负责人" prop="ownerName" show-overflow-tooltip width="150" />
          <el-table-column
            label="最近修改时间"
            prop="updateTime"
            show-overflow-tooltip
            width="200"
          />
          <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip width="200" />
          <el-table-column fixed="right" label="操作" show-overflow-tooltip width="200">
            <template #default="scop">
              <el-button link size="small" type="primary" @click="goDetail(scop.row, 'edit')">
                编辑
              </el-button>
              <el-button link size="small" type="primary" @click="testSource(scop.row)"
                >测试连接
              </el-button>
              <el-popconfirm
                :title="`确定删除数据源：${scop.row.sourceName}吗?`"
                cancel-button-text="取消"
                confirm-button-text="确认"
                confirm-button-type="danger"
                width="200"
                @cancel="cancelDelete(scop.row)"
                @confirm="deleteSource(scop.row)"
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
          :total="sourceInfo?.total"
          background
          layout="total,prev, pager, next, sizes,jumper"
          @change="paginationChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  min-height: 870px;

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

    .source-url {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .pagination {
      display: flex;
      justify-content: right;
      margin-top: 20px;
    }
  }
}
</style>
