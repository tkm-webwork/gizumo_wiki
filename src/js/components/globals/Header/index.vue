<template lang="html">
  <header class="header">
    <app-heading class-name="header__title">
      Gizumo Wiki
    </app-heading>
    <template v-if="signedIn">
      <div class="header__profile">
        <app-button
          small
          bold
          bg-white
          theme-color
          @click="showMenu"
        >
          My Account
        </app-button>
        <transition name="fade">
          <ul v-if="toggleProfile" class="header__profile__list">
            <li v-for="(route, index) in profileMenu" :key="index">
              <app-router-link
                small
                hover-underline
                :to="route.to"
              >
                {{ route.name }}
              </app-router-link>
            </li>
          </ul>
        </transition>
      </div>
    </template>
  </header>
</template>

<script>
import { Heading, Button, RouterLink } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appButton: Button,
    appRouterLink: RouterLink,
  },
  props: {
    signedIn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      toggleProfile: false,
    };
  },
  computed: {
    profileMenu() {
      return [
        {
          name: 'アカウントページ',
          to: { name: 'profile', path: '/profile' },
        },
        {
          name: 'サインアウト',
          to: {
            name: 'signout',
            path: '/signout',
            params: { signoutMessage: 'サインアウトしました。' },
          },
        },
      ];
    },
  },
  watch: {
    $route() {
      this.toggleProfile = false;
    },
  },
  methods: {
    showMenu() {
      this.toggleProfile = !this.toggleProfile;
    },
  },
};
</script>

<style lang="postcss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  background-color: var(--themeColor);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, .6);
  z-index: var(--z-header);
  &__profile {
    position: relative;
    .fade-enter-active, .fade-leave-active {
      transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    &__list {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 5px;
      padding: 5px 10px;
      width: 160px;
      border: 1px solid var(--separatorColor);
      border-radius: 5px;
      background-color: #fff;
      & > li {
        border-top: 1px solid var(--separatorColor);
        &:first-child {
          border: none;
        }
      }
    }
  }
}
</style>
