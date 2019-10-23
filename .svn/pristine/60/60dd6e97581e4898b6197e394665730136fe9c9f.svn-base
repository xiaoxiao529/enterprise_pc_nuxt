<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <Title />
          <el-form :inline="true" class="filterAll">
            <el-row>
              <el-col :span="21">
                <el-row type="flex" class="row-bg" justify="start">
                  <el-col :span="6" class="text-5">
                    <label>计划类型: </label>
                    <el-select  v-model.trim="formInline.planeId" placeholder=全部  clearable @change="selectPlaneType">
                      <el-option :label="item.planeName" :value="item.planeId" v-for=" item in planeType" :key="item.planeId"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6" class="text-5">
                    <label>服务及时性: </label>
                    <el-select  v-model.trim="formInline.overdueId" placeholder=全部  clearable @change="selectOverdueType">
                      <el-option :label="item.overdueName" :value="item.overdueId" v-for=" item in isOverdueType" :key="item.overdueId"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6" class="text-4">
                    <label>服务状态: </label>
                    <el-select  v-model.trim="formInline.serviceId" placeholder=全部  clearable  @change="selectServiceType">
                      <el-option :label="item.serveiceName" :value="item.serviceId" v-for=" item in serviceStatus" :key="item.serviceId"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <div class="notab">
               <el-scrollbar>
               <el-table v-loading="isLoading" :data=" tableData" stripe style="width: 100%;padding:0">
               <el-table-column :show-overflow-tooltip=true prop="planName" label="计划名称" align="center">
               </el-table-column>
               <el-table-column :show-overflow-tooltip=true prop="planTypeName" label="计划类型" align="center">
               </el-table-column>
               <el-table-column align="center" prop="status" label="服务状态">
               <template slot-scope="scope">
               <span v-if="scope.row.status ===  '0'">待下发</span>
               <span v-if="scope.row.status === '1' ">已下发</span>
               <span v-if="scope.row.status === '11' ">已出发</span>
               <span v-if="scope.row.status === '12' ">已抵达</span>
               <span v-if="scope.row.status === '2' ">已开始</span>
               <span v-if="scope.row.status === '3' ">已完成</span>
               </template>
               </el-table-column>
               <el-table-column :show-overflow-tooltip=true align="center" prop="isOverdue" label="服务及时性">
               </el-table-column>
               <el-table-column :show-overflow-tooltip=true align="center" prop="appointment" label="计划时间">
               </el-table-column>
               <el-table-column :show-overflow-tooltip=true align="center" prop="finishTime" label="完成时间">
               </el-table-column>
               <el-table-column :show-overflow-tooltip=true align="center" prop="userNames" label="维保人员">
               </el-table-column>
               <el-table-column :show-overflow-tooltip=true align="center" prop="feedbackTime" label="报告">
               <template slot-scope="scope">
               <el-tooltip content="生成报告" placement="bottom">
               <el-button type="text" icon="icon-l-new l-icons ggicon-documents" style="font-size: 16px" title="生成报告" @click="queryReport(scope.row)"></el-button>
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
        formInline: {
          planeId: '',
          overdueId: '',
          serviceId: '',
          pageSize: 8,
          pageNo: 1,
          planType: "",
          alarmTimeStart: "",
          unitId: '',
        },
        planeType: [{
            planeId: '',
            planeName: '全部'
          },
          {
            planeId: '1',
            planeName: '日计划'
          },
          {
            planeId: '2',
            planeName: '周计划'
          },
          {
            planeId: '3',
            planeName: '月计划'
          },
          {
            planeId: '4',
            planeName: '季计划'
          },
          {
            planeId: '5',
            planeName: '年计划'
          },
          {
            planeId: '6',
            planeName: '自定义计划'
          },
        ],
        isOverdueType: [{
            overdueId: '',
            overdueName: '全部'
          },
          {
            overdueId: '0',
            overdueName: '正常'
          },
          {
            overdueId: '1',
            overdueName: '已逾期'
          },
        ],
        serviceStatus: [{
            serviceId: '',
            serveiceName: '全部'
          },
          {
            serviceId: '0',
            serveiceName: '待下发'
          },
          {
            serviceId: '1',
            serveiceName: '已下发'
          },
          {
            serviceId: '2',
            serveiceName: '已开始'
          },
          {
            serviceId: '3',
            serveiceName: '已完成'
          },
          {
            serviceId: '11',
            serveiceName: '已出发'
          },
          {
            serviceId: '12',
            serveiceName: '已抵达'
          },
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
     // this.getTableDate();
    },
    methods: {
      getTableDate() {
        this.isLoading = true;
        api.post(api.forent_url.floor_url + '.1' + '/maintenance-service/proprietor/getRoutineTrackList', {
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          unitId: api.getGlobalVal('userObj').orgCode,
          startApplicantTime: '',
          endApplicantTime: '',
          isOverdue: this.formInline.overdueId,
          state: this.formInline.serviceId,
          planType: this.formInline.planeId
        },5000).then(res => {
          if (res && res.code === 'success') {
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.list = res.data.rows;
            this.widgetInfo.total = res.data.total;
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
      selectPlaneType(val) {
        this.formInline.planeId = val;
        this.getTableDate();
      },
      selectOverdueType(val) {
        this.formInline.overdueId = val;
        this.getTableDate();
      },
      selectServiceType(val) {
        this.formInline.serviceId = val;
        this.getTableDate();
      },
      queryReport(val) {
        console.log("----------", val)
        //http://localhost:8886/remoteApi/api/v1.1/maintenance-service/mainManage/exportWord?type=0&id=201812051534055826
        window.location.href = api.forent_url.maintenance + "/mainManage/exportWord?type=1&id=" + val.id
      },
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.getTableDate();
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