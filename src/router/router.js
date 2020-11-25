import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/home';
import DappHome from '@/pages/dappHome/dappHome';
import Exchange from '@/pages/exchange/exchange';
import Token from '@/pages/token/token';
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/dappHome',
    name: 'dappHome',
    component: DappHome
  },
  {
    path: '/exchange',
    name: 'exchange',
    component: Exchange
  },
  {
    path: '/token',
    name: 'token',
    component: Token
  },
  ]
})