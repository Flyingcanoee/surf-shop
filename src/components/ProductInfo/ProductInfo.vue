<template>
  <div class="product-info">
    <div class="product-info__content">
      <div class="product-info__name">{{ name }}</div>
      <div class="product-info__date">{{ getDate }}</div>
    </div>
    <div v-if="discountPercentage">
      <span class="product-info__price">
        {{ priceWithDiscount | currency }}
      </span>
      <span :class="{ 'product-info__crossed': discountPercentage }">
        {{ price | currency }}
      </span>
    </div>
    <div v-else class="product-info__price">{{ price | currency }}</div>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'ProductInfo',

  props: {
    name: {
      type: String,
      default: ''
    },

    date: {
      type: String,
      default: ''
    },

    price: {
      type: Number,
      required: true,
      default: 0
    },

    discountPercentage: {
      type: Number,
      default: 0
    },

    priceWithDiscount: {
      type: Number,
      default: 0
    }
  },

  computed: {
    getDate() {
      return format(new Date(this.date), 'DD.MM.YYYY');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 30px 20px;
  border-bottom: solid 1px #e6e6e6;

  &__content {
    text-align: left;
  }
  &__name {
    font-size: $font-size-subtitle;
    color: $font-color-title;
    @media screen and (max-width: $mobile-size) {
      font-size: $font-size-basic;
    }
  }

  &__date {
    font-size: $font-size-basic;
    color: $font-color-text;
    font-size: 15px;
    margin-top: 10px;
  }

  &__price {
    font-size: $font-size-title;
    color: $font-color-title;
    white-space: nowrap;
    font-size: 28px;
    color: $font-color-subtitle;
  }

  &__crossed {
    text-decoration: line-through;
    color: $font-color-subtitle;
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>
