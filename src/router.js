import Vue from 'vue'
import Router from 'vue-router'
import resultsHome from './views/resultsHome/resultsHome.vue'
import resultsDay from './views/resultsDay/resultsDay.vue'
import successPage from './views/successPage/successPage.vue'
import presetSubmit from './views/presetSubmit/presetSubmit.vue'
import resultsView from './views/resultsView/resultsView.vue'
import placeholder from './views/placeholder/placeholder.vue'
import testWatch  from './views/test/testWatch.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [

    // 业绩填报
    {
      path: '/',
      meta:{
        title:'业绩填报'
      },
      name: 'resultsHome',
      component: resultsHome
    },
    // 每日业绩
    {
      path: '/resultsDay',
      name: 'resultsDay',
      component: resultsDay
    },
    // 目标预设
    {
      path: '/presetSubmit',
      name: 'presetSubmit',
      component: presetSubmit
    },
        // 业绩查看
        {
          path: '/resultsView',
          name: 'resultsView',
          component: resultsView
        },
    // 成功页面
    {
      path: '/successPage',
      name: 'successPage',
      component: successPage
    },
        // 占位图
        {
          path: '/placeholder',
          name: 'placeholder',
          component: placeholder
        },
      //测试==》提交时请关闭！提交时请关闭！提交时请关闭！
    {
      path: '/testWatch',
      name: 'testWatch',
      component: testWatch
    }
  ]
})
