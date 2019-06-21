import axios from '@Helpers/axiosDefault';

export default {
  state: {
    loading: false,
    errorMessage: '',
    user: {
      id: null,
      fullName: '',
      accountName: '',
      email: '',
      role: '',
    },
    userList: [],
    roleArray: ['user', 'system', 'admin'],
  },
  getters: {
    userListLength: state => state.userList.length,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
    },
    updateValue(state, { name, value }) {
      state.user = Object.assign({}, state.user, { [name]: value });
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
        name: user.name,
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
    updateValue({ commit }, target) {
      commit('updateValue', target);
    },
    getAllUsers({ commit, rootGetters }) {
      axios(rootGetters.token)({
        method: 'GET',
        url: '/user',
      }).then((response) => {
        if (response.data.code === 0) throw new Error(response.data.message);

        const users = response.data.user.map(user => ({
          id: user.id,
          fullName: user.full_name ? user.full_name : null,
          accountName: user.account_name,
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
            fullName: user.full_name,
            accountName: user.account_name,
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
        // console.log('==== doneCreateUser =================');
        // console.log(response);
        // console.log('=====================================');
        if (response.data.code === 0) throw new Error(response.data.message);

        commit('doneGetUser', { user: response.data.user });
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
    editUser({ commit, rootGetters }, user) {
      commit('applyRequest');

      // console.log(rootGetters.token);
      // console.log(user);
      axios(rootGetters.token)({
        method: 'PUT',
        url: `/user/${user.id}`,
        data: Object.assign(user),
      }).then((response) => {
        // TODO: 422 (Unprocessable Entity)のエラーが出る
        if (response.data.code === 0) throw new Error(response.data.message);

        // console.log(response, 'edit成功');
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
