// 导入vue
import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'
// 导入组件
import login from '../views/login/login'
import index from '../views/index/index'
import subject from '../views/index/subject' // 学科
import enterprise from '../views/index/enterprise' // 企业
import question from '../views/index/question' // 题库
import user from '../views/index/user' // 用户
import chart from '../views/index/chart' // 数据

//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [{
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      redirect: '/index/subject', // 首页重定向
      children: [{
          path: 'subject',
          component: subject
        },
        {
          path: 'enterprise',
          component: enterprise
        },
        {
          path: 'question',
          component: question
        },
        {
          path: 'user',
          component: user
        },
        {
          path: 'chart',
          component: chart
        },
      ]
    },
  ]
})

// 暴露路由
export default router