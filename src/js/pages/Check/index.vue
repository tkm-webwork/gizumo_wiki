<template lang="html">
  <div>
    <p class="theme">test</p>
    <p class="subtheme">test</p>
    <p class="textLink">test</p>
    <p class="error">test</p>
    <p class="caution">test</p>
    <p class="disabled">test</p>
    <p class="create">test</p>
    <p class="separator">test</p>
  </div>
</template>

<style lang="css" scoped>
p {
  padding: 20px;
  margin-top: 10px;
  color: #fff;
  font-size: 20px;
}
.theme {
  background-color: var(--themeColor);
}
.subtheme {
  background-color: var(--subthemeColor);
}
.textLink {
  background-color: var(--textLinkColor);
}
.error {
  background-color: var(--errorColor);
}
.caution {
  background-color: var(--cautionColor);
}
.disabled {
  background-color: var(--disabledColor);
}
.create {
  background-color: var(--createColor);
}
.separator {
  background-color: var(--separatorColor);
}
</style>
