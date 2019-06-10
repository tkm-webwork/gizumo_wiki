import axios from '@Helpers/axiosDefault';

export default {
  state: {
    categoryList: [],
    loading: false,
  },
  getters: {},
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters.token)({
        method: 'GET',
        url: '/category',
      }).then((responce) => {
        commit('doneGetAllCategories', { categories: responce.data.category });
      }).catch((err) => {
        commit('failfetchCategory', { message: err.message });
      });
    },
    postCateogry({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', categoryName);
      axios(rootGetters.token)({
        method: 'POST',
        url: '/category',
        data,
      }).then(() => {
        commit('toggleLoading');
      }).catch((err) => {
        commit('failfetchCategory', { message: err.message });
        commit('toggleLoading');
      });
    },
  },
  mutations: {
    doneGetAllCategories(state, { categories }) {
      state.categoryList = [...categories];
    },
    failfetchCategory(state) {
      return state;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
  },
};
