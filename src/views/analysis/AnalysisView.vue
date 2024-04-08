<script lang="ts" setup>
// 引入ace-builds配置文件
import '@/ace-config'
import { VAceEditor } from 'vue3-ace-editor/index'
import { Loading } from '@element-plus/icons-vue'

import { reactive, ref } from 'vue'

// 标记sql是否正在运行
let isRunning = ref<boolean>(false)

// 接收提交查询是所需的参数
let queryData = reactive({
  sql: ''
})

// 接收ace-builds配置
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
  fontSize: 13,
  // 控制文本是否自动换行 可选值有 "off"（不换行）、"free"（自由换行）和 "printMargin"（在打印边距处换行）
  wrap: 'off',
  // 设置缩进宽度
  tabSize: 4,
  // 设置最大行数
  maxLines: 35,
  // 设置最小行数
  minLines: 25,
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

// 提交查询
const runQuery = () => {
  // 修改标记sql是否正在运行
  isRunning.value = true
}

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout'
          },
          {
            value: 'color',
            label: 'Color'
          },
          {
            value: 'typography',
            label: 'Typography'
          },
          {
            value: 'icon',
            label: 'Icon'
          },
          {
            value: 'button',
            label: 'Button'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio'
          },
          {
            value: 'checkbox',
            label: 'Checkbox'
          },
          {
            value: 'input',
            label: 'Input'
          },
          {
            value: 'input-number',
            label: 'InputNumber'
          },
          {
            value: 'select',
            label: 'Select'
          },
          {
            value: 'cascader',
            label: 'Cascader'
          },
          {
            value: 'switch',
            label: 'Switch'
          },
          {
            value: 'slider',
            label: 'Slider'
          },
          {
            value: 'time-picker',
            label: 'TimePicker'
          },
          {
            value: 'date-picker',
            label: 'DatePicker'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker'
          },
          {
            value: 'upload',
            label: 'Upload'
          },
          {
            value: 'rate',
            label: 'Rate'
          },
          {
            value: 'form',
            label: 'Form'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table'
          },
          {
            value: 'tag',
            label: 'Tag'
          },
          {
            value: 'progress',
            label: 'Progress'
          },
          {
            value: 'tree',
            label: 'Tree'
          },
          {
            value: 'pagination',
            label: 'Pagination'
          },
          {
            value: 'badge',
            label: 'Badge'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert'
          },
          {
            value: 'loading',
            label: 'Loading'
          },
          {
            value: 'message',
            label: 'Message'
          },
          {
            value: 'message-box',
            label: 'MessageBox'
          },
          {
            value: 'notification',
            label: 'Notification'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu'
          },
          {
            value: 'tabs',
            label: 'Tabs'
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb'
          },
          {
            value: 'dropdown',
            label: 'Dropdown'
          },
          {
            value: 'steps',
            label: 'Steps'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog'
          },
          {
            value: 'tooltip',
            label: 'Tooltip'
          },
          {
            value: 'popover',
            label: 'Popover'
          },
          {
            value: 'card',
            label: 'Card'
          },
          {
            value: 'carousel',
            label: 'Carousel'
          },
          {
            value: 'collapse',
            label: 'Collapse'
          }
        ]
      }
    ]
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components'
      },
      {
        value: 'sketch',
        label: 'Sketch Templates'
      },
      {
        value: 'docs',
        label: 'Design Documentation'
      }
    ]
  }
]
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
              <el-tooltip v-if="!isRunning" content="执行SQL" placement="bottom">
                <svg
                  class="my-icon"
                  height="15"
                  p-id="3528"
                  t="1712587577358"
                  version="1.1"
                  viewBox="0 0 1024 1024"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="runQuery"
                >
                  <path d="M912 512l-800 448V64z" fill="#0590DF" p-id="3529"></path>
                </svg>
              </el-tooltip>
              <el-tooltip v-if="isRunning" content="取消执行" placement="bottom">
                <el-icon class="is-loading my-icon">
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
                  t="1712591087563"
                  class="my-icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="15614"
                  width="15"
                  height="15"
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
                <el-cascader clearable :options="options" :show-all-levels="false" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="content">
        <VAceEditor
          ref="aceRef"
          v-model:value="queryData.sql"
          :options="ace_options"
          class="query-editor"
          lang="sqlserver"
          theme="sqlserver"
        />
      </div>
      <div class="bottom"></div>
    </div>
    <div class="right">数据源信息</div>
  </div>
</template>

<style lang="scss" scoped>
.analysis {
  min-height: 910px;

  display: flex;

  .left {
    width: 80%;

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
      height: 70%;

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
  }

  .right {
    width: 20%;
    border-left: 2px solid #e0e3e9;
  }
}
</style>
