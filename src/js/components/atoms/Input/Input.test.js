import assert from 'assert';
import { shallowMount } from '@vue/test-utils';
import { Input } from '@Components/atoms';

const factory = (propsData) => {
  return shallowMount(Input, {
    propsData: {
      ...propsData
    },
  });
};

describe('Input', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory();
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a input tag', () => {
    assert.equal(wrapper.contains('input'), true);
  });

  it('has a default value', () => {
    assert.equal(wrapper.element.value, '');
  });

  it('has a default type attribute', () => {
    assert.equal(wrapper.attributes('type'), 'text');
  });

  it('has only "input" class', () => {
    assert.equal(wrapper.classes(), 'input');
  });

  it('has a default name attribute', () => {
    assert.equal(wrapper.attributes('name'), 'inputName');
  });

  it('has a default placeholder attribute', () => {
    assert.equal(wrapper.attributes('placeholder'), '入力してください');
  });

  it('has a default required attribute', () => {
    assert.equal(wrapper.attributes('required'), 'required');
  });
});

describe('Input with props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory({
      name: 'testInput',
      type: 'email',
      placeholder: 'テスト',
      required: false,
      value: 'テスト',
      whiteBg: true,
    });
  });

  it('has a props value', () => {
    assert.equal(wrapper.element.value, 'テスト');
  });

  it('has a props type attribute', () => {
    assert.equal(wrapper.attributes('type'), 'email');
  });

  it('has props classes', () => {
    assert.deepEqual(wrapper.classes(), [
      'input',
      'input--white-bg',
    ]);
  });

  it('has a props name attribute', () => {
    assert.equal(wrapper.attributes('name'), 'testInput');
  });

  it('has a props placeholder attribute', () => {
    assert.equal(wrapper.attributes('placeholder'), 'テスト');
  });

  it('does\'t have a required attribute', () => {
    assert.equal(wrapper.attributes('required'), undefined);
  });

  it('has emitted "input" event when input value was changed', () => {
    wrapper.trigger('input');
    assert.ok(wrapper.emitted().updateValue);
  });
});
