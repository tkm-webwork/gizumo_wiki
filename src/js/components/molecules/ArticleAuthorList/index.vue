<template>
  <div class="article-author-list">
    <app-heading :level="1">作成者ごとの記事リスト</app-heading>
    <div class="article-author-list__accordion-list">
      <app-accordion>
        <app-text>
          {{ createAuthorList }}
        </app-text>
      </app-accordion>
    </div>
  </div>
</template>

<script>
import { Accordion, Heading, Text } from '@Components/atoms';

export default {
  components: {
    appAccordion: Accordion,
    appHeading: Heading,
    appText: Text,
  },
  props: {
    articleList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    createAuthorList() {
      console.log(this.articleList.user.full_name);
      return 'test';
    },
  },
};
</script>

<style scoped>

</style>
