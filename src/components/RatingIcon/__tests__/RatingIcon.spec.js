import { mount } from '@vue/test-utils';
import RatingIcon from '@/components/RatingIcon/RatingIcon';

let wrapper;
const isEditable = false;
const rating = 3;

beforeEach(() => {
  wrapper = mount(RatingIcon, {
    propsData: {
      isEditable,
      rating
    }
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('RatingIcon', () => {
  it('should return correct props', () => {
    expect(wrapper.props().rating).toBe(rating);
  });
  it('editable rating is not displayed initially', () => {
    expect(wrapper.find('.star-rating--form').exists()).toBe(false);
  });
  it('is should render rating icon for user', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
