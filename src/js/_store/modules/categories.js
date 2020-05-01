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
    // 課題1で追加
    postCategory({ commit, rootGetters }, categoryName) {
      // Promiseを使用する理由はサーバからの応答に時間がかかる場合があり、処理を止めないようにするため
      return new Promise((resolve) => {
        commit('toggleLoading');
        // By default, axios serializes JavaScript objects to JSON.
        // To send data in the application / x - www - form - urlencoded format instead, you can use one of the following options.
        const data = new URLSearchParams(); // application/x-www-form-urlencoded形式で送る -> keyとvalueを送る方式
        data.append('name', categoryName); // 指定されたキーと値のペアを新しい検索パラメーターとして追加
        axios(rootGetters['auth/token'])({
          method: 'Post',
          url: '/category',
          data,
        }).then(() => {
          commit('doneAddCategory');
          commit('toggleLoading');
          resolve();
        });
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading');
      });
    },
    // 課題2で追加
    // APIに紐付けたIDからNAMEを取得してupdateCategoryNameに代入する
    getCategoryName({ commit, rootGetters }, categoryId) {
      console.log(rootGetters['auth/token']);
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((response) => {
        // 本来、payload = response.data.category と定義して、mutationsに送信したかったが、
        // 上手くいかなかったので変数を二つ定義して送信
        const payloadId = response.data.category.id;
        const payloadName = response.data.category.name; // id と name が格納されている
        commit('assignCategoryName', { payloadId, payloadName });
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },

    editCategoryName({ commit }, categoryName) {
      commit('editCategoryName', { categoryName });
    },


    // 今回の処理でPromise()を使用している理由は、getCategoryNameにてupdateCategoryIdとupdateCategoryNameを取得した後、
    // updateCategoryでupdateCategoryIdとupdateCategoryNameを書き換える流れだが、
    // Promiseを使わないとgetCategoryNameの処理が終わる前にupdateCategoryの処理を行うためエラーになる
    // 変更したものだけが必要な場合はPromiseがいらない
    // 一箇所削除して、全ての情報が必要な場合にいる
    updateCategory({ commit, rootGetters }) {
      return new Promise((resolve) => {
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', this.state.categories.updateCategoryName);
        data.append('id', this.state.categories.updateCategoryId);
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${this.state.categories.updateCategoryId}`,
          data,
        }).then((response) => {
          console.log(response);
          commit('doneUpdateCategory');
          commit('toggleLoading');
          resolve(); // どこに返すのか -> edit.vueのthen()に返す
        });
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading');
      });
      // 追加
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
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = [...categories].reverse();
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
    doneUpdateCategory(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました';
    },
    assignCategoryName(state, { payloadId, payloadName }) {
      state.updateCategoryName = payloadName;
      state.updateCategoryId = payloadId;
    },
    editCategoryName(state, { categoryName }) {
      state.updateCategoryName = categoryName; // 新しい名前を格納
      console.log(state.updateCategoryName);
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
  },
};
