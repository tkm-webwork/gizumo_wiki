import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import note from './README.md';

storiesOf('ATOMS|Button', module)
  .addDecorator(withKnobs)
  .add('default', () => {
      return {
      template: `<app-button
                  :buttonType="buttonType"
                  :block="block"
                  :small="small"
                  :round="round"
                  :bold="bold"
                  :themeColor="themeColor"
                  :bgDanger="bgDanger"
                  :bgCaution="bgCaution"
                  :bgWhite="bgWhite"
                  :pointer="pointer"
                  >
                    {{ text }}
                </app-button>`,
      props: {
        text: {
          type: String,
          default: text('テキスト', 'ここにテキストが入ります'),
        },
        buttonType: {
          type: String,
          default: text('buttonType', 'button'),
        },
        block: {
          type: Boolean,
          default: boolean('block', false),
        },
        small: {
          type: Boolean,
          default: boolean('small', false),
        },
        round: {
          type: Boolean,
          default: boolean('round', false),
        },
        bold: {
          type: Boolean,
          default: boolean('bold', false),
        },
        themeColor: {
          type: Boolean,
          default: boolean('themeColor', false),
        },
        bgDanger: {
          type: Boolean,
          default: boolean('bgDanger', false),
        },
        bgCaution: {
          type: Boolean,
          default: boolean('bgCaution', false),
        },
        bgWhite: {
          type: Boolean,
          default: boolean('bgWhite', false),
        },
        pointer: {
          type: Boolean,
          default: boolean('pointer', false),
        },
      },
      computed: {
        classes() {
          return {
            button: true,
            'button--block': this.block,
            'button--small': this.small,
            'button--round': this.round,
            'button--bold': this.bold,
            'button--theme-color': this.themeColor,
            'button--disabled': this.disabled,
            'button--danger': this.bgDanger,
            'button--bg-caution': this.bgCaution,
            'button--bg-white': this.bgWhite,
            'button--pointer': this.pointer,
          };
        },
      },
    }
  },{ notes: note })
  .add('disabled', () => {
    return {
      template: `<app-button
                  :disabled="disabled"
                  :buttonType="buttonType"
                  :block="block"
                  :small="small"
                  :round="round"
                  :bold="bold"
                  :themeColor="themeColor"
                  :pointer="pointer"
                  >
                    {{ text }}
                </app-button>`,
    props: {
      text: {
        type: String,
        default: text('テキスト', 'ここにテキストが入ります'),
      },
      disabled: {
        type: Boolean,
        default: true,
      },
      buttonType: {
        type: String,
        default: text('buttonType', 'button'),
      },
      block: {
        type: Boolean,
        default: boolean('block', false),
      },
      small: {
        type: Boolean,
        default: boolean('small', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      pointer: {
        type: Boolean,
        default: boolean('pointer', false),
      },
    },
    computed: {
      classes() {
        return {
          button: true,
          'button--block': this.block,
          'button--small': this.small,
          'button--round': this.round,
          'button--bold': this.bold,
          'button--theme-color': this.themeColor,
          'button--disabled': this.disabled,
          'button--danger': this.bgDanger,
          'button--bg-caution': this.bgCaution,
          'button--bg-white': this.bgWhite,
          'button--pointer': this.pointer,
        };
      },
    },
  }
},{ notes: note });