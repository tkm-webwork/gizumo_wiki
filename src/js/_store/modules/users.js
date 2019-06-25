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
    openDeleteModal(state, { id }) {
      state.deleteUserId = id;
    },
    doneDeleteUser(state) {
      state.deleteUserId = null;
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

          commit('doneGetUser', { user: response.data.user });
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.response.data.message });
        });
      });
    },
    // ユーザー更新
    editUser({ commit, rootGetters }, user) {
      commit('applyRequest');

      // TODO: ここで更新ができない（422エラー）。下記でリクエスト
      // {
      //   account_name: "takashi"
      //   email: "yoshinari@test.co"
      //   full_name: "yoshinari"
      //   role: "system"
      // }
      // console.log('==== editUser =================');
      // console.log(user);
      // console.log('=====================================');
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
