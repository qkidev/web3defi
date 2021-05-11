import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/home';
import DappHome from '@/pages/dappHome/dappHome';
import Exchange from '@/pages/exchange/exchange';
import Token from '@/pages/token/token';
import Desc from '@/pages/desc/desc';
import SuperNode from '@/pages/superNode/superNode';
import SuperNode2 from '@/pages/superNode2/superNode';
import SuperNode2Rule from '@/pages/superNode2/superNode2Rule';
import Signature from '@/pages/signature';
import PizzaAirdrop from '@/pages/pizzaAirdrop/pizzaAirdrop';

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
  {
    path: '/desc',
    name: 'desc',
    component: Desc
  },
  {
    path: '/superNode',
    name: 'superNode',
    component: SuperNode
  },
  {
    path: '/superNode2',
    name: 'superNode2',
    component: SuperNode2
  },
  {
    path: '/superNode2Rule',
    name: 'superNode2Rule',
    component: SuperNode2Rule
  },
  {
    path: '/signature',
    name: 'signature',
    component: Signature
  },
  {
    path: '/pizzaAirdrop',
    name: 'pizzaAirdrop',
    component: PizzaAirdrop
  },
  
  
  ]
})