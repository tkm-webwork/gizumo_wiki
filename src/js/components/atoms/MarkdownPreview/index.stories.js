import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Vuex from 'vuex';
import note from './README.md';
//highlight.jsの依存しているgruvbox-dark.cssが読み込まれないので一旦これで。。。
import '@Css/storybookmarkdownpreview.css';

const mockUpData = {
  namespace: true,
  state: {
    targetArticle: {
      id: null,
      title: '',
      content: '',
    },
    articleList: [
      {
        id: 1,
        title: 'JavaScriptとは',
        content: "## このレッスンでやること\n\nこのレッスンでやることは、下記になります。\n\n- ・ コンポーネント指向について確認\n- ・ componentsについて確認\n\n## コンポーネント指向について\n\nページを構成する要素をそれぞれ再利用可能な部品（コンポーネント）として分割し、それらを組み合わせてページをつくりあげていく手法をwebフロントエンドの世界では「**コンポーネント指向開発**」といいます。\n\nどの粒度で部品を作成していけば良いのかという話になってきますが、その際にチームで共有できるコンポーネントの設計指針が必要となってきます。  \nその中でもデファクトスタンダードとなりつつあるのは、「**Atomic Design**」という概念です、調べてみましょう。  \nVue.jsにはVueインスタンスをコンポーネント化して使用する仕組みが提供されているので、「**コンポーネント指向開発**」に最適です。\n\n続いて、その仕組みを確認していきましょう。\n\n## componentsについて\n\nVue.jsではVueインスタンスをコンポーネント化して使用できる仕組みが提供されています。\n\n具体的にはVueインスタンス内では別のVueインスタンスを使用することができます。\n\n今回のサンプルでいうと、「App.vue」内で別の「<span style=\"color: red; font-weight: bold;\">.vue</span>」ファイルをインポートして使用することができます。  \n続いて実際に「App.vue」内で他の「<span style=\"color: red; font-weight: bold;\">.vue</span>」ファイルを使用できるよう編集していきます。\n\n早速、「App.vue」内で別のVueインスタンスを使用していきます。  \n「components」ディレクトリ内に「ChildComponent.vue」を作成してください。\n\n```\n├── .babelrc\n├── .git\n├── .gitignore\n├── node_modules\n├── package-lock.json\n├── package.json\n├── public\n├── src\n│   ├── components\n│   │   ├──App.vue\n│   │   ├──ChildComponent.vue・・・追加\n│   └── index.js\n└── webpack.config.babel.js\n```\n\n「ChildComponent.vue」内には下記を記述します。\n\n```html\n<template>\n  <h2>Child Component</h2>\n</template>\n```\n\n続いて「ChildComponent.vue」を「App.vue」内でインポートしましょう。  \n「App.vue」を編集します。\n\n```html\n<template>\n  <div>\n    <h1>{{message}}</h1>\n    <hr>\n    <child-component></child-component>\n  </div>\n</template>\n```\n\nマークアップに追加した`child-component`とは、「ChildComponent.vue」を置き換えるカスタムタグの指定になります。  \n\n```html\n<script>\n  import ChildComponent from 'Components/ChildComponent';\n\n  export default {\n    data() {\n      return {\n        message: '<span>Hello Vue</span>',\n      }\n    },\n    components: {\n      ChildComponent,\n    }\n  }\n</script>\n```\n\n`import`文の追加と、`components`というキーのオブジェクトが追加されています。  \nこのオブジェクトには、Vueインスタンス内で使用する他のVueインスタンスを記述していきます。\n\n「ChildComponent.vue」を`ChildComponent`と「パスカルケース」でインポートしていますが、これには理由があります。  \n`components`には使用するカスタムタグ名をキー、値には`import`したVueインスタンスを指定します。  \n\n```javascript\n  components: {\n    ChildComponent,\n  }\n```\n\n上記は「**es6**」の記法で、キーと値が同じ文字列のとき、省略して記述することができます。  \nつまり、省略しないと下記の形式になります。\n\n```javascript\n  components: {\n    ChildComponent: ChildComponent,\n  }\n```\n\n`components`に指定したキーがパスカルケースのとき、「<span style=\"color: red; font-weight: bold;\">vue-loader</span>」によって「ケバブケース」に変換されます。\n\nつまり、最終的に下記の指定と同義になるので、「カスタムタグ」に対して「Vueインスタンス」を置き換えることができているということになります！\n\n```javascript\n  components: {\n    'child-component': ChildComponent,\n  }\n```\n\n「components」については以上になります。",
      },
    ],
  },
  getters: {
    transformedArticles(state) {
      return state.articleList.map(article => ({
        id: article.id,
        content: `${article.title + article.content}`,
      }));
    },
  },
  mutations: {
    getArticle(state, payload) {
      state.targetArticle = Object.assign(
        state.articleList.find(article => article.id === payload.id),
      );
    }
  },
  actions: {
    getArticle({ commit }, articleId) {
      commit({
        type: 'getArticle',
        id: articleId,
      })
    }
  }
}

storiesOf('ATOMS|MarkdownPreview', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `<app-markdown-preview
                  :markdown-content="markdownContent"
                >
                </app-markdown-preview>`,
      computed: {
        markdownContent() {
          const { title, content } = this.$store.state.articles.targetArticle;;
          return `# ${title}\n${content}`;
        }
      },
      created() {
        this.$store.dispatch('getArticle', parseInt(1, 10));
      },
      store: new Vuex.Store({
        modules: {
          articles: mockUpData,
        }
      })
    }
  }, { notes: note });

storiesOf('ATOMS|MarkdownPreview', module)
  .addDecorator(withKnobs)
  .add('whiteBg', () => {
    return {
      template: `<app-markdown-preview
                  :markdown-content="markdownContent"
                  whiteBg
                >
                </app-markdown-preview>`,
      props: {
        whiteBg: {
          type: Boolean,
          default: true,
        }
      },
      computed: {
        markdownContent() {
          const { title, content } = this.$store.state.articles.targetArticle;
          return `# ${title}\n${content}`;
        }
      },
      created() {
        this.$store.dispatch('getArticle', parseInt(1, 10));
      },
      store: new Vuex.Store({
        modules: {
          articles: mockUpData,
        }
      }),
    }
  }, { notes: note });