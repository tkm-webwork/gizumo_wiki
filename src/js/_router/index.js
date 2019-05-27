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
import ArticlePost from '@Pages/Articles/Post';

// ユーザー
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
      name: 'categories',
      path: '/categories',
      component: Categories,
    },
    {
      path: '/articles',
      component: Articles,
      children: [
        {
          name: 'articleList',
          path: '',
          component: ArticleList,
        },
        {
          name: 'articlePost',
          path: 'post',
          component: ArticlePost,
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
    },
    {
      name: 'notfound',
      path: '/*',
      component: NotFound,
    },
  ],
});
