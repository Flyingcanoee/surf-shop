<template>
  <div class="sign-up-form">
    <img :src="octopus" class="sign-up-form__octopus" />
    <form novalidate @submit.prevent="onSubmitValidateForm">
      <button class="sign-up-form__cross active" @click="onClickCloseForm">
        <img :src="cross" alt="cross-icon" />
      </button>
      <h1 class="sign-up-form__heading">SIGN UP</h1>
      <input-form
        category="Last Name"
        :error="lastNameError"
        :class="onInputValidateField('lastName')"
        @input="(inputValue) => onInputChangeValue('lastName', inputValue)"
      />
      <SelectField
        category-name="Gender"
        :categories="genders"
        class="sign-up-form__select"
      />
      <input-form
        category="Phone number"
        :error="phoneError"
        :class="onInputValidateField('phoneNumber')"
        @input="(inputValue) => onInputChangeValue('phoneNumber', inputValue)"
      />
      <input-form
        category="Email"
        :error="emailError"
        :class="onInputValidateField('email')"
        @input="(inputValue) => onInputChangeValue('email', inputValue)"
      />
      <div class="sign-up-form__buttons">
        <base-button
          class="sign-up-form__button save"
          type="submit"
          @click="onSubmitValidateForm()"
        >
          SAVE
        </base-button>
        <button @click="onClickShowSignInForm()">SIGN IN</button>
      </div>
    </form>
  </div>
</template>

<script>
import InputForm from './InputForm.vue';
import SelectField from '@/components/SelectField/SelectField.vue';
import { BaseButton } from '@/base_components';
import { validationMixin } from 'vuelidate';
import octopus from '@/assets/Icons/octopus.svg';
import cross from '@/assets/Icons/cross.png';
import {
  MIN_NAME_LENGTH,
  NAME_VALID,
  EMAIL_VALID,
  formMixin,
  PHONE_VALID
} from './helper';
const GENDERS = ['not specified', 'male', 'female'];

export default {
  name: 'SignInForm',

  components: {
    InputForm,
    BaseButton,
    SelectField
  },

  mixins: [validationMixin, formMixin],

  data() {
    return {
      email: '',
      lastName: '',
      phoneNumber: '',
      genders: GENDERS,

      validData: {
        hasLastName: false,
        hasEmail: false,
        hasPhoneNumber: false
      },

      selectedDate: null,
      octopus: octopus,
      cross: cross
    };
  },

  computed: {
    lastNameError() {
      if (!this.$v.lastName.required) {
        this.failedValidData('hasLastName');

        return 'The last name is required';
      }

      if (!this.$v.lastName.minLength || !this.$v.lastName.alpha) {
        this.failedValidData('hasLastName');

        return `Must contain only latin letters, at least ${MIN_NAME_LENGTH} symbols`;
      }

      return this.successValidData('hasLastName');
    },

    emailError() {
      if (!this.$v.email.required) {
        this.failedValidData('hasEmail');

        return 'The email is required';
      }

      if (!this.$v.email.email) {
        this.failedValidData('hasEmail');

        return 'Invalid email';
      }

      return this.successValidData('hasEmail');
    },

    phoneError() {
      if (!this.$v.phoneNumber.minLength) {
        this.failedValidData('hasPhoneNumber');

        return 'Too short number';
      }

      return this.successValidData('hasPhoneNumber');
    }
  },

  methods: {
    onInputChangeValue(category, inputValue) {
      this[category] = inputValue;
    },

    failedValidData(hasCategory) {
      this.validData[hasCategory] = false;
    },

    successValidData(hasCategory) {
      this.validData[hasCategory] = true;
    },

    isDateDisabled(date) {
      return new Date() < date;
    },

    onClickShowSignInForm() {
      this.$emit('sign-in');
    },

    onClickCloseForm() {
      this.$emit('close-form');
    }
  },

  validations: {
    lastName: NAME_VALID,
    email: EMAIL_VALID,
    phoneNumber: PHONE_VALID
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.sign-up-form {
  display: none;
  width: 330px;
  padding: 0px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  background-color: $white;
  border: 1px solid black;
  left: calc(50% - 165px);
  top: 35vh;
  box-shadow: 0px 24px 93px 3px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  z-index: 4;

  &__heading {
    font-size: 30px;
    margin-top: 30px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
  }

  &.active {
    display: flex;
  }
  &__octopus {
    position: absolute;
    left: -90px;
    top: -210px;
    width: 500px;
    max-width: none;
    z-index: -10;
  }
  @media screen and (max-width: $tablet-size) {
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &__cross {
    display: flex;
    position: absolute;
    left: calc(50% - 130px);
    top: -20px;
    width: 40px;
    padding: 9px;
    border-radius: 50%;
    border: 2px solid #63676c;
    align-self: flex-end;
    background-color: $white;
  }

  .sign-in__error {
    text-align: center;
    color: $error;
  }

  &__select {
    width: 100%;
    min-width: 250px;
    position: relative;
    z-index: 5;
    margin-top: 30px;
    border: 1px solid rgb(211, 210, 210);
    border-radius: 5px;

    &::v-deep .select-field__category {
      left: 30px;
      font-size: 12px;
      font-weight: lighter;
      font-family: Arial, Helvetica, sans-serif;
      text-transform: lowercase;
      font-style: normal;
      color: #b3b4b6;
    }
    &::v-deep .select-field {
      width: 100%;
      padding: 0 0 0 inherit;
      margin: 30px 0 0 0;
    }
    &::v-deep .dropdown {
      width: 100%;
      position: absolute;
    }
  }

  &__avatar {
    border-radius: 50%;
    width: 20vh;
    height: 20vh;
    min-width: 100px;
    min-height: 100px;
  }

  .sign-up-form__buttons {
    margin: 10% 0;

    .sign-up-form__button {
      width: 100px;
      border: 0.5px solid $font-color-text;
      padding: 5px 0px;
      margin: 0px 10px;
      border-radius: 5px;
    }

    .save {
      color: $primary;
    }
    .cancel {
      color: $error;
    }
  }
}
</style>

<style>
.sign-up-form .select-field__button {
  height: 6vh;
  max-height: 50px;
  border: none;
}
</style>
