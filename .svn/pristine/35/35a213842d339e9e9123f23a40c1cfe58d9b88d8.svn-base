<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <Title />
          <el-col :span="24" class="staticNotab">
            <el-form :inline="true" class="demo-form-inline filterAll">
              <el-row>
                <el-col :span="10" style="text-align:left;">
                  <el-radio-group v-model="barStatus" size="mini" @change="clickBar">
                    <el-radio-button :label="0"><i class="fa fa-line-chart"></i></el-radio-button>
                    <el-radio-button :label="1"><i class="fa fa-list-ul"></i></el-radio-button>
                  </el-radio-group>
                  <span style="margin-left: 10px;font-size: 2rem;">报警数{{totalNum?totalNum:'0'}}起，真警{{policeNum?policeNum:'0'}}起</span>
                </el-col>
                <el-col :span="12">
                  <el-row type="flex" justify="end">
                    <el-col class="text-4" :span="13" style="text-align:left; width: 320px">
                      <label>报警时间:</label>
                      <el-date-picker v-model="dateTime" @change="selectDateTime" size="small" :picker-options="pickerOptions" type="daterange" range-separator="" endPlaceholder="" startPlaceholder="请选择日期" value-format="yyyy-MM-dd ">
                      </el-date-picker>
                    </el-col>
                    <el-col class="text-2" :span="9" style=" width: 240px">
                      <label>楼栋:</label>
                      <el-select v-model="formInline.buildId" placeholder="全部" clearable @change="selectFloor">
                        <el-option id='floorName' :label="floor.buildName " :value="floor.buildId" v-for="floor in floors" :key="floor.id"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="2" style="text-align:right">
                  <el-button type="primary" @click="exportReport">导出</el-button>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
            </el-row>
            <el-row :gutter="20" v-if="isShow" style="margin:0 10px 20px;">
              <el-col :span="12" class="box-mid">
                <div class="chartPar">
                  <p class="police_title"> <img src="./images/echat-graph.png" alt="报警趋势"> 报警趋势</p>
                  <div id="police_trend"></div>
                </div>
              </el-col>
              <el-col :span="12" class="box-mid">
                <div class="chartPar">
                  <p class="police_title"> <img src="./images/echat-graph.png" alt="时段分布">
                    时段分布</p>
                  <div id="interval_trend"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="isShow" style="margin:0 10px 20px;">
              <el-col :span="8" class="box-mid">
                <div class="chartPar">
                  <p class="police_title"> <img src="./images/echart-cirele.png" alt="来源分布">
                    来源分布</p>
                  <div id="root_trend"></div>
                </div>
              </el-col>
              <el-col :span="8" class="box-mid">
                <div class="chartPar">
                  <p class="police_title"> <img src="./images/echart-cirele.png" alt="处置情况">
                    处置情况</p>
                  <div id="dispose_trend"></div>
                </div>
              </el-col>
              <el-col :span="8" class="box-mid">
                <div class="chartPar">
                  <p class="police_title"> <img src="./images/echart-cirele.png" alt="区域分布">
                    区域分布</p>
                  <div id="area_trend"></div>
                </div>
              </el-col>
            </el-row>
            <!--table-->
            <div class="notab" v-else-if="!isShow">
              <el-scrollbar>
                <el-table v-loading="isLoading" :data="tableData" stripe @row-click="openDetails" style="width: 100%;padding:0">
                  <el-table-column min-width="10%" prop="alarmNo" label="报警编号" align="center" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column min-width="10%" show-overflow-tooltip prop="deviceType" label="设施类型" align="center">
                  </el-table-column>
                  <el-table-column min-width="10%" align="center" prop="laLoopPoint" label="回路点位">
                    <template slot-scope="scope">
                      <div class="gs-el-button-group--gapSmall">
                        <div>{{tableData[scope.$index].laLoop==null?"":tableData[scope.$index].laLoop}}-{{tableData[scope.$index].laPoint==null?"":tableData[scope.$index].laPoint}}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="15%" show-overflow-tooltip align="center" prop="receiveTime" label="报警接收时间">
                  </el-table-column>
                  <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="deviceAddress" label="报警点位">
                  </el-table-column>
                  <el-table-column min-width="10%" align="center" prop="alarmState" label="复核结果">
                    <template slot-scope="scope">
                      <span v-if="scope.row.alarmState ===  '1'">真警</span>
                      <span v-if="scope.row.alarmState === '0'">误报</span>
                      <span v-if="scope.row.alarmState === '2'">待复核</span>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="feedbackPerson" label="复核人">
                  </el-table-column>
                  <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="feedbackTime" label="复核时间">
                  </el-table-column>
                  <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="resetTime" label="复位时间">
                  </el-table-column>
                  <el-table-column min-width="10%" align="center" prop="isRegular" label="是否规范">
                    <template slot-scope="scope">
                      <span v-if="scope.row.isRegular === '0' ">规范</span>
                      <span v-if="scope.row.isRegular === '1' ">不规范</span>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="12%" show-overflow-tooltip align="center" prop="regularDesc" label="不规范原因">
                  </el-table-column>
                </el-table>
              </el-scrollbar>

              <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
            </div>
          </el-col>

        </div>
      </el-col>
    </el-row>
    <!-- 详情页 -->
    <el-dialog title="报警信息详情" :visible.sync="newlyAddedVisible" width="86%" style="margin: 0 auto; text-align: left; color: #000;">
      <el-scrollbar>
        <div class="gg-base-info" style="height: 500px;">
          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">基本信息</h3>
            <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <th class="color_gray">设施编号 :</th>
                  <td class="w_420">{{data.deviceId}}</td>
                  <th class="color_gray">报警接收时间 :</th>
                  <td class="w_420">{{data.receiveTime}}</td>
                </tr>
                <tr>
                  <th class="color_gray">设施类型 :</th>
                  <td class="w_420">{{data.deviceType}}</td>
                  <th class="color_gray">报警编号 :</th>
                  <td class="w_420">{{data.alarmNo}}</td>
                </tr>
                <tr>
                  <th class="color_gray">回路点位 :</th>
                  <td class="w_420">{{data.laLoop}}-{{data.laPoint}}</td>
                </tr>
                <tr>
                  <th class="color_gray">报警点位 :</th>
                  <td class="w_420">{{data.deviceAddress}}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">复核信息</h3>
            <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <th class="color_gray">复核结果 :</th>
                  <td class="w_420">
                    <span v-if="data.alarmState == '0'">误报</span>
                    <span v-else-if="data.alarmState == '1'">真警</span>
                    <span v-else-if="data.alarmState == '2'">待复核</span>
                  </td>
                  <th class="color_gray">复核时间 :</th>
                  <td class="w_420">{{data.feedbackTime}}</td>
                </tr>
                <tr>
                  <th class="color_gray">复核描述 :</th>
                  <td class="w_420">{{data.feedbackDes}}</td>
                  <th class="color_gray">复核人 :</th>
                  <td class="w_420">{{data.feedbackPerson}}</td>
                </tr>
                <tr>
                  <th class="color_gray">上传照片 :</th>
                  <td colspan="9" v-if="urlList.length === 0">
                  </td>
                  <td colspan="9" v-else-if="urlList.length !== 0">
                    <img :src=item v-for="(item, index) in urlList" :key="index" alt="" style="cursor:pointer;width:100px;height:100px;" @click="enlarge(item)">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">主机复位信息</h3>
            <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <th class="color_gray">复位时间 :</th>
                  <td class="w_420">{{data.resetTime}}</td>
                  <th class="color_gray">不规范原因 :</th>
                  <td class="w_420">{{data.regularDesc}}</td>
                </tr>
                <tr>
                  <th class="color_gray">是否规范 :</th>
                  <td class="w_420">
                    <span v-if="data.isRegular == '0'">规范</span>
                    <span v-else-if="data.isRegular == '1'">不规范</span>
                    <span v-else-if="data.isRegular == null"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </el-scrollbar>
    </el-dialog>
    <!-- 显示图片 -->
    <el-dialog title="图片详情" :visible.sync="pictureDetails" style="width: 77%; margin: 0 auto;">
      <!--<img :src=url style="cursor:pointer;width:500px;height:500px;" alt="">-->
      <el-scrollbar>
        <div style="max-height: 400px;max-width: 500px;">
          <img :src=url style="cursor:pointer;width:100%;height:100%;" alt="">
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../config/http';
import Title from '../../components/Title.vue';
import Pagination from "~/components/Pagination";
export default {
  components: {
    Title,
    Pagination
  },
  data() {
    return {
      isLoading: false,
      isShow: true,
      dateTime: '',
      totalNum: null, //报警数
      policeNum: null, //真警数
      pickerOptions: {
        onClick(picker) {
          let end = new Date();
          let start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      },
      floors: '',
      alarmTimeStart: '',
      alarmTimeEnd: '',
      alarmTimeEndBind: '',
      barStatus: 0,
      formInline: {
        buildId: "",
        pageNo: 1,
        pageSize: 6,
        policeData: [],
      },
      policeTrendOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        color: ['#4472C5'],
        grid: {
          top: 20,
          bottom: 40,
          left: 35,
          width: "87%",
          // containLabel: true //底部留白
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            alignWithLabel: true
          },
          data: [],
          axisLabel: {
            interval: 0
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLine: {
            show: false,
          },
          data: []
        },
        series: {
          center: ['50%', '50%'],
          name: '报警趋势',
          data: [],
          type: 'line',
          stack: '总量',
          smooth: true,
          radius: '50%',
          lineStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#50e0fd' // 100% 处的颜色
                }, {
                  offset: 1,
                  color: '#1d62f0' // 0% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#0061b1'
            }
          },
          //报警趋势数据
        }
      },
      intervalTrendOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        ruleForm: {
          date1: ''
        },
        color: ['#4472C5'],
        grid: {
          top: 20,
          bottom: 40,
          left: 35,
          width: "90%",
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: [],
        },
        yAxis: {
          type: 'value',
          /* splitLine:{
               show:true  ,
           }*/
        },
        series: {
          data: '',
          type: 'bar',
          barWidth: '60%',
          name: '报警上报数',
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#000',
                fontSize: "1.8rem"
              }
            }
          },
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 1,
                  color: '#50e0fd' // 100% 处的颜色
                }, {
                  offset: 0,
                  color: '#1d62f0' // 0% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
        }
      },
      intervalData: [],
      rootTrendOption: {
        title: {

          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
          name: '来源分布',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [],
          label: {
            normal: {
              textStyle: {
                fontSize: "11",
                color: '#414141'
              },
              formatter(a) {
                let text = a.name;
                return text.length < 4 ? text : `${text.slice(0, 5)}\n${text.slice(5)}`
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#FFFFFF',
              labelLine: {
                show: true, //隐藏标示线
                lineStyle: {
                  color: '#000'
                }
              },

            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },],
        color: ['#c8efff', '#a7e7ff', '#79d9f1', '#52cdd5', '#00acee']
      },
      rootData: [],
      disposeTrendOption: {
        title: {

          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
          name: '处置情况',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [],
          label: {
            normal: {
              textStyle: {
                fontSize: "11",
                color: '#414141'
              },
              formatter(a) {
                let text = a.name;
                return text.length < 4 ? text : `${text.slice(0, 5)}\n${text.slice(5)}`
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#FFFFFF',
              labelLine: {
                show: true, //隐藏标示线
                lineStyle: {
                  color: '#000'
                }
              },

            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },],
        color: ['#c8efff', '#a7e7ff', '#79d9f1', '#52cdd5', '#00acee']
      },
      disposeData: [],
      areaTrendOption: {
        title: {

          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
          name: '区域分布',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [],
          label: {
            normal: {
              textStyle: {
                fontSize: "11",
                color: '#414141'
              },
              formatter(a) {
                let text = a.name;
                return text.length < 4 ? text : `${text.slice(0, 5)}\n${text.slice(5)}`
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#FFFFFF',
              labelLine: {
                show: true, //隐藏标示线
                lineStyle: {
                  color: '#000'
                }
              },

            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },],
        color: ['#c8efff', '#a7e7ff', '#79d9f1', '#52cdd5', '#00acee']
      },
      areaData: [],
      tableData: [],
      widgetInfo: {
        pageSize: 6,
        pageNo: 1,
        list: [],
        total: null,
      },
      police_trend: '',
      interval_trend: '',
      root_trend: '',
      dispose_trend: '',
      area_trend: '',
      newlyAddedVisible: false,
      pictureDetails: false,
      data: {},
      urlList: [],
      url: '',
    }
  },
  mounted() {
    this.getEchart();
    let that = this;
    this.getFloor();
    this.getPoliceTrend();
    this.getIntervalTrend();
    this.getRootTrend();
    this.getDisposeTrend();
    this.getAreaTrend();
    this.getTables();
    if (process.browser) {
      window.onresize = () => {
        return (() => {
          that.police_trend.resize();
          that.interval_trend.resize();
          that.root_trend.resize();
          that.dispose_trend.resize();
          that.area_trend.resize();
        })()
      }
    }
  },
  methods: {
    getEchart() {
      this.police_trend = this.$echarts.init(document.getElementById('police_trend'));
      this.interval_trend = this.$echarts.init(document.getElementById('interval_trend'));
      this.root_trend = this.$echarts.init(document.getElementById('root_trend'));
      this.dispose_trend = this.$echarts.init(document.getElementById('dispose_trend'));
      this.area_trend = this.$echarts.init(document.getElementById('area_trend'));
    },
    getFloor() {//832/api/v1/monitorCenter/monitor/getTAndAByUnitIdAndBuildId
      api.post("/remoteApi/tool/floor/getFloorInfoByUnitIdAndBuildId", {
        unitId: "CKJGQ_20180312"
      }).then(res => {
        if (res.code === "success") {
          this.floors = res.data;
        }
      }).catch(err => {
        console.log(err)
      })

    },
    //报警趋势
    getPoliceTrend() {
      this.isLoading = true;
      api.post(api.forent_url.moblie_url + '/home/queryStatisticsAlarm', {
        startDate: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[0] + '' + '00:00:00',
        endDate: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[1] + '' + '23:59:59',
        buildId: this.formInline.buildId,
        unitId: api.getGlobalVal('userObj').orgCode
      }).then(res => {
        if (res.code === "success" && res.data) {
          this.isLoading = false;
          this.policeData = res.data;
          this.policeTrendOption.xAxis.data = res.data.data_x;
          this.policeTrendOption.series.data = res.data.data_y;
          // auto 自适应
          // 0 不省略
          if (res.data.data_x.length >= 8) {

            this.policeTrendOption.xAxis.axisLabel.interval = 'auto'
          } else {

            this.policeTrendOption.xAxis.axisLabel.interval = 0
          }


          this.$nextTick(() => {
            this.$forceUpdate();
            this.police_trend.setOption(this.policeTrendOption);
          })

          //console.log(res.data.data_x,'res.data.data_x')
        }
      }).catch(err => {
        console.log(err);
        this.isLoading = false;
      })
    },
    //时段趋势
    getIntervalTrend() {
      this.isLoading = true;
      api.post(api.forent_url.moblie_url + '/home/queryIntervalAlarm', {
        startDate: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[0] + '' + '00:00:00',
        endDate: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[1] + '' + '23:59:59',
        buildId: this.formInline.buildId,
        unitId: api.getGlobalVal('userObj').orgCode
      }).then(res => {
        if (res.code === 'success') {
          this.isLoading = false;
          this.intervalData = res.data;
          this.intervalTrendOption.xAxis.data = res.data.data_x;
          this.intervalTrendOption.series.data = res.data.data_y;
          this.interval_trend.setOption(this.intervalTrendOption);
        }
      }).catch(err => {
        this.isLoading = false;
        console.log(err)
      })
    },
    //来源分布
    getRootTrend() {
      api.post(api.forent_url.moblie_url + '/home/queryDeviceAlarm', {
        startDate: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[0] + '' + '00:00:00',
        endDate: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[1] + '' + '23:59:59',
        buildId: this.formInline.buildId,
        unitId: api.getGlobalVal('userObj').orgCode
      }).then(res => {
        if (res.code === 'success') {
          this.rootData = res.data;
          let arr = this.rootTrendOption.series[0].data = res.data.data_y;
          if (arr && arr.length > 0) {
            arr.map(y => ({
              value: y.value,
              name: y.name,
            }));
          }
          this.root_trend.setOption(this.rootTrendOption)
        }
      }).catch(err => { })
    },
    //处置情况
    getDisposeTrend() {
      api.post(api.forent_url.moblie_url + '/home/queryReportChannelAlarm', {
        startDate: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[0] + '' + '00:00:00',
        endDate: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[1] + '' + '23:59:59',
        buildId: this.formInline.buildId,
        unitId: api.getGlobalVal('userObj').orgCode
      }).then(res => {
        if (res.code === 'success') {
          this.disposeData = res.data;
          let dataY = this.disposeTrendOption.series[0].data = res.data.data_y;
          if (dataY && dataY.length > 0) {
            dataY.forEach(item => {
              if (item.name === "真警") {
                this.policeNum = item.value;
              }
            });
          }
          //报警数量
          this.totalNum = dataY.reduce((total, current) => {
            return total + current.value;
          }, 0);
          this.dispose_trend.setOption(this.disposeTrendOption)
        }
      })
    },
    //区域分布
    getAreaTrend() {
      api.post(api.forent_url.moblie_url + '/home/queryAreaAlarm', {
        startDate: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[0] + '' + '00:00:00',
        endDate: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[1] + '' + '23:59:59',
        buildId: this.formInline.buildId,
        unitId: api.getGlobalVal('userObj').orgCode
      }).then(res => {
        if (res.code === 'success') {
          this.areaData = res.data;
          this.disposeTrendOption.series[0].data = res.data.data_y;
          let arr = this.areaTrendOption.series[0].data = res.data.data_y;
          arr.map(y => ({
            value: y.value,
            name: y.name,
          }));
          this.area_trend.setOption(this.areaTrendOption)
        }
      }).catch(err => {

      })
    },
    getTables() {//proprietorIdproprietorId
      this.isLoading = true;
      api.post(api.forent_url.base_url + '/alarmInfo/query', {
        pageNo: this.widgetInfo.pageNo,
        pageSize: this.widgetInfo.pageSize,
        proprietorId: api.getGlobalVal('userObj').orgCode,
        alarmTimeStart: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[0] + '' + '00:00:00',
        alarmTimeEnd: this.dateTime === '' || this.dateTime === null ? '' : this.dateTime[1] + '' + '23:59:59',
        build: this.formInline.buildId,
        alarmTimeEndBind: this.dateTime ? new Date(this.dateTime === '' || this.dateTime === null ? "" : this.dateTime[0]) + ',' + new Date(this.dateTime === '' || this.dateTime === null ? "" : this.dateTime[1]) : '',
      }).then(res => {
        if (res.code === "2001") {
          this.isLoading = false;
          this.tableData = res.data.rows;
          this.widgetInfo.list = res.data.rows;
          this.widgetInfo.total = res.data.total === null ? 0 : res.data.total;
        } else {
          this.isLoading = false;
          this.tableData = [];
          //this.widgetInfo.list = res.data.rows;
          this.widgetInfo.total = 0;
          //console.log('没有数值。。。。。')
        }
      }).catch(err => {
        this.isLoading = false;
        console.log(err);
        this.$message(
          {            type: 'warning',
            message: "加载超时,请重新加载!"          });
      });
    },
    //详情
    async openDetails(row) {
      let that = this
      this.newlyAddedVisible = true;
      await api.get(api.forent_url.moblie_url + "/alarmInfo/" + row.id)
        .then(res => {
          console.log(res)
          that.data = res.alarmInfo;
          console.log(that.data)
          if (res.attaches.length === 0) {
            that.urlList = []
          } else {
            that.urlList = []
            res.attaches.forEach(element => {
              that.base_url = api.forent_url.pic_url + '/' + element.attachPath
              console.log('that.base_url', that.base_url)
              that.urlList.push(that.base_url)
            });
          }
          console.log('res.attaches', res.attaches);
          console.log('that.urlList', that.urlList)
        })
    },
    enlarge(b) {
      console.log(b);
      this.url = b;
      this.pictureDetails = true;
    },
    clickBar(num) {
      if (num === 0) {
        this.isShow = true;
        //清空报警数
        this.totalNum = '';
        this.policeNum = '';
        this.$nextTick(() => {
          this.getPoliceTrend();
          this.getIntervalTrend();
          this.getRootTrend();
          this.getDisposeTrend();
          this.getAreaTrend();
          this.getEchart()
        })
      } else {
        this.isShow = false;
        //清空报警数
        this.totalNum = '';
        this.policeNum = '';
        this.getDisposeTrend();
      }
    },
    selectDateTime(val) {
      this.dateTime = val;
      if (this.isShow) {
        this.totalNum = '';
        this.policeNum = '';
        this.getPoliceTrend();
        this.getIntervalTrend();
        this.getRootTrend();
        this.getDisposeTrend();
        this.getAreaTrend();
      } else {
        this.totalNum = '';
        this.policeNum = '';
        this.getTables();
        this.getPoliceTrend();
        this.getIntervalTrend();
        this.getRootTrend();
        this.getDisposeTrend();
        this.getAreaTrend();
      }
    },
    selectFloor(val) {
      this.formInline.buildId = val;
      this.widgetInfo.pageNo = 1;
      if (this.isShow) {
        this.totalNum = '';
        this.policeNum = '';
        this.getPoliceTrend();
        this.getIntervalTrend();
        this.getRootTrend();
        this.getDisposeTrend();
        this.getAreaTrend();
      } else {
        this.totalNum = '';
        this.policeNum = '';
        this.getDisposeTrend();
        this.getTables();
      }
    },

    exportReport() {
      if (this.dateTime != null && this.dateTime.length > 0) {
        window.location.href = api.forent_url.base_url + "/alarmInfo/download?" + "proprietorId=" + api.getGlobalVal('userObj').orgCode +
          "&alarmTimeStart=" + this.dateTime[0] + '00:00:00' + '&alarmTimeEnd=' + this.dateTime[1] + '23:59:59' + '&build=  '

      } else {
        window.location.href = api.forent_url.base_url + "/alarmInfo/download?" + "proprietorId=" + api.getGlobalVal('userObj').orgCode + '&alarmTimeStart=&alarmTimeEnd=&build='
      }
    },
    sonHandleCurrentChange(widgetInfo) {
      this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
      this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
      this.getTables();
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/css/table.scss";

.filterAll .el-radio-button {
  width: auto !important;
}

.box-mid {
  height: calc((100vh - 138px - 78px - 20px - 20px - 6px) / 2);
  box-sizing: border-box;
}

.chartPar {
  height: 100%;
  width: 100%;
  border: 1px solid #e2e4e8;

  .police_title {
    line-height: 32px;
    border-bottom: 1px solid #dddedf;
    margin: 0 20px;

    img {
      width: 15px;
      vertical-align: middle;
      margin-right: 3px;
    }
  }
}

.chartPar > div {
  width: 100%;
  height: calc(100% - 32px);
}
.tables {
  height: calc(100% - 131px);
}

@media screen and (max-width: 1680px) {
  .box-mid {
    height: calc((100vh - 138px - 78px - 10px - 20px) / 2);
  }

  .tables {
    height: calc(100% - 125px);
  }
}

@media screen and (max-width: 1440px) {
  .box-mid {
    height: calc((100vh - 138px - 55px - 20px) / 2);
  }

  .tables {
    height: calc(100% - 114px);
  }
}
.gg-base-info {
  margin: 20px 25px;
}
.gg-base-unit {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #e2e4e8;
}
.gg-base-h3 {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-left: 4px solid #6a90ec;
  background-color: #eef3fe;
}
.gg-table {
  margin: 15px;
}
.color_gray {
  color: #777;
  width: 94px;
}
.black {
  color: #000;
}
.w_420 {
  width: 450px;
  color: #000;
}
</style>
<style>
.el-tooltip__popper.is-dark {
  max-width: 300px;
}
</style>
