<script setup lang="ts">
import { ref, watch } from 'vue'
// 倒计时
let time = ref<number>(60)
// 获取父组件的标记（标记是否需要展示倒计时并开始）
let props = defineProps(['isDown'])
let $emit = defineEmits(['getFlag'])
// 监听标记的值
watch(
  () => props.isDown,
  () => {
    let timer = setInterval(() => {
      time.value--
      if (time.value == 0) {
        // 通知父组件倒计时解释
        $emit('getFlag', false)
        clearInterval(timer)
      }
    }, 1000)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div>
    <span>{{ time }}s后重新发送</span>
  </div>
</template>

<style scoped lang="scss"></style>
