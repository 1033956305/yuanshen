import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import headerDiv from '../components/header'
import loginPage from '../components/loginPage'
import detailPage from '../components/detailPage'
import detailInfo from '../components/detailPageChildren/detail'
import downloadPage from '../components/detailPageChildren/download'
import searchPage from '../components/detailPageChildren/searchPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginPage1',
      component: loginPage
    },
    {
      path: '/header',
      name: 'headerDiv',
      component: headerDiv
    },
    {
      path: '/login',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/detail',
      name: 'detailPage',
      component: detailPage,
      children: [
        {
          path: '/detail',
          name: 'detail',
          component: detailInfo
        },
        {
          path: '/detail/download',
          name: 'download',
          component: downloadPage
        },
        {
          path: '/detail/search',
          name: 'search',
          component: searchPage
        }
      ]
    }
  ]
})
