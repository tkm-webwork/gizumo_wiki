import assert from 'assert';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { RouterLink } from '@Components/atoms';

const factory = (propsData, slots) => {
  return shallowMount(RouterLink, {
    stubs: {
      RouterLink: RouterLinkStub,
    },
    propsData: {
      ...propsData
    },
    slots: {
      ...slots
    },
  });
};

describe('Router Link', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory();
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a a tag', () => {
    assert.equal(wrapper.contains(RouterLinkStub), true);
  });

  it('has a only "router-link" class', () => {
    assert.equal(wrapper.classes(), 'router-link');
  });

  it('has default attributes', () => {
    assert.equal(wrapper.props().to, '');
    assert.equal(wrapper.props().activeClass, '');
    assert.equal(wrapper.props().exactActiveClass, '');
  });
});

describe('Router Link with slot', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory(null, {
      default: '<span>router link</span>',
    });
  });

  it('has text as slot', () => {
    assert.equal(wrapper.contains('span'), true);
    assert.equal(wrapper.find('span').text(), 'router link');
  });
});
