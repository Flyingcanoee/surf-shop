import SignInForm from '../SignInForm.vue';
import { shallowMount } from '@vue/test-utils';

describe('SignInForm', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(SignInForm);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows email error', () => {
    const wrapper = shallowMount(SignInForm, {
      data() {
        return { email: 'email' };
      }
    });

    expect(wrapper.vm.emailError).toBe('Invalid email');
  });
});
