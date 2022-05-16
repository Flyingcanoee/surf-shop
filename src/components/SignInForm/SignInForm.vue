<template>
  <form class="sign-in-form" novalidate @submit.prevent="onSubmitValidateForm">
    <button class="sign-in-form__cross active" @click="onClickCloseForm">
      <img :src="cross" alt="cross-icon" />
    </button>
    <img :src="shark" class="sign-in-form__shark" />
    <h1 class="sign-in-form__heading">LOGIN</h1>
    <!-- <input-form
      category="Phone number"
      :error="phoneError"
      :class="onInputValidateField('phoneNumber')"
      @input="(inputValue) => onInputChangeValue('phoneNumber', inputValue)"
    /> -->
    <input-form
      category="Email"
      :error="emailError"
      :class="onInputValidateField('email')"
      @input="(inputValue) => onInputChangeValue('email', inputValue)"
    />
    <input-form
      category="Password"
      :error="passwordError"
      :class="onInputValidateField('password')"
      @input="(inputValue) => onInputChangeValue('password', inputValue)"
    />
    <div class="sign-in-form__buttons">
      <base-button
        class="sign-in-form__button save"
        type="submit"
        @click="onSubmitValidateForm()"
      >
        SAVE
      </base-button>
      <button @click="onClickShowSignInForm()">SIGN UP</button>
    </div>
  </form>
</template>

<script>
import InputForm from './InputForm.vue';
import { BaseButton } from '@/base_components';
import { validationMixin } from 'vuelidate';
import shark from '@/assets/Icons/Shark.png';
import cross from '@/assets/Icons/cross.png';
import { EMAIL_VALID, formMixin, PASSWORD_VALID } from './helper';
const GENDERS = ['not specified', 'male', 'female'];

export default {
  name: 'SignInForm',

  components: {
    InputForm,
    BaseButton
  },

  mixins: [validationMixin, formMixin],

  data() {
    return {
      email: '',
      password: '',

      validData: {
        hasEmail: false,
        hasPassword: false
      },

      selectedDate: null,
      shark: shark,
      cross: cross
    };
  },

  computed: {
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
    passwordError() {
      if (!this.$v.password.required) {
        this.failedValidData('hasPassword');

        return 'The password is required';
      }

      if (!this.$v.password.password) {
        this.failedValidData('hasPassword');

        return 'Password should be more than 6 symbols';
      }

      return this.successValidData('hasPassword');
    }

    // passwordError() {
    //   if (!this.$v.password.minLength) {
    //     this.failedValidData('hasPassword');

    //     return 'Too short password';
    //   }

    //   return this.successValidData('hasPassword');
    // }
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
    password: PASSWORD_VALID,
    email: EMAIL_VALID
    // phoneNumber: PHONE_VALID
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.sign-in-form {
  display: none;
  width: 300px;
  padding: 10px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  background-color: $white;
  border: 1px solid black;
  left: calc(50% - 150px);
  top: 30vh;
  box-shadow: 0px 24px 93px 3px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  z-index: 4;

  &__cross {
    display: none;
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

  &.active {
    display: flex;
  }

  &__heading {
    align-self: flex-start;
    font-size: 40px;
    margin-top: 60px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
  }
  &__shark {
    position: absolute;
    left: 80px;
    top: -100px;
    width: 400px;
    max-width: none;
    z-index: 7;
    border-radius: 0px 200px;
  }
  @media screen and (max-width: $tablet-size) {
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

  .sign-in-form__buttons {
    margin: 10% 0;

    .sign-in-form__button {
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
.sign-in-form .select-field__button {
  height: 6vh;
  max-height: 50px;
  border: none;
}
.sign-in-form__cross.active {
  display: flex;
  z-index: 5;
}
</style>
