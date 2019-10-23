<template>
    <div>
      <div class="l-head">
        <!-- 面包屑 -->
        <Title/>
      </div>
      <div class="dutyRoom_main">
        <!-- 搜索框 -->
        <div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline filterAll">
            <el-row>
              <el-col :span="4" class="text-4">
                <label>巡查状态：</label>
                <el-select  v-model.trim="formInline.status" clearable placeholder="全部" @change="selectStatus">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.status"
                    :label="item.statusName"
                    :value="item.status">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="16">
                <el-row type="flex" justify="center">
                  <el-col :span="6" class="text-4">
                    <label>完成度：</label>             
                    <el-select  v-model.trim="formInline.CompletionDegree" clearable placeholder="全部" @change="selectTypeName">
                      <el-option
                        v-for="item in completeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6" class="text-4">
                    <label>规范率：</label>
                    <el-select  v-model.trim="formInline.StandardRate" clearable placeholder="全部" @change="selectIsEnable">
                      <el-option
                        v-for="item in standardPercentOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="10" class="text-4" :offset="1">
                    <label>巡查时间：</label>
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
              <el-col :span="4">
                <el-input v-model.trim="searchValue" placeholder="请输入任务编号" clearable @change="InputPlan">
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
            v-loading="isLoading"
            @row-click="openDetails"
            :data="tableData"
            stripe>
            <el-table-column
              align="left"
              min-width="20%"
              :show-overflow-tooltip="true"
              :formatter="taskNoFormatter"
              prop="taskNo"
              label="巡查任务">
            </el-table-column>
            <el-table-column
              align="left"
              min-width="16%"
              :show-overflow-tooltip="true"
              prop="inspectionCycle"
              label="巡查计划">
              <template slot-scope="scope">
                <span v-if="scope.row.inspectionType === 'D' ">{{scope.row.roomPlanName}}</span>
                <span v-else>{{scope.row.planName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="inspectionCycle"
              label="周期/1次">
              <template slot-scope="scope">
                <span v-if="scope.row.inspectionCycle === '0' ">{{scope.row.inspectionCycleValue}}小时</span>
                <span v-else-if="scope.row.inspectionCycle === '1'">{{scope.row.inspectionCycleValue}}日</span>
                <span v-else-if="scope.row.inspectionCycle === '2'">{{scope.row.inspectionCycleValue}}周</span>
                <span v-else-if="scope.row.inspectionCycle === '3'">{{scope.row.inspectionCycleValue}}月</span>
                <span v-else-if="scope.row.inspectionCycle === '4'">{{scope.row.inspectionCycleValue}}季度</span>
                <span v-else-if="scope.row.inspectionCycle === '5'">{{scope.row.inspectionCycleValue}}年</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              min-width="10%"
              :show-overflow-tooltip="true"
              prop="status"
              label="巡查状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status === '0' ">未执行</span>
                <span v-else-if="scope.row.status === '1' ">检查中</span>
                <span v-else>已结束</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              min-width="20%"
              :show-overflow-tooltip="true"
              prop="taskEndTime"
              label="完成时间">
              <template slot-scope="scope">
                <span v-if="scope.row.taskEndTime === '' ">--</span>
                <span v-else>{{scope.row.taskEndTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              min-width="8%"
              :show-overflow-tooltip="true"
              prop="completePercent"
              label="完成度">
              <template slot-scope="scope">
                <div class="gs-el-button-group--gapSmall">
                  <div>{{scope.row.completePercent==null?"":scope.row.completePercent+"%"}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              min-width="8%"
              :show-overflow-tooltip="true"
              prop="standardPercent"
              label="规范率	">
              <template slot-scope="scope">
                <div class="gs-el-button-group--gapSmall">
                  <div>{{scope.row.standardPercent==null?"":scope.row.standardPercent+"%"}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              min-width="10%"
              prop="report"
              label="巡查报告">
              <template slot-scope="scope">
                <el-tooltip content="巡查报告" placement="bottom">
                  <el-button @click="downLoad(scope)" type="text" icon="icon-l-new l-icons ggicon-documents" style="font-size: 16px;"></el-button>
                </el-tooltip> 
              </template>
            </el-table-column>
          </el-table>
          </el-scrollbar>
          <!--分页器-->
          <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
        </div>
      </div>
      <!-- 详情页 start-->
      <FirePreventionInsDetail :row="rowObj" :showDetail="showDetail" v-on:isShow='isShow()'/>
      <!-- 详情页 end-->
    </div>
</template>
<script>
  import api from '~/config/http';
  import Title from '~/components/Title';
  import axios from 'axios';
  import Pagination from "~/components/Pagination";
  import FirePreventionInsDetail from '~/components/SafetySupervision/FirePreventionInsDetail';
  export default {
    components:{
      Title,
      Pagination,
      FirePreventionInsDetail
    },
    data() {
      return {
        data:{},
        pic_url:'api.forent_api.pic_url',
        dataFinishInfo:[],
        problemList: [],
        dataFloorList:[],
        widgetInfo: {
          total: null,
          pageSize: 6,
          pageNo: 1
        },
        qustionList: false,
        tableData: [],
        isLoading: false,
        formInline: {
          bgtype:'',
          taskNo:'',
          status:'',
          // 计划状态
          isEnable:'',
          // 巡查类型
          routingInspectionTypeId:'',
          // 搜索类型
          searchType:'',
          CompletionDegree: '',
          StandardRate: ''
        },
        // 搜索值
        searchValue: '',
        // 下拉选项
        statusOptions:[
          {
            statusName: '全部',
            status: ''
          },{
            statusName: '未执行',
            status: '0'
          },{
            statusName: '检查中',
            status: '1'
          },{
            statusName: '已结束',
            status: '2'
          }
        ],
        completeOptions:[
          {
            value:'',
            label:'全部'
          },{
            value:'2',
            label:'100%'
          },{
            value:'3',
            label:'60%-99%'
          },{
            value:'4',
            label:'60%以下'
          }
        ],
        standardPercentOptions:[
          {
            value:'',
            label:'全部'
          },{
            value:'2',
            label:'100%'
          },{
            value:'3',
            label:'60%-99%'
          },{
            value:'4',
            label:'60%以下'
          }
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
        newlyAddedVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        showDetail:false,
        rowObj:{}
      };
    },
    methods:{
      taskNoFormatter (row,index) {
        row.rowIndex = index + 1;
        // 报警点位
        if(row.laLoop || row.laPoint){
          row.getPoint = row.laLoop + '-' + row.laPoint;
        }

        /*if(row.inspectionType !="D"){
        row.planStartTime = row.planStartTime.split(" ")[0];
        }*/
        //按小时生成任务
        if(row.inspectionCycle=="0"){
          if(row.planStartTime.split(" ")[0]  == row.planEndTime.split(" ")[0]){
            row.taskNo = row.planStartTime.split(" ")[0]+"    "+row.planStartTime.split(" ")[1]+"～"+row.planEndTime.split(" ")[1]
          }else{
            row.taskNo = row.planStartTime+"～"+row.planEndTime;
          }
        }else if(row.inspectionCycle=="1"){//按天生成任务
          if(row.planStartTime.split(" ")[0]  == row.planEndTime.split(" ")[0]){
            row.taskNo = row.planStartTime.split(" ")[0];
          }else{
            row.taskNo = row.planStartTime.split(" ")[0]+"～"+row.planEndTime.split(" ")[0];
          }

        }else if(row.inspectionCycle=="2"){//按周生成任务
          if(row.planStartTime.split(" ")[0]  == row.planEndTime.split(" ")[0]){
            row.taskNo = row.planStartTime.split(" ")[0];
          }else{
            row.taskNo = row.planStartTime.split(" ")[0]+"～"+row.planEndTime.split(" ")[0];
          }

        }else if(row.inspectionCycle=="3"){//按月生成任务
          if(row.planStartTime.split(" ")[0]  == row.planEndTime.split(" ")[0]){
            row.taskNo = row.planStartTime.split(" ")[0];
          }else{
            var arrStart = row.planStartTime.split(" ")[0].split("-");
            var arrEnd = row.planEndTime.split(" ")[0].split("-");
            if(arrStart[1]==arrEnd[1]){
              row.taskNo =     arrStart[0]+"-"+  arrStart[1]+"月"
            }else{
              row.taskNo =     arrStart[0]+"    "+  arrStart[1]+"月～"+arrEnd[1]+"月"
            }
            //             row.planStartTime.split(" ")[0]+"-"+row.planEndTime.split(" ")[0];
          }

        }else if(row.inspectionCycle=="4"){//按季度生成任务
          if(row.planStartTime.split(" ")[0]  == row.planEndTime.split(" ")[0]){
            row.taskNo = row.planStartTime.split(" ")[0];
          }else{
            var arrStart = row.planStartTime.split(" ")[0].split("-");
            var arrEnd = row.planEndTime.split(" ")[0].split("-");
            var seasonStart = "";
            var seasonEnd = "";
            if(arrStart[1]=="01" || arrStart[1]=="02"||arrStart[1]=="03"){
              seasonStart = "1季度";
            }else if(arrStart[1]=="04" || arrStart[1]=="05"||arrStart[1]=="06"){
              seasonStart = "2季度";
            }else if(arrStart[1]=="07" || arrStart[1]=="08"||arrStart[1]=="09"){
              seasonStart = "3季度";
            }else if(arrStart[1]=="10" || arrStart[1]=="11"||arrStart[1]=="12"){
              seasonStart = "4季度";
            }

            if(arrEnd[1]=="01" || arrEnd[1]=="02"||arrEnd[1]=="03"){
              seasonEnd = "1季度";
            }else if(arrEnd[1]=="04" || arrEnd[1]=="05"||arrEnd[1]=="06"){
              seasonEnd = "2季度";
            }else if(arrEnd[1]=="07" || arrEnd[1]=="08"||arrEnd[1]=="09"){
              seasonEnd = "3季度";
            }else if(arrEnd[1]=="10" || arrEnd[1]=="11"||arrEnd[1]=="12"){
              seasonEnd = "4季度";
            }
            if(seasonStart==seasonEnd){
              row.taskNo = arrStart[0]+"      "+seasonStart;
            }else{
              row.taskNo = arrStart[0]+"      "+seasonStart+"～"+seasonEnd;
            }
            // row.taskNo = arrStart[0]+"   "+seasonStart+"-"+seasonEnd;
            //row.taskNo = row.planStartTime.split(" ")[0]+"-"+row.planEndTime.split(" ")[0];
          }
        }else if(row.inspectionCycle=="5"){//按年生成任务
          if(row.planStartTime.split(" ")[0]  == row.planEndTime.split(" ")[0]){
            row.taskNo = row.planStartTime.split(" ")[0];
          }else{
            row.taskNo = row.planStartTime.split(" ")[0]+"-"+row.planEndTime.split(" ")[0];
          }
        }

        return row.taskNo;
      },
      openDetails(row) {
        if(event.target.nodeName !== "I"){
         this.rowObj = {};
         this.rowObj = row;
         this.showDetail = true;
        }
      },
      isShow:function(){
            this.showDetail = false;
      },
      //获取统计查询
      async loadData () {
        this.isLoading = true;
        await api.post(api.forent_url.base_url + '/inspection/task/list.mvc',{
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          planStartTime: this.dateTime == '' || this.dateTime == null ? '' : this.dateTime[0] + ' 00:00:00',
          planEndTime: this.dateTime == '' || this.dateTime == null ? '' : this.dateTime[1] + ' 23:59:59',
          inspectionType: 'B',
          status: this.formInline.status,
          completePercent: this.formInline.CompletionDegree,
          standardPercent: this.formInline.StandardRate,
          datepicker: this.dateTime ? new Date(this.dateTime[0] + ' 00:00:00') + ',' + new Date(this.dateTime[1] + ' 00:00:00') : '',
          taskNo: this.searchValue,
          orgId: api.getGlobalVal('userObj').orgCode
        }, 5000).then(res=>{
          if(res.code === "success" ){
            // console.log(res)
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
            this.widgetInfo.pageSize = res.data.pageSize;
            this.widgetInfo.pageNo = res.data.pageNo;
          }
        }).catch(err => {
          // console.log(err);
          this.isLoading = false;
          this.$message(
            { type:'warning',
            message:"加载超时,请重新加载!"});
        });
      },
      // 巡查时间
      selectDateTime(val){
        this.dateTime = val;
        this.widgetInfo.pageNo = 1;
        this. loadData();
      },
      // 分页
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.loadData();
      },
      // 下载巡查报告
      downLoad(scope) {
        // console.log('下载')
        var inspectionType = scope.row.inspectionType;
        window.location.href = api.forent_url.base_url + "/safety/report/createFireInspectReport.mvc?taskId=" + scope.row.id + "&inspectionType=" + inspectionType;
      },
      // 搜索
      handleSearch () {
        this.widgetInfo.pageNo = 1;
        this.loadData()
      },
      selectStatus(val){
        this.formInline.status = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      selectTypeName(val){
        this.formInline.CompletionDegree = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      selectIsEnable(val){
        this.formInline.StandardRate = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      InputPlan(val){
        this.searchValue = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      }
    },
    computed:{
      selected:function(){
        return this.$store.state.level
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dutyRoom_main {
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
    z-index: 100；
  }
  .gg-base-h3 {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    border-left: 4px solid #6a90ec;
    background-color: #eef3fe;
    span{
      cursor: pointer;
    }
  }
  .gg-table {
    margin-top: 15px;
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
  .gg-table[data-v-3ce9861e] {
    margin-top: 0;
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