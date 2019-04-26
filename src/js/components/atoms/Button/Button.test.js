import assert from 'assert';
import { shallowMount } from '@vue/test-utils';
import { Button } from '@Components/atoms';

describe('Button', () => {
  let wrapper;
  beforeEach(() => {
     wrapper = shallowMount(Button)
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a button', () => {
    assert.equal(wrapper.contains('button'), true);
  });
});
