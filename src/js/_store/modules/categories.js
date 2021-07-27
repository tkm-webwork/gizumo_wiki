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
    editedCategory({ commit }, categoryName) {
      commit('editedCategoryName', categoryName);
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
    getCategory({ commit, rootGetters }, updateCategoryId) {
      const categories = rootGetters['categories/categoryList'];
      const category = categories.find(item => item.id === updateCategoryId);
      const { id: categoryId, name: categoryName } = category;
      commit('doneGetCategory', { categoryId, categoryName });
    },
    updateCategory({ commit, state, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', state.updateCategoryId);
      data.append('name', state.updateCategoryName);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.updateCategoryId}`,
        data,
      }).then((res) => {
        commit('toggleLoading');
        const { id: categoryId, name: categoryName } = res.data.category;
        commit('doneUpdateCategory', { categoryId, categoryName });
      }).catch((err) => {
        commit('toggleLoading');
        commit('failFetchCategory', { message: err.message });
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
          commit('toggleLoading');
          commit('donePostCategory');
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failFetchCategory', { message: err.message });
          reject();
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
    editedCategoryName(state, categoryName) {
      state.updateCategoryName = categoryName;
    },
    doneGetCategory(state, { categoryId, categoryName }) {
      state.updateCategoryId = categoryId;
      state.updateCategoryName = categoryName;
    },
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    doneUpdateCategory(state, { categoryId, categoryName }) {
      state.updateCategoryId = categoryId;
      state.updateCategoryName = categoryName;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
  },
};
