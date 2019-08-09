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
                :themeColor="themeColor"
                :danger="danger"
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('default:small', () => {
  return {
    template: `<app-router-link
                :to="url"
                :small="small"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      small: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('default:large', () => {
  return {
    template: `<app-router-link
                :to="url"
                :large="large"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      large: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('bgThemeColor', () => {
  return {
    template: `<app-router-link
                :bgThemeColor="bgThemeColor"
                :to="url"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      bgThemeColor: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('bgThemeColor:small', () => {
  return {
    template: `<app-router-link
                :bgThemeColor="bgThemeColor"
                :small="small"
                :to="url"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      bgThemeColor: {
        type: Boolean,
        default: true,
      },
      small: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('bgThemeColor:large', () => {
  return {
    template: `<app-router-link
                :bgThemeColor="bgThemeColor"
                :large="large"
                :to="url"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      bgThemeColor: {
        type: Boolean,
        default: true,
      },
      large: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('bgDanger', () => {
  return {
    template: `<app-router-link
                :bgDanger="bgDanger"
                :to="url"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      bgDanger: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('bgDanger:small', () => {
  return {
    template: `<app-router-link
                :bgDanger="bgDanger"
                :small="small"
                :to="url"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      bgDanger: {
        type: Boolean,
        default: true,
      },
      small: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('bgDanger:large', () => {
  return {
    template: `<app-router-link
                :bgDanger="bgDanger"
                :large="large"
                :to="url"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      bgDanger: {
        type: Boolean,
        default: true,
      },
      large: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('bgLightGreen', () => {
  return {
    template: `<app-router-link
                :bgLightgreen="bgLightgreen"
                :to="url"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      bgLightgreen: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('bgLightGreen:small', () => {
  return {
    template: `<app-router-link
                :bgLightgreen="bgLightgreen"
                :small="small"
                :to="url"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      bgLightgreen: {
        type: Boolean,
        default: true,
      },
      small: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })
.add('bgLightGreen:large', () => {
  return {
    template: `<app-router-link
                :bgLightgreen="bgLightgreen"
                :large="large"
                :to="url"
                :block="block"
                :under-line="underLine"
                :themeColor="themeColor"
                :danger="danger"
                :white="white"
                :round="round"
              >
                テキストが入ります
              </app-router-link>
              `,
    props: {
      bgLightgreen: {
        type: Boolean,
        default: true,
      },
      large: {
        type: Boolean,
        default: true,
      },
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
      themeColor: {
        type: Boolean,
        default: boolean('themeColor', false),
      },
      danger: {
        type: Boolean,
        default: boolean('danger', false),
      },
      white: {
        type: Boolean,
        default: boolean('white', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      hoverOpacity: {
        type: Boolean,
        default: boolean('hoverOpacity', false),
      },
      hoverUnderline: {
        type: Boolean,
        default: boolean('hoverUnderline', false),
      }
    }
  }
}, { notes: note })