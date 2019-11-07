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
        const payload = response.data;
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    postCateogry({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');

      const data = new URLSearchParams();
      data.append('name', categoryName);
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
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
    confirmDeleteCategory({ commit }, category) {
      commit('confirmDeleteCategory', category);
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
    addCategory({ commit, rootGetters }, category) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', category);
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then((response) => {
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneAddCategory');
          commit('toggleLoading');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
    getCategory({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((response) => {
        const payload = response.data.category;
        commit('getCategory', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    editedCategory({ commit }, categoryName) {
      commit('editedCategory', categoryName);
    },
    updateCategory({ commit, rootGetters }, { categoryId, categoryName }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', categoryName);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${categoryId}`,
        data,
      }).then((response) => {
        if (response.data.code === 0) throw new Error(response.data.message);

        commit('updateCategory');
        commit('toggleLoading');
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading');
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
    confirmDeleteCategory(state, category) {
      state.deleteCategoryName = category.categoryName;
      state.deleteCategoryId = category.categoryId;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    doneAddCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    getCategory(state, payload) {
      state.updateCategoryName = payload.name;
    },
    editedCategory(state, categoryName) {
      state.updateCategoryName = categoryName;
    },
    updateCategory(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました。';
      state.updateCategoryName = '';
    },
  },
};
