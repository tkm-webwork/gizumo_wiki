import axios from '@Helpers/axiosDefault';
/*
  どのリクエストもヘッダーにトークンを組み込みたい！共通部分のURLは省略したい！
  → axios.create()で「設定が組み込まれた別のインスタンス」として定義すればいい。
    それを呼び出せば毎回の記入を省略してaxiosのリクエストが飛ばせる！！
*/
export default { // stateはmutationの処理でしか変更できません。
  namespaced: true,
  state: {
    loading: false, // manegement.vue → :disabled="loading ? true : false"
    errorMessage: '',
    doneMessage: '',
    categoryList: [],
    deleteCategoryId: null,
    deleteCategoryName: '',
    updateCategoryId: null,
    updateCategoryName: '',
  },
  getters: { // "ゲッター" はストアの算出プロパティ。ゲッターの結果はその依存関係に基づいて計算され、依存関係の一部が変更されたとき
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
          // 通信成功かつエラーが出た→Errorインスタンスにmessageを引数として入れる。
          commit('doneDeleteCategory');
          resolve();
        }).catch((err) => { // 通信そのものが失敗した場合の処理
          commit('failFetchCategory', { message: err.message });
        });
      });
    },
    pushCategory({ commit, rootGetters }, { category }) { // 作成
      // console.log(category); // このaxiosはaxiosDefaultで定義されたインスタンス。
      return new Promise((resolve) => { // application/x-www-form-urlencoded形式で送る。
        commit('toggleLoading'); // 処理後に反転させる。
        const data = new URLSearchParams(); // URLSearchParamsのインスタンス
        data.append('name', category); // の最後に追加
        // console.log(data);
        axios(rootGetters['auth/token'])({ // 1つ目の()でトークンを渡し、２つ目でaxiosインスタンスを呼び出す。
          url: '/category',
          method: 'POST',
          data, // 上で定義したインスタンス（オブジェクト）を組み込む。
        }).then(() => {
          commit('doneAddCategory'); // 完了メッセージの表示
          commit('toggleLoading'); // リスト追加後に反転させる。
          resolve();
        }).catch((err) => { // 通信そのものが失敗した場合の処理
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading'); // 反転させ正常に戻す
        });
      });
    },
    sendEditData({ commit }, { categoryId, categoryName }) { // 追加
      commit('clearMessage'); // 前ページのメッセージをリセット
      commit('sendEditData', { categoryId, categoryName });
    },
    editCategory({ commit, rootGetters }, { categoryId, newCategoryName }) {
      commit('toggleLoading'); // 処理後に反転させる。
      const data = new URLSearchParams(); // URLSearchParamsのインスタンス
      data.append('name', newCategoryName);
      axios(rootGetters['auth/token'])({ // 1つ目の()でトークンを渡し、２つ目でaxiosインスタンスを呼び出す。
        url: `/category/${categoryId}`,
        method: 'PUT',
        data, // 上で定義したインスタンス（オブジェクト）を組み込む。
      }).then(() => {
        commit('doneEditCategory', { newCategoryName }); // 完了メッセージの登録
        commit('toggleLoading'); // リスト追加後に反転させる。
      }).catch((err) => { // 通信そのものが失敗した場合の処理
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading'); // 反転させ正常に戻す
      });
    },
  },
  mutations: {
    clearMessage(state) { // メッセージのリセット
      state.errorMessage = '';
      state.doneMessage = '';
    },
    sendEditData(state, { categoryId, categoryName }) { // 追加
      state.updateCategoryId = categoryId;
      state.updateCategoryName = categoryName;
    },
    doneGetAllCategories(state, { categories }) { // getAllCategoriesアクションで発火
      state.categoryList = [...categories]; // categoriesは通信で取得したカテゴリー達
    },
    failFetchCategory(state, { message }) { // カテゴリーの取得失敗
      state.errorMessage = message; // axiosで返ってきたメッセージ
    },
    toggleLoading(state) { // loadhingの切り替え
      state.loading = !state.loading;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    doneAddCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。'; // 作成。
    },
    doneEditCategory(state, { newCategoryName }) { // 追加
      state.updateCategoryName = newCategoryName;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
  },
};
