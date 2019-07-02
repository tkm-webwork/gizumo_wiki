import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';

import Signin from '@Pages/Signin';
import NotFound from '@Pages/NotFound';
import Home from '@Pages/Home';

// カテゴリー
import Categories from '@Pages/Categories';
import CategoryManagement from '@Pages/Categories/Management';
import CategoryEdit from '@Pages/Categories/Edit';

// 記事
import Articles from '@Pages/Articles';
import ArticleList from '@Pages/Articles/List';
import ArticleDetail from '@Pages/Articles/Detail';
import ArticleEdit from '@Pages/Articles/Edit';
import ArticlePost from '@Pages/Articles/Post';

// ユーザー
import Users from '@Pages/Users';
import UserList from '@Pages/Users/List';
import UserDetail from '@Pages/Users/Detail';
import UserCreate from '@Pages/Users/Create';

// パスワード
import Password from '@Pages/Password';
import PasswordInit from '@Pages/Password/init';
import PasswordReset from '@Pages/Password/reset';

import Store from '../_store';

Vue.use(VueRouter);
const router = new VueRouter({
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
      path: '/users',
      component: Users,
      children: [
        {
          name: 'allUsers',
          path: '',
          component: UserList,
        },
        {
          name: 'userCreate',
          path: 'create',
          component: UserCreate,
        },
        {
          name: 'userDetail',
          path: ':id',
          component: UserDetail,
        },
      ],
    },
    {
      path: '/categories',
      component: Categories,
      children: [
        {
          name: 'categoryManegement',
          path: '',
          component: CategoryManagement,
        },
        {
          name: 'categoryEdit',
          path: ':id',
          component: CategoryEdit,
        },
      ],
    },
    {
      path: '/password',
      component: Password,
      children: [
        {
          name: 'passwordInit',
          path: 'init',
          component: PasswordInit,
        },
        {
          name: 'passwordRest',
          path: 'reset',
          component: PasswordReset,
        },
      ],
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

router.beforeEach((to, from, next) => {
  const token = Cookies.get('user-token') || null;
  const isPublic = to.matched.some(page => page.meta.isPublic);
  const isSignIn = to.matched.some(page => page.path === '/signin');
  if (!isPublic && !Store.state.auth.signedIn) {
    /**
     * 認証が必要なurlは、checkAuthアクションを実行して
     * cookieにセットされているtokenの整合性をチェック、整合性がとれていない場合もしくは
     * checkAuthアクションでエラーが発生した場合は
     * 「/signin」にリダイレクト
     */
    Store.dispatch('checkAuth', { token })
      .then(() => next())
      .catch(() => next({
        path: '/signin',
        query: { redirect: to.fullPath },
      }));
  } else if (isSignIn) {
    /**
     * 「/signin」ページにアクセスしたときにcheckAuthアクションを実行して
     * cookieにセットされているtokenのの整合性が取れていれば
     * 「/」にリダイレクト
     */
    Store.dispatch('checkAuth', { token }).then(() => {
      next('/');
    }).catch(() => {
      next();
    });
  } else {
    next();
  }
});

export default router;
