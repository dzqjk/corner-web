<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { reqSourceTypeByTask } from '@/api/source'

let $route = useRoute()
let $router = useRouter()

// 标记当前数据源类型
let currentSource = ref<number>(0)
// 接收数据源类型
let sourceTypeMenu = ref<any>()

// 页面挂载时的操作
onMounted(() => {
  // 获取数据源类型
  getSourceType()
})

// 获取数据源类型并渲染至树形控件
const getSourceType = async () => {
  const result = await reqSourceTypeByTask()
  if (result.code == 200) {
    sourceTypeMenu.value = result.data
  }
}

// 点击不同数据源类型
const clickType = (data: any) => {
  console.log(data)
  // 改变当前数据源类型
  currentSource.value = data.sourceId
  // 通过路由跳转更新数据源列表数据
  $router.push({
    path: '/transfer/taskList',
    query: {
      sourceId: data.sourceId,
      sourceType: data.sourceType
    }
  })
}

// 点击新建任务按钮
const goView = () => {
  $router.push({ path: '/transfer/taskDetail', query: { type: 'add' } })
}
</script>

<template>
  <div class="transfer">
    <!-- 左侧菜单区 -->
    <div class="left">
      <div class="logo">
        <svg
          class="icon"
          height="24"
          p-id="3290"
          t="1711550431828"
          version="1.1"
          viewBox="0 0 1024 1024"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
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
        <button class="create-job" @click="goView()">新建任务</button>
      </div>
      <!-- 菜单 -->
      <div class="menu">
        <div :class="{ active: currentSource == 0 }" class="allSource" @click="clickType({})">
          全部数据源({{ sourceTypeMenu?.total }})
        </div>
        <el-tree :data="sourceTypeMenu?.list">
          <template #default="{ node, data }">
            <span
              :class="{ active: currentSource == data.sourceId }"
              @click="
                clickType({ sourceType: data.id ? data.id : data.typeId, sourceId: data.sourceId })
              "
            >
              {{ data.typeName ? data.typeName : data.sourceName }}({{ data.total }})
            </span>
          </template>
        </el-tree>
      </div>
    </div>
    <!-- 右侧内容区 -->
    <div class="right">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.transfer {
  height: 100%;
  display: flex;

  .left {
    width: 12%;
    border-right: 0.5px solid #cccccc;

    .logo {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: left;
      border-bottom: 1px solid #cccccc;
      padding-left: 30px;

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
      padding-left: 30px;

      .create-job {
        width: 80px;
        background-color: dodgerblue;
        border: 1px solid dodgerblue;
        color: white;
        cursor: pointer;
        height: 30px;
      }

      .create-job:hover {
        color: #cccccc;
      }
    }

    .menu {
      padding-left: 20px;

      :deep(.el-tree-node__content) {
        :hover {
          color: dodgerblue;
        }

        .active {
          color: dodgerblue;
        }
      }
    }

    .allSource {
      padding-left: 10px;
      padding-top: 13px;
      padding-bottom: 13px;
      font-size: 14px;
      cursor: pointer;

      &.active {
        color: dodgerblue;
      }
    }

    .allSource:hover {
      color: dodgerblue;
    }
  }

  .right {
    width: 88%;
  }
}
</style>
