import Vue from 'vue';
import Cookies from 'js-cookie';

import '../css/global';
import 'highlight.js/styles/gruvbox-dark.css';
import VeeValidate, { Validator } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import vueSmoothScroll from 'vue-smoothscroll';

import App from '@Pages';
import router from './_router';
import store from './_store';

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });
Vue.use(vueSmoothScroll);

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(route => route.meta.isPublic);
  const isSignedIn = Cookies.get('user-token');
  if (!isPublic && !isSignedIn) {
    return next({ path: '/signin', query: { redirect: to.fullPath } });
  }
  return next();
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
