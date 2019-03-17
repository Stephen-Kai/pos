import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Shop from '@/components/page/Shop'
import Goods from '@/components/page/Goods'
import Vip from '@/components/page/Vip'
import Setup from '@/components/page/Setup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos,
      alias:'/pos'
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/Vip',
      name: 'Vip',
      component: Vip
    },
    {
      path: '/setup',
      name: 'setup',
      component: Setup
    }
  ]
})
