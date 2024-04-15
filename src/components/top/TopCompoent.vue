<script lang='ts' setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import { ElMessage } from 'element-plus'

// router对象
let $router = useRouter()
let $route = useRoute()

let userStore = useUserStore()

// 点击菜单跳转页面
const goView = (path: string) => {
  $router.push({ path: path, query: { uuid: userStore.userInfo?.uuid } })
}

// 点击安全退出
const loginOut = () => {
  userStore.loginOut()
  $router.push({ path: '/home' })
  ElMessage({
    type: 'error',
    showClose: true,
    center: true,
    message: '退出登录'
  })
}

// 点击注册或登录按钮回调
const showLogin = () => {
  // 设置用户仓库是否显示登录注册页面
  userStore.visible = true
}
</script>

<template>
  <div class='top'>
    <!-- 左侧菜单栏 -->
    <div class='left'>
      <ul>
        <li class='logo'>
          <svg
            class='icon'
            height='18'
            p-id='8747'
            t='1711458820077'
            version='1.1'
            viewBox='0 0 1024 1024'
            width='18'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M129.3312 663.2448l67.3792 36.864A34.56 34.56 0 0 0 192 716.8c0 54.7328 141.1072 115.2 320 115.2s320-60.4672 320-115.2c0-5.12-1.3824-10.4448-4.4544-16.1792l67.8912-35.9936c8.704 16.5376 13.3632 34.0992 13.3632 52.1728 0 114.944-179.8144 192-396.8 192-216.9856 0-396.8-77.056-396.8-192 0-18.5856 4.864-36.608 14.1312-53.5552zM512 115.2c216.9856 0 396.8 77.056 396.8 192S728.9856 499.2 512 499.2C295.0144 499.2 115.2 422.144 115.2 307.2S295.0144 115.2 512 115.2z m0 76.8C333.1072 192 192 252.4672 192 307.2S333.1072 422.4 512 422.4 832 361.9328 832 307.2 690.8928 192 512 192z'
              fill='#ffffff'
              p-id='8748'
            ></path>
            <path
              d='M129.3312 458.4448c-9.216 16.896-14.1312 34.9696-14.1312 53.5552 0 114.944 179.8144 192 396.8 192 216.9856 0 396.8-77.056 396.8-192 0-18.0736-4.608-35.6352-13.3632-52.1728l-67.8912 35.9936c3.072 5.7344 4.4544 11.008 4.4544 16.1792 0 54.7328-141.1072 115.2-320 115.2S192 566.7328 192 512c0-5.3248 1.4848-10.752 4.7104-16.7424l-67.3792-36.8128z'
              fill='#ffffff'
              p-id='8749'
            ></path>
          </svg>
        </li>
        <li>CornerData</li>
        <li
          :class="{ active: $route.path.split('\/')[1] == 'home' }"
          class='menu home'
          @click="goView('/home')"
        >
          首页
        </li>
        <li>
          <el-divider direction='vertical' />
        </li>
        <li
          :class="{ active: $route.path.split('\/')[1] == 'transfer' }"
          class='menu'
          @click="goView('/transfer/taskList')"
        >
          数据传输
        </li>
        <li
          :class="{ active: $route.path.split('\/')[1] == 'source' }"
          class='menu'
          @click="goView('/source/sourceList')"
        >
          数据源管理
        </li>
        <li
          :class="{ active: $route.path.split('\/')[1] == 'analysis' }"
          class='menu'
          @click="goView('/analysis')"
        >
          自助分析
        </li>
        <li
          :class="{ active: $route.path.split('\/')[1] == 'assetMap' }"
          class='menu'
          @click="goView('/assetMap')"
        >
          数据资产地图
        </li>
      </ul>
    </div>
    <!-- 右侧用户信息 -->
    <div class='right'>
      <el-dropdown v-show='userStore.userInfo.nickName' :hide-on-click='true' trigger='click'>
        <span class='el-dropdown-link'>
          {{ userStore.userInfo.nickName }}
          <el-icon class='el-icon--right name_dropdown'> <ArrowDown /> </el-icon
          ></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goView('/userInfo')">个人信息</el-dropdown-item>
            <el-dropdown-item @click='loginOut'>安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span v-show='!userStore.userInfo.uuid' style='padding-right: 15px'>
        <el-link :underline='false' type='text' @click='showLogin'>注册</el-link>
          <el-divider direction='vertical' />
          <el-link :underline='false' type='text' @click='showLogin'>登录</el-link>
      </span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.top {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e1e;
  padding: 8px 0;

  .left {
    ul {
      display: flex;
      align-items: center;
      color: #cccccc;
      font-size: 14px;

      .logo {
        margin-left: 16px;
        margin-right: 10px;
      }

      .menu {
        cursor: pointer;

        &.home {
          margin: 0;
          padding: 0 15px;
        }

        &.active {
          color: white;
        }

        margin: 0 13px;
      }

      .menu:hover {
        color: white;
      }
    }
  }

  .right {
    :deep(.el-dropdown) {
      margin-right: 20px;
      color: #7f7f7f;
    }

    .el-dropdown-link {
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
}
</style>
