import Cookies from 'js-cookie';
import axios from 'axios';
import Router from '../../_router';

export default {
  state: {
    loading: false,
    signedIn: false,
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
    hasToken(state, { token }) {
      state.signedIn = true;
      state.token = token;
    },
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
      commit('hasToken', {
        token,
      });
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
