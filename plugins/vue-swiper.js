/*
 *vue-swiper.js
 *
*/
import Vue from 'vue'
//import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
 
//Vue.use(VueAwesomeSwiper)
//
if (process.browser) {
// 加一个浏览器端判断，只在浏览器端才渲染就不会报错了
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}