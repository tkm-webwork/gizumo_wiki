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
    updateCategoryId: state => state.updateCategoryId,
    updateCategoryName: state => state.updateCategoryName,
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((response) => {
        commit('doneGetAllCategories', { categories: response.data.categories });
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
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
    postCategory({ commit, rootGetters }, categoryName) {
      return new Promise((resolve, reject) => {
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', categoryName);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('donePostCategory');
          commit('toggleLoading');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
          reject();
        });
      });
    },
    updateCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('id', rootGetters['categories/updateCategoryId']);
        data.append('name', rootGetters['categories/updateCategoryName']);
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${rootGetters['categories/updateCategoryId']}`,
          data,
        }).then(() => {
          commit('doneUpdateCategory');
          commit('toggleLoading');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
          reject();
        });
      });
    },
    updateCategoryId({ commit }, categoryId) {
      commit('updateCategoryId', categoryId);
    },
    updateCategoryName({ commit }, categoryName) {
      commit('updateCategoryName', categoryName);
    },
    getCategoryName({ commit, rootGetters }, categoryId) {
      commit('updateCategoryId', categoryId);
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((response) => {
        const categoryName = response.data.category.name;
        commit('setCategoryName', categoryName);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
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
    doneUpdateCategory(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    updateCategoryId(state, categoryId) {
      state.updateCategoryId = categoryId;
    },
    updateCategoryName(state, categoryName) {
      state.updateCategoryName = categoryName;
    },
    setCategoryName(state, categoryName) {
      state.updateCategoryName = categoryName;
    },
  },
};
