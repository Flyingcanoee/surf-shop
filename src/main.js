import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as BaseComponents from './base_components';
import '@/assets/styles/index.scss';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import formatCurrency from './utils/formatCurrency';
// import interceptorsSetup from '@/api/interceptors';
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue';

// interceptorsSetup();

Vue.config.productionTip = false;
Vue.filter('currency', formatCurrency);
Vue.component('lottie-animation', LottieAnimation);

new Vue({
  router,
  store,
  BaseComponents,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
