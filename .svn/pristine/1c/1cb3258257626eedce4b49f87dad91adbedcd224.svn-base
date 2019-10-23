<template>
  <main :class="['map-container',{group_light:group_light}]">
    <div id="map">

    </div>
    <!--搜索-->
    <div class="gg-search">
      <input v-model.trim="searchText" id="searchInput" @keyup="handlerSearch($event)" @keydown.enter="MSearch" type="search"
        placeholder="输入单位名称查询"><span class="search_clear_btn ggicon-close" @click="handleClear"></span>
      <div style="cursor: pointer;" class="search_btn ggicon-magnifying-glass" @click="MSearch"></div>
    </div>
    <ul id="gg-search-tip" class="gg-search-tip" v-show="searchFlag">
      <li :class="{now:index==searchIndex}" :key="index" v-for="(item,index) in dataList" @click="clickLi(item)">
        {{item.orgName}}
      </li>
    </ul>
    <!--左上窗口-->
    <div class="gg-access-number">
      <div class="gg-access-number__head">
        <div class="gg-access-number__title"><span class="ggicon-danwei"></span>接入单位数<span id="uinitCount"></span></div>
      </div>
      <div class="gg-access-number__main">
        <div class="gg-access-number__body">
          <ul>
            <li>
              <div id="gg-num-alarm" class="gg-num-alarm window-num-size">0</div>
              <div class="gg-dialog-number">今日报警</div>
            </li>
            <li>
              <div class="gg-division-line"></div>
            </li>
            <li>
              <div id="gg-num-fault" class="gg-num-fault window-num-size">0</div>
              <div class="gg-dialog-number">监测故障</div>
            </li>
            <li>
              <div class="gg-division-line"></div>
            </li>
            <li>
              <div id="gg-num-hidden" class="gg-num-hidden window-num-size">0</div>
              <div class="gg-dialog-number">当前隐患</div>
            </li>
          </ul>
          <div class="gg-access-number__more" style="transform: rotate(180deg);">
            <b @click="switchToggle" class="ggicon-arrowDown"></b>
          </div>
        </div>

        <div class="gg-access-number__toggle">
          <div class="access-warp-line"></div>
          <!--<div class="gg-access-number__foot">-->
          <!--<ul>-->
          <!--<li class="access-company-sort">-->
          <!--<span><b class="ggicon-sort">TOP排序</b></span>-->
          <!--</li>-->
          <!--&lt;!&ndash;<li class="access-company-relation">-->
          <!--<span><b class="ggicon-relation">企业关系</b></span>-->
          <!--</li>&ndash;&gt;-->
          <!--</ul>-->
          <!--</div>-->
          <div class="gg-access-number__add">
            <ul class="access-company-sort__add">
              <li class="add-today-warn">
                <div class="access-add-warn">今日报警</div>
                <ul>
                  <li class="warn-cpmpany-name">无</li>
                  <li class="warn-cpmpany-name">无</li>
                  <li class="warn-cpmpany-name">无</li>
                  <li class="warn-cpmpany-name">无</li>
                  <li class="warn-cpmpany-name">无</li>
                </ul>
                <div id="add-today-warn"></div>
              </li>
              <li class="add-check-fault">
                <div class="access-add-fault">监测故障</div>
                <ul>
                  <li class="fault-cpmpany-name">无</li>
                  <li class="fault-cpmpany-name">无</li>
                  <li class="fault-cpmpany-name">无</li>
                  <li class="fault-cpmpany-name">无</li>
                  <li class="fault-cpmpany-name">无</li>
                </ul>
                <div id="add-check-fault"></div>
              </li>
              <li class="add-now-hidden">
                <div class="access-add-hidden">当前隐患</div>
                <ul>
                  <li class="hidden-cpmpany-name">无</li>
                  <li class="hidden-cpmpany-name">无</li>
                  <li class="hidden-cpmpany-name">无</li>
                  <li class="hidden-cpmpany-name">无</li>
                  <li class="hidden-cpmpany-name">无</li>
                </ul>
                <div id="add-now-hidden"></div>
              </li>
            </ul>
            <div class="access-company-relation__add"></div>
          </div>
        </div>
      </div>
    </div>
    <!--右下方数据展示==================================-->
    <div class="gg-warn-trend">
      <div class="alarm-trend-table warn-table-chart" style="display:none;">
        <div class="warn-table-close"><span class="ggicon-close" @click="closeEch"></span></div>
        <div class="chart-trend-contain">
          <div class="alarm-trend-time">近30天</div>
          <p class="chart-trend-title">报警趋势</p>
          <div id="chart-alarm-trend"></div>
        </div>
        <div class="chart-trend-contain">
          <div class="alarm-trend-time">近30天</div>
          <p class="chart-trend-title">隐患趋势</p>
          <div id="chart-hidden-trend"></div>
        </div>
        <!--<div class="gps-trend-trans"></div>-->
        <div class="triangle_border_down">
          <span></span>
        </div>
      </div>

      <div class="warn-detail-table warn-table-chart">
        <div class="warn-table-close">
          <span class="ggicon-close" @click="closeEch"></span>
        </div>
        <ul id="query_alarmInfo" class="scroll-normal">
          <!--<li>-->
          <!--<div class="detail-fire-logo"><img src="image/fire_log.png" alt=""></div>-->
          <!--<div class="detail-fire-body">-->
          <!--<div class="detail-fire-name">单位名称</div>-->
          <!--<div class="detail-fire-address">单位地址</div>-->
          <!--<div class="detail-fire-date">17:34</div>-->
          <!--</div>-->
          <!--</li>-->
        </ul>
        <!--三角形-->
        <div class="triangle_border_down">
          <span></span>
        </div>
      </div>
      <ul class="warn-hidden-logo">
        <li class="alarm-trend">
          <div class="alarm-trend-logo" @click="openEchart1">
            <div></div>
          </div>
        </li>
        <li class="warn-detail">
          <div class="warn-detail-logo" @click="openEchart2">
            <div></div>
          </div>
          <div class="warn-detail-number">
            <span id="warn-detail-number">0</span>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
  import api from '~/config/http';
  import mapConfig from '~/assets/page/real-time-monitoring/js/config/config.json';
  import * as flag from '~/assets/page/real-time-monitoring/js/Group.js' //TODO:获取base图标
  export default {
    name: "ElMap",
    data() {
      return {
        pageDataList: [],
        GroupName: '',
        dataList: [],
        userObj: api.getGlobalVal('bus_group_userObj'),
        ZS: {
          MONITOR: {
            map: {}
          }
        },
        searchText: '',
        searchIndex: -1
      }
    },
    props: {
      group_light: {
        type: [Boolean, String],
        required: true,
        default: true
      }
    },
    computed: {
      searchFlag() {
        if (this.dataList.length <= 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    mounted() {
      this._initMap(); //获取地图
      this._initEnterpriseData(); //获取地图点位
      this.initAccess(); //获取单位信息
      this._initTrend(); //报警趋势,隐患趋势Echarts
      this._initCompanyAlarm(); //报警信息
      this._inputOnChange(); //搜索功能
    },
    methods: {
      handleClear() {
        $('#searchInput').val('');
        this.searchText = '';
        this.dataList = [];
        this.searchIndex = -1;
      },
      //初始化地图
      _initMap() {
        var _this = this;
        let g2map = new this.gs2.maps.Map(mapConfig.mapOpts);
        this.ZS.MONITOR.map = g2map;
        // 初始化地图，传入要初始化的DOM对象的id
        g2map.init({
          targetId: 'map'
        });
        this.ZS.MONITOR.toolTipWare = new this.gs2.ext.TooltipWare({
          map: g2map
        });
        //监听map事件
        this._eventMapChange(g2map);
        var baseLayer = new this.gs2.lys.TileLayer({
          layerType: this.gs2.lys.TileLayer,
          tileType: this.gs2.lys.TileType.BaiduMap,
          opacity: 1.0,
          visible: false,
          matrix: 22,
          url: mapConfig.baseLayer.url
        });
        var baseLayerObj = mapConfig.baseLayerDeep;
        var baseLayerDeep = new this.gs2.lys.TileLayer({
          layerType: this.gs2.lys.TileLayer,
          tileType: this.gs2.lys.TileType.BaiduMap,
          visible: true,
          baiduType: 99,
          tileUrlFunction: function (row, column, level) {
            var url = baseLayerObj.url + "?&x=" + row + "&y=" + column + "&z=" + level;
            for (var k in baseLayerObj) {
              if (k === 'url') {
                continue;
              }
              url += '&' + k + '=' + baseLayerObj[k];
            }
            return url;
          }
        });
        g2map.addLayer(baseLayer);
        g2map.addLayer(baseLayerDeep);
        //元素图层
        this.ZS.MONITOR._elementLayer = new this.gs2.lys.ElementLayer({
          id: "enterprise_elementLayer"
        });
        g2map.addLayer(this.ZS.MONITOR._elementLayer);
        //自动切换色调
        var group_nowDate = new Date().getHours();
        if (group_nowDate > 8 && group_nowDate < 20) {
          _this.$emit('childHandleGroup_light', true);
          baseLayer.setVisible(true);
          baseLayerDeep.setVisible(false);
        } else {
          _this.$emit('childHandleGroup_light', false);
          baseLayerDeep.setVisible(true);
          baseLayer.setVisible(false);
        }
        _this.initAccess();
        _this._initTrend();
        //手动切换色调
        $('.gg-header-nav_ul .changeTone').click(function () {
          if (_this.group_light) {
            _this.$emit('childHandleGroup_light', false);
            baseLayerDeep.setVisible(true);
            baseLayer.setVisible(false);
          } else {
            _this.$emit('childHandleGroup_light', true);
            baseLayer.setVisible(true);
            baseLayerDeep.setVisible(false);
          }
          _this.initAccess();
          _this._initTrend();
        })
      },
      _eventMapChange() {
        var that = this;
        /***
         * 鼠标单击事件
         * @param Number button 按下的鼠标按键
         * @param Number shift 是否同时按下的键盘上的shift键
         * @param Number screenX 事件发生时鼠标在屏幕上的X坐标
         * @param Number screenY 事件发生时鼠标在屏幕上的Y坐标
         * @param Number mapX 鼠标在地图上的X坐标
         * @param Number mapY 鼠标在地图上的Y坐标
         * @param Number handle 该事件是否已经不需要再处理
         */
        that.ZS.MONITOR.map.on("click", function (button, shift, screenX, screenY, mapX, mapY, handle) {
          var obj = that.ZS.MONITOR._elementLayer.hitTest(screenX, screenY);
          that.ZS.MONITOR.toolTipWare.clear();
          if (obj) {
            var element = obj.element;
            var point = element.geometry;
            //展示弹框
            that._showDetailedInfo(element.tag.orgCode, point);
          }
        })
        /***
         * 鼠标移动事件
         * @param Number button 按下的鼠标按键
         * @param Number shift 是否同时按下的键盘上的shift键
         * @param Number screenX 事件发生时鼠标在屏幕上的X坐标
         * @param Number screenY 事件发生时鼠标在屏幕上的Y坐标
         * @param Number mapX 鼠标在地图上的X坐标
         * @param Number mapY 鼠标在地图上的Y坐标
         * @param Number handle 该事件是否已经不需要再处理
         */
        that.ZS.MONITOR.map.on("mousemove", function (button, shift, screenX, screenY, mapX, mapY, handle) {
          var obj = that.ZS.MONITOR._elementLayer.hitTest(screenX, screenY);
          if (obj) {
            $("#map").css("cursor", "pointer");
          } else {
            $("#map").css("cursor", "default");
          }
        })
      },
      /*键盘修饰符*/
      handlerSearch(event) {
        if (this.dataList.length == 0) {
          return;
        }
        let e = event || window.event;
        let code = e.keyCode;
        switch (code) {
          case 38:
            this.searchIndex -= 1;
            this.searchIndex < 0 ? this.searchIndex = this.dataList.length - 1 : this.searchIndex;
            this.searchText = this.dataList[this.searchIndex].orgName;
            break;
          case 40:
            this.searchIndex += 1;
            this.searchIndex > this.dataList.length - 1 ? this.searchIndex = 0 : this.searchIndex;
            this.searchText = this.dataList[this.searchIndex].orgName;
            break;
          case 13:
            //回车事件
            this.clickLi(this.dataList[this.searchIndex]);
            break;
        }
      },
      //搜索单位信息
      _inputOnChange() {
        var _this = this;
        $("#searchInput").bind('input propertychange', function () {
          var value = $(this).val().trim();
          //传值查询下拉框数据
          if (value) {
            api.post(api.forent_url.base_url + "/system/getLikeEmsOrg", {
                orgName: value,
                orgCode: _this.userObj.orgCode
              })
              .then(data => {
                if (data && data.length > 5) {
                  data.length = 5;
                }
                _this.dataList = data;
              })
              .catch(error => {
                console.log("请求数据出错")
              })
          } else {
            _this._initEnterpriseData();
            _this.dataList = [];
          }
        });
      },
      //搜索按钮功能
      MSearch() {
        api.post(api.forent_url.base_url + "/system/getLikeEmsOrg", {
            orgName: this.searchText,
            orgCode: this.userObj.orgCode
          })
          .then(res => {
            if (res) {
              let flag = false;
              res.forEach(item => {
                if (item.orgName == this.searchText) {
                  flag = true;
                  const point = new this.gs2.geom.Point({
                    x: item.extendstr2,
                    y: item.extendstr3
                  });
                  this._showDetailedInfo(item.orgCode, point);
                  this.dataList = []; //TODO:数据清空,防止下方有搜索框
                }
              })
              if (!flag) {
                if (this.searchText.trim() == '') {
                  this.$message({
                    message: `您可能还没有输入任何文字！`,
                    type: 'warning'
                  });
                  return false;
                }
                this.$message({
                  message: `搜索的关键字“${this.searchText}”不存在！`,
                  type: 'warning'
                });
              }
            }
          })
          .catch(error => {
            this.$message({
              message: `请检查网络或数据接口！`,
              type: 'warning'
            });
          })
      },
      //点击下拉框事件
      clickLi(obj) {
        if (!obj) {
          return false;
        }
        this.dataList = [];
        this.searchText = obj.orgName;
        //查询数据展示
        var point = new this.gs2.geom.Point({
          x: obj.extendstr2,
          y: obj.extendstr3
        });
        this._showDetailedInfo(obj.orgCode, point);
      },
      /**
       * 初始化地图企业数据
       * */
      _initEnterpriseData() {
        api.get(api.forent_url.base_url + "/group/index/getChildOrg", {
            orgCode: this.userObj.orgCode
          })
          .then(ret => {
            if (ret) {
              if (ret.code == "success") {
                let data = ret["data"];
                //加载地图数据
                if (data.length > 0) {
                  $("#uinitCount").html(data.length);
                  this.showDataOnMap(data);
                }
              }
            }
          })
          .catch(error => {
            console.log("请求数据出错-_initEnterpriseData")
          })
      },
      showDataOnMap(data) {
        let eleArr = [];
        for (let i = 0; i < data.length; i++) {
          var point = new this.gs2.geom.Point({
            x: data[i].log,
            y: data[i].lat
          });
          //构造第一个element实例
          var element = new this.gs2.ele.Element({
            geometry: point,
            symbol: this._getElementSymbol(data[i].state),
            tag: data[i]
          });
          eleArr.push(element);
        }
        this.ZS.MONITOR.toolTipWare.clear();
        this.ZS.MONITOR._elementLayer.clear();
        this.ZS.MONITOR._elementLayer.addElements(eleArr)
      },
      /**
       * 获取点数据样式
       * */
      _getElementSymbol(state) {
        //FIXME:----匹配base64图标-----
        let obj = {
          '0': [flag.greenFlag(), 34, 50],
          '1': [flag.redFlag(), 34, 50],
          '2': [flag.orangeFlag(), 34, 50],
          '3': [flag.fireFlag(), 34, 68],
        };
        const symbol = new this.gs2.syms.Picturemarkersymbol({
          //图片Base64编码
          source: obj[state][0],
          //图片宽度
          width: obj[state][1],
          //图片高度
          height: obj[state][2],
          //图片旋转角度
          rotation: "0",
          //图片透明度
          opacity: "1",
          //图片X偏移量
          offsetX: obj[state][2] / 2,
          //图片Y偏移量
          offsetY: obj[state][1] / 2
        });
        return symbol;
      },
      //获取单位数据
      initAccess() {
        let _this = this;
        api.get(api.forent_url.base_url + '/group/index/getInfoNum?orgCode=' + this.userObj.orgCode)
          .then(res => {
            if (res && res.code == 'success') {
              let data = res.data;
              $('#gg-num-alarm').text(data.alarmCount);
              $('#gg-num-fault').text(data.dangerCount);
              $('#gg-num-hidden').text(data.AccidentCount);
            }
          })
        //今日报警5
        api.post(api.forent_url.base_url + '/group/index/queryTodayAlarmCountTop5?orgCode=' + this.userObj.orgCode)
          .then(res => {
            let oEchart = _this.$echarts.init(document.getElementById('add-today-warn'));
            let todayWarn = {};
            if (res && res.code == 'success') {
              let data = res.data;
              let y_length = data.proprietorName.length;
              let proproprietorCount_reverse = data.proprietorCount.reverse();
              if (y_length < 5) {
                for (let i = y_length; i < 5; i++) {
                  proproprietorCount_reverse.unshift(0);
                }
              }
              for (let i = 0; i < y_length; i++) {
                $('.warn-cpmpany-name')[i].innerHTML = data.proprietorName[i];
                $('.warn-cpmpany-name')[i].title = data.proprietorName[i];
              }
              if (_this.group_light) {
                todayWarn = {
                  grid: {
                    top: '3%',
                    left: '3%',
                    right: '15%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: {
                    show: false,
                    type: 'value'
                  },
                  yAxis: {
                    show: false,
                    type: 'category',
                    max: 4
                  },
                  series: [{
                    name: '',
                    type: 'bar',
                    barWidth: 10,
                    stack: '总量',
                    label: {
                      normal: {
                        show: true,
                        position: 'right',
                        color: '#000'
                      }
                    },
                    itemStyle: {
                      emphasis: {
                        barBorderRadius: 30
                      },
                      normal: {
                        color: ['#F5331F'],
                        barBorderRadius: [50, 50, 50, 50]
                      }
                    },
                    data: proproprietorCount_reverse
                  }]
                }
              } else {
                todayWarn = {
                  grid: {
                    top: '3%',
                    left: '3%',
                    right: '15%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: {
                    show: false,
                    type: 'value'
                  },
                  yAxis: {
                    show: false,
                    type: 'category',
                    max: 4
                  },
                  series: [{
                    name: '',
                    type: 'bar',
                    barWidth: 10,
                    stack: '总量',
                    label: {
                      normal: {
                        show: true,
                        position: 'right',
                        color: '#fff'
                      }
                    },
                    itemStyle: {
                      emphasis: {
                        barBorderRadius: 30
                      },
                      normal: {
                        color: {
                          type: 'linear',
                          x: 0,
                          x2: 1,
                          colorStops: [{
                            offset: 0,
                            color: '#01fbf9' // 0% 处的颜色
                          }, {
                            offset: 1,
                            color: '#1a96ec' // 100% 处的颜色
                          }],
                          globalCoord: false
                        },
                        barBorderRadius: [50, 50, 50, 50]
                      }
                    },
                    data: proproprietorCount_reverse
                  }]

                }
              }
              oEchart.setOption(todayWarn);
            }
          })
        api.post(api.forent_url.base_url + '/group/index/queryTodayAccidentCheckCountTop5?orgCode=' + this.userObj.orgCode)
          .then((res) => {
            let oEchart = _this.$echarts.init(document.getElementById('add-check-fault'));
            if (res && res.code == 'success') {
              let data = res.data;
              let y_length = data.proprietorName.length;
              let proproprietorCount_reverse = data.proprietorCount.reverse();
              if (y_length < 5) {
                for (let i = y_length; i < 5; i++) {
                  proproprietorCount_reverse.unshift(0);
                }
              }
              for (let i = 0; i < y_length; i++) {
                $('.fault-cpmpany-name')[i].innerHTML = data.proprietorName[i];
                $('.fault-cpmpany-name')[i].title = data.proprietorName[i];
              }
              if (_this.group_light) {
                var checkFault = {
                  grid: {
                    top: '3%',
                    left: '3%',
                    right: '15%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: {
                    show: false,
                    type: 'value'
                  },
                  yAxis: {
                    show: false,
                    type: 'category',
                    max: 4
                  },
                  series: [{
                    name: '',
                    type: 'bar',
                    barWidth: 10,
                    stack: '总量',
                    label: {
                      normal: {
                        show: true,
                        position: 'right',
                        color: '#000'
                      }
                    },
                    itemStyle: {
                      emphasis: {
                        barBorderRadius: 30
                      },
                      normal: {
                        color: ['#FF7800'],
                        barBorderRadius: [50, 50, 50, 50]
                      }
                    },
                    data: proproprietorCount_reverse
                  }]

                }
              } else {
                var checkFault = {
                  grid: {
                    top: '3%',
                    left: '3%',
                    right: '15%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: {
                    show: false,
                    type: 'value'
                  },
                  yAxis: {
                    show: false,
                    type: 'category',
                    max: 4
                  },
                  series: [{
                    name: '',
                    type: 'bar',
                    barWidth: 10,
                    stack: '总量',
                    label: {
                      normal: {
                        show: true,
                        position: 'right',
                        color: '#fff'
                      }
                    },
                    itemStyle: {
                      emphasis: {
                        barBorderRadius: 30
                      },
                      normal: {
                        barBorderRadius: [50, 50, 50, 50],
                        color: {
                          type: 'linear',
                          x: 0,
                          x2: 1,
                          colorStops: [{
                            offset: 0,
                            color: '#1d9bf0' // 0% 处的颜色
                          }, {
                            offset: 1,
                            color: '#b450e6' // 100% 处的颜色
                          }],
                          globalCoord: false
                        }
                      }
                    },
                    data: proproprietorCount_reverse
                  }]
                }
              }
              oEchart.setOption(checkFault);
            }
          })
        api.post(api.forent_url.base_url + '/group/index/queryTodayHiddenCountTop5?orgCode=' + this.userObj.orgCode)
          .then((res) => {
            let oEchart = _this.$echarts.init(document.getElementById('add-now-hidden'));
            if (res && res.code == 'success') {
              let data = res.data;
              let y_length = data.proprietorName.length;
              let proproprietorCount_reverse = data.proprietorCount.reverse();
              if (y_length < 5) {
                for (let i = y_length; i < 5; i++) {
                  proproprietorCount_reverse.unshift(0);
                }
              }
              for (let i = 0; i < y_length; i++) {
                $('.hidden-cpmpany-name')[i].innerHTML = data.proprietorName[i];
                $('.hidden-cpmpany-name')[i].title = data.proprietorName[i];
              }
              if (_this.group_light) {
                var nowHidden = {
                  grid: {
                    top: '3%',
                    left: '3%',
                    right: '15%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: {
                    show: false,
                    type: 'value'
                  },
                  yAxis: {
                    show: false,
                    type: 'category',
                    max: 4
                  },
                  series: [{
                    name: '',
                    type: 'bar',
                    barWidth: 10,
                    stack: '总量',
                    label: {
                      normal: {
                        show: true,
                        position: 'right',
                        color: '#000'
                      }
                    },
                    itemStyle: {
                      emphasis: {
                        barBorderRadius: 30
                      },
                      normal: {
                        color: ['#F1B613'],
                        barBorderRadius: [50, 50, 50, 50]
                      }
                    },
                    data: proproprietorCount_reverse
                  }]

                }
              } else {
                var nowHidden = {
                  grid: {
                    top: '3%',
                    left: '3%',
                    right: '15%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: {
                    show: false,
                    type: 'value'
                  },
                  yAxis: {
                    show: false,
                    type: 'category',
                    max: 4
                  },
                  series: [{
                    name: '',
                    type: 'bar',
                    barWidth: 10,
                    stack: '总量',
                    label: {
                      normal: {
                        show: true,
                        position: 'right',
                        color: '#fff'
                      }
                    },
                    itemStyle: {
                      emphasis: {
                        barBorderRadius: 30
                      },
                      normal: {
                        color: {
                          type: 'linear',
                          x: 0,
                          x2: 1,
                          colorStops: [{
                            offset: 0,
                            color: '#ff9022' // 0% 处的颜色
                          }, {
                            offset: 1,
                            color: '#ff637f' // 100% 处的颜色
                          }],
                          globalCoord: false
                        },
                        barBorderRadius: [50, 50, 50, 50]
                      }
                    },
                    data: proproprietorCount_reverse
                  }]

                }
              }
              oEchart.setOption(nowHidden);
            }
          })
      },
      _initTrend() {
        let _this = this;
        //报警
        api.post(api.forent_url.base_url + '/group/index/queryThirtyAlarmCountInfo?orgCode=' + this.userObj.orgCode)
          .then((res) => {
            let oEchart = _this.$echarts.init(document.getElementById('chart-alarm-trend'));
            if (res && res.code == 'success') {
              let data = res.data;
              if (_this.group_light) {
                var alarmTrend = {
                  tooltip: {
                    trigger: 'axis'
                  },
                  grid: {
                    top: '10%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                      lineStyle: {
                        color: '#000'
                      }
                    },
                    data: data.data_x
                  },
                  yAxis: {
                    type: 'value',
                    axisLine: {
                      lineStyle: {
                        color: '#000'
                      }
                    },
                    boundaryGap: [0, '100%']
                  },
                  series: [{
                    name: '报警趋势',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                      normal: {
                        color: '#e23737'
                      }
                    },
                    areaStyle: {
                      normal: {
                        color: {
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                            offset: 0,
                            color: '#f5bdbd' // 0% 处的颜色
                          }, {
                            offset: 1,
                            color: '#fadbdb' // 100% 处的颜色
                          }],
                          globalCoord: false
                        }
                      }
                    },
                    data: data.data_y
                  }]

                }
              } else {
                var alarmTrend = {
                  tooltip: {
                    trigger: 'axis'
                  },
                  grid: {
                    top: '10%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data.data_x,
                    axisLine: {
                      lineStyle: {
                        color: '#fff'
                      }
                    }
                  },
                  yAxis: {
                    type: 'value',
                    axisLine: {
                      lineStyle: {
                        color: '#fff'
                      }
                    }
                  },
                  series: [{
                    name: '报警趋势',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                      normal: {
                        color: '#02f7f8'
                      }
                    },
                    areaStyle: {
                      normal: {
                        color: 'transparent'
                      }
                    },
                    data: data.data_y
                  }]
                }
              }
              oEchart.setOption(alarmTrend);
            }
          })
        //隐患
        api.post(api.forent_url.base_url + '/group/index/queryThirtyAccidentCountInfo?orgCode=' + this.userObj.orgCode)
          .then((res) => {
            let oEchart = _this.$echarts.init(document.getElementById('chart-hidden-trend'));
            if (res && res.code == 'success') {
              let data = res.data;
              if (_this.group_light) {
                var hiddenTrend = {
                  tooltip: {
                    trigger: 'axis'
                  },
                  grid: {
                    top: '10%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                      lineStyle: {
                        color: '#000'
                      }
                    },
                    data: data.data_x
                  },
                  yAxis: {
                    type: 'value',
                    axisLine: {
                      lineStyle: {
                        color: '#000'
                      }
                    },
                    boundaryGap: [0, '100%']
                  },
                  series: [{
                    name: '隐患趋势',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                      normal: {
                        color: '#ff8415'
                      }
                    },
                    areaStyle: {
                      normal: {
                        color: {
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                            offset: 0,
                            color: '#ffd3ab' // 0% 处的颜色
                          }, {
                            offset: 1,
                            color: '#ffeede' // 100% 处的颜色
                          }],
                          globalCoord: false
                        }
                      }
                    },
                    data: data.data_y
                  }]
                }

              } else {
                var hiddenTrend = {
                  tooltip: {
                    trigger: 'axis'
                  },
                  grid: {
                    top: '10%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                      lineStyle: {
                        color: '#fff'
                      }
                    },
                    data: data.data_x
                  },
                  yAxis: {
                    type: 'value',
                    axisLine: {
                      lineStyle: {
                        color: '#fff'
                      }
                    }
                  },
                  series: [{
                    name: '隐患趋势',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                      normal: {
                        color: '#07e1f6'
                      }
                    },
                    areaStyle: {
                      normal: {
                        color: 'transparent'
                      }
                    },
                    data: data.data_y
                  }]
                }
              }
              oEchart.setOption(hiddenTrend);
            }
          })
      },
      //报警信息
      _initCompanyAlarm() {
        var _this = this;
        api.post(api.forent_url.base_url + '/group/index/queryAlarmInfo?orgCode=' + this.userObj.orgCode)
          .then((res) => {
            if (res && res.code == 'success') {
              let data = res.data;
              var alarmInfo_li = '';
              var alarmInfo_logo = '';
              var imageUrl = api.forent_url.localHostName;
              for (let i in data) {
                if (data[i].alarmState == 1) {
                  alarmInfo_logo = '<div class="detail-fire-logo"></div>'
                } else {
                  alarmInfo_logo = '<div class="detail-alarm-logo"></div>';
                } //data[i].proprietorId
                alarmInfo_li += '<li class="gg-not">' +
                  alarmInfo_logo +
                  '<div data-props=\'' + data[i].proprietorId + '\' class="detail-fire-body openAlarmInfo">' +
                  '<div class="detail-fire-name" title="' + data[i].proprietorName + '">' + data[i].proprietorName +
                  '</div>\n' +
                  '<div class="detail-fire-address">' + data[i].deviceAddress + '</div>\n' +
                  '<div class="detail-fire-date">' + data[i].receiveTime + '</div>\n' +
                  '</div>\n' + '</li>'
              }
              if (data.length == 0) {
                alarmInfo_li += `<li class="gg-not">暂无报警信息</li>`
              }
              $('#query_alarmInfo').append(alarmInfo_li);
              $('#warn-detail-number').text(data.length);
              //  显示真警点位
              $('.openAlarmInfo').on('click', function (e) {
                let tagetInfo = e.target.dataset.propietorId || $(this).attr('data-props') || $(this).prop(
                  'data-props');
                api.get(api.forent_url.base_url + '/sys/org/' + tagetInfo)
                  .then((res) => {
                    if (res && res.code == 'success') {
                      let data = res.data;
                      const point1 = new _this.gs2.geom.Point({
                        x: parseFloat(data.extendstr2?data.extendstr2:0),
                        y: parseFloat(data.extendstr3?data.extendstr3:0)
                      });
                      const point2 = new _this.gs2.geom.Point({
                        x: data.extendstr2,
                        y: data.extendstr3
                      });
                      _this.ZS.MONITOR.map.setCenter(point1);

                      // _this.ZS.MONITOR.map.zoomTo(_this.ZS.MONITOR.map.getZoomLevel()+1)
                      _this._showDetailedInfo(data.orgCode, point2);
                    }
                  })
              })
            }
          })
      },
      //报警详情
      _showDetailedInfo(orgCode, point) {
        var _this = this;
        this.ZS.MONITOR.toolTipWare.clear();
        api.post(api.forent_url.base_url + "/group/index/queryAlarmEmsAccidentCountInfo", {
            unitId: orgCode
          })
          .then(ret => {
            if (ret) {
              var code = ret["code"];
              if (code == "success") {
                var data = ret["data"];
                callback(data, orgCode)
              }
            }
          })

        function callback(obj, orgCode) {
          var contentTemplate =
            `<div class="gg-gps-dialog">
              <div class="close_g2_tooltip"><span class="ggicon-close"></span></div>
                <div class="gps-dialog-head">
                    <div style="height: 34px;">
                        <p class="gps-dialog-title">` +
            obj.orgName +
            `</p>
                        <a class="unitDetail-details" data-orgName="${obj.orgName}" data-orgCode="${orgCode}" style="cursor:pointer">详情></a>
                    </div>
                    <div class="popup-content-phone">
                        <div class="ggicon-telphone"></div>
                        <span title="` +
            obj.contacts + `:` + obj.dutyTel + `">` + obj.contacts + `:` + obj.dutyTel +
            `</span>
                    </div>
                    <div class="popup-content-gps">
                        <div class="ggicon-location"></div>
                        <span title="` +
            obj.address + `">` + obj.address +
            `</span>
                    </div>
                </div>
                <div class="gps-dialog-body">
                    <ul>
                        <li>
                            <div class="gg-num-access dialog-num-size">` +
            obj.accidentCount +
            `</div>
                            <div class="gg-dialog-number">设备设施</div>
                        </li>
                        <li>
                            <div class="gg-division-line"></div>
                        </li>
                        <li>
                            <div class="gg-num-alarm dialog-num-size">` +
            obj.AlarmCount +
            `</div>
                            <div class="gg-dialog-number">今日报警</div>
                        </li>
                        <li>
                            <div class="gg-division-line"></div>
                        </li>
                        <li>
                            <div class="gg-num-fault dialog-num-size">` +
            obj.faultCount +
            `</div>
                            <div class="gg-dialog-number">监测故障</div>
                        </li>
                        <li>
                            <div class="gg-division-line"></div>
                        </li>
                        <li>
                            <div class="gg-num-hidden dialog-num-size">` +
            obj.hiddenCount +
            `</div>
                            <div class="gg-dialog-number">当前隐患</div>
                        </li>
                    </ul>
                </div>
                <div class="triangle_border_down">
                    <span></span>
                </div>
            </div>`;
          var tooltip = new _this.gs2.ext.Tooltip({
            anchor: point, //提示在地图上停靠位置
            content: contentTemplate, //提示内容
            layerId: _this.ZS.MONITOR._elementLayer.getLayerId(), //提示所在图层ID
            offset: [0, 0], //位置偏移量
            className: 'g2-tooltip' //tooltip样式
          });
          _this.ZS.MONITOR.toolTipWare.add(tooltip);
          $('.unitDetail-details').on('click', function (e) {
            let orgCode = e.target.dataset.orgcode;
            let orgName = e.target.dataset.orgname;
            //=>FIXME:改变用户orgCode
            var tmpObj = {};
            tmpObj.orgName = orgName;
            tmpObj.loginName = _this.userObj.loginName;
            tmpObj.orgCode = orgCode; //只更改orgCode为要传递
            tmpObj.name = _this.userObj.name;
            tmpObj.id = _this.userObj.id;
            tmpObj.usrImgUrl = _this.userObj.usrImgUrl;
            api.setGlobalVal('userObj', JSON.stringify(tmpObj));
            let routeData = _this.$router.resolve({
              name: 'index'
            });
            api.setGlobalVal("bus_groupStatus", '200');
            window.open(routeData.href, 'index'); //TODO:打开新的页面;
          })

          //close
          $('.close_g2_tooltip .ggicon-close').click(function () {
            $(this).parents('.g2-tooltip').hide();
          });
        }
      },
      switchToggle() {
        if ($('.gg-access-number__more')[0].style.transform == 'rotate(0deg)') {
          $('.gg-access-number__more').css('transform', 'rotate(180deg)');
          $('.gg-access-number__toggle').show()
        } else {
          $('.gg-access-number__more').css('transform', 'rotate(0deg)');
          $('.gg-access-number__toggle').hide()
        }
      },
      openEchart1() {
        $('.warn-detail-table').hide();
        $('.alarm-trend-table').toggle();
      },
      openEchart2() {
        $('.alarm-trend-table').hide();
        $('.warn-detail-table').toggle();
      },
      closeEch() {
        $('.warn-detail-table').hide();
        $('.alarm-trend-table').hide();
      }
    }

  }

</script>

<style lang="scss" scoped>
  .map-container {
    height: calc(100% - 74px);

    #map {
      height: 100%;
    }
  }

  .group_light {
    .gg-search {
      display: inline-block;
      position: absolute;
      top: 94px;
      right: 22px;

      #searchInput {
        background: #fff;
        border: 1px solid #a5a5a5;
        color: #a5a5a5;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        padding-left: 10px;
        float: left;
      }

      @media screen and (max-height: 768px) {
        #searchInput {
          width: 340px;
          height: 40px;
        }
      }

      #searchInput::placeholder {
        color: #999;
      }

      .search_clear_btn {
        position: absolute;
        top: 18px;
        right: 70px;
        color: #000;
        font-size: 14px;
        cursor: pointer;
      }

      @media screen and (max-height: 768px) {
        .search_clear_btn {
          top: 14px;
        }
      }

      .ggicon-magnifying-glass {
        background: #4777e7;
        display: inline-block;
        width: 55px;
        height: 50px;
        color: #fff;
        float: left;
        text-align: center;
        line-height: 50px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        font-size: 24px;
      }

      @media screen and (max-height: 768px) {
        .ggicon-magnifying-glass {
          width: 45px;
          height: 40px;
          line-height: 40px;
          font-size: 20px;
        }
      }
    }

    @media screen and (max-height: 960px) {
      .gg-search input {
        width: 458px;
        height: 50px;
      }
    }

    @media screen and (max-height: 768px) {
      .gg-search input {
        width: 340px;
        height: 40px;
      }
    }

    @media screen and (max-height: 768px) {
      .search_clear_btn {
        top: 18px;
        right: 60px;
        font-size: 12px;
      }
    }

    @media screen and (max-height: 960px) {
      .search_clear_btn {
        top: 14px;
        right: 60px;
        font-size: 12px;
      }
    }

    input[type=search] {
      -webkit-appearance: textfield;
      -webkit-box-sizing: content-box;
      font-family: inherit;
      font-size: 100%;
      box-sizing: border-box;
    }

    input::-webkit-search-decoration,
    input::-webkit-search-cancel-button {
      display: none;
    }

    /*单位个数左上*/
    @media screen and (max-height: 960px) {
      .map-container .gg-access-number {
        width: 345px;
      }
    }

    @media screen and (max-height: 768px) {
      .map-container .gg-access-number {
        width: 315px;
        top: 80px;
      }
    }

    .gg-access-number {
      border: 2px solid transparent;
      display: inline-block;
      width: 375px;
      position: absolute;
      top: 100px;
      left: 40px;
      /*border: 2px solid #094cab;*/
      border-radius: 10px;

      .gg-access-number__head {
        background: #4777e7;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        height: 46px;

        .gg-access-number__title {
          color: #fff;
          float: left;
          margin: 10px 18px;
          font-size: 18px;

          .ggicon-danwei {
            margin-right: 8px;
            position: relative;
            top: 2px;
          }

          #uinitCount {
            margin-left: 10px;
            color: #FFF;
          }
        }

        @media screen and (max-height: 960px) {
          .gg-access-number__title {
            font-size: 16px;
          }
        }

        @media screen and (max-height: 768px) {
          .gg-access-number__title {
            font-size: 12px;
          }
        }
      }

      @media screen and (max-height: 768px) {
        .gg-access-number__head {
          height: 36px;
        }
      }

      .gg-access-number__main {
        background: #fff;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 0 0 10px rgba(37, 40, 41, .2);

        .gg-access-number__body {
          ul {
            li {
              float: left;
              text-align: center;
              height: 74px;
              margin: 0 7px;

              .gg-division-line {
                background: #bebebe;
                display: inline-block;
                width: 1px;
                height: 28px;
                margin-top: 30px;
              }

              @media screen and (max-height: 768px) {
                .gg-division-line {
                  margin-top: 18px;
                }
              }

              .gg-dialog-number {
                color: #000;
              }

              #gg-num-alarm {
                color: #e23737;
              }

              .gg-num-hidden {
                color: #f9bb1f;
              }

              .gg-num-fault {
                color: #d27403;
              }
            }
          }

          .gg-access-number__more {
            text-align: center;
            clear: both;

            b {
              color: #b0b0b0;
              cursor: pointer;

            }
          }
        }

        /*弹出框*/
        .access-warp-line {
          background: #bebebe;
          width: 90%;
          height: 1px;
          margin: auto;
          margin-bottom: 14px;

        }

        .gg-access-number__add ul {
          margin: 0;
          margin-left: 14px;
          padding-left: 0;
          list-style-type: none;

          li {
            width: 360px;
            height: 180px;

            .access-add-warn,
            .access-add-fault,
            .access-add-hidden {
              color: #3c8cbb;
              border-left: 4px solid #3c8cbb;
              padding-left: 10px;
              font-size: 14px;
            }

            ul {
              margin-top: 0;
              margin-left: 0;
              display: inline-block;
              position: relative;
              top: -30px;
              left: 8px;
              width: 35%;

              .warn-cpmpany-name,
              .fault-cpmpany-name,
              .hidden-cpmpany-name {
                color: #000;
                font-size: 14px;
                width: 100%;
                height: 18px;
                margin-top: 3px;
                margin-bottom: 3px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }

            #add-today-warn,
            #add-check-fault,
            #add-now-hidden {
              display: inline-block;
              width: 62%;
              height: 145px;
            }
          }

          @media screen and (max-height: 960px) {
            li {
              height: 150px;
              width: 330px;
            }
          }

          @media screen and (max-height: 768px) {
            li {
              height: 140px;
              width: 300px;
            }
          }
        }

        @media screen and (max-height: 768px) {
          .gg-access-number__body ul li {
            height: 45px;

            .window-num-size {
              margin-top: 18px;
              font-size: 24px;
              width: 100px;
            }

            .gg-num-alarm {
              color: #e23737;
            }

            .gg-dialog-number {
              color: #000;
              font-size: 12px;
            }

            @media screen and (max-height: 960px) {
              .window-num-size {
                width: 90px;
              }
            }

            @media screen and (max-height: 768px) {
              .window-num-size {
                margin-top: 5px;
                font-size: 18px;
                width: 80px;
              }
            }
          }
        }
      }
    }

    .gg-warn-trend {
      width: 515px;
      position: absolute;
      bottom: 45px;
      right: 30px;

      .alarm-trend-table {
        background: #fff;
        border: 2px solid transparent;
        width: 515px;
        height: 615px;
        box-shadow: 1px 2px 2px 2px rgba(37, 40, 41, .13);
        position: absolute;
        bottom: 110px;
        border-radius: 5px;

        .triangle_border_down {
          width: 0;
          height: 0;
          border-width: 10px 10px 0;
          border-style: solid;
          border-color: #fff transparent transparent;
          margin: 4px 350px;
          position: relative;

          span {
            display: block;
            width: 0;
            height: 0;
            border-width: 16px 14px 0;
            border-style: solid;
            border-color: #fff transparent transparent;
            position: absolute;
            top: -18px;
            left: -14px;
          }
        }

        @media screen and (max-height: 960px) {
          .triangle_border_down {
            margin: 10px 380px;
          }
        }

        @media screen and (max-height: 768px) {
          .triangle_border_down {
            margin: 9px 246px;
          }
        }

        @media screen and (max-height: 768px) {

          &:before,
          .alarm-trend-table:after {
            left: 70%;
          }
        }

        .warn-table-close {
          border: 1px solid transparent;
          background: #fff;
          color: #a5a5a5;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          position: absolute;
          right: -15px;
          top: -15px;
          line-height: 28px;
          text-align: center;
          cursor: pointer;

          .ggicon-close {
            font-size: 14px;
          }

          .ggicon-close:hover {
            color: #8ebfff;
          }
        }

        /*echarts内容*/
        .chart-trend-contain {
          margin-top: 10px;
          width: 100%;
          display: inline-block;

          .alarm-trend-time {
            font-size: 18px;
            float: right;
            color: #717171;
            margin-top: 10px;
            margin-right: 10px;
          }

          @media screen and (max-height: 960px) {
            .alarm-trend-time {
              font-size: 16px;
            }
          }

          @media screen and (max-height: 768px) {
            .alarm-trend-time {
              font-size: 12px;
            }
          }

          .chart-trend-title {
            font-size: 18px;
            color: #3c8cbb;
            border-left: 4px solid #3c8cbb;
            margin: 10px 0 10px 10px;
            padding-left: 10px;
          }

          @media screen and (max-height: 960px) {
            .chart-trend-title {
              font-size: 16px;
            }
          }

          @media screen and (max-height: 768px) {
            .chart-trend-title {
              font-size: 12px;
              margin: 5px 0 5px 10px;
            }
          }

          #chart-alarm-trend {
            margin-left: 15px;
            width: 480px;
            height: 248px;
          }

          @media screen and (max-height: 960px) {
            #chart-alarm-trend {
              width: 445px;
              height: 190px;
            }
          }

          @media screen and (max-height: 768px) {
            #chart-alarm-trend {
              width: 345px;
              height: 150px;
            }
          }

          #chart-hidden-trend {
            margin-left: 15px;
            width: 480px;
            height: 248px;
          }

          @media screen and (max-height: 960px) {
            #chart-hidden-trend {
              width: 445px;
              height: 190px;
            }
          }

          @media screen and (max-height: 768px) {
            #chart-hidden-trend {
              width: 345px;
              height: 150px;
            }
          }
        }

        @media screen and (max-height: 768px) {
          .chart-trend-contain {
            margin-top: 5px;
          }
        }
      }

      @media screen and (max-height: 960px) {
        .alarm-trend-table {
          height: 500px;
          bottom: 86px;
        }
      }

      @media screen and (max-height: 768px) {
        .alarm-trend-table {
          height: 378px;
        }
      }

      @media screen and (max-height: 768px) {

        .alarm-trend-table,
        .warn-detail-table {
          width: 374px;
          bottom: 80px;
          left: 130px;
        }
      }

      /*第二个弹框*/
      .warn-detail-table {
        background: #fff;
        border: 2px solid transparent;
        display: none;
        width: 515px;
        box-shadow: 1px 2px 2px 2px rgba(37, 40, 41, .13);
        position: absolute;
        bottom: 110px;
        border-radius: 5px;

        /*三角形*/
        .triangle_border_down {
          width: 0;
          height: 0;
          border-width: 10px 10px 0;
          border-style: solid;
          border-color: #fff transparent transparent;
          position: relative;
          bottom: -11px;
          left: 440px;

          span {
            display: block;
            width: 0;
            height: 0;
            border-width: 16px 14px 0;
            border-style: solid;
            border-color: #fff transparent transparent;
            position: absolute;
            top: -18px;
            left: -14px;
          }
        }

        @media screen and (max-height: 960px) {
          .triangle_border_down {
            left: 400px;
          }
        }

        @media screen and (max-height: 768px) {
          .triangle_border_down {
            left: 316px;
          }
        }

        .warn-table-close {
          border: 1px solid transparent;
          background: #fff;
          color: #a5a5a5;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          position: absolute;
          right: -15px;
          top: -15px;
          line-height: 28px;
          text-align: center;
          cursor: pointer;

          .ggicon-close:hover {
            color: #8ebfff;
          }
        }

        ul,
        #query_alarmInfo {
          display: inline-block;
          margin-top: 0;
          margin-bottom: 10px;
          max-height: 606px;
          overflow: auto;
          width: 100%;
        }

        @media screen and (max-height: 960px) {
          #query_alarmInfo {
            max-height: 486px;
          }
        }

        @media screen and (max-height: 768px) {
          #query_alarmInfo {
            max-height: 364px;
          }
        }
      }

      @media screen and (max-height: 960px) {
        .warn-detail-table:after {
          left: 90%;
        }
      }

      @media screen and (max-height: 960px) {
        .warn-detail-table {
          width: 460px;
          bottom: 90px;
          left: 54px;
        }
      }

      @media screen and (max-height: 768px) {
        .warn-detail-table {
          width: 374px;
          bottom: 80px;
          left: 130px;
        }
      }

      .warn-hidden-logo {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 0;
        padding-left: 0;

        li {
          float: left;
          margin-right: 10px;
          cursor: pointer;

          .alarm-trend-logo {
            background: #fff;
            display: inline-block;
            width: 87px;
            height: 87px;
            border-radius: 5px;
            box-shadow: 1px 2px 2px 2px rgba(37, 40, 41, .13);

            div {
              width: 87px;
              height: 87px;
              background: url(../../assets/img/trend_logo.png) no-repeat center;
              background-size: 60%;
            }

            @media screen and (max-height: 960px) {
              div {
                width: 67px;
                height: 67px;
                background-size: 60%;
              }
            }

            @media screen and (max-height: 768px) {
              div {
                width: 67px;
                height: 67px;
                background-size: 60%;
              }
            }
          }

          @media screen and (max-height: 960px) {
            .alarm-trend-logo {
              width: 67px;
              height: 67px;
            }
          }

          .warn-detail-logo {
            background: #fff;
            display: inline-block;
            width: 87px;
            height: 87px;
            border-radius: 5px;
            box-shadow: 1px 2px 2px 2px rgba(37, 40, 41, .13);

            div {
              background: url(../../assets/img/warn_logo.png) no-repeat center;
              background-size: 60%;
              width: 87px;
              height: 87px;
            }

            @media screen and (max-height: 960px) {
              div {
                width: 67px;
                height: 67px;
                background-size: 60%;
              }
            }

            @media screen and (max-height: 768px) {
              div {
                width: 67px;
                height: 67px;
                background-size: 60%;
              }
            }

            @media screen and (max-height: 768px) {
              .warn-detail-number {
                width: 40px;
                height: 20px;
              }
            }

          }

          @media screen and (max-height: 960px) {
            .warn-detail-logo {
              width: 67px;
              height: 67px;
            }
          }

          @media screen and (max-height: 768px) {

            .alarm-trend-logo,
            .warn-detail-logo {
              width: 67px;
              height: 67px;
            }
          }

          .warn-detail-number {
            display: inline-block;
            position: absolute;
            top: -8px;
            right: 0;
            width: 44px;
            height: 24px;
            border-radius: 20px;
            background: #f00;
            text-align: center;

            @media screen and (max-height: 768px) {
              #warn-detail-number {
                font-size: 18px;
              }
            }

            #warn-detail-number {
              position: relative;
              top: -2px;
              color: #fff;
              font-size: 20px;
            }
          }
        }
      }
    }

    /*右下方数据---------------------------------*/
    @media screen and (max-height: 768px) {
      .gg-warn-trend {
        bottom: 20px;
        right: 20px;
      }
    }

    /*搜索结果样式*/
    #gg-search-tip {
      margin: 0;
      padding-left: 0;
      list-style-type: none;
      display: inline-block;
      width: 512px;
      max-height: 210px;
      position: absolute;
      top: 144px;
      right: 22px;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      box-shadow: 0 2px 2px 2px rgba(37, 40, 41, .13);
      z-index: 1;

      li {
        color: #a5a5a5;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;

        &:hover {
          background: #d2d2d2;
          color: #fff;
        }
      }

      .now {
        background: #d2d2d2;
        color: #fff;
      }
    }

    @media screen and (max-height: 768px) {
      #gg-search-tip {
        width: 384px;
        top: 134px;
      }
    }
  }

  /*TODO:黑夜模式*/
  .gg-search {
    display: inline-block;
    position: absolute;
    top: 94px;
    right: 22px;

    #searchInput {
      background: #0a1c33;
      border: 1px solid #0a1c33;
      color: #a5a5a5;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding-left: 10px;
      float: left;
      width: 458px;
      height: 50px;
    }

    @media screen and (max-height: 768px) {
      #searchInput {
        width: 340px;
        height: 40px;
      }
    }

    #searchInput::placeholder {
      color: #999;
    }

    .search_clear_btn {
      position: absolute;
      top: 18px;
      right: 70px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }

    @media screen and (max-height: 768px) {
      .search_clear_btn {
        top: 14px;
      }
    }

    @media screen and (max-height: 768px) {
      #searchInput {
        top: 14px;
      }
    }

    .search_clear_btn:hover {
      color: #3d85b0;
    }

    .ggicon-magnifying-glass {
      background: #094cab;
      display: inline-block;
      width: 55px;
      height: 50px;
      color: #fff;
      float: left;
      text-align: center;
      line-height: 50px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      font-size: 24px;
    }

    @media screen and (max-height: 768px) {
      .ggicon-magnifying-glass {
        width: 45px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
      }
    }
  }

  @media screen and (max-height: 768px) {
    .gg-search input {
      width: 340px;
      height: 40px;
    }
  }

  @media screen and (max-height: 768px) {
    .search_clear_btn {
      top: 14px;
      right: 60px;
      font-size: 12px;
    }
  }

  input[type=search] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
    font-family: inherit;
    font-size: 100%;
    box-sizing: border-box;
  }

  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button {
    display: none;
  }

  /*单位个数左上*/
  @media screen and (max-height: 960px) {
    .map-container .gg-access-number {
      width: 345px;
    }
  }

  @media screen and (max-height: 768px) {
    .map-container .gg-access-number {
      width: 315px;
      top: 80px;
    }
  }

  .gg-access-number {
    /*border: 2px solid transparent;*/
    display: inline-block;
    width: 375px;
    position: absolute;
    top: 100px;
    left: 40px;
    border: 2px solid #094cab;
    border-radius: 10px;

    .gg-access-number__head {
      background: #0c213b;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      height: 46px;

      .gg-access-number__title {
        color: #fff;
        float: left;
        margin: 10px 18px;
        font-size: 18px;

        .ggicon-danwei {
          margin-right: 8px;
          position: relative;
          top: 2px;
        }

        #uinitCount {
          margin-left: 10px;
          color: #01fcf9;
        }
      }

      @media screen and (max-height: 960px) {
        .gg-access-number__title {
          font-size: 16px;
        }
      }

      @media screen and (max-height: 768px) {
        .gg-access-number__title {
          font-size: 12px;
        }
      }
    }

    @media screen and (max-height: 768px) {
      .gg-access-number__head {
        height: 36px;
      }
    }

    .gg-access-number__main {
      background: #0f2744;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      box-shadow: 0 0 10px rgba(37, 40, 41, .2);

      .gg-access-number__body {
        ul {
          li {
            float: left;
            text-align: center;
            height: 74px;
            margin: 0 7px;

            .gg-division-line {
              background: #2e4259;
              display: inline-block;
              width: 1px;
              height: 28px;
              margin-top: 30px;
            }

            @media screen and (max-height: 768px) {
              .gg-division-line {
                margin-top: 18px;
              }
            }

            .gg-num-hidden,
            .gg-num-alarm {
              color: #FFF;
            }

            .gg-num-fault {
              color: #FFF;
            }

            .window-num-size {
              margin-top: 18px;
              font-size: 24px;
              width: 100px;
            }

            .gg-dialog-number {
              color: #fff;
            }

            @media screen and (max-height: 960px) {
              .window-num-size {
                width: 90px;
              }
            }

            @media screen and (max-height: 768px) {
              .window-num-size {
                width: 80px;
              }
            }
          }
        }

        .gg-access-number__more {
          text-align: center;
          clear: both;

          b {
            color: #01fcf9;
            cursor: pointer;

          }
        }
      }

      /*弹出框*/
      .access-warp-line {
        background: #2e4259;
        width: 90%;
        height: 1px;
        margin: auto;
        margin-bottom: 14px;

      }

      .gg-access-number__add ul {
        margin: 0;
        margin-left: 14px;
        padding-left: 0;
        list-style-type: none;

        li {
          width: 360px;
          height: 180px;

          .access-add-warn,
          .access-add-fault,
          .access-add-hidden {
            color: #FFF;
            border-left: 4px solid #3c8cbb;
            padding-left: 10px;
            font-size: 14px;
          }

          ul {
            margin-top: 0;
            margin-left: 0;
            display: inline-block;
            position: relative;
            top: -30px;
            left: 8px;
            width: 35%;

            .warn-cpmpany-name,
            .fault-cpmpany-name,
            .hidden-cpmpany-name {
              color: #fff;
              font-size: 14px;
              width: 100%;
              height: 18px;
              margin-top: 3px;
              margin-bottom: 3px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          #add-today-warn,
          #add-check-fault,
          #add-now-hidden {
            display: inline-block;
            width: 62%;
            height: 145px;
          }
        }

        @media screen and (max-height: 960px) {
          li {
            height: 150px;
            width: 330px;
          }
        }

        @media screen and (max-height: 768px) {
          li {
            height: 140px;
            width: 300px;
          }
        }
      }

      @media screen and (max-height: 768px) {
        .gg-access-number__body ul li {
          height: 45px;

          .window-num-size {
            margin-top: 18px;
            font-size: 24px;
            width: 100px;
          }

          .gg-num-alarm {
            color: #fff;
          }

          .gg-dialog-number {
            color: #fff;
            font-size: 12px;
          }

          @media screen and (max-height: 960px) {
            .window-num-size {
              width: 90px;
            }
          }

          @media screen and (max-height: 768px) {
            .window-num-size {
              margin-top: 5px;
              font-size: 18px;
              width: 80px;
            }
          }
        }
      }
    }
  }

  .gg-warn-trend {
    width: 515px;
    position: absolute;
    bottom: 45px;
    right: 30px;

    .alarm-trend-table {
      background: #0f2744;
      border: 2px solid #094cab;
      width: 515px;
      height: 615px;
      box-shadow: 1px 2px 2px 2px rgba(37, 40, 41, .13);
      position: absolute;
      bottom: 110px;
      border-radius: 5px;

      .triangle_border_down {
        width: 0;
        height: 0;
        border-width: 10px 10px 0;
        border-style: solid;
        border-color: #094cab transparent transparent;
        margin: 4px 350px;
        position: relative;

        span {
          display: block;
          width: 0;
          height: 0;
          border-width: 16px 14px 0;
          border-style: solid;
          border-color: #0f2744 transparent transparent;
          position: absolute;
          top: -18px;
          left: -14px;
        }
      }

      @media screen and (max-height: 960px) {
        .triangle_border_down {
          margin: 10px 380px;
        }
      }

      @media screen and (max-height: 768px) {
        .triangle_border_down {
          margin: 9px 246px;
        }
      }

      .warn-table-close {
        border: 1px solid #0069ff;
        background: #0f2744;
        color: #fff;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        position: absolute;
        right: -15px;
        top: -15px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;

        .ggicon-close {
          font-size: 14px;
        }

        .ggicon-close:hover {
          color: #8ebfff;
        }
      }

      /*echarts内容*/
      .chart-trend-contain {
        margin-top: 10px;
        width: 100%;
        display: inline-block;

        .alarm-trend-time {
          font-size: 18px;
          float: right;
          color: #FFF;
          margin-top: 10px;
          margin-right: 10px;
        }

        @media screen and (max-height: 960px) {
          .alarm-trend-time {
            font-size: 16px;
          }
        }

        @media screen and (max-height: 768px) {
          .alarm-trend-time {
            font-size: 12px;
          }
        }

        .chart-trend-title {
          font-size: 18px;
          color: #fff;
          border-left: 4px solid #3c8cbb;
          margin: 10px 0 10px 10px;
          padding-left: 10px;
        }

        @media screen and (max-height: 960px) {
          .chart-trend-title {
            font-size: 16px;
          }
        }

        @media screen and (max-height: 768px) {
          .chart-trend-title {
            font-size: 12px;
            margin: 5px 0 5px 10px;
          }
        }

        #chart-alarm-trend {
          margin-left: 15px;
          width: 480px;
          height: 248px;
        }

        @media screen and (max-height: 960px) {
          #chart-alarm-trend {
            width: 445px;
            height: 190px;
          }
        }

        @media screen and (max-height: 768px) {
          #chart-alarm-trend {
            width: 345px;
            height: 150px;
          }
        }

        #chart-hidden-trend {
          margin-left: 15px;
          width: 480px;
          height: 248px;
        }

        @media screen and (max-height: 960px) {
          #chart-hidden-trend {
            width: 445px;
            height: 190px;
          }
        }

        @media screen and (max-height: 768px) {
          #chart-hidden-trend {
            width: 345px;
            height: 150px;
          }
        }
      }

      @media screen and (max-height: 768px) {
        .chart-trend-contain {
          margin-top: 5px;
        }
      }
    }

    @media screen and (max-height: 960px) {
      .alarm-trend-table {
        height: 500px;
        bottom: 86px;
      }
    }

    @media screen and (max-height: 768px) {
      .alarm-trend-table {
        height: 378px;
      }
    }

    @media screen and (max-height: 768px) {

      .alarm-trend-table,
      .warn-detail-table {
        width: 374px;
        bottom: 80px;
        left: 130px;
      }
    }

    /*第二个弹框*/
    .warn-detail-table {
      background: #0f2744;
      border: 2px solid #094cab;
      display: none;
      width: 515px;
      box-shadow: 1px 2px 2px 2px rgba(37, 40, 41, .13);
      position: absolute;
      bottom: 110px;
      border-radius: 5px;

      /*三角形*/
      .triangle_border_down {
        width: 0;
        height: 0;
        border-width: 10px 10px 0;
        border-style: solid;
        border-color: #094cab transparent transparent;
        position: relative;
        bottom: -11px;
        left: 440px;

        span {
          display: block;
          width: 0;
          height: 0;
          border-width: 16px 14px 0;
          border-style: solid;
          border-color: #0f2744 transparent transparent;
          position: absolute;
          top: -18px;
          left: -14px;
        }
      }

      @media screen and (max-height: 960px) {
        .triangle_border_down {
          left: 400px;
        }
      }

      @media screen and (max-height: 768px) {
        .triangle_border_down {
          left: 316px;
        }
      }

      .warn-table-close {
        border: 1px solid #0069ff;
        background: #0f2744;
        color: #fff;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        position: absolute;
        right: -15px;
        top: -15px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;

        .ggicon-close:hover {
          color: #8ebfff;
        }
      }

      ul,
      #query_alarmInfo {
        display: inline-block;
        margin-top: 0;
        margin-bottom: 10px;
        max-height: 606px;
        overflow: auto;
        width: 100%;

      }

      @media screen and (max-height: 960px) {
        #query_alarmInfo {
          max-height: 486px;
        }
      }

      @media screen and (max-height: 768px) {
        #query_alarmInfo {
          max-height: 364px;
        }
      }
    }

    @media screen and (max-height: 960px) {
      .warn-detail-table:after {
        left: 90%;
      }
    }

    @media screen and (max-height: 960px) {
      .warn-detail-table {
        width: 460px;
        bottom: 90px;
        left: 54px;
      }
    }

    @media screen and (max-height: 768px) {
      .warn-detail-table {
        width: 374px;
        bottom: 80px;
        left: 130px;
      }
    }

    .warn-hidden-logo {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 0;
      padding-left: 0;

      li {
        float: left;
        margin-right: 10px;
        cursor: pointer;

        .alarm-trend-logo {
          background: #0f2744;
          display: inline-block;
          width: 87px;
          height: 87px;
          border-radius: 5px;
          box-shadow: 1px 2px 2px 2px rgba(37, 40, 41, .13);

          div {
            width: 87px;
            height: 87px;
            background: url(../../assets/img/dark_trend_logo.png) no-repeat center;
            background-size: 60%;
          }

          @media screen and (max-height: 960px) {
            div {
              width: 67px;
              height: 67px;
              background-size: 60%;
            }
          }

          @media screen and (max-height: 768px) {
            div {
              width: 67px;
              height: 67px;
              background-size: 60%;
            }
          }
        }

        @media screen and (max-height: 960px) {
          .alarm-trend-logo {
            width: 67px;
            height: 67px;
          }
        }

        .warn-detail-logo {
          background: #0f2744;
          display: inline-block;
          width: 87px;
          height: 87px;
          border-radius: 5px;
          box-shadow: 1px 2px 2px 2px rgba(37, 40, 41, .13);

          div {
            background: url(../../assets/img/dark_warn_logo.png) no-repeat center;
            background-size: 60%;
            width: 87px;
            height: 87px;
          }

          @media screen and (max-height: 960px) {
            div {
              width: 67px;
              height: 67px;
              background-size: 60%;
            }
          }

          @media screen and (max-height: 768px) {
            div {
              width: 67px;
              height: 67px;
              background-size: 60%;
            }
          }

          @media screen and (max-height: 768px) {
            .warn-detail-number {
              width: 40px;
              height: 20px;
            }
          }

        }

        @media screen and (max-height: 960px) {
          .warn-detail-logo {
            width: 67px;
            height: 67px;
          }
        }

        @media screen and (max-height: 768px) {

          .alarm-trend-logo,
          .warn-detail-logo {
            width: 67px;
            height: 67px;
          }
        }

        .warn-detail-number {
          display: inline-block;
          position: absolute;
          top: -8px;
          right: 0;
          width: 44px;
          height: 24px;
          border-radius: 20px;
          background: #f00;
          text-align: center;

          @media screen and (max-height: 768px) {
            #warn-detail-number {
              font-size: 18px;
            }
          }

          #warn-detail-number {
            position: relative;
            top: -2px;
            color: #fff;
            font-size: 20px;
          }
        }
      }
    }
  }

  /*右下方数据---------------------------------*/
  @media screen and (max-height: 768px) {
    .gg-warn-trend {
      bottom: 20px;
      right: 20px;
    }
  }

  /*搜索结果样式*/
  #gg-search-tip {
    margin: 0;
    padding-left: 0;
    list-style-type: none;
    display: inline-block;
    width: 512px;
    max-height: 210px;
    position: absolute;
    top: 144px;
    right: 22px;
    background: #0a1c33;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 2px 2px 2px rgba(37, 40, 41, .13);
    z-index: 1;

    li {
      color: #fff;
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;

      &:hover {
        background: #094cab;
        color: #fff;
      }
    }

    .now {
      background: #094cab;
      color: #fff;
    }
  }

  @media screen and (max-height: 768px) {
    #gg-search-tip {
      width: 384px;
      top: 134px;
    }
  }

</style>
<style lang="scss">
  /*地图弹框样式*/
  .group_light {
    .g2-tooltip {
      background: #fff;
      border: 1px solid transparent;
      display: none;
      position: absolute !important;
      -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
      border-radius: 0;
      bottom: 35px;
      left: -195px;

      &::before {
        border-top-color: #b6b6b6;
      }

      &::before {
        border-top-color: #0069ff;
        border-width: 12px;
        left: 185px;
        margin-left: -12px;
      }

      &::before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }

      &::after {
        border-top-color: #0f2744;
        border-width: 10px;
        left: 45px;
        margin-left: 130px;
      }

      .gg-gps-dialog {
        width: 100%;
        height: 100%;
        position: relative;

        .close_g2_tooltip {
          border: 1px solid transparent;
          background: #fff;
          color: #a5a5a5;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          position: absolute;
          right: -15px;
          top: -15px;
          line-height: 28px;
          text-align: center;
          cursor: pointer;

          .ggicon-close {
            font-size: 14px;
          }

          .ggicon-close:hover {
            color: #0069ff;
          }
        }

        .gps-dialog-head {
          border-bottom: 1px solid #a5a5a5;
          height: 84px;

          .gps-dialog-title {
            color: #000;
            float: left;
            margin-left: 14px;
            margin-top: 6px;
            font-size: 18px;
            margin-bottom: 0;
            overflow: hidden;
            width: calc(373px - 65px);
            text-overflow: ellipsis;
            white-space: nowrap;

            a {
              float: right;
              font-size: 14px;
              color: #0069ff;
              margin: 12px 12px 0 0;
              cursor: pointer;
            }

          }

          .ggicon-telphone {
            color: #14adef;
            font-size: 14px;
            display: inline-block;
            margin-left: 12px;

            span {
              display: inline-block;
              width: 337px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #000;
              font-size: 14px;
            }
          }

          .ggicon-location {
            color: #04a134;
            display: inline-block;
            margin-left: 12px;
          }

          span {
            display: inline-block;
            width: 337px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            color: #000;
          }

          a {
            color: #5380e9;
            float: right;
            font-size: 14px;
            margin: 12px 12px 0 0;
            cursor: pointer;
          }
        }

        .gps-dialog-body {
          width: 373px;
          height: 84px;
          box-shadow: 0 1px 1px 1px rgba(37, 40, 41, .13);

          ul {
            list-style-type: none;
            height: 84px;
            margin: 0;
            padding-left: 0;

            li {
              float: left;
              text-align: center;
              height: 84px;

              .dialog-num-size {
                width: 92px;
                font-size: 25px;
                margin-top: 17px;
                margin-bottom: 4px;
                color: #04aa37;

              }

              .gg-dialog-number {
                color: #000;
                font-size: 12px;
              }

              .gg-division-line {
                background: #bebebe;
                display: inline-block;
                width: 1px;
                height: 28px;
                margin-top: 30px;
              }

              @media screen and (max-height: 768px) {
                .gg-division-line {
                  margin-top: 18px;
                }
              }

              .gg-num-alarm {
                color: #e23737;
              }

              .gg-num-fault {
                color: #d27403;
              }

              .gg-num-hidden {
                color: #f9bb1f;
              }
            }
          }
        }

        /*三角形*/
        .triangle_border_down {
          width: 0;
          height: 0;
          border-width: 10px 10px 0;
          border-style: solid;
          border-color: #fff transparent transparent;
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translate(-50%, 0%);

          span {
            display: block;
            width: 0;
            height: 0;
            border-width: 16px 14px 0;
            border-style: solid;
            border-color: #fff transparent transparent;
            position: absolute;
            top: -18px;
            left: 50%;
            transform: translate(-50%, 0%);
          }
        }
      }
    }
  }

  /*地图弹框样式(黑夜模式)*/
  .g2-tooltip {
    background: #0f2744;
    border: 1px solid #0069ff;
    display: none;
    position: absolute !important;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    border-radius: 0;
    bottom: 35px;
    left: -195px;

    &::before {
      border-top-color: #b6b6b6;
    }

    &::before {
      border-top-color: #0069ff;
      border-width: 12px;
      left: 185px;
      margin-left: -12px;
    }

    &::before {
      top: 100%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &::after {
      border-top-color: #0f2744;
      border-width: 10px;
      left: 45px;
      margin-left: 130px;
    }

    .gg-gps-dialog {
      width: 100%;
      height: 100%;
      position: relative;

      .close_g2_tooltip {
        border: 1px solid #0069ff;
        background: #0f2744;
        color: #fff;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        position: absolute;
        right: -15px;
        top: -15px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;

        .ggicon-close {
          font-size: 14px;
        }

        .ggicon-close:hover {
          color: #8ebfff;
        }
      }

      .gps-dialog-head {
        border-bottom: 1px solid #a5a5a5;
        height: 84px;

        .gps-dialog-title {
          color: #fff;
          float: left;
          margin-left: 14px;
          margin-top: 6px;
          font-size: 18px;
          margin-bottom: 0;
          overflow: hidden;
          width: calc(373px - 65px);
          text-overflow: ellipsis;
          white-space: nowrap;

          a {
            float: right;
            font-size: 14px;
            color: #01fcf9;
            margin: 12px 12px 0 0;
            cursor: pointer;
          }

        }

        .ggicon-telphone {
          color: #14adef;
          font-size: 14px;
          display: inline-block;
          margin-left: 12px;

          span {
            display: inline-block;
            width: 337px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #000;
            font-size: 14px;
          }
        }

        .ggicon-location {
          color: #04a134;
          display: inline-block;
          margin-left: 12px;
        }

        span {
          display: inline-block;
          width: 337px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: #fff;
        }

        a {
          color: #01fcf9;
          float: right;
          font-size: 14px;
          margin: 12px 12px 0 0;
          cursor: pointer;
        }
      }

      .gps-dialog-body {
        width: 373px;
        height: 84px;
        box-shadow: 0 1px 1px 1px rgba(37, 40, 41, .13);

        ul {
          list-style-type: none;
          height: 84px;
          margin: 0;
          padding-left: 0;

          li {
            float: left;
            text-align: center;
            height: 84px;

            .dialog-num-size {
              width: 92px;
              font-size: 25px;
              margin-top: 17px;
              margin-bottom: 4px;
              color: #fff;

            }

            .gg-dialog-number {
              color: #fff;
              font-size: 12px;
            }

            .gg-division-line {
              background: #bebebe;
              display: inline-block;
              width: 1px;
              height: 28px;
              margin-top: 30px;
            }

            @media screen and (max-height: 768px) {
              .gg-division-line {
                margin-top: 18px;
              }
            }

            .gg-num-alarm {
              color: #FFF;
            }

            .gg-num-fault {
              color: #FFF;
            }

            .gg-num-hidden {
              color: #FFF;
            }
          }
        }
      }

      /*三角形*/
      .triangle_border_down {
        width: 0;
        height: 0;
        border-width: 10px 10px 0;
        border-style: solid;
        border-color: #094cab transparent transparent;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translate(-50%, 0%);

        span {
          display: block;
          width: 0;
          height: 0;
          border-width: 16px 14px 0;
          border-style: solid;
          border-color: #0f2744 transparent transparent;
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translate(-50%, 0%);
        }
      }
    }
  }

  /*真警样式(白天样式)*/
  .group_light {
    #query_alarmInfo {

      .gg-not,
      li {
        height: 80px;
        border-bottom: 1px solid #bebebe;
        margin-top: 20px;
        margin-left: 10px;

        .detail-fire-logo,
        .detail-alarm-logo {
          background: url(../../assets/img/alarm_log.png) no-repeat center;
          background-size: 100% !important;
          display: inline-block;
          width: 62px;
          height: 62px;
          float: left;
        }

        @media screen and (max-height: 768px) {

          .detail-fire-logo,
          .detail-alarm-logo {
            background-size: 100%;
            width: 40px;
            height: 45px;
          }
        }

        .detail-fire-body {
          display: inline-block;
          width: 410px;
          position: relative;
          cursor: pointer;

          .detail-fire-name {
            margin-left: 10px;
            font-size: 20px;
            color: #3c8dbc;
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          @media screen and (max-height: 768px) {
            .detail-fire-name {
              font-size: 16px;
            }
          }

          .detail-fire-address {
            font-size: 16px;
            color: #a4a4a4;
            display: inline-block;
            margin-left: 10px;
            margin-top: 10px;
          }

          @media screen and (max-height: 768px) {
            .detail-fire-address {
              font-size: 12px;
            }
          }

          .detail-fire-date {
            font-size: 16px;
            position: absolute;
            top: 2px;
            right: 0;
            color: #000;
          }

          @media screen and (max-height: 768px) {
            .detail-fire-date {
              font-size: 12px;
            }
          }
        }

        @media screen and (max-height: 960px) {
          .detail-fire-body {
            width: 370px;
          }
        }

        @media screen and (max-height: 768px) {
          .detail-fire-body {
            width: 305px;
          }
        }

      }

      @media screen and (max-height: 768px) {
        li {
          height: 60px !important;
        }
      }
    }
  }

  #query_alarmInfo {

    .gg-not,
    li {
      height: 80px;
      border-bottom: 1px solid #bebebe;
      margin-top: 20px;
      margin-left: 10px;

      .detail-fire-logo,
      .detail-alarm-logo {
        background: url(../../assets/img/dark_alarm_logo.png) no-repeat center;
        background-size: 60% !important;
        display: inline-block;
        width: 62px;
        height: 62px;
        float: left;
      }

      @media screen and (max-height: 768px) {

        .detail-fire-logo,
        .detail-alarm-logo {
          background-size: 100%;
          width: 40px;
          height: 45px;
        }
      }

      .detail-fire-body {
        display: inline-block;
        width: 410px;
        position: relative;
        cursor: pointer;

        .detail-fire-name {
          margin-left: 10px;
          font-size: 20px;
          color: #fff;
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media screen and (max-height: 768px) {
          .detail-fire-name {
            font-size: 16px;
          }
        }

        .detail-fire-address {
          font-size: 16px;
          color: #fff;
          display: inline-block;
          margin-left: 10px;
          margin-top: 10px;
        }

        @media screen and (max-height: 768px) {
          .detail-fire-address {
            font-size: 12px;
          }
        }

        .detail-fire-date {
          font-size: 16px;
          position: absolute;
          top: 2px;
          right: 0;
          color: #fff;
        }

        @media screen and (max-height: 768px) {
          .detail-fire-date {
            font-size: 12px;
          }
        }
      }

      @media screen and (max-height: 960px) {
        .detail-fire-body {
          width: 380px;
        }
      }

      @media screen and (max-height: 768px) {
        .detail-fire-body {
          width: 310px;
        }
      }

    }

    @media screen and (max-height: 768px) {
      li {
        height: 60px !important;
      }
    }
  }

  .scroll-normal::-webkit-scrollbar {
    width: 6px;
  }

  .scroll-normal::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, .5);
  }

  .scroll-normal::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(249, 249, 249, .5);
    -webkit-border-radius: 3px;
    border-radius: 3px;
  }

</style>
