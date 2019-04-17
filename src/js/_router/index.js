import Vue from 'vue';
import VueRouter from 'vue-router';

import Signin from '@Pages/Signin';
import NotFound from '@Pages/NotFound';
import Home from '@Pages/Home';
import Users from '@Pages/Users';

Vue.use(VueRouter);
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'signin',
      path: '/signin',
      component: Signin,
      meta: {
        isPublic: true,
      },
    },
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'users',
      path: '/users',
      component: Users,
    },
    {
      name: 'notfound',
      path: '/*',
      component: NotFound,
      meta: {
        isPublic: true,
      },
    },
  ],
});
