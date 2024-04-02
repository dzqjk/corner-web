<script setup lang="ts">
import { Tickets } from '@element-plus/icons-vue'
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
        <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        <span>吴雨涛</span>
        <span>
          <el-link :underline="false" type="primary">注册</el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false" type="primary">登录</el-link>
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
  </div>
</template>

<style scoped lang="scss">
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

          span {
            font-size: 13px;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
