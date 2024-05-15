<script lang="ts" setup>
// 引入ace-builds配置文件
import '@/ace-config'
import { VAceEditor } from 'vue3-ace-editor/index'
import { CircleCloseFilled, Loading, Refresh, Search, SuccessFilled } from '@element-plus/icons-vue'
// 引入sql-formatter
import { formatDialect, hive } from 'sql-formatter'
import { ElMessage } from 'element-plus'
import { reqLastQuery, reqQueryInfo, reqQueryPageInfoList, reqRunQuery } from '@/api/analysis/index'

import { onMounted, reactive, ref, watch } from 'vue'
import {
  reqSourceDatabasesByName,
  reqSourceInfoById,
  reqSourceTablesByName,
  reqSourceType
} from '@/api/source'
import type { SourceInfoResponse } from '@/api/source/type'
import type { QueryInfo } from '@/api/analysis/type'

let sourceTypeAndInfo = ref<any>()

// 存储分页信息
let pageNo = ref<number>(1)
let pageSize = ref<number>(15)

let curMenuSource = ref<number>(1)
let curMenuDatabase = ref<string>('corner')
let curMenuDatabaseList = ref<string[]>()
let curMenuTable = ref<string>('')
let curMenuTableList = ref<any>('')

let curRunResult = ref<any>()
let prevRunSql = ref<string>('')
let curPane = ref<string>('运行信息')
let curRunLog = ref<string[]>([])
let curRunEngine = ref<string>('spark')
let curRunStatus = ref<number>(-1)

// 接收提交查询是所需的参数
let queryData = reactive<QueryInfo>({
  queryId: 0,
  uuid: '',
  sourceId: 1,
  querySql: '', // sql语句
  queryResult: '',
  runEngine: 'spark', // 引擎
  runLog: '',
  runDuration: 0,
  runStartTime: '',
  runStatus: -1 // 运行状态：0运行成功 1运行中 2运行失败
})
let historyQueryPageInfo = ref<any>()

let viewEditor = ref<any>()
let queryEditor = ref<any>()

// sql编辑器配置
const ace_options = {
  selectionStyle: 'line',
  // 开启后台语法检查
  useWorker: true,
  // 是否启用基本自动补全
  enableBasicAutocompletion: true,
  // 是否启用代码片段
  enableSnippets: true,
  // 是否启用实时自动补全
  enableLiveAutocompletion: true,
  // 设置编辑器字体大小
  fontSize: 14,
  // 控制文本是否自动换行 可选值有 "off"（不换行）、"free"（自由换行）和 "printMargin"（在打印边距处换行）
  wrap: 'off',
  // 设置缩进宽度
  tabSize: 4,
  // 设置最大行数
  maxLines: 32,
  // 设置最小行数
  minLines: 32,
  // 是否使用空格代替制表符进行缩进
  useSoftTabs: true,
  // 是否启用自动缩进
  useElasticTabstops: true,
  // 是否显示打印边距指示线
  showPrintMargin: false,
  // 设置打印边距
  printMarginColumn: 20,
  // 是否显示行号
  showGutter: true,
  // 是否自动缩进
  enableAutoIndent: true,
  // 是否启用键盘访问
  enableKeyboardAccessibility: true,
  // 设置换行模式
  newLineMode: 'unix',
  // 是否突出显示当前行
  highlightActiveLine: true
}

// 格式化sql的配置
const format_options = reactive<any>({
  dialect: hive, // sql 方言
  tabWidth: 4, // 缩进宽度
  keywordCase: 'lower', // 大写或小写关键字
  linesBetweenQueries: 2, // 查询之间空行数
  denseOperators: false // 操作符是否密集
})

// 提交查询
const runQuery = async () => {
  // 更新执行引擎
  queryData.runEngine = curRunEngine.value
  const result = await reqRunQuery(queryData)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '提交运行',
      duration: 2000,
      showClose: true,
      center: true
    })
    console.log('result.data = ' + JSON.stringify(result.data))
    // 更新当前展示的sql
    prevRunSql.value = queryData.querySql
    // 更新当前运行状态
    curRunStatus.value = 1
    // 成功之后每隔1秒获取一次当前查询的信息 queryInfoResponse
    let queryInfoResponse: any = {}
    let queryInfoByUUID: any = {}
    const webSocket = new WebSocket(`ws://hadoop-bishe:8085/ws/log/${result.data.uuid}`)
    // 跳转到日志界面，根据websoket连接获取服务器发送的日志
    curPane.value = '日志'
    // 先重置日志
    curRunLog.value = []
    webSocket.onmessage = (event) => {
      curRunLog.value.push(event.data)
    }
    const timer = setInterval(async () => {
      queryInfoResponse = await reqQueryInfo(result.data.uuid)
      // 将返回的数据赋值给临时变量
      Object.assign(queryInfoByUUID, queryInfoResponse.data)
      if (queryInfoByUUID.runStatus == 2 || queryInfoByUUID.runStatus == 0) {
        // 清除定时器
        clearInterval(timer)
        // 更新当前运行状态
        curRunStatus.value = queryInfoByUUID.runStatus
        // 展示运行信息页面
        curPane.value = '运行信息'
        // 将返回的数据赋值给queryData
        Object.assign(queryData, queryInfoByUUID)
      }
    }, 5000)
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
      duration: 2000,
      showClose: true,
      center: true
    })
  }
}

// 格式化sql
const formatSql = () => {
  // 格式化sql
  const format_result = formatDialect(queryData.querySql, format_options)
  // 输出格式化后的sql
  queryData.querySql = format_result
}

// 点击复制结果
const copyResult = () => {
  const tableText =
    "'" +
    curRunResult.value.data
      .map((row: any) => {
        return Object.values(row).join("','") // 将每一行的数据转换为文本格式
      })
      .join("'\n'") +
    "'" // 将整个表格数据转换为文本格式

  navigator.clipboard
    .writeText(tableText) // 将数据写入剪贴板
    .then(() => {
      // 成功复制到剪贴板时的反馈
      ElMessage({
        message: '复制成功',
        type: 'success'
      })
    })
    .catch((err) => {
      // 复制失败时的反馈
      ElMessage.error('复制失败')
      console.error('无法复制表格数据', err)
    })
}

// 点击复制语句
const copySQL = (row: any) => {
  navigator.clipboard
    .writeText(row.querySql) // 将数据写入剪贴板
    .then(() => {
      // 成功复制到剪贴板时的反馈
      ElMessage({
        message: '复制成功',
        type: 'success',
        showClose: true,
        duration: 2000,
        center: true
      })
    })
    .catch((err) => {
      // 复制失败时的反馈
      ElMessage({
        message: '复制失败',
        type: 'error',
        showClose: true,
        duration: 2000,
        center: true
      })
    })
}

// 页面挂载时执行的动作
onMounted(() => {
  // 获取数据源信息
  getSourceTypeAndInfo()
  // 获取数据源对应的数据库
  getSourceDatabasesByName('')
  // 获取最后一次执行的任务信息
  getLastRunQuery()
  // 获取历史执行的任务信息
  getHistoryRunQuery()
})

watch(
  () => queryData.queryResult,
  () => {
    const jsonObject = JSON.parse(queryData.queryResult)
    curRunResult.value = jsonObject
  }
)

// 处理数据源切换
const handleChange = (value: any) => {
  curMenuSource.value = value[value.length - 1]
  queryData.sourceId = value[value.length - 1]
}

watch(
  () => queryData.sourceId,
  async () => {
    // 判断切换后的数据源类型动态更新查询的引擎
    const result: SourceInfoResponse = await reqSourceInfoById(curMenuSource.value)
    var sourceInfo = result.data
    if (sourceInfo.sourceType.typeName.toLowerCase() == 'hive') {
      curRunEngine.value = 'spark'
    } else if (sourceInfo.sourceType.typeName.toLowerCase() == 'mysql') {
      curRunEngine.value = 'jdbc'
    }
  }
)

// 获取最后一次执行的任务信息
const getLastRunQuery = async () => {
  const result = await reqLastQuery()
  if (result.code == 200) {
    Object.assign(queryData, result.data)
    // 更新需要展示的sql
    prevRunSql.value = queryData.querySql
    // 更新当前运行状态
    curRunStatus.value = queryData.runStatus
    // 获取最后一次执行的任务日志
    getLastRunLog()
  }
}

const getLastRunLog = () => {
  // 先重置日志
  curRunLog.value = []
  var strings = queryData.runLog.split('/')
  const fileName = strings[strings.length - 1]
  // 后端传递完日志会自动关闭当前的websocket连接
  const webSocket = new WebSocket(`ws://hadoop-bishe:8085/ws/logFile/${fileName}`)
  webSocket.onmessage = (event) => {
    curRunLog.value.push(event.data)
  }
}

// 获取历史执行的任务信息
const getHistoryRunQuery = async () => {
  const result = await reqQueryPageInfoList(pageNo.value, pageSize.value)
  if (result.code == 200) {
    historyQueryPageInfo.value = result.data
  }
}

// 分页栏点击回调
const paginationChange = () => {
  // 重新获取数据
  getHistoryRunQuery()
}

// 获取数据源信息
const getSourceTypeAndInfo = async () => {
  const result = await reqSourceType()
  if (result.code == 200) {
    sourceTypeAndInfo.value = result.data.list.map((item: any) => {
      return {
        id: item.id ? 0 : item.sourceId,
        value: item.id ? 0 : item.sourceId,
        label: item.typeName ? item.typeName : item.sourceName,
        children: item.children.map((item: any) => {
          return {
            id: item.id ? item.id : item.sourceId,
            value: item.id ? item.id : item.sourceId,
            label: item.typeName ? item.typeName : item.sourceName
          }
        })
      }
    })
  }
}

// 获取数据源对应的数据库
const getSourceDatabasesByName = async (key: string) => {
  const result = await reqSourceDatabasesByName(curMenuSource.value, key)
  if (result.code == 200) {
    curMenuDatabaseList.value = result.data
  }
}

// 获取数据源对应的数据库下对应的表
const getSourceTablesByName = async (key: string) => {
  const result = await reqSourceTablesByName(curMenuSource.value, curMenuDatabase.value, key)
  if (result.code == 200) {
    curMenuTableList.value = result.data.map((item: string) => {
      return {
        tableName: item
      }
    })
  }
}

// 点击联动切换数据源
const linkageSource = async () => {
  queryData.sourceId = curMenuSource.value
}
</script>

<template>
  <div class="analysis">
    <div class="left">
      <div class="head">
        <div class="title">
          <svg
            class="icon"
            height="16"
            p-id="2360"
            t="1712586048076"
            version="1.1"
            viewBox="0 0 1024 1024"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M263.616 870.016l440.256-751.872 61.376 35.904-440.256 751.808-61.376-35.84zM78.016 509.504l192.768-190.592-4.864-8.512-32.256-55.04-205.76 203.648a72.32 72.32 0 0 0-0.768 101.76l205.76 207.872 37.504-64.192-192.384-194.944zM996.032 459.008l-205.76-203.648-32.256 55.04-4.928 8.576 192.832 190.592-192.448 194.944 37.44 64.192 205.824-207.872a72.384 72.384 0 0 0-0.704-101.824z"
              fill="#1296db"
              p-id="2361"
            ></path>
          </svg>
          <span style="margin-left: 8px; font-size: 13px">SQL查询</span>
        </div>
        <div class="menu">
          <el-row>
            <el-col :span="18" class="icon-group">
              <el-tooltip v-if="curRunStatus != 1" content="执行SQL" placement="bottom">
                <svg
                  height="14"
                  p-id="3528"
                  style="margin-right: 8px; cursor: pointer"
                  t="1712587577358"
                  version="1.1"
                  viewBox="0 0 1024 1024"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="runQuery"
                >
                  <path d="M912 512l-800 448V64z" fill="#0590DF" p-id="3529"></path>
                </svg>
              </el-tooltip>
              <el-tooltip v-if="curRunStatus == 1" content="正在执行" placement="bottom">
                <el-icon class="is-loading my-icon" style="cursor: auto">
                  <Loading />
                </el-icon>
              </el-tooltip>
              <el-tooltip content="语法检查" placement="bottom">
                <svg
                  class="my-icon"
                  height="15"
                  p-id="12647"
                  t="1712589726686"
                  version="1.1"
                  viewBox="0 0 1024 1024"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M754.191 120c71.362 0 85.268 24.301 85.268 84.502v161.516c0 16.514-13.444 29.959-29.96 29.959-16.514 0-29.958-13.445-29.958-29.96v-186.48H191.889v649.107H642.19c18.456 4.207 27.684 14.643 27.684 31.31 0 24.5-26.588 28.077-27.651 28.21l-0.033 0.004-425.723 0.014C147.56 888.168 131.2 876 131.2 803.68V204.502c0-67.145 19.928-84.502 85.268-84.502H754.19z m-77.713 337.948c77.849 0 140.958 63.108 140.958 140.957 0 27.115-7.657 52.443-20.926 73.938a141.091 141.091 0 0 1-2.453 3.834l105.929 105.928-39.84 39.839-105.928-105.928c-1.346 0.88-2.702 1.746-4.074 2.588-21.437 13.166-46.665 20.758-73.666 20.758-77.849 0-140.958-63.109-140.958-140.957 0-77.849 63.109-140.957 140.958-140.957zM472.654 656.573c4.223 0 7.299 3.456 7.299 7.298v44.941c0 4.223-3.07 7.298-7.299 7.298H254.492c-4.222 0-7.298-3.456-7.298-7.298v-44.94c0-4.223 3.456-7.299 7.298-7.299h218.162z m202.267-147.017c-48.487 0-87.793 39.306-87.793 87.792 0 48.486 39.306 87.792 87.793 87.792 48.487 0 87.793-39.306 87.793-87.792 0-48.486-39.306-87.792-87.793-87.792z m-202.267-13.148c4.223 0 7.299 3.457 7.299 7.299v44.94c0 4.223-3.07 7.299-7.299 7.299l-218.162-0.006c-4.222 0-7.298-3.456-7.298-7.298v-44.935c0-4.223 3.456-7.299 7.298-7.299h218.162z m198.19-160.159c4.222 0 7.298 3.456 7.298 7.298v44.941c0 3.842-3.456 7.298-7.298 7.298H254.492c-4.222 0-7.298-3.456-7.298-7.298v-44.94c0-4.223 3.456-7.299 7.298-7.299h416.352z"
                    fill="#27304B"
                    fill-opacity=".65"
                    p-id="12648"
                  ></path>
                </svg>
              </el-tooltip>
              <el-tooltip content="格式化SQL" placement="bottom">
                <svg
                  class="my-icon"
                  height="15"
                  p-id="15614"
                  t="1712591087563"
                  version="1.1"
                  viewBox="0 0 1024 1024"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                  v-on:click="formatSql"
                >
                  <path
                    d="M948.224 548.864c0-24.576-10.24-49.152-28.672-65.536l-133.12-131.072c-16.384-16.384-38.912-26.624-63.488-26.624-24.576 0-49.152 10.24-67.584 30.72L405.504 628.736c-16.384 18.432-26.624 43.008-24.576 67.584s10.24 49.152 28.672 65.536l133.12 131.072c16.384 16.384 38.912 26.624 63.488 26.624 24.576 0 49.152-10.24 67.584-30.72L921.6 618.496c18.432-18.432 26.624-43.008 26.624-69.632zM606.208 821.248l-131.072-129.024 51.2-57.344 131.072 129.024-51.2 57.344z m116.736-126.976l-131.072-129.024 131.072-141.312 131.072 129.024-131.072 141.312z m81.92-491.52H122.88c-26.624 0-47.104-22.528-47.104-49.152s20.48-49.152 47.104-49.152h681.984c26.624 0 47.104 22.528 47.104 49.152s-20.48 49.152-47.104 49.152zM552.96 385.024H122.88c-26.624 0-47.104-22.528-47.104-49.152S96.256 286.72 122.88 286.72h430.08c26.624 0 47.104 22.528 47.104 49.152s-20.48 49.152-47.104 49.152z m-176.128 182.272H122.88c-26.624 0-47.104-22.528-47.104-49.152 0-26.624 20.48-49.152 47.104-49.152h253.952c26.624 0 47.104 22.528 47.104 49.152 0 28.672-20.48 49.152-47.104 49.152z m-71.68 184.32H122.88c-26.624 0-47.104-22.528-47.104-49.152S98.304 655.36 122.88 655.36h180.224c26.624 0 47.104 22.528 47.104 49.152s-20.48 47.104-45.056 47.104z"
                    fill="#8a8a8a"
                    p-id="15615"
                  ></path>
                </svg>
              </el-tooltip>
            </el-col>
            <el-col :span="6" class="select-source">
              <el-form-item label="数据源">
                <el-cascader
                  v-model="queryData.sourceId"
                  :options="sourceTypeAndInfo"
                  :show-all-levels="false"
                  clearable
                  size="small"
                  @change="handleChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="content">
        <VAceEditor
          ref="queryEditor"
          v-model:value="queryData.querySql"
          :options="ace_options"
          class="query-editor"
          lang="sqlserver"
          theme="sqlserver"
        />
      </div>
      <div class="bottom">
        <div v-if="curRunStatus != -1 && curRunStatus != 1" class="running-status">
          <span style="height: 14px; font-size: 14px; margin-right: 5px">
            <el-icon v-if="queryData.runStatus == 0" color="#67C23A">
              <SuccessFilled />
            </el-icon>
            <el-icon v-if="queryData.runStatus == 2" color="#F56C6C">
              <CircleCloseFilled />
            </el-icon>
          </span>
          <span style="height: 14px"
            >运行{{ queryData.queryId }}：{{ queryData.runStatus == 0 ? '成功' : '失败' }} ({{
              queryData.runDuration
            }}) s，运行时间：{{ queryData.runStartTime }}</span
          >
        </div>
        <div class="result-area">
          <el-tabs type="border-card">
            <el-tab-pane class="running-result" label="运行结果">
              <el-tabs v-model="curPane" stretch tab-position="left" v-if="curRunStatus != -1">
                <el-tab-pane class="running_info" label="运行信息" name="运行信息">
                  <p>开始时间：{{ queryData.runStartTime }}</p>
                  <p>运行时长：{{ queryData.runDuration }}</p>
                  <p>执行引擎：{{ queryData.runEngine }}</p>
                  <p>执行结果：{{ queryData.runStatus === 0 ? '成功' : '失败' }}</p>
                </el-tab-pane>
                <el-tab-pane class="running_sql" label="SQL" name="SQL">
                  <VAceEditor
                    ref="viewEditor"
                    v-model:value="prevRunSql"
                    :options="{
                      readOnly: true,
                      showPrintMargin: false,
                      showGutter: true,
                      highlightActiveLine: false,
                      maxLines: 10,
                      minLines: 10,
                      fontSize: 14
                    }"
                    class="query-editor"
                    lang="sqlserver"
                    theme="sqlserver"
                  />
                </el-tab-pane>
                <el-tab-pane class="running_log" label="日志" name="日志">
                  <el-scrollbar max-height="240">
                    <el-row
                      v-for="(message, index) in curRunLog"
                      :key="index"
                      style="margin-bottom: 10px"
                      type="info"
                    >
                      <el-text style="text-align: left">
                        {{ message }}
                      </el-text>
                    </el-row>
                  </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane class="result_info" label="预览结果" name="预览结果">
                  <div style="line-height: 20px">
                    <el-button class="operate" link type="primary" @click="copyResult">
                      复制结果
                    </el-button>
                  </div>
                  <el-table
                    :data="curRunResult?.data"
                    max-height="240"
                    show-overflow-tooltip
                    size="small"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column :index="1" fixed label="#" type="index" width="50" />
                    <el-table-column
                      v-for="(item, index) in curRunResult?.columns"
                      :key="index"
                      :label="item"
                      :prop="item"
                    />
                  </el-table>
                </el-tab-pane>
              </el-tabs>
              <el-empty
                style="height: 240px"
                description="当前没有查询记录"
                v-if="curRunStatus == -1"
              />
            </el-tab-pane>
            <el-tab-pane class="running-history" label="运行历史">
              <el-table
                :data="historyQueryPageInfo?.list"
                max-height="200"
                show-overflow-tooltip
                size="small"
                stripe
                style="width: 100%"
              >
                <el-table-column label="查询ID" prop="queryId" sortable width="100" />
                <el-table-column label="运行结果" prop="runStatus" sortable width="100">
                  <template #default="scope">
                    <el-tag :type="scope.row.runStatus === 0 ? 'success' : 'danger'" size="small">
                      {{ scope.row.runStatus === 0 ? '成功' : '失败' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="查询SQL" prop="querySql" sortable />
                <el-table-column fixed="right" label="选项" width="200">
                  <template #default="scope">
                    <el-button link size="small" type="primary" @click.prevent="copySQL(scope.row)">
                      复制语句
                    </el-button>
                    <el-link
                      :href="scope.row.runLog"
                      :underline="false"
                      size="small"
                      style="font-size: 12px"
                      target="_blank"
                      type="primary"
                    >
                      下载日志
                    </el-link>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  v-model:current-page="pageNo"
                  v-model:page-size="pageSize"
                  :page-sizes="[15, 30, 50]"
                  :small="true"
                  :total="historyQueryPageInfo?.total"
                  background
                  layout="total,prev, pager, next, sizes,jumper"
                  @change="paginationChange"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="right">
      <el-tabs>
        <el-tab-pane label="库表信息">
          <!-- 联动切换数据源按钮 -->
          <div style="margin-bottom: 10px">
            <el-button link type="primary" @click="linkageSource">
              <template #icon>
                <el-icon>
                  <Refresh />
                </el-icon>
              </template>
              联动切换数据源
            </el-button>
          </div>
          <!-- 数据源树形选择器 -->
          <el-tree-select
            v-model="curMenuSource"
            :data="sourceTypeAndInfo"
            style="margin-bottom: 10px"
          />
        </el-tab-pane>
        <!-- 选择库 -->
        <el-select
          v-model="curMenuDatabase"
          :remote-method="getSourceDatabasesByName"
          clearable
          filterable
          placeholder="请选择库"
          remote
          style="margin-bottom: 10px; width: 100%"
        >
          <el-option
            v-for="(item, index) in curMenuDatabaseList"
            :key="index"
            :label="item"
            :value="item"
          />
          <template #prefix>
            <svg
              class="icon"
              height="16"
              p-id="4277"
              t="1712739581622"
              version="1.1"
              viewBox="0 0 1024 1024"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M522.666667 96l8.533333 0.042667a910.08 910.08 0 0 1 91.562667 5.333333l14.549333 1.706667 15.402667 2.133333 15.125333 2.410667 7.573333 1.322666 14.890667 2.837334c125.205333 25.322667 212.928 79.488 216.256 150.677333l0.106667 4.202667v448c0 73.258667-88.704 129.066667-216.362667 154.88l-14.890667 2.837333-7.573333 1.322667-15.125333 2.389333-15.402667 2.133333c-36.266667 4.650667-74.773333 7.104-114.645333 7.104-39.872 0-78.378667-2.453333-114.645334-7.104l-15.402666-2.133333-15.125334-2.389333c-137.088-23.189333-235.264-79.488-238.72-154.901334L138.666667 714.666667v-448l0.106666-4.202667c3.328-71.189333 91.050667-125.354667 216.256-150.677333l14.890667-2.837334 7.573333-1.322666 15.125334-2.389334 15.402666-2.133333a892.202667 892.202667 0 0 1 97.642667-6.954667L522.666667 96z m145.173333 543.04l-15.125333 2.389333-15.402667 2.133334c-36.266667 4.650667-74.773333 7.104-114.645333 7.104-39.872 0-78.378667-2.453333-114.645334-7.104l-15.402666-2.133334-15.125334-2.389333c-71.488-12.096-132.416-33.194667-174.826666-61.312V714.666667c0 20.949333 24.170667 42.773333 65.066666 61.184l9.749334 4.181333c15.04 6.186667 32 11.925333 50.602666 17.024l12.650667 3.306667c12.864 3.2 26.453333 6.144 40.597333 8.704l14.378667 2.453333 14.741333 2.197333c9.962667 1.386667 20.16 2.602667 30.570667 3.626667l15.765333 1.408 16.064 1.109333 16.362667 0.810667a845.994667 845.994667 0 0 0 66.901333 0l16.362667-0.810667 16.064-1.109333 15.786667-1.408c10.389333-1.024 20.586667-2.24 30.549333-3.626667l14.741333-2.197333 14.378667-2.453333c14.165333-2.56 27.733333-5.482667 40.597333-8.704l12.650667-3.306667c18.602667-5.12 35.562667-10.837333 50.602667-17.024l9.749333-4.181333c39.317333-17.706667 63.189333-38.549333 64.96-58.773334l0.106667-2.410666v-136.96c-42.389333 28.138667-103.317333 49.237333-174.826667 61.333333zM842.666667 364.373333c-40.298667 26.730667-97.28 47.104-164.202667 59.456l-10.666667 1.877334-15.104 2.389333-15.402666 2.133333c-36.266667 4.650667-74.773333 7.104-114.645334 7.104-34.176 0-67.349333-1.792-98.986666-5.248l-15.658667-1.856-15.402667-2.133333-15.125333-2.389333c-71.488-12.096-132.416-33.194667-174.826667-61.312V480c0 20.949333 24.170667 42.773333 65.066667 61.184l9.749333 4.181333c15.04 6.186667 32 11.925333 50.602667 17.024l12.650667 3.306667c12.864 3.2 26.453333 6.144 40.597333 8.704l14.378667 2.453333 14.741333 2.197334c9.962667 1.386667 20.16 2.602667 30.570667 3.626666l15.765333 1.408 16.064 1.109334 16.362667 0.810666a845.994667 845.994667 0 0 0 66.901333 0l16.362667-0.810666 16.064-1.109334 15.786666-1.408c10.389333-1.024 20.586667-2.24 30.549334-3.626666l14.741333-2.197334 14.378667-2.453333c14.165333-2.56 27.733333-5.482667 40.597333-8.704l12.650667-3.306667c18.602667-5.12 35.562667-10.837333 50.602666-17.024l9.749334-4.181333c39.317333-17.706667 63.189333-38.549333 64.96-58.773333l0.106666-2.410667v-115.626667zM522.666667 160l-8.448 0.042667-12.586667 0.213333-12.416 0.405333-16.362667 0.810667-16.064 1.109333-15.786666 1.408c-6.933333 0.682667-13.76 1.450667-20.501334 2.304l-10.026666 1.322667-14.762667 2.197333-14.378667 2.453334c-10.624 1.92-20.906667 4.053333-30.826666 6.336l-9.770667 2.346666-12.650667 3.328c-15.488 4.266667-29.866667 8.96-42.922666 13.973334l-7.68 3.050666-9.749334 4.181334c-40.896 18.410667-65.066667 40.234667-65.066666 61.184 0 20.053333 22.122667 40.874667 59.84 58.773333l5.226666 2.410667 9.749334 4.181333c12.522667 5.162667 26.389333 10.005333 41.450666 14.421333l9.173334 2.602667 12.629333 3.306667c9.642667 2.410667 19.690667 4.650667 30.08 6.72l10.517333 1.984 14.378667 2.453333 14.741333 2.197333c6.634667 0.938667 13.376 1.770667 20.224 2.56l10.346667 1.066667 15.765333 1.408 16.064 1.109333 16.362667 0.810667a845.994667 845.994667 0 0 0 55.872 0.362667l11.029333-0.362667 16.362667-0.810667 16.064-1.109333 15.786667-1.408c6.933333-0.682667 13.76-1.450667 20.501333-2.304l10.026667-1.322667 14.762666-2.197333 14.378667-2.453333c10.624-1.92 20.906667-4.053333 30.826667-6.336l9.770666-2.346667 12.650667-3.328c15.488-4.266667 29.866667-8.96 42.922667-13.973333l7.68-3.050667 9.749333-4.181333c40.896-18.410667 65.066667-40.234667 65.066667-61.184 0-20.053333-22.122667-40.874667-59.84-58.773334l-5.226667-2.410666-9.749333-4.181334a424.469333 424.469333 0 0 0-41.450667-14.421333l-9.173333-2.602667-12.629334-3.306666a623.658667 623.658667 0 0 0-30.08-6.72l-10.517333-1.984-14.378667-2.453334-14.741333-2.197333a765.994667 765.994667 0 0 0-20.224-2.56l-10.346667-1.066667-15.765333-1.408-16.064-1.109333-16.362667-0.810667c-7.317333-0.298667-14.72-0.490667-22.186666-0.597333L522.666667 160z"
                fill="#1677FF"
                p-id="4278"
              ></path>
            </svg>
          </template>
        </el-select>
        <!-- 数据表名称 -->
        <el-input
          v-model="curMenuTable"
          :prefix-icon="Search"
          placeholder="数据表名称"
          style="margin-bottom: 10px; width: 100%"
          @blur="getSourceTablesByName(curMenuTable)"
          @input="getSourceTablesByName"
        />
        <!-- 数据表展示 -->
        <el-table
          :data="curMenuTableList"
          :show-header="false"
          max-height="650"
          size="small"
          style="width: 100%"
        >
          <el-table-column label="表名" prop="tableName" sortable />
        </el-table>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.analysis {
  display: flex;

  .left {
    width: 85%;

    .head {
      .title {
        display: flex;
        align-items: center;
        padding: 5px 10px;
      }

      .menu {
        padding: 0 10px;

        .icon-group {
          display: flex;
          align-items: center;

          .my-icon {
            width: 15px;
            height: 15px;
            cursor: pointer;
            margin-right: 8px;
          }
        }

        .select-source {
          display: flex;
          justify-content: right;

          :deep(.el-form-item) {
            margin: 0;
          }
        }
      }

      border-bottom: 2px solid #e0e3e9;
      padding: 5px 0;
    }

    .content {
      .query-editor {
        margin-top: 5px;
        border-bottom: 2px solid #e0e3e9;

        :deep(.ace_gutter-layer) {
          background-color: white;
          color: #79bbff;
        }

        :deep(.ace_gutter-active-line) {
          background: none;
          border-top: 1px solid #e0e3e9;
          border-bottom: 1px solid #e0e3e9;
        }

        // 去掉鼠标选中行的背景色
        :deep(.ace_active-line) {
          background: none;
          border-top: 1px solid #e0e3e9;
          border-bottom: 1px solid #e0e3e9;
        }
      }
    }

    .bottom {
      .running-status {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #666;
        background-color: #fff;
        margin: 3px 5px;
      }

      .result-area {
        .running-result {
          min-height: 240px;

          .running_info {
            padding-left: 5px;

            p {
              height: 18px;
              line-height: 18px;
              color: #666;
              margin-bottom: 4px;
              font-size: 12px;
            }
          }

          .running_sql {
            padding-left: 5px;

            .query-editor {
              :deep(.ace_gutter-layer) {
                background-color: white;
                color: #79bbff;
              }

              :deep(.ace_gutter-active-line) {
                background: none;
              }

              // 去掉鼠标选中行的背景色
              :deep(.ace_active-line) {
                background: none;
              }
            }
          }

          .running_log {
            padding-left: 5px;
          }

          .result_info {
            padding-left: 5px;

            .operate {
              font-size: 12px;
            }
          }

          :deep(.el-tabs__content) {
            padding-left: 0;
          }

          :deep(.el-tabs__item) {
            justify-content: left;
            padding: 0 15px 0 0;
          }
        }

        .running-history {
          min-height: 240px;

          .pagination {
            display: flex;
            justify-content: right;
            margin-top: 20px;
          }
        }
      }
    }
  }

  .right {
    width: 15%;
    border-left: 2px solid #e0e3e9;
    padding: 0 16px;

    :deep(.el-table__cell, .el-table__row, tbody) {
      border: none;
    }
  }
}
</style>
