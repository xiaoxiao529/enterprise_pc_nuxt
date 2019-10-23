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
                  <el-col class="text-4" :span="5" style=" width: 240px">
                    <label>消防系统: </label>
                    <el-select v-model.trim="formInline.deviceId" placeholder=全部 clearable @change="handleFireChange">
                      <el-option :label="item.name" :value="item.id" v-for=" item in deviceType" :key="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col class="text-4" :span="5" style=" width: 240px">
                    <label>消防设备:</label>
                    <el-select v-model.trim="formInline.deviceTypeId" placeholder=全部 clearable class="formwidth" @change="selectEquip">
                      <el-option :label="item.name" :value="item.id" v-for=" item in fireEquip" :key="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col class="text-2" :span="5" style=" width: 240px">
                    <label>楼栋:</label>
                    <el-select v-model.trim="formInline.buildId" placeholder=全部 clearable class="formwidth" @change="selectFloor">
                      <el-option :label="item.buildName" :value="item.buildId" v-for=" item in floors" :key="item.buildId"></el-option>
                    </el-select>
                  </el-col>
                  <el-col class="text-2" :span="5" style=" width: 240px">
                    <label>楼层:</label>
                    <el-select v-model.trim="formInline.floorId" placeholder=请选择 clearable class="formwidth" @change="selectFloorNum">
                      <el-option :label="item.floorName" :value="item.floorId" v-for=" item in floorNum" :key="item.floorId"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4" style="text-align:right;">
                <el-input v-model.trim="formInline.taskNo" placeholder="设施名称" clearable class="formwidth" @change="InputName">
                  <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
                  <!-- <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>-->
                </el-input>
              </el-col>
            </el-row>
          </el-form>
          <div class="notab">
            <el-scrollbar>
              <el-table v-loading="isLoading" :data=" tableData" style="width: 100%;padding:0" stripe>
                <el-table-column prop="deviceId" label="设施编号" align="center">
                </el-table-column>
                <el-table-column :show-overflow-tooltip=true prop="deviceName" label="消防设备" align="center">
                </el-table-column>
                <el-table-column :show-overflow-tooltip=true align="center" prop="buildName" label="楼栋">
                </el-table-column>
                <el-table-column :show-overflow-tooltip=true align="center" prop="floorName" label="楼层">
                </el-table-column>
                <el-table-column :show-overflow-tooltip=true align="center" prop="deviceAddress" label="位置">
                </el-table-column>
                <el-table-column :show-overflow-tooltip=true align="center" prop="brand" label="品牌">
                </el-table-column>
                <el-table-column :show-overflow-tooltip=true align="center" prop="model" label="型号">
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
        deviceId: '',//消防系统id
        deviceTypeId: '',//消防设备id
        pageSize: 6,
        pageNo: 1,
        bgtype: "",
        unitId: 'AHHF_QHHFY_99999997',
        buildId: '',
        floorId: '',
        taskNo: ''
      },
      allFireData: [], //消防系统数据
      fireEquip: [],   //消防设备
      floors: [],      //楼栋
      floorNum: [],    //楼层
      //消防系统
      fireFighting: [{
        fireFightingId: '',
        fireFightingName: ''
      },],
      deviceType: [],
      tableData: [],
      widgetInfo: {
        pageSize: 1,
        pageNo: 6,
        list: '',
        total: null
      }
    }
  },
  mounted() {
    this.getEquipmentType();
    this.getFloor();
  },
  methods: {
    handleFireChange(value) {
      console.log(value);
      this.formInline.deviceId = value;
      // console.log('value',value)
      this.getTableData();
      var arr = [];
      this.allData.filter(e => {
        if (value === e.parentid) {
          arr.push(e)
        }
      });
      this.fireEquip = arr;
    },
    selectEquip(val) {
      this.formInline.deviceTypeId = val;
      this.formInline.pageNo = 1;
      this.getTableData();
    },
    selectFloor(val) {
      this.formInline.buildId = val;
      this.formInline.pageNo = 1;
      this.getTableData();
      this.getFloorNum();
    },
    selectFloorNum(val) {
      this.formInline.floorId = val;
      this.formInline.pageNo = 1;
      this.getTableData();
    },
    handleSearch() {
      this.formInline.pageNo = 1;
      this.getTableData();
    },
    InputName(val) {
      this.formInline.pageNo = 1;
      this.getTableData();
    },
    getEquipmentType() {
      api.post("/remoteApi/tool/deviceInfo/getDeviceInfoList")
        .then(res => {
          if (res.code === "success") {
            this.isLoading = false;
            this.deviceType = res.data;
            var arr = [];
            this.allData = this.deviceType;
            if (this.deviceType && this.deviceType.length > 0) {
              for (var i = 0; i < this.deviceType.length; i++) {
                if (this.deviceType[i].parentid === '00000000') {
                  arr.push(this.deviceType[i]);
                  // console.log(arr,"处理后的数据")
                }
              }
            }
          }
          this.deviceType = arr;
        }).catch(err => {
          this.isLoading = false;
          console.log(err)
        })
      ///api/v1/eRecord/record/enterpriseBulid?unitId=AHHF_QHHFY_20180408
    },//remoteApi/api/v1/eRecord/record/enterpriseBulid?unitId=
    getFloor() {//eRecord/record/enterpriseBulid?unitId=AHHF_QHHFY_99999997
      api.get(api.forent_url.e_record_url + "/record/enterpriseBulid?unitId=" + api.getGlobalVal('userObj').orgCode
      ).then(res => {
        if (res.code === "success") {
          this.floors = res.data;
          //console.log(res.data,"楼栋")
        }
      }).catch(err => {
        console.log(err)
      })

    },
    getFloorNum() {
      api.post('/remoteApi/tool/monitor/getTAndAByUnitIdAndBuildId', {
        unitId: "CKJGQ_20180312",
        buildId: "CKJGQ_20180312_001"
      }).then(res => {
        if (res.code === 'success') {
          this.floorNum = res.data;
          console.log(res.data, "楼层------")
        }
      }).catch(err => {
        console.log(err);
      })
    },
    /*
    * pageNo: 1
    pageSize: 2
    buildId:
    floorId:
    deviceName:
    unitId: AHHF_QHHFY_20180408
    *
    *
    *
    *
    *
    * */
    getTableData() {
      this.isLoading = true;
      api.post(api.forent_url.floor_url + '/eRecord/record/enterpriseDevice/paging', {
        pageNo: this.widgetInfo.pageNo,
        pageSize: this.widgetInfo.pageSize,
        buildId: this.formInline.buildId,
        floorId: this.formInline.floorId,
        deviceName: this.formInline.taskNo,
        deviceTypePId: this.formInline.deviceId ? this.formInline.deviceId : '',
        deviceTypeId: this.formInline.deviceTypeId ? this.formInline.deviceTypeId : '',
        unitId: api.getGlobalVal('userObj').orgCode,
      }, 5000).then(res => {
        if (res && res.code === 'success') {
          //console.log("有数值。。。。")
          this.isLoading = false;
          this.tableData = res.data.rows;
          this.widgetInfo.list = res.data.rows;
          this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
        } else {
          this.isLoading = false;
          this.tableData = [];
          //this.widgetInfo.list = res.data.rows;
          this.widgetInfo.total = 0;
          //console.log('没有数值。。。。。')
        }
      }).catch(err => {
        this.isLoading = false;
        console.log(err)
      })
    },
    sonHandleCurrentChange(widgetInfo) {
      this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
      this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
      this.getTableData();
    }
  }
}

</script>
<style scoped>
@import "~/assets/css/table.scss";
</style>
<style>
.el-tooltip__popper.is-dark {
  max-width: 300px;
}
</style>