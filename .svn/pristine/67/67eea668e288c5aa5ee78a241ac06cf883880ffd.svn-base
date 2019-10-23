<!-- card -->
<template>
  <!-- 地图组件容器 -->
  <div>
    <div :class="['build-alarm-info',linyiClass]">
      <div class="alarm-info-title gg-company-warnTitle" :title="$store.state.ZS.MONITOR.currentBuildname">{{$store.state.ZS.MONITOR.currentBuildname}}</div>
      <div v-show="!linyiShow" class="alarm-info-body">
        <div class="build-floor gg-company-warnFloor"><span title="1层"> {{floorObj.floorName}}</span></div>
        <div class="gg-head-line"></div>
        <div class="build-floor-alarm">
          <div class="floor-alarm-num" id="alarmcount">{{floorObj.alarmState}}</div>
          <div class="floor-alarm-name">实时报警数</div>
        </div>
        <div class="gg-head-line"></div>
        <div class="build-floor-hidden">
          <div class="floor-hidden-num" id="accicount">{{floorObj.troubleType}}</div>
          <div class="floor-hidden-name">实时故障数</div>
        </div>
      </div>
      <div  v-show="linyiShow" class="alarm-info-body">
        <div class="build-floor gg-company-warnFloor"><span title="1层"> {{floorObj.floorName}}</span></div>
        <div class="gg-head-line"></div>
        <div class="build-floor-alarm">
          <div class="floor-alarm-num" id="alarmcount">{{floorObj.alarmState}}</div>
          <div class="floor-alarm-name">火警</div>
        </div>
        <div class="gg-head-line"></div>
        <div class="build-floor-hidden">
          <div class="floor-warn-num" id="accicount">{{floorObj.warningState}}</div>
          <div class="floor-hidden-name">电气火灾预警</div>
        </div>
        <div class="gg-head-line"></div>
        <div class="build-floor-hidden">
          <div class="floor-hidden-num" id="accicount">{{floorObj.troubleType}}</div>
          <div class="floor-hidden-name">故障</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "~/config/http";
  export default{
    props:{
      floorObj:Object 
    },
    data() {
      return {
        linyiClass:(api.getGlobalVal('attribute') == 'linyi' ? 'linyi_build-alarm-info' :''),
        linyiShow:(api.getGlobalVal('attribute') == 'linyi' ? true : false)
      }
    },
    mounted(){
        // this.linyiClass = (api.getGlobalVal('attribute') == 'linyi' ? 'linyi_build-alarm-info' :''),
        // this.linyiShow = (api.getGlobalVal('attribute') == 'linyi' ? true : false)
    }
    // watch:{
    //   floorObj:function(newPO) {
    //   }
    // }
  }
</script>
<style scoped lang="scss">
  /* card */
  .linyi_build-alarm-info{
     width: 414px!important;
     .build-floor-alarm,
      .build-floor-hidden {
       width:72px;

      }
  }
  .build-alarm-info {
    width: 300px;
    height: 100px;
    top: 70px;
    left: 20px;
    position: absolute;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(37, 40, 41, .5);
    z-index: 2;
    background: #fff;

    .alarm-info-title {
      font-size: 1.8rem;
      color: #fff;
      padding: 5px 0 5px 10px;
      background: #4777e7;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    .build-floor {
      display: inline-block;
      /* margin-left: .8rem; */
      font-size: 30px;
      color: #1f88ec;
      text-align: center;
      vertical-align: super;
      width: 100px;
    }

    .gg-head-line {
      display: inline-block;
      width: 1px;
      height: 40px;
      background: #d9d9d9;
    }

    .build-floor-alarm,
    .build-floor-hidden {
      display: inline-block;
      text-align: center;
      margin-left: 12px;
      margin-right: 12px;
      font-size: 1.2rem;

    }

    .floor-alarm-num {
      font-size: 3rem;
      color: #f03718;
      padding: 11px 0 8px;
    }

    .floor-hidden-num {
      font-size: 3rem;
      color: #ff7800;
      padding: 11px 0 8px;
    }
    .floor-warn-num {
        font-size: 3rem;
        color: #5c52cc;
        padding: 11px 0 8px;
    }
  }

</style>
