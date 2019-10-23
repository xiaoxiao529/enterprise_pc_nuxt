<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <Title />
          <el-col :span="24" class="staticNotab">
            <el-form :inline="true" class="demo-form-inline filterAll">
              <el-row>
                <el-col :span="9">
                  <el-radio-group v-model="barStatus" size="mini"  @change="clickBar">
                    <el-radio-button :label="0" ><i class="fa fa-line-chart"></i></el-radio-button>
                    <el-radio-button :label="1" ><i class="fa fa-list-ul"></i></el-radio-button>
                  </el-radio-group>
                  <span style="font-size: 14px;padding-top: 1px;line-height: 30px">&nbsp;新增预警数{{newWarningNum ? newWarningNum : '0'}}个,未完成预警解除数{{unsolveNum ? unsolveNum :'0'}}个,请求协助{{isAssistanceNum ? isAssistanceNum : '0'}}次</span>
                </el-col>
                <el-col :span="13" >
                  <el-row type="flex" justify="end">
                    <el-col class="text-5" :span="13"  style="text-align:left; width: 330px">
                      <label>首次预警时间:</label>
                      <el-date-picker v-model="dateTime" @change="selectDateTime" size="small" :picker-options="pickerOptions"
                        type="daterange" range-separator="" endPlaceholder="" startPlaceholder="请选择日期" value-format="yyyy-MM-dd ">
                      </el-date-picker>
                    </el-col>
                    <el-col class="text-2" :span="9" style=" width: 240px">
                      <label>楼栋:</label>
                      <el-select v-model="formInline.buildId" placeholder="全部" clearable  @change="selectFloor">
                        <el-option id='floorName' :label="floor.buildName" :value="floor.buildId" v-for="floor in floors"
                          :key="floor.id"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="2" style="text-align:right">
                  <el-button type="primary"  @click="exportReport">导出</el-button>
                </el-col>
              </el-row>
            </el-form>
              <el-row >
              </el-row>
              <el-row :gutter="20" v-if="isShow"  style="margin:0 10px 20px;">
                <el-col :span="12"  class="box-mid">
                  <div  class="chartPar" >
                    <p class="police_title"> <img src="./images/echat-graph.png" alt="隐患变化趋势图"  >预警变化趋势图</p>
                    <div id="police_trend"></div>
                  </div>
                </el-col>
                <el-col :span="12" class="box-mid">
                  <div  class="chartPar" >
                    <p class="police_title"> <img src="./images/echat-graph.png" alt="隐患上报趋势图">预警新增趋势图</p>
                    <div id="interval_trend"></div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-if="isShow"  style="margin:0 10px 20px;">
                <el-col :span="8" class="box-mid">
                  <div  class="chartPar">
                    <p class="police_title"> <img src="./images/echart-cirele.png" alt="来源分布"> 处置情况</p>
                    <div id="root_trend"></div>
                    <!--<div id="root_test" style="text-align: center" >暂无数据</div>-->
                  </div>
                </el-col>
                <el-col :span="8" class="box-mid">
                  <div  class="chartPar">
                    <p class="police_title"> <img src="./images/echart-cirele.png" alt="类型分布"> 解除占比</p>
                    <div id="dispose_trend"></div>
                  </div>
                </el-col>
                <el-col :span="8" class="box-mid">
                  <div  class="chartPar">
                    <p class="police_title"> <img src="./images/echart-cirele.png" alt="区域分布"> 区域分布</p>
                    <div id="area_trend"></div>
                  </div>
                </el-col>
              </el-row>
              <!--table-->
              <div class="notab" v-else-if="!isShow">
                <el-scrollbar>
                   <el-table
                v-loading="isLoading"
                @row-click="openDetails"
                :data="tableData" stripe style="width: 100%;padding:0">
                <el-table-column min-width="10%" show-overflow-tooltip prop="warningNo" label="编号" align="center">
                </el-table-column>
                <el-table-column min-width="10%" show-overflow-tooltip prop="deviceType" label="设备类型" align="center">
                </el-table-column>
                <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="deviceAddress" label="设备位置">
                </el-table-column>
                <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="alarmNum"  label="预警次数"></el-table-column>
                <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="attribute1" label="首次预警时间">
                </el-table-column>
                <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="solveName" label="解除人">
                <template slot-scope="scope">
                <span v-if="scope.row.reportChannel ===  '0' ">物联网监测</span>
                <span v-if="scope.row.reportChannel ===  '3' ">巡检巡查</span>
                <span v-if="scope.row.reportChannel ===  '2' ">报警复核</span>
                <span v-if="scope.row.reportChannel ===  '1' ">人工上报</span>
                </template>
                </el-table-column>
                <el-table-column min-width="8%" show-overflow-tooltip align="center" prop="solveTime" label="解除时间">
                </el-table-column>
                <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="processState"
                                 label="预警状态">
                <template slot-scope="scope">
                <span v-if="scope.row.processState === '0' ">待查看</span>
                <span v-if="scope.row.processState === '1' ">待解除</span>
                </template>
                </el-table-column>
                <el-table-column min-width="12%" show-overflow-tooltip align="center" prop="isAssistance"
                                 label="是否请求帮助">
                <template slot-scope="scope">
                <span v-if="scope.row.isAssistance === null ">否</span>
                <span v-if="scope.row.isAssistance === '1' ">是</span>
                </template>
                </el-table-column>
                </el-table>
                </el-scrollbar>
              <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
              </div>
            </el-col>
        </div>
    </el-col>
      <!--预警详情-->
      <el-dialog title="电气火灾预警详情" :visible.sync="newlyAddedVisible" width="86%" style="margin: 0 auto; text-align: left;">
        <div class="gg-base-info">

          <div class="gg-base-unit">
            <div class="gg-base-h3">
              <h3 style="display: inline;" class="black">预警编号：{{data.warningNo}}</h3>
              <h3 style="margin-left: 20px; display: inline;" v-if="data.processState == '0'" class="yellow">待查看</h3>
              <h3 style="margin-left: 20px; display: inline;" v-else-if="data.processState == '1'" class="yellow">待解除</h3>
              <h3 style="margin-left: 20px; display: inline;" v-else-if="data.processState == '2'" class="green">已解除</h3>
              <h3 style="margin-left: 20px; display: inline;" v-else-if="data.processState == '3'" class="red">真警</h3>
            </div>
            <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
              <tbody>
              <tr>
                <th class="color_gray_w">设备类型 :</th>
                <td class="w_420">{{data.deviceType}}</td>
                <th class="color_gray_w">设备ID :</th>
                <td class="w_420">{{data.deviceId}}</td>
              </tr>
              <tr>
                <th class="color_gray_w">设备品牌 :</th>
                <td class="w_420">{{data.deviceName}}</td>
                <th class="color_gray_w">规格型号 :</th>
                <td class="w_420">{{data.deviceTypeid}}</td>
              </tr>
              <tr>
                <th class="color_gray_w">设备位置 :</th>
                <td class="w_420">{{data.build}}{{data.floor}}{{data.deviceAddress}}</td>
              </tr>
              <tr>
                <th class="color_gray_w">安装日期 :</th>
                <td class="w_420">{{data.attribute1}}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">
              <span :class="{'gg-active':!qustionList}" @click="qustionList = false">预警记录({{num}}次)</span>
              <span :class="{'gg-active':qustionList}" @click="qustionList = true" class="question">处置记录</span>
            </h3>
            <!-- 预警记录start -->
            <div class="gg-worklog-model" v-show="!qustionList" id="comp_div" style="display: block;z-index:100">
              <el-scrollbar>
                <div v-if="earlyWarningRecord != null && earlyWarningRecord.length > 0" style="height: 260px;">
                  <div v-for="(item, index) in earlyWarningRecord" :key="index">
                    <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
                      <tbody>
                      <tr>
                        <span class="spot"></span>
                        <span style="font-size: 16px;color: black;">{{item.name}}({{item.count}}次)</span>
                        <el-button @click="switchRow(item)" type="text" :data="item.open1" style="font-size: 20px; color: #c9c9c9;">
                          <i :class="item.open1 === true ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
                        </el-button>
                      </tr>
                      <tr v-for="(it, index) in item.info" :key="index" :data="item.open1" v-show="item.open1 === true">
                        <span class="m_left">{{it.start == null ? '----' : it.start}}</span><span style="margin: 0 5px;" class="color_gray">~</span><span class="color_gray">{{it.end == null ? '----' : it.end}}</span>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-else style="margin: 20px;">暂无记录</div>
              </el-scrollbar>
            </div>
            <!-- 预警记录end -->

            <!-- 处置记录start -->
            <div class="gg-worklog-model" v-show="qustionList" id="comp_div">
              <el-scrollbar>
                <div v-if="disposalRecord != null && disposalRecord.length > 0" style="height: 260px;">
                  <div v-for="(item, index) in disposalRecord" :key="index">
                    <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
                      <tbody>
                      <div v-if="item.processStatus == '0'">
                        <tr>
                          <span class="spot"></span>
                          <span class="color_blue">首次预警</span><span class="red_ml" v-show="item.isAssistance === '1'">请求协助</span>
                          <div class="m_left">{{item.feedbackTime}}</div>
                        </tr>
                      </div>
                      <div v-else-if="item.processStatus == '1'">
                        <tr>
                          <span class="spot"></span>
                          <span class="color_blue">到场查看</span><span class="ml_30">{{item.userName}}</span><span class="red_ml" v-show="item.isAssistance === '1'">请求协助</span>
                          <div v-show="item.description" class="m_left">{{item.description}}</div>
                          <img :src=item v-for="(item, index) in item.urlList" :key="index" alt="" class="img" @click="enlarge(item)">
                          <div class="m_left">{{item.feedbackTime}}</div>
                        </tr>
                      </div>
                      <div v-else-if="item.processStatus == '2'">
                        <tr>
                          <span class="spot"></span>
                          <span class="color_blue">运营中心派单</span><span class="ml_30">{{item.userName}}</span><span class="red_ml" v-show="item.isAssistance === '1'">请求协助</span>
                          <div class="m_left">{{item.feedbackTime}}</div>
                        </tr>
                      </div>
                      <div v-else-if="item.processStatus == '3'">
                        <tr>
                          <span class="spot"></span>
                          <span class="color_blue">巡检处置</span><span class="ml_30">{{item.userName}}</span><span class="red_ml" v-show="item.isAssistance === '1'">请求协助</span>
                          <div class="m_left"><span v-show="item.problemDescription" class="black">问题描述：</span>{{item.problemDescription ? item.problemDescription : ''}}</div>
                          <div v-show="item.description" class="m_left"><span v-show="item.problemDescription" class="black">处置描述：</span>{{item.description}}</div>
                          <div v-show="item.measures" class="m_left"><span class="black">应急措施：</span>{{item.measures}}</div>
                          <img :src=item v-for="(item, index) in item.urlList" :key="index" alt="" class="img" @click="enlarge(item)">
                          <div class="m_left">{{item.feedbackTime}}</div>
                        </tr>
                      </div>
                      <div v-else-if="item.processStatus == '4'">
                        <tr>
                          <span class="spot"></span>
                          <span class="color_blue">预警解除</span><span class="ml_30">{{item.userName}}</span><span class="red_ml" v-show="item.isAssistance === '1'">请求协助</span>
                          <div class="m_left"><span v-show="item.problemDescription" class="black">问题描述:</span>{{item.problemDescription ? item.problemDescription : ''}}</div>
                          <div v-show="item.description" class="m_left"><span v-show="item.problemDescription" class="black">处置描述：</span>{{item.description}}</div>
                          <div v-show="item.measures" class="m_left"><span class="black">应急措施：</span>{{item.measures}}</div>
                          <img :src=item v-for="(item, index) in item.urlList" :key="index" alt="" class="img" @click="enlarge(item)">
                          <div class="m_left">{{item.feedbackTime}}</div>
                        </tr>
                      </div>
                      <div v-else-if="item.processStatus == '5'">
                        <tr>
                          <span class="spot"></span>
                          <span class="color_blue">确认真警</span><span class="ml_30">{{item.userName}}</span><span class="red_ml" v-show="item.isAssistance === '1'">请求协助</span>
                          <div v-show="item.description" class="m_left">{{item.description}}</div>
                          <img :src=item v-for="(item, index) in item.urlList" :key="index" alt="" class="img" @click="enlarge(item)">
                          <div class="m_left">{{item.feedbackTime}}</div>
                        </tr>
                      </div>
                      <div v-else-if="item.processStatus == '6'">
                        <tr>
                          <span class="spot"></span>
                          <span class="color_blue">电话通知商户</span><span class="ml_30">{{item.userName}}</span><span class="red_ml" v-show="item.isAssistance === '1'">请求协助</span>
                          <img :src=item v-for="(item, index) in item.urlList" :key="index" alt="" class="img" @click="enlarge(item)">
                          <div class="m_left">{{item.feedbackTime}}</div>
                        </tr>
                      </div>
                      <div v-else-if="item.processStatus == '7'">
                        <tr>
                          <span class="spot"></span>
                          <span class="color_blue">运营中心撤销派单</span><span class="ml_30">{{item.userName}}</span><span class="red_ml" v-show="item.isAssistance === '1'">请求协助</span>
                          <img :src=item v-for="(item, index) in item.urlList" :key="index" alt="" class="img" @click="enlarge(item)">
                          <div class="m_left">{{item.feedbackTime}}</div>
                        </tr>
                      </div>
                      <div v-else>
                        <tr>
                          <span class="spot"></span>
                          <span class="color_blue">运营中心重新派单</span><span class="ml_30">{{item.userName}}</span><span class="red_ml" v-show="item.isAssistance === '1'">请求协助</span>
                          <img :src=item v-for="(item, index) in item.urlList" :key="index" alt="" class="img" @click="enlarge(item)">
                          <div class="m_left">{{item.feedbackTime}}</div>
                        </tr>
                      </div>

                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-else style="margin: 20px;">暂无记录</div>
              </el-scrollbar>
            </div>
            <!-- 处置记录end -->
          </div>

        </div>
      </el-dialog>
      <!-- 显示图片 -->
      <el-dialog title="图片详情" :visible.sync="pictureDetails" style="width: 77%; margin: 0 auto;">
        <img :src=url style="cursor:pointer;width:500px;height:500px;" alt="">
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import api from '../../config/http';
  import Title from '../../components/Title.vue'
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
        barStatus:0,
        dateTime: '',
        newWarningNum: null,
        unsolveNum: null,
        isAssistanceNum: null,
        pickerOptions:{
          onClick(picker) {
            let end = new Date();
            let start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        },
        formInline: {
          buildId: "",
          pageNo: 1,
          pageSize: 6,
          proprietorId: "",
        },
        ruleForm: {
          date1: ''
        },
        unitId: 'AHHF_QHHFY_99999997',
        floors: '',
        totalNum: 0, //报警数
        policeNum: 0, //真警数
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
            left: 40,
            width:"86%",
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              alignWithLabel: true
            },
          },
          yAxis: [{
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLine: {
              show: false,
            },
          }],
          series: {
            name: '预警数',
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
            data: [],
            //报警趋势数据
          }

        },
        policeData: [],
        intervalTrendOption: {
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
            left: 40,
            width:"87%",

          },
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: [] //["2时", "4时", "6时", "8时", "10时", "12时", "14时", "16时", "18时", "20时", "22时", "24时"]
          },
          yAxis: [{
              type: 'value',
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              },
            axisLine: {
              show: false,
            },
          }],
          series: {
            data: [],
            type: 'line',
            smooth: true,
            radius: '50%',
            name: '预警数',
            label: {
              normal: {
                textStyle: {
                  color: '#000',
                  fontSize: "1.8rem"
                }
              }
            },
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
          }, ],
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
            name: '解除占比',
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
          }, ],
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
          }, ],
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
        police_trend : '',
        interval_trend : '',
        root_trend : '',
        dispose_trend : '',
        area_trend : '',
        newlyAddedVisible:false,
        qustionList: false,
        pictureDetails: false,
        data:{},//详情数据
        earlyWarningRecord: [],
        disposalRecord: [],
        urlList:[],
        url: '',
        num: 0,
      }
    },
    mounted() {
      this.getFloor();
      this.getHiddenChange();
      this.getHiddenReport();
      this.getRootTrend();
      this.getDisposeStatus();
      this.getAreaTrend();
      this.getTables();
      this.getAlarmNO();
       if (process.browser) {
        window.onresize = () => {
          return (() => {
            this.police_trend.resize();
            this.interval_trend.resize();
            this.root_trend.resize();
            this.dispose_trend.resize();
            this.area_trend.resize();
          })()
        }

      }
    },
    methods: {
      getFloor() {
        this.isLoading = true;
        api.post(api.forent_url.floor_url + "/monitorCenter/monitor/getTAndAByUnitId", {
          unitId: this.unitId
        }).then(res => {
          if (res.code === "success") {
            this.isLoading = false;
            this.floors = res.data;
          }
        }).catch(err => {
          this.isLoading = false;
          console.log(err)
        })
      },
      //警报信息
      getAlarmNO() {////112.27.198.15:9832/api/v1/fire-society/warning/queryWarningInfo
        this.isLoading = true;
        api.post(api.forent_url.base_url + "/warning/queryWarningInfo", {
          startDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[0] + ''+ '00:00:00',
          endDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[1] + ''+ '23:59:59',
          buildId: this.formInline.buildId,
          unitId: api.getGlobalVal('userObj').orgCode
        }).then(res => {
          if (res.code === "success") {
            this.isLoading = false;
            this.newWarningNum = res.data.newWarningNum;
            this.unsolveNum = res.data.unsolveNum;
            this.isAssistanceNum = res.data.isAssistanceNum;
          }
        }).catch(err => {
          this.isLoading = false;
          console.log(err);
        })
      },
      //预警变化112.27.198.15:9832/api/v1/fire-society/warning/queryUnsolveWarning
      getHiddenChange() {
        api.post(api.forent_url.moblie_url + '/warning/queryUnsolveWarning', {
          startDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[0] + ''+ '00:00:00',
          endDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[1] + ''+ '23:59:59',
          buildId: this.formInline.buildId,
          unitId: api.getGlobalVal('userObj').orgCode
        }).then(res => {
          if (res.code === "success" && res.data) {
            this.policeData = res.data;
            this.policeTrendOption.xAxis.data = res.data.data_x;
            this.policeTrendOption.series.data = res.data.data_y;
            this.echartsPolice();
            /* console.log(this.policeTrendOption.series.data);*/
          }
        }).catch(err => {
          this.isLoading = false;
          console.log(err);
        })
      },
      //预警新增
      getHiddenReport() {
        api.post(api.forent_url.moblie_url + '/warning/queryStatisticsWarning', {
          startDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[0] + ''+ '00:00:00',
          endDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[1] + ''+ '23:59:59',
          buildId: this.formInline.buildId,
          unitId: api.getGlobalVal('userObj').orgCode
        }).then(res => {
          if (res.code === 'success') {
            this.intervalData = res.data;
            this.intervalTrendOption.xAxis.data = res.data.data_x;
            this.intervalTrendOption.series.data = res.data.data_y;
            this.echartsInterval();
            // console.log(this.intervalTrendOption.xAxis.data)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //处置
      getRootTrend() {
        api.post(api.forent_url.moblie_url + '/warning/queryReportChannelWarning', {
          startDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[0] + ''+ '00:00:00',
          endDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[1] + ''+ '23:59:59',
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
            this.echartsRoot();
          }
        }).catch(err => {
          this.isLoading = false;
          console.log(err)
        })
      },
      //占比情况 http://112.27.198.15:9832/api/v1/fire-society/warning/queryProportionWarning
      getDisposeStatus() {
        api.post(api.forent_url.moblie_url + '/warning/queryProportionWarning', {
          startDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[0] + ''+ '00:00:00',
          endDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[1] + ''+ '23:59:59',
          buildId: this.formInline.buildId,
          unitId: api.getGlobalVal('userObj').orgCode
        }).then(res => {
          if (res.code === 'success') {
            this.isLoading =false;
            this.disposeData = res.data;
            this.disposeTrendOption.series[0].data = res.data.data_y;
           /* if (dataY && dataY.length > 0) {
              dataY.forEach(item => {
                if (item.name === "真警") {
                  this.policeNum = item.value;
                }
                  this.totalNum += item.value;
              })
            }*/
            this.echartsDispose();
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      //区域分布
      getAreaTrend() {
        api.post(api.forent_url.moblie_url + '/warning/queryAreaWarning', {
          startDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[0] + ''+ '00:00:00' ,
          endDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[1] + ''+ '23:59:59',
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
            this.echartsArea();
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getTables() {
        this.isLoading = true;
        api.post(api.forent_url.base_url + '/warning/query', {
          proprietorId: api.getGlobalVal('userObj').orgCode,
          warningTimeStart: this.dateTime === '' || this.dateTime === null? "" :this.dateTime[0] + ''+ '00:00:00' ,
          warningTimeEnd: this.dateTime === '' || this.dateTime === null? "" :this.dateTime[1] + ''+ '23:59:59' ,
          alarmTimeEndBind:this.dateTime ? new Date(this.dateTime === '' || this.dateTime === null? "":this.dateTime[0] ) + ',' + new Date( this.dateTime === '' || this.dateTime === null? "" :this.dateTime[1]):'' ,
          build: this.formInline.buildId,
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
        },5000).then(res => {
          if (res.code === "success") {
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.list = res.data.rows;
            this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
          }else {
            this.isLoading = false;
            this.tableData = [];
            this.widgetInfo.total = 0;
            //console.log('没有数值。。。。。')
          }
        }).catch(err => {
        this.isLoading = false;
          console.log(err)
          this.$message(
              { type:'warning',
                message:"加载超时,请重新加载!"});
        })
      },
      //点击切换
      switchRow (item) {
        item.open1 = !item.open1
        console.log(item.open1,"11111111111");
        console.log(item,'item............')
        // 强制触发渲染
        this.$forceUpdate();
        return item.open1
      },
      // 显示报警复核详情
      async openDetails(row) {
        let that = this;
        this.newlyAddedVisible = true;
        await api.post(api.forent_url.moblie_url + "/warning/getAlarm", {
          warningInfoId: row.id
        })
            .then(res=>{
              that.data = res.data.warningInfo;
              that.earlyWarningRecord = res.data.warningInfoDetails;
              that.disposalRecord = res.data.warningFeedbackDetail;
              if (that.earlyWarningRecord != null && that.earlyWarningRecord.length > 0) {
                that.num = 0;
                that.earlyWarningRecord.forEach(element => {
                  element.open1 = that.open1;
                  that.num += element.count;
                  console.log('=============', element)
                });
              }
              if (that.disposalRecord != null && that.disposalRecord.length > 0) {
                that.disposalRecord.forEach(element => {
                  if (element.attaches != null && element.attaches.length > 0) {
                    element.urlList = [];
                    element.attaches.forEach(ele => {
                      that.base_url = api.forent_url.pic_url + '/' + ele.attachPath
                      // console.log('that.base_url', that.base_url)
                      element.urlList.push(that.base_url)
                    });
                  }
                });
              }
            })
      },
      //图片
      enlarge(b) {
        console.log(b)
        this.url = b;
        this.pictureDetails = true;
      },
      //报警echarts
      echartsPolice() {
        this.police_trend = this.$echarts.init(document.getElementById('police_trend'));
        this.police_trend.setOption(this.policeTrendOption);
      },
      //时段echarts
      echartsInterval() {
        this.interval_trend = this.$echarts.init(document.getElementById('interval_trend'));
        this.interval_trend.setOption(this.intervalTrendOption)
      },
      //来源echarts
      echartsRoot() {
        this.root_trend = this.$echarts.init(document.getElementById('root_trend'));
        this.root_trend.setOption(this.rootTrendOption)
      },
      //处置echarts
      echartsDispose() {
        this.dispose_trend = this.$echarts.init(document.getElementById('dispose_trend'));
        this.dispose_trend.setOption(this.disposeTrendOption)
      },
      /*
      *
      * this.newWarningNum = res.data.newWarningNum;
        this.unsolveNum = res.data.unsolveNum;
        this.isAssistanceNum = res.data.isAssistanceNum;
      * */
      //区域分布
      echartsArea() {
        this.area_trend = this.$echarts.init(document.getElementById('area_trend'));
        this.area_trend.setOption(this.areaTrendOption)
      },
      clickBar(num) {
        if (num === 0) {
          this.isShow  = true;
          this.newWarningNum = '';
          this.unsolveNum = '';
          this.isAssistanceNum = '';
          //console.log("00000")
          this.$nextTick(()=>{
            this.getHiddenChange();
            this.getHiddenReport();
            this.getRootTrend();
            this.getDisposeStatus();
            this.getAreaTrend();
            this.echartsPolice();
            this.echartsInterval();
            this.echartsRoot();
            this.echartsDispose();
            this.echartsArea();
          })
        } else {
          this.isShow = false;
          this.newWarningNum = '';
          this.unsolveNum = '';
          this.isAssistanceNum = '';
          this.getAlarmNO();
        }
      },
      selectDateTime(val) {
        this.dateTime = val;
        this.widgetInfo.pageNo = 1;
        if (this.isShow) {
          this.newWarningNum = '';
          this.unsolveNum = '';
          this.isAssistanceNum = '';
          this.getAlarmNO();
          this.getHiddenChange();
          this.getHiddenReport();
          this.getRootTrend();
          this.getDisposeStatus();
          this.getAreaTrend();
        } else {
          this.newWarningNum = '';
          this.unsolveNum = '';
          this.isAssistanceNum = '';
          this.getTables();
          this.getAlarmNO();
        }
      },
      selectFloor(val) {
        this.formInline.buildId = val;
        this.widgetInfo.pageNo = 1;
        if (this.isShow) {
          this.newWarningNum = '';
          this.unsolveNum = '';
          this.isAssistanceNum = '';
          this.getAlarmNO();
          this.getHiddenChange();
          this.getHiddenReport();
          this.getRootTrend();
          this.getDisposeStatus();
          this.getAreaTrend();
        } else {
          this.newWarningNum = '';
          this.unsolveNum = '';
          this.isAssistanceNum = '';
          this.getAlarmNO();
          this.getTables();
        }
      },
      /*
      *        window.location.href = api.forent_url.base_url +
      *        "/accidentInfo/download?" + "proprietorId=" + api.getGlobalVal('userObj').orgCode +
          "&build=&accidentTimeStart=" + this.dateTime[0] + '00:00:00'+ '&accidentTimeEnd=' + this.dateTime[1] + '23:59:59'
      *
      *
      *
      *
      * */
      exportReport() {
        // "/warning/download?proprietorId=&warningTimeStart=&warningTimeEnd=&build="
        if(this.dateTime !=null && this.dateTime.length>0){
          window.location.href = api.forent_url.base_url + "/warning/download?" + "proprietorId=" + api.getGlobalVal('userObj').orgCode +
              "&warningTimeStart=" + this.dateTime[0]   + '00:00:00'+ '&warningTimeEnd=' + this.dateTime[1] + '23:59:59' +'&build='
        }else {
          window.location.href = api.forent_url.base_url + "/warning/download?" + "proprietorId=" + api.getGlobalVal('userObj').orgCode + '&warningTimeStart=&warningTimeEnd=&build='
      }

      },
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.getTables();
      }
    },
  }

</script>

<style lang="scss" scoped>
   @import "~/assets/css/table.scss";

.filterAll .el-radio-button{
  width:auto!important;
}
.box-mid{
   height: calc((100vh - 138px - 78px - 20px - 20px - 6px) / 2);
   box-sizing:border-box;
}
.chartPar{
  height:100%;
  width:100%;
  border: 1px solid #e2e4e8;
  .police_title{
    line-height:32px;
    border-bottom: 1px solid #dddedf;
    margin:0 20px;
    img{
      width: 15px;vertical-align:middle;
      margin-right:3px;
    }
  }
}
.chartPar>div{
  width:100%;
  height:calc(100% - 32px);
}

.tables{
  height:calc(100% - 131px);
}
@media screen and (max-width: 1680px) {
  .box-mid {
      height: calc((100vh - 138px - 78px - 10px - 20px) / 2);
  }
  .tables{
    height:calc(100% - 125px);
  }
}
@media screen and (max-width: 1440px) {
  .box-mid {
      height: calc((100vh - 138px - 55px - 20px ) / 2);
  }
  .tables{
    height:calc(100% - 114px);
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
  .text-5 {
    display:inline-block;
    label {
      width: 95px;
      text-align: right;
      display: inline-block;
      padding-right: 10px;
      box-sizing: border-box;
    }
  }
  .gg-active{
    display: inline-block;
    color: #4677e8;
    height: 38px;
    border-bottom: 2px solid #4677e8;
  }
  .question{
    margin-left: 13px;
  }
  .color_blue {
    color: #4677e8;
    font-size: 16px;
  }
  .red {
    color: #d64541;
  }
  .yellow {
    color: #fea805;
  }
  .green {
    color: #04aa37;
  }
  .red_ml {
    color: #d64541;
    margin-left: 30px;
  }
  .spot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #277eeb;
    margin: 0 9px 3px 0;
  }
  .m_left {
    margin-left: 14px;
    color: #777;
  }
  .img {
    cursor: pointer;
    width: 100px;
    height: 100px;
    margin-left: 14px;
  }
  .ml_30 {
    margin-left: 30px;
    color: #000;
  }
  .color_gray {
    color: #777;
  }
  .black {
    color: #000;
  }
  .w_420 {
    width: 450px;
    color: #000;
  }
  .color_gray_w {
    color: #777;
    width: 94px;
  }
</style>
<style>
.el-tooltip__popper.is-dark{
max-width: 300px;
}
</style>
