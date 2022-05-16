<template>
  <div class="welcome-title">
    <div class="welcome-title__left-part">
      <div class="welcome-title__caption">
        <div class="welcome-title__title both">
          {{ title }}
        </div>
        <div class="welcome-title__undertitle both">
          {{ underTitle }}
        </div>
      </div>
      <base-button-router class="welcome-title__surf-btn" path="/products">
        <img :src="surf" alt="surf-btn" />
        <span class="welcome-title__surf-btn-text">START SURFING</span>
      </base-button-router>
    </div>
    <div class="welcome-title__photo">
      <img
        :src="firstImage"
        alt="firstImage"
        class="welcome-title__firstImage"
      />
      <img
        :src="secondImage"
        alt="secondImage"
        class="welcome-title__secondImage"
      />
    </div>
  </div>
</template>

<script>
import firstImage from '@/assets/photos/surfing-girl.jpg';
import secondImage from '@/assets/photos/surf-jump-pink.jpg';
import surf from '@/assets/photos/surf-btn.png';
import { BaseButtonRouter } from '@/base_components/';

export default {
  name: 'WelcomeTitle',

  components: {
    BaseButtonRouter: BaseButtonRouter
  },

  data() {
    return {
      title: 'CATCH THE WAVE!',
      underTitle: 'CATCH THE WAVE!',
      firstImage: firstImage,
      secondImage: secondImage,
      surf: surf
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.page-container {
  margin: 0px;
  max-width: 2000px !important;
}

.welcome-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  &__left-part {
    position: relative;
  }

  &__caption {
    width: 50vw;
    height: 580px;
    position: relative;
  }

  .both {
    line-height: 121px;
    position: absolute;
    text-shadow: 0px 0px 2px black;
    letter-spacing: -0.06em;
    font-family: 'Archivo Black', sans-serif;
    font-style: italic;
    font-weight: 900;
    font-size: 120px;
  }

  &__title {
    color: #f6b6c7;
    z-index: 2;
  }
  &__undertitle {
    color: $white;
    left: 100px;
    top: 50px;
  }

  &__surf-btn {
    width: 300px;
    position: absolute;
    bottom: 0px;
    left: 20%;
    cursor: pointer;
  }
  &__surf-btn-text {
    position: absolute;
    bottom: 50px;
    width: 100%;
    left: -10px;
    font-family: 'Inter';
    font-style: italic;
    font-weight: 700;
    font-size: 17px;
    color: black;
  }

  &__photo {
    width: 40vw;
    height: 500px;
    min-width: 300px;
    background-color: #f6b6c7;
    position: relative;
    display: flex;
    justify-content: flex-end;
    box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
    margin-right: 20px;
  }

  &__firstImage {
    width: 50%;
    max-width: 300px;
    position: absolute;
    left: -30px;
    bottom: -30px;
  }

  &__secondImage {
    height: 85%;
    border: 1px solid black;
    margin: 20px 20px 0px 0px;
  }
  @media screen and (max-width: 1024px) {
    .both {
      font-weight: 800;
      font-size: 90px;
    }
    &__caption {
      height: 500px;
    }
    &__photo {
      width: 35%;
      height: 400px;
    }
    &__undertitle {
      left: 90px;
      top: 40px;
    }
  }
  @media screen and (max-width: $tablet-size) {
    flex-direction: column;
    min-height: auto;

    &__caption {
      height: 500px;
      width: 400px;
      margin-left: 15%;
    }

    &__undertitle {
      left: 25px;
      top: 25px;
    }
    &__photo {
      display: none;
    }
  }
  @media screen and (max-width: $mobile-size) {
    &__caption {
      height: 450px;
      width: 200px;
    }
    .both {
      font-weight: 700;
      font-size: 70px;
      line-height: 100px;
      max-width: 80%;
      margin: 0 auto;
    }
    &__undertitle {
      left: 20px;
      top: 20px;
    }
    &__surf-btn {
      left: 20px;
    }
  }
  @media screen and (min-width: 1500px) {
    .both {
      max-width: 50%;
      margin: 0 auto;
    }
    &__caption {
      display: flex;
      justify-content: center;
    }
    &__undertitle {
      left: 220px;
      top: 35px;
    }
    &__photo {
      margin-right: 15%;
    }
  }
}
</style>
