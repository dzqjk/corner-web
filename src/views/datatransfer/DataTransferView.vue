<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

let $route = useRoute()
let $router = useRouter()

interface Tree {
  label: string
  nums: number
  children?: Tree[]
}

const data: Tree[] = [
  {
    label: 'ClickHouse',
    nums: 50,
    children: [
      {
        label: 'ck-01',
        nums: 30
      },
      {
        label: 'ck-02',
        nums: 20
      }
    ]
  },
  {
    label: 'MySql',
    nums: 30
  },
  {
    label: 'StarRocks',
    nums: 30
  }
]

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
        <button @click="goView()" class="create-job">新建任务</button>
      </div>
      <!-- 菜单 -->
      <div class="menu">
        <div class="allSource curSource">全部数据源(25)</div>
        <el-tree :data="data">
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ node.label }}({{ data.nums }})</span>
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

<style scoped lang="scss">
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
    }

    .allSource {
      padding-left: 10px;
      padding-top: 13px;
      padding-bottom: 13px;
      font-size: 13px;
      cursor: pointer;

      &.curSource {
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
