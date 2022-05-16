import { createLocalVue, shallowMount } from '@vue/test-utils';
import ProductInfo from '../ProductInfo.vue';

describe('ProductInfo', () => {
  let wrapper;
  const testName = 'name';
  const testDate = 'January 31, 2022, 00:00:00';
  const testPrice = 130;
  const name = () => wrapper.find('.product-info__name');
  const date = () => wrapper.find('.product-info__date');
  const localVue = createLocalVue();
  const renderWrapper = () => {
    wrapper = shallowMount(ProductInfo, {
      localVue,
      propsData: {
        name: testName,
        date: testDate,
        price: testPrice
      }
    });
  };

  beforeAll(() => {
    renderWrapper();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('computed property "getDate" should return date in the format "DD.MM.YYYY"', () => {
    expect(wrapper.vm.getDate).toBe('31.01.2022');
  });

  it('should display: name; date in the format "DD.MM.YYYY"; price in the format "130.0 $" to the user', () => {
    expect(name().text()).toBe(testName);
    expect(date().text()).toBe(`${wrapper.vm.getDate}`);
  });
});
