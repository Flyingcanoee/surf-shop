import { shallowMount } from '@vue/test-utils';
import Footer from '../Footer.vue';

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(Footer, {});
  expect(wrapper.is(Footer)).toBeTruthy();
});

afterEach(() => {
  wrapper.destroy();
});

describe('Footer', () => {
  test("has 'footer-wrapper' class", () => {
    expect(wrapper.find('.footer-wrapper').exists()).toBe(true);
  });
});

describe('Footer', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
});

describe('Footer', () => {
  it('renders a valid snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
