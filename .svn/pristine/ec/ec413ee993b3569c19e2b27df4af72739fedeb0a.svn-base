<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <Title />
           <el-form :inline="true" class="filterAll">
            <el-row>
              <el-col :span="2">
                <el-checkbox  v-model.trim="checked" @change="isSelect" style="padding-top: 7px">已逾期</el-checkbox>
              </el-col>
              <el-col :span="21">
                <el-row type="flex" class="row-bg" justify="start">
                 <el-col :span="5" class="text-4">
                  <label>服务状态: </label>
                  <el-select  v-model.trim="formInline.reportTypeId" placeholder=全部  clearable  @change="selectReportTypeId">
                    <el-option :label="item.reportTypeName" :value="item.reportTypeId" v-for=" item in reportType" :key="item.reportTypeId"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8" class="text-4">
                  <label>申请时间: </label>
                  <el-date-picker  v-model.trim="dateTime" @change="selectDateTime" size="small"
                    range-separator="" type="daterange" :picker-options="pickerOptions" start-placeholder="请选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <div class="notab">
            <el-scrollbar>
            <el-table v-loading="isLoading" :data=" tableData" stripe style="width: 100%;padding:0">
            <el-table-column prop="orderId" label="维保单号" align="center" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column :show-overflow-tooltip=true prop="build" label="楼栋楼层" align="center">
            </el-table-column>
            <el-table-column :show-overflow-tooltip=true align="center" prop="deviceType" label="设备设施">
            </el-table-column>
            <el-table-column :show-overflow-tooltip=true align="center" prop="faultDescription" label="描述">
            </el-table-column>
            <el-table-column :show-overflow-tooltip=true align="center" prop="applicantTime" label="申请时间">
            </el-table-column>
            <el-table-column align="center" prop="serviceState" label="服务状态">
            <template slot-scope="scope">
            <span v-if="scope.row.serviceState ===  '0'">待处理</span>
            <span v-if="scope.row.serviceState === '1' ">处理中</span>
            <span v-if="scope.row.serviceState === '3'">待确认</span>
            <span v-if="scope.row.serviceState === '4'">已完成</span>
            </template>
            </el-table-column>
            <el-table-column align="center" prop="isOverdue" label="服务及时性">
            </el-table-column>
            <el-table-column :show-overflow-tooltip=true align="center" prop="userNames" label="维保人员">
            </el-table-column>
            <el-table-column width="140" align="center" prop="score" label="服务评价">
            <template slot-scope="scope">
            <span v-if="scope.row.score === ''"></span>
            <span v-if="scope.row.score === 5">
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                  </span>
            <span v-if="scope.row.score === 4">
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                  </span>
            <span v-if="scope.row.score === 3">
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                  </span>
            <span v-if="scope.row.score === 2">
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                  </span>
            <span v-if="scope.row.score === 1">
                    <i class="fa fa-star" style="color:#f7ba2a;font-size: 11px "></i>
                  </span>
            <!--评分-->
            <!-- <span v-if="scope.row.score > 0">
               <el-rate  v-model.trim="scope.row.score" disabled show-score   score-template="" > </el-rate>
             </span>-->
            </template>
            </el-table-column>
            <el-table-column align="center" prop="isRegular" label="报告">
            <template slot-scope="scope">
            <el-tooltip content="生成报告" placement="bottom">
            <el-button type="text" icon="icon-l-new l-icons ggicon-documents" style="font-size: 16px" title="" @click="queryReport(scope.row)"></el-button>
            </el-tooltip>
            </template>
            </el-table-column>
            </el-table>
            </el-scrollbar>
            <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '../../config/http'
  import Title from '../../components/Title.vue'
  import Pagination from "~/components/Pagination"
  export default {
    components: {
        Title,
      Pagination
    },
    data() {
      return {
        isLoading: false,
        checked: false,
        formInline: {
          reportTypeId: '',
          pageSize: 6,
          pageNo: 1,
          unitId: 'AHHF_QHHFY_99999997',
          bgtype: "",
          taskNo: "",
        },
        dateTime: '',
        score: 3,
        pickerOptions: {
          onClick(picker) {
            let end = new Date();
            let start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        },
        reportType: [{
            reportTypeId: '0',
            reportTypeName: '待处理'
          },
          {
            reportTypeId: '1',
            reportTypeName: '处理中'
          },
          {
            reportTypeId: '3',
            reportTypeName: '已确认'
          },
          {
            reportTypeId: '4',
            reportTypeName: '已完成'
          }
        ],
        tableData: [],
        widgetInfo: {
          pageSize: 6,
          pageNo: 1,
          list: [],
          total: null
        }
      }
    },
    mounted() {
      this.getTables();
    },
    methods: {
      getTables() {
        this.isLoading = true;
        api.post(api.forent_url.floor_url + '.1' + '/maintenance-service/proprietor/getEmergencyTrackList', {
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          unitId: api.getGlobalVal('userObj').orgCode,
          startApplicantTime:  this.dateTime === '' || this.dateTime === null ? '': this.dateTime[0],
          endApplicantTime:  this.dateTime === '' || this.dateTime === null ? '': this.dateTime[1],
          isOverdue: this.checked ? '1' : '',
          state: this.formInline.reportTypeId,
          datepicker: ''
        },5000).then(res => {
          if (res && res.code === 'success') {
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.list = res.data.rows;
            this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
            this.score = this.tableData && this.tableData.forEach(item => {
              return item.score
            });
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
      selectReportTypeId(val) {
        this.formInline.reportTypeId = val;
        this.getTables();
      },
      selectDateTime(val) {
        this.dateTime = val;
        this.getTables();
      },
      queryReport(val) {
        window.location.href = api.forent_url.maintenance + "/mainManage/exportWord?type=0&id=" + val.orderId
      },
      isSelect() {
        this.checked ? '1' : '';
        this.getTables();
      },
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.getTables();
      }

    }
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