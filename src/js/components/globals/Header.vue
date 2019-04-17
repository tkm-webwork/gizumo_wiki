<template lang="html">
  <header class="header">
    <p>MENUを開く</p>
    <h1>Gizumo Wiki</h1>
  </header>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  color: #fff;
  background-color: $keycolor;
}
</style>
