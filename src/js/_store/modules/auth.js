import Cookies from 'js-cookie';
import axios from '@Helpers/axiosDefault';
import getAccess from '@Helpers/getAccessControlList';

export default {
  namespaced: true,
  state: {
    loading: false,
    signedIn: false,
    token: '',
    errorMessage: '',
    user: {
      email: '',
      id: null,
      account_name: '',
      password_reset_flg: null,
      role: '',
    },
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
    access: state => getAccess(state.user.role.value),
  },
  mutations: {
    hasToken(state, { token }) {
      state.signedIn = true;
      state.token = token;
    },
    noToken(state) {
      state.signedIn = false;
      state.token = '';
    },
    sendRequest(state) {
      state.loading = true;
      state.errorMessage = '';
    },
    signInSuccess(state, { token, user }) {
      Cookies.set('user-token', token, { expires: 10 });
      state.token = token;
      state.user = Object.assign({}, { ...state.user }, { ...user });
      state.loading = false;
      state.signedIn = true;
    },
    signInFailure(state, payload) {
      Cookies.remove('user-token');
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
    signOut(state) {
      Cookies.remove('user-token');
      state.token = '';
      state.loading = false;
      state.signedIn = false;
      state.user = Object.assign({}, {
        email: '',
        id: null,
        account_name: '',
        password_reset_flg: null,
        role: '',
      });
    },
    doneChangePassword(state, { user }) {
      state.user = Object.assign({}, { ...state.user }, { ...user });
      state.loading = false;
    },
    failRequest(state, { message }) {
      state.loading = false;
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.errorMessage = '';
    },
  },
  actions: {
    checkAuth({ commit }, { token }) {
      return new Promise((resolve, reject) => {
        if (!token) {
          commit('signInFailure');
          reject(new Error('認証に失敗しました'));
        } else {
          axios(token)({
            method: 'GET',
            url: '/me',
          }).then((response) => {
            if (response.data.code === 0) {
              commit('signInFailure');
              return reject();
            }

            const payload = { token, user: response.data.user };
            commit('signInSuccess', payload);
            return resolve();
          }).catch(() => {
            commit('signInFailure', { errorMessage: 'エラーが発生しました。' });
            reject(new Error('エラーが発生しました'));
          });
        }
      });
    },
    signIn({ commit }, { email, password }) {
      commit('sendRequest');
      return new Promise((resolve, reject) => {
        const data = new URLSearchParams();
        data.append('email', email);
        data.append('password', password);
        axios()({
          url: '/me',
          method: 'POST',
          data,
        }).then((response) => {
          if (!response.data.token) reject(new Error());

          return axios(response.data.token)({
            method: 'GET',
            url: '/me',
          }).then((ownData) => {
            if (ownData.data.code === 0) return reject(new Error());

            return { token: response.data.token, user: ownData.data.user };
          }).catch(() => reject(new Error()));
        }).then((payload) => {
          commit('signInSuccess', payload);
          resolve();
        }).catch(() => {
          commit('signInFailure', {
            errorMessage: 'ログインに失敗しました。メールアドレスとパスワードを確認して再度ログインし直してみてください。',
          });
          reject(new Error());
        });
      });
    },
    signOut({ commit }) {
      commit('signOut');
    },

    // パスワードの設定（初回ログイン時）
    changePassword({ commit, rootGetters }, data) {
      commit('sendRequest');

      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          url: '/user/password/update',
          method: 'POST',
          data,
        }).then((response) => {
          if (response.data.code === 0) throw new Error(response.data.message);

          const user = {
            password_reset_flg: response.data.user.password_reset_flg,
          };
          commit('doneChangePassword', { user });
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
