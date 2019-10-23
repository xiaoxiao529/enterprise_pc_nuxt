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
              <el-col :span="5" class="text-4">
                <label>值班情况：</label>
                <el-select  v-model.trim="formInline.status" clearable placeholder="全部" @change="selectStatus">
                  <el-option
                    v-for="item in options1"
                    :key="item.status"
                    :label="item.statusName"
                    :value="item.status">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="15">
                <el-row type="flex" justify="center">
                  <el-col :span="7" class="text-4">
                    <label>是否规范：</label>
                    <el-select  v-model.trim="formInline.standardStatus" clearable placeholder="全部" @change="selectstandardStatus">
                      <el-option
                        v-for="item in options2"
                        :key="item.standardStatus"
                        :label="item.standardStatusName"
                        :value="item.standardStatus">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="11" class="text-4" :offset="2">
                    <label>值班日期：</label>
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
            @row-click="hiddenDangerRectification"
            v-loading="isLoading"
            :data="tableData"
            stripe>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              pageSize ="pageSize"
              prop="planStartTime"
              label="日期">
              <template slot-scope="scope">
                <span>{{scope.row.planStartTime.substring(0,10)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              label="班次">
              <template slot-scope="scope">
                <span>{{scope.row.planStartTime.substring(11,19)}}-{{scope.row.planEndTime.substring(11,19)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              prop="roomName"
              label="消控室">
            </el-table-column>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              label="任务名称">
              <template slot-scope="scope">
                <span v-if="scope.row.inspectionType === 'D' ">{{scope.row.roomPlanName}}</span>
                <span v-else>{{scope.row.planName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              label="值班情况">
              <template slot-scope="scope">
                <span v-if="scope.row.status === '0' ">未值班</span>
                <span v-else-if="scope.row.status === '1' ">待提交</span>
                <span v-else>已完成</span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              prop="standardStatus"
              label="是否规范操作">
              <template slot-scope="scope">
                <div class="gs-el-button-group--gapSmall">
                <div>{{scope.row.standardStatus==null?"":scope.row.standardStatus==""?"":scope.row.standardStatus=="0"?"规范":"不规范"}}</div>
              </div>
            </template>
            </el-table-column>
            <el-table-column
              align="center"
              min-width="10%"
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
      <ControlRoomDetail :row="rowObj" :showDetail="showDetail" v-on:isShow='isShow()'/>
    </div>
</template>
<script>
  import api from '~/config/http';
  import Title from '~/components/Title';
  import axios from 'axios';
  import Pagination from "~/components/Pagination";
  import ControlRoomDetail from '~/components/SafetySupervision/ControlRoomDetail';
  export default {
    components:{
      Title,
      Pagination,
      ControlRoomDetail
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
          bgtype:'',
          taskNo:'',
          status: '',
          standardStatus: '',
          // 计划状态
          isEnable:'',
          // 巡查类型
          routingInspectionTypeId:'',
          // 搜索类型
          searchType:''
        },
        // 搜索值
        searchValue: '',
        // 下拉选项
        options1:[
          {
            statusName: '全部',
            status: ''
          },{
            statusName: '未值班',
            status: '0'
          },{
          //   statusName: '巡查中',
          //   status: '1'
          // },{
            statusName: '已完成',
            status: '2'
          }
        ],
        options2:[
          {
            standardStatusName: '全部',
            standardStatus: ''
          },{
            standardStatusName: '规范',
            standardStatus: '0'
          },{
            standardStatusName: '不规范',
            standardStatus: '1'
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
        accidentNo: false,
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
        data: {},
        eventTypeCh: '',
        controlTypeDesc: '',
        pictureDetails: false,
        qustionList: false,
        showDetail:false,
        rowObj:{}
      };
    },
    methods:{
      //获取统计查询
      async loadData () {
        this.isLoading = true;
        await api.post(api.forent_url.base_url + '/inspection/task/list.mvc',{
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          orgId: api.getGlobalVal('userObj').orgCode,
          planStartTime: this.dateTime == '' || this.dateTime == null ? '' : this.dateTime[0] + ' 00:00:00',
          planEndTime: this.dateTime == '' || this.dateTime == null ? '' : this.dateTime[1] + ' 23:59:59',
          inspectionType: 'D',
          status: this.formInline.status,
          standardStatus: this.formInline.standardStatus,
          datepicker: this.dateTime ? new Date(this.dateTime[0] + ' 00:00:00') + ',' + new Date(this.dateTime[1] + ' 00:00:00') : '',
          taskNo: this.searchValue
        }).then(res=>{
          if(res.code === "success" ){
            // console.log(res)
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
            this.widgetInfo.pageSize = res.data.pageSize;
            this.widgetInfo.pageNo = res.data.pageNo;
            // if (res.data.rows.length === 0) {
            //   this.res.data.rows
            // }
          }
        }).catch(err => {
          console.log(err);
          // this.isLoading = false;
          // this.$message(
          //   { type:'warning',
          //   message:"加载超时,请重新加载!"});
        });
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
        window.location.href = api.forent_url.base_url + "/safety/report/createControlRoomReport.mvc?taskId=" + scope.row.id;
      },
      // 显示消控室值班详情
      async hiddenDangerRectification (row, event, column) {
        // console.log(event.target.nodeName, '@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        if(event.target.nodeName !== "I"){
          this.showDetail = true;
          this.rowObj = row;
        }
      },
      isShow:function(){
            this.showDetail = false;
      },
      enlarge(b) {
        // console.log(b)
        this.url = b;
        this.pictureDetails = true;
      },
      // 值班日期
      selectDateTime(val){
        this.dateTime = val;
        this.widgetInfo.pageNo = 1;
        this. loadData();
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
      selectstandardStatus(val){
        this.formInline.standardStatus = val;
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
    // height: 300px;
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
  .dividing_line {
    padding: 5px;
    border-bottom: 1px solid #e2e4e8 !important;
  }
  .frame {
    margin: 10px 0;
    border: 1px solid #e2e4e8;
    padding: 5px 15px;
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