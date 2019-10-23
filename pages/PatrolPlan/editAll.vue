<template>
  <div class="right-main-warpper">
    <!--<div class="l-head">
       面包屑 
      <Title/>
    </div>-->
    <div class="deitAll-wrap">
      <div class="back-btn">
          <el-button type="text" >
              <nuxt-link v-if="routerFlag=='routerFlagOne'" :to="{name:'PatrolPlan-FacilitiesDetail'}">&lt;&lt;返回</nuxt-link>
              <nuxt-link v-if="routerFlag=='routerFlagTwo'" :to="{name:'PatrolPlan-archivesList'}">&lt;&lt;返回</nuxt-link>
          </el-button>
      </div>
      <el-tabs v-model="activeName" class="top-tab" @tab-click="handleClick">
        <el-tab-pane label="电子档案" name="elcRrchives">
          <ElcRrchives v-if="activeName === 'elcRrchives'"/>
        </el-tab-pane>
        <el-tab-pane label="上传图纸" name="uploadFile">
          <UploadFinishFile v-if="activeName === 'uploadFile'"/>
        </el-tab-pane>
        <el-tab-pane label="设备标点" name="equipmentPoint">
          <EquipmentPoint v-if="activeName === 'equipmentPoint'"/>
        </el-tab-pane>
        <el-tab-pane label="鸟瞰图" name="birdView">
          <BirdView v-if="activeName === 'birdView'"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import api from "~/config/http";
import Title from "~/components/Title";
import ElcRrchives from "~/components/AddElectronic/ElcRrchives";
import UploadFinishFile from "~/pages/PatrolPlan/uploadFinishFile";
import EquipmentPoint from "~/components/AddElectronic/EquipmentPoint";
import BirdView from "~/components/AddElectronic/BirdView";
export default {
  components: {
    Title,
    ElcRrchives,
    EquipmentPoint,
    UploadFinishFile,
    BirdView
  },
  data() {
    return {
      activeName: "elcRrchives",
      show: true,
      routerFlag:null,
    };
  },
  mounted() {
  	this.activeName = this.$store.state.tabActiveName ? this.$store.state.tabActiveName : "elcRrchives";
  	console.log(this.activeName)
    setTimeout(() => {
      this.activeName = "elcRrchives";
    }, 0);
  	this.routerFlag = localStorage.getItem('routerFlag');
    this.$store.commit('updateShBuildId',"");
  },
  methods: {
    handleClick() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.deitAll-wrap {
  background: #fff;
  height: calc(100vh - 55px - 20px - 20px);
    position: relative;
    .back-btn{
        position: absolute;
        top: 0;
        right: 20px;
        line-height: 55px;
        font-size: 16px;
        z-index: 999;
      a{
        color: #1c77ff;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  .top-tab {
    /deep/.el-tabs__nav-scroll {
      padding-left: 20px;
      .el-tabs__nav {
        height: 55px;
        line-height: 55px;
        .el-tabs__active-bar {
          background: rgba(28, 119, 255, 1);
        }
        .el-tabs__item {
          font-size: 16px;
          font-weight: bold;
          &.is-active {
            color: rgba(28, 119, 255, 1);
            border-color: rgba(28, 119, 255, 1);
          }
        }
      }
    }
  }

  /deep/.el-button {
    font-size: 14px !important;
    padding: 6px 5px !important;
  }
}
</style>

