<script setup lang="ts">
const showSub = () => {}
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
        <button class="create-job">新建任务</button>
      </div>
      <!-- 菜单 -->
      <el-menu default-active="1">
        <el-menu-item class="allSource" index="1"> 全部数据来源(1484)</el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <span>ClickHouse(2)</span>
          </template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <span>MySql(20)</span>
          </template>
          <el-menu-item index="3-1">item one</el-menu-item>
          <el-menu-item index="3-2">item two</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <span>Hive(11)</span>
          </template>
          <el-menu-item index="4-1">item one</el-menu-item>
          <el-menu-item index="4-2">item two</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <!-- 右侧内容区 -->
    <div class="right">右侧内容区</div>
  </div>
</template>

<style scoped lang="scss">
.transfer {
  height: 100%;
  display: flex;

  .left {
    flex: 1;
    border-right: 0.5rem solid #cccccc;

    .logo {
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: left;
      border-bottom: 1px solid #cccccc;
      padding-left: 2rem;

      span {
        font-size: 1.1rem;
        margin-left: 0.3rem;
      }
    }

    .option {
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: left;
      border-bottom: 1px solid #cccccc;
      padding-left: 2rem;

      .create-job {
        width: 6.5rem;
        background-color: dodgerblue;
        border: 0.1rem solid dodgerblue;
        color: white;
        cursor: pointer;
        height: 2.1rem;
      }
    }

    :deep(.el-sub-menu__title) {
      height: 30px;
      padding: 10px 14px;
      font-size: 12px;
    }

    :deep(.el-menu-item) {
      height: 30px;
      padding: 5px 18px;
      font-size: 12px;
    }

    .allSource {
      height: 30px;
      padding: 10px 8px;
      font-size: 12px;
    }
  }

  .right {
    flex: 8.5;
  }
}
</style>
