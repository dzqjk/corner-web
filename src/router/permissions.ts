import router from '@/router/router'

// 引入进度条插件
// @ts-ignore
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 去除加载loading动画
NProgress.configure({ showSpinner: false })
// 配置全局守卫
// 前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 动态设置网页标题
  document.title = `${to.meta.title}`
  next()
})

// 后置守卫
router.afterEach((to, from, next) => {
  NProgress.done()
  return true
})
