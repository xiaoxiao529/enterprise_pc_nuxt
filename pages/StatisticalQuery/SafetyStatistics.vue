<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <Title />
          <el-form :inline="true" class="filterAll">
            <el-row>
              <el-col :span="20">
                <el-row type="flex" class="row-bg" justify="start">
                  <el-col :span="6" class="text-4" style=" width: 240px" >
                    <label>报告类型:</label>
                    <el-select v-model="formInline.reportTypeId" placeholder=报告类型 clearable  @change="selectReportTypeId">
                      <el-option :label="item.reportTypeName"  v-for=" item in reportType"
                                 :value="item.reportTypeId"
                        :key="item.reportTypeId"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7" class="text-4" style="width: 320px">
                    <label>查询时间:</label>
                    <el-date-picker v-model="dateTime" @change="selectDateTime" size="small"
                      range-separator="" type="daterange" :picker-options="pickerOptions" start-placeholder="请选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4" style="text-align:right;">
               <!-- <el-input v-model.trim="searchTaskNo" placeholder="请输入任务编号" clearable @change="InputPlan">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
                </el-input>-->
                <el-input v-model.trim="searchTaskNo" class="searchInput" clearable  placeholder="请输入任务编号" @change="InputPlan">
                 <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </el-form>
          <div class="notab">
              <el-scrollbar >
                <el-table style="width: 100%;padding:0"
                  v-loading="isLoading"  :data="tableData" stripe>
              <el-table-column align="center" show-overflow-tooltip  prop="taskNo" label="任务编号"
                               width="180">
              </el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="inspectionTime" label="巡查日期" width="180">
              </el-table-column>
              <el-table-column show-overflow-tooltip align="center" label="报告类型">
              <template slot-scope="scope">
              <span v-if="scope.row.reportTypeId === 'A' ">防火巡查报告</span>
              <span v-if="scope.row.reportTypeId === 'B' ">防火检查报告</span>
              <span v-if="scope.row.reportTypeId === 'C' ">设备设施检查报告</span>
              <span v-if="scope.row.reportTypeId === 'D'">消控室巡查报告</span>
              </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="name" label="提交人">
              </el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="createDate" label="报告生成时间">
              </el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="address" label="操作">
              <template slot-scope="scope">
              <el-tooltip content="生成报告" placement="bottom">
              <el-button type="text" icon="icon-l-new l-icons ggicon-documents" style="font-size: 16px " title="生成报告" @click="queryReport(scope.row)"></el-button>
              </el-tooltip>
              </template>
              </el-table-column>
              </el-table>
              </el-scrollbar>
              <!--分页器-->
              <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
          </div>
        </div>
      </el-col>
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
        ruleForm: {
          date1: ''
        },
        dateTime: '',
        searchTaskNo: '',
        formInline: {
          reportTypeId: '',
          pageSize: 6,
          pageNo: 1,
          bgtype: "",
          alarmTimeStart: "",
          taskNo: "",
          proprietorId:''
        },
        tableData: [],
        reportType: [
            {
            reportTypeId: 'A',
            reportTypeName: '防火巡查报告'
          },
          {
            reportTypeId: 'B',
            reportTypeName: '防火检查报告'
          },
          {
            reportTypeId: 'C',
            reportTypeName: '设备设施检查报告'
          },
          {
            reportTypeId: 'D',
            reportTypeName: '消控室巡查报告'
          }
        ],
        widgetInfo: {
          total: null,
          list: [],
          pageSize: 6,
          pageNo: 1
        },
        pickerOptions: {
              onClick(picker) {
                  let end = new Date();
                  let start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
              }
          },
      };
    },
    methods: {
      //统计查询
      getReportList() {
        this.isLoading = true;
        api.post(api.forent_url.base_url + "/safety/report/list.mvc?orgId=" + api.getGlobalVal('userObj').orgCode , {
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          proprietorId: api.getGlobalVal('userObj').orgCode,
          bgtype: this.formInline.reportTypeId,
          alarmTimeStart: this.dateTime === '' || this.dateTime === null ? '':this.dateTime[0]+ ' 00:00:00',
          taskNo: this.searchTaskNo,
        },5000).then(res => {
          if (res.code === "success") {
            //console.log('loading......');
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.list = res.data.rows;
            this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
            this.widgetInfo.pageNo = res.data.pageNo;
            this.widgetInfo.pageSize = res.data.pageSize;
          }else {
            this.isLoading = false;
            this.tableData = [];
            this.widgetInfo.total = 0;
            //console.log('没有数值。。。。。')
          }
        }).catch(err => {
          console.log(err);
          this.isLoading = false;
          this.$message(
              { type:'warning',
                message:"加载超时,请重新加载!"});
        });
      },
      selectReportTypeId(val) {
        this.formInline.reportTypeId = val;
        this.getReportList();
      },
      selectDateTime(val) {
        this.dateTime = val;
        this.widgetInfo.pageNo = 1;
        this.getReportList();
      },
      handleSearch() {
        this.widgetInfo.pageNo = 1;
        this.getReportList();
      },
      InputPlan(val) {
        this.searchTaskNo = val;
        this.widgetInfo.pageNo = 1;
        this.getReportList();
      },
      queryReport(val) {
        window.location.href = api.forent_url.moblie_url + "/safety/report/createEquipmentReport.mvc?taskId=" + val.taskId
      },
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.getReportList();
      }
    },
  }

</script>
<style scoped>
  @import "~/assets/css/table.scss";

</style>
<style>
.el-tooltip__popper.is-dark{
max-width: 300px;
}
</style>