<template>
  <div>
    <el-dialog title="" v-bind:visible.sync="trueAlarmVis" :before-close="handleClose" :close-on-click-modal="false"> 
      <div class="gg-warning-panel" id="v_pop_alarm">
        <!--地图ID-->
        <div class="cancelMar gg-image-display" id="alarm_map_div">

        </div>
        <div class="cancelMar gg-image-info">
          <!--关闭按钮-->
          <a class="gg-warning-panel--icon" @click="popClose">
            <h3 class="gg-image-fire"><img src="../assets/img/RedClose.png">
            </h3>
          </a>
          <!--图标-->
          <center class="red-icon">
            <img src="../assets/img/RedIcon.png" alt="">
          </center>
          <div class="gg-image-des">
            <div class="gg-prober-device">
              <div class="parents gg-probe-cell">
                设备&nbsp;&nbsp;&nbsp;ID：<span>{{v_pop_alarm?v_pop_alarm.deviceId:""}}</span></div>
            </div>
            <div class="gg-prober-device">
              <div class="parents gg-probe-cell">设备类型：<span>{{v_pop_alarm?v_pop_alarm.deviceTypeName:""}}</span></div>
            </div>
            <div class="gg-prober-device">
              <div class="parents gg-probe-cell">设备位置：<span>{{v_pop_alarm?v_pop_alarm.address:""}}</span>
              </div>
            </div>
            <div class="gg-prober-device">
              <div v-if="!linyi_alarmPop" class="parents gg-probe-cell">报警时间：<span>{{v_pop_alarm?v_pop_alarm.receiveTime:""}}</span></div>

              <div v-if="linyi_alarmPop && v_pop_alarm && v_pop_alarm.devicetypeid!=19050000" class="parents gg-probe-cell">报警时间：<span>{{v_pop_alarm.receiveTime}}</span></div>
              <div v-if="linyi_alarmPop && v_pop_alarm && v_pop_alarm.devicetypeid==19050000" class="parents gg-probe-cell">预警时间：<span>{{v_pop_alarm?v_pop_alarm.lastTime:""}}</span></div>
            </div>
          </div>
          <div class="gg-prober-device">
            <div class="parents gg-probe-cell">回路点位：
              <span>{{v_pop_alarm && v_pop_alarm.laLoop==null?"":v_pop_alarm.laLoop}}-{{v_pop_alarm && v_pop_alarm.laPoint==null?"":v_pop_alarm.laPoint}}</span></div> 
          </div>
        </div>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import api from '~/config/http';
  import {
    Message
  } from 'element-ui'
  export default {
    props: {
      popAlarm: Object,
      trueAlarmVis: {
        default: true
      }
    },
    data() {
      return {
        mytrueAlarmVis: this.trueAlarmVis,
        v_pop_alarm:  this.popAlarm,
         /* {
          address: "1号消控主机烟感传感器_4号楼8层810财务室室",
          alarmTime: "2019-01-14 14:33:43",
          buildId: "AHHF_QHHFY_99999997_004",
          deviceId: "z_337",
          deviceTypeId: null,
          deviceTypeName: "点型感烟探测器",
          floorId: "AHHF_QHHFY_99999997_004_U008",
          laLoop: "6",
          laPoint: "8",
          lastTime: null,
          lat: "1522699.4",
          log: "3538865.14",
          orgCode: "AHHF_QHHFY_99999997",
          receiveTime: "2019-01-14 14:30:00"
       },  */
        linyi_alarmPop: api.getGlobalVal('attribute') == 'linyi',
        floor_g2map: {},
        elementLayer: {},
        iconConf: {}
      };
    },
    methods: {
      handleClose(done) {
        this.mytrueAlarmVis = false;
        this.$emit('trueAlarmSuccess', this.mytrueAlarmVis);
      },
      popClose(done) {
        this.mytrueAlarmVis = false;
        this.$emit('trueAlarmSuccess', this.mytrueAlarmVis);
      },
      initMap: function () {
        var that = this;
        // 创建地图
        that.floor_g2map = new that.gs2.maps.Map({
          defaultExtent: {
            center: [0, 0],
            maxZoom: 20,
            minZoom: 5,
            // extent: [0, 0, 3000000, 3000000],
            projection: "EPSG:3857", // 设置地图坐标系
            level: 5
          } // 为方便展示设置视野中心点的范围
        });
        // 初始化地图，传入要初始化的DOM对象的id
        that.floor_g2map.init({
          targetId: "alarm_map_div"
        });
        //if(JSON.stringify(that.v_pop_alarm) == '{}')return;
        var picUrl = api.forent_url.pic_url + "/floorImage/" + that.getFloorObj(that.v_pop_alarm.buildId, that.v_pop_alarm.floorId).floorAreaImg; //"http://60.174.207.208:7023/floorImage/AHHF_QHHFY_20180408/001/U003/3.jpg";
        var img = new Image();
        img.src = picUrl;
        img.onload = function () {
          var w = img.width * 1000;
          var h = img.height * 1000;
          //创建一个图像图层
          var floor_imageLayer = new that.gs2.lys.ImageLayer({
            imageType: 702,
            extent: [
              0,
              0,
              w,
              h
            ], //图片范围，请按照坐标系的范围给出，此为3857的坐标系范围
            url: picUrl // 图层服务 url
          });
          // 将 图像图层添加到地图
          that.floor_g2map.addLayer(floor_imageLayer);
          that.floor_g2map.pan(new that.gs2.geom.Envelope({
            minx: 0,
            miny: 0,
            maxx: w,
            maxy: h
          }));
          that.elementLayer = new that.gs2.lys.ElementLayer();
          that.floor_g2map.addLayer(that.elementLayer);
          var x2 = that.v_pop_alarm.log; //1118871.3610942392; //经度
          var y2 = that.v_pop_alarm.lat; //312305.1125394750; //纬度
          var point2 = new that.gs2.geom.Point({
            x: x2,
            y: y2,
            spatialReference: that.gs2.geom.SpatialReference.EPSG3857
          });

          var b64icon2 =
            'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAoCAYAAADpE0oSAAAB80lEQVRYhcXXv2oUURQH4G9HDYKoKSwUi4CImBcQxAQtrITkBSzs1QdQsBErwcLGQgTRN9BKC0VJtLBNoSERDIhEUEgEE0hM9ljsTLJZdnd29s/shVMMy/w+zjB77p1K6GgluIQrOIczGE1/W8UCPuEV3qOamxjtayS4GSwF0WEtpfeMtMtuh54P5guAjTWfZhSCbwSbPaBZbaZZHcG3+wA21q08+GpQHQBcTbObwuPB2gDQrNZSYw9cCWYGiGY1k1o78HQJaFbT9fBsifBsqLV9Cl9RyZ02/VmB0wmmSkSl1lSCiRLRbE0mODsEeLwSrNjdacpafyrBttq2V+aKBOslo7CSYHEI8PcEH4YAf0zwYgjw62yDWChxZP4KDiRqI+xxid0+w79skzgWrJfQ7UZwMuz+f3/jUQndPscPqD+BjKbPf1Dd/g1OZF79xFrF3QF2+wDLO1ext/YHXwbQ7WJwsN5qdrydCLb7DF9udFod6B/2EX3azGgFH4r+DJVvwZEisOBCsNUDuhVcbJWf97V4pwf4XrvsPHhf8KYL9F16b9ew4HiwXAD9GXWDohdYMBm1OZuHbkTt3cjN7BQWXO8AvtZpXhFY8KQNer9IVlF4JHjbBH0ZOS9Tr7DgaDBXh84Fh4vmdAMLxoLPUdtQxrrJ+A8T7ueKw5k8gQAAAABJRU5ErkJggg==';
          var imgIcon2 = new Image();
          imgIcon2.src = "data:image/jpg;base64," + b64icon2;
          imgIcon2.onload = function () {
            var w = imgIcon2.width;
            var h = imgIcon2.height;
            var markerSymbol = new that.gs2.syms.Picturemarkersymbol({
              source: imgIcon2.src,
              width: w,
              height: h,
              rotation: "0",
              opacity: "1",
              offsetX: w / 2,
              offsetY: h / 2
            });
            var ele = new that.gs2.ele.Element({
              geometry: point2,
              symbol: markerSymbol
            });
            that.elementLayer.add(ele);
          }

        }
      },
      getFloorObj(buildId, floorId) {
        var floorObj = {};
        var orgCode = api.getGlobalVal('userObj').orgCode
        $.ajax({
          url: api.forent_url.e_record_url + '/record/getFloorInfo',
          type: 'GET',
          async:false,
          data: {
            unitId: orgCode,
            buildId: buildId,
            floorId: floorId
          },
          success: function (res) {
            if (res.code == "success") {
              floorObj = res.data;
            }
          }

        });
        return floorObj;
      }

    },
    mounted() {
      let _this = this;
      setTimeout(function () {
        _this.initMap();
      }, 2500)
    }
  }

</script>
<style lang="scss" >
  #v_pop_alarm{
    .ol-unselectable{
      background-color: #e9ebf2;
    }
    .ol-attribution.ol-unselectable.ol-control.ol-collapsed{
      display:none;
    }  
    .ol-zoom.ol-unselectable.ol-control {
       display:none;
    }
  } 
  
</style>
<style lang="scss" scoped>
  #v_pop_alarm {
    width: 1138px;
    min-height: 570px;
    border-radius: 14px;
    background: -webkit-linear-gradient(#f55c5d, #ee3232, #b92423);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: rgba(255, 255, 255, 0.98);
  }

  .cancelMar {
    margin: 0;
  }

  .gg-warning-panel--icon {
    position: absolute;
    top: 18px;
    right: 18px;
    cursor: pointer;
    -webkit-transition: all .2s;
    -o-transition: all .2s;
    transition: all .2s;
  }

  .gg-warning-panel--icon:hover {
    opacity: .7;
    -webkit-transition: all .2s;
    -o-transition: all .2s;
    transition: all .2s;
  }

  #alarm_map_div {
    width: 826px;
    height: 555px;
    border-radius: 4px;
    margin: 10px 0 10px 10px;
    overflow: hidden;
  }

  .gg-image-info {
    width: 300px;
    padding-left: 15px;
    padding-right: 8px;
  }

  .red-icon {
    margin: 72px 0 50px 0;
  }

  .parents {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

  }

  .gg-prober-device .gg-probe-cell span {
    font-size: 18px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    line-height: 28px;
  }

  .gg-probe-cell {
    margin: 0;
  }

</style>
