import axios from 'axios';
/*
  ログインユーザーの認証はトークンベースで行う時。この場合ログインユーザーが
  サーバ側にリクエストをする時ヘッダーにトークンを持たせると思います。
   デフォルトのaxiosをそのまま使えば毎回のリクエストのヘッダーに
  埋め込む必要があるので。これを常時埋め込んだ状態にしてそれを使おうって話。

  どのリクエストもヘッダーにトークンを組み込みたい！
  → axios.create()で「設定が組み込まれた別のインスタンス」として定義すればいい。
    それを呼び出せば毎回の記入を省略してaxiosのリクエストが飛ばせる！！
*/
export default (token = null) => { // 引数にtokenの値を渡す
  const headers = {};
  if (token) Object.assign(headers, { Authorization: `Bearer ${token}` }); // tokenがあればheadersに組み込まれる。
  return axios.create({ // axios.create => リクエストの共通設定を組み込んだインスタンスを作成する。以降は呼び出すだけで設定を適用したリクエストが送れる。以下２つが共通の設定。
    baseURL: API_BASE_URL, // 共通のURLを指定
    headers, // HTTPリクエストのヘッダーを指定
  });
};
