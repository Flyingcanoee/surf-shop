<template>
  <div class="slider">
    <div :class="{ slider__discount: discount }">
      {{ getDiscountPercentage }}
    </div>
    <mini-gallery
      :slides="images"
      :slide-number="slideNumber"
      @onSelectSlide="onSelectSlide"
    />
    <photo-slider
      :slide-number="slideNumber"
      :slides="images"
      :direction="direction"
      @onSelectSlide="onSelectSlide"
    />
  </div>
</template>

<script>
import PhotoSlider from '@/components/Slider/PhotoSlider/PhotoSlider';
import MiniGallery from '@/components/Slider/MiniGallery/MiniGallery';

export default {
  name: 'Slider',

  components: { PhotoSlider, MiniGallery },

  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    },

    discount: {
      type: Number,
      default: 0
    }
  },

  data: () => ({
    direction: 'right',
    slideNumber: 0
  }),

  computed: {
    getDiscountPercentage() {
      return this.discount > 0 ? `${this.discount}%` : '';
    }
  },

  methods: {
    onSelectSlide(i) {
      this.direction = i > this.slideNumber ? 'right' : 'left';
      this.slideNumber = i;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.slider {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
  width: 100%;
  position: relative;
  @media screen and (max-width: $tablet-size) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
  &__discount {
    color: $white;
    border-radius: 20px;
    position: absolute;
    top: 30px;
    right: 20px;
    background-color: #eebaba;
    padding: 6px 16px;
    width: fit-content;
    font-size: 12px;
    z-index: 10;
  }
}
</style>
