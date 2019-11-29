import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';

import '../css/global';
import 'highlight.js/styles/gruvbox-dark.css';
import VeeValidate, { Validator } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import vueSmoothScroll from 'vue-smoothscroll';

import App from '@Pages';
import AppModal from '@Components/atoms/Modal';
import router from './_router';
import store from './_store';

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });
Vue.use(vueSmoothScroll);
Vue.component('app-modal', AppModal);
Vue.use(VueLocalStorage);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

  localStorage: {
    editTitle: {
      type: String,
      default: null,
    },
    editCategotyName: {
      type: String,
      default: null,
    },
    editContent: {
      type: String,
      default: null,
    },
    noTypeKey: '',
  },

});
