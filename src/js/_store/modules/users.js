import axios from '@Helpers/axiosDefault';

export default {
  state: {
    loading: false,
    errorMessage: '',
    user: {
      id: null,
      name: '',
      accountname: '',
      email: '',
      role: '',
    },
    userList: [],
  },
  getters: {},
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
    },
    applyRequest(state) {
      state.loading = true;
    },
    doneGetAllUsers(state, { users }) {
      state.userList = users;
      state.loading = false;
    },
    doneGetUser(state, { user }) {
      state.user = Object.assign({}, user);
      state.loading = false;
    },
    doneCreateUser(state, { user }) {
      state.user = Object.assign({}, state.user, {
        id: user.id,
        accountname: user.name,
        email: user.email,
      });
      state.loading = false;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllUsers({ commit, rootGetters }) {
      axios(rootGetters.token)({
        method: 'GET',
        url: '/user',
      }).then((response) => {
        if (response.data.code === 0) throw new Error(response.data.message);

        const users = response.data.user.map(user => ({
          id: user.id,
          name: user.full_name ? user.full_name : null,
          accountname: user.account_name,
          email: user.email,
          role: user.role,
        }));
        commit('doneGetAllUsers', { users });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    getUser({ commit, rootGetters }, { id }) {
      axios(rootGetters.token)({
        method: 'GET',
        url: `/user/${id}`,
      }).then((response) => {
        if (response.data.code === 0) throw new Error(response.data.message);

        const { user } = response.data;
        commit('doneGetUser', {
          user: Object.assign({}, {
            id: user.id,
            name: user.full_name,
            accountname: user.account_name,
            email: user.email,
            role: user.role,
          }),
        });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    createUser({ commit, rootGetters }, user) {
      commit('applyRequest');
      axios(rootGetters.token)({
        method: 'POST',
        url: '/user',
        data: user,
      }).then((response) => {
        // TODO: 422 (Unprocessable Entity)のエラーが出る
        console.log('==== doneCreateUser =================');
        console.log(response);
        console.log('=====================================');
        if (response.data.code === 0) throw new Error(response.data.message);

        commit('doneGetUser', { user: response.data.user });
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
  },
};
