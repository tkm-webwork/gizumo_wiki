<template lang="html">
  <div class="not-found">
    <app-text ex-large>
      お探しのページは削除されている可能性があります。
    </app-text>

    <div class="not-found__link">
      <app-router-link to="/" underline key-color>
        TOPに戻る
      </app-router-link>
    </div>
  </div>
</template>

<script>
import { Text, RouterLink } from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appRouterLink: RouterLink,
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  margin-top: 80px;
  width: 100%;
  text-align: center;
  &__link {
    margin-top: 40px;
  }
}
</style>
