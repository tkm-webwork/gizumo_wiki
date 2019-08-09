import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import note from './README.md';

storiesOf('ATOMS|Text', module)
.addDecorator(withKnobs)
.add('default', () => {
  return {
    template: `
              <app-text
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
                :themeColor="themeColor"
                :error="error"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      error: {
        type: Boolean,
        default: boolean('error', false),
      }
    },
  };
}, {notes: note})
.add('default:exSmall', () => {
  return {
    template: `
              <app-text
                :exSmall="exSmall"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
                :themeColor="themeColor"
                :error="error"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      exSmall: {
        type: Boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      error: {
        type: Boolean,
        default: boolean('error', false),
      }
    },
  };
}, {notes: note})
.add('default:small', () => {
  return {
    template: `
              <app-text
                :small="small"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
                :themeColor="themeColor"
                :error="error"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      small: {
        type: Boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      error: {
        type: Boolean,
        default: boolean('error', false),
      }
    },
  };
}, {notes: note})
.add('default:large', () => {
  return {
    template: `
              <app-text
                :large="large"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
                :themeColor="themeColor"
                :error="error"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      large: {
        type: Boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      error: {
        type: Boolean,
        default: boolean('error', false),
      }
    },
  };
}, {notes: note})
.add('bgSuccess', () => {
  return {
    template: `
              <app-text
                :bgSuccess="bgSuccess"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
                :error="error"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      bgSuccess: {
        type: boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
    },
  };
}, {notes: note})
.add('bgSuccess:exSmall', () => {
  return {
    template: `
              <app-text
                :exSmall="exSmall"
                :bgSuccess="bgSuccess"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
                :error="error"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      exSmall: {
        type: Boolean,
        default: true,
      },
      bgSuccess: {
        type: boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
    },
  };
}, {notes: note})
.add('bgSuccess:small', () => {
  return {
    template: `
              <app-text
                :small="small"
                :bgSuccess="bgSuccess"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
                :error="error"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      small: {
        type: Boolean,
        default: true,
      },
      bgSuccess: {
        type: boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
    },
  };
}, {notes: note})
.add('bgSuccess:large', () => {
  return {
    template: `
              <app-text
                :large="large"
                :bgSuccess="bgSuccess"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
                :error="error"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      large: {
        type: Boolean,
        default: true,
      },
      bgSuccess: {
        type: boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
    },
  };
}, {notes: note})
.add('bgError', () => {
  return {
    template: `
              <app-text
                :bgError="bgError"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      bgError: {
        type: Boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
      error: {
        type: Boolean,
        default: boolean('error', false),
      }
    },
  };
}, {notes: note})
.add('bgError:exSmall', () => {
  return {
    template: `
              <app-text
                :exSmall="exSmall"
                :bgError="bgError"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      exSmall: {
        type: Boolean,
        default: true,
      },
      bgError: {
        type: Boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
      error: {
        type: Boolean,
        default: boolean('error', false),
      }
    },
  };
}, {notes: note})
.add('bgError:small', () => {
  return {
    template: `
              <app-text
                :small="small"
                :bgError="bgError"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      small: {
        type: Boolean,
        default: true,
      },
      bgError: {
        type: Boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
      error: {
        type: Boolean,
        default: boolean('error', false),
      }
    },
  };
}, {notes: note})
.add('bgError:large', () => {
  return {
    template: `
              <app-text
                :large="large"
                :bgError="bgError"
                :tag="tag"
                :bold="bold"
                :inlineBlock="inlineBlock"
              >
                テキストが入ります。
              </app-text>`,
    props: {
      large: {
        type: Boolean,
        default: true,
      },
      bgError: {
        type: Boolean,
        default: true,
      },
      tag: {
        type: String,
        default: text('tag', 'p'),
      },
      bold: {
        type: Boolean,
        default: boolean('bold', false),
      },
      inlineBlock: {
        type: Boolean,
        default: boolean('inlineBlock', false),
      },
      error: {
        type: Boolean,
        default: boolean('error', false),
      }
    },
  };
}, {notes: note})