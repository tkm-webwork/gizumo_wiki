import Vue from 'vue';
import Vuex from 'vuex';
import {
  auth, articles, users, categories,
} from './modules'; // 各々定義したstoreインスタンスをひとまとめにする

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 開発環境でのstrictモード実施
  modules: { // todoではここにstateやgetters,mutasionなどをまとめたが、今回はモジュール化
    auth,
    articles,
    users,
    categories,
  },
});
