<template>
  <div class="pagenation-article-list">
    <router-link
      :to="{ path: '/articles', query: jumpFirst}"
      :class="{ 'disabled': getCurrent === 1 }"
      class="pagenation-article-list__first-button"
    >
      最初へ
    </router-link>
    <router-link
      :to="{ path: '/articles', query: jumpFirst}"
      :class="{ 'disabled': getCurrent === 1 }"
      class="pagenation-article-list__page-button"
    >
      1
    </router-link>
    <router-link
      v-if="isPrevJump"
      :to="{ path: '/articles', query: jumpDownFive}"
      class="pagenation-article-list__page-button"
    >
      …
    </router-link>
    <router-link
      v-if="getPrev !== 1 && (isPrevJump || isNextJump)"
      :to="{ path: '/articles', query: jumpPrev}"
      class="pagenation-article-list__page-button"
    >
      {{ getPrev }}
    </router-link>
    <router-link
      v-if="getCurrent !== 1 && getCurrent !== getLast"
      :to="{ path: '/articles'}"
      class="pagenation-article-list__page-button disabled"
    >
      {{ getCurrent }}
    </router-link>
    <router-link
      v-if="getNext !== getLast && (isPrevJump || isNextJump)"
      :to="{ path: '/articles', query: jumpNext}"
      class="pagenation-article-list__page-button"
    >
      {{ getNext }}
    </router-link>
    <router-link
      v-if="isNextJump"
      :to="{ path: '/articles', query: jumpUpFive}"
      class="pagenation-article-list__page-button"
    >
      …
    </router-link>
    <router-link
      v-if="getLast !== 1"
      :to="{ path: '/articles', query: jumpLast}"
      :class="{ 'disabled': getCurrent === getLast }"
      class="pagenation-article-list__page-button"
    >
      {{ getLast }}
    </router-link>
    <router-link
      :to="{ path: '/articles', query: jumpLast}"
      :class="{ 'disabled': getCurrent === getLast }"
      class="pagenation-article-list__last-button"
    >
      最後へ
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isPrevJump() {
      return (this.getCurrent - 1) >= 3; // boolean
    },
    isNextJump() {
      return (this.getLast - this.getCurrent) >= 3; // boolean
    },
    getCurrent() {
      return parseInt(this.page.current, 10); // int
    },
    getLast() {
      return parseInt(this.page.last, 10); // int
    },
    getPrev() {
      return (this.getCurrent - 1) < 1 ? 1 : this.getCurrent - 1; // int
    },
    getNext() {
      return (this.getCurrent + 1) > this.getLast ? this.getLast : this.getCurrent + 1; // int
    },
    getDownFive() {
      return (this.getCurrent - 5) < 1 ? 1 : this.getCurrent - 5; // int
    },
    getUpFive() {
      return (this.getCurrent + 5) > this.getLast ? this.getLast : this.getCurrent + 5; // int
    },
    jumpFirst() {
      return this.setPage(1);
    },
    jumpLast() {
      return this.setPage(this.getLast);
    },
    jumpDownFive() {
      return this.setPage(this.getDownFive);
    },
    jumpUpFive() {
      return this.setPage(this.getUpFive);
    },
    jumpPrev() {
      return this.setPage(this.getPrev);
    },
    jumpNext() {
      return this.setPage(this.getNext);
    },
  },
  methods: {
    setPage(pageNum) {
      let query = this.$route.query ? this.$route.query : {};
      query = Object.assign({}, query, { page: pageNum });
      return query;
    },
  },
};
</script>

<style scoped>
.pagenation-article-list {
  margin-top: 10px;
  font-size: 16px;
  transition: all .5s;
  line-height: 1.4;
  &__page-button {
    background-color: var(--themeColor);
    color: #fff;
    border-radius: 5px;
    padding: 10px 20px;
  }
  &__first-button {
    background-color: var(--subthemeColor);
    color: #fff;
    border-radius: 5px;
    padding: 10px 20px;
    &:after {

    }
  }
  &__last-button {
    background-color: var(--subthemeColor);
    color: #fff;
    border-radius: 5px;
    padding: 10px 20px;
  }
}
.disabled {
  background-color: var(--disabledColor);
  pointer-events: none;
}
</style>
