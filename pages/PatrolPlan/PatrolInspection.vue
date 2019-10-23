<template>
  <div>
    <div class="l-head">
      <!-- 面包屑 -->
      <Title />
    </div>
    <div class="dutyRoom_main">
      <!-- 搜索框 -->
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline filterAll">
          <el-row>
            <el-col :span="2">
              <el-button type="primary" icon="el-icon-plus" @click="NewlyAdded">新增</el-button>
            </el-col>
            <el-col :span="18">
              <el-row type="flex" justify="center">
                <el-col :span="5" class="text-4">
                  <label>巡查类型：</label>
                  <el-select v-model.trim="formInline.routingInspectionTypeId" clearable placeholder="全部" @change="selectTypeName">
                    <el-option v-for="item in patrols" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5" :offset="1" class="text-4">
                  <label>计划状态：</label>
                  <el-select v-model.trim="formInline.isEnable" clearable placeholder="全部" @change="selectIsEnable">
                    <el-option v-for="item in options2" :key="item.isEnable" :label="item.isEnableName" :value="item.isEnable">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="9" :offset="1" class="text-4">
                  <label>时间范围：</label>
                  <el-date-picker v-model.trim="dateTime" @change="selectDateTime" value-format="yyyy-MM-dd"
                    range-separator="" type="daterange" :picker-options="pickerOptions" start-placeholder="请选择日期">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-input v-model.trim="searchValue" placeholder="请输入计划名称" clearable @change="InputPlan">
                <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="notab">
        <!-- 表格 -->
        <el-scrollbar>
          <el-table v-loading="isLoading" :data="tableData" stripe>
            <el-table-column align="left" min-width="10%" :show-overflow-tooltip="true" pageSize="pageSize" prop="planNo"
              label="编号">
            </el-table-column>
            <el-table-column align="left" min-width="15%" :show-overflow-tooltip="true" prop="planName" label="计划名称">
            </el-table-column>
            <el-table-column align="left" min-width="10%" :show-overflow-tooltip="true" prop="typeName" label="巡查类型">
              <template slot-scope="scope">
                <span v-if="scope.row.routingInspectionTypeId === 'A'">防火巡查</span>
                <span v-if="scope.row.routingInspectionTypeId === 'B'">防火检查</span>
              </template>
            </el-table-column>
            <el-table-column align="left" min-width="10%" :show-overflow-tooltip="true" prop="secondDuty" label="巡查周期">
              <template slot-scope="scope">
                <div class="gs-el-button-group--gapSmall">
                  <div>{{scope.row.inspectionCycleValue}}{{scope.row.inspectionCycle}}/次</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="left" min-width="10%" :show-overflow-tooltip="true" prop="startDate" label="开始日期">
              <template slot-scope="scope">
                <span v-if="!scope.row.startDate"></span>
                <span v-else>{{scope.row.startDate.substring(0,10)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" min-width="10%" :show-overflow-tooltip="true" prop="endDate" label="结束日期">
              <template slot-scope="scope">
                <span v-if="!scope.row.endDate"></span>
                <span v-else>{{scope.row.endDate.substring(0,10)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="10%" :show-overflow-tooltip="true" label="当前状态">
              <template slot-scope="scope">
                <div class="gs-el-button-group--gapSmall">
                  <div>{{scope.row.isEnable == 1 ? "进行中" : scope.row.isEnable == 0 ?"未激活" : "已禁用"}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="10%" prop="isDistribute" label="巡查内容">
              <template slot-scope="scope">
                <div v-if="scope.row.isDistribute == 0">
                  <el-tooltip content="请配置" placement="bottom">
                    <el-button type="text" icon="icon-l-new ggicon-buildings" style="font-size: 16px;" @click="ScheduleSetting(scope.row)"></el-button>
                  </el-tooltip>
                </div>
                <div v-else-if="scope.row.isDistribute == 1">
                  <el-tooltip content="已配置" placement="bottom">
                    <el-button type="text" icon="icon-l-new ggicon-buildings" style="font-size: 16px;" @click="ScheduleSetting(scope.row)"></el-button>
                  </el-tooltip>
                </div>
                <div v-else-if="scope.row.isDistribute">
                  <el-button disabled type="text" icon="icon-l-new ggicon-buildings" style="font-size: 16px;" @click="ScheduleSetting(scope.row)"></el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="15%" label="操作">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.isEnable == 0 ? '点击启动' : scope.row.isEnable == 1 ? '点击禁止' : scope.row.isEnable == 2 ? '点击启动' : ''"
                  placement="bottom">
                  <el-button @click="modifyState(scope.row)" :disabled="scope.row.isEnable == 1 ? false : scope.row.isEnable == 2 ? false : scope.row.isEnable == 0 ? false :true"
                    type="text" style="font-size: 16px" :icon="formatIsLock(scope)"></el-button>
                </el-tooltip>
                <el-tooltip content="编辑" placement="bottom">
                  <el-button :disabled="scope.row.isEnable == 0 ? false : scope.row.isEnable == 1 ? true :  scope.row.isEnable == 2 ? false : false"
                    type="text" icon="icon-l-new ggicon-modification" style="font-size: 16px" @click="handleEditPlan(scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip content="删除" placement="bottom">
                  <el-button :disabled="scope.row.isEnable == 1 ? true : scope.row.isEnable == 0 ? false : scope.row.isEnable == 2 ? false :true"
                    type="text" icon="el-icon-delete" style="font-size: 16px" @click="handleDelete(scope.row.id)"></el-button>
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
    components: {
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
          bgtype: '',
          taskNo: '',
          // 计划状态
          isEnable: '',
          // 巡查类型
          routingInspectionTypeId: '',
          // 搜索类型
          searchType: ''
        },
        dateTime: '',
        patrols: '',
        // 搜索值
        searchValue: '',
        // 下拉选项
        options2: [{
          isEnableName: '全部',
          isEnable: ''
        }, {
          isEnableName: '未激活',
          isEnable: '0'
        }, {
          isEnableName: '进行中',
          isEnable: '1'
        }, {
          isEnableName: '已禁用',
          isEnable: '2'
        }, {
          isEnableName: '已过期',
          isEnable: '3'
        }],
        // 对话框
        options3: [{
          routingInspectionTypeId: 'A',
          label: '防火巡查'
        }, {
          routingInspectionTypeId: 'B',
          label: '防火检查'
        }],
        form: {
          planName: '',
          routingInspectionTypeId: '',
          inspectionCycleValue: 1,
          inspectionCycle: '',
          startDate: '',
          endDate: '',
          time: ''
        },
        required: '',
        // 对话框日期选择

        rules: {
          planName: [{
            required: true,
            message: '*此处不可为空',
            trigger: 'blur'
          }],
          startDate: [{
            required: true,
            message: '*此处不可为空',
            trigger: 'blur'
          }],
          endDate: [{
            required: true,
            message: '*此处不可为空',
            trigger: 'blur'
          }],
          routingInspectionTypeId: [{
            required: true,
            message: '*此处不可为空',
            trigger: 'blur'
          }],
          inspectionCycleValue: [{
            required: true,
            message: '*此处不可为空',
            trigger: 'blur'
          }],
          inspectionCycle: [{
            required: true,
            message: '*此处不可为空',
            trigger: 'blur'
          }],
          time: [{
            required: false,
            message: '*此处不可为空',
            trigger: 'blur',
          }]
        }
      };
    },
    methods: {

      handleURLDialogClose(refName) {
        this.$refs[refName].clearValidate();
        this.$refs[refName].resetFields();
      },
      async PatrolType(flag) {
        await api.post(api.forent_url.base_url + '/inspection/plan/getCycleType', {
          flag: flag
        }).then(res => {
          // console.log('===========', flag)
          this.inspectionCycleList = res.data
          if (flag == 'A') {
            this.form.inspectionCycle = '1'
          } else if (flag == 'B') {
            this.form.inspectionCycle = '3'
          }
        })
      },
      // 巡查内容
      ScheduleSetting(item) {
        this.$router.push({
          "name": "PatrolPlan-PatrolContent",
          params: item
        });
      },
      // 分页
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.loadData();
      },
      // 点击新增按钮，显示对话框
      async NewlyAdded() {
        this.form = {
          planName: '',
          routingInspectionTypeId: 'A',
          inspectionCycleValue: 1,
          inspectionCycle: '1',
          startDate: '',
          endDate: ''
        }
        await api.post(api.forent_url.base_url + '/inspection/plan/getCycleType', {
          flag: 'A'
        }).then(res => {
          // console.log('===========', res)
          this.inspectionCycleList = res.data
        });
        this.newlyAddedVisible = true;
        if (this.form.inspectionCycle === '0') {
          this.rules.time[0].required = true
        } else {
          this.rules.time[0].required = false
        }
      },
      // 点击新增对话框的确定按钮, 添加巡查计划信息
      addPlan(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            await api.post(api.forent_url.base_url + '/inspection/plan/saveInspectionPlan', {
              orgId: api.getGlobalVal('userObj').orgCode,
              id: '',
              planName: this.form.planName,
              routingInspectionTypeId: this.form.routingInspectionTypeId,
              inspectionCycle: this.form.inspectionCycle,
              startDate: this.form.startDate,
              endDate: this.form.endDate,
              userId: api.getGlobalVal('userObj').id,
              timeStart: this.form.inspectionCycle == 0 ? (this.form.time ? this.form.time[0].substring(11,
                19) : '') : '',
              timeEnd: this.form.inspectionCycle == 0 ? (this.form.time ? this.form.time[1].substring(11, 19) :
                '') : '',
              time: this.form.inspectionCycle == 0 ? (this.form.time ? new Date(this.form.time[0]) + ',' +
                new Date(this.form.time[1]) : '') : '',
              inspectionCycleValue: this.form.inspectionCycleValue
            }).then(res => {
              // console.log('添加返回===', res)
              const code = res.code
              const message = res.message
              if (code === 'success') {
                // 添加成功
                // 隐藏对话框
                this.newlyAddedVisible = false
                // 提示成功
                this.$message.success(message)
                // 重新加载数据
                this.loadData()
                this.$refs["form"].resetFields(); //表单内容重置
              } else {
                // 隐藏对话框
                this.newlyAddedVisible = false
                this.$message.error(message)
                this.$refs["form"].resetFields(); //表单内容重置
              }
            }).catch(err => {
              console.log(err);
            })
          }
        });
      },
      // 显示编辑对话框
      async handleEditPlan(planObj) {
        var plan = JSON.parse(JSON.stringify(planObj));
        // console.log(plan)
        await api.get(api.forent_url.base_url + `/inspection/plan/getInspectionPlan/${plan.id}`)
          .then(res => {
            // console.log(res)
            const code = res.code
            if (code === 'success') {
              const data = res.data
              this.form.planName = data.planName
              this.form.startDate = data.startDate == '' ? '' : data.startDate == null ? '' : data.startDate.substring(
                0, 10)
              this.form.endDate = data.endDate == '' ? '' : data.endDate == null ? '' : data.endDate.substring(0,
                10)
              this.form.routingInspectionTypeId = data.routingInspectionTypeId
              this.form.inspectionCycleValue = data.inspectionCycleValue
              this.form.inspectionCycle = data.inspectionCycle
              this.form.id = data.id
              this.form.time = [data.timeStart != null ? data.timeStart : '', data.timeEnd != null ? data.timeEnd :
                ''
              ]
              // console.log('this.form.time', this.form.time)
            }
          })
        await api.post(api.forent_url.base_url + '/inspection/plan/getCycleType', {
          flag: plan.routingInspectionTypeId
        }).then(res => {
          // console.log('===========', res)
          this.inspectionCycleList = res.data
        })
        // 显示对话框
        this.editVisible = true;
        if (this.form.inspectionCycle === '0') {
          this.rules.time[0].required = true
        } else {
          this.rules.time[0].required = false
        }
      },
      // 点击编辑对话框的确定按钮, 修改巡查计划信息
      editPlan(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            await api.post(api.forent_url.base_url + '/inspection/plan/updateInspectionPlan.mvc', {
              planName: this.form.planName,
              startDate: this.form.startDate,
              endDate: this.form.endDate,
              routingInspectionTypeId: this.form.routingInspectionTypeId,
              inspectionCycleValue: this.form.inspectionCycleValue,
              inspectionCycle: this.form.inspectionCycle,
              userId: api.getGlobalVal('userObj').id,
              timeStart: this.form.inspectionCycle == 0 ? (this.form.time ? this.form.time[0] : '') : '',
              timeEnd: this.form.inspectionCycle == 0 ? (this.form.time ? this.form.time[1] : '') : '',
              time: this.form.inspectionCycle == 0 ? (this.form.time ? new Date(this.form.time[0]) + ',' +
                new Date(this.form.time[1]) : '') : '',
              orgId: api.getGlobalVal('userObj').orgCode,
              id: this.form.id
            }).then(res => {
              // console.log(res)
              const code = res.code
              const message = res.message
              // 编辑成功    
              if (code === 'success') {
                // 隐藏对话框
                this.editVisible = false;
                // 提示成功
                this.$message.success(message)
                // 重新加载数据
                this.loadData()
                this.$refs["form"].resetFields(); //表单内容重置
              } else {
                this.$message.error(message)
                // 隐藏对话框
                this.editVisible = false;
                this.$refs["form"].resetFields(); //表单内容重置
              }
            }).catch(err => {
              console.log(err);
              // 隐藏对话框
              this.editVisible = false;
              this.$refs["form"].resetFields(); //表单内容重置
            })
          }
        });
      },
      // 删除用户
      handleDelete(id) {
        let that = this;
        this.$confirm('确定要删除此计划吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(() => {
            // console.log(id)
            axios.delete(api.forent_url.base_url + `/inspection/plan/deleteInspectionPlan/${id}`).then(res => {
              // console.log('进入delete :', res);
              // console.log('res :', res);
              const code = res.data.code
              const message = res.data.message
              if (code === 'success') {
                // 删除成功 重新加载数据
                this.widgetInfo.pageNo = 1
                this.loadData()
                this.$message({
                  type: 'success',
                  message: message
                })
              }
            })
          })
          .catch(() => {
            console.log('已取消删除')
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });          
          });
      },
      // 巡查类型选择
      async PatrolTypeSelection() {
        await api.post(api.forent_url.base_url + '/inspection/task/getXcType')
          .then(res => {
            if (res.code === "success") {
              // console.log(res);
              this.patrols = res.data.slice(0, 3);
            }
          }).catch(err => {
            console.log(err)
          })
      },
      // 获取统计查询
      async loadData() {
        this.isLoading = true;
        await api.post(api.forent_url.base_url + '/inspection/plan/list.mvc?searchType=0', {
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          planName: this.searchValue,
          routingInspectionTypeId: this.formInline.routingInspectionTypeId,
          isEnable: this.formInline.isEnable,
          bgtype: this.formInline.reportTypeId,
          orgId: api.getGlobalVal('userObj').orgCode,
          searchStartDate: this.dateTime == '' || this.dateTime == null ? '' : this.dateTime[0],
          searchEndDate: this.dateTime == '' || this.dateTime == null ? '' : this.dateTime[1]
        }, 5000).then(res => {
          if (res.code === "success") {
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
          this.$message({
            type: 'warning',
            message: "加载超时,请重新加载!"
          });
        });
      },
      // 图标显示判断
      formatIsLock(scope) {
        var x = scope.row.isEnable == 0 ? 'icon-l-new cloud-unlocked ' : scope.row.isEnable == 1 ?
          'icon-l-new cloud-locked ' : scope.row.isEnable == 2 ? 'icon-l-new cloud-unlocked' : 'cloud-alert'
        return x;
      },
      // 启动按钮
      modifyState(row) {
        let that = this;
        var id = row.id;
        var currentState = row.isEnable;
        //未激活
        if (currentState == 0) {
          currentState = 1;
          that.implement(id, currentState);
          //进行中
        } else if (currentState == 1) {
          currentState = 2;
          this.$confirm('警告:计划禁用后将失效，APP上对应的任务也将无法执行，确定要执行该操作么？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            that.implement(id, currentState);
          }).catch(() => {
            console.log('已取消删除')
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });          
          });
          //已禁用
        } else if (currentState == 2) {
          currentState = 1;
          that.implement(id, currentState);
        }
      },
      // 点击启动按钮发送请求
      async implement(id, currentState) {
        await axios.put(api.forent_url.base_url + `/inspection/plan/updateInspectionStatus/${id}/${currentState}`)
          .then(res => {
            var message = res.data.message;
            var code = res.data.code;
            if (code == "success") {
              this.widgetInfo.pageNo = 1;
              this.$message({
                type: 'success',
                message: message
              })
              this.loadData()
            } else {
              this.$message({
                type: 'error',
                message: message
              })
            }
          })
      },
      // 时间范围
      selectDateTime(val) {
        this.dateTime = val;
        this.widgetInfo.pageNo = 1;
        this.loadData();
      },
      // 搜索
      handleSearch() {
        this.widgetInfo.pageNo = 1;
        this.loadData()
      },
      selectTypeName(val) {
        this.formInline.routingInspectionTypeId = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      selectIsEnable(val) {
        this.formInline.isEnable = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      },
      InputPlan(val) {
        this.searchValue = val;
        this.widgetInfo.pageNo = 1;
        // console.log(val);
        this.loadData();
      }
    },
    mounted() {
      this.PatrolTypeSelection();
    },
    computed: {
      selected: function () {
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

</style>
<style>
  .el-tooltip__popper.is-dark {
    max-width: 300px;
  }

</style>
