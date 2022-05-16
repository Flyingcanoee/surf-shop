<template>
  <div
    :class="[
      { 'product-description_horizontal': isHorizontal },
      'product-description'
    ]"
  >
    <h2 class="product-description__title">{{ title }}</h2>
    <p class="product-description__category">{{ getCategory }}</p>
    <rating-icon class="product-description__rating-icon" :rating="rating" />
    <p class="product-description__date">{{ date }}</p>
  </div>
</template>

<script>
import RatingIcon from '../RatingIcon/RatingIcon.vue';

export default {
  name: 'ProductDescription',

  components: { RatingIcon },

  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },

    category: {
      type: String,
      required: true,
      default: ''
    },

    rating: {
      type: Number,
      required: true,
      default: 0
    },

    isHorizontal: {
      type: Boolean,
      required: true,
      default: false
    },

    date: {
      type: String,
      default: ''
    }
  },

  computed: {
    getCategory() {
      return this.category ? this.category : 'Category';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.product-description {
  color: #8b8a8a;
  text-align: start;
  width: 100%;
  margin: 15px 0;

  &_horizontal {
    margin: 0 15px;

    @media screen and (max-width: $tablet-size) {
      margin: 15px;
    }
  }

  &__category {
    font-weight: bold;
    margin-bottom: 7px;
  }

  &__title {
    color: $primary;
    margin-bottom: 7px;
    font-size: 1.1rem;
  }

  &__rating-icon {
    margin-top: 10px;
  }

  &__date {
    margin-top: 10px;
  }
}
</style>
