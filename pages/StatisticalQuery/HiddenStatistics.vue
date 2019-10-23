<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <Title />
          <el-col :span="24" class="staticNotab">
            <el-form :inline="true" class="demo-form-inline filterAll">
              <el-row>
                <el-col :span="10">
                  <el-radio-group v-model="barStatus" size="mini"  @change="clickBar">
                    <el-radio-button :label="0" ><i class="fa fa-line-chart"></i></el-radio-button>
                    <el-radio-button :label="1" ><i class="fa fa-list-ul"></i></el-radio-button>
                  </el-radio-group>
                  <span style="margin-left: 10px;font-size: 14px;">上报隐患数{{allNum ? allNum :'0' }}个，整改完成隐患数{{completeNum ? completeNum : '0'}}个，逾期未处理{{unCompleteNum ? unCompleteNum : '0'}}个</span>
                </el-col>
                <el-col :span="12" >
                  <el-row type="flex" justify="end">
                    <el-col class="text-4" :span="13"  style="text-align:left; width: 320px">
                      <label>上报时间:</label>
                      <el-date-picker v-model="dateTime" @change="selectDateTime" size="small"
                        type="daterange" range-separator="" endPlaceholder="" startPlaceholder="请选择日期" value-format="yyyy-MM-dd ">
                      </el-date-picker>
                    </el-col>
                    <el-col class="text-2" :span="9" style=" width: 240px">
                      <label>楼栋:</label>
                      <el-select v-model="formInline.buildId"  placeholder="全部" clearable @change="selectFloor">
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
                    <p class="police_title"> <img src="./images/echat-graph.png" alt="隐患变化趋势图"  > 隐患变化趋势图</p>
                    <div id="police_trend"></div>
                  </div>
                </el-col>
                <el-col :span="12" class="box-mid">
                  <div  class="chartPar" >
                    <p class="police_title"> <img src="./images/echat-graph.png" alt="隐患上报趋势图">隐患上报趋势图</p>
                    <div id="interval_trend2"></div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-if="isShow"  style="margin:0 10px 20px;">
                <el-col :span="8" class="box-mid">
                  <div  class="chartPar">
                    <p class="police_title"> <img src="./images/echart-cirele.png" alt="来源分布"> 来源分布</p>
                    <div id="root_trend"></div>
                  </div>
                </el-col>
                <el-col :span="8" class="box-mid">
                  <div  class="chartPar">
                    <p class="police_title"> <img src="./images/echart-cirele.png" alt="类型分布"> 类型分布</p>
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
                <el-table style="width: 100%;padding:0"
                @row-click="hiddenDangerRectification"
                v-loading="isLoading"
                :data="tableData" stripe >
                <el-table-column min-width="9%" show-overflow-tooltip prop="accidentNo" label="隐患编号" align="center">
                </el-table-column>
                <el-table-column min-width="9%" show-overflow-tooltip prop="deviceType" label="设备类型" align="center">
                </el-table-column>
                <el-table-column min-width="9%" show-overflow-tooltip align="center" prop="deviceAddress" label="隐患位置">
                </el-table-column>
                <el-table-column min-width="9%" show-overflow-tooltip align="center" prop="deviceDescription"  label="隐患描述"></el-table-column>

                <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="troubleTime" label="上报时间">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.troubleTime"></span>
                        <spanv v-else>{{scope.row.troubleTime.substring(0,16)}}</spanv>
                    </template>
                </el-table-column>
                <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="reportChannel" label="上报途径">
                <template slot-scope="scope">
                <span v-if="scope.row.reportChannel ===  '0' ">物联网监测</span>
                <span v-if="scope.row.reportChannel ===  '3' ">巡检巡查</span>
                <span v-if="scope.row.reportChannel ===  '2' ">报警复核</span>
                <span v-if="scope.row.reportChannel ===  '1' ">人工上报</span>
                </template>
                </el-table-column>
                <el-table-column min-width="8%" show-overflow-tooltip align="center" prop="reportUserName" label="上报人">
                </el-table-column>
                <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="rectificationSuggestion" label="整改意见">

                </el-table-column>
                <el-table-column min-width="12%" show-overflow-tooltip align="center" prop="rectificationDate"  label="整改截止日期">
                   <template slot-scope="scope">
                   <span v-if="!scope.row.rectificationDate"></span>
                   <spanv v-else>{{scope.row.rectificationDate.substring(0,10)}}</spanv>
                  </template>
                </el-table-column>
                <el-table-column min-width="10%" show-overflow-tooltip align="center" prop="processState" label="整改状态">
                <template slot-scope="scope"><!--row.processState=='0' && row.managementDemand!='1'-->
                <span v-if="scope.row.processState =='1' && scope.row.managementDemand!='1' ">整改中</span>
                <span v-if="scope.row.processState !='2' && scope.row.managementDemand=='1' ">维保中</span>
                <span v-if="scope.row.processState =='0' && scope.row.managementDemand!='1' ">待处理</span>
                <span v-if="scope.row.processState == '2' ">已完成</span>
               <!-- <span v-if="scope.row.processState === '0' ">待处理</span>
                <span v-if="scope.row.processState === '1' ">整改中</span>
                <span v-if="scope.row.processState === '2' ">已完成</span>
                <span v-if="scope.row.processState === '3' ">整改中</span>
                <span v-if="scope.row.processState === '' ">维保中</span>-->
                </template>
                </el-table-column>
                <el-table-column min-width="11%" show-overflow-tooltip align="center" prop="overdue" label="逾期时间(天)">
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
    <el-dialog title="隐患信息详情" :visible.sync="DetailsPage" width="86%" style="margin: 0 auto; text-align: left;">
      <el-scrollbar>
        <div class="gg-base-info" style="height: 500px;">
          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">隐患基本信息</h3>
            <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
              <tbody>
              <tr>
                <th class="color_gray">隐患编号 :</th>
                <td class="w_420">{{data.accidentNo}}</td>
                <th class="color_gray">设施类型 :</th>
                <td class="w_420">{{data.deviceType}}</td>
              </tr>
              <tr>
                <th class="color_gray">隐患状态 :</th>
                <td class="w_420">
                  <span v-if="data.processState == '0'">待处理</span>
                  <span v-else-if="data.processState == '1'">整改中</span>
                  <span v-else-if="data.processState == '2'">维保中</span>
                  <span v-else-if="data.processState == '3'">已完成</span>
                </td>
                <th class="color_gray">设施编号 :</th>
                <td class="w_420">{{data.deviceId}}</td>
              </tr>
              <tr>
                <th class="color_gray">上报时间 :</th>
                <td class="w_420">{{data.receiveTime}}</td>
                <th class="color_gray">回路点位 :</th>
                <td class="w_420">{{data.laLoop}}-{{data.laPoint}}</td>
              </tr>
              <tr>
                <th class="color_gray">隐患来源 :</th>
                <td class="w_420">
                  <span v-if="data.reportChannel == ''"> </span>
                  <span v-else-if="data.reportChannel == '0'">物联网监测</span>
                  <span v-else-if="data.reportChannel == '1'">人工上报</span>
                  <span v-else-if="data.reportChannel == '2'">报警复核</span>
                  <span v-else-if="data.reportChannel == '3'">巡检巡查</span>
                </td>
                <th class="color_gray">上报人 :</th>
                <td class="w_420">{{data.reportUser}}</td>
              </tr>
              <tr>
                <th class="color_gray">隐患位置 :</th>
                <td class="w_420">{{data.deviceAddress}}</td>
              </tr>
              <tr>
                <th class="color_gray">隐患内容 :</th>
                <td class="w_420">{{data.deviceDescription}}</td>
              </tr>
              <tr>
                <th class="color_gray">整改时限 :</th>
                <td class="w_420">
                  <span v-if="data.rectificationDate == null">无</span>
                  <span v-else>{{data.rectificationDate}}</span>
                </td>
              </tr>
              <tr>
                <th class="color_gray">整改意见 :</th>
                <td class="w_420">
                  <span v-if="data.rectificationSuggestion == null">无</span>
                  <span v-else>{{data.rectificationSuggestion}}</span>
                </td>
              </tr>
              <tr>
                <th class="color_gray">现场图片 :</th>
                <td v-if="urlList.length === 0">
                </td>
                <td v-else-if="urlList.length !== 0">
                  <img :src=item v-for="(item, index) in urlList" :key="index" alt="" class="img" @click="enlarge(item)">
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">整改记录</h3>
            <!-- GZ201812114389 -->
            <div v-if="RectificationRecord != null && RectificationRecord.length > 0">
              <table class="gg-table gg-tableFix" style="width: 97%;">
                <tbody>
                <el-row>
                  <el-col :span="1">
                    <!-- 步骤条 -->
                    <div style="height: 200px;" v-for="(item, index) in RectificationRecord" :key="index">
                      <div class="border" v-if="index === 0"><span class="num">{{index + 1}}</span></div>
                      <div class="border" v-else><span class="num">{{index + 1}}</span><div class="Connecting"></div></div>
                    </div>
                  </el-col>
                  <el-col :span="23">
                    <div v-for="(item, index) in RectificationRecord" :key="index" style="height: 200px;">
                      <div>
                        <tr>
                          <!-- <th>整改时间：</th> -->
                          <td class="black">{{item.alarmAccidentIssue.createTime}}</td>
                          <td style="width: 20px;" class="black"></td>
                          <!-- <th>整改人：</th> -->
                          <td class="black">{{item.alarmAccidentIssue.createUserId}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <th class="black">整改描述：</th>
                          <td class="black">{{item.alarmAccidentIssue.issueDesc}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <!-- <th>附件：</th> -->
                          <td v-if="item.RectificationUrl.length == 0">
                          </td>
                          <td v-else-if="item.RectificationUrl != null && item.RectificationUrl.length > 0">
                            <img :src=item v-for="(item, index) in item.RectificationUrl" :key="index" alt="" class="img" @click="enlarge(item)">
                          </td>
                        </tr>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                </tbody>
              </table>
            </div>
            <div v-else class="none">暂无整改记录</div>
          </div>

          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">维保记录</h3>
            <!-- GZ201812060213 -->
            <div v-if="MaintenanceRecord != null && MaintenanceRecord.length > 0">
              <table class="gg-table gg-tableFix" style="width: 97%;">
                <tbody>
                <el-row>
                  <el-col :span="1">
                    <!-- 步骤条 -->
                    <div style="height: 227px;" v-for="(item, index) in MaintenanceRecord" :key="index">
                      <div class="border" v-if="index === 0"><span class="num">{{index + 1}}</span></div>
                      <div class="border" v-else><span class="num">{{index + 1}}</span><div class="Connecting" style="height: 203px; top: -205px;"></div></div>
                    </div>
                  </el-col>
                  <el-col :span="23">
                    <div v-for="(item, index) in MaintenanceRecord" :key="index" style="height: 227px;">
                      <div>
                        <tr>
                          <!-- <th>整改时间：</th> -->
                          <td class="black">{{item.maintenanceTime}}</td>
                          <td style="width: 20px;"></td>
                          <!-- <th>整改人：</th> -->
                          <td class="black">{{item.maintenanceUserName}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <th class="black">问题定位：</th>
                          <td class="black">{{item.problemFix}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <th class="black">处置描述：</th>
                          <td class="black">{{item.maintenanceDesc}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <th class="black">应急措施：</th>
                          <td class="black">{{item.emergencyHandle}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <!-- <th>附件：</th> -->
                          <td v-if="item.MaintenanceUrl.length == 0">
                          </td>
                          <td v-else-if="item.MaintenanceUrl != null && item.MaintenanceUrl.length > 0">
                            <img :src=item v-for="(item, index) in item.MaintenanceUrl" :key="index" alt="" class="img" @click="enlarge(item)">
                          </td>
                        </tr>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                </tbody>
              </table>
            </div>
            <div v-else class="none">暂无维保记录</div>
          </div>
        </div>
      </el-scrollbar>
    </el-dialog>
    <!-- 显示图片 -->
    <el-dialog title="图片详情" :visible.sync="pictureDetails" style="width: 77%; margin: 0 auto;">
      <el-scrollbar>
        <div style="max-height: 450px;max-width: 500px;">
           <img :src=url style="cursor:pointer;width:100%;height:100%;" alt="详情">
        </div>
      </el-scrollbar>

    </el-dialog>
    <!-- 查看对话框 -->
    <el-dialog title="整改意见" :visible.sync="ViewDialogBox" style="width: 77%; margin: 0 auto;">
      <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0" style="height: 273px;">
        <tbody>
        <tr>
          <th style="width: 100px;">整改意见 :</th>
          <td style="text-align:left;">{{RectificationOpinion}}</td>
        </tr>
        <tr>
          <th>截至日期 :</th>
          <td style="text-align:left;">{{UpDate}}</td>
        </tr>
        </tbody>
      </table>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog title="整改意见" :visible.sync="Rectification" style="width: 77%; margin: 0 auto;" @close="handleURLDialogClose('form')">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="整改意见" :label-width="formLabelWidth" prop="RectificationList">
          <el-input clearable  type="textarea" placeholder="整改意见" v-model="form.RectificationList" style="width: 340px;"></el-input>
        </el-form-item>
        <el-form-item label="截至日期" :label-width="formLabelWidth" prop="UpToDate">
          <el-date-picker
              :picker-options="pickerOptions1"
              v-model="form.UpToDate"
              type="date"
              placeholder="请选择日期" style="width: 88%;">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" style="margin-top: 50px;margin-bottom: 20px; width: 90px;" @click="Preservation('form')">保 存</el-button>
      </div>
    </el-dialog>
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
        allNum: null,
        completeNum: null,
        unCompleteNum: null,
        formInline: {
          buildId: "",
          pageNo: 1,
          pageSize: 6,
          proprietorId: "",
        },
        ruleForm: {
          date1: ''
        },
        floors: [],
        totalNum: null, //报警数
        policeNum: null, //真警数
        //隐患变化hiddenChange
        hiddenChangeOption: {
          tooltip: {
            trigger: 'axis',
            backgroundColor:'rgba(24,149,236,1)',
            formatter: '{b}<br />隐患数: {c}',//去掉小圆点
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
            bottom: 35,
            left: 55,
            width:"83%",
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
           /* axisTick: {
              alignWithLabel: true
            },*/
            //清除坐标轴刻度线
            axisTick: {
                  show: false
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
            name: '隐患数',
            type: 'line',
            stack: '总量',
            smooth: true,
           /* radius: '50%',*/
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
                borderColor: '#0061b1'//
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
            backgroundColor:'rgba(24,149,236,1)',
            formatter: '{b}<br />隐患数: {c}',//去掉小圆点
            axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
            /*axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }*/
          },
          color: ['#4472C5'],
          grid: {
            top: 20,
            bottom: 35,
            left: 35,
            width:"87%",
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            /*axisTick: {
              alignWithLabel: true
            },*/
              //清除坐标轴刻度线
              axisTick: {
                  show: false
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
            name: '隐患数',
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
        headData: [
            {
            prop: "alarmNo",
            label: "报警编号",
            'min-width': "12%",
          },
          {
            prop: "deviceType",
            label: "设施类型",
            'min-width ': "10%",
            'show-overflow-tooltip': true,

          },
          {
            prop: "laLoopPoint",
            label: "回路点位",
            'min-width ': "10%",
            'show-overflow-tooltip': true,
          },
          {
            prop: "receiveTime",
            label: "报警接收时间",
            'min-width ': "12%",
            'show-overflow-tooltip': true,
          },
          {
            prop: "deviceAddress",
            label: "报警点位",
            'min-width ': "18%",
            'show-overflow-tooltip': true,
          },
          {
            prop: "alarmState",
            label: "复核结果",
            'min-width ': "8%",
          },
          {
            prop: "feedbackPerson",
            label: "复核人",
            'min-width ': "8%",
          },
          {
            prop: "feedbackTime",
            label: "复核时间",
            'show-overflow-tooltip': true,
            'min-width ': "10%",
          },
          {
            prop: "resetTime",
            label: "复位时间",
            'show-overflow-tooltip': true,
            'min-width ': "10%",
          },
          {
            prop: "isRegular",
            label: "是否规范",
            'min-width ': "8%",
          },
          {
            prop: "regularDesc",
            label: "不规范原因",
            'show-overflow-tooltip': true,
            'min-width ': "10%",
          },
        ],
        tableData: [],
         widgetInfo: {
          pageSize: 6,
          pageNo: 1,
          list: [],
           total: null,
        },
        police_trend : '',
        interval_trend: '',
        root_trend : '',
        dispose_trend : '',
        area_trend : '',
        DetailsPage: false,
        pictureDetails: false,
        ViewDialogBox: false,
        Rectification: false,
        // 对话框日期选择
        pickerOptions1: {
          onClick(picker) {
            let end = new Date();
            let start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        },
        form: {
          RectificationList: '',
          UpToDate: '',
          id: ''
        },
        formLabelWidth: '120px',
        rules: {
          RectificationList: [
            { required: true, message: '*此处不可为空', trigger: 'blur' }
          ],
          UpToDate: [
            { required: true, message: '*此处不可为空', trigger: 'blur' }
          ]
        },
        RectificationOpinion: '',
        UpDate: '',
        urlList:[],
        url: '',
        data:{},
        RectificationRecord: [],
        RectificationUrl: [],
        MaintenanceRecord: [],
        MaintenanceUrl: [],
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
          unitId: api.getGlobalVal('userObj').orgCode
        }).then(res => {
          if (res.code === "success") {
            this.isLoading = false;
            this.floors = res.data;
            //this.floors.push(res.data);
            console.log(res.data)
          }
        }).catch(err => {
          this.isLoading = false;
          console.log(err)
        })
      },
      getAlarmNO() {
        this.isLoading = true;
        api.post(api.forent_url.base_url + "/home/queryAccidentInfo", {
          startDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[0] + ''+ '00:00:00',
          endDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[1] + ''+ '23:59:59',
          buildId: this.formInline.buildId,
          unitId: api.getGlobalVal('userObj').orgCode
        }).then(res => {
          if (res.code === "success" && res.data) {
            this.isLoading = false;
            this.allNum = res.data.allNum,
            this.completeNum = res.data.completeNum,
            this.unCompleteNum = res.data.unCompleteNum
          }
        }).catch(err => {
          this.isLoading = false;
          console.log(err);
        })
      },
      //隐患变化
      getHiddenChange() {
        api.post(api.forent_url.moblie_url + '/home/queryAccidentChange', {
          startDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[0] + ''+ '00:00:00',
          endDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[1] + ''+ '23:59:59',
          buildId: this.formInline.buildId,
          unitId: api.getGlobalVal('userObj').orgCode
        }).then(res => {
          if (res.code === "success" && res.data) {
            this.policeData = res.data;
            this.hiddenChangeOption.xAxis.data = res.data.data_x;
            this.hiddenChangeOption.series.data = res.data.data_y;
            this.echartsPolice();
            /* console.log(this.hiddenChangeOption.series.data);*/
          }
        }).catch(err => {
          this.isLoading = false;
          console.log(err);
        })
      },
      //隐患上报
      getHiddenReport() {
        api.post(api.forent_url.moblie_url + '/home/queryStatisticsAccident', {
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
      //来源分布
      getRootTrend() {
        api.post(api.forent_url.moblie_url + '/home/queryChannelAccident', {
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
      //处置情况
      getDisposeStatus() {
        api.post(api.forent_url.moblie_url + '/home/queryDeviceTypeAccident', {
          startDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[0] + ''+ '00:00:00',
          endDate: this.dateTime === '' || this.dateTime === null ? '': this.dateTime[1] + ''+ '23:59:59',
          buildId: this.formInline.buildId,
          unitId: api.getGlobalVal('userObj').orgCode
        }).then(res => {
          if (res.code === 'success') {
            this.isLoading =false;
            this.disposeData = res.data;
            let dataY = this.disposeTrendOption.series[0].data = res.data.data_y;
            if (dataY && dataY.length > 0) {
              dataY.forEach(item => {
                if (item.name === "真警") {
                  this.policeNum = item.value;
                }
                  this.totalNum += item.value;
              })
            }
            this.echartsDispose();
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      //区域分布
      getAreaTrend() {
        api.post(api.forent_url.moblie_url + '/home/queryAreaAccident', {
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
      //api.getGlobalVal('userObj').orgCode
      getTables() { //Request URL: http://112.27.198.15:9832/api/v1/fire-society/accidentInfo/query
        this.isLoading = true;
        api.post(api.forent_url.base_url + '/accidentInfo/query', {
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          proprietorId:api.getGlobalVal('userObj').orgCode,
          accidentTimeStart: this.dateTime === '' || this.dateTime === null? "" :this.dateTime[0] + ''+ '00:00:00' ,
          accidentTimeEnd: this.dateTime === '' || this.dateTime === null? "" :this.dateTime[1] + ''+ '23:59:59' ,
          build: this.formInline.buildId,//accidentTimeEndBind
          accidentTimeEndBind:this.dateTime ? new Date(this.dateTime === '' || this.dateTime === null? "":this.dateTime[0] ) + ',' + new Date( this.dateTime === '' || this.dateTime === null? "" :this.dateTime[1]):'' ,
        },5000).then(res => {
          if (res.code === "2001") {
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.list = res.data.rows;
            this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
          }else {
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
              { type:'warning',
                message:"加载超时,请重新加载!"});
        })
      },
      //修改对话框
      handleURLDialogClose(refName) {
        this.$refs[refName].clearValidate();
        this.$refs[refName].resetFields();
      },
      //详情
      async hiddenDangerRectification (row, event, column) {
        // console.log(event.target.nodeName, '@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        if(event.target.nodeName === "DIV"){
          let that = this
          this.DetailsPage = true;
          await api.get(api.forent_url.moblie_url + "/accidentInfo/" + row.id)
              .then(res=>{
                console.log('res==================', res)
                // 图片
                that.data = res.accidentInfo;
                that.RectificationRecord = res.alarmAccidentDetails.reverse();
                that.num = that.RectificationRecord.length;
                that.nums = that.MaintenanceRecord.length;
                that.MaintenanceRecord = res.recordArray;
                that.nums = that.MaintenanceRecord.length;
                console.log('that.data', that.data)
                console.log('that.RectificationRecord', that.RectificationRecord)
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
                console.log('res.attaches', res.attaches)
                console.log('that.urlList', that.urlList)
                if (that.RectificationRecord != null && that.RectificationRecord.length > 0) {
                  that.RectificationRecord.forEach(element => {
                    element.RectificationUrl = []
                    element.attaches.forEach(ele => {
                      that.Rectification_base_url = api.forent_url.pic_url + '/' + ele.attachPath
                      console.log('that.Rectification_base_url', that.Rectification_base_url)
                      element.RectificationUrl.push(that.Rectification_base_url)
                    });
                    console.log('element.RectificationUrl', element.RectificationUrl)
                  });
                }
                if (that.MaintenanceRecord != null && that.MaintenanceRecord.length > 0) {
                  that.MaintenanceRecord.forEach(element => {
                    element.MaintenanceUrl = []
                    element.recordAttach.forEach(ele => {
                      that.Maintenance_base_url = api.forent_url.pic_url + '/' + ele.attachPath
                      console.log('that.Maintenance_base_url', that.Maintenance_base_url)
                      element.MaintenanceUrl.push(that.Maintenance_base_url)
                    });
                    console.log('element.MaintenanceUrl', element.MaintenanceUrl)
                  });
                }
              })
        }
      },
      enlarge(b) {
        console.log(b)
        this.url = b;
        this.pictureDetails = true;
      },
      //报警echarts
      echartsPolice() {
        this.police_trend = this.$echarts.init(document.getElementById('police_trend'));
        this.police_trend.setOption(this.hiddenChangeOption);
      },
      //时段echarts
      echartsInterval() {
        this. interval_trend= this.$echarts.init(document.getElementById('interval_trend2'));
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
      //区域分布
      echartsArea() {
        this.area_trend = this.$echarts.init(document.getElementById('area_trend'));
        this.area_trend.setOption(this.areaTrendOption)
      },
      clickBar(num) {
        if (num === 0) {
          this.isShow  = true;
          //清空报警数
          this.allNum = '';
          this.completeNum = '';
          this.unCompleteNum = '';
          console.log("00000");
          this.$nextTick(()=>{
            this.getAlarmNO();
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
          console.log("11111");
          this.isShow = false;
          //清空报警数
          this.allNum = '';
          this.completeNum = '';
          this.unCompleteNum = '';
          this.getAlarmNO();
          //this.getTables();
        }
      },
      selectDateTime(val) {
        this.dateTime = val;
        this.widgetInfo.pageNo = 1;
        if (this.isShow) {
          this.getAlarmNO();
          this.getHiddenChange();
          this.getHiddenReport();
          this.getRootTrend();
          this.getDisposeStatus();
          this.getAreaTrend();
        } else {
          this.getAlarmNO();
          this.getTables();
        }

      },
      selectFloor(val) {
        this.formInline.buildId = val;
        this.widgetInfo.pageNo = 1;
        if (this.isShow) {
          this.getAlarmNO();
          this.getHiddenChange();
          this.getHiddenReport();
          this.getRootTrend();
          this.getDisposeStatus();
          this.getAreaTrend();
        } else {
          this.getTables();
          this.getAlarmNO();
        }
      },
      exportReport() {
        if(this.dateTime !=null && this.dateTime.length>0){
          window.location.href = api.forent_url.base_url + "/accidentInfo/download?" + "proprietorId=" + api.getGlobalVal('userObj').orgCode +
              "&build=&accidentTimeStart=" + this.dateTime[0] + '00:00:00'+ '&accidentTimeEnd=' + this.dateTime[1] + '23:59:59'
        }else {
          window.location.href = api.forent_url.base_url + "/accidentInfo/download?" + "proprietorId=" + api.getGlobalVal('userObj').orgCode + '&accidentTimeStart=&accidentTimeEnd='
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
 .el-dialog .el-dialog__body {
   height: 300px !important;
 }
 .border {
   width: 20px;
   height: 20px;
   border: 3px solid #d9e3f9;
   background-color: #4777e6;
   border-radius:20px;
   position: relative;
 }
 .num {
   position: absolute;
   left: 5px;
   top: -4px;
   color: #fff;
 }
 .Connecting {
   border-left:2px solid #edf2fd;
   position: absolute;
   height: 176px;
   top: -178px;
   left: 9px;
 }
 .color_gray {
   color: #777;
   width: 92px;
 }
 .black {
   color: #000;
 }
 .w_420 {
   width: 450px;
   color: #000;
 }
 .none {
   margin-left: 10px;
   height: 50px;
   line-height: 50px;
   color: #000;
 }
 .img {
   cursor: pointer;
   width: 100px;
   height: 100px;
 }
</style>
<style>
.el-tooltip__popper.is-dark{
max-width: 300px;
}
</style>