import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: () => import('@/views/home/HomeView.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/transfer',
      component: () => import('@/views/datatransfer/DataTransferView.vue'),
      meta: {
        title: '数据传输'
      },
      children: [
        {
          path: '/transfer/taskList',
          component: () => import('@/views/datatransfer/task/TaskListView.vue'),
          meta: {
            title: '数据传输-任务管理'
          }
        },
        {
          path: '/transfer/taskDetail',
          component: () => import('@/views/datatransfer/task/TaskDetailView.vue'),
          meta: {
            title: '数据传输-新建任务'
          }
        }
      ]
    },
    {
      path: '/source',
      component: () => import('@/views/datasource/DataSourceView.vue'),
      meta: {
        title: '数据源管理'
      }
    },
    {
      path: '/analysis',
      component: () => import('@/views/analysis/AnalysisView.vue'),
      meta: {
        title: '自助分析'
      }
    },
    {
      path: '/',
      redirect: '/home'
    }
  ],
  // 控制滚动条的位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
