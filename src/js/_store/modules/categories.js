import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    categoryList: [],
    targetCategoryId: null,
    targetCategoryName: '',
    deleteCategoryId: null,
    deleteCategoryName: '',
    updateCategoryId: null,
    updateCategoryName: '',
  },
  getters: {
    categoryList: state => state.categoryList,
    targetCategoryId: state => state.targetCategoryId,
    targetCategoryName: state => state.targetCategoryName,
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    async getAllCategories({ commit, rootGetters }) {
      const payload = { categories: [] };
      const { data } = await axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      });
      payload.categories = data.categories.reduce((acc, cur) => {
        acc.push(cur);
        return acc;
      }, []);
      commit('doneGetAllCategories', payload);
    },
    confirmDeleteCategory({ commit }, categoryId, categoryName) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }, categoryId) {
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${categoryId}`,
        })
          .then((response) => {
            // NOTE: エラー時はresponse.data.codeが0で返ってくる。
            if (response.data.code === 0) {
              throw new Error(response.data.message);
            }
            commit('doneDeleteCategory');
            resolve();
          })
          .catch((err) => {
            commit('failFetchCategory', { message: err.message });
          });
      });
    },
    async postCategory({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');
      const data = { name: categoryName };
      try {
        await axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        });
        commit('donePostCategory');
        commit('toggleLoading');
      } catch (err) {
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading');
        throw new Error();
      }
    },
    editedCategoryName({ commit }, categoryName) {
      commit('editedCategoryName', categoryName);
    },
    async getCategoryName({ commit, rootGetters }, categoryId) {
      try {
        const { data } = await axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/category/${categoryId}`,
        });
        commit('doneGetCategoryId', categoryId);
        commit('doneGetCategoryName', data.category.name);
      } catch (err) {
        commit('failFetchCategory', { message: err.message });
      }
    },
    async updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const params = {
        id: rootGetters['categories/targetCategoryId'],
        name: rootGetters['categories/targetCategoryName'],
      };
      try {
        const { data } = await axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${rootGetters['categories/targetCategoryId']}`,
          params,
        });
        const categoryId = data.category.id;
        const categoryName = data.category.name;
        commit('updateCategory', { categoryId, categoryName });
        commit('doneUpdateCategory');
        commit('toggleLoading');
      } catch (err) {
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading');
      }
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
    doneGetCategoryId(state, payload) {
      state.targetCategoryId = payload;
    },
    doneGetCategoryName(state, payload) {
      state.targetCategoryName = payload;
    },
    confirmDeleteCategory(state, payload) {
      state.deleteCategoryId = payload.categoryId;
      state.deleteCategoryName = payload.categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました';
    },
    doneUpdateCategory(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました';
    },
    editedCategoryName(state, payload) {
      state.targetCategoryName = payload;
    },
    updateCategory(state, payload) {
      state.targetCategoryId = payload.categoryId;
      state.targetCategoryName = payload.categoryName;
    },
  },
};
