import { withBackgrounds } from '@storybook/addon-backgrounds';
import { addParameters } from '@storybook/vue';
import backgrounds from "@storybook/addon-backgrounds";
//atoms
import buttonStory from './atoms/Button/index.stories';
import inputTextStory from './atoms/InputText/index.stories';

//molecules
import listSidebarStory from './molecules/ListSidebar/index.stories';
// import { storiesOf } from '@storybook/vue';
// import StoryRouter from 'storybook-vue-router';
// import { action } from '@storybook/addon-actions';
// import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
// import { withNotes } from '@storybook/addon-notes';

//globals
import HeaderStory from './globals/Header/index.stories';
import SidebarStory from './globals/Sidebar/index.stories';

//vuex
// import Vuex from 'vuex';

//md
// import ButtonMD from '@Stories/atoms/Button/README.md';

// storiesOf('DEMO|MyButton', module)
//   .addDecorator(withKnobs)
//   .add('Button', () => {
//     return {
//       template: '<button @click="emit" :class="classes">{{ $store.state.count }}{{ text }}</button>',
//       props: {
//         text: {
//           default: text('Text', 'でも'),
//           type: String,
//         },
//         gray: {
//           default: boolean('gray', false),
//           type: Boolean,
//         }
//       },
//       methods: {
//         emit(e) {
//           this.$store.dispatch('incrementCount')
//           action('clicked')(e.target);
//         }
//       },
//       computed: {
//         classes() {
//           return {
//             'is-bg-gray': this.gray,
//           }
//         }
//       },
//       store: new Vuex.Store({
//         state: {
//           count: 0,
//         },
//         actions: {
//           incrementCount({ commit }) {
//             commit('incrementCount');
//           }
//         },
//         mutations: {
//           incrementCount(state) {
//             state.count++;
//           }
//         }
//       }),
//     }
//   });

// storiesOf('ATOMS|Button', module)
//   .addDecorator(withKnobs)
//   .add('Button:default', () => {
//       return {
//       template: '<app-button :text="text" :class="[\'button\', className]" />',
//       props: {
//         text: {
//           type: String,
//           default: text('text', 'ボタン'),
//         },
//         className: {
//           type: String,
//           default: text('className', ''),
//         },
//       },
//       methods: {
//         handleClick() {
//           console.log('override');
//         }
//       }
//     }
//   },{ notes: ButtonMD });

// storiesOf('MOLECULES|ListSidebar', module)
//   .addDecorator(StoryRouter())
//   .add('defalut', () => {
//     return {
//       render: h => h('list-sidebar', {
//         props: {
//           targetArray: [
//             {
//               id: 1,
//               name: 'HOME',
//               path: '/',
//             },
//             {
//               id: 2,
//               name: '記事',
//               path: '/all/articles',
//             },
//             {
//               id: 3,
//               name: 'カテゴリー',
//               path: '/category',
//             },
//             {
//               id: 4,
//               name: 'ユーザー',
//               path: '/users',
//             },
//           ]
//         }
//       }),
//       }
//     }
//   );

// storiesOf('GLOBALS|Header', module)
//   .addDecorator(StoryRouter())
//   .add('defalut', () => {
//     return {
//     render: h => h('app-header'),
//     }
//   });

// storiesOf('GLOBALS|Sidebar', module)
//   .addDecorator(StoryRouter())
//   .add('defalut', () => {
//     return {
//       render: h => h('app-sidebar'),
//     }
//   });