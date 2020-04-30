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
      return new Promise(() => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: '/category',
        }).then((response) => {
          const payload = { categories: [] };
            response.data.categories.forEach((value) => {

              payload.categories.push(value);
              console.log('get!');
            });

            // $.each
            // +=

            //  {
            //   id: response.data.categories.id,
            //   name: response.data.categories.name,
            //   }
          commit('doneGetAllCategories', payload);
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
        });
      });
    },
    postCateogry({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');
      return new Promise ((resolve) => {
        const data = new URLSearchParams();
        data.append('name', categoryName );
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          console.log('added!');
          commit('donePostCategory');
          commit('toggleLoading');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName } ) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
      console.log('Id => ' + categoryId +　',' + 'Name => ' + categoryName);
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
    getCategoryDetail({ commit, rootGetters }, { id } ) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then((response) => {
        const payload = response.data.category;
        commit('doneGetCategoryDetail', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    editedCategoryName({ commit }, categoryName) {
      commit('editedCategoryName', { categoryName });
      console.log('edited!');
      console.log(categoryName);
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
        const payload = response.data.category;
        commit('doneUpdateCategory', payload);
        console.log('updated!');
        console.log(payload);
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
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
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
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
  },
};
