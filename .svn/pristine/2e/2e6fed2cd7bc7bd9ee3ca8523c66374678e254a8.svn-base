<template>
  
  <div class="preview-wrapper">
      <h2>点击预览大图：</h2>
      <div class="preview" v-for="banner in banners" :key="banner">
        <img :src="banner" preview preview-text="描述" >

      </div>
    </div>

</template>
 
<script>

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
        ]
        
      }
    },
    mounted() {
      //
    }
  }
</script>
 
 
<style lang="scss" scoped>
.preview-wrapper{
  text-align: center;
  width:100%;
  h2{
    text-align: left;
    font-size: 20px;
    font-weight: bold;
  }
  .preview {
    float: left;
    height: 300px;
    width: 200px;
    background-color: #eee; 
    display: block;
    padding:10px;
    img{
      height: 300px;
      width: 200px;
      cursor: pointer;
    }
    
    
  }
}
</style>