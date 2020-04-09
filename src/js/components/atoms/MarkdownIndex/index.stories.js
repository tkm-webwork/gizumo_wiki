import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';

import note from './README.md';

const defaultValue = [
  {
    "tagName":"h1",
    "val":"h1-0",
    "title":"componentsについて",
    "scrollToY":135
  },
  {
    "tagName":"h2",
    "val":"h2-1",
    "title":"このレッスンでやること",
    "scrollToY":233
  },
  {
    "tagName":"h2",
    "val":"h2-2",
    "title":"コンポーネント指向について",
    "scrollToY":434
  },
  {
    "tagName":"h2",
    "val":"h2-3",
    "title":"componentsについて",
    "scrollToY":713
  }
];

storiesOf('ATOMS|MarkdownIndex', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `<app-markdown-index
                  :markdown-indexes="markdownIndexes"
                />`,
      props: {
        markdownIndexes: {
          type: Array,
          default: object('markdownIndexes', defaultValue),
        },
      },
    };
  },{ notes: note });
