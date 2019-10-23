<template>
    <div>
      <div class="l-head">
        <!-- 面包屑 -->
        <Title/>
      </div>
      <div class="AlarmCheck_main">
        <!-- 搜索框 -->
        <div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline filterAll">
            <el-row>
              <el-col :span="7" class="text-4">
                <label>处置结果：</label>
                <el-select  v-model.trim="formInline.warningState" multiple placeholder="处置结果" @change="selectReviewResult">
                  <el-option
                    v-for="item in feedbackresult"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-row type="flex" justify="center">
                  <el-col :span="14" class="text-6">
                    <label>预警解除时间：</label>
                    <el-date-picker
                         v-model.trim="dateTime"
                        @change="selectDateTime"
                        value-format="yyyy-MM-dd"
                        range-separator=""
                        type="daterange"
                        :picker-options="pickerOptions"
                        start-placeholder="请选择日期">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="5">
                <el-input v-model.trim="searchValue" placeholder="请输入预警编号" clearable @change="InputPlan">
                  <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </el-form>
        </div>
        
        <div class="notab" id="tab">
          <!-- 表格 -->
          <el-scrollbar>
          <el-table
            @row-click="openDetails"
            v-loading="isLoading"
            :data="tableData"
            stripe>
            <el-table-column
              min-width="10%"
              :show-overflow-tooltip="true"
              pageSize ="pageSize"
              prop="warningNo"
              label="预警编号">
            </el-table-column>
            <el-table-column
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="deviceType"
              label="设备类型">
            </el-table-column>
            <el-table-column
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="deviceAddress"
              label="设备位置">
            </el-table-column>
            <el-table-column
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="alarmNum"
              label="预警次数">
            </el-table-column>
            <el-table-column
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="warningTime"
              label="首次预警时间">
            </el-table-column>
            <el-table-column
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="solveTime"
              label="预警解除时间">
            </el-table-column>
            <el-table-column
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="warningState"
              label="处置结果">
              <template slot-scope="scope">
                <div class="gs-el-button-group--gapSmall">
        		      <div v-if="scope.row.processState == '0'" class="yellow">待查看</div>
                  <div v-else-if="scope.row.processState == '1'" class="yellow">待解除</div>
                  <div v-else-if="scope.row.processState == '2'" class="green">已解除</div>
                  <div v-else-if="scope.row.processState == '3'" class="red">真警</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          </el-scrollbar>
          <!--分页器-->
          <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
        </div>
        <!-- 详情页 -->
        <el-dialog title="电气火灾预警详情" :visible.sync="newlyAddedVisible" :close-on-click-modal="false" width="86%" style="margin: 0 auto; text-align: left;">
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
                    <td class="w_420">
                      <span v-if="dataList != null && dataList != {}">{{dataList.deviceTypeName}}</span>
                    </td>
                    <th class="color_gray_w">设备ID :</th>
                    <td class="w_420">
                      <span v-if="dataList != null && dataList != {}">{{dataList.deviceId}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="color_gray_w">设备品牌 :</th>
                    <td class="w_420">
                      <span v-if="dataList != null && dataList != {}">{{dataList.brand}}</span>
                    </td>
                    <th class="color_gray_w">规格型号 :</th>
                    <td class="w_420">
                      <span v-if="dataList != null && dataList != {}">{{dataList.model}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="color_gray_w">设备位置 :</th>
                    <td class="w_420">
                      <span v-if="dataList != null && dataList != {}">{{dataList.buildName}}{{dataList.floorName}}{{dataList.deviceAddress}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="color_gray_w">安装日期 :</th>
                    <td class="w_420">
                      <span v-if="dataList != null && dataList != {}">{{dataList.installDate}}</span>
                      <span v-else>暂无</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="gg-base-unit">
              <h3 class="gg-base-h3 black">
                <span :class="{'gg-active':!qustionList}" @click="qustionList = false">预警记录({{data.alarmNum}}次)</span>
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
                <div v-else style="margin: 20px 30px;color: #000;">暂无记录</div>
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
                <div v-else style="margin: 20px 30px;color: #000;">暂无记录</div>
                </el-scrollbar>
              </div>
              <!-- 处置记录end -->
            </div>

          </div>
        </el-dialog>
        <!-- 显示图片 -->
        <el-dialog title="图片详情" :visible.sync="pictureDetails" :close-on-click-modal="false" style="width: 77%; margin: 0 auto;">
          <el-scrollbar>
            <div style="max-height: 500px;max-width: 500px;">
              <img :src=url style="cursor:pointer;width:100%;height:100%;" alt="">
            </div>
          </el-scrollbar>
        </el-dialog>
      </div>
    </div>
</template>
<script>
  import api from '~/config/http';
  import Title from '~/components/Title';
  import axios from 'axios';
  import Pagination from "~/components/Pagination";
  export default {
    components:{
      Title,
      Pagination
    },
    data() {
      return {
        widgetInfo: {
          total: null,
          pageSize: 6,
          pageNo: 1
        },
        tableData: [],
        isLoading: false,
        formInline: {
          warningState: [],
        },
        qustionList: false,
        data: {},
        dataList: {},
        earlyWarningRecord: [],
        disposalRecord: [],
        base_url: '',
        urlList:[],
        url: '',
        // 搜索值
        searchValue: '',
        newlyAddedVisible: false,
        pictureDetails: false,
        // 下拉选项
        feedbackresult: [
            {
                value:'2',
                label:'已解除'
            },{
                value:'1',
                label:'待解除'
            },{
                value:'0',
                label:'待查看'
            },
            // {
            //     value:'3',
            //     label:'真警'
            // }
        ],
        // 日期选择器
        dateTime:'',
        pickerOptions:{
          onClick(picker) {
            let end = new Date();
            let start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        },
        open1: true,
      };
    },
    methods:{
      switchRow (item) {
        item.open1 = !item.open1
        // console.log(item.open1,"11111111111");
        // console.log(item,'item............')
        // 强制触发渲染
        this.$forceUpdate();
        return item.open1
      },
      // 显示报警复核详情
      async openDetails(row) {
        let that = this
        this.qustionList = false;
        this.newlyAddedVisible = true;
        await api.post(api.forent_url.moblie_url + "/warning/getAlarm", {
          warningInfoId: row.id
        })
        .then(async res=>{
          if (res.code === "success") {
            this.newlyAddedVisible = true;
            await api.post(api.forent_url.moblie_url + "/warning/getDeviceInfo/", {
              unitId:api.getGlobalVal('userObj').orgCode,
              deviceId:row.deviceId
            }).then (ret=> {
              // console.log(ret)
              if (ret.code === "success") {
                // console.log('ret.code === "success"')
                that.dataList = ret.data;
              }
            })
          }
          that.data = res.data.warningInfo;
          that.earlyWarningRecord = res.data.warningInfoDetails;
          that.disposalRecord = res.data.warningFeedbackDetail;
          if (that.earlyWarningRecord != null && that.earlyWarningRecord.length > 0) {
            that.earlyWarningRecord.forEach(element => {
              element.open1 = that.open1;
              // console.log('=============', element)
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
      enlarge(b) {
        // console.log(b)
        this.url = b;
        this.pictureDetails = true;
      },
      // 获取统计查询
      async loadData () {
        this.isLoading = true;
        await api.post(api.forent_url.base_url + '/warning/list',{
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          proprietorId: '',
          solveTimeStart: this.dateTime == '' || this.dateTime == null ? '' : this.dateTime[0] + ' 00:00:00',
          solveTimeEnd: this.dateTime == '' || this.dateTime == null ? '' : this.dateTime[1] + ' 23:59:59',
          processState: this.formInline.warningState.join(','),
          datepicker: this.dateTime ? new Date(this.dateTime[0] + ' 00:00:00') + ',' + new Date(this.dateTime[1] + ' 00:00:00') : '',
          warningNo: this.searchValue
        }, 5000).then(res=>{
          // console.log(res)
          if(res.code === "success"){
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
            // console.log('widgetInfo.total',res.data.total);
            // console.log('tableData',this.tableData)
          }
        }).catch(err => {
          // console.log(err);
          this.isLoading = false;
          this.$message(
            { type:'warning',
            message:"加载超时,请重新加载!"});
        });
      },
      // 分页
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.loadData();
      },
      // 处置结果
      selectReviewResult(val){
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      // 预警解除时间
      selectDateTime(val){
        this.dateTime = val;
        this.widgetInfo.pageNo = 1;
        this. loadData();
      },
      // 搜索
      InputPlan(val){
        this.searchValue = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      handleSearch () {
        this.widgetInfo.pageNo = 1;
        this.loadData()
      },
    },
    mounted(){

    },
    watch:{
      pageSize(old,newVal){
        console.log(old,newVal)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .AlarmCheck_main {
    background: #fff;
    .row-bg {
      padding: 10px 0;
      padding-top: 15px;
    }
  }
  @import "~/assets/css/table.scss";
  .notab {
    border-top: none;
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
  #tab .el-table__row {
    cursor: pointer;
  }
</style>