# Textコンポーネント

## 使用方法

テキスト実装時に使用するコンポーネントです

## props

### インターフェースの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|tag|String|'p'|文字列|出力したいhtmlタグ名を文字列で指定します|

### スタイルの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|bold|Boolean|false|true or false|`true`を指定すると`font-weight: 700`が適用されます|
|inlineBlock|Boolean|false|true or false|`true`を指定すると`display: inline-block`を適用します|
|error|Boolean|false|true or false|`true`を指定するとテキストカラーに赤(<span style="color: #e61717;">e61717</span>)を適用します|
|themeColor|Boolean|false|true or false|`true`を指定するとテキストカラーにテーマカラー(<span style="color: #17abe6;">17abe6</span>)を適用します|

### 種別の変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|bgSuccess|Boolean|false|`true` or `false`|`true`を指定するとテーマカラーが背景色(<span style="color: #17abe6;">17abe6</span>)のテキストを表示します(主に通信成功時の通知として使用)|
|bgError|Boolean|false|`true` or `false`|`true`を指定すると赤が背景色(<span style="color: #e61717;">e61717</span>)のテキストを表示します(主に通信失敗時の通知として使用)|

### サイズの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|exSmall|Boolean|false|true or false|`true`を指定すると最小サイズになります|
|small|Boolean|false|true or false|`true`を指定すると小さくなります|
|large|Boolean|false|true or false|`true`を指定すると大きくなります|