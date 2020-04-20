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
        const payload = { categories: [] };
        response.data.categories.forEach((val) => {
          payload.categories.push(val);
        });
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    postCateogry({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', categoryName);
      return new Promise((resolve, reject) => {
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
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((response) => {
        const categoryDetail = response.data.category;
        commit('doneGetCategoryDetail', categoryDetail);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
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
      }).then((response) => {
        commit('toggleLoading');
        const categoryDetail = response.data.category;
        commit('doneGetCategoryDetail', categoryDetail);
        commit('doneUpdateCategory');
      }).catch((err) => {
        commit('toggleLoading');
        commit('failFetchCategory', { message: err.message });
      });
    },
    editedCategoryName({ commit }, categoryName) {
      commit('editedCategoryName', { categoryName });
    },
    confirmDeleteCategory({ commit }, { categoryName, categoryId }) {
      commit('confirmDeleteCategory', { categoryName, categoryId });
    },
    deleteCategory({ commit, rootGetters }, { id }) {
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${id}`,
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
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    confirmDeleteCategory(state, { categoryName, categoryId }) {
      state.deleteCategoryName = categoryName;
      state.deleteCategoryId = categoryId;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    doneUpdateCategory(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    doneGetCategoryDetail(state, categoryDetail) {
      state.updateCategoryId = categoryDetail.id;
      state.updateCategoryName = categoryDetail.name;
    },
    editedCategoryName(state, { categoryName }) {
      state.updateCategoryName = categoryName;
    },
  },
};
