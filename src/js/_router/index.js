import Vue from 'vue';
import VueRouter from 'vue-router';

import Signin from '@Pages/Signin';
import NotFound from '@Pages/NotFound';
import Home from '@Pages/Home';

// カテゴリー
import Categories from '@Pages/Categories';

// 記事
import Articles from '@Pages/Articles';
import ArticleList from '@Pages/Articles/List';
import ArticleDetail from '@Pages/Articles/Detail';
import ArticleEdit from '@Pages/Articles/Edit';

// ユーザー
import Users from '@Pages/Users';
import UserList from '@Pages/Users/List';
import UserDetail from '@Pages/Users/Detail';
import UserCreate from '@Pages/Users/Create';

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
      name: 'categories',
      path: '/categories',
      component: Categories,
    },
    {
      path: '/articles',
      component: Articles,
      children: [
        {
          name: 'allArticles',
          path: '',
          component: ArticleList,
        },
        {
          name: 'articlePost',
          path: 'post',
          component: ArticleEdit,
        },
        {
          name: 'articleDetail',
          path: ':id',
          component: ArticleDetail,
        },
        {
          name: 'articleEdit',
          path: ':id/edit',
          component: ArticleEdit,
        },
      ],
    },
    {
      name: 'users',
      path: '/users',
      component: Users,
      children: [
        {
          name: 'allUsers',
          path: '',
          component: UserList,
        },
        {
          name: 'userDetail',
          path: ':id',
          component: UserDetail,
        },
        {
          name: 'userCreate',
          path: 'create',
          component: UserCreate,
        },
      ],
    },
    {
      name: 'notfound',
      path: '/*',
      component: NotFound,
    },
  ],
});
