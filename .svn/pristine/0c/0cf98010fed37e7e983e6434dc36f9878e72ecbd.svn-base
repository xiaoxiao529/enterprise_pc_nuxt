<template>
  <div>
    <!-- 详情页 start-->
    <el-dialog title="防火巡查任务详情" :before-close="handleClose" :close-on-click-modal="false" :visible.sync="showDetail" width="916px" style="margin: 0 auto; text-align: left;">
      <el-scrollbar>
      <div class="gg-base-info" style="height: 500px;">
        <div class="gg-base-unit">
          <h3 class="gg-base-h3 black">基本信息</h3>
          <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0" style="margin-left: 9px;">
            <tbody>
              <tr>
                <th class="color_gray">任务编号 :</th>
                <td class="w_400">{{data.taskNo}}</td>
                <th class="color_gray" style="width:172px;">当前任务完成度(%):</th>
                <td class="w_400">{{data.complatePercent}}</td>
              </tr>
              <tr>
                <th class="color_gray">任务名称 :</th>
                <td class="w_400">{{data.taskName}}</td>
                <th class="color_gray">任务类型 :</th>
                <td class="w_400">{{data.inspectionType}}</td>
              </tr>
              <tr>
                <th class="color_gray">巡查日期 :</th>
                <td class="w_400">{{data.checkTime}}</td>
                <th class="color_gray">开始巡查时间 :</th>
                <td class="w_400">{{data.startTime}}</td>
              </tr>
              <tr>
                <th class="color_gray">巡查结束时间 :</th>
                <td class="w_400">{{data.endTime}}</td>
                <th class="color_gray">巡查人 :</th>
                <td class="w_400">{{data.recieveUsers}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="gg-base-unit">
          <h3 class="gg-base-h3 black">
            <span :class="{'gg-active':!qustionList}" @click="qustionList = false">完成情况</span>
            <span :class="{'gg-active':qustionList}" @click="qustionList = true" class="question">问题列表</span>
          </h3>
          <!-- 完成情况start -->
          <div class="gg-worklog-model" v-show="!qustionList" id="comp_div" style="display: block; padding:20px;z-index:100">
            <div v-if="dataFinishInfo.length > 0">
              <div v-for="item in dataFinishInfo" :key="item.buildName">
                <p class="gg-floor-info black" >{{item.buildName}}</p>
                <table class="gg-table1 gg-tableFix" cellspacing="0" cellpadding="0" v-show="item.dataFloorList.length > 0" style="border-bottom: 1px solid #e9e9e8;">
                  <tbody>
                    <!-- 完成情况里的小表start  -->
                    <div v-for="(item, index) in item.dataFloorList" :key="index" class="black">
                      <tr :class="[index % 2 === 0 ? 'border_d' : 'border_s']">
                        <td style="width: 30px;"></td>
                        <td style="width: 130px;">
                          {{item.floorName}}
                          <i v-show="item.blueActiveNum === 1" class="cloud-bluetooth-info" ></i>
                          <i v-show="item.blueNotAcitveNum === 1" class="cloud-bluetooth-default"></i>
                        </td>
                        <td style="width: 160px;">
                          <span v-if = "item.status === '0'">未选择</span>
                          <span v-else-if = "item.status === '1'">已选择</span>
                          <span v-else-if = "item.status === '2'">检查中</span>
                          <span v-else-if = "item.status === '3'">已完成</span>
                        </td>
                        <td style="width: 300px;" v-show="item.status === '3'">
                          <span>完成时间:{{item.completeTime}}</span>
                        </td>
                        <td style="width: 190px;" v-show="item.status === '3'">
                          <span>发现问题{{item.problemNum}}个</span>
                        </td>
                        <td style="width: 250px;">
                          <span>巡检人:{{item.recieveUserName}}</span>
                        </td>
                      </tr>
                    </div>
                    <!-- 完成情况里的小表end -->
                  </tbody>
                </table>
              </div>
            </div>
            <p class="gg-floor-info" v-else style="display: block; padding-left:10px;z-index:100;color: #000;">暂无信息</p>
            <!-- 完成情况end -->
          </div>

          <div class="gg-worklog-model" v-show="qustionList"  id="comp_div" style="display: block;">
            <!-- 问题列表start -->
            <table class="gg-table2 gg-tableFix" cellspacing="0" cellpadding="0" v-if="problemList.length > 0" style="border-bottom: 1px solid #e9e9e8;">
              <tbody>
                <!-- 问题列表里的小表start  -->
                <div v-for="(item, index) in problemList" :key="index" class="black borders" style="width: 1020px; padding: 20px;">
                  <h2 >{{item.itemName}}</h2>
                  <p>设备类型： {{item.deviceName}}</p>
                  <p>位置信息： {{item.deviceLocal}}</p>
                  <p>故障描述： {{item.issueDesc}}</p>
                  <div>
                    <p v-if="item.dataproblemList.length === 0"></p>
                    <p v-else>
                      <img :src=item v-for="(item, index) in item.dataproblemList" :key="index" alt="" class="img" @click="enlarge(item)">
                    </p>
                  </div>
                </div>
                <!-- 完成情况里的小表end -->
              </tbody>
            </table>
            <p class="gg-floor-info" v-else style="display: block; padding-left:30px;margin: 20px 0;z-index:100;color: #000;">暂无信息</p>
          </div>
          <!-- 问题列表end -->
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
        dataFinishInfo:[],
        pictureDetails: false,
        qustionList: false,
        showD:this.showDetail,
        problemList:[],
        base_url: '',
      }
    },
    mounted(){
    },
    methods: {
      enlarge(b) {
        console.log(b)
        this.url = b;
        this.pictureDetails = true;
      },
      async getData(row){
          let that = this
          await api.post(api.forent_url.moblie_url + "/inspection/task/details/" + row.id)
          .then(res=>{
            console.log('res===========', res)
            that.data = res.data.taskBaseInfo;
            that.dataFinishInfo = res.data.taskFinishInfo.buildList || [];
            that.problemList = res.data.taskFinishInfo.problemList || [];
            that.dataFinishInfo.forEach(element => {
              element.dataFloorList = []
              element.floorList.forEach(ele => {
                if (ele.status !== null) {
                  element.dataFloorList.push(ele)
                }
              })
            })
            that.problemList.forEach(element => {
              if (element.attachPathList.length == 0) {
                element.dataproblemList = []
              } else {
                element.dataproblemList = []
                element.attachPathList.forEach(ele => {
                  that.base_url = api.forent_url.pic_url + '/' + ele
                  console.log('that.base_url', that.base_url)
                  element.dataproblemList.push(that.base_url)
                })
                console.log('element.dataproblemList', element.dataproblemList)
              }
            })
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
    margin: 10px;
  }
  .gg-table1 {
    margin-bottom: 10px;
  }
  .gg-table2 {
    margin: 20px;
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
    width: 130px;
  }
  .black {
    color: #000;
  }
  .w_400 {
    width: 400px;
    color: #000;
  }
  .none {
    margin-left: 10px;
    height: 50px;
    line-height: 50px;
    color: #000;
  }
  .img {
    cursor: pointer;
    width: 100px;
    height: 100px;
  }
  .borders {
    border: 1px solid #e9e9e8;
    border-bottom: none;
    line-height: 35px;
  }
  .border_d {
    background-color: #f8f9fa;
    border: 1px solid #e9e9e8;
    border-bottom: none;
    line-height: 35px;
  }
  .border_s {
    background-color: #fff;
    border: 1px solid #e9e9e8;
    border-bottom: none;
    line-height: 35px;
  }
</style>
