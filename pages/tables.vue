<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :span="17">
        <div class="grid-content">
          <ul class="gg-fire-info">
            <li>
              <span class="gg-fire-logo gg-alarm-logo">sd</span>
            </li>
            <li></li>
            <li></li>
          </ul>
          <div class="gg-build-show grid-content">
            all
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content grid-right">是多少</div>
        <div class="grid-content grid-right">是多少</div>
        <div class="grid-content grid-right">是多少</div>
      </el-col>
    </el-row>
  </div>
</template>


<script>

</script>
<style lang="scss" scoped>
.main,.el-row,.el-col{
  height:100%;
}
  .grid-content {
    width: 100%;
	  height:calc(100% - 110px)
  }

 

</style>
