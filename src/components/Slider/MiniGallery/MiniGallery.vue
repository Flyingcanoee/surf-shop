<template>
  <div class="mini-gallery__wrapper">
    <div v-for="(slide, i) in slides" :key="i" :class="itemClass(i)">
      <img :src="slide" @click="onClickImageSelectSlide(i)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiniGallery',

  props: {
    slideNumber: {
      type: Number,
      default: 0,
      required: true
    },

    slides: {
      type: Array,
      default: () => [],
      required: true
    }
  },

  methods: {
    onClickImageSelectSlide(id) {
      this.$emit('onSelectSlide', id);
    },

    itemClass(i) {
      return `mini-gallery__item${this.slideNumber === i ? '_active' : ''}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.mini-gallery__item {
  display: flex;
  border: none;
  border-radius: 10px;
  padding: 10px;

  &_active {
    border: 1px solid rgb(197, 197, 197);
    border-radius: 10px;
    padding: 5px;

    img {
      border-radius: 10px;
    }
  }
}

.mini-gallery__wrapper {
  display: flex;
  flex-direction: column;
  width: 100px;
  flex-shrink: 0;
  gap: 10px;
}

@media screen and (max-width: $tablet-size) {
  .mini-gallery__wrapper {
    flex-direction: row;
    width: 100%;
  }

  .mini-gallery__item > img {
    object-fit: cover;
  }
}
</style>
