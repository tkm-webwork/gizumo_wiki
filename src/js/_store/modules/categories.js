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
    getAllCategories({ commit }) {
      const payload = { categories: [{ id: 9999, name: 'ダミーカテゴリー' }] };
      commit('doneGetAllCategories', payload);
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
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/category/${categoryId}`,
        }).then((res) => {
          const payload = res.data.category;
          commit('doneupdatecategory', payload);
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          reject();
        });
      });
    },
    updateCategory({ commit, rootGetters }) {
      const data = new URLSearchParams();
      data.append('id', this.state.categories.updateCategoryId);
      data.append('name', this.state.categories.updateCategoryName);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${this.state.categories.updateCategoryId}`,
        data,
      }).then((res) => {
        const payload = res.data.category;
        commit('doneupdatecategory', payload);
        commit('doneUpdateCategoryMessage');
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    updatecategoryname({ commit }, categoryName) {
      commit('updatecategoryname', { categoryName });
    },
  },
  mutations: {
    doneupdatecategory(state, payload) {
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
    },
    doneUpdateCategoryMessage(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    updatecategoryname(state, { categoryName }) {
      state.updateCategoryName = categoryName;
    },
    doneAddCategorymessage(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました';
    },
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
  },
};
