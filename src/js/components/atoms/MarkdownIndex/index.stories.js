import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import note from './README.md';

storiesOf('ATOMS|MarkdownIndex', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `<app-markdown-index
                  :markdown-indexes="markdownIndexes"
                />`,
      data() {
        return {
          markdownIndexes: [{"tagName":"h1","val":"h1-0","title":"componentsについて","scrollToY":135},{"tagName":"h2","val":"h2-1","title":"このレッスンでやること","scrollToY":233},{"tagName":"h2","val":"h2-2","title":"コンポーネント指向について","scrollToY":434},{"tagName":"h2","val":"h2-3","title":"componentsについて","scrollToY":713}],
        };
      },
    };
  },{ notes: note });
