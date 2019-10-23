<!-- card -->
<template>
  <!-- 地图组件容器 -->
  <div>
    <el-form :inline="true" class="demo-form-inline filterAll">
      <el-row :model="formInline">
        <el-col :span="22">
          <el-row type="flex" justify="start">
            <el-col :span="5" class="text-2">
              <label>楼栋：</label>
              <el-select v-model.trim="formInline.area" placeholder="" @change="selectTypeName">
                <el-option v-for="item in areaOpts" :key="item.buildId" :label="item.buildName" :value="item.buildId"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="text-4">
              <label>设备类型：</label>
              <el-select v-model.trim="formInline.deviceSys" placeholder="全部" @change="selectDeviceSys">
                <el-option v-for="item in deviceSys" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="text-4">
              <label>设施名称：</label>
              <el-select v-model.trim="formInline.device" placeholder="全部" @change="selectDevice">
                <el-option v-for="item in optsTemp" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="text-3">
              <label>设备Id：</label>
              <el-input v-model="formInline.deviceId"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button size="mini" type="primary" @click="searchBtn">查询</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="1" style="tetx-align:right">
          <!-- <span :class="[bigIcon,'build-enlargeBtn']" @click="showBigScreen"></span> -->
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>
<script>
import api from "~/config/http";
import monitorFloorCrud from "~/assets/page/real-time-monitoring/js/monitorFloorCrud";
export default {
  props: {
    bigScreen: Boolean
  },
  data() {
    return {
      bigFlag: true,
      //bigIcon: (this.bigScreen ? 'icon-narrow' : 'icon-enlarge'),
      buildName: '',
      formInline: {
        area: '',
        deviceSys: '00000000',
        device: '00000000',
        deviceStatus: '',
        deviceId: '',
      },
      areaOpts: [],
      deviceSys: [{
        value: '00000000',
        label: '全部'
      }],
      optsTemp: [{
        value: '00000000',
        label: '全部'
      }],
      deviceStatus: [{
        value: '',
        label: '全部'
      },
      {
        value: '0',
        label: '正常'
      },
      {
        value: '1',
        label: '报警'
      },
      {
        value: '2',
        label: '故障'
      },
      {
        value: '98',
        label: '预警'
      }
      ],
      ZS: {
        MONITOR: {}
      }

    };
  },
  created() {
    
  },
  mounted() {
    this.$store.commit('updateFloorDetail', Math.random());
    this.formInline.area = this.$store.state.ZS.MONITOR.currentBuild;
    this.createBuildSelect();
    this.createDeviceTypeSelect();
    this.$store.commit('updateShUnitId', localStorage.getItem("unitId"))
		this.getLouDong();
    //monitorFloorCrud.createBuildSelect('floor-build-select');    
  },
  methods: {
    showBigScreen: function () {
      // this.bigFlag = !this.bigFlag;
      // this.bigIcon = this.bigFlag ? 'icon-narrow' : 'icon-enlarge';
      this.$emit("showBigScreen", this.bigFlag);
    },
    backMap: function (val) {
      this.$emit("showBigScreen", !this.bigFlag);
      this.$store.commit('updateFloorDetail', Math.random());
      this.$emit('changeShow', true);

    },
    //区域（选择建筑下拉框）
    createBuildSelect: function () {
      let buildData = this.$store.state.ZS.MONITOR.buildData;
      if (buildData) {
        for (var key in buildData) {
          var temp = {};
          temp.value = buildData[key].buildId;
          temp.label = buildData[key].buildName;
          this.buildName = buildData[0].buildName
          this.areaOpts.push(temp);
        }
      }
    },
    //获取楼栋
    getLouDong: function () {
      var _this = this;
      //this.$store.commit('updateShUnitId', this.$route.params.unitId);
			var unitId = this.$store.state.shUnitId;
      api.post("/remoteApi/tool/build/findBuildByUnitId", { unitId: unitId }).then(data => {
        if(data.data){
        	_this.areaOpts = data.data;
	        _this.formInline.area = this.$store.state.shBuildId ? this.$store.state.shBuildId :  data.data[0].buildId;
        }
      })

    },
    /**
     *  创建设备类型下拉框
     */
    createDeviceTypeSelect: function () {
      var that = this;
      that.ZS.MONITOR.deviceQueryType = '';
      api.post("/remoteApi/tool/deviceInfo/getDeviceTypeInfoList").then(data => {
        var data = data['data'] || [];
        that.ZS.MONITOR.deviceType = that.toTreeData(data);

        // 设备大类
        if (that.ZS.MONITOR.deviceType[0] != undefined) {
          var type1Arr = that.ZS.MONITOR.deviceType[0].children;
          for (var key in type1Arr) {
            var temp = {};
            temp.value = type1Arr[key].id;
            temp.label = type1Arr[key].name;
            that.deviceSys.push(temp);
          }
        }
      })
    },
    selectTypeName: function (val) {
      let obj = {};
      obj = this.areaOpts.find((item) => {
        return item.buildId === val;
      });
      this.buildName = obj.buildName;
    },

    /**
     *  设备类型点击事件
     */
    selectDeviceSys: function (val) {
      var that = this;
      that.optsTemp = [{
        value: '00000000',
        label: '全部'
      }];

      that.formInline.device = '00000000'
      if(val =='00000000'){
        that.ZS.MONITOR.deviceQueryType =null;
      }else{
        if (that.ZS.MONITOR.deviceType[0] != undefined) {
        var type1Arr = that.ZS.MONITOR.deviceType[0].children;
        for (var key in type1Arr) {
          if (type1Arr[key].id == val) {
            var typeStr = ''; //设备类型查询
            var type2Arr = type1Arr[key].children;
            for (var key2 in type2Arr) {
              var temp = {};
              temp.value = type2Arr[key2].id;
              temp.label = type2Arr[key2].name;
              that.optsTemp.push(temp);
              typeStr = typeStr + ',' + temp.value;
            }
            if (typeStr.length > 0) {
              that.ZS.MONITOR.deviceQueryType = typeStr.substr(1);
            }
          }
        }
      }
      }
    },
    selectDevice: function (val) {
      var that = this;
      if (val == '00000000') {
        var typeStr = '';
        for (var key in this.options) {
          if (this.options[key].value != '00000000') {
            typeStr = typeStr + ',' + this.options[key].value;
          }
        }
        if (typeStr.length > 0) {
          that.ZS.MONITOR.deviceQueryType = typeStr.substr(1);
        }
      } else {
        that.ZS.MONITOR.deviceQueryType = val;
      }
    },

    /**
     *  创建设备状态下拉框
     * @private
     */
    createDeviceStatusSelect: function () {

    },
    /**
     *  将设备类型原始数据转为树形结构
     * @param data
     * @returns {Array}
     * @private
     */
    toTreeData: function (data) {
      var pos = {};
      var tree = [];
      var i = 0;
      while (data.length != 0) {
        if (data[i].parentid == -1) {
          tree.push({
            id: data[i].id,
            name: data[i].name,
            children: []
          });
          pos[data[i].id] = [tree.length - 1];
          data.splice(i, 1);
          i--;
        } else {
          var posArr = pos[data[i].parentid];
          if (posArr != undefined) {

            var obj = tree[posArr[0]];
            for (var j = 1; j < posArr.length; j++) {
              obj = obj.children[posArr[j]];
            }

            obj.children.push({
              id: data[i].id,
              name: data[i].name,
              children: []
            });
            pos[data[i].id] = posArr.concat([obj.children.length - 1]);
            data.splice(i, 1);
            i--;
          }
        }
        i++;
        if (i > data.length - 1) {
          i = 0;
        }
      }
      return tree;
    },
    searchBtn: function () {
      var that = this;
      this.$store.commit('updateZSCurrentBuildname', this.buildName);
      this.$store.commit('updateZSCurrentBuild', this.formInline.area);
      this.$store.commit('updateZSdeviceId', this.formInline.deviceId);
      // this.$store.commit('updateZSdeviceStatus', that.formInline.deviceStatus);
      this.$store.commit('updateZSdeviceTypeId', this.ZS.MONITOR.deviceQueryType);
      this.$emit("searchFloor", {
        //deviceTypeId: that.ZS.MONITOR.deviceQueryType,
        buildId: that.formInline.area,
        unitId:that.$store.state.shUnitId,
        floorId:that.$store.state.ZS.MONITOR.currentFloor,
        deviceId: that.formInline.deviceId,
        deviceTypeIds:that.ZS.MONITOR.deviceQueryType
      })
      // debugger;
    }
  },
  watch: {
    '$store.state.floorDetail': function (newVal, oldVal) {
      // this.bigFlag = !this.bigScreen
      this.showBigScreen();
    },
    'this.$store.state.shUnitId':function(newVal, oldVal){
//  	this.$store.state.shUnitId = newVal;
			console.log(newVal, oldVal,"newVal, oldVal")
    }

  }
}

</script>
<style scoped lang="scss">
.filterAll {
  padding: 9px 0 0 10px;
  height: 50px;
  box-sizing: border-box;

  label {
    padding-right: 0;
  }

  .text-2 label {
    width: 46px;
  }

  .text-2 .el-select {
    width: calc(100% - 56px);
  }

  .new-img {
    position: relative;
    top: 5px;
    cursor: pointer;
  }

  .build-enlargeBtn {
    position: relative;
    top: -3px;
  }

  .icon-enlarge {
    display: inline-block;
    width: 38px;
    height: 38px;
    cursor: pointer;
  }

  .icon-narrow {
    display: inline-block;
    width: 38px;
    height: 38px;
    cursor: pointer;
  }

  .icon-enlarge {
    background: url(../../assets/img/icon-enlarge.png) no-repeat;
  }

  .icon-narrow {
    background: url(../../assets/img/icon-narrow.png) no-repeat;
  }
}
</style>
