<template>
  <div>
    <div>
      <shown-rating :rating="rating" />
    </div>
  </div>
</template>

<script>
import ShownRating from '@/components/RatingIcon/ShownRating.vue';

export default {
  name: 'RatingIcon',

  components: { ShownRating },

  props: {
    rating: {
      type: Number,
      default: 0
    }
  }
};
</script>
