<template>
  <base-custom-icon
    class="trash-icon"
    :width="25"
    icon="delete"
    @click="onClickDeleteItem"
  />
</template>

<script>
import { BaseCustomIcon } from '@/base_components/';

export default {
  name: 'ShoppingCartTrashIcon',

  components: {
    BaseCustomIcon
  },

  methods: {
    onClickDeleteItem() {
      this.$emit('delete-item');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.trash-icon {
  cursor: pointer;
}
</style>
