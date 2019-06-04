import axios from '@Helpers/axiosDefault';

export default {
  state: {
    loading: false,
    errorMessage: '',
    user: {
      id: null,
      accountname: '',
      username: '',
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
    doneGetAllUsers(state, { users }) {
      state.userList = users.map(user => ({
        id: user.id,
        accountname: user.name,
        username: !user.user_detail[0].last_name || !user.user_detail[0].first_name
          ? null
          : `${user.user_detail[0].last_name} ${user.user_detail[0].first_name}`,
        email: user.email,
        role: user.role,
      }));
    },
    doneGetUser(state, { user }) {
      state.user = Object.assign({}, {
        id: user.id,
        accountname: user.name,
        username: !user.user_detail[0].last_name || !user.user_detail[0].first_name
          ? null
          : `${user.user_detail[0].last_name} ${user.user_detail[0].first_name}`,
        email: user.email,
        role: user.role,
      });
    },
    // doneCreateUser(state, ) {
    //
    // },
    failRequest(state, { message }) {
      state.errorMessage = message;
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
        commit('doneGetAllUsers', { users: response.data.user });
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
    getUser({ commit, rootGetters }, { id }) {
      axios(rootGetters.token)({
        method: 'GET',
        url: `/user/${id}`,
      }).then((response) => {
        commit('doneGetUser', { user: response.data.user });
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
    createUser({ commit, rootGetters }, user) {
      axios(rootGetters.token)({
        method: 'POST',
        url: '/user',
        data: user,
      }).then((response) => {
        console.log(response);
        // commit('doneGetUser', { user: response.data.user });
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
  },
};
