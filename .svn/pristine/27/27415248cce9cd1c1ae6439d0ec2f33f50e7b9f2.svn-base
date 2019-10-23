<template>
  <div class="editAll">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单位" name="Company">
        <Company :facilitiesInData="facilitiesInData"></Company>
      </el-tab-pane>
      <el-tab-pane label="楼栋" name="StoriedSuilding">
        <StoriedSuilding :facilitiesInData="facilitiesInData" />
      </el-tab-pane>
      <el-tab-pane label="楼层" name="Floor">
        <Floor :facilitiesInData="facilitiesInData" />
      </el-tab-pane>
      <el-tab-pane label="设备" name="Equipment">
        <Equipment :facilitiesInData="facilitiesInData" />
      </el-tab-pane>
      <el-tab-pane label="消控室" name="ControlRoom">
        <ControlRoom :facilitiesInData="facilitiesInData" />
      </el-tab-pane>
      <el-tab-pane label="消控室人员" name="ControlRoomPersonnel">
        <ControlRoomPersonnel :facilitiesInData="facilitiesInData" />
      </el-tab-pane>
      <el-tab-pane label="视频" name="Video"><Video :facilitiesInData="facilitiesInData" /></el-tab-pane>
      <el-tab-pane label="蓝牙" name="Bluetooth">
        <Bluetooth :facilitiesInData="facilitiesInData" />
      </el-tab-pane>
      <el-tab-pane label="重点部位" name="KeyParts">
        <KeyParts :facilitiesInData="facilitiesInData" />
      </el-tab-pane>
      <el-tab-pane label="商户" name="Merchant">
        <Merchant :facilitiesInData="facilitiesInData" />
      </el-tab-pane>
      <el-tab-pane label="监测中心" name="MonitoringCenter">
        <MonitoringCenter :facilitiesInData="facilitiesInData" />
      </el-tab-pane>
    </el-tabs>

  </div>

</template>
<script>
import api from '~/config/http';
import Title from '~/components/Title';
import Company from '~/components/AddElectronic/Company';
import StoriedSuilding from '~/components/AddElectronic/StoriedSuilding';
import Floor from '~/components/AddElectronic/Floor';
import Equipment from '~/components/AddElectronic/Equipment';
import ControlRoom from '~/components/AddElectronic/ControlRoom';
import ControlRoomPersonnel from '~/components/AddElectronic/ControlRoomPersonnel';
import Video from '~/components/AddElectronic/Video';
import Bluetooth from '~/components/AddElectronic/Bluetooth';
import KeyParts from '~/components/AddElectronic/KeyParts';
import Merchant from '~/components/AddElectronic/Merchant';
import MonitoringCenter from '~/components/AddElectronic/MonitoringCenter';
import CTerminal from '~/components/AddElectronic/CTerminal';
export default {
  components: {
    Title,
    Company,
    StoriedSuilding,
    Floor,
    Equipment,
    ControlRoom,
    ControlRoomPersonnel,
    CTerminal,
    MonitoringCenter,
    Merchant,
    KeyParts,
    Video,
    Bluetooth
  },
  data() {
    return {
      activeName: 'Company',
      show: true,
      facilitiesInData: {
        unitId: this.$route.params.unitId,
        fileId: this.$route.params.fileId,
        subCenterCode: this.$route.params.subCenterCode,
        show: this.$route.params.show
      }
    }
  },
  mounted() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getData() {
      console.log('operationOrgId' + this.facilitiesInData.operationOrgId)
      console.log('oprFlagVal' + this.facilitiesInData.oprFlagVal)
    }
  }
}
</script>
<style lang="scss" scoped>
.editAll {
  background: #fff;
  height: calc(100vh - 108px);
  overflow: hidden;
  /deep/.el-tabs__nav-wrap::after {
    height: 0;
  }
  /deep/.el-tabs__nav-scroll {
    margin-top: 20px;
    padding-left: 20px;
    .el-tabs__nav {
      display: flex;
      justify-content: space-between;
      align-self: center;
      .el-tabs__active-bar {
        width: auto !important;
        left: 30px;
        right: 30px;
        top: 15px;
        z-index: 0;
        height: 4px;
        background: rgba(213, 230, 255, 1);
        transform: translateX(0) !important;
      }
      .el-tabs__item {
        font-size: 16px;
        font-weight: 400;
        color: rgba(37, 40, 46, 1);
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(213, 230, 255, 1);
        border-radius: 15px;
        height: 30px;
        line-height: 26px;
        margin: 0 20px;
        text-align: center;
        &.is-top:last-child {
          padding-right: 18px !important;
        }
        &.is-top:nth-child(2) {
          padding-left: 18px !important;
        }

        &.is-active {
          color: rgba(28, 119, 255, 1);
          border-color: rgba(28, 119, 255, 1);
        }
      }
    }
    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
  /deep/.el-tabs__content {
    height: calc(100vh - 138px - 45px);
    overflow-y: auto;
  }
}
</style>

