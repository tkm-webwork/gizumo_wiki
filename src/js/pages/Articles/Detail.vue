<template lang="html">
  <section class="article-detail">
    <app-heading :level="1">記事詳細（プレビュー）</app-heading>
    <div class="article-detail-links">
      <app-router-link
        :to="`/articles/${articleId}/edit`"
        white
        bg-lightgreen
        large
      >
        更新
      </app-router-link>
      <app-button
        bg-danger
      >
        削除
      </app-button>
    </div>
    <article class="article-detail__markdown">
      <app-markdown-view
        :markdown-content="markdownContent"
        :markdown-indexes="markdownIndexes"
        wide
        white-bg
        flex
      />
    </article>
  </section>
</template>

<script>
import { Heading, Button, RouterLink } from '@Components/atoms';
import { MarkdownView } from '@Components/molecules';

export default {
  components: {
    appHeading: Heading,
    appMarkdownView: MarkdownView,
    appButton: Button,
    appRouterLink: RouterLink,
  },
  data() {
    return {
      markdownIndexes: {
        h1Elements: [],
        h2Elements: [],
      },
    };
  },
  computed: {
    articleId() {
      const { id } = this.$route.params;
      return id;
    },
    markdownContent() {
      const { title, content } = this.$store.state.articles.targetArticle;
      return `# ${title}\n${content}`;
    },
  },
  created() {
    this.$store.dispatch('getArticle', parseInt(this.$route.params.id, 10));
  },
  mounted() {
    const markdownIndexes = {
      h1Elements: [],
      h2Elements: [],
    };
    const markdowonHtml = document.querySelector('.article-detail__markdown');
    const h1Elements = markdowonHtml.getElementsByTagName('h1');
    const h2Elements = markdowonHtml.getElementsByTagName('h2');
    h1Elements.forEach((element, index) => {
      element.setAttribute('id', `h1-${index}`);
      const idVal = element.getAttribute('id');
      const height = element.clientHeight;
      const title = element.textContent;
      markdownIndexes.h1Elements.push({
        val: idVal,
        height,
        title,
      });
    });
    h2Elements.forEach((element, index) => {
      element.setAttribute('id', `h2-${index}`);
      const idVal = element.getAttribute('id');
      const height = element.clientHeight;
      const title = element.textContent;
      markdownIndexes.h2Elements.push({
        val: idVal,
        height,
        title,
      });
    });
    this.markdownIndexes = Object.assign({}, { ...this.markdownIndexes }, {
      ...markdownIndexes,
    });
  },
};
</script>

<style lang="css" scoped>
.article-detail {
  &__markdown {
    display: flex;
    align-items: flex-start;
  }
  &__index {
    margin-left: 5%;
    width: 30%;
    height: 300px;
    background-color: #fff;
  }
}
.article-detail-links {
  display: flex;
  margin: 16px 0 0;
}
</style>
