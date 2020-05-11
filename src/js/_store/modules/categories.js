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
        const payload = {
          categories: response.data.categories,
        };
        console.log(response);
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
        console.log(err);
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
          console.log(categoryId);
          commit('failFetchCategory', { message: err.message });
        });
      });
    },
    postCategory({ commit, rootGetters }, newCategory) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', newCategory);
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
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `category/${categoryId}`,
      }).then((res) => {
        const CategoryObject = res.data.category;
        commit('doneGetCategoryDetail', CategoryObject);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    updateValue({ commit }, categoryName) {
      commit('updateValue', { categoryName });
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
        const updateCategoryObject = response.data.category;
        commit('doneUpdateCategory', updateCategoryObject);
        commit('toggleLoading');
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading');
      });
    },
    openCategory({ commit }, { categoryName, categoryId }) {
      commit('openCategory', { categoryName, categoryId });
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
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    doneGetCategoryDetail(state, categoryObject) {
      state.updateCategoryId = categoryObject.id;
      state.updateCategoryName = categoryObject.name;
    },
    updateValue(state, { categoryName }) {
      state.updateCategoryName = categoryName;
    },
    doneUpdateCategory(state, updateCategoryObject) {
      state.updateCategoryId = updateCategoryObject.id;
      state.updateCategoryName = updateCategoryObject.name;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    openCategory(state, { categoryName, categoryId }) {
      state.deleteCategoryName = categoryName;
      state.deleteCategoryId = categoryId;
      console.log(state.deleteCategoryName);
      console.log(state.deleteCategoryId);
    },
  },
};
