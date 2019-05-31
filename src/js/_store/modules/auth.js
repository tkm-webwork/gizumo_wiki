/* global API_BASE_URL:true */
/* 上記はwebpack.congig.jsで定義しているグローバル変数、変数名:trueをコメントアウトで記載しないとeslintでエラーがでるので記載 */
import Cookies from 'js-cookie';
import axios from 'axios';
import Router from '../../_router';

export default {
  state: {
    loading: false,
    signedIn: false,
    initSignIn: false,
    token: '',
    errorMessage: '',
    user: {
      name: '',
    },
  },
  getters: {
    token: state => state.token,
  },
  mutations: {
    signInRequest(state) {
      state.loading = true;
      state.errorMessage = '';
    },
    signInSuccess(state, { token }) {
      Cookies.set('user-token', token, { expires: 10 });
      state.loading = false;
      state.signedIn = true;
      state.token = token;
    },
    signInFailure(state, payload) {
      Cookies.remove('user-token');
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
    signOut(state) {
      Cookies.remove('user-token');
      state.loading = false;
      state.signedIn = false;
    },
  },
  actions: {
    checkAuth({ commit }, { token }) {
      commit('signInRequest');
      commit('signInSuccess', {
        token,
      });
      Router.push('/');
    },
    signIn({ commit }, { email, password }) {
      commit('signInRequest');
      const data = new URLSearchParams();
      data.append('email', email);
      data.append('password', password);
      axios({
        url: `${API_BASE_URL}/me`,
        method: 'POST',
        data,
      }).then((responce, reject) => {
        if (!responce.data.token) reject(new Error());
        commit('signInSuccess', responce.data);
        Router.push('/');
      }).catch(() => {
        commit('signInFailure', {
          errorMessage: 'ログインに失敗しました。メールアドレスとパスワードを確認して再度ログインし直してみてください。',
        });
      });
    },
    signOut({ commit }) {
      commit('signOut');
    },
  },
};
