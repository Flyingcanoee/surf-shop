<template>
  <div class="photo-slider__wrapper">
    <div class="photo-slider__image">
      <photo-slide-item
        v-for="(slide, i) in slides"
        :key="i"
        :direction="direction"
      >
        <img v-if="slideNumber === i" :src="slide" alt="No image" />
      </photo-slide-item>
    </div>
  </div>
</template>

<script>
import PhotoSlideItem from '@/components/Slider/PhotoSlider/PhotoSlideItem';

export default {
  name: 'PhotoSlider',
  components: { PhotoSlideItem },

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
    },

    direction: {
      type: String,
      default: 'right',
      required: true
    }
  },

  computed: {
    slidesCount() {
      return this.slides.length;
    },
    activeBtnStyle() {
      return (btnNum) => {
        return this.slideNumber === btnNum - 1 ? 'active' : '';
      };
    }
  },

  methods: {
    onClickGoTo(index) {
      this.$emit('onSelectSlide', index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.photo-slider__wrapper {
  position: relative;
  flex-grow: 1;
}

.photo-slider__image {
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    rotate: 90deg;
    max-height: 350px;
  }
}
</style>
