<template>
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="24">
          <el-col :span="18">
            <div class="grid-content">
              <i class="el-icon-back" @click="back()">
                <span class="solid-collapse"></span>
                <span class="listName">
                  <span class="text-color">{{changeText(name)}}</span>
                </span>
              </i>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content leftList">
              <div @click="checkedAll" class="allDiv">
                <el-checkbox v-model.trim="checked" class="iconAll">全选</el-checkbox>
              </div>

              <el-button type="primary" :disabled="canSubmit" :icon="submitBtnIcon" class="btnList" @click="saveList">{{submitBtnText}}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div class="mainBox" v-cloak>
          <div class="boxIcon colorIcon" :class="item.className" v-for="(item,index) in iconList" :key="index" v-show="icon[item.id]" @click="checkedIcon(item,index)">
            <div class="iconBig">
              <b :class="icon[item.id]"></b>
            </div>
            <div class="iconSize">{{item.name}}</div>
            <b class="box-icon ggicon-selected"></b>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import api from "~/config/http";
import axios from "axios";
export default {
  data() {
    return {
      allFlag: null,
      ZS: {},
      MONITOR: {},
      floorList: [],
      listName: "转换列表",
      isPending: false,
      visibles: false,
      bigFlag: false,
      bigIcon: "icon-enlarge",
      flag: true,
      listFlag: false,
      listData: this.$route.params,
      name: "",
      checked: "",
      icon: {
        "01000000": "ggicon-facility",
        "02000000": "ggicon-forewarning",
        "03000000": "ggicon-powerUp",
        "04000000": "ggicon-fire",
        "05000000": "ggicon-water",
        "06000000": "ggicon-fireHydrant",
        "07000000": "ggicon-fireExtinguishingSprinkler",
        "08000000": "ggicon-foamFire-fighting",
        "09000000": "ggicon-gasFireControl",
        "10000000": "ggicon-fan",
        "11000000": "ggicon-illumination",
        "12000000": "ggicon-trumpet",
        "13000000": "ggicon-telphone",
        "14000000": "ggicon-fireSeparationFacility",
        "15000000": "ggicon-fireElevator",
        "16000000": "ggicon-waterMist",
        "17000000": "ggicon-powderExtinguishingSystem",
        "18000000": "ggicon-annihilator",
        "19000000": "ggicon-ZigBee",
        "20000000": "ggicon-monitorSystem",
        "21000000": "ggicon-fireHydrant",
        "90000000": "ggicon-other"
      },
      iconList: [],
      iconActiveList: []
    };
  },
  async mounted() {
    // 标题赋值
    this.name = this.listData.planName;
    this.planId = this.listData.id;
    this.initList();
  },
  methods: {
    // 请求设施数组方法
    initListActive() {
      api
        .post("/remoteApi/tool/deviceInfo/getDeviceInfoList", {})
        .then(res => {
          if (res.code == "success") {

            this.iconList = res.data;
            // 为数组添加属性
            for (var i = 0; i < this.iconList.length; i++) {
              var currentEle = this.iconList[i];
              if (this.icon[currentEle.id]) {
                currentEle.visible = true;
              }
            }

            // 已选中对比 进入选中操作
            this.iconActiveList.forEach(element => {
              this.iconList.forEach((iconEle, index) => {
                if (iconEle.id == element.facilityTypeCode) {
                  iconEle.selected = true;
                  iconEle.className = iconEle.selected ? "active" : "";
                }

                if (iconEle.visible) {
                  if (!iconEle.selected) {
                    this.checked = false;
                  } else {
                    this.checked = true;
                  }
                }
              });
            });
          }
        });
    },
    // 初始化列表方法
    async initList() {
      // 请求已经选中的设施
      api
        .get(
          api.forent_url.base_url +
          "/inspection/plan/getInspectionDeviceType/" +
          this.planId,
          {}
        )
        .then(res => {
          if (res.code == "success") {
            this.iconActiveList = res.data;
            // console.log('----------',this.iconActiveList);
            // 请求设施数组
            this.initListActive();
          }
        });
      this.$forceUpdate();
    },
    // 单选
    checkedIcon(values, i) {
      var allcheck = false;
      var alluncheck = false;
      var currentFacility = this.iconList[i];
      var Facility = currentFacility;
      currentFacility.selected = !currentFacility.selected;
      currentFacility.className = currentFacility.selected ? "active" : "";
      // 判断全选
      for (var i = 0; i < this.iconList.length; i++) {
        var e = this.iconList[i];
        if (e.visible) {
          if (!e.selected) {
            break;
          }
        }

        if (i == this.iconList.length - 1) {
          allcheck = true;
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
      this.$forceUpdate();
    },
    // 全选
    checkedAll() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isIE =
        userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
      var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
      var isIE11 =
        userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
      if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
          return 7;
        } else if (fIEVersion == 8) {
          return 8;
        } else if (fIEVersion == 9) {
          return 9;
        } else if (fIEVersion == 10) {
          return 10;
        } else {
          return 6; //IE版本<=7
        }
      } else if (isEdge) {
        this.ieALLActive();
      } else if (isIE11) {
        this.ieALLActive();
      } else {
        //不是ie浏览器
        this.restsAllActive()
      }

      this.$forceUpdate();
    },
    // ie 全选 反选
    ieALLActive() {
      this.iconList.forEach((key, i) => {
        var e = key;
        if (e.visible) {
          if (this.checked != false) {
            e.selected = true;
            e.className = e.selected ? "active" : "";
          } else {
            e.selected = false;
            e.className = e.selected ? "active" : "";
          }
        }
      });
    },
    // 其他浏览器 全选 反选
    restsAllActive() {
      this.iconList.forEach((key, i) => {
        var e = key;
        if (e.visible) {
          if (this.checked == false) {
            e.selected = true;
            e.className = e.selected ? "active" : "";
          } else {
            e.selected = false;
            e.className = e.selected ? "active" : "";
          }
        }
      });
    },
    // 保存
    saveList() {
      if (this.isPending || !this.submitBtn) {
        // 防止重复提交
        console.log("........无法进入");
        return;
      }
      this.isPending = true;
      var planId = this.listData.id; // 计划id
      var enterpriseId = api.getGlobalVal("userObj").orgCode; // 企业id
      var userId = api.getGlobalVal("userObj").id; // 用户id
      var opts = []; // 参数结果

      //时间格式化工具
      Date.prototype.format = function (fmt) {
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
      var dateStr = new Date().format("yyyy-MM-dd hh:mm:ss"); // 当前时间

      // 提交的数据 赋值
      var items = this.iconList;
      for (var i in items) {
        if (items[i].visible) {
          if (items[i].selected) {
            var obj = {};
            obj.planId = planId;
            obj.companyId = enterpriseId;
            obj.facilityTypeCode = items[i].id;
            obj.facilityTypeName = items[i].name;
            obj.createUserId = userId;
            obj.createTime = dateStr;
            opts.push(obj);
          }
        }
      }
      // 提交验证
      if (opts.length == 0) {
        GS.$Message.warning("请至少选择一个类型！");
        this.isPending = false;
        return;
      }
      // 提交请求
      api
        .post(
          api.forent_url.base_url +
          "/inspection/plan/saveInspectionDeviceType/" +
          enterpriseId +
          "/" +
          planId,
          {
            facilityTypes: JSON.stringify(opts)
          }
        )
        .then(res => {
          if (res.code == "success") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$router.push({
              name: "PatrolPlan-FacilitiesInspection"
            });
          }
        });
    },
    // 返回
    back() {
      this.$router.push({
        name: "PatrolPlan-FacilitiesInspection"
      });
    },
    // 标题截取
    changeText(a) {
      if (a.length >= 8) {
        a = a.slice(0, 10) + "...";
      }
      return a;
    }
  },
  computed: {
    submitBtn() {
      var enable = this.listData.isEnable;
      if (enable != "0" && enable != "2") {
        return false;
      } else {
        return true;
      }
    },

    canSubmit() {
      return this.submitBtn && !this.isPending ? false : true;
    },
    submitBtnText() {
      if (!this.isPending) {
        return "提交";
      }
      return "保存中";
    },
    submitBtnIcon() {
      if (!this.isPending) {
        return "";
      }
      return "el-icon-loading";
    }
  }
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.allDiv {
  display: inline-block;
}
.box-icon {
  position: absolute;
  bottom: -1px;
  right: -2px;
  font-size: 18px;
}
.iconAll {
  vertical-align: super;
}
.iconSize {
  font-size: 16px;
}
.iconBig {
  font-size: 5.6rem;
  //   color: #9f9f9f;
  text-shadow: 0.4rem 0.6rem 0.7rem rgba(180, 180, 180, 0.3);
}
.colorIcon {
  color: #9f9f9f;
}
.boxIcon {
  position: relative;
  height: 150px;
  width: 18.7%;
  margin-right: 1%;
  margin-bottom: 1.5rem;
  text-align: center;
  border: 0.1rem solid rgba(159, 159, 159, 0.7);
  -webkit-box-shadow: 0.1rem 0.2rem 0.4rem 0 rgba(124, 124, 124, 0.3);
  -moz-box-shadow: 0.1rem 0.2rem 0.4rem 0 rgba(124, 124, 124, 0.3);
  box-shadow: 0.1rem 0.2rem 0.4rem 0 rgba(124, 124, 124, 0.3);
  vertical-align: top;
  cursor: pointer;
}
.mainBox {
  width: 100%;
  // height: 100%;
  background-color: #fff;
  display: flex;
  margin-top: 10px;
  // justify-content: space-around;
  padding: 20px 0 10px 10px;
  flex-wrap: wrap;
}

html {
  overflow-x: hidden;
}

.solid-collapse:after {
  content: "";
  position: absolute;
  top: 12%;
  bottom: 0;
  left: 12%;
  width: 1px;
  height: 80%;
  background-color: #d9d9d9;
}
.map {
  margin-top: 1rem;
}
.list-all {
  padding-left: 0.4rem;
}
.gg-submit-detail:before {
  content: "";
  position: absolute;
  top: -0.8rem;
  left: 100px;
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  background-color: #fff;
  border-left: 0.1rem solid #347ff3;
  border-top: 0.1rem solid #347ff3;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-box-shadow: -0.1rem -0.1rem 0.1rem 0rem rgba(0, 166, 90, 0.3);
  -moz-box-shadow: -0.1rem -0.1rem 0.1rem 0rem rgba(0, 166, 90, 0.3);
  box-shadow: -0.1rem -0.1rem 0.1rem 0rem rgba(0, 166, 90, 0.3);
}

.overstriking {
  font-weight: 600;
}
.all-list {
  border: 1px solid #2072f2 !important;
}
.text-color {
  color: #1a1a1a !important;
}
.ggicon-list:before {
  content: "\E902";
  color: #0caa62;
}
.ggicon-building:before {
  content: "\e900";
  color: #0caa62;
}

.sizeContent {
  padding-left: 0.1rem;
}
.minIcon {
  position: absolute;
  right: -1px;
  bottom: -2px;
}
.forbid_submit {
  cursor: no-drop !important;
}
.bigBoox {
  height: 40rem;
  padding: 0;
  border: 0.1rem solid #347ff3;
  margin: -13px;
  box-shadow: 0 0 0.5rem #347ff3;
  overflow: auto;
  overflow-x: hidden;
}

.minRidus {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  position: relative;
  font-size: 1.4rem;
  top: -0.8rem;
  right: 0rem;
  border-radius: 50%;
  background-color: red;
  color: #ffffff;
}

.active {
  color: #2072f2 !important;
  border: 1px solid #2072f2 !important;
  background-color: #e7effb !important;
}

.iconActive {
  color: #2072f2;
}
.list-content:first-child {
  margin-left: 0;
}
.list-content {
  position: relative;
  width: 5rem;
  height: 5rem;
  border: 1px solid #dadada;
  margin: 2rem 0 2rem 1rem;
  text-align: center;
  line-height: 5rem;
  cursor: pointer;
  color: #999999;
}

.list-content-car {
  position: relative;
  width: 42px;
  height: 30px;
  border: 1px solid #dadada;
  margin: 2rem 0 2rem 1rem;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  flex-wrap: wrap;
}

.floorContent {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 25px;
  border-bottom: 0.1rem solid #ededed;
}
.floorContent-car {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 15px;
  border-bottom: 0.1rem solid #ededed;
}

.locationIcon {
  position: absolute;
  right: -1px;
  bottom: -2px;
}

.checked {
  color: #2072f2 !important;
}

.floorHeader {
  height: 5rem;
  line-height: 5rem;
  border-bottom: 1px solid #eaeaea;
}

.floorHeader-car {
  height: 4rem;
  line-height: 4rem;
  // border-bottom: 1px solid #eaeaea;
}

.floorListR {
  float: right;
  font-size: 18px;
  padding-right: 3.2rem;
  cursor: pointer;
  color: #999999;
}

.el-main {
  padding: 0;
  text-align: none;
  overflow-y: auto;
  overflow-x: hidden !important;
}

.floorListL {
  float: left;
  font-size: 18px;
  padding-left: 2rem;
  color: #616161;
}

.floorMain {
  width: 100%;
  background-color: #fff;
  margin: 1rem 0;
}

.floor-list {
  width: 100%;
}

.grid-content {
  line-height: 3;
}

.btnList {
  margin-left: 10%;
  vertical-align: super;
}

.leftList {
  padding-left: 30%;
}

.el-icon-back {
  position: absolute;
  left: 30px;
  top: 7px;
  width: 30%;
}

.listName {
  padding-left: 2rem;
  font-size: 18px;
  vertical-align: middle;
}

.listSwitch {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  font-size: 18px;
  vertical-align: text-top;
  text-align: center;
  cursor: pointer;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
