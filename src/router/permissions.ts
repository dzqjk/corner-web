import router from '@/router/router'

// 引入进度条插件
// @ts-ignore
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入用户仓库
import pinia from '@/stores'
import useUserStore from '@/stores/modules/user'
// 去除加载loading动画
NProgress.configure({ showSpinner: false })
// 用户仓库
let userStore = useUserStore(pinia)
// 存储用户未登录可以访问的路由路径
let whiteList = ['/home']
// 去除加载loading动画
NProgress.configure({ showSpinner: false })
// 配置全局守卫
// 前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 动态设置网页标题
  document.title = `${to.meta.title}`
  // 判断用户是否登录
  const uuid = userStore.userInfo.uuid
  if (uuid) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      userStore.visible = true
      next({ path: '/home', query: { redirect: to.fullPath } })
    }
  }
})

// 后置守卫
router.afterEach((to, from, next) => {
  NProgress.done()
  return true
})
