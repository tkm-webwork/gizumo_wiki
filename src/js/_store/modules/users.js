import axios from '@Helpers/axiosDefault';

export default {
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    user: {
      id: null,
      fullName: '',
      accountName: '',
      email: '',
      role: '',
    },
    deleteUserId: null,
    userList: [],
    roleArray: ['user', 'system', 'admin'],
  },
  getters: {
    userListLength: state => state.userList.length,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
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
      state.user = Object.assign({}, state.user, user);
      state.loading = false;
    },
    doneCreateUser(state) {
      state.loading = false;
      state.doneMessage = '新規ユーザーの追加が完了しました。';
    },
    doneEditUser(state, { user }) {
      state.user = Object.assign({}, state.user, {
        id: user.id,
        fullName: user.full_name,
        accountName: user.account_name,
        email: user.email,
      });
      state.loading = false;
      state.doneMessage = 'ユーザーの更新が完了しました。';
    },
    openDeleteModal(state, { id }) {
      state.deleteUserId = id;
    },
    doneDeleteUser(state) {
      state.deleteUserId = null;
      state.doneMessage = 'ユーザーの削除が完了しました。';
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

    // ユーザー全件取得
    getAllUsers({ commit, rootGetters }) {
      axios(rootGetters.token)({
        method: 'GET',
        url: '/user',
      }).then((response) => {
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);

        const users = response.data.map(data => ({
          id: data.user.id,
          fullName: data.user.full_name,
          accountName: data.user.account_name,
          email: data.user.email,
          role: data.user.role,
        }));
        commit('doneGetAllUsers', { users });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },

    // ユーザー1件取得
    getUser({ commit, rootGetters }, { id }) {
      axios(rootGetters.token)({
        method: 'GET',
        url: `/user/${id}`,
      }).then((response) => {
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);

        const data = response.data.user;
        const user = Object.assign({}, {
          id: data.id,
          fullName: data.full_name,
          accountName: data.account_name,
          email: data.email,
          role: data.role,
        });
        commit('doneGetUser', { user });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },

    // ユーザー作成
    createUser({ commit, rootGetters }, user) {
      commit('applyRequest');

      return new Promise((resolve) => {
        axios(rootGetters.token)({
          method: 'POST',
          url: '/user',
          data: user,
        }).then((response) => {
          // NOTE: エラー時はresponse.data.codeが0で返ってくる。
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneCreateUser');
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.response.data.message });
        });
      });
    },

    // ユーザー更新
    editUser({ commit, rootGetters }, user) {
      commit('applyRequest');

      axios(rootGetters.token)({
        method: 'PUT',
        url: `/user/${user.id}`,
        data: user,
      }).then((response) => {
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);
        // TODO: 返ってくる値が変わるので、そこの調整
        // console.log(response.data.user);

        commit('doneEditUser', { user: response.data.user });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },

    // ユーザー削除のモーダルを開く
    openDeleteModal({ commit }, { id }) {
      commit('openDeleteModal', { id });
    },
    // ユーザー削除
    deleteUser({ commit, rootGetters }, { id }) {
      commit('applyRequest');

      return new Promise((resolve) => {
        axios(rootGetters.token)({
          method: 'DELETE',
          url: `/user/${id}`,
        }).then((response) => {
          // NOTE: エラー時はresponse.data.codeが0で返ってくる。
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneDeleteUser');
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
