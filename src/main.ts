import '@/style/reset.scss'
import '@/style/base.scss'
import { createApp } from 'vue'
import App from '@/App.vue'
// 引入路由
import router from '@/router/router'
// 引入顶部组件
import TopCompoent from '@/components/top/TopCompoent.vue'
// 引入底部组件
import FooterComponet from '@/components/footer/FooterComponet.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入路由鉴权
import '@/permissions'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})
// 挂载组件爱你
app.component('Top', TopCompoent)
app.component('Footer', FooterComponet)

app.use(router)
app.mount('#app')
