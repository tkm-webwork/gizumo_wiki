import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import storyRouter from 'storybook-vue-router';
import note from './README.md';

storiesOf('ATOMS|RouterLink', module)
.addDecorator(storyRouter())
.addDecorator(withKnobs)
.add('default', () => {
  return {
    template: `<app-router-link
                :to="url"
                :block="block"
                :under-line="underLine"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      url: {
        type: String,
        default: "articles/1",
      },
      activeClass: {
        type: String,
        default: '',
      },
      exactActiveClass: {
        type: String,
        default: '',
      },
      block: {
        type: Boolean,
        default: boolean('block', false),
      },
      underLine: {
        type: Boolean,
        default: boolean('underLine', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      }
    }
  }
}, { notes: note })
.add('default:small', () => {
  return {
    template: `<app-router-link
                :to="url"
                :block="block"
                :under-line="underLine"
                :white="white"
                :round="round"
                :small="small"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      url: {
        type: String,
        default: "articles/1",
      },
      activeClass: {
        type: String,
        default: '',
      },
      exactActiveClass: {
        type: String,
        default: '',
      },
      block: {
        type: Boolean,
        default: boolean('block', false),
      },
      underLine: {
        type: Boolean,
        default: boolean('underLine', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      small: {
        type: Boolean,
        default: true,
      }
    }
  }
}, { notes: note })
.add('default:large', () => {
  return {
    template: `<app-router-link
                :to="url"
                :block="block"
                :under-line="underLine"
                :white="white"
                :round="round"
                :large="large"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      url: {
        type: String,
        default: "articles/1",
      },
      activeClass: {
        type: String,
        default: '',
      },
      exactActiveClass: {
        type: String,
        default: '',
      },
      block: {
        type: Boolean,
        default: boolean('block', false),
      },
      underLine: {
        type: Boolean,
        default: boolean('underLine', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      large: {
        type: Boolean,
        default: true,
      }
    }
  }
}, { notes: note });