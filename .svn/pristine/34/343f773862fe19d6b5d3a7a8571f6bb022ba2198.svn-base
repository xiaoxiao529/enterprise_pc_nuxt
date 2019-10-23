<template>
    <div>
    <h2 v-if="error.statusCode==404">404页面不存在</h2>
    <h2 v-else>500服务器错误</h2>
    <ul>
        <li><nuxt-link to="/">回到首页</nuxt-link></li>
        <!---->
    </ul>
    </div>
</template>

<script>
export default {
  props:['error']
}
</script>
<style scoped>
  div{
    text-align:center;
    vertical-align:middle;
    margin-top:50px;
  }
</style>