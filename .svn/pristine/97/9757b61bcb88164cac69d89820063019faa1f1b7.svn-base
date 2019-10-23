<template>
  <div class="storied-suilding-wrapper">
    <div>
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="楼栋ID:" :label-width="searchFormLabelWidth" style="width: 20%">
          <el-input v-model="buildId"></el-input>
        </el-form-item>
        <el-form-item label="楼栋名称" :label-width="searchFormLabelWidth" style="width: 20%">
          <el-input v-model="buildName"></el-input>
        </el-form-item>
        <el-form-item label="状态:" :label-width="searchFormLabelWidth" style="width: 20%">
          <el-select  v-model="status"  filterable placeholder="请选择">
            <el-option v-for="item in stateList" :key="item.id" :label="item.name" :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label class="t-right" style="width: 40%">
          <el-button @click="resetBtn">重置</el-button>
          <el-button type="primary"  @click="loadData('search')">搜索</el-button>
          <el-button type="success" @click="dialogShow" v-if="facilitiesInData.limtShow">导入</el-button>
          <el-button
            type="warning"
            @click="handleEditPlan('add')"
            class="mag-right-10"
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
            min-width="20%"
            :show-overflow-tooltip="true"
            pageSize="pageSize"
            prop="buildId"
            label="楼栋ID"
          ></el-table-column>
          <el-table-column
            align="left"
            min-width="15%"
            :show-overflow-tooltip="true"
            prop="buildName"
            label="楼栋名称"
          ></el-table-column>
          <el-table-column
            align="left"
            min-width="10%"
            :show-overflow-tooltip="true"
            prop="buildArea"
            label="建筑面积"
          ></el-table-column>
          <el-table-column
            align="left"
            min-width="10%"
            :show-overflow-tooltip="true"
            prop="areaCovered"
            label="占地面积"
          ></el-table-column>
          <el-table-column
            align="left"
            min-width="10%"
            :show-overflow-tooltip="true"
            prop="standardArea"
            label="标准层面积"
          ></el-table-column>
          <el-table-column
                  align="left"
                  min-width="8%"
                  :show-overflow-tooltip="true"
                  prop="stateName"
                  label="状态"
          ></el-table-column>
          <el-table-column align="center" min-width="15%" label="操作">
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
                :disabled="scope.row.status=='0' ? false : true"
              >停用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange"/>
    </div>
    <el-dialog :title="optTitle" :visible.sync="dialogFormVisible" width="960px">
      <div style="height:400px;overflow-x: hidden;overflow-y: auto;" ref="dialogScoll">
        <el-form :model="plan" label-position="left" inline class="demo-table-expand dialog-expand">
          <el-form-item label="楼栋ID:" :label-width="formLabelWidth" v-if="optMode != 'add'">
            <el-input disabled v-model="plan.buildId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="建筑物名称:"
            :label-width="formLabelWidth"
            :rules="{
      required: true, message: '建筑物名称不能为空', trigger: 'blur'
    }"
          >
            <el-input :disabled="inputDisabled" v-model="plan.buildName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="室内室外:"
            :label-width="formLabelWidth"
            :rules="{
      required: true, message: '室内室外不能为空', trigger: 'blur'
    }"
          >
            <el-select
              :disabled="inputDisabled"
              v-model="plan.outFlag"
              size="mini"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in outFlagList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="占地面积(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.areaCovered" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="建筑面积(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.buildArea" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="建筑高度(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.buildHight" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="标准层面积(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.standardArea" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="经度(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.longitude" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="纬度(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.latitude" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="建造日期:" :label-width="formLabelWidth">
            <el-date-picker
              :size="formLabelWidth"
              :disabled="inputDisabled"
              v-model="plan.constructionDate"
              type="date"
              placeholder="选择建造日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="竣工日期:" :label-width="formLabelWidth">
            <el-date-picker
              :size="formLabelWidth"
              :disabled="inputDisabled"
              v-model="plan.completionDate"
              type="date"
              placeholder="选择竣工日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="投入使用日期:" :label-width="formLabelWidth">
            <el-date-picker
              :size="formLabelWidth"
              :disabled="inputDisabled"
              v-model="plan.putuseDate"
              type="date"
              placeholder="选择投入使用日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="建筑物类型:" :label-width="formLabelWidth">
            <el-select :disabled="inputDisabled" v-model.trim="plan.buildClass" filterable placeholder="建筑物类型">
              <el-option
                      v-for="item of buildClassList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="火灾危险性:" :label-width="formLabelWidth">
            <el-select :disabled="inputDisabled" v-model.trim="plan.fireRisk" filterable placeholder="火灾危险性">
              <el-option
                      v-for="item of fireRiskList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="防火等级:" :label-width="formLabelWidth">
            <el-select :disabled="inputDisabled" v-model.trim="plan.fireRating" filterable placeholder="防火等级">
              <el-option
                      v-for="item of fireRatingList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建筑结构:" :label-width="formLabelWidth">
            <el-select :disabled="inputDisabled" v-model.trim="plan.buildStructure" filterable placeholder="建筑结构">
              <el-option
                      v-for="item of buildStructureList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地上层数(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.upFloor" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="地上面积(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.upArea" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="地下层数(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.downFloor" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="避难层数量(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.refugeCount" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="避难层面积(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.refugeArea" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="避难层位置(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.refugeSite" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="隧道高度(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.tunnelHight" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="隧道长度(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.tunnelLength" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="楼栋安全出口数:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.exitNum" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="疏散楼梯数(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.stairsNum" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="消防电梯个数(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.elevatorCount" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="是否有消控室:" :label-width="formLabelWidth">
            <el-select :disabled="inputDisabled" v-model.trim="plan.hasFcroom" filterable placeholder="请选择">
              <el-option
                      v-for="item of hasFcroomList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消控室数量(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.fcroomNum" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="消控室名称:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.fcroomName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="消控室位置:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.fcroomSite" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="消防室电话:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.fcroomTelephone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="消防工程设计单位:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.designUnit" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="建造单位:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.buildUnit" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="维保单位:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.maintenanceUnit" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="竣工验收检测单位:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.acceptanceUnit" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="历年年度检测单位:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.detectionUnit" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="维保单位联系方式:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.maintenanceTel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所有电梯个数(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.allelevatorCount" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="建筑物、楼栋的立面图:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.buildImg" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="系统图:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.systemDiagram" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="室外消防管网设计平面图:" :label-width="formLabelWidth">
            <el-input
              :disabled="inputDisabled"
              v-model="plan.outdoor_pipenetwork"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="其他建筑楼栋图纸:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.otherDrawing" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="建筑物位置:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.buildSite" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="子类:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.buildSubClass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="子使用性质:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.buildSubUsed" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="使用性质:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.buildUsed" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="产权情况:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.propertyRight" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="最大容纳人数(数字):" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.maxPerson" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>

          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input :disabled="inputDisabled" v-model="plan.remark" auto-complete="off"></el-input>
          </el-form-item>
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
  name: "StoriedSuilding",
  props: ["facilitiesInData"],
  components: {
    Pagination,
    importUpload
  },
  data() {
    return {
      editFlag: true,
      outFlagList: [{ id: 0, name: "室内" }, { id: 1, name: "室外" }], //室内室外
      widgetInfo: {
        total: null,
        pageSize: 6,
        pageNo: 1
      },
      status:0,
      stateList: [{ id: '', name: "全部" },{ id: 0, name: "在用" }, { id: 1, name: "停用" }],
      buildId: null,
      buildName: null,
      tableData: [],
      isLoading: false,
      dialogFormVisible: false,
      dialogExcelVisible: false,
      plan: {},
      searchFormLabelWidth: "80px",
      formLabelWidth: "100%",
      optTitle: null,
      inputDisabled: false,
      showSaveOrUpdate: false,
      optMode: null,
      uploadVal: {},
      buildClassList:[{id: '', name: "请选择"},
        {id: '01', name: "超高层建筑"},
        {id: '02', name: "一类高层建筑"},
        {id: '03', name: "二类高层建筑"},
        {id: '04', name: "高层厂房"},
        {id: '05', name: "高层库房"},
        {id: '06', name: "低层民用建筑"},
        {id: '07', name: "低层厂房"},
        {id: '08', name: "低层库房"},
        {id: '09', name: "地下建筑"},
        {id: '99', name: "其他建筑"}
      ],
      fireRiskList:[{id: '', name: "请选择"},
        {id: '01', name: "甲"},
        {id: '02', name: "乙"},
        {id: '03', name: "丙"},
        {id: '04', name: "丁"},
        {id: '05', name: "戊"},
        {id: '06', name: "一类住宅建筑"},
        {id: '07', name: "二类住宅建筑"},
        {id: '08', name: "一类公共建筑"},
        {id: '09', name: "二类公共建筑"}
      ],
      fireRatingList:[{id: '', name: "请选择"},
        {id: '1', name: "一级"},
        {id: '2', name: "二级"},
        {id: '3', name: "三级"},
        {id: '4', name: "四级"}
      ],
      buildStructureList:[{id: '', name: "请选择"},
        {id: '1', name: "砖木结构"},
        {id: '2', name: "混合结构"},
        {id: '3', name: "轻钢结构"},
        {id: '4', name: "钢结构"},
        {id: '5', name: "钢筋混凝土结构"},
        {id: '9', name: "其他结构"}
      ],
      hasFcroomList:[{id: '', name: "请选择"},
        {id: '0', name: "是"},
        {id: '1', name: "否"}
      ]
    };
  },
  mounted() {
    var that = this;
    // that.loadData();
  },
  methods: {
    rest(){
      this.dialogFormVisible = false;
      this.loadData("load");
    },
    //滚动到顶部的方法
    closeDialog() {
      //调用子组件方法
      this.$refs.myChild.ResetOrCloseBtn();
    },
    setImport() {
      this.dialogExcelVisible = false;
      this.loadData('load');
    },
    dialogShow() {
      this.dialogExcelVisible = true;

      this.uploadVal = {
        fileId: this.facilitiesInData.id,
        unitId: this.facilitiesInData.unitId,
        operationOrgId: this.facilitiesInData.subCenterCode,
        TabName: "楼栋"
      };
    },
    resetBtn() {
      this.buildId = null;
      this.buildName = null;
      this.status = 0;
      this.loadData('search');
    },
    loadData(pagenoFlag) {
      this.isLoading = true;
      if(pagenoFlag=='search'){
        this.widgetInfo.pageNo = 1
      }
      api
        .post("/remoteApi/tool/build/findBuildForPage", {
          unitId: this.facilitiesInData.unitId,
          buildId: this.buildId,
          buildName: this.buildName,
          status: this.status,
          pageNo: this.widgetInfo.pageNo,
          pageSize: this.widgetInfo.pageSize
        })
        .then(res => {
          this.isLoading = false;
          if (res && res.code === "success") {
            this.tableData = res.data.rows;
            this.tableData.forEach(item => {
              item.stateName = this.stateList.find(
                      stateItem => stateItem.id == item.status
              ).name;
            });
            this.widgetInfo.total =
              res.data.total === null ? 0 : res.data.total;
          } else {
            this.tableData = [];
            this.widgetInfo.list = res.data.rows;
            this.widgetInfo.total = 0;
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
    // 分页
    sonHandleCurrentChange(widgetInfo) {
      this.widgetInfo.pageSize = widgetInfo.pageSize
        ? parseInt(widgetInfo.pageSize)
        : this.widgetInfo.pageSize;
      this.widgetInfo.pageNo = widgetInfo.pageNo
        ? parseInt(widgetInfo.pageNo)
        : this.widgetInfo.pageNo;
      this.loadData('load');
    },
    handleEditPlan(method, planObj) {
      this.optMode = method;

      if ("add" == method) {
        //新增
        this.dialogFormVisible = true;
        this.optTitle = "新增";
        this.plan = {};
        this.inputDisabled = false;
        this.showSaveOrUpdate = true;
        this.editFlag = false;
        this.$nextTick(() => {
          this.$refs.dialogScoll.scrollTop = 0;
        })

      } else if ("edit" == method) {
        //编辑
        this.dialogFormVisible = true;
        this.optTitle = "编辑";
        this.plan = JSON.parse(JSON.stringify(planObj));
        this.inputDisabled = false;
        this.showSaveOrUpdate = true;
        this.editFlag = false;
        this.$nextTick(() => {
          this.$refs.dialogScoll.scrollTop = 0;
        })

      } else if ("delete" == method) {
        //删除
        this.deleteHandle(planObj);
      } else {
        //查看
        this.dialogFormVisible = true;
        this.optTitle = "查看";
        this.plan = JSON.parse(JSON.stringify(planObj));
        this.inputDisabled = true;
        this.showSaveOrUpdate = false;
        this.editFlag = true;
        this.$nextTick(() => {
          this.$refs.dialogScoll.scrollTop = 0;
        })
      }

    },
    deleteHandle(planObj) {
      //删除
      var that = this;
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
            .post("/remoteApi/tool/build/deleteBuildById", {
              id: that.plan.id,
              userId: api.getGlobalVal("userObj").id,
              trailId: that.facilitiesInData.id
            })
            .then(res => {
              that.isLoading = false;
              if (res && res.code === "success") {
                that.$message({
                  message: "已停用",
                  type: "success"
                });

                that.loadData('search');
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
      //时间格式化工具
      Date.prototype.format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      };
      var that = this;
      if (
        null != that.plan.constructionDate &&
        that.plan.constructionDate instanceof Date
      ) {
        that.plan.constructionDate = that.plan.constructionDate.format(
          "yyyy-MM-dd"
        );
      }
      if (
        null != that.plan.completionDate &&
        that.plan.completionDate instanceof Date
      ) {
        that.plan.completionDate = that.plan.completionDate.format(
          "yyyy-MM-dd"
        );
      }
      if (
        null != that.plan.putuseDate &&
        that.plan.putuseDate instanceof Date
      ) {
        that.plan.putuseDate = that.plan.putuseDate.format("yyyy-MM-dd");
      }

      var reg=/^[0-9]+.?[0-9]*$/;
      if(that.plan.areaCovered && !reg.test(that.plan.areaCovered)){
        that.$message({
          message: "占地面积请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.buildArea && !reg.test(that.plan.buildArea)){
        that.$message({
          message: "建筑面积请输入数字",
          type: "warning"
        });
        return;
      }
      if(that.plan.buildHight && !reg.test(that.plan.buildHight)){
        that.$message({
          message: "建筑高度输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.standardArea && !reg.test(that.plan.standardArea)){
        that.$message({
          message: "标准层面积输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.longitude && !reg.test(that.plan.longitude)){
        that.$message({
          message: "经度请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.latitude && !reg.test(that.plan.latitude)){
        that.$message({
          message: "纬度请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.upFloor && !reg.test(that.plan.upFloor)){
        that.$message({
          message: "地上层数请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.upArea && !reg.test(that.plan.upArea)){
        that.$message({
          message: "地上面积请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.downFloor && !reg.test(that.plan.downFloor)){
        that.$message({
          message: "地下层数请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.refugeCount && !reg.test(that.plan.refugeCount)){
        that.$message({
          message: "避难层数量请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.refugeArea && !reg.test(that.plan.refugeArea)){
        that.$message({
          message: "避难层面积请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.tunnelHight && !reg.test(that.plan.tunnelHight)){
        that.$message({
          message: "隧道高度请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.tunnelLength && !reg.test(that.plan.tunnelLength)){
        that.$message({
          message: "隧道长度输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.exitNum && !reg.test(that.plan.exitNum)){
        that.$message({
          message: "楼栋安全出口数请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.stairsNum && !reg.test(that.plan.stairsNum)){
        that.$message({
          message: "疏散楼梯数请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.elevatorCount && !reg.test(that.plan.elevatorCount)){
        that.$message({
          message: "消防电梯个数请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.fcroomNum && !reg.test(that.plan.fcroomNum)){
        that.$message({
          message: "消控室数量请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.allelevatorCount && !reg.test(that.plan.allelevatorCount)){
        that.$message({
          message: "所有电梯个数请输入数字",
          type: "warning"
        });
        return;
      };
      if(that.plan.maxPerson && !reg.test(that.plan.maxPerson)){
        that.$message({
          message: "最大容纳人数请输入数字",
          type: "warning"
        });
        return;
      };

      if ("add" == that.optMode) {
       if (!that.plan.buildName) {
          this.$message({
            type: "warning",
            message: "楼栋名称必填"
          });
          return;
        }
        if (that.plan.outFlag === "" || that.plan.outFlag === null  || that.plan.outFlag === undefined) {
          this.$message({
            type: "warning",
            message: "请选择室内外"
          });
          return;
        }
        that.plan.createUserId = api.getGlobalVal("userObj").id;
        that.plan.unitId = this.facilitiesInData.unitId;
        that.plan.trailId = that.facilitiesInData.id;
        that.isLoading = true;
        api
          .post("/remoteApi/tool/build/addBuild", that.plan)
          .then(res => {
            that.isLoading = false;
            if (res && res.code === "success") {
              that.dialogFormVisible = false;
              that.$message({
                message: "保存成功",
                type: "success"
              });
              that.loadData('search');
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
        if (that.plan.buildName == ""  || that.plan.outFlag == null) {
          this.$message({
            type: "warning",
            message: "楼栋名称必填"
          });
          return;
        }
        if (that.plan.outFlag === "" || that.plan.outFlag === null  || that.plan.outFlag === undefined) {
          //debugger
          this.$message({
            type: "warning",
            message: "请选择室内外"
          });
          return;
        }
        that.plan.updateUser = api.getGlobalVal("userObj").id;
        that.plan.unitId = this.facilitiesInData.unitId;
        that.plan.trailId = that.facilitiesInData.id;

        that.isLoading = true;
        api
          .post("/remoteApi/tool/build/updateBuildByBuildId", that.plan)
          .then(res => {
            that.isLoading = false;
            if (res && res.code === "success") {
              that.dialogFormVisible = false;
              that.$message({
                message: "更新成功",
                type: "success"
              });
              that.loadData('load');
            } else {
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
        width: calc(100% - 105px);
      }
    }
  }
  /deep/.el-table {
    .el-table__body-wrapper {
      height: calc(100vh - 90px - 60px - 140px - 95px);
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>



