import { shallowMount } from '@vue/test-utils';
import ProductsFilter from '../ProductsFilter.vue';

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ProductsFilter, {
    propsData: {
      isHorizontal: false
    }
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('FilterComponent', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('should return correct props', () => {
    expect(wrapper.props().isHorizontal).toBe(false);
  });

  test('should open/close custom select and show/hide the options', async () => {
    const selectField = wrapper.find('.custom-select__selected');

    expect(wrapper.find('.custom-select__selected').exists()).toBe(true);

    await selectField.trigger('click');
    expect(wrapper.find('.custom-select__options').exists()).toBe(true);

    await selectField.trigger('click');
    expect(wrapper.find('.custom-select__options').exists()).toBe(false);
  });

  test('filter items should be clickable ', async () => {
    const filterItem = wrapper.findAll('.filter-block__item');

    await filterItem.trigger('click');
    expect(wrapper.findAll('.filter-block__item').length).toBe(2);
  });

  test('first filter element should not have active class but second shoud have', () => {
    const filterItem = wrapper.findAll('.filter-block__item');

    expect(filterItem.at(0).findAll('.active').length).toBe(0);
    expect(filterItem.at(1).findAll('.active').length).toBe(1);
  });

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
