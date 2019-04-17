<template lang="html">
  <div class="notfound">
    <p class="notfound-text">お探しのページは削除されている可能性があります。</p>
    <router-link :to="{ path: '/' }" class="notfound-link">
      TOPに戻る
    </router-link>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.notfound {
  margin-top: 80px;
  width: 100%;
  text-align: center;
  &-text {
    font-size: 24px;
  }
  &-link {
    margin-top: 40px;
    color: $textLinkColor;
    font-size: 14px;
    text-decoration: underline;
  }
}
</style>
