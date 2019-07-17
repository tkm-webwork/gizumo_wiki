<template lang="html">
  <app-notice
    notice-text="お探しのページは削除されている可能性があります。"
    link-path="/"
    link-text="TOPに戻る"
  />
</template>

<script>
import { Notice } from '@Components/molecules';

export default {
  components: { appNotice: Notice },
};
</script>
