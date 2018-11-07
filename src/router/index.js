import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import singer from 'components/singer/singer'
import rank from 'components/rank/rank'
import search from 'components/search/search'
import singerDetail from 'components/singer-detail/singer-detail'
import disc from 'components/disc/disc'
import topList from 'components/top-list/top-list'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/singer'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: recommend,
    children: [{
      path: ':id',
      name: 'disc',
      component: disc
    }]
  },
  {
    path: '/singer',
    name: 'singer',
    component: singer,
    children: [{
      path: ':id',
      name: 'singer-detail',
      component: singerDetail
    }]
  },
  {
    path: '/rank',
    name: 'rank',
    component: rank,
    children: [{
      path: ':id',
      component: topList
    }]
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }
  ]
})
