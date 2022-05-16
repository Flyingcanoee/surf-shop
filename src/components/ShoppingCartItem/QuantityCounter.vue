<template>
  <div class="quantity__wrapper">
    <base-text-filled-button @click="onClickDecreaseQuantity"
      >-</base-text-filled-button
    >
    <input readonly :value="quantity" class="quantity__field" />
    <base-text-filled-button @click="onClickIncreaseQuantity"
      >+</base-text-filled-button
    >
  </div>
</template>

<script>
import { BaseTextFilledButton } from '@/base_components';

export default {
  name: 'QuantityCounter',

  components: { BaseTextFilledButton },

  props: {
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  },

  methods: {
    onClickIncreaseQuantity() {
      this.$emit('increase');
    },

    onClickDecreaseQuantity() {
      this.$emit('decrease');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.quantity__wrapper {
  display: flex;
  border: 1px solid #cccbcb;
  max-height: 30px;
  max-width: 93px;
}

.quantity__field {
  width: 30px;
  text-align: center;
  border-left: 1px solid #b7b7b7;
  border-right: 1px solid #b7b7b7;
  pointer-events: none;
}
</style>

<style lang="scss">
.quantity__wrapper .base-text-filled-button.custom-black {
  background-color: white;
  height: 28px;
  width: 30px;
  color: black;
  padding: 4px 12px;
  box-shadow: none;
  border-radius: 0px;
  &:hover {
    background-color: rgb(238, 238, 238);
  }
}
</style>
