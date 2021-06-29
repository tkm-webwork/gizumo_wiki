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
    categoryId: state => state.updateCategoryId,
    categoryName: state => state.updateCategoryName,
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
        const payload = { categories: [] };
        response.data.categories.forEach((val) => {
          payload.categories.push(val);
        });
        commit('doneGetAllCategories', payload);
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
    getCategory({ commit, rootGetters }, categoryId) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/category/${categoryId}`,
        }).then((res) => {
          const updateCategoryId = res.data.category.id;
          const updateCategoryName = res.data.category.name;
          commit('doneGetCategory', { updateCategoryId, updateCategoryName });
          resolve();
        }).catch((err) => {
          commit('failReqest', { message: err.message });
          reject();
        });
      });
    },
    updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/categoryId']);
      data.append('name', rootGetters['categories/categoryName']);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `category/${rootGetters['categories/categoryId']}`,
        data,
      }).then(() => {
        commit('doneUpdateCategory');
        commit('toggleLoading');
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading');
      });
    },
    editCategory({ commit }, value) {
      commit('editCategory', { value });
    },
    postCategory({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('name', categoryName);
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('donePostMessage');
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failFetchCategory', { message: err.message });
          reject();
        });
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
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    donePostMessage(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    doneGetCategory(state, { updateCategoryId, updateCategoryName }) {
      state.updateCategoryId = updateCategoryId;
      state.updateCategoryName = updateCategoryName;
    },
    doneUpdateCategory(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    editCategory(state, { value }) {
      state.updateCategoryName = value;
    },
  },
};
