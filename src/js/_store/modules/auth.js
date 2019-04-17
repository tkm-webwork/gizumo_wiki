export default {
  state: {
    isSignedin: false,
    username: '',
    password: '',
    errorMessage: '',
    user: {
      name: '',
    },
  },
  getters: {},
  mutations: {
    updateValue(state, payload) {
      state[payload.name] = payload.value;
      state.errorMessage = '';
    },
    showError(state) {
      state.errorMessage = 'ユーザーが存在しません。ユーザー名とパスワードをご確認ください。';
    },
    successSignin(state, payload) {
      state.isSignedin = true;
      state.user.name = payload.name;
    },
  },
  actions: {
    updateValue({ commit }, data) {
      commit('updateValue', data);
    },
    submitSignin({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        if (username !== 'yoshi' && password !== 'test') {
          commit('showError');
          reject(new Error('エラーですよ'));
        }
        commit('successSignin', { username });
        resolve();
      });
    },
  },
};
