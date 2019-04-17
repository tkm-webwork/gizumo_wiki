import Vue from 'vue';

import '../scss/global';

import App from '@Pages';
import router from './_router';
import store from './_store';

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(route => route.meta.isPublic);
  // console.log(store.state.auth);
  if (!isPublic && !store.state.auth.isSignedin) {
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
