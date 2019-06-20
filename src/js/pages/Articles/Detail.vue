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
      markdownIndexes: [],
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
    this.$store.dispatch('getArticleDetail', parseInt(this.articleId, 10));
  },
  mounted() {
    this.createMarkdownIndexesAnchorInfo();
  },
  methods: {
    createMarkdownIndexesAnchorInfo() {
      const markdownIndexes = [];
      const markdownHtml = document.querySelector('.article-detail__markdown');
      const header = document.querySelector('header');
      const headerHeight = header.clientHeight;
      const hElements = markdownHtml.querySelectorAll('h1, h2');
      hElements.forEach((element, index) => {
        const tagName = element.tagName.toLowerCase();
        element.setAttribute('id', `${tagName}-${index}`);
        const idVal = element.getAttribute('id');
        const title = element.textContent;
        const { offsetTop } = element;
        const scrollToY = offsetTop - headerHeight;
        markdownIndexes.push({
          tagName,
          val: idVal,
          title,
          scrollToY,
        });
      });
      this.markdownIndexes = [...markdownIndexes];
      if (this.$route.hash) {
        this.smoothScroll();
      }
    },
    smoothScroll() {
      const { hash } = this.$route;
      const anchorVal = hash.replace('#', '');
      const target = this.markdownIndexes.find(obj => anchorVal === obj.val);
      if (target) {
        this.$SmoothScroll(target.scrollToY);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
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
