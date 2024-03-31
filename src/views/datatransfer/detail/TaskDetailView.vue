<script setup lang="ts">
import { ArrowLeft, CaretBottom, QuestionFilled } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

let $route = useRoute()
let $router = useRouter()

// 存储任务信息
let basicRef = ref<FormInstance>()
let taskFormData = reactive<any>({
  taskName: '', // 任务名称
  ownerName: '', // 负责人姓名
  sourceType: '', // 数据来源类型
  sourceInfo: '', // 数据来源名称
  sourceDatabase: '', // 数据来源库
  sourceTable: '', // 数据来源表
  sourceCondition: '', // 数据来源过滤条件
  sinkType: '', // 数据去向类型
  sinkInfo: '', // 数据去向类型
  sinkDatabase: '', // 数据去向库
  sinkTable: '', // 数据去向表
  fields: []
})

// 点击取消按钮或返回
const cancelAdd = () => {
  $router.back()
}

// 取消添加或编辑任务
const cancelEdit = () => {
  $router.back()
}
</script>

<template>
  <div class="addTask">
    <!-- 头部返回按钮 -->
    <div class="top">
      <el-button @click="cancelAdd" type="primary" link :icon="ArrowLeft">返回</el-button>
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
                <el-input style="width: 80%" placeholder="请输入任务名称" />
              </el-form-item>
              <el-form-item label="描述">
                <el-input
                  style="width: 80%"
                  placeholder="输入任务描述，最多不超过128各字符"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人">
                <el-input style="width: 80%" placeholder="请输入负责人名称" />
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
            <el-form size="small" label-width="10%" label-position="left">
              <el-form-item label="数据源:">
                <el-autocomplete
                  fetch-suggestions=""
                  clearable
                  placeholder="请选择类型"
                  @select=""
                  style="width: 30%"
                >
                  <template #suffix>
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </template>
                </el-autocomplete>
                <el-autocomplete
                  fetch-suggestions=""
                  clearable
                  placeholder="请选择数据源"
                  @select=""
                  style="width: 60%"
                >
                  <template #suffix>
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="库表选择:">
                <el-select filterable remote placeholder="请选择数据库" style="width: 30%">
                  <el-option label="Mysql" value="0" />
                </el-select>
                <el-select filterable remote placeholder="请选择表" style="width: 60%">
                  <el-option label="Mysql" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="数据过滤:">
                <el-input
                  style="width: 90%"
                  type="textarea"
                  placeholder="输入where关键词之后的条件"
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
            <el-form size="small" label-width="10%" label-position="left">
              <el-form-item label="数据源:">
                <el-autocomplete
                  fetch-suggestions=""
                  clearable
                  placeholder="请选择类型"
                  @select=""
                  style="width: 30%"
                >
                  <template #suffix>
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </template>
                </el-autocomplete>
                <el-autocomplete
                  fetch-suggestions=""
                  clearable
                  placeholder="请选择数据源"
                  @select=""
                  style="width: 60%"
                >
                  <template #suffix>
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="库表选择:">
                <el-select filterable remote placeholder="请选择数据库" style="width: 30%">
                  <el-option label="Mysql" value="0" />
                </el-select>
                <el-select filterable remote placeholder="请选择表" style="width: 60%">
                  <el-option label="Mysql" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="分区设置:">
                <el-input style="width: 30%" placeholder="输入分区值" />
              </el-form-item>
              <el-form-item label="写入规则:">
                <el-select style="width: 30%">
                  <el-option label="Insert overwrite（覆盖）" />
                  <el-option label="Insert append（追加）" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 字段映射 -->
      <el-divider content-position="left">3、字段映射</el-divider>
      <div class="field-mapping">
        <el-empty style="height: 500px" description="选择数据来源和去向后显示字段映射" />
      </div>
      <!-- 提交 -->
      <div class="footer">
        <el-button size="small" type="primary">提交</el-button>
        <el-popconfirm
          width="150"
          confirm-button-text="是"
          cancel-button-text="否"
          @confirm="cancelEdit"
          :icon="QuestionFilled"
          icon-color="red"
          :title="`确定取消${$route.query.type == 'edit' ? '编辑' : '添加'}任务吗?`"
        >
          <template #reference>
            <el-button size="small">取消</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.addTask {
  height: 100%;

  .top {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #cccccc;
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
  }
}
</style>
