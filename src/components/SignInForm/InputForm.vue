<template>
  <div class="input-form">
    <div class="input-form__category">{{ category }}</div>
    <input
      class="input-form__input"
      :value="inputValue"
      @input="onInputChangeValue"
    />
    <span class="input-form__error-message">{{ error }}</span>
  </div>
</template>

<script>
import { setMask } from './mask.js';

export default {
  name: 'InputForm',

  props: {
    category: {
      type: String,
      default: ''
    },

    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      inputValue: ''
    };
  },

  methods: {
    onInputChangeValue(event) {
      if (this.category === 'Phone number') {
        this.getMaskedPhoneNumber(event.target.value);
      } else {
        this.inputValue = event.target.value;
      }
      this.$emit('input', this.inputValue);
    },

    getMaskedPhoneNumber(phoneNumber) {
      if (!this.inputValue) {
        this.inputValue = '+' + phoneNumber;
      } else {
        this.inputValue = phoneNumber;
      }
      this.inputValue = setMask(this.inputValue);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.input-form {
  position: relative;
  width: 100%;
  margin-top: 30px;
  border: 1px solid rgb(211, 210, 210);
  border-radius: 5px;
  min-width: 250px;
  max-width: 450px;
  max-height: 50px;

  &__error {
    border: 1px solid $error-hover;

    .input-form__error-message {
      color: $error-hover;
      position: absolute;
      display: block;
      margin-top: 3px;
      font-size: 12px;
    }
  }

  &__error-message {
    display: none;
  }

  &__input {
    width: 100%;
    border-radius: 5px;
    min-width: 120px;
    height: 5vh;
    padding: 0 10px;
  }
  &__category {
    background-color: $white;
    color: #b3b4b6;
    padding: 0 5px;
    position: absolute;
    top: -8px;
    left: 30px;
    font-size: 12px;
  }
}
</style>
