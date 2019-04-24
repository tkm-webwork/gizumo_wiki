# Sidebarコンポーネント

## 使用方法

- サイドバー実装時に使用するコンポーネントです
- ListSidebarコンポーネントを子コンポーネントとして使用しているので、リストをクリックしたときの遷移先をマッピングしたオブジェクトを格納している配列を`:target-array`にバインドする必要があります。

### example・・・routeLinksArray

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