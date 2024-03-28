<script setup lang="ts"></script>

<template>
  <div class="bottom">
    <div class="left">
      <img style="width: 16px; height: 16px" src="@/assets/images/bei_an.png" alt="" />
      <span>京ICP备：13018369号</span>
      <span>联系电话：010-56253825</span>
    </div>
    <div class="right">
      <span>联系我们</span>
      <span>合作伙伴</span>
      <span>用户协议</span>
      <span>隐私协议</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  background-color: #1e1e1e;
  font-size: 13px;
  padding: 10px 30px;

  .left {
    display: flex;
    align-items: center;

    span {
      margin: 0 8px;
    }
  }

  .right {
    span {
      margin: 0 8px;
      cursor: pointer;
    }
  }
}
</style>
