<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { reqSourceType } from '@/api/source'
import { useRouter } from 'vue-router'

// 编程式路由
let $router = useRouter()
// 接收请求数据源类型API返回的数据
let sourceType = ref<any>()
// 标记当前数据源类型
let currentType = ref<number>(0)

onMounted(() => {
  // 获取数据源类型信息
  getSourceType()
})

// 获取数据源类型信息
const getSourceType = async () => {
  const result = await reqSourceType()
  if (result.code == 200) {
    sourceType.value = result.data
  }
}

// 点击不同数据源类型
const clickType = (typeId: number) => {
  // 改变当前数据源类型
  currentType.value = typeId
  // 通过路由跳转更新数据源列表数据
  $router.push({
    path: '/source/list',
    query: {
      typeId: typeId
    }
  })
}
</script>

<template>
  <div class="source">
    <!-- 左边选项区 -->
    <div class="left">
      <div class="top">
        <div class="title">
          <svg
            class="icon"
            height="24"
            p-id="2363"
            t="1711896644458"
            version="1.1"
            viewBox="0 0 1024 1024"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M154.737778 750.933333V603.022222c67.015111 54.272 191.715556 91.022222 334.506666 91.022222v-52.337777c-204.231111 0-334.506667-76.8-334.506666-129.706667V364.088889c67.015111 54.272 191.715556 91.022222 334.506666 91.022222s267.491556-36.408889 334.506667-91.022222v138.808889H876.088889V273.066667c0-100.579556-173.169778-182.044444-386.844445-182.044445S102.4 172.487111 102.4 273.066667v477.866666c0 100.579556 173.169778 182.044444 386.844444 182.044445v-52.337778c-204.231111 0-334.506667-76.8-334.506666-129.706667zM489.244444 143.36c204.8 0 334.506667 76.8 334.506667 129.706667S694.044444 402.773333 489.244444 402.773333 154.737778 325.973333 154.737778 273.066667 285.013333 143.36 489.244444 143.36zM557.511111 864.711111h364.088889v45.511111H557.511111z"
              fill="#707070"
              p-id="2364"
            ></path>
            <path
              d="M557.511111 728.177778h364.088889v45.511111H557.511111zM557.511111 591.644444h364.088889v45.511112H557.511111z"
              fill="#707070"
              p-id="2365"
            ></path>
            <path
              d="M638.179556 568.888889h113.777777v91.022222h-113.777777zM777.671111 705.422222h113.777778v91.022222h-113.777778zM641.137778 841.955556h113.777778v91.022222h-113.777778z"
              fill="#707070"
              p-id="2366"
            ></path>
          </svg>
          <span>数据源管理</span>
        </div>
        <div class="description">
          <span>数据源类型</span>
        </div>
      </div>
      <div class="menu">
        <ul>
          <li class="type all" :class="{ active: currentType == 0 }" @click="clickType(0)">
            <span>全部数据源({{ sourceType?.total }})</span>
          </li>
          <li
            class="type"
            :class="{ active: currentType == item.id }"
            v-for="item in sourceType?.list.filter((info: any) => info.sourceCount > 0)"
            :key="item.id"
            @click="clickType(item.id)"
          >
            <el-image class="logo" size="small" :src="item.logoUrl" />
            <span>{{ item.typeName }}({{ item.sourceCount }})</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 右边内容区 -->
    <div class="right">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.source {
  height: 100%;
  display: flex;

  .left {
    width: 12%;
    border-right: 0.5px solid #cccccc;

    .top {
      .title {
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

      .description {
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
    }

    .menu {
      .type {
        display: flex;
        justify-content: left;
        align-items: center;
        cursor: pointer;
        margin: 0 0 15px 30px;

        .logo {
          height: 16px;
          width: 16px;
        }

        :hover {
          color: #1e90ff;
        }

        &.active {
          color: #1e90ff;
        }

        &.all {
          margin-top: 15px;

          span {
            margin-left: 0;
          }
        }

        span {
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
  }

  .right {
    width: 88%;
    padding: 0 25px 20px 25px;
  }
}
</style>
