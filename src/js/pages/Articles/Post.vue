<template lang="html">
  <app-article-post
    :category-list="categoryList"
    :markdown-content="markdownContent"
    :loading="loading"
    :access="access"
    @selectedArticleCategory="selectedArticleCategory"
  />
</template>
