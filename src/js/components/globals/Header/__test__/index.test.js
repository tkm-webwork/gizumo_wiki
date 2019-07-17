import assert from 'assert';
import { mount, shallowMount } from '@vue/test-utils';
import { Header } from '@Components/globals';
import { Heading, RouterLink } from '@Components/atoms';

describe('Header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Header);
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a header tag', () => {
    assert.equal(wrapper.is('header'), true);
    assert.equal(wrapper.contains(Heading), true);
    assert.equal(wrapper.contains(RouterLink), true);
  });

  it('has Heading & RouterLink components', () => {
    assert.equal(wrapper.contains(Heading), true);
    assert.equal(wrapper.contains(RouterLink), true);
  });
});
