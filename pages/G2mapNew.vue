<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :span="24" class="gg-body-left">
        <div :class='["grid-content", "gg-ditu",roleClassName]'>
          <!-- 地图组件 -->
          <G2MapDetail 
          	v-on:changeShowType="changeShowType" 
          	v-on:changeBigSmall="changeBigSmall" 
          	:bigScreen="bigScreen">
          </G2MapDetail>
          <el-button type="text" class="back-btn">
              <nuxt-link v-if="true" :to="{name:'PatrolPlan-editAll'}">&lt;&lt;返回</nuxt-link>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!--<ControlRoomDetail :row="rowObj.D" :showDetail="showDetail.D" v-on:isShow='isShow("D")' />
    <FacilitiesInDetail :row="rowObj.C" :showDetail="showDetail.C" v-on:isShow='isShow("C")' />
    <FirePreventionInsDetail :row="rowObj.B" :showDetail="showDetail.B" v-on:isShow='isShow("B")' />
    <FirePreventionPatrolDetail :row="rowObj.A" :showDetail="showDetail.A" v-on:isShow='isShow("A")' />-->
  </div>
</template>

<script>
import {
  mapState
} from 'vuex';
import Cookie from 'js-cookie';
import api from '~/config/http';
import axios from 'axios'
// import monitorMain_crud from '~/assets/page/real-time-monitoring/js/monitorCrud'
import G2Map from '~/components/G2Map';
import G2MapDetail from '~/components/G2MapDetail';
import ControlRoomDetail from '~/components/SafetySupervision/ControlRoomDetail';
import FacilitiesInDetail from '~/components/SafetySupervision/FacilitiesInDetail';
import FirePreventionInsDetail from '~/components/SafetySupervision/FirePreventionInsDetail';
import FirePreventionPatrolDetail from '~/components/SafetySupervision/FirePreventionPatrolDetail';
export default {
  components: {
    G2Map,
    G2MapDetail,
    ControlRoomDetail,
    FacilitiesInDetail,
    FirePreventionInsDetail,
    FirePreventionPatrolDetail
  },
  data() {
    return {
      ZS: {},
      MONITOR: {},
      showMap: true,
      myChart: '',
      myPreWarningChart: '',
      showNotice: true,
      bigFlag: false,
      buildId: this.$route.params.buildId,
      userObj: api.getGlobalVal("userObj"),
      alarmSumNum: '',
      alarmSumData: '',
      sumUnfinishData: '',
      sumUnfinishNum: '',
      allAccidentData: '',
      allAccidentNum: '',
      roleClassName: (api.getGlobalVal("attribute") == 'linyi' ? 'fire_linyi_app' : ''),
      roleFlag: (api.getGlobalVal("attribute") == 'linyi' ? true : false),
      userInfoDevice: [ /* {onlineState:0,deviceName:"sfd"},{onlineState:1,deviceName:"4132"},{onlineState:1,deviceName:"ff"} */],
      taskList: [],
      inspectionTypeTxt: {
        "A": "防火巡查",
        "B": "防火检查",
        "C": "设施巡查",
        "D": "消控室巡查"
      },
      planTimeArr: [],
      rowObj: {
        "A": {},
        "B": {},
        "C": {},
        "D": {}
      },
      showDetail: {
        "A": false,
        "B": false,
        "C": false,
        "D": false
      },
      bigScreen: true,
      // tab 切换
      activeName2: "first",
      tabFlag: false,
      tabOther: true,
      statusNum: "",
      tabList: [], // tab 列表数组
      listNum: "", // 有多少条数据
      alarmCount_linyi: '',
      warningCount_linyi: '',
      troubleCount_linyi: '',
      mapBuildId:"",
      mapFloorId:""

    }
  },
  methods: {
    // hide tab
    /*hideTab() {
      this.tabFlag = false;
      this.tabOther = true;

    },*/
    // 定位地图
    /*locationMap(data) {
      this.showMap = false;
      this.$store.commit('updateZSCurrentBuildname', data.buildName);
      this.$store.commit('updateZSCurrentBuild', data.buildId);
      this.$store.commit('updateZSCurrentFloor', data.floorId);
      this.$store.commit('updateZSDlclick', data.floorId);
      this.$store.commit('updateZSDevice', data.deviceId);
      this.$store.commit('updateFloorDetail', Math.random());
      this.$store.commit('updateLinyiFloor', data);

    },*/
    // tab 切换
    handleClick(tab, event) {

      // 切換 數據的跟新
      var num;
      if (tab.index == 0) {
        num = 0;
      } else if (tab.index == 1) {
        num = 1;
      } else if (tab.index == 2) {
        num = 2
      }
      this.alarmBox(num);
      this.$forceUpdate();
    },
    changeShowType: function (val) {
      this.showMap = val;
    },
    changeBigSmall: function (val) {
      this.bigScreen = val;
    },
    /**
     * 地图窗口发生改变时 自适应大小
     * @private
     */
    _initMapViewSize: function () {
      //调整地图size

      var width = $('.ol-viewport')[0].offsetWidth;
      var height = $('.ol-viewport')[0].offsetHeight;
      this.ZS.MONITOR.g2map.setViewSize(width, height);
    },
    // 标题截取
    changeText(a) {
      if (a.length >= 6) {
        a = a.slice(0, 6) + '...';
      }
      return a;
    },

    linkTo: function (e) {
      if (e.target.nodeName.toLowerCase() === 'li' || e.target.offsetParent.nodeName.toLowerCase() === "li") {
        let path = e.target.dataset.value ? e.target.dataset.value : e.target.offsetParent.dataset.value;
        let light = e.target.dataset.light ? e.target.dataset.light : e.target.offsetParent.dataset.light;
        let pathName = e.target.dataset.pathname ? e.target.dataset.pathname : e.target.offsetParent.dataset.pathname;
        let parName = e.target.dataset.parname ? e.target.dataset.parname : e.target.offsetParent.dataset.parname;
        api.setGlobalVal("CmenuName", JSON.stringify({
          lightMenu: light,
          name: pathName,
          parName: parName,
        }))
        this.$router.push({
          name: path,
          params: {
            name: pathName,
            parName: parName
          }
        });
      }
    },
    isShow: function (T) {
      this.showDetail[T] = false;
    },
    init() {
      if (this.userObj.loginName == 'sa') {
        this.$router.push({
          name: 'AuthManage-UserManage',
          params: {
            ref: 'login'
          }
        });
      }
    },

  },
  mounted() {
    this.init();
    //this.$store.commit('updateShUnitId', this.$route.params.unitId);
  },
  watch: {
    roleClassName(newVal, oldVal) {

    }
  }
}

</script>

<style lang="scss" scoped>
.back-btn{
	position: absolute;
	right: 160px;
	top: 8px;
	z-index: 100;
	color: #1a77ff !important;
	font-size: 14px;
	a{
		color: #1c77ff;
		&:hover{
			text-decoration: underline;
		}
	}
}
[v-cloak] {
  display: none;
}

/deep/ .el-tabs__item {
  font-size: 16px !important;
  background-color: #fff;
  border-bottom: 1px solid #e7e9ed !important;
}

/deep/ .el-tabs__item.is-active {
  color: #409eff;
  border-bottom: 1px solid #409eff !important;
  border-right-color: #ffffff;
  border-left-color: #ffffff !important;
}

.alarmColor-gz {
  color: #f9752a !important;
}

.alarmColor {
  color: #5c52cc !important;
}

.alarmBox {
  text-align: center;
  line-height: 1;
  font-size: 23px;
}

.alarmNum {
  text-align: center;
  line-height: 0.8;
  font-size: 42px;
  padding: 8px 0;
  color: #f8260b;
}

.el-tabs--border-card {
  height: 100%;
  min-height: 562px;
}

.backIcon {
  position: absolute;
  top: 12px;
  right: 1%;
  font-size: 18px;
  color: #277eec;
  transform: rotate(90deg);
  cursor: pointer;
  z-index: 999;
}

.tabT-time {
  font-size: 14px;
  text-align: left;
  padding-top: 10px;
}

.tabT-main {
  font-size: 14px;
  text-align: left;
}

.monitorList_warn-two {
  margin-left: 14px;
  display: inline-block;
  font-size: 12px;
  color: #fff;
  width: 32px;
  height: 16px;
  border-radius: 2px;
  background: #ff7800;
  line-height: 16px;
  text-align: center;
}

.monitorList_warn-one {
  margin-left: 14px;
  display: inline-block;
  font-size: 12px;
  color: #fff;
  width: 32px;
  height: 16px;
  border-radius: 2px;
  background: red;
  line-height: 16px;
  text-align: center;
}

.monitorList_warn {
  //预警
  margin-left: 14px;
  display: inline-block;
  font-size: 12px;
  color: #fff;
  width: 32px;
  height: 16px;
  border-radius: 2px;
  background: #5c52cc;
  line-height: 16px;
  text-align: center;
}

.tabTleft {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.tabTright {
  color: #4777e7;
  float: right;
  cursor: pointer;
}

.float-box {
  width: 80%;
  margin: 0px 10% 15px 10%;
  height: 28px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  background: #f5f5f5;
}

.tab-second {
  width: 100%;
  height: 100%;
}

.tabT-header {
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
}

.tabT {
  width: 100%;
  height: 100%;
}

.tabBox {
  height: 100%;
  min-height: 562px;
  background-color: #fff;
}

.el-container.is-vertical {
  padding: 0 0 10px 0;
}

.main {
  margin: 0 -10px 0 -20px;
  height: calc(100% - 10px);
}

.el-row,
.el-col {
  height: 100%;
}

.gg-ditu {
  width: 100%;
  height: calc(100% - 110px);
}

.el-col.el-col-17 {
  box-sizing: border-box;
}

.gg-body-right {
  min-height: 562px;
  overflow-y: hidden;
  overflow-x: hidden;
}

.gg-fire-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #e5e8ef;
  height: 100px;
  line-height: 100px;

  li {
    width: 32.8%;
    border-radius: 5px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 0 30px rgba(37, 40, 41, 0.13);
    cursor: pointer;
    position: relative;

    span {
      display: inline-block;
    }
  }
}

/*buildshow*/

.grid-right {
  background: #fff;
  height: 28%;
  margin-bottom: 10px;
}

.grid-right:nth-last-child(1) {
  margin-bottom: 0;
  height: calc(100% - 56% - 20px);
}

.gg-fire-logo {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin-left: 2.5rem;
  margin-top: -18px;
  border-radius: 5px;
}

.gg-alarm-logo {
  background: url(../assets/img/alarm-logo.png) no-repeat center;
}

.gg-fault-logo {
  background: url(../assets/img/fault-logo.png) no-repeat center;
}

.gg-hidden-logo {
  background: url(../assets/img/hidden-logo.png) no-repeat center;
}

.gg-fire-ability {
  margin-left: 1rem;
  font-size: 3rem;
  color: #666;
}

.gg-fire-count {
  font-size: 4.6rem;
  color: #1babf8;
  position: absolute;
  right: 2rem;
}

/* 右侧charts */
.botbox {
  width: 100%;
  height: calc(100% - 4rem);
  overflow-y: auto;
  overflow-x: auto;
  box-sizing: border-box;
}

.el-scrollbar {
  height: calc(100% - 4rem);
  overflow-x: hidden;
}

#dangerTrend {
  width: 90%;
  margin-left: 5%;
  overflow: hidden;
}

ul.botbox,
.el-scrollbar {
  height: calc(100% - 5.5rem);
}

/* 消控主机 */
.control-host {
  text-align: center;
  vertical-align: middle;

  img {
    margin-top: 8%;
  }

  p {
    text-align: center;
    padding-top: 1rem;
    font-size: 18px;
    line-height: 30px;
  }
}

.host-container {
  padding-top: 10%;
  font-size: 1.6rem;
}

.host-container .host-wrapp {
  display: flex;
  justify-content: center;
  align-items: center;

  .noshow {
    display: block;
  }

  li {
    text-align: center;
    position: relative;
    line-height: 1.5;

    .host-text {
      position: absolute;
      top: 102px;
      left: 54%;
      transform: translate(-50%, 0);
      width: 180%;
    }

    .float {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .child-float {
      display: flex;
      position: relative;
      margin: 0 6px 0 2px;

      li {
        border-radius: 50%;
        background: #0cb2ea;
        width: 6px;
        height: 6px;
        margin-left: 6px;
      }
    }

    .disab li {
      background: #adadad;
    }

    .current {
      background: #457ef2 !important;
    }

    .storeIcon,
    .storeIcon2,
    .storeIcon3 {
      width: 74px;
      height: 74px;
      background-size: cover;
    }

    .storeIcon {
      background: url(../assets/img/store1.png) no-repeat center;
    }

    .storeIcon2 {
      background: url(../assets/img/store2.png) no-repeat center;
    }

    .storeIcon3 {
      background: url(../assets/img/store3.png) no-repeat center;
    }

    p {
      color: #100f0f;
    }

    .host-close {
      position: absolute;
      width: 22px;
      height: 22px;
      background: url(../assets/img/break.png) no-repeat;
      top: 50%;
      left: 50%;
      margin-top: -11px;
      margin-left: -11px;
    }
  }
}

.host_text_container li {
  background: #f6f6f7;
  border-radius: 5px;
  width: 400px;
  height: 44px;
  line-height: 44px;
  margin: 0 auto;
  position: relative;
  margin-top: 12px;

  .left_stage {
    display: inline-block;
    background: #0cb2ea;
    height: 20px;
    width: 4px;
    position: absolute;
    top: 50%;
    left: 24px;
    transform: translate(0, -50%);
  }

  .center_info {
    padding-left: 36px;
  }

  .right_stage {
    padding-left: 120px;
    color: #0cb2ea;
  }
}

.gg-right-logo {
  display: inline-block;
  width: 23px;
  height: 23px;
  position: absolute;
  top: 50%;
  margin-top: 0;
  margin-left: -3px;
}

.gg-master-logo {
  background: url(../assets/img/gg-master-logo.png) no-repeat center;
}

.gg-trend-logo {
  background: url(../assets/img/gg-hidden-logo.png) no-repeat center;
}

.gg-check-logo {
  background: url(../assets/img/gg-safe-logo.png) no-repeat center;
}

/* 列表 */
.gg-check-main {
  padding: 1rem 0;
  box-sizing: border-box;

  li {
    line-height: 22px;
    margin: 1rem 0 1rem 1rem;
    font-size: 1.6rem;
    cursor: pointer;

    span {
      margin-left: 1rem;
    }

    .gg-check-all {
      font-size: 1.4rem !important;
      border-radius: 0.5rem;
      border: 0.1rem solid #1eb960;
      padding: 0.16rem 0.6rem;
    }

    .gg-check-doing {
      color: #1eb960;
      border-color: #1eb960;
    }

    .gg-check-done {
      color: #4777e7;
      border-color: #4777e7;
    }

    .gg-check-beforeDo {
      color: #f7752e;
      border-color: #f7752e;
    }
  }
}

.link-li {
  display: inline-block;
  width: 100%;
  height: 100%;
}

/* gis图 */
.icon-enlarge {
  position: absolute;
  width: 38px;
  height: 38px;
  cursor: pointer;
  right: 20px;
  top: 20px;
}

.build-enlargeBtn {
  background: url(../assets/img/icon-enlarge.png) no-repeat;
}

.icon-narrow {
  background: url(../assets/img/icon-narrow.png) no-repeat;
}

.bigScreen {
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
}

.gg-device-image {
  height: 100%;
}

.build-enlargeBtn,
.build-narrowBtn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  z-index: 3;
}

/* 实时监测平面图 start */
.monitor-build-div {
  /*width: 100%;*/
  /*height: 100%;*/
  position: absolute;
  top: 1px;
  bottom: 1px;
  left: 1px;
  right: 1px;
}

.monitor-build-div-half {
  top: 54px !important;
  bottom: 1px !important;
  left: 1px !important;
  right: 1px !important;
}

.overdueFilter-checkbox {
  display: inline-block;
  position: absolute;
  top: 20px;
  left: 160px;
  z-index: 1;
}

#monitor-switchListBtn {
  position: absolute;
  right: 60px;
  top: 20px;
  z-index: 1;
}

.monitor-tip {
  z-index: 2;
  position: absolute;
  width: 300px;
  min-height: 40px;
  font-size: 16px;
  padding-bottom: 10px;
}

.monitor-tip:before {
  z-index: -1;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e1f3fe;
  -webkit-box-shadow: 0 0 0 5px rgba(40, 146, 226, 1);
  -moz-box-shadow: 0 0 0 5px rgba(40, 146, 226, 1);
  box-shadow: 0 0 0 5px rgba(40, 146, 226, 1);
  opacity: 0.98;
}

.monitor-tip:after {
  z-index: -1;
  position: absolute;
  left: 50%;
  margin-left: -5px;
  bottom: -5px;
  content: "";
  -webkit-box-shadow: -2px 2px 0 1px rgba(40, 146, 226, 1);
  -moz-box-shadow: -2px 2px 0 1px rgba(40, 146, 226, 1);
  box-shadow: -2px 2px 0 1px rgba(40, 146, 226, 1);
  background-color: #e1f3fe;
  width: 10px;
  height: 10px;
  -webkit-transform: rotate(-45deg) scale(1.5);
  -moz-transform: rotate(-45deg) scale(1.5);
  -ms-transform: rotate(-45deg) scale(1.5);
  -o-transform: rotate(-45deg) scale(1.5);
  transform: rotate(-45deg) scale(1.5);
  opacity: 0.98;
}

.monitor-tip-p {
  margin: 0;
  padding-left: 80px;
  padding-top: 2px;
  padding-bottom: 2px;
}

/* 实时监测平面图 end */

/* 楼层平面图页 start */

/* 楼层平面图页 end */

/* 楼层平面图导航 start */
.nav-div {
  position: absolute;
  top: 100px;
  left: 30px;
  margin-top: 40px;
  z-index: 1;
}

/*.floor-nav {
    height: 456px;
}*/
.icon-lift-up > i,
.icon-lift-down > i {
  font-size: 26px;
}

.icon-lift-up:hover,
.icon-lift-down:hover,
.floor-btn-div > .floor-fire-btn > i:hover {
  cursor: pointer;
}

.floor-ul-div {
  width: 62px;
  height: 344px;
  position: relative;
  overflow: hidden;
}

.floor-ul-div > ul {
  list-style: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  margin: 0;
}

.floor-ul-div > ul > li {
  width: 62px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 3px;
  color: #4790fa;
}

.floor-ul-div > ul > li > a {
  display: block;
  color: #4790fa;
  background: #e9f2ff;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  text-decoration: none;
}

.floor-ul-div > ul > li.floor-lift-cur > a {
  border-left-color: #4790fa;
  background: #d1e2fc;
}

/* 楼层平面图导航 end */
/* 楼层平面图header start */
.monitor-header {
  display: none;
  height: 53px;
}

.monitor-header .gs-el-form-item {
  margin: 0;
}

/* 楼层平面图header end */

@media screen and (max-width: 1680px) {
  .main {
    margin: 0 0 0 -10px;
    height: calc(100% - 10px);
  }

  .gg-fire-logo {
    margin-top: -10px;
  }

  .control-host {
    img {
      width: 25%;
      margin-top: 9%;
    }

    p {
      font-size: 14px;
    }
  }

  .gg-check-main {
    padding-top: 0;
  }

  .titTop {
    line-height: 40px;
    padding-left: 37px;
  }

  .botbox {
    height: calc(100% - 40px);
  }

  ul.botbox,
  .el-scrollbar {
    height: calc(100% - 45px);
  }

  //消控主机

  .host-container {
    padding-top: 7%;

    .host-wrapp {
      .noshow {
        display: block;
      }

      li {
        .storeIcon,
        .storeIcon2,
        .storeIcon3 {
          background-size: 80% !important;
          width: 6.4rem;
          height: 6.4rem;
        }
        .host-text {
          top: 6.4rem;
          width: 118%;
        }
      }
    }
  }

  .host_text_container li {
    width: 340px;

    .right_stage {
      padding-left: 90px;
    }
  }
}

@media screen and (max-width: 1440px) {
  /* 首页 */
  .main {
    height: 100%;
    margin: 0;
  }

  .gg-fire-logo {
    background-size: 80%;
    margin-left: 1.6rem;
    margin-top: -8px;
  }

  .gg-fire-info {
    height: 84px;
    line-height: 84px;
  }

  .gg-ditu {
    height: 100%;
  }

  .gg-build-show {
    height: calc(100% - 94px);
  }

  .titTop {
    padding-left: 33px;
    line-height: 31px;
  }

  .gg-right-logo {
    background-size: 90%;
    margin-top: 0;
    margin-left: -8px;
  }

  .control-host {
    img {
      width: 25%;
      margin-top: 10px;
    }

    p {
      font-size: 14px;
    }
  }

  .gg-check-main {
    padding: 0;

    li {
      margin: 1rem 0 1rem 0rem;
      height: 22px;
      overflow: hidden;
    }
  }

  ul.botbox,
  .el-scrollbar {
    height: calc(100% - 35px);
  }

  .botbox {
    height: calc(100% - 31px);
  }

  //消控主机
  .host-container {
    padding-top: 16%;

    .storeIcon,
    .storeIcon2,
    .storeIcon3 {
      background-size: 80% !important;
    }

    .host-wrapp {
      .noshow {
        display: none;
      }

      li {
        .host-text {
          top: 70px;
          width: 112%;
        }
      }
    }
  }

  .host_text_container li {
    width: 90%;

    .right_stage {
      padding-left: 90px;
    }
  }
}

@media screen and (max-width: 1366px) {
  //消控主机
  .host-container {
    padding-top: 4%;
  }
}

.clearfix {
  &:after {
    clear: both;
  }

  &:after,
  &:before {
    display: table;
    content: "";
  }
}
</style>