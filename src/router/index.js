import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import singer from 'components/singer/singer'
import rank from 'components/rank/rank'
import search from 'components/search/search'

Vue.use(Router)

export default new Router({
  // 路由重定向到推荐页面
  routes: [{
    path: '/',
    redirect: '/recommend'
  },
    // 推荐页面
  {
    path: '/recommend',
    name: 'recommend',
    component: recommend
  },
    // 歌手页面
  {
    path: '/singer',
    name: 'singer',
    component: singer
  },
    // 排行页面
  {
    path: '/rank',
    name: 'rank',
    component: rank
  },
    // 搜索页面
  {
    path: '/search',
    name: 'search',
    component: search
  }
  ]
})
