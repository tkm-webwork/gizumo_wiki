<template lang="html">
  <div class="article-delete">
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <app-list-item
      v-for="(article, index) in targetArray"
      :key="article.id"
      class="article-delete__list"
      border-bottom-gray
    >
      <button
        class="article-delete__button"
        :class="{ 'article-delete__open' : isOpened[index] }"
        @click="accordionToggle(index)"
      >
        <app-text
          class="article-delete__title"
          inline-block
        >
          {{ article.title }}
        </app-text>
      </button>
      <transition
        name="content"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div
          v-if="isOpened[index]"
          class="article-delete__content"
        >
          <div class="article-delete__content__box">
            <app-text
              class="article-delete__content__text"
              inline-block
            >
              {{ article.content | truncate }}
            </app-text>
            <app-text
              class="article-delete__content__name"
              inline-block
            >
              {{ article.created_at | moment }}
            </app-text>
            <app-text
              class="article-delete__content__author"
              inline-block
            >
              {{ article.user.full_name | author }}
            </app-text>
          </div>
        </div>
      </transition>
    </app-list-item>
  </div>
</template>

<script>
import { ListItem, Text, Heading } from '@Components/atoms';

export default {
  components: {
    appListItem: ListItem,
    appText: Text,
    appHeading: Heading,
  },
  filters: {
    truncate(val) {
      const slicetext = val.length >= 30 ? `${val.slice(0, 30)}...` : val;
      return `記事本文: ${slicetext}`;
    },
    moment(val) {
      const date = `作成日: ${new Date(val).toLocaleDateString()}`;
      return date;
    },
    author(val) {
      return `作成者: ${val}`;
    },
  },
  props: {
    targetArray: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpened: [],
    };
  },
  watch: {
    targetArray() {
      for (let i = 0; i < this.targetArray.length; i += 1) {
        this.isOpened.push(false);
      }
    },
  },
  methods: {
    accordionToggle(index) {
      this.$set(this.isOpened, index, !this.isOpened[index]);
    },
    beforeEnter(el) {
      const status = el;
      status.style.height = '0';
    },
    enter(el) {
      const status = el;
      status.style.height = `${el.scrollHeight}px`;
    },
    beforeLeave(el) {
      const status = el;
      status.style.height = `${el.scrollHeight}px`;
    },
    leave(el) {
      const status = el;
      status.style.height = '0';
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-delete {
  &__list {
    display: block;
  }
  &__button {
    position: relative;
    display: block;
    width: 100%;
    text-align: left;
    padding: 10px;
    &:hover {
      background-color: #f1f1f1;
    }
    &::after {
      display: inline-block;
      border: solid transparent;
      content: "";
      border-top-color: #5f6569;
      border-width: 7px;
      position: absolute;
      top: 50%;
      right: 20px;
      margin-top: -5px;
      transition-duration: .4s;
    }
  }
  &__title {
    width: 97%;
  }
  &__content {
    transition: height .4s ease;
    &__box {
      padding: 10px;
      border-left: 1px solid var(--separatorColor);
      border-right: 1px solid var(--separatorColor);
    }
    &__name {
      margin-left: 30px;
    }
    &__author {
      margin-left: 10px;
    }
  }
  &__open {
    background-color: #f1f1f1;
    &::after {
      transform: rotateX(180deg);
      margin-top: -10px;
    }
  }
}
.content-enter-active {
  animation-duration: .4s;
  animation-fill-mode: both;
  animation-timing-function: ease-in;
  animation-name: content-opend;
}
.content-leave-active {
  animation-duration: .2s;
  animation-fill-mode: both;
  animation-name: content-closed;
}
@keyframes content-opend {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes content-closed {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
