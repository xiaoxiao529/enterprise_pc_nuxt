<template>
  <div>
    <!-- 详情页 -->
    <el-dialog title="消控室值班详情" :before-close="handleClose" :close-on-click-modal="false" :visible.sync="showDetail" width="916px" style="margin: 0 auto; text-align: left;">
      <el-scrollbar>
        <div class="gg-base-info" style="height: 500px;">

          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">值班信息</h3>
            <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <th class="color_gray">消控室名称 :</th>
                  <td class="w_420">{{data.roomName}}</td>
                  <th class="color_gray">值班班次 :</th>
                  <td class="w_420">{{data.dutyClass}}</td>
                </tr>
                <tr>
                  <th class="color_gray">任务编号 :</th>
                  <td class="w_420">{{data.taskNo}}</td>
                  <th class="color_gray">任务规范率 :</th>
                  <td class="w_420">
                    <span v-if="data.standardPercent != null && data.standardPercent != ''">{{data.standardPercent + "%"}}</span>
                    <span v-else></span>
                  </td>
                </tr>
                <tr>
                  <th class="color_gray">完成时间 :</th>
                  <td class="w_420">{{data.dutyEndDetail}}</td>
                  <th class="color_gray">值班人员 :</th>
                  <td class="w_420">{{data.dutyUser}}</td>
                </tr>
                <tr>
                  <th class="color_gray" style="width:138px;">设备运行情况 :</th>
                  <td class="w_420" v-if="picFive.length === 0"></td>
                  <td class="w_420" v-else-if="picFive.length > 0">
                    <img :src=item v-for="(item, index) in picFive" :key="index" alt="" class="img" @click="enlarge(item)">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">
              <span :class="{'gg-active':!qustionList}" @click="qustionList = false">值班情况</span>
              <span :class="{'gg-active':qustionList}" @click="qustionList = true" class="question">运行情况</span>
            </h3>

            <div class="gg-worklog-model" v-show="!qustionList" style="display: block;font-size:18px;margin:20px;z-index:100">
              <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
                <tbody v-if="BeOnDutyData.length != 0 && BeOnDutyData != null">
                  <div class="dividing_line">
                    <div v-if="BeOnDutyDataOne.selfCheckStatus == '0'">
                      <tr>
                        <td class="w_420">自检：正常</td>
                      </tr>
                    </div>
                    <div v-else>
                      <tr>
                        <td class="w_420">自检：异常</td>
                      </tr>
                      <tr>
                        <td class="w_420">{{BeOnDutyDataOne.selfCheckDesc}}</td>
                      </tr>
                      <tr>
                        <td v-if="picZero.length === 0"></td>
                        <td v-else-if="picZero.length > 0">
                          <img :src=item v-for="(item, index) in picZero" :key="index" alt="" class="img" @click="enlarge(item)">
                        </td>
                      </tr>
                    </div>
                  </div>
                  <div class="dividing_line">
                    <div v-if="BeOnDutyDataOne.noiseStatus == '0'">
                      <tr>
                        <td class="w_420">消音：正常</td>
                      </tr>
                    </div>
                    <div v-else>
                      <tr>
                        <td class="w_420">消音：异常</td>
                      </tr>
                      <tr>
                        <td class="w_420">{{BeOnDutyDataOne.noiseDesc}}</td>
                      </tr>
                      <tr>
                        <td v-if="picOne.length === 0"></td>
                        <td v-else-if="picOne.length > 0">
                          <img :src=item v-for="(item, index) in picOne" :key="index" alt="" class="img" @click="enlarge(item)">
                        </td>
                      </tr>
                    </div>
                  </div>
                  <div class="dividing_line">
                    <div v-if="BeOnDutyDataOne.resetStatus == '0'">
                      <tr>
                        <td class="w_420">复位：正常</td>
                      </tr>
                    </div>
                    <div v-else>
                      <tr>
                        <td class="w_420">复位：异常</td>
                      </tr>
                      <tr>
                        <td class="w_420">{{BeOnDutyDataOne.resetDesc}}</td>
                      </tr>
                      <tr>
                        <td v-if="picTwo.length === 0"></td>
                        <td v-else-if="picTwo.length > 0">
                          <img :src=item v-for="(item, index) in picTwo" :key="index" alt="" class="img" @click="enlarge(item)">
                        </td>
                      </tr>
                    </div>
                  </div>
                  <div class="dividing_line">
                    <div v-if="BeOnDutyDataOne.mainPowerStatus == '0'">
                      <tr>
                        <td class="w_420">主电源：正常</td>
                      </tr>
                    </div>
                    <div v-else>
                      <tr>
                        <td class="w_420">主电源：异常</td>
                      </tr>
                      <tr>
                        <td class="w_420">{{BeOnDutyDataOne.mainPowerDesc}}</td>
                      </tr>
                      <tr>
                        <td v-if="picThree.length === 0"></td>
                        <td v-else-if="picThree.length > 0">
                          <img :src=item v-for="(item, index) in picThree" :key="index" alt="" class="img" @click="enlarge(item)">
                        </td>
                      </tr>
                    </div>
                  </div>
                  <div class="dividing_line">
                    <div v-if="BeOnDutyDataOne.backupPowerStatus == '0'">
                      <tr>
                        <td class="w_420">备用电源：正常</td>
                      </tr>
                    </div>
                    <div v-else>
                      <tr>
                        <td class="w_420">备用电源：异常</td>
                      </tr>
                      <tr>
                        <td class="w_420">{{BeOnDutyDataOne.backupPowerDesc}}</td>
                      </tr>
                      <tr>
                        <td v-if="picFour.length === 0"></td>
                        <td v-else-if="picFour.length > 0">
                          <img :src=item v-for="(item, index) in picFour" :key="index" alt="" class="img" @click="enlarge(item)">
                        </td>
                      </tr>
                    </div>
                  </div>
                  <div class="dividing_line">
                    <div v-if="BeOnDutyDataOne.envStatus == '0'">
                      <tr>
                        <td class="w_420">环境检查：正常</td>
                      </tr>
                    </div>
                    <div v-else>
                      <tr>
                        <td class="w_420">环境检查：异常</td>
                      </tr>
                      <tr>
                        <td class="w_420">{{BeOnDutyDataOne.envDesc}}</td>
                      </tr>
                      <tr>
                        <td v-if="picSix.length === 0"></td>
                        <td v-else-if="picSix.length > 0">
                          <img :src=item v-for="(item, index) in picSix" :key="index" alt="" class="img" @click="enlarge(item)">
                        </td>
                      </tr>
                    </div>
                  </div>
                </tbody>
                <tbody v-else>
                  <tr>
                    <th class="color_black">暂无信息</th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="gg-worklog-model" v-show="qustionList" style="display: block;font-size:18px;margin:20px;z-index:100">
              <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
                <tbody v-if="FunctionData.length != 0 && FunctionData != null">
                  <div class="frame" style="width: 1000px;">
                    <div v-for="(item, index) in FunctionData" :key="index">
                      <tr>
                        <td class="w_120">{{eventTypeCh}}</td>
                        <td class="color_black">{{item.eventTime}}</td>
                      </tr>
                      <tr>
                        <td class="w_120">事件情况：</td>
                        <td class="color_black">{{item.eventDesc}}</td>
                      </tr>
                      <div v-if="item.picSeven.length === 0"></div>
                      <div v-else-if="item.picSeven.length > 0" style="width: 900px;">
                        <img :src=item v-for="(item, index) in item.picSeven" :key="index" alt="" class="img" @click="enlarge(item)">
                      </div>
                      <tr>
                        <td class="w_120">消防联动控制器：</td>
                        <td class="color_black">{{controlTypeDesc}}</td>
                      </tr>
                      <tr>
                        <td class="w_120">控制器描述：</td>
                        <td class="color_black">{{item.controlDesc}}</td>
                      </tr>
                      <div v-if="item.picEight.length === 0"></div>
                      <div v-else-if="item.picEight.length > 0">
                        <img :src=item v-for="(item, index) in item.picEight" :key="index" alt="" class="img" @click="enlarge(item)">
                      </div>
                    </div>
                  </div>
                </tbody>
                <tbody v-else>
                  <tr>
                    <th class="color_black">暂无信息</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-dialog>
    <!-- 显示图片 -->
    <el-dialog title="图片详情" :visible.sync="pictureDetails" :close-on-click-modal="false" style="width: 77%; margin: 0 auto;">
      <el-scrollbar>
        <div style="max-height: 500px;max-width: 500px;">
          <img :src=url style="cursor:pointer;width:100%;height:100%;" alt="">
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>

</template>
<script>
import api from '~/config/http';
  export default {
    props:{
        row:Object,
        showDetail: {
            default: false
        }
        
    },
    data() {
      return {
        accidentNo: true,
        url:'',
        data:[],
        BeOnDutyData: [],
        BeOnDutyDataOne: {},
        FunctionData: [],
        picZero: [],
        picOne: [],
        picTwo: [],
        picThree: [],
        picFour: [],
        picFive: [],
        picSix: [],
        picSeven: [],
        picEight: [],
        base_url: '',
        eventTypeCh: '',
        controlTypeDesc: '',
        pictureDetails: false,
        qustionList: false,
        showD:this.showDetail
      }
    },
    mounted(){
    },
    methods: {
      enlarge(b) {
        this.url = b;
        this.pictureDetails = true;
      },
      getData(row){
          let that = this
          this.accidentNo = true;
          api.post(api.forent_url.moblie_url + "/controlRoomDuty/" + row.id)
          .then(res=>{
            that.data = res.roomInfo;
            that.BeOnDutyData = res.roomCheck
            that.BeOnDutyDataOne = that.BeOnDutyData[0]
            that.FunctionData = res.roomRunInfo
            if (that.data.problemList != null && that.data.problemList.length > 0) {
              that.picZero = [],
              that.picOne = [],
              that.picTwo = [],
              that.picThree = [],
              that.picFour = [],
              that.picFive = [],
              that.picSix = [],
              that.data.problemList.forEach(element => {
                if (element.attachmentType == 0 || element.attachmentType == '0') {
                  that.base_url = api.forent_url.pic_url + '/' + element.attachmentPath
                  that.picZero.push(that.base_url)
                }
                if (element.attachmentType == 1 || element.attachmentType == '1') {
                  that.base_url = api.forent_url.pic_url + '/' + element.attachmentPath
                  that.picOne.push(that.base_url)
                }
                if (element.attachmentType == 2 || element.attachmentType == '2') {
                  that.base_url = api.forent_url.pic_url + '/' + element.attachmentPath
                  that.picTwo.push(that.base_url)
                }
                if (element.attachmentType == 3 || element.attachmentType == '3') {
                  that.base_url = api.forent_url.pic_url + '/' + element.attachmentPath
                  that.picThree.push(that.base_url)
                }
                if (element.attachmentType == 4 || element.attachmentType == '4') {
                  that.base_url = api.forent_url.pic_url + '/' + element.attachmentPath
                  that.picFour.push(that.base_url)
                }
                if (element.attachmentType == 5 || element.attachmentType == '5') {
                  that.base_url = api.forent_url.pic_url + '/' + element.attachmentPath
                  that.picFive.push(that.base_url)
                }
                if (element.attachmentType == 6 || element.attachmentType == '6') {
                  that.base_url = api.forent_url.pic_url + '/' + element.attachmentPath
                  that.picSix.push(that.base_url)
                }
              });
            } else {
              that.picZero = [],
              that.picOne = [],
              that.picTwo = [],
              that.picThree = [],
              that.picFour = [],
              that.picFive = [],
              that.picSix = []
            }
            if (that.FunctionData != null && that.FunctionData.length > 0) {
              
              that.FunctionData.forEach(element => {
                if (element.eventType == '0') {
                  that.eventTypeCh = '故障报警'
                } else if (element.eventType == '1') {
                  that.eventTypeCh = '误报火警'
                } else if (element.eventType == '2') {
                  that.eventTypeCh = '真实火警'
                } else if (element.eventType == '3') {
                  that.eventTypeCh = '监管报警'
                } else if (element.eventType == '4') {
                  that.eventTypeCh = '漏报'
                }
                if (element.controlRunStatus == '0') {
                  that.controlTypeDesc = '正常（自动）'
                } else if (element.controlRunStatus == '1') {
                  that.controlTypeDesc = '正常（手动）'
                } else {
                  that.controlTypeDesc = '故障'
                }
                if (element.attachRoomList != null && element.attachRoomList.length > 0) {
                  element.picSeven = [];
                  element.picEight = [];
                  element.attachRoomList.forEach(ele => {
                    if (ele.attachmentType == 7 || ele.attachmentType == '7') {
                      that.base_url = api.forent_url.pic_url + '/' + ele.attachmentPath
                      element.picSeven.push(that.base_url)
                    }
                    if (ele.attachmentType == 8 || ele.attachmentType == '8') {
                      that.base_url = api.forent_url.pic_url + '/' + ele.attachmentPath
                      element.picEight.push(that.base_url)
                    }
                  })
                  console.log('element.picSeven', element.picSeven)
                  console.log('element.picEight', element.picEight)
                } else {
                  element.picSeven = [];
                  element.picEight = [];
                }
                
              })
            }
          })
      },
      handleClose(done) {
        this.$emit('isShow', false);
      },
    },
    watch:{
        row:function(newVal,oldVal){
            this.qustionList = false;
            this.getData(newVal)
        },
        showDetail:function(newVal,oldVal){
            //this.showD = newVal;
        }
    }
  }

</script>
<style lang="scss">
  .gg-base-info {
    margin: 20px 25px;
  }

  .gg-base-unit {
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #e2e4e8;
  }

  .gg-base-h3 {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    border-left: 4px solid #6a90ec;
    background-color: #eef3fe;
    span{
        cursor:pointer;
    }
  }

  .gg-table {
    margin: 15px;
    // height: 300px;
  }

  .gg-active {
    display: inline-block;
    color: #4677e8;
    height: 38px;
    border-bottom: 2px solid #4677e8;
  }

  .question {
    margin-left: 13px;
  }

  .dividing_line {
    padding: 5px;
    border-bottom: 1px solid #e2e4e8 !important;
  }

  .frame {
    margin: 10px 0;
    border: 1px solid #e2e4e8;
    padding: 5px 15px;
  }

  .color_gray {
    color: #777;
    width: 94px;
  }
  .black {
    color: #000;
  }
  .color_black {
    color: #000;
    width: 800px;
  }
  .w_420 {
    width: 450px;
    color: #000;
  }
  .w_120 {
    width: 120px;
    color: #000;
  }
  .img {
    cursor: pointer;
    width: 100px;
    height: 100px;
  }
</style>
