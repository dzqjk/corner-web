<script setup lang="ts"></script>

<template>
  <div class="container">
    <!-- 头部组件 -->
    <Top class="top" />
    <!-- 内容展示区 -->
    <RouterView />
    <!-- 底部组件 -->
    <Footer class="footer" />
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 90rem;

  .top {
    height: 3%;
  }

  .content {
    height: 95%;
  }

  .footer {
    height: 2%;
  }
}
</style>
