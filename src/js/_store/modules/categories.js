import axios from '@Helpers/axiosDefault';
import {categories} from "./index";

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
    updateCategoryId: state => state.updateCategoryId,
    updateCategoryName: state => state.updateCategoryName,
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
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
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
    addCategory({ commit, rootGetters }, categoryName) {
      commit('toggleLoading'); // ローディングエフェクト発動
      const data = new URLSearchParams(); // クエリストリング作成
      data.append('name', categoryName); // 追加するカテゴリー名追加
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({ // auth storeからtokenを引っ張ってくる
          method: 'POST',
          url: '/category',
          data,
        }).then((response) => {
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneAddCategory');
          commit('toggleLoading'); // ローディングエフェクト停止
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading'); // ローディングエフェクト停止
        });
      });
    },
    setUpdateCategory({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((response) => {
        const category = response.data.categories.find(item => item.id === parseInt(categoryId, 10));
        commit('setUpdateCategory', { category });
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    editCategoryName({ commit }, categoryName) {
      commit('editCategoryName', categoryName);
    },
    updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', rootGetters['categories/updateCategoryName']);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${rootGetters['categories/updateCategoryId']}`,
        data,
      }).then((response) => {
        if (response.data.code === 0) throw new Error(response.data.message);

        commit('doneUpdateCategory');
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
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    doneAddCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    setUpdateCategory(state, { category }) {
      state.updateCategoryId = category.id;
      state.updateCategoryName = category.name;
    },
    editCategoryName(state, categoryName) {
      state.updateCategoryName = categoryName;
    },
    doneUpdateCategory(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
  },
};
