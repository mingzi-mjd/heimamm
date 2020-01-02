// 导入vue
import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'
// 导入组件
import login from '../views/login/login'
import index from '../views/index/index'

//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
//这里就是路由的配制项
routes: [
  {path: '/login',component: login},
  {path: '/index',component: index},
]
})

// 暴露路由
export default router