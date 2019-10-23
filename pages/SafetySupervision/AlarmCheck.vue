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
              <el-col :span="5" class="text-4">
                <label>复核结果：</label>
                <el-select  v-model.trim="formInline.alarmState" clearable placeholder="全部" @change="selectReviewResult">
                  <el-option
                    v-for="item in options1"
                    :key="item.alarmState"
                    :label="item.ReviewResult"
                    :value="item.alarmState">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="14">
                <el-row type="flex" justify="center">
                  <el-col :span="6" class="text-4">
                    <label>是否规范：</label>
                    <el-select  v-model.trim="formInline.isRegular" clearable placeholder="全部" @change="selectStandard">
                      <el-option
                        v-for="item in options2"
                        :key="item.isRegular"
                        :label="item.Standard"
                        :value="item.isRegular">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6" class="text-3">
                    <label>楼栋：</label>
                    <el-select  v-model.trim="formInline.build" clearable placeholder="全部" @change="selectStoriedBuilding">
                      <el-option id='floorName' :label="floor.buildName" :value="floor.buildId" v-for="floor in floors" :key="floor.buildId"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12" class="text-4">
                    <label>报警时间：</label>
                    <el-date-picker
                      clearable
                      value-format="yyyy-MM-dd"
                       v-model.trim="dateTime"
                      @change="selectDateTime"
                      range-separator=""
                      type="daterange"
                      :picker-options="pickerOptions"
                      start-placeholder="请选择日期">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="5">
                <el-input v-model.trim="searchValue" placeholder="请输入报警编号/设备编号/复核人" clearable @change="InputPlan">
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
              prop="alarmNo"
              label="报警编号">
            </el-table-column>
            <el-table-column
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="deviceType"
              label="设施类型">
            </el-table-column>
            <el-table-column
              min-width="20%"
              :show-overflow-tooltip="true"
              prop="deviceAddress"
              label="报警点位">
            </el-table-column>
            <el-table-column
              min-width="15%"
              :show-overflow-tooltip="true"
              prop="receiveTime"
              label="报警接收时间">
            </el-table-column>
            <el-table-column
              min-width="15%"
              :show-overflow-tooltip="true"
              prop="build"
              label="楼栋">
            </el-table-column>
            <el-table-column
              min-width="7%"
              :show-overflow-tooltip="true"
              prop="feedbackPerson"
              label="复核人">
            </el-table-column>
            <el-table-column
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="alarmState"
              label="复核结果">
              <template slot-scope="scope">
                <div class="gs-el-button-group--gapSmall">
                  <div>{{scope.row.alarmState == "1" ? "真警" : scope.row.alarmState == "0" ?"误报" : "待复核"}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="isRegular"
              label="是否规范">
              <template slot-scope="scope">
                <div class="gs-el-button-group--gapSmall">
                  <div>{{scope.row.isRegular == "0" ? "规范" : scope.row.isRegular == "1" ?"不规范" : "--"}}</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          </el-scrollbar>
          <!--分页器-->
          <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
        </div>
        <!-- 详情页 -->
        <el-dialog title="报警复核详情" :visible.sync="newlyAddedVisible" :close-on-click-modal="false" width="86%" style="margin: 0 auto; text-align: left; color: #000;">
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
          typeName:'',
          reportTypeId: '',
          bgtype: '',
          taskNo: '',
          // 复核结果
          alarmState: '',
          // 是否规范
          isRegular: '',
          // 楼栋
          build: '',
          // 搜索类型
          searchType: '',
          unitId: ''
        },
        data: {},
        base_url: '',
        urlList:[],
        url: '',
        // 搜索值
        searchValue: '',
        // 楼栋筛选
        floors: '',
        newlyAddedVisible: false,
        pictureDetails: false,
        // 下拉选项
        options1:[
          {
            ReviewResult: '全部',
            alarmState: ''
          },{
            ReviewResult: '待复核',
            alarmState: '2'
          },{
            ReviewResult: '真警',
            alarmState: '1'
          },{
            ReviewResult: '误报',
            alarmState: '0'
          }
        ],
        options2:[
          {
            Standard: '全部',
            isRegular: ''
          },{
            Standard: '规范',
            isRegular: '0'
          },{
            Standard: '不规范',
            isRegular: '1'
          }
        ],
        dateTime: '',
        // 日期选择器
        pickerOptions:{
          onClick(picker) {
            let end = new Date();
            let start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        },
      };
    },
    methods:{
      // 显示报警复核详情
      async openDetails(row) {
        let that = this
        this.newlyAddedVisible = true;
        await api.get(api.forent_url.moblie_url + "/alarmInfo/" + row.id)
        .then(res=>{
          // console.log(res)
          that.data = res.alarmInfo;
          // console.log(that.data)
          if (res.attaches.length === 0) {
            that.urlList = []
          } else {
            that.urlList = []
            res.attaches.forEach(element => {
              that.base_url = api.forent_url.pic_url + '/' + element.attachPath
              // console.log('that.base_url', that.base_url)
              that.urlList.push(that.base_url)
            });
          }
          // console.log('res.attaches', res.attaches)
          // console.log('that.urlList', that.urlList)
        })
      },
      enlarge(b) {
        // console.log(b)
        this.url = b;
        this.pictureDetails = true;
      },
      // 获取楼栋
      async getFloor() {
        await api.post(api.forent_url.floor_url + "/monitorCenter/monitor/getTAndAByUnitId", {
          unitId: api.getGlobalVal('userObj').orgCode
        }).then(res => {
          if (res.code === "success") {
            this.floors = res.data;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取统计查询
      async loadData () {
        this.isLoading = true;
        await api.post(api.forent_url.base_url + '/alarmInfo/examineQuery',{
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          proprietorId:api.getGlobalVal('userObj').orgCode,
          alarmTimeStart: this.dateTime ? this.dateTime[0] + ' 00:00:00' : '',
          alarmTimeEnd: this.dateTime ? this.dateTime[1] + ' 23:59:59' : '',
          build: this.formInline.build,
          alarmNo: this.searchValue,
          alarmState: this.formInline.alarmState,
          isRegular: this.formInline.isRegular,
          datepicker: this.dateTime ? new Date(this.dateTime[0] + ' 00:00:00') + ',' + new Date(this.dateTime[1] + ' 00:00:00') : ''
        }, 5000).then(res=>{
          if(res.code === "2001" ){
            // console.log(res)
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
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.loadData();
      },
      selectReviewResult(val){
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      selectStandard(val){
        this.formInline.isRegular = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      // 楼栋
      selectStoriedBuilding(val) {
        this.formInline.build = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      InputPlan(val){
        this.searchValue = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      // 搜索
      handleSearch () {
        this.widgetInfo.pageNo = 1;
        this.loadData()
      },
      // 报警时间
      selectDateTime(val){
        // console.log(val)
        this.dateTime = val;
        this.widgetInfo.pageNo = 1;
        this. loadData();
      },
    },
    mounted(){
      this.getFloor();
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
  .el-tooltip__popper.is-dark{
    max-width: 300px;
  }
  #tab .el-table__row {
    cursor: pointer;
  }
</style>