// Authorization(認可)、つまりサインイン用のmodule
import Cookies from 'js-cookie';
import axios from '@Helpers/axiosDefault';
import getAccess from '@Helpers/getAccessControlList';

export default {
  namespaced: true,
  state: {
    loading: false, // update.vueでcomputedされている。処理中か否かの基準;
    signedIn: false, // tokenの有無でサインインの資格を判断
    token: '', // axiosでリクエストする際は必ず必要。
    errorMessage: '',
    user: { // 編集者のデータ
      email: '',
      id: null,
      account_name: '',
      password_reset_flg: null,
      role: '',
    },
  },
  getters: { // "ゲッター" はストアの算出プロパティ。ゲッターの結果はその依存関係に基づいて計算され、依存関係の一部が変更されたときにのみ再評価されます。
    token: state => state.token,
    user: state => state.user,
    access: state => getAccess(state.user.role.value), // ユーザーの権限を表す
  },
  mutations: {
    hasToken(state, { token }) { // tokenが渡されているなら、サインイン済かつstate.tokenを上書き
      state.signedIn = true;
      state.token = token;
    },
    noToken(state) { // tokenが渡されていないならサインイン不可
      state.signedIn = false;
      state.token = '';
    },
    sendRequest(state) { // リクエスト時のloading切り替え。この後にaxiosへの通信が行われる
      state.loading = true;
      state.errorMessage = '';
    },
    signInSuccess(state, { token, user }) {
      Cookies.set('user-token', token, { expires: 10 });
      state.token = token;
      state.user = Object.assign({}, { ...state.user }, { ...user }); // 既存のstate.userにdataから引っ張ったuserを上書き
      state.loading = false; // リクエスト終了
      state.signedIn = true; // サインイン完了
    },
    signInFailure(state, payload) {
      Cookies.remove('user-token');
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
    signOut(state) {
      Cookies.remove('user-token');
      state.token = '';
      state.loading = false;
      state.signedIn = false;
      state.user = Object.assign({}, {
        email: '',
        id: null,
        account_name: '',
        password_reset_flg: null,
        role: '',
      });
    },
    doneChangePassword(state, { user }) {
      state.user = Object.assign({}, { ...state.user }, { ...user }); // 既存のstate.userにdataから引っ張ったuserを上書き
      state.loading = false;
    },
    failRequest(state, { message }) { //
      state.loading = false;
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.errorMessage = '';
    },
  },
  actions: {
    checkAuth({ commit }, { token }) {
      return new Promise((resolve, reject) => {
        if (!token) {
          commit('signInFailure');
          reject(new Error('認証に失敗しました'));
        } else {
          axios(token)({
            method: 'GET',
            url: '/me',
          }).then((response) => {
            if (response.data.code === 0) {
              commit('signInFailure');
              return reject();
            }

            const payload = { token, user: response.data.user }; // dataにオブジェクトで保管されているユーザー全ユーザー
            commit('signInSuccess', payload);
            return resolve();
          }).catch(() => {
            commit('signInFailure', { errorMessage: 'エラーが発生しました。' });
            reject(new Error('エラーが発生しました'));
          });
        }
      });
    },
    signIn({ commit }, { email, password }) { // dispatchにより渡された値
      commit('sendRequest'); // muatationの発火。loadingがtrueに
      return new Promise((resolve, reject) => { // プロミスインスタンス作成
        const data = new URLSearchParams(); // URLSearchParamsのインスタンス
        data.append('email', email); // の最後に追加
        data.append('password', password);
        axios()({ // axiosにはpromiseが入っており、thenが実行される。
          url: '/me',
          method: 'POST', // 「POSTの/me」は認証トークンの作成。文字列が羅列されたtokenなどが含まれたオブジェクトが返される
          data,
        }).then((response) => { // まず、トークン作成が成功
          if (!response.data.token) reject(new Error()); // reject（失敗時の関数）の実行。エラーインスタンスをcatchに渡す。

          return axios(response.data.token)({
            method: 'GET',
            url: '/me', // 「GETの/me」はログインユーザー情報の取得
          }).then((ownData) => { // それをownDataに代入
            if (ownData.data.code === 0) return reject(new Error()); // 成功時はcode=200のはず。失敗とみなしrejectを返す

            return { token: response.data.token, user: ownData.data.user }; // ここで処理終了。以降は行わずcatchに移る
          }).catch(() => reject(new Error()));
        }).then((payload) => {
          commit('signInSuccess', payload);
          resolve(); // ここまでで成功時の処理終了
        }).catch(() => {
          commit('signInFailure', {
            errorMessage: 'ログインに失敗しました。メールアドレスとパスワードを確認して再度ログインし直してみてください。',
          });
          reject(new Error());
        });
      });
    },
    signOut({ commit }) {
      commit('signOut');
    },

    // パスワードの変更
    changePassword({ commit, rootGetters }, data) {
      commit('sendRequest');

      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          url: '/user/password/update',
          method: 'POST',
          data,
        }).then((response) => {
          if (response.data.code === 0) throw new Error(response.data.message);

          const user = {
            password_reset_flg: response.data.user.password_reset_flg,
          };
          commit('doneChangePassword', { user });
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
