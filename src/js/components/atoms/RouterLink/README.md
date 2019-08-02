# RouterLinkコンポーネント

## 使用方法

ページ内リンク実装時に使用するコンポーネントです

## props

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|to|String|''|遷移先のurlを指定します|
|block|Boolean|false|true or false|`true`だと`display`プロパティにblockが指定されます|
|underLine|Boolean|false|true or false|`true`だと下線が指定されます|
|themeColor|Boolean|false|true or false|`true`だとテキストカラーにテーマカラー(<span style="color: #17abe6;">17abe6</span>)を適用します|
|danger|Boolean|false|true or false|`true`だとテキストカラーに赤(<span style="color: #e61717;">e61717</span>)を適用します|
|white|Boolean|false|true or false|`true`だとテキストカラーに白を適用します|
|round|Boolean|false|true or false|`true`だと`border-radius: 5px`が適用されます|
|large|Boolean|false|true or false|ボタンのサイスを大きくするときに使用します|
|small|Boolean|false|true or false|ボタンのサイスを小さくするときに使用します|

## サイズの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|small|Boolean|false|true or false|`true`だとサイズが小さくなります|
|large|Boolean|false|true or false|`true`だとサイズが大きくなります|

## 種別の変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|bgThemeColor|Boolean|false|true or false|`true`だと背景色にテーマカラー(<span style="color: #17abe6;">17abe6</span>)を適用します|
|bgDanger|Boolean|false|true or false|`true`だと背景色に赤(<span style="color: #e61717;">e61717</span>)を適用します(主にリソースの削除やエラー表示系に使用)|
|bgLightGreen|Boolean|false|true or false|`true`だと背景色に緑(<span style="color: #59994d">59994d</span>)を適用します(主にリソースの作成に使用)|
