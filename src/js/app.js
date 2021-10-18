import Vue from 'vue';

import '../css/global';
import 'highlight.js/styles/gruvbox-dark.css';
import VeeValidate, { Validator } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import vueSmoothScroll from 'vue-smoothscroll';

import App from '@Pages';
import AppModal from '@Components/atoms/Modal';
import sanitizeHTML from 'sanitize-html';
import router from './_router';
import store from './_store';

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });
Vue.use(vueSmoothScroll);
Vue.component('app-modal', AppModal);
Vue.prototype.$sanitize = sanitizeHTML;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
