<template>
  <BaseTextButton
    class="base-text-filled-button"
    :class="validColor"
    @click="onClickEmitEvent"
  >
    <slot></slot>
  </BaseTextButton>
</template>

<script>
import { BaseTextButton } from '@/base_components/';

export default {
  name: 'BaseTextFilledButton',

  components: {
    BaseTextButton
  },

  props: {
    color: {
      type: String,
      default: 'custom-black'
    }
  },

  computed: {
    validColor: function () {
      return ['custom-black', 'custom-red', 'costom-white'].indexOf(
        this.color
      ) !== -1
        ? this.color
        : 'custom-black';
    }
  },

  methods: {
    onClickEmitEvent() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.base-text-filled-button {
  box-shadow: $shadow;
  &.custom-black {
    color: $white;
    background-color: $primary;
    &:hover {
      background-color: $primary-hover;
    }
  }
  &.custom-red {
    color: $white;
    background-color: $error;
    &:hover {
      background-color: $error-hover;
    }
  }
  &.costom-white {
    color: $primary;
    background-color: $white;
    &:hover {
      background-color: $white-hover;
    }
  }
  &:disabled {
    background-color: $button-disabled-bg;
    color: $button-disabled-color;
    pointer-events: none;
  }
}
</style>
