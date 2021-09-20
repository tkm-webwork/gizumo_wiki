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
    targetCategoryName: state => state.targetCategoryName,
    targetCategoryId: state => state.targetCategoryId,
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      })
        .then((response) => {
          const payload = { categories: [] };
          response.data.categories.forEach((val) => {
            payload.categories.push(val);
          });
          commit('doneGetAllCategories', payload);
        })
        .catch((err) => {
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
      } catch (err) {
        commit('failFetchCategory', { message: err.message });
        throw new Error();
      } finally {
        commit('toggleLoading');
      }
    },
    editedCategoryName({ commit }, categoryName) {
      commit('editedCategoryName', categoryName);
    },
    async getCategoryName({ commit, rootGetters }, categoryId) {
      const { data } = await axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      });
      try {
        commit('doneGetCategoryName', data.category.name);
      } catch (err) {
        commit('failFetchCategory', { message: err.message });
      }
    },
    async updateCategory({ commit, rootGetters }) {
      const data = {
        id: rootGetters['categories/targetCategoryId'],
        name: rootGetters['categories/targetCategoryId'],
      };
      const { category } = await axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${rootGetters['categories/targetCategoryId']}`,
        data,
      });
      try {
        const categoryId = category.category.id;
        const categoryName = category.category.name;
        commit('updateCategory', { categoryId, categoryName });
      } catch (err) {
        commit('failFetchCategory', err.message);
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
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneGetCategoryName(state, payload) {
      state.targetCategoryName = payload.name;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました';
    },
    doneEditedCategory(state) {
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
