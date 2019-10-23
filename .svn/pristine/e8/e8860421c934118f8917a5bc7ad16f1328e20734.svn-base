<template>
    <div>
      <div class="l-head">
        <!-- 面包屑 -->
        <Title/>
      </div>
      <div class="dutyRoom_main">
        <!-- 搜索框 -->
        <div>
          <el-row :inline="true" :model="formInline" class="demo-form-inline filterAll">
            <el-col :span="5" :offset="19">
              <el-input v-model.trim="searchValue" placeholder="请输入消控室名称" clearable @change="selectIsEnable">
                <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </div>
        <!-- 操作对话框 -->
        <el-dialog title="班次设置" :visible.sync="operationVisible" :close-on-click-modal="false" style="left: -10px; top: -80px; text-align: left; width: 90%; margin: 0 auto;">
          <el-scrollbar>
            <div style="height: 350px;">
              <el-form :model="list" :rules="rules" ref="list" label-width="140px">
                <el-row :inline="true">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="班次1开始时间：" style="margin-left: 10px; margin-top: 24px;" prop="firstDutyStart">
                      <el-time-picker
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="HH:mm"
                        style="width: 100px;"
                         v-model.trim="list.firstDutyStart"
                        placeholder="请选择">
                      </el-time-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="班次1结束时间：" style="margin-left: 10px; margin-top: 24px;" prop="firstDutyEnd">
                      <el-time-picker
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="HH:mm"
                        style="width: 100px;"
                         v-model.trim="list.firstDutyEnd"
                        placeholder="请选择">
                      </el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :inline="true">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="班次2开始时间：" style="margin-left: 10px; margin-top: 24px;" prop="secondDutyStart">
                      <el-time-picker
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="HH:mm"
                        style="width: 100px;"
                         v-model.trim="list.secondDutyStart"
                        placeholder="请选择">
                      </el-time-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="班次2结束时间：" style="margin-left: 10px; margin-top: 24px;" prop="secondDutyEnd">
                      <el-time-picker
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="HH:mm"
                        style="width: 100px;"
                         v-model.trim="list.secondDutyEnd"
                        placeholder="请选择">
                      </el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :inline="true">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="班次3开始时间：" style="margin-left: 10px; margin-top: 24px;" prop="thirdDutyStart">
                      <el-time-picker
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="HH:mm"
                        style="width: 100px;"
                         v-model.trim="list.thirdDutyStart"
                        placeholder="请选择">
                      </el-time-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="班次3结束时间：" style="margin-left: 10px; margin-top: 24px;" prop="thirdDutyEnd">
                      <el-time-picker
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="HH:mm"
                        style="width: 100px;"
                         v-model.trim="list.thirdDutyEnd"
                        placeholder="请选择">
                      </el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button type="primary" @click="handleEdit('list')" style="margin: 24px 0; width: 90px;">确 定</el-button>
              </div>
            </div>
          </el-scrollbar>
        </el-dialog>
        <div class="notab">
          <!-- 表格 -->
          <el-scrollbar>
          <el-table
            v-loading="isLoading"
            :data="tableData"
            stripe>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              pageSize ="pageSize"
              prop="roomName"
              label="消控室名称">
            </el-table-column>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              prop="planName"
              label="计划名称">
            </el-table-column>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              prop="firstDuty"
              label="班次1">
            </el-table-column>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              prop="secondDuty"
              label="班次2">
            </el-table-column>
            <el-table-column
              align="left"
              min-width="15%"
              :show-overflow-tooltip="true"
              prop="thirdDuty"
              label="班次3">
            </el-table-column>
            <el-table-column
              align="center"
              min-width="10%"
              prop="address"
              label="操作">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="bottom">
                <el-button type="text" icon="icon-l-new l-icons ggicon-modification" style="font-size: 16px;" @click="ScheduleSetting(scope.row)"></el-button>
              </el-tooltip>
            </template>
            </el-table-column>
          </el-table>
          </el-scrollbar>
          <!--分页器-->
          <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
        </div>
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
          reportTypeId: '',
          bgtype: "",
          alarmTimeStart: "",
          taskNo: "",
        },
        // 搜索值
        searchValue: '',
        operationVisible: false,
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
        // 绑定设置表单数据
        list: {
          id: '',
          firstDutyStart: '',
          firstDutyEnd: '',
          secondDutyStart: '',
          secondDutyEnd: '',
          thirdDutyStart: '',
          thirdDutyEnd: ''
        },
        rules: {
          firstDutyStart: [
            { required: true, message: '*此处不可为空', trigger: 'blur' }
          ],
          firstDutyEnd: [
            { required: true, message: '*此处不可为空', trigger: 'blur' }
          ],
          secondDutyStart: [
            { required: true, message: '*此处不可为空', trigger: 'blur' }
          ],
          secondDutyEnd: [
            { required: true, message: '*此处不可为空', trigger: 'blur' }
          ],
          thirdDutyStart: [
            { required: true, message: '*此处不可为空', trigger: 'blur' }
          ],
          thirdDutyEnd: [
            { required: true, message: '*此处不可为空', trigger: 'blur' }
          ]
        },
        //缓存原有数据
        oldTimeFieldObj: {}
      }
    },
    methods:{
      //获取统计查询
      async loadData () {
        this.isLoading = true;
        await api.post(api.forent_url.base_url + '/controlroom/plan/list',{
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          orgId: api.getGlobalVal('userObj').orgCode,
          roomName: this.searchValue
        }, 5000).then(res=>{
          if(res.code === "success" ){
            // console.log(res)
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
            this.widgetInfo.pageSize = res.data.pageSize;
            this.widgetInfo.pageNo = res.data.pageNo;
            // console.log('total',res.data.total);
            // console.log('tableData',this.tableData)
          } else {
            this.isLoading = false;
            console.log('else')
            // this.$message(
            // { type:'warning',
            // message:res.message});
            // this.$message(
            // { type:'warning',
            // message:"加载超时,请重新加载!"});
          }
        }).catch(err => {
          // console.log(err);
          this.isLoading = false;
          this.$message(
            { type:'warning',
            message:"加载超时,请重新加载!"});
        });
      },
      // 点击编辑确定按钮
      handleEdit (list) {
        this.$refs[list].validate((valid) => {
          if (valid) {
            var totalDate = (new Date(this.list.firstDutyEnd.replace(/-/g, '/')).getTime() - new Date(this.list.firstDutyStart.replace(/-/g, '/')).getTime()) + (new Date(this.list.secondDutyEnd.replace(/-/g, '/')).getTime() - new Date(this.list.secondDutyStart.replace(/-/g, '/')).getTime()) + (new Date(this.list.thirdDutyEnd.replace(/-/g, '/')).getTime() - new Date(this.list.thirdDutyStart.replace(/-/g, '/')).getTime());
            //24小时的毫秒数
            var dayTime = 24 * 3600 * 1000;
            // console.log('dayTime', dayTime)
            if (totalDate > dayTime) {
              this.$message({
                message: '当前所有班次时间相加不能超过24小时',
                type: 'warning'
              });
              return;
            } else if (totalDate < dayTime) {
              this.$confirm('当前所有班次时间相加小于24小时，确定要保存吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                if (this.judge (this.oldTimeFieldObj, this.list)) {
                  this.SendRequest ()
                } else {
                  this.$message({
                    message: '修改后的班次和原有班次一致！',
                    type: 'warning'
                  });
                }
              }).catch(() => {
                // console.log('已取消')       
              });
            } else {
              if (this.judge (this.oldTimeFieldObj, this.list)) {
                this.SendRequest ()
              } else {
                this.$message({
                  message: '修改后的班次和原有班次一致！',
                  type: 'warning'
                });
              }
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 发送请求
      async SendRequest () {
        await api.post(api.forent_url.base_url + '/controlroom/plan/updateControlRoom.mvc', {
          id: this.list.id,
          planNo: this.list.planNo,
          roomId: this.list.roomId,
          roomName: this.list.roomName,
          planName: this.list.planName,
          dutyOneStart: this.list.firstDutyStart,
          dutyOneEnd: this.list.firstDutyEnd,
          dutyTwoStart: this.list.secondDutyStart,
          dutyTwoEnd: this.list.secondDutyEnd,
          dutyThreeStart: this.list.thirdDutyStart,
          dutyThreeEnd: this.list.thirdDutyEnd,
          companyId: this.list.companyId,
          createTime: this.list.createTime,
          createUserId: this.list.createUserId,
          firstDuty: this.list.firstDuty,
          secondDuty: this.list.secondDuty,
          thirdDuty: this.list.thirdDuty,
          deleteFlag: this.list.deleteFlag,
        }).then(res=>{
          // console.log(res)
          const code = res.code
          const message = res.message
          if (code === 'success') {
            this.operationVisible = false;
            // 重新加载数据
            this.widgetInfo.pageNo = 1
            this.loadData()
            this.$message({
              type: 'success',
              message: message
            })
          } else {
            this.$message({
              type: 'error',
              message: message
            })
          }
        }).catch(err=>{
          console.log(err);
          this.operationVisible = false;
        })
      },
      // 判断
      judge (old, news) {
        if (old.dutyOneStart !== news.firstDutyStart) {
          return true;
        }
        if (old.dutyOneEnd !== news.firstDutyEnd) {
          return true;
        }
        if (old.dutyTwoStart !== news.secondDutyStart) {
          return true;
        }
        if (old.dutyTwoEnd !== news.secondDutyEnd) {
          return true;
        }
        if (old.dutyThreeStart !== news.thirdDutyStart) {
          return true;
        }
        if (old.dutyThreeEnd !== news.thirdDutyEnd) {
          return true;
        }
        return false;
      },
      // 显示车次设置对话框
      async ScheduleSetting(Controlroom) {
        await api.get(api.forent_url.base_url + `/controlroom/plan/getControlRoomDetail.mvc?planId=` + Controlroom.id)
        .then(res=>{
          // console.log('res===================', res)
          const code = res.code
          const message = res.message
          if (code == "success") {
            // 显示对话框
            this.operationVisible = true;
            // 显示班次信息
            this.list.id = Controlroom.id;
            this.list.firstDutyStart = this.oldTimeFieldObj.dutyOneStart = Controlroom.dutyOneStart;
            this.list.firstDutyEnd = this.oldTimeFieldObj.dutyOneEnd =  Controlroom.dutyOneEnd;
            this.list.secondDutyStart = this.oldTimeFieldObj.dutyTwoStart =  Controlroom.dutyTwoStart;
            this.list.secondDutyEnd = this.oldTimeFieldObj.dutyTwoEnd =  Controlroom.dutyTwoEnd;
            this.list.thirdDutyStart = this.oldTimeFieldObj.dutyThreeStart =  Controlroom.dutyThreeStart;
            this.list.thirdDutyEnd = this.oldTimeFieldObj.dutyThreeEnd =  Controlroom.dutyThreeEnd;
            this.list.planNo = Controlroom.planNo;
            this.list.roomId = Controlroom.roomId;
            this.list.roomName = Controlroom.roomName;
            this.list.planName = Controlroom.planName;
            this.list.companyId = Controlroom.companyId;
            this.list.createTime = Controlroom.createTime;
            this.list.createUserId = Controlroom.createUserId;
            this.list.firstDuty = Controlroom.firstDuty;
            this.list.secondDuty = Controlroom.secondDuty;
            this.list.thirdDuty = Controlroom.thirdDuty;
            this.list.deleteFlag = Controlroom.deleteFlag;
          } else if (code == "warn") {
            this.$message({
              type: 'warning',
              message: message
            });  
          }
        })
      },
      // 分页
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.loadData();
      },
      // 搜索
      handleSearch (val) {
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData()
      },
      selectIsEnable(val){
        this.searchValue = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      selectReportTypeId(val){
        this.formInline.reportTypeId = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
    }
  }
</script>
<style lang="scss" scoped>
  .dutyRoom_main {
    background: #fff;
    .row-bg {
      padding: 10px 0;
    }
  }
  @import "~/assets/css/table.scss";
  .notab {
    border-top: none;
  }
</style>
<style>
  .el-tooltip__popper.is-dark{
    max-width: 300px;
  }
</style>