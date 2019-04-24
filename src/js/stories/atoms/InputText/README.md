# InputTextコンポーネント

## 使用方法

- フォーム実装時に使用するコンポーネントです

## props

|props|type|デフォルト|指定できる値|説明|
|---|---|---|---|
|name|String|inputName|任意の文字列|inputタグに適用したいname属性の値を指定します|
|className|String|''|`login-button`|スタイル制御に使用します|
|inputType|String|'text'|`text`, `checkbox`, `textarea`, `radio`, `password`, `file`,`hidden`, `submit`, `reset`, `button`, `image`|inputタグに適用したいname属性の値を指定します|
|inputRquired|Boolean|false|`true` or `false`|入力項目が必須かどうか指定します|
|inputValue|String|''|任意の文字列|inputタグのvalueをバインディングしているpropsです|
