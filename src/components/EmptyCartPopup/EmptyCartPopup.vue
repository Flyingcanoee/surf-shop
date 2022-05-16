<template>
  <div class="popup">
    <div class="popup__body" @click="onClickClosePopup">
      <div class="popup__content" @click.stop>
        <div class="popup__close-icon">
          <i
            class="md-icon md-icon-font md-theme-default close-popup"
            @click="onClickClosePopup"
            >close
          </i>
        </div>

        <div class="popup__text">
          Do you want to remove all the products from the cart?
        </div>

        <div class="popup__buttons-wrapper">
          <base-text-filled-button
            class="popup__button-delete"
            @click="onClickClearShoppingCart"
          >
            Yes</base-text-filled-button
          >

          <base-text-border-button
            class="popup__button-close"
            @click="onClickClosePopup"
            >No</base-text-border-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseTextFilledButton, BaseTextBorderButton } from '@/base_components/';

export default {
  name: 'EmptyCartPopup',

  components: { BaseTextFilledButton, BaseTextBorderButton },

  methods: {
    onClickClosePopup() {
      this.$emit('close');
    },

    onClickClearShoppingCart() {
      this.$emit('clear-cart');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.popup {
  position: fixed;
  background: $background-disabled;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: $z-index-popup;

  &__body {
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 40px;
    flex-direction: column;
  }

  &__content {
    background: $white;
    color: $font-color-title;
    max-width: 400px;
    padding: 14px;
    font-size: $font-size-basic;
    box-shadow: $shadow;
    position: relative;
    border: 1px solid $white;
    border-radius: 15px;
  }

  &__close-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  &__text {
    margin: 30px 20px;
  }

  &__buttons-wrapper {
    display: flex;
    justify-content: center;
    margin: 30px 20px 20px 20px;
  }

  &__button-delete,
  &__button-close {
    width: 120px;
    margin: 0 20px;
  }
}
</style>
