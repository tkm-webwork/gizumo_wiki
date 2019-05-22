# Gizumo Wiki

## フォルダ構成

```
.
├── package-lock.json
├── package.json
├── public
├── src
│   ├── js
│   │   ├── _helpers/
│   │   ├── _router/
│   │   ├── _store/
│   │   ├── app.js
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── ...
│   │   │   │   ├── Button/
│   │   │   │   └── index.vue
│   │   │   ├── globals/
│   │   │   │   ├── ...
│   │   │   │   ├── Header/
│   │   │   │   └── index.vue
│   │   │   └── molecules/
│   │   │       ├── ...
│   │   │       ├── MarkdownView/
│   │   │       └── index.vue
│   │   └── pages/
│   │       ├── ...
│   │       ├── Signin/
│   │       └── index.vue
│   └── scss/
└── webpack.config.babel.js
```

## 設計

- `_helpers`はユーティリティな関数などをまとめているフォルダ
- `_router`はvue-routerのインスタンスを生成しているフォルダ
- `_store`はvuexのstoreのインスタンスを生成しているフォルダ

### コンポーネント

**Atomic Design**チック

`components`フォルダでコンポーネントをまとめています。

- `atoms`は使い回すための最小単位のコンポーネント
- `globals`はどのページでも使うコンポーネント
- `molecules`は`atoms`で構成された`pages`に依存してるコンポーネント（使い回せなくてもいい）
- `pages`は`atoms`と`molecules`で構成された実ページ

## 開発

開発時は下記のコマンドでサーバーが立ち上がります。

```
npm install
```

```
npm run dev
```

## 本番公開

公開は、下記のコマンドでソースコードをビルドします。

```
npm run build
```

環境にアップしたら、下記のコマンドでNodeのサーバーを立ち上げます。

```
npm run publish
```

## 技術的なもの

- Node.js (v10.15.0): <a href="https://nodejs.org/ja/" target="_blank">https://nodejs.org/ja/</a>
- Babel (v7.x): <a href="https://babeljs.io/" target="_blank">https://babeljs.io/</a>
- ESlint: <a href="https://eslint.org/" target="_blank">https://eslint.org/</a>
- webpack (v4.29.0): <a href="https://webpack.js.org" target="_blank">https://webpack.js.org</a>
- Vue.js (v2.6.6): <a href="https://jp.vuejs.org/index.html" target="_blank">https://jp.vuejs.org/index.html</a>
- Vue Router: <a href="https://router.vuejs.org/ja/" target="_blank">https://router.vuejs.org/ja/</a>
- Vuex: <a href="https://vuex.vuejs.org/ja/" target="_blank">https://vuex.vuejs.org/ja/</a>
- Express (v4.16.4): <a href="https://expressjs.com/ja/" target="_blank">https://expressjs.com/ja/</a>
- PM2 (v3.5.0): <a href="https://nodemon.io/" target="_blank">http://pm2.keymetrics.io/</a>（本番のNode起動）
- コンポーネントガイド
- テスト

## 画面

|  | URL |
|---|---|
| トップ | `/` |
| ログイン（初回） | `/init` |
| ログイン | `/signin` |
| カテゴリー一覧  | `/category` |
| 記事一覧（すべて） | `/articles` |
| 記事一覧（カテゴリー） | `/articles?=:category` |
| 記事詳細 | `/articles/:id` |
| 更新* | `/articles/:id/edit` |
| 投稿* | `/articles/post` |
| マイページ | `/profile/:username` |
| ユーザー一覧* | `/users` |
| ユーザー個別* | `/users/:id` |
| ユーザー作成* | `/users/create` |
| グループ・グループメンバー追加* | `/group` |
| 404 | `/*` |

`*`は管理権限

## サインアップ・ログイン
- 管理者が追加（名前・メールアドレス）
- メール送付
- メールのURLからパスワード・グループの設定
- メールアドレス・パスワードでログイン
- メール再送付・パスワードリセット

## 権限グループ

| グループ | 権限範囲 |
|---|---|
| 管理者 | 閲覧（全ページ）、更新・削除 / ユーザー追加 |
| 閲覧者 | 閲覧（更新系のページを除く） |

## 閲覧グループ

| グループ | 閲覧範囲 |
|---|---|
| 内勤全体 | 内勤向け記事 |
| 事業部ごと | 事業部ごとに向けた記事 |
| SES（保留） | SES向け記事 |
| 研修生（保留） | 研修生向け記事 |
| 全社（保留） | 全体向け記事 |
