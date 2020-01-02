import Vue from 'vue'
import App from './App.vue'
// 导入路由文件
import router from './router/index'
// 导入element-ui
import ElementUI from 'element-ui';
// 导入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 导入自己的base.css
import './style/base.css';
// 注册element-ui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
