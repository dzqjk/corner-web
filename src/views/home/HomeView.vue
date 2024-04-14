<script lang="ts" setup>
import { Tickets } from '@element-plus/icons-vue'
import useUserStore from '@/stores/modules/user'

let userStore = useUserStore()

// 默认头像
const defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

// 点击注册或登录按钮回调
const showLogin = () => {
  // 设置用户仓库是否显示登录注册页面
  userStore.visible = true
}
</script>

<template>
  <div class="home">
    <div class="left">
      <div class="title">一站式数据开发及管理</div>
      <div class="content">
        <div class="img">
          <el-image
            src="https://nos.netease.com/cloud-website-bucket-test/20230925160252a600f182-87af-44d2-91eb-cbecd0133c6b.jpeg"
          />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="userInfo">
        <el-avatar
          :src="userStore.userInfo.avatar != '' ? userStore.userInfo.avatar : defaultAvatar"
        />
        <span>{{ userStore.userInfo.nickName != '' ? userStore.userInfo.nickName : '游客' }}</span>
        <span v-if="userStore.userInfo.uuid == ''">
          <el-link :underline="false" type="primary" @click="showLogin">注册</el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false" type="primary" @click="showLogin">登录</el-link>
        </span>
      </div>
      <div class="manual">
        <div class="title">使用手册</div>
        <ul>
          <li>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>数据传输</span>
          </li>
          <li>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>数据标准</span>
          </li>
          <li>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>指标系统</span>
          </li>
          <li>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>模型设计中心</span>
          </li>
          <li>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>自助分析</span>
          </li>
          <li>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>数据源管理</span>
          </li>
          <li>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>数据资产地图</span>
          </li>
          <li>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>离线开发</span>
          </li>
          <li>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>任务运维中心</span>
          </li>
          <li>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>数据治理</span>
          </li>
        </ul>
      </div>
    </div>
    <Login />
  </div>
</template>

<style lang="scss" scoped>
.home {
  min-height: 1000px;
  height: 100%;
  display: flex;

  .left {
    width: 80%;
    padding: 30px 20px 30px 20px;

    .title {
      margin-bottom: 15px;
      font-weight: 900;
    }

    .content {
      border: 1px solid #cccccc;
    }
  }

  .right {
    width: 20%;
    padding: 15px;

    .userInfo {
      height: 10%;
      display: flex;
      justify-content: left;
      align-items: center;
      padding: 15px 10px;
      border: 1px solid #cccccc;

      span {
        margin-left: 15px;
      }
    }

    .manual {
      .title {
        margin: 15px 0 20px 0;
        font-weight: 900;
      }

      ul {
        li {
          display: flex;
          justify-content: left;
          align-items: center;
          margin-bottom: 15px;
          cursor: pointer;

          span {
            font-size: 13px;
            margin-left: 8px;
          }
        }

        li:hover {
          color: #79bbff;
        }
      }
    }
  }
}
</style>
