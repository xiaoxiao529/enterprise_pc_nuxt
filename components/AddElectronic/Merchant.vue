<template>
  <div class="storied-suilding-wrapper">
    <div>
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="楼栋:">
          <el-select
            v-model.trim="formInline.buildId"
            placeholder="楼栋信息"
            filterable
            @change="getFloorInfo"
            :loading="isLoading"
          >
            <el-option
              v-for="item in buildList"
              :key="item.buildId"
              :label="item.buildName"
              :value="item.buildId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层:">
          <el-select v-model.trim="formInline.floorId" filterable placeholder="楼层信息">
            <el-option
              v-for="item in floorList"
              :key="item.floorId"
              :label="item.floorName"
              :value="item.floorId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户ID:">
          <el-input v-model="formInline.locationId"></el-input>
        </el-form-item>
        <el-form-item label="商户地址:" >
          <el-input v-model="formInline.locationAddress"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select  v-model="status"  filterable placeholder="请选择">
            <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="t-right" style="width: 75%">
          <el-button @click="resetBtn">重置</el-button>
          <el-button type="primary" @click="loadData('search')">搜索</el-button>
          <el-button type="success" @click="dialogShow" v-if="facilitiesInData.limtShow">导入</el-button>
          <el-button
            type="warning"
            @click="handleEditPlan('add')"
            v-if="facilitiesInData.limtShow"
          >新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="notab">
      <el-scrollbar>
        <el-table v-loading="isLoading" :data="tableData" stripe>
          <el-table-column
            align="left"
            min-width="10%"
            :show-overflow-tooltip="true"
            pageSize="pageSize"
            prop="locationId"
            label="商户ID"
          ></el-table-column>
          <el-table-column
            align="left"
            min-width="15%"
            :show-overflow-tooltip="true"
            prop="locationName"
            label="商户名称"
          ></el-table-column>
          <el-table-column
            align="left"
            min-width="15%"
            :show-overflow-tooltip="true"
            prop="locationAddress"
            label="商户地址"
          ></el-table-column>
          <el-table-column
            align="left"
            min-width="15%"
            :show-overflow-tooltip="true"
            prop="locationPointX"
            label="纬度"
          ></el-table-column>
          <el-table-column
            align="left"
            min-width="15%"
            :show-overflow-tooltip="true"
            prop="locationPointY"
            label="经度"
          ></el-table-column>
<!--          <el-table-column-->
<!--            align="left"-->
<!--            min-width="15%"-->
<!--            :show-overflow-tooltip="true"-->
<!--            prop="buildId"-->
<!--            label="楼栋ID"-->
<!--          ></el-table-column>-->
          <el-table-column
            align="left"
            min-width="15%"
            :show-overflow-tooltip="true"
            prop="buildName"
            label="楼栋"
          ></el-table-column>
<!--          <el-table-column-->
<!--            align="left"-->
<!--            min-width="15%"-->
<!--            :show-overflow-tooltip="true"-->
<!--            prop="floorId"-->
<!--            label="楼层ID"-->
<!--          ></el-table-column>-->
          <el-table-column
            align="left"
            min-width="15%"
            :show-overflow-tooltip="true"
            prop="floorName"
            label="楼层"
          ></el-table-column>
          <el-table-column
                  align="left"
                  min-width="8%"
                  :show-overflow-tooltip="true"
                  prop="stateName"
                  label="状态"
          ></el-table-column>
          <el-table-column align="center" min-width="25%" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleEditPlan('edit',scope.row)"
                v-if="facilitiesInData.limtShow"
              >编辑</el-button>
              <el-button type="text" @click="handleEditPlan('view',scope.row)">查看</el-button>
              <el-button
                type="text"
                @click="handleEditPlan('delete',scope.row)"
                v-if="facilitiesInData.limtShow"
                :disabled="scope.row.status=='1' ? false : true"
              >停用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
    </div>
    <el-dialog :title="optTitle" :visible.sync="dialogFormVisible" :before-close="rest"  width="960px">
      <div style="height:400px;overflow-x: hidden;overflow-y: auto;">
        <el-form :model="plan" label-position="left" inline class="demo-table-expand dialog-expand">
          <el-form-item label="地点位置名称:" :label-width="formLabelWidth" :rules="{required: true}">
            <el-input :disabled="inputDisabled" v-model="plan.locationName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细地址:" :label-width="formLabelWidth" :rules="{required: true}">
            <el-input :disabled="inputDisabled" v-model="plan.locationAddress" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地点位置纬度:" :label-width="formLabelWidth" :rules="{required: true}">
            <el-input :disabled="inputDisabled" v-model="plan.locationPointX" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地点位置经度:" :label-width="formLabelWidth" :rules="{required: true}">
            <el-input :disabled="inputDisabled" v-model="plan.locationPointY" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="楼栋:" :rules="{required: true}">
            <el-select
              :disabled="inputDisabled"
              v-model.trim="plan.buildId"
              placeholder="楼栋信息"
              @change="getFloorInfo"
              filterable
            >
              <el-option
                v-for="item in buildList"
                :key="item.buildId"
                :label="item.buildName"
                :value="item.buildId"
                :loading="loading"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="楼层:" :rules="{required: true}">
            <el-select :disabled="inputDisabled" v-model.trim="plan.floorId"  filterable placeholder="楼层信息">
              <el-option
                v-for="item in floorList"
                :key="item.floorId"
                :label="item.floorName"
                :value="item.floorId"

              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用场景:" :label-width="formLabelWidth">
            <el-select :disabled="inputDisabled" v-model.trim="plan.projectType" placeholder="应用场景">
              <el-option
                v-for="item in projectTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

<!--          <el-form-item label="备注:" :label-width="formLabelWidth">-->
<!--            <el-input :disabled="inputDisabled" v-model="plan.notes" auto-complete="off"></el-input>-->
<!--          </el-form-item>-->
        </el-form>
        <div v-if="showSaveOrUpdate" slot="footer" class="dialog-footer" style="float: right;">
          <el-button @click="rest">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdateForm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="上传"
      :visible.sync="dialogExcelVisible"
      @close="closeDialog"
      :close-on-click-modal="false"
      width="500px"
    >
      <div class="daoru-wrapper">
        <import-upload ref="myChild" v-on:importHandel="setImport" v-bind:uploadVal="uploadVal"></import-upload>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "~/config/http";
import Pagination from "~/components/Pagination";
import importUpload from "~/components/upload/importUpload";
export default {
  name: "Merchant",
  components: {
    Pagination,
    importUpload
  },
  props: ["facilitiesInData"],
  data() {
    return {
      dialogExcelVisible: false,
      uploadVal: {},
      buildList: [], //楼栋
      floorList: [], //楼层
      formInline: {
        buildId: null,
        buildName: null,
        floorId: null,
        floorName: null,
        deviceId: null,
        locationId: null,
        locationAddress: null
      },
      status:1,
      stateList:[
        {value:'',label:"全部"},
        {value:1,label:"在用"},
        {value:0,label:"停用"}
      ],
      searchFormLabelWidth: "80px",
      projectTypeList: [
        { id: 1, name: "家庭" },
        { id: 2, name: "商铺" },
        { id: 3, name: "出租屋" }
      ],
      widgetInfo: {
        total: null,
        pageSize: 6,
        pageNo: 1
      },
      tableData: [],
      isLoading: false,
      dialogFormVisible: false,
      plan: {
        floorId: null
      },
      formLabelWidth: "140px",
      optTitle: null,
      inputDisabled: false,
      showSaveOrUpdate: false,
      optMode: null,
      loading: false
    };
  },
  mounted() {
    this.findBuildByUnitId();
    // this.loadData();
  },
  methods: {
    rest(){
      this.dialogFormVisible = false;
      this.loadData("load");
    },
    closeDialog() {
      //调用子组件方法
      this.$refs.myChild.ResetOrCloseBtn();
    },
    setImport() {
      this.dialogExcelVisible = false;
      this.loadData("search");
    },
    dialogShow() {
      this.dialogExcelVisible = true;
      this.uploadVal = {
        fileId: this.facilitiesInData.id,
        unitId: this.facilitiesInData.unitId,
        operationOrgId: this.facilitiesInData.subCenterCode,
        TabName: "商户"
      };
    },
    resetBtn() {
      var that = this;
      var formInline = that.formInline;
      that.status=1;
      formInline.buildId = null;
      formInline.buildName = null;
      formInline.floorId = null;
      formInline.floorName = null;
      formInline.deviceId = null;
      formInline.locationId = null;
      formInline.locationAddress = null;
      that.loadData("search");
    },
    //查询单位下面的楼栋信息
    findBuildByUnitId() {
      this.isLoading = true;
      api
        .post("/remoteApi/tool/build/findBuildByUnitId", {
          unitId: this.facilitiesInData.unitId
        })
        .then(res => {
          this.isLoading = false;
          if (res && res.code === "success") {
            this.buildList = res.data;
          } else {
            console.log("没有数据");
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message({
            type: "warning",
            message: "加载超时,请重新加载!"
          });
        });
    },
    //联动楼层信息
    getFloorInfo(buildId, cb) {
      // this.plan.buildName = this.buildList.find(item => {
      //   return item.buildId === buildId;
      // }).buildName;
      this.floorList = null;
      this.formInline.floorId = null;
      this.plan.floorId = null;
      this.isLoading = true;
      api
        .post("/remoteApi/tool/floor/getFloorInfoByUnitIdAndBuildId", {
          unitId: this.facilitiesInData.unitId,
          buildId: buildId
        })
        .then(res => {
          this.isLoading = false;
          if (res && res.code === "success") {
            this.floorList = res.data;
            if (cb) {
              cb = cb();
            }
          } else {
            console.log("没有数据");
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message({
            type: "warning",
            message: "加载超时,请重新加载!"
          });
        });
    },

    loadData(pagenoFlag) {
      this.isLoading = true;
      if (pagenoFlag == "search") {
        this.widgetInfo.pageNo = 1;
      }
      api
        .post("/remoteApi/tool/location/findRecordEnterpriseLocationList", {
          unitId: this.facilitiesInData.unitId,
          buildId: this.formInline.buildId,
          //buildName: this.formInline.buildName,
          floorId: this.formInline.floorId,
          //floorName: this.formInline.floorName,
          status:this.status,
          locationId:this.formInline.locationId,
          locationAddress:this.formInline.locationAddress,
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo
        })
        .then(res => {
          if (res.code === "success") {
            // console.log(res)
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.tableData.forEach(item => {
              item.stateName = this.stateList.find(
                      stateItem => stateItem.value == item.status
              ).label;
            });
            this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
            this.widgetInfo.pageSize = res.data.pageSize;
            this.widgetInfo.pageNo = res.data.pageNo;
          }
        })
        .catch(err => {
          // console.log(err);
          this.isLoading = false;
          this.$message({
            type: "warning",
            message: "加载超时,请重新加载!"
          });
        });
    },
    // 分页
    sonHandleCurrentChange(widgetInfo) {
      this.widgetInfo.pageSize = widgetInfo.pageSize
        ? parseInt(widgetInfo.pageSize)
        : this.widgetInfo.pageSize;
      this.widgetInfo.pageNo = widgetInfo.pageNo
        ? parseInt(widgetInfo.pageNo)
        : this.widgetInfo.pageNo;
      this.loadData("load");
    },
    handleEditPlan(method, planObj) {
      this.optMode = method;
      if ("add" == method) {
        //新增
        this.dialogFormVisible = true;
        this.optTitle = "新增";
        this.plan = {
          floorId: null
        };
        this.inputDisabled = false;
        this.showSaveOrUpdate = true;
      } else if ("edit" == method) {
        //编辑
        this.dialogFormVisible = true;
        this.optTitle = "编辑";
        this.getFloorInfo(planObj.buildId, () => {
          this.plan = planObj;
          this.plan.cretedBy = api.getGlobalVal("userObj").id;
          this.plan.trialId = this.facilitiesInData.id;
          this.inputDisabled = false;
          this.showSaveOrUpdate = true;
        });
      } else if ("delete" == method) {
        //删除
        this.deleteHandle(planObj);
      } else {
        //查看
        this.dialogFormVisible = true;
        this.optTitle = "查看";
        this.viewHandle(planObj);
      }
      //console.log(this.plan)
    },
    viewHandle(planObj) {
      let that = this;
      that.isLoading = true;
      api
        .post(
          "/remoteApi/tool/location/findRecordEnterpriseLocationByLocationId",
          {
            locationId: planObj.locationId
          }
        )
        .then(res => {
          that.isLoading = false;
          if (res && res.code === "success") {
            that.getFloorInfo(planObj.buildId, () => {
              that.plan = res.data;
              that.plan.cretedBy = api.getGlobalVal("userObj").id;
              that.inputDisabled = true;
              that.showSaveOrUpdate = false;
            });
          }
        })
        .catch(err => {
          console.log(err);
          that.isLoading = false;
        });
    },
    deleteHandle(planObj) {
      //删除
      let that = this;
      that.plan = JSON.parse(JSON.stringify(planObj));
      that
        .$confirm("确定要停用吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.isLoading = true;
          api
            .post(
              "/remoteApi/tool/location/deleteRecordEnterpriseLocationInfo",
              {
                locationId: that.plan.locationId,
                trialId: this.facilitiesInData.id,
                cretedBy: api.getGlobalVal("userObj").id
              }
            )
            .then(res => {
              that.isLoading = false;
              if (res && res.code === "success") {
                that.$message({
                  message: "已停用",
                  type: "success"
                });
                that.loadData("search");
              } else {
                that.$message({
                  message: "停用异常",
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
              that.isLoading = false;
            });
        })
        .catch(() => {});
    },
    saveOrUpdateForm() {
      //保存或更新操作
      let that = this;
      if (!that.plan.locationName) {
        that.$message({
          type: "warning",
          message: "地点位置名称不能为空"
        });
        return;
      }
      if (!that.plan.locationAddress) {
        that.$message({
          type: "warning",
          message: "地点位置详情不能为空"
        });
        return;
      }
      if (!that.plan.locationPointX || isNaN(that.plan.locationPointX)) {
        that.$message({
          type: "warning",
          message: "地点位置纬度不能为非数字"
        });
        return;
      }
      if (!that.plan.locationPointY || isNaN(that.plan.locationPointY)) {
        that.$message({
          type: "warning",
          message: "地点位置经度不能为非数字"
        });
        return;
      }
      if (!that.plan.buildId) {
        that.$message({
          type: "warning",
          message: "请选择楼栋"
        });
        return;
      }
      if (!that.plan.floorId) {
        that.$message({
          type: "warning",
          message: "请选择楼层"
        });
        return;
      }
      if ("add" == that.optMode) {
        that.plan.cretedBy = api.getGlobalVal("userObj").id;
        that.plan.unitId = this.facilitiesInData.unitId;
        that.plan.trialId = this.facilitiesInData.id;
        that.isLoading = true;
        api
          .post(
            "/remoteApi/tool/location/addRecordEnterpriseLocationInfo",
            that.plan
          )
          .then(res => {
            that.isLoading = false;
            if (res && res.code === "success") {
              that.dialogFormVisible = false;
              that.$message({
                message: "保存成功",
                type: "success"
              });
              that.loadData("search");
            } else {
              that.$message({
                message: "保存失败",
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
            that.isLoading = false;
          });
      } else if ("edit" == that.optMode) {
        that.plan.cretedBy = api.getGlobalVal("userObj").id;
        that.plan.unitId = this.facilitiesInData.unitId;
        that.plan.trialId = this.facilitiesInData.id;
        that.isLoading = true;
        api
          .post(
            "/remoteApi/tool/location/updateRecordEnterpriseLocationInfo",
                  that.plan
          )
          .then(res => {
            if (res && res.code === "success") {
              that.isLoading = false;
              that.dialogFormVisible = false;
              that.$message({
                message: "更新成功",
                type: "success"
              });
              that.loadData("load");
            } else {
              that.isLoading = false;
              that.$message({
                message: "更新失败",
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
            that.isLoading = false;
          });
      } else {
        console.log("异常保存或更新模式");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/editArchivesPoint.scss";
.storied-suilding-wrapper {
  /deep/.demo-table-expand {
    .el-form-item {
      label {
        width: 95px;
      }
      .el-form-item__content {
        width: calc(100% - 95px);
      }
      &.t-right .el-form-item__content {
        width: 100%;
      }
      .el-button + .el-button {
        margin-left: 5px;
      }
    }
  }
  /deep/.el-table {
    .el-table__body-wrapper {
      height: calc(100vh - 90px - 60px - 140px - 95px - 55px);
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
.plxg-wrap {
  height: 100px;
  .demo-dynamic {
    height: 100px !important;
    .form-list-wrapper {
      height: 100px !important;
    }
  }
}
</style>