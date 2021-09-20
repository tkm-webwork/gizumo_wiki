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
    async getCategoryName({ commit }, categoryId) {
      const category = await axios.get({
        methods: 'GET',
        url: `/category/${categoryId}`,
      });
      commit('doneGetCategoryName', category.name);
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
      state.targetCategoryName = payload;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました';
    },
    editedCategoryName(state, payload) {
      state.targetCategoryName = payload;
    },
  },
};
