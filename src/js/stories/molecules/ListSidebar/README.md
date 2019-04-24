# ListSidebarコンポーネント

## 使用方法

- サイドバーのリストに使用するコンポーネントです

## props

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|targetArray|Array|[]|Object|リストをクリックしたときの遷移先をオブジェクト形式で指定します|
|className|String|''|---|スタイル制御に使用します|

### example・・・targetArray

```json
[
  {
    id: 1,
    name: 'HOME',
    path: '/',
  },
  {
    id: 2,
    name: '記事',
    path: '/all/articles',
  },
  {
    id: 3,
    name: 'カテゴリー',
    path: '/category',
  },
  {
    id: 4,
    name: 'ユーザー',
    path: '/users',
  },
]
```