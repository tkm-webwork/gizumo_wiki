import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    categoryList: [],
    deleteCategoryId: null,
    deleteCategoryName: '',
    updateCategoryId: null,
    updateCategoryName: '',
    category: {
      id: '',
      name: '',
    },
  },
  getters: {
    categoryList: state => state.categoryList,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = [...categories];
    },
    doneGetCategory(state, payload) {
      state.updateCategoryName = payload;
      // console.log(state.updateCategoryName);
    },
    editedName(state, { categoryName }) {
      state.updateCategoryName = categoryName;
      // console.log(state.updateCategoryName);
      // console.log(categoryName);
    },
    updateCategory(state, payload) {
      state.categoryId = payload.id;
      state.categoryName = payload.name;
      // console.log(state.categoryId);
      // console.log(state.categoryName);
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
    failFetchCategory(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    doneCreateCategory(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit }) {
      const payload = { categories: [{ id: 9999, name: 'ダミーカテゴリー' }] };
      commit('doneGetAllCategories', payload);
    },
    // ユーザー1件取得(詳細)
    getCategoryDetail({ commit, rootGetters }, id) {
      const categoryId = id.id;
      // console.log(categoryId);
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((res) => {
        // console.log(res);
        const payload = res.data.category.name;
        // console.log(payload);
        commit('doneGetCategory', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    // 更新
    editedName({ commit }, categoryName) {
      commit({
        type: 'editedName',
        categoryName,
      });
    },
    updateCategory({ commit, rootGetters }, id) {
      const categoryId = id.id;
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', categoryId);
      data.append('name', this.state.categories.updateCategoryName);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${categoryId}`,
        data,
      }).then((res) => {
        // console.log(res);
        const payload = res.data.category;
        commit('updateCategory', payload);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリー名を更新しました' });
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading');
      });
    },
    deleteCategory({ commit, rootGetters }, categoryId) {
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${categoryId}`,
        }).then((response) => {
          // NOTE: エラー時はresponse.data.codeが0で返ってくる。
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneDeleteCategory');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
        });
      });
    },
    postCategory({ commit, rootGetters }, CategoryName) {
      commit('toggleLoading');

      const data = new URLSearchParams();
      data.append('name', CategoryName);
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('doneCreateCategory', { message: 'カテゴリーの追加が完了しました' });
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failFetchCategory', { message: err.message });
          reject();
        });
      });
    },
  },
};
