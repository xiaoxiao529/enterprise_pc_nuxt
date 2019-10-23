<template>
  <!-- You can find this swiper instance object in current component by the "mySwiper"  -->
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      
      <div class="swiper-slide" v-for="banner in banners" :key="banner">
        <img :src="banner">

      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>
 
<script>
/*const img1 = require('../../assets/img/1.jpg')
const img2 = require('../../assets/img/2.jpg')*/
  export default {
    data () {
      return {
        banners: [
          require('../../assets/img/swiper-banner/1.jpg'),
          require('../../assets/img/swiper-banner/2.jpg'),
          require('../../assets/img/swiper-banner/3.jpg')
          /* {url:require('1.jpg')},
           {url:require('2.jpg')},
           {url:require('3.jpg')}*/
        ],
        swiperOption: {
          loop: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          },
          on: {
            slideChange() {
              console.log('onSlideChangeEnd', this);
            },
            tap() {
              console.log('onTap', this);
            }
          }
        }
      }
    },
    mounted() {
      console.log('app init', this)
      setTimeout(() => {
        this.banners.push(require('../../assets/img/swiper-banner/5.jpg'))
        console.log('banners update')
      }, 3000)
      console.log(
        'This is current swiper instance object', this.mySwiper, 
        'I will slideTo banners 3')
       this.mySwiper.slideTo(3)
    }
  }
</script>
 
 
<style lang="scss" scoped>
  .my-swiper {
    height: 300px;
    width: 100%;
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
</style>