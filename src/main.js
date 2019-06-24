import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {post,get,patch,put} from './utils/http'

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put

import 'vant/lib/index.css';
import { Button,Icon,Field,Notify ,Loading   } from 'vant'
Vue.use(Button)
Vue.use(Icon)
Vue.use(Field)
Vue.use(Notify)
Vue.use(Loading)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   console.log(to.meta.title)
//   if (to.meta.title) {
//       document.title = to.meta.title
//   }
//   next()
// })