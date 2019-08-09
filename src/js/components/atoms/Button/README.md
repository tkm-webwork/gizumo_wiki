# Buttonコンポーネント

## 使用方法

ボタン実装時に使用するコンポーネントです

## props

### スタイルの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|buttonType|String|`button`|---|buttonタグのtype属性の値をバインディングします|
|display|Boolean|false|`true` or `false`|`true`のとき、`display: block`が適用されます|
|round|Boolean|false|`true` or `false`|`true`のとき、`border-radius: 5px`が適用されます|
|bold|Boolean|false|`true` or `false`|`true`のとき、`font-weight: bold`が適用されます|
|thmeColor|Boolean|false|`true` or `false`|`true`のとき、`color: #17abe6`が（テーマカラー）が適用されます|
|pointer|Boolean|false|`true` or `false`|`true`のとき、`cusor: pointer`が適用されます|

### 種別の変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|disabled|Boolean|false|`true` or `false`|ボタンを灰色(主に非活性状態のボタン)に使用します|
|bgDanger|Boolean|false|`true` or `false`|ボタンを赤色(主に削除のトリガーになるボタン)に使用します|
|bgCaution|Boolean|false|`true` or `false`|ボタンを黄色(主に注意喚起のトリガーになるボタン)に使用します|
|bgWhite|Boolean|false|`true` or `false`|ボタンを白色に変更するときに使用します|

### サイズの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|small|Boolean|false|`true` or `false`|ボタンのサイズを小さくするときに使用します|
