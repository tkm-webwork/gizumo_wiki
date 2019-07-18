# Inputコンポーネント

## 使用方法

- フォーム部品実装時に使用するコンポーネントです
- フロント側のバリデーションにvee-validateプラグインを使用しています。

  (<span style="color: red">Storybook上だとプラグインがうまく動作しない模様</span>)

  [vee-validateについて](https://baianat.github.io/vee-validate/)

## props

### スタイルの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|whiteBg|Boolean|false|`true` or `false`|`true`だと背景色が白になります|

### インターフェースの変更

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|name|String|inputName|任意の文字列|inputタグに適用したいname属性の値を指定します|
|type|String|'text'|`text`, `checkbox`, `textarea`, `radio`, `password`, `file`,`hidden`, `submit`, `reset`, `button`, `image`|inputタグに適用したいname属性の値を指定します|
|placeholder|String|入力してください|任意の文字列|placeholder属性の値を指定します|

### 値の設定

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|name|String|inputName|任意の文字列|inputタグに適用したいname属性の値を指定します|
|value|String|''|任意の文字列|inputタグのvalueをバインディングしているpropsです|

### バリデーションの設定

|props|type|デフォルト|指定できる値|
|---|---|---|
|v-validate|String|なし|vee-validateプラグインで指定したいバリデーションのルールを指定します|
|data-vv-as|String|inputName|vee-validateプラグインで指定したバリデーションエラーが発生した時のエラー表示に使用するフィールド名を指定します|