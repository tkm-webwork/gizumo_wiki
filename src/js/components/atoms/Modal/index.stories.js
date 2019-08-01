import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import Mixins from '../../../_helpers/mixins.js';
import note from './README.md';

storiesOf('ATOMS|Modal', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: 
        `
          <div>
            <app-button
              @click="openModal"
            >
              このクリックするとモーダルが開きます
            </app-button>
            <app-modal>
              <p>ここにモーダルのコンテンツが入ります</p>
            </app-modal>
          </div>
        `,
      mixins: [Mixins],
      methods: {
        openModal() {
          this.toggleModal();
        },
      },
    }
  }, { notes: note });