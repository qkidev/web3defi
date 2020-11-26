import Vue from 'vue'
import App from './App.vue'
import '@/utils/rem'
import router from '@/router/router';
import { Swipe, SwipeItem, Toast,Popup } from 'vant';
import './common/common.scss';
import 'vant/lib/swipe/style';
import 'vant/lib/swipe-item/style';
import 'vant/lib/toast/style';
import 'vant/lib/popup/style';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Toast);
Vue.use(Popup);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
