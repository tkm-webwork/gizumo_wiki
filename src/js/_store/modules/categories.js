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
  },
  getters: {
    categoryList: state => state.categoryList,
    loading: state => state.loading,
    errorMessage: state => state.errorMessage,
    doneMessage: state => state.doneMessage,
    updateCategoryName: state => state.updateCategoryName,
    updateCategoryId: state => state.updateCategoryId,
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit }) {
      const payload = { categories: [{ id: 9999, name: 'ダミーカテゴリー' }] };
      commit('doneGetAllCategories', payload);
    },
    postCategory({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');
      return new Promise((resolve) => {
        const data = new URLSearchParams();
        data.append('name', categoryName);
        axios(rootGetters['auth/token'])({
          url: '/category',
          method: 'POST',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('donePostCategory');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
        });
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
    getCategory({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(({ data }) => {
        const { id, name } = data.category;
        commit('doneGetCategoryDetail', { id, name });
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    updateValue({ commit }, categoryName) {
      commit('updateValue', { categoryName });
    },
    updateCategory({ commit, rootGetters, getters }) {
      commit('toggleLoading');
      const categoryData = new URLSearchParams();
      categoryData.append('name', getters.updateCategoryName);
      categoryData.append('id', getters.updateCategoryId);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${getters.updateCategoryId}`,
        data: categoryData,
      }).then(({ data }) => {
        const { id, name } = data.category;
        commit('toggleLoading');
        commit('doneUpdate', { id, name });
      }).catch((err) => {
        commit('toggleLoading');
        commit('failFetchCategory', { message: err.message });
      });
    },
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetCategoryDetail(state, { id, name }) {
      state.updateCategoryName = name;
      state.updateCategoryId = id;
    },
    doneUpdate(state, { id, name }) {
      state.updateCategoryId = id;
      state.updateCategoryName = name;
      state.doneMessage = '更新が成功しました。';
    },
    updateValue(state, { categoryName }) {
      state.updateCategoryName = categoryName;
    },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = [...categories];
    },
    failFetchCategory(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
  },
};
