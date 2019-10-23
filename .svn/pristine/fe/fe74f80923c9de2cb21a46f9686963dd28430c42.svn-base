// TODO:隐藏放大缩小按钮
// TODO:最大化以后,地图下方白边
<template>
  <!-- 地图组件容器 -->
  <div class="map ">

    <div class="gg-build-show grid-content" id="gg-build-show">

      <div id="monitorPage" class="gg-device-image">
        <!-- 地图放大缩小按钮 -->
        <!--<span :class="[bigIcon,'build-enlargeBtn']" @click="showBigScreen"></span>-->
        <!-- 显示地图图片区域 -->
        <div id="g2map" ref="g2map" class="gg-device-image">

        </div>

        <input id="videoPath" type="hidden" value>
        <!-- 列表 -->
        <div class="gg-fire-content">
          <!-- 火警图标 -->
          <div class="gg-fire-icon"></div>
          <!-- 火警列表 -->
          <div class="fire-alarm-outside">

            <div id="monitor-alarm-list" class="gg-fire-panel scroll-normal">
              <!-- //TODO: 组件化下拉列表 -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <Video v-if="isShowVideo" :videoPath="videoPath" :isShowVideo="isShowVideo" v-on:showV="showV" />
  </div>
</template>

<script>
  import Cookie from "js-cookie";
  import api from "~/config/http";
  import monitorMain_crud from "~/assets/page/real-time-monitoring/js/monitorCrud";

  import Video from '~/components/G2MapVideo/Video';

  export default {
    name: "g2map",
    props: {
      bigScreen: Boolean
    },
    components: {
      Video
    },
    data() {
      return {
        userObj: api.getGlobalVal('userObj'),
        ZS: {},
        MONITOR: {},
        bigFlag: this.bigScreen,
        bigIcon: (this.bigFlag ? 'icon-narrow' : 'icon-enlarge'),
        styleObj: {
          position: 'relative',
          width: '100%',
          height: '',
          top: '0'
        },
        videoPath: '',
        isShowVideo: false,
        viewUnitId:""
      };
    },
    mounted() {
      // 防止sa切换根路径时,报错,取消地图初始化
      if (this.userObj.loginName == 'sa') {
        this.$router.push({
          name: 'AuthManage-UserManage',
          params: {
            ref: 'login'
          }
        });
      } else {
        this.$store.commit('updateFloorDetail', Math.random());
        this.monitorMain_bind();
      }
    },
    methods: {
      // g2地图相关 开始
      page_init: function () {
        this.ZS.MONITOR = {};
        this.ZS.MONITOR.enterpriseId = this._Storage.getObj("fileItem", "obj").unitId; //当前监测企业id
        //this.ZS.MONITOR.enterpriseId = "110105YZDW201904110001";
        //获取平面图路径并加载
				
        monitorMain_crud.getMonitorPlan(
          this.ZS.MONITOR.enterpriseId,
          this.map_init
        );

        // 绑定页面事件
        this._bind_event();
        // monitorMain_crud.getAlarmList(
        //   this.ZS.MONITOR.enterpriseId,
        //   this.loadAlarmList,

        // );

      },
      map_init: function (picUrl) {
        //var picUrl = "http://112.27.198.15:9832/image/floorImage/AHHF_QHHFY_99999998/ASC.jpg"
        
        var _that = this;
        // 创建地图
        var g2map = new this.gs2.maps.Map({
          // var g2map = new Vue.$gs2.maps.Map({
          defaultExtent: {
            center: [0, 0],
            maxZoom: 5,
            minZoom: 3,
            extent: [0, 0, 1800000, 1000000], //图片范围，请按照坐标系的范围给出，此为3857的坐标系范围
            projection: "EPSG:3857", // 设置地图坐标系
            level: 3
          } // 为方便展示设置视野中心点的范围
        });

        // 初始化地图，传入要初始化的DOM对象的id
        g2map.init({
          targetId: "g2map"
        });
        this.ZS.MONITOR.g2map = g2map;

        // g2map.on("resize", function (newSize, oldSize) {
        //     console.log("监听浏览窗口大小改变事件:map.on('resize',callback);");
        //     g2map.setViewSize(newSize[0],newSize[1]);
        // })
        this.ZS.MONITOR.setViewSize = function (w, h) {
          g2map.setViewSize(w, h);
        };

        // 园区图
        var img = new Image();

        //
        // var picUrl =
        //     api.forent_url.pic_url + "/floorImage/AHHF_QHHFY_99999998/ASC.jpg";
				
        	img.src = picUrl;
	        img.onload = function () {
	          var w = img.width * 1000;
	          var h = img.height * 1000;
	          //创建一个图像图层
	          _that.ZS.MONITOR.imageLayer = new _that.gs2.lys.ImageLayer({
	            imageType: 702,
	            extent: [0, 0, w, h], //图片范围，请按照坐标系的范围给出，此为3857的坐标系范围          
	            url: picUrl +"?" + Math.random() // 图层服务 url
	          });
	          // 将 图像图层添加到地图
	          _that.ZS.MONITOR.g2map.addLayer(_that.ZS.MONITOR.imageLayer);
	          var point = new _that.gs2.geom.Point({
	            x: w / 2,
	            y: h / 2 - 40000,
	            spatialReference: _that.gs2.geom.SpatialReference.EPSG3857
	          });
	          _that.ZS.MONITOR.g2map.setCenter(point);
	          _that.ZS.MONITOR.g2map.zoomTo(3);
	          
	          //创建元素图层
		        _that.ZS.MONITOR.elementLayer = new _that.gs2.lys.ElementLayer();
		        _that.ZS.MONITOR.elementLayer.setZIndex(9);
		        _that.ZS.MONITOR.g2map.addLayer(_that.ZS.MONITOR.elementLayer);
		
		        //创建tooltip管理
		        _that.ZS.MONITOR.tooltipWare = new _that.gs2.ext.TooltipWare({
		          excluseLayerIds: _that.ZS.MONITOR.elementLayer.getLayerId(),
		          map: _that.ZS.MONITOR.g2map
		        });
		
		        //获取监测建筑信息并加载
		        monitorMain_crud.getMonitorBuildInfo(
		          _that.ZS.MONITOR.enterpriseId,
		          _that.loadBuild
		        );
	        };
	        
	        img.onerror = function () {
	          var w = img.width * 1000;
	          var h = img.height * 1000;
	          //创建一个图像图层
	          _that.ZS.MONITOR.imageLayer = new _that.gs2.lys.ImageLayer({
	            imageType: 702,
	            extent: [0, 0, w, h], //图片范围，请按照坐标系的范围给出，此为3857的坐标系范围          
	            url: "" // 图层服务 url
	          });
	          // 将 图像图层添加到地图
	          _that.ZS.MONITOR.g2map.addLayer(_that.ZS.MONITOR.imageLayer);
	          var point = new _that.gs2.geom.Point({
	            x: w / 2,
	            y: h / 2 - 40000,
	            spatialReference: _that.gs2.geom.SpatialReference.EPSG3857
	          });
	          _that.ZS.MONITOR.g2map.setCenter(point);
	          _that.ZS.MONITOR.g2map.zoomTo(3);
	         
	        };
	        

        
        
      },
      loadBuild: function (data) {
      	console.log(data,"555555555")
        var buildArr = data || {};
        this.ZS.MONITOR.buildData = buildArr;
        this.$store.commit('updateZSBuildData', buildArr);
        for (var key in buildArr) {
          var build = buildArr[key];
          this.viewUnitId = build['unitId'];
          // alarmcount += parseInt(build['alarmState']);
          // accicount += parseInt(build['troubleType']);
          //构造一个点(坐标，空间参考系）
          var point = new this.gs2.geom.Point({
            /*x: build["unitPointX"],
            y: build["unitPointY"],*/
           	x: build["longitude"],
            y: build["latitude"],
            spatialReference: this.gs2.geom.SpatialReference.EPSG3857
          });
          //
          var pictureMarker = new this.gs2.syms.Picturemarkersymbol({
            source: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEwN0JBRjg3MzJGRjExRThBMjcwREFDMDM5RkQwMjYxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEwN0JBRjg4MzJGRjExRThBMjcwREFDMDM5RkQwMjYxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QkFGODUzMkZGMTFFOEEyNzBEQUMwMzlGRDAyNjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QkFGODYzMkZGMTFFOEEyNzBEQUMwMzlGRDAyNjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6frkWPAAAHmUlEQVR42uxY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",
            width: 40,
            height: 40,
            offsetX: 20,
            offsetY: 20
          });
          var ele = new this.gs2.ele.Element({
            geometry: point,
            symbol: pictureMarker
          });
          ele.tag = build;
          this.ZS.MONITOR.elementLayer.add(ele);
          if (build.runState === NaN || build.runState === '') {
            build.runState = 0;
          }
          if (build.alarmState === NaN || build.alarmState === '') {
            build.alarmState = 0;
          }
          if (build.troubleType === NaN || build.troubleType === '') {
            build.troubleType = 0;
          }
          if (build.warningState === NaN || build.warningState === '') {
            build.warningState = 0;
          }

          if (api.getGlobalVal('attribute') == 'linyi') {
            var tooltipTemplate =
              '<div class="gg-build-monitor">\n' +
              '                    <div class="gg-build-head"  title="' +
              build.buildName +
              '">' +
              build.buildName +
              "</div>\n" +
              '                    <div class="gg-build-body">\n' +
              '                       <div class="build-dev-num">' +
              build.deviceCount +
              "</div>\n" +
              '                       <div class="build-dev-type">设备数</div>\n' +
             
              "                    </div>\n" +
              "                  </div>\n";

            var tooltip = new this.gs2.ext.Tooltip({
              anchor: point, //提示在地图上停靠位置
              content: tooltipTemplate, //提示内容
              layerId: this.ZS.MONITOR.elementLayer.getLayerId(), //提示所在图层ID
              offset: [-110, -235], //位置偏移量
              //offset: [0, 0], //位置偏移量
              className: 'g2-tooltip' //tooltip样式
            });
          } else {
            var tooltipTemplate =
              '<div class="gg-build-monitor">\n' +
              '                    <div class="gg-build-head"  title="' +
              build.buildName +
              '">' +
              build.buildName +
              "</div>\n" +
              '                    <div class="gg-build-body">\n' +
              '                       <div class="build-dev-num">' +
              build.deviceCount +
              "</div>\n" +
              '                       <div class="build-dev-type">设备数</div>\n' +
             
              "                    </div>\n" +
              "                  </div>\n";

            var tooltip = new this.gs2.ext.Tooltip({
              anchor: point, //提示在地图上停靠位置
              content: tooltipTemplate, //提示内容
              layerId: this.ZS.MONITOR.elementLayer.getLayerId(), //提示所在图层ID
              offset: [-60, -155], //位置偏移量
              className: "g2-tooltip" //tooltip样式
            });
          }
          this.ZS.MONITOR.tooltipWare.add(tooltip); //将tooltip添加到tooltipWare中
        }

        /*  $('#alarmcount').text(alarmcount);
         $('#accicount').text(accicount);*/

        //获取监测建筑信息并加载
        monitorMain_crud.getVideoBuildInfo(
          this.ZS.MONITOR.enterpriseId,
          this.loadVideoBuild
        );
        //debugger;
      },
      //加载视频点信息
      loadVideoBuild: function (data) {
        var elements = [];
        for (var i in data) {
          var point = new this.gs2.geom.Point({
            x: data[i].longitude,
            y: data[i].latitude,
            spatialReference: this.gs2.geom.SpatialReference.EPSG3857
          });
          var pictureMarker = new this.gs2.syms.Picturemarkersymbol({
            source: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGYmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA0LTIzVDE5OjMyOjU2KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNC0yM1QxOTozODo0MyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNC0yM1QxOTozODo0MyswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyM2ZkOTdkMS04YjJiLWNhNGUtOGU3OC0yODFhMzdjM2YwZDMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5NGJiMDViYi04ZTFiLWJiNDMtOTBmMi0zMjIyYmQwYjIwNWYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZTkwYTg4Ny1iOWJjLWFjNDAtYjk1Ni01OTM5ZTg4MjdmZWIiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRlOTBhODg3LWI5YmMtYWM0MC1iOTU2LTU5MzllODgyN2ZlYiIgc3RFdnQ6d2hlbj0iMjAxOC0wNC0yM1QxOTozMjo1NiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzZmQ5N2QxLThiMmItY2E0ZS04ZTc4LTI4MWEzN2MzZjBkMyIgc3RFdnQ6d2hlbj0iMjAxOC0wNC0yM1QxOTozODo0MyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Piqf/mwAAAi+SURBVFiFzZhpbFTXFYC/+5YZj8fjGS/jbWyCDcZmaTAmKdnYaaK0ghI1UIk2UiolkSpVahrxo0rVpv+qki5SfkRR/0RK0lRRkuIQIhJIaSAEMA07GAeKABsPxtt4nfW9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",
            width: 40,
            height: 40,
            offsetX: 20,
            offsetY: 20
          });
          var ele = new this.gs2.ele.Element({
            geometry: point,
            symbol: pictureMarker
          });
          ele.tag = data[i];
          ele.type = "video";
          elements.push(ele);
        }
        this.ZS.MONITOR.elementLayer.addElements(elements);

        // 绑定地图事件
        this._bind_mapEvent();
      },
      loadAlarmList: function (data) {
        var _that = this;
        //时间格式化工具
        Date.prototype.format = function (fmt) {
          var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            S: this.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              (this.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
          }
          for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
              fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ?
                o[k] :
                ("00" + o[k]).substr(("" + o[k]).length)
              );
            }
          }
          return fmt;
        };

        var tpl = "";
        var fire_icon = $(".gg-fire-icon");
        if (api.getGlobalVal('attribute') == 'linyi') {
          if (data.length > 0) {
            fire_icon.removeClass('gg-fire-icon_default');
            fire_icon.addClass('gg-fire-icon_fire');
            for (var i in data) {
              var alarm = data[i];
              var date = new Date(alarm.warningTime);
              var time = alarm.warningTime;
              time = time.replace(/-/g, ':').replace(' ', ':');
              time = time.split(':');
              var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]);
              tpl +=
                '<dl class="gg-fire-dl clearfix">\
                                <div class="fire-alarm-time">\
                                   <div class="gg-fire-dt">' +
                time1.format('hh:mm') + '</div>\
                                   <div class="gg-fire-date">' +
                time1
                .format('yyyy-MM-dd') +
                '</div>\
                                </div>\
                                   <div class="gg-fire-dd">\
                                        <h3 class="gg-fire-title" title="' +
                alarm.deviceType + '">' + alarm.deviceType +
                '</h3>\
                                        <p class="gg-fire-add" title="' + alarm.deviceAddress +
                '">' + alarm.deviceAddress +
                '</p>\
                                    </div>\
                                </dl>';
            }
          } else {
            $("#monitor-alarm-list").addClass("fire-none-data")
            fire_icon.removeClass('gg-fire-icon_fire');
            fire_icon.addClass('gg-fire-icon_default');
            tpl = '<div class="gg-text-notice">暂无报警！</div>'
          }
          $('#monitor-alarm-list').html(tpl);
          $('#monitor-alarm-list .gg-fire-dl').click(function () {
            _that.ZS.MONITOR.currentBuild = data[$(this).index()].buildId;
            _that.ZS.MONITOR.currentFloor = data[$(this).index()].floorId;
            _that.ZS.MONITOR.currentDevice = data[$(this).index()].deviceId;
            _that.$store.commit('updateZSCurrentBuildname', data[$(this).index()].buildName);
            _that.$store.commit('updateZSCurrentBuild', data[$(this).index()].buildId);
            _that.$store.commit('updateZSCurrentFloor', data[$(this).index()].floorId);
            _that.$store.commit('updateZSDlclick', data[$(this).index()].floorId);
            _that.$store.commit('updateZSDevice', data[$(this).index()].deviceId);
            _that.$store.commit('updateFloorDetail', Math.random());
            _that.$emit('changeShowType', false)
            //清空搜索栏信息
            _that.$store.commit('updateZSdeviceTypeId', '');
            _that.$store.commit('updateZSdeviceStatus', '');
          });
        } else {
          if (data.length > 0) {
            fire_icon.removeClass("gg-fire-icon_default");
            fire_icon.addClass("gg-fire-icon_fire");

            for (var i in data) {
              var alarm = data[i];
              var date = new Date(alarm.warningTime);
              var time = alarm.warningTime;
              time = time.replace(/-/g, ':').replace(' ', ':');
              time = time.split(':');
              var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]);
              tpl +=
                '<dl class="gg-fire-dl clearfix">\
                                          <div class="fire-alarm-time">\
                                            <div class="gg-fire-dt">' +
                time1.format("hh:mm") +
                '</div>\
                                            <div class="gg-fire-date">' +
                time1.format("yyyy-MM-dd") +
                '</div>\
                                          </div>\
                                            <div class="gg-fire-dd">\
                                                  <h3 class="gg-fire-title" title="' +
                alarm.deviceType +
                '">' +
                alarm.deviceType +
                '</h3>\
                                                  <p class="gg-fire-add" title="' +
                alarm.deviceAddress +
                '">' +
                alarm.deviceAddress +
                "</p>\
                                              </div>\
                                          </dl>";
            }
          } else {
            $("#monitor-alarm-list").addClass("fire-none-data");
            fire_icon.removeClass("gg-fire-icon_fire");
            fire_icon.addClass("gg-fire-icon_default");
            tpl = '<div class="gg-text-notice">暂无报警！</div>';
          }
          $("#monitor-alarm-list").html(tpl);
          $("#monitor-alarm-list .gg-fire-dl").click(function () {
            _that.ZS.MONITOR.currentBuild = data[$(this).index()].buildId;
            _that.ZS.MONITOR.currentFloor = data[$(this).index()].floorId;
            _that.ZS.MONITOR.currentDevice = data[$(this).index()].deviceId;
            _that.$store.commit('updateZSCurrentBuildname', data[$(this).index()].buildName);
            _that.$store.commit('updateZSCurrentBuild', data[$(this).index()].buildId);
            _that.$store.commit('updateZSCurrentFloor', data[$(this).index()].floorId);
            _that.$store.commit('updateZSDlclick', data[$(this).index()].floorId);
            _that.$store.commit('updateZSDevice', data[$(this).index()].deviceId);
            _that.$store.commit('updateFloorDetail', Math.random());
            _that.$emit('changeShowType', false);
            //清空搜索栏信息
            _that.$store.commit('updateZSdeviceTypeId', '');
            _that.$store.commit('updateZSdeviceStatus', '');
          });
        }
      },
      // 绑定地图事件
      _bind_mapEvent: function () {
        //  监听建筑点击事件
        var _that = this;
        _that.ZS.MONITOR.g2map.on("click", function (
          button,
          shift,
          screenX,
          screenY,
          mapX,
          mapY,
          handle
        ) {
          var ele = _that.ZS.MONITOR.elementLayer.hitTest(screenX, screenY);
          if (ele) {
            $("#yingshiyun").remove();
            if (ele.element.type == "video") {
              var left = $("#g2map").width() / 2 - 300;
              var top = $("#g2map").height() / 2 - 250;
              $("#videoPath").val(ele.element.tag.videoPath);
              _that.videoPath = ele.element.tag.videoPath;
              _that.isShowVideo = true;
              // $("#monitorPage").append(
              //     "<iframe id='yingshiyun' name='yingshiyun' style='width: 600px;height: 500px;position: absolute;z-index: 99999;left: " +
              //     left +
              //     "px;top: " +
              //     top +
              //     "px;border: 0;' src='" +
              //     api.api.forent_url.localHostName +
              //     "/page/real-time-monitoring/video.html'></iframe>"
              // );
            } else {
              _that.ZS.MONITOR.currentBuild = ele.element.tag.buildId;
              if (!ele.element.tag.buildName || !ele.element.tag.buildId) {
                _that.$message.error('楼栋楼层信息不全');
                return;
              }
              _that.$store.commit('updateZSCurrentBuildname', ele.element.tag.buildName);
              _that.$store.commit('updateZSCurrentBuild', ele.element.tag.buildId);
              _that.$store.commit('updateZSDlclick', '');
              _that.$store.commit('updateZSDevice', '');
              _that.$store.commit('updateFloorDetail', Math.random());
              _that.$store.commit('updateFrom', false);
              _that.$emit('changeShowType', false);
              //清空搜索栏信息
              _that.$store.commit('updateZSdeviceTypeId', '');
              _that.$store.commit('updateZSdeviceStatus', '');
              
              _that.$router.push({ name: 'G2mapNew', params: {  } })
				      _that.$store.commit('updateZSCurrentBuild',"");
				      _that.$store.commit('updateShBuildId',ele.element.tag.buildId);
				      localStorage.setItem("unitId",_that.viewUnitId)
            }
          }
        });
        //  监听建筑点击事件
        _that.ZS.MONITOR.g2map.on("mousemove", function (
          button,
          shift,
          screenX,
          screenY,
          mapX,
          mapY,
          handle
        ) {
          document.getElementById("g2map").style.cursor = "";
          var ele = _that.ZS.MONITOR.elementLayer.hitTest(screenX, screenY);
          if (ele) {
            document.getElementById("g2map").style.cursor = "pointer";
          }
        });
      },
      /**
       *  绑定页面事件
       * @private
       */
      _bind_event: function () {
        // 切换到列表
        $("#monitor-switchListBtn").click(function () {
          $("#gg-build-show").load(
            api.forent_url.localHostName + "/page/real-time-monitoring/list.html"
          );
        });
      },
      /**
       * 地图窗口发生改变时 自适应大小
       * @private
       */
      _initMapViewSize: function () {
        //调整地图size
        var width = $("#g2map")[0].offsetWidth;
        var height = $("#g2map")[0].offsetHeight;
        if (!this.ZS.MONITOR.g2map) return;
        this.ZS.MONITOR.g2map.setViewSize(width, height);
      },
      monitorMain_bind() {

        var build_sizeToggle = $(".gg-build-show")[0].style;
        var build_sizeHeight = build_sizeToggle.height;

        if ($(".gg-build-show").css("position") == "absolute") {
          $(".build-enlargeBtn").hide();
          $(".build-narrowBtn").show();
        } else {
          $(".build-narrowBtn").hide();
          $(".build-enlargeBtn").show();
        }

        var fire_content = $(".gg-fire-content");
        var fire_icon = $(".gg-fire-icon");
        var fire_panel = $(".gg-fire-panel");
        fire_icon.click(function () {
          $(".fire-alarm-outside").toggle();
        });

        this.page_init();

        //解决加载时放大镜图标重叠问题
        // $('.icon-enlarge').click(function () {
        //     document.querySelector('.icon-narrow')[0].style.display = 'block'
        // })
      },
      showBigScreen: function () {
        this.bigFlag = !this.bigFlag;
        this.$emit('changeBigSmall', this.bigFlag);
        this.bigIcon = this.bigFlag ? 'icon-narrow' : 'icon-enlarge';
        var build_sizeToggle = $(".gg-build-show")[0].style;
        var build_sizeHeight = build_sizeToggle.height;
        // 全屏模式
        if (this.bigFlag) {
          this.styleObj = {
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "-10px"
          }
        } else {
          // 迷你模式
          this.styleObj = {
            position: "relative",
            width: "100%",
            height: "",
            top: "0"
          }
        }
        build_sizeToggle.position = this.styleObj.position;
        build_sizeToggle.width = this.styleObj.width;
        build_sizeToggle.height = this.styleObj.height;
        build_sizeToggle.top = this.styleObj.top;
        this._initMapViewSize();
      },
      // g2地图相关 结束
      showV: function (val) {
        this.isShowVideo = val;
      }
    },
    watch: {
      '$store.state.pageWidB': function (newVal, oldVal) {
        let that = this;
        setTimeout(() => {
          that._initMapViewSize();
        }, 100);
        //this._initMapViewSize()
      },
      '$store.state.floorDetail': function (newVal, oldVal) {
        this.bigFlag = this.bigScreen;
        this.showBigScreen();
      }
    }
  };

</script>

<style lang="scss" scoped>
  @import "~/assets/css/ol.css";

  .map {

    /*buildshow*/
    // position:relative;
    .bigScreen {
      background: rgba(0, 0, 0, 0.5);
      padding: 10px;
      border-radius: 10px;
    }

    // 地图容器 外边框
    .gg-build-show {
      margin-top: 10px;
      border-radius: 7px;
      margin-left: 0;
      width: 100%;
      height: calc(100vh - 189px);
      min-height: 487px;
      background: #fff;
      box-shadow: 0 0 10px rgba(37, 40, 41, 0.13);
      z-index: 3;
      position: relative;

      // 地图图片部分
      .gg-device-image {
        height: 100%;
      }
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
    .icon-lift-up>i,
    .icon-lift-down>i {
      font-size: 26px;
    }

    .icon-lift-up:hover,
    .icon-lift-down:hover,
    .floor-btn-div>.floor-fire-btn>i:hover {
      cursor: pointer;
    }

    .floor-ul-div {
      width: 62px;
      height: 344px;
      position: relative;
      overflow: hidden;
    }

    .floor-ul-div>ul {
      list-style: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 0;
      margin: 0;
    }

    .floor-ul-div>ul>li {
      width: 62px;
      height: 40px;
      line-height: 40px;
      margin-bottom: 3px;
      color: #4790fa;
    }

    .floor-ul-div>ul>li>a {
      display: block;
      color: #4790fa;
      background: #e9f2ff;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      text-decoration: none;
    }

    .floor-ul-div>ul>li.floor-lift-cur>a {
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
        padding-top: 10%;

        .storeIcon,
        .storeIcon2,
        .storeIcon3 {
          background-size: 80% !important;
        }

        .host-text {
          top: 90px !important;
          width: 140%;
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
        height: calc(100vh - 162px);
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
        padding-top: 4%;

        .storeIcon,
        .storeIcon2,
        .storeIcon3 {
          background-size: 80% !important;
        }

        .host-text {
          top: 80px !important;
          width: 140%;
        }
      }

      .host_text_container li {
        width: 90%;

        .right_stage {
          padding-left: 90px;
        }
      }

      /* 临沂 */
      .fire_linyi_app .gg-build-head {
        height: 38px;
      }

      .gg-build-body {
        width: 8rem;
        height: 8rem;
      }

      .fire_linyi_app .gg-build-body {
        height: 110px;
      }

      .gg-head-line {
        height: 30px;
      }

      .fire_linyi_app .build_stateNum {
        height: 26px;
        line-height: 26px;
      }

      .fire_linyi_app .monitorList_tab {
        font-size: 18px;
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
  }

  .icon-enlarge {
    position: absolute;
    width: 38px;
    height: 38px;
    cursor: pointer;
    right: 20px;
    top: 20px;
  }

  .icon-narrow {
    position: absolute;
    width: 38px;
    height: 38px;
    cursor: pointer;
    right: 20px;
    top: 20px;
  }


  .icon-enlarge {
    background: url(../assets/img/icon-enlarge.png) no-repeat;
  }

  .icon-narrow {
    background: url(../assets/img/icon-narrow.png) no-repeat;
  }

</style>
<style lang="scss">
  .ol-zoom,
  .ol-attribution {
    display: none !important;
  }

  /* 临沂样式 */
  .fire_linyi_app .gg-build-monitor {
    width: 216px !important;
    border-radius: 4px;
    // left:-110px;
    // top:-228px;
  }

  .fire_linyi_app .gg-build-body {
    width: calc(216px - 1rem) !important;
    border-radius: 4px;
  }

  .fire_linyi_app .total_stateNum {
    height: 34px;
    line-height: 34px;
    border-bottom: 1px solid #e6e6e6;
  }

  .fire_linyi_app .build_stateNum {
    position: relative;
    height: 28px;
    line-height: 28px;
  }

  .fire_linyi_app .build_state_title {
    float: left;
    margin-left: 18px;
  }

  .fire_linyi_app .build_state_num {
    float: right;
    margin-right: 18px;
  }

  .fire_linyi_app .build_state_alarm .build_state_num {
    color: #f03718;
  }

  .fire_linyi_app .build_state_warn .build_state_num {
    color: #5c52cc;
  }

  .fire_linyi_app .build_state_trouble .build_state_num {
    color: #ff7800;
  }

  //gg-build-show
  // 由jquery添加的html元素不带有data-v 属性 暂时把样式放在这里
  .grid-content.gg-ditu {
    .grid-content {
      line-height: 20px;
    }

    .gg-build-show {

      // 火警logo显示区域
      .gg-fire-content {
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 20;

        // 火警logo
        .gg-fire-icon {
          position: relative;
          width: 65px;
          height: 65px;
          text-align: center;
          border-radius: 5px;
          z-index: 20;
          cursor: pointer;
          background: url("~assets/page/real-time-monitoring/image/fire-logo.png") no-repeat center;
          display:none;
        }

        //报警信息列表
        .fire-alarm-outside {
          display: none;
          position: absolute;
          bottom: 80px;
          right: 0;
          background-color: #fff;
          border-radius: 5px;
          padding: 0 10px;
          transition: all ease-in-out 0.1s;
          transform-origin: 50% 50%;
          z-index: 10;

          // 列表显示主面板
          #monitor-alarm-list.gg-fire-panel.scroll-normal {
            width: 380px;
            max-height: 400px;
            overflow-y: auto;
            background: #fff;

            dl {
              position: relative;
              margin: 0;
              padding-top: 10px;
              padding-bottom: 10px;
              border-bottom: 1px solid #bfbfbf;
              cursor: pointer;

              .fire-alarm-time {
                width: 22%;
                float: left;
                text-align: center;

                .gg-fire-dt {
                  height: 28px;
                  line-height: 28px;
                  font-size: 20px;
                  color: #f00;
                  border: 1px solid #f00;
                  border-radius: 20px;
                  background: #f0d3d3;
                  margin-bottom: 4px;
                }

                .gg-fire-date {
                  color: #f00;
                  font-size: 12px;
                }
              }

              .gg-fire-dd {
                margin-left: 10px;
                display: inline-block;
                width: 74%;

                .gg-fire-title {
                  width: 100%;
                  color: #000;
                  font-size: 16px;
                  line-height: 24px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }

                .gg-fire-add {
                  font-size: 16px;
                  margin-top: 4px;
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }

          &::before {
            content: "";
            position: absolute;
            left: 92%;
            bottom: -17px;
            display: block;
            width: 0;
            height: 0;
            border: 9px solid transparent;
            margin-left: -9px;
            border-top-color: #fff;
            z-index:1;
          }

          &::before {
            left: 90%;
          }

          .gg-fire-dd {
            margin-left: 10px;
            display: inline-block;
            width: 74%;
          }
        }
      }

      /*  */
      //地图部分
      #monitorPage.gg-device-image {
        padding: 10px;
        box-sizing: border-box;
        // height: calc(100%);

        // .ol-control {
        //     [class^="ol-"] {
        //         display: none;
        //     }

        //     button {
        //         display: none;
        //     }
        // }

        #g2map.gg-device-image {
          .ol-viewport {
            &:focus {
              outline-style: none;

              .ol-unselectable {
                /*display: none;*/
                background: #e9ebf2;
              }
            }

            .ol-overlay-container {
              .gg-build-monitor {
                width: 120px;
                background: #4356c5;
                padding-bottom: 0.5rem;
                position: relative;

                &:before {
                  content: "";
                  position: absolute;
                  left: 50%;
                  bottom: -1rem;
                  display: block;
                  border: 1rem solid transparent;
                  margin-left: -0.9rem;
                  border-top-color: #4356c5;
                  border-bottom: none;
                }
              }

              .gg-build-head {
              	height: 40px;
                padding-top: 0.5rem;
                text-align: center;
                color: #fff;
                font-size: 2rem;
                display: -webkit-box;
                white-space: pre-wrap;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-pack: center;
                -webkit-box-align: center;
                -webkit-box-orient: vertical;
              }

              .gg-build-body {

                // margin-top: .5rem;
                margin: {
                  top: 0.5rem;
                  left: 0.5rem;
                  right: 0.5rem;
                  bottom: 0.1rem;
                }

                width: calc(100% - 1rem);
                height: 70px;
                background: #fff;

                .gg-build-center {
                  display: inline-block;
                  text-align: center;
                  width: 45%;
                }

                .build-dev-num {
                  font-size: 2.8rem;
                  color: #3a3a3a;
                  text-align: center;
                  padding-top: 1rem;
                }

                .build-dev-type {
                  padding-top: 0.4rem;
                }

                .build-alarm-num {
                  font-size: 1.6rem;
                  color: #f54b48;
                }

                .build-fault-num {
                  font-size: 1.6rem;
                  color: #e26e33;
                }

                .build-dev-type,
                .build-fault-name,
                .build-alarm-name {
                  font-size: 2rem;
                  text-align: center;
                  margin-bottom: 0.2rem;
                }
              }

            }
          }
        }
      }
    }




  }

  .clearfix:after,
  .clearfix:before {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  @media screen and (max-width: 1440px) {

    .grid-content.gg-ditu {
      .gg-build-show {
        // 火警logo显示区域
        .gg-fire-content {
          // 火警logo
          .gg-fire-icon {
            background-size: 80%;
          }
          .fire-alarm-outside {
            #monitor-alarm-list.gg-fire-panel.scroll-normal {
              width: 314px;
              max-height: 300px;
              dl {
               
                padding-top:8px;
                padding-bottom:8px;
                .fire-alarm-time {
                  .gg-fire-dt {
                      font-size:16px;
                  }
                }
                .gg-fire-dd {
                  .gg-fire-title {
                    font-size:14px;
                  }
                  .gg-fire-add {
                    font-size:12px;
                  }
                }
              }
            }
          }  
        }
      }
    }

  }

</style>
