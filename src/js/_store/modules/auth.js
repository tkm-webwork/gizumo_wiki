import Cookies from 'js-cookie';

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
  getters: {},
  mutations: {
    signInRequest(state) {
      state.loading = true;
      state.errorMessage = '';
    },
    signInSuccess(state, { username, token }) {
      state.loading = false;
      state.signedIn = true;
      state.user.name = username;
      state.token = token;
    },
    signInFailure(state, payload) {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
    signOut(state) {
      state.loading = false;
      state.signedIn = false;
      state.user.name = '';
    },
  },
  actions: {
    checkAuth({ commit }, { token }) {
      commit('signInRequest');
      // TODO: ここで非同期処理 Fetch User
      return commit('signInSuccess', {
        username: 'user',
        token,
      });
    },
    signIn({ commit }, { username, password }) {
      commit('signInRequest');
      return new Promise((resolve, reject) => {
        if (!username && !password) {
          commit('signInFailure', {
            errorMessage: 'ユーザー名・パスワードを入力してください。',
          });
          return reject(new Error('エラーですよ'));
        }
        // TODO: ここで非同期処理 Fetch User
        return setTimeout(() => {
          if (username === 'user' && password === 'test') {
            const token = 'tokenString';
            Cookies.set('user-token', token, { expires: 10 });
            commit('signInSuccess', { username, token });
            return resolve();
          }
          Cookies.remove('user-token');
          commit('signinFailure', {
            errorMessage: 'ユーザーが存在しません。ユーザー名とパスワードをご確認ください。',
          });
          return reject(new Error('エラーですよ'));
        }, 2000);
      });
    },
    signOut({ commit }) {
      commit('signOut');
    },
  },
};
