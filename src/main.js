import Vue from 'vue'
import App from './App.vue'
import '@/utils/rem'
import router from '@/router/router';
import { Swipe, SwipeItem } from 'vant';
import './common/common.scss';
import 'vant/lib/swipe/style';
import 'vant/lib/swipe-item/style';

Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
