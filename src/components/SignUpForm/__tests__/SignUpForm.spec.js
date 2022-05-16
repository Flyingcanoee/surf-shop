import SignUpForm from '../SignUpForm.vue';
import { shallowMount } from '@vue/test-utils';

describe('SignUpForm', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(SignUpForm);

    expect(wrapper.element).toMatchSnapshot();
  });
  it('shows last name error', () => {
    const wrapper = shallowMount(SignUpForm, {
      data() {
        return { lastName: '1' };
      }
    });

    expect(wrapper.vm.lastNameError).toBe(
      'Must contain only latin letters, at least 2 symbols'
    );
  });

  it('shows email error', () => {
    const wrapper = shallowMount(SignUpForm, {
      data() {
        return { email: 'email' };
      }
    });

    expect(wrapper.vm.emailError).toBe('Invalid email');
  });
});
