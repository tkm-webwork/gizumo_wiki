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
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      })
        .then((response) => {
          const payload = response.data.category;
          commit('doneGetCategoryDetail', payload);
        })
        .catch((err) => {
          commit('failFetchCategory', { message: err.message });
        });
    },
    editedCategoryName({ commit }, categoryName) {
      commit('editedCategoryName', { categoryName });
    },
    updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', this.state.categories.updateCategoryId);
      data.append('name', this.state.categories.updateCategoryName);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${this.state.categories.updateCategoryId}`,
        data,
      })
        .then((response) => {
          const payload = response.data.category;
          commit('doneUpdateCategory', payload);
          commit('toggleLoading');
        })
        .catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
        });
    },
    postCategory({ commit, rootGetters }, categoryName) {
      // true => ボタン非活性
      commit('toggleLoading');
      return new Promise((resolve, reject) => {
        // const data = new URLSearchParams();
        // data.append('name', categoryName);
        // これでもいける
        // const data = { name: categoryName };
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          categoryName,
        })
          .then(() => {
            // false => ボタン活性
            commit('toggleLoading');
            // カテゴリーの追加が完了しました
            commit('donePostCategory');
            resolve();
          })
          .catch((err) => {
            // false => ボタン活性
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
    doneGetCategoryDetail(state, payload) {
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
    },
    editedCategoryName(state, { categoryName }) {
      state.updateCategoryName = categoryName;
    },
    doneUpdateCategory(state, payload) {
      state.updateCategoryId = payload.id;
      state.updateCategoryId = payload.name;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました';
    },
  },
};
