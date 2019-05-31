import axios from '@Helpers/axiosDefault';

export default {
  state: {
    errorMessage: '',
    user: {
      id: null,
      accountname: '',
      username: '',
      email: '',
      role: '',
    },
    usersList: [],
  },
  getters: {},
  mutations: {
    doneGetAllUsers(state, { users }) {
      state.usersList = users.map(user => ({
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
      console.log(JSON.parse(JSON.stringify(user)));
      state.user = user;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    getAllUsers({ commit, rootGetters }) {
      axios(rootGetters.token)({
        method: 'GET',
        url: '/user',
      }).then((response) => {
        commit('doneGetAllUsers', { users: response.data.data });
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
    getUser({ commit, rootGetters }, { id }) {
      axios(rootGetters.token)({
        method: 'GET',
        url: `/user/${id}`,
      }).then((response) => {
        commit('doneGetUser', { user: response.data.data });
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
  },
};
