<template>
  <div v-cloak ref="pageHeight" class="contentAll">
    <el-container>
      <el-aside :class="collapsed?'menu-collapsed':'menu-expanded'" class="menu-aside">
        <div :class="collapsed?'gg-nav-head logo-collapse-width':'gg-nav-head logo-width'">
          <div class="gg-logo"></div>
          <div class="gg-mini-logo"></div>
          <span class="gg-logo-name">电 子 档 案</span>
        </div>
        <!-- default-active="0-0" -->

        <el-scrollbar id="" class="navScroll bigMenu">

						
						<ul  class="el-menu-vertical-demo el-menu">
							<li role="menuitem" tabindex="-1" class="el-menu-item" >
								<nuxt-link to="/PatrolPlan/FacilitiesInspection">任务列表</nuxt-link>
							</li>
							<li role="menuitem" tabindex="-1" class="el-menu-item" >
								<nuxt-link to="/PatrolPlan/archivesList">单位列表</nuxt-link>
							</li>
							<li role="menuitem" v-show="roleName =='超级管理员'" tabindex="-1" class="el-menu-item" >
								<nuxt-link to="/PatrolPlan/PushEquipment">推送缓存</nuxt-link>
							</li>
							<li role="menuitem" v-show="roleName =='超级管理员'" tabindex="-1" class="el-menu-item" >
								<nuxt-link to="/LogManage/LogManage">日志管理</nuxt-link>
							</li>
						</ul>
            

        </el-scrollbar>
        
      </el-aside>
      <el-container style="width:100%">
        <el-header id="change-style-header">
          <div class="tool gg-nav-collapse" @click.prevent="collapse"><span><b class="ggicon-list"></b></span>
          </div>
          <div class="top-r">
            <el-dropdown trigger="click" @command="handleCommand"  >
              <span class="el-dropdown-link userinfo-inner">
                <img  :src="uerLogo" style="vertical-align: top;cursor: pointer;"  />
                <span class="header-userName">{{userName}}</span>
              </span>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
<!--                <el-dropdown-item command="changePwd"><b class="down ggicon-passowrd"></b>修改密码-->
<!--                </el-dropdown-item>-->
                <el-dropdown-item command="logout"><b class="down ggicon-exit"></b>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>

            </el-dropdown>
            <UploadPlace @userPlaceUrl="handlerPath" ref="childNode" :userPic="uerLogo" :userId="userObj.id" />
          </div>
        </el-header>
        <el-main class="mainPage mainPageNew">
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
    <Notice v-show="show" />
    <ChangePsw :changePswVis="changePswVis" v-on:success="success" />
    <TrueAlarm v-if="trueAlarmVis" :trueAlarmVis="trueAlarmVis" :popAlarm="popAlarm" v-on:trueAlarmSuccess="trueAlarmSuccess" />
    <!--   -->
  </div>
</template>


<script>
import 'babel-polyfill';
import Cookie from 'js-cookie';
import api from '~/config/http';
import menuName from '~/config/menu';
import weathercode from '~/config/weathercode';
import common from '~/utils/common';
import axios from 'axios';
import ChangePsw from '~/pages/ChangePsw';
import UploadPlace from '~/components/UploadPlace';
import TrueAlarm from '~/components/TrueAlarm';
import ThemePicker from '~/components/themepicker'
import _ from 'myloadsh';
import {
  Message,
  MessageBox
} from 'element-ui';

import Notice from '~/components/Notice';
//import merge from 'lodash.merge';
//const uerLogo = require('../assets/img/swiper-banner/2.jpg');
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  middleware: 'authenticated',
  components: {
    Notice,
    ChangePsw,
    UploadPlace,
    TrueAlarm,
    ThemePicker

  },
  data() {
    return {
      sysName: 'VUEADMIN',
      collapsed: false,
      isCollapse: true,
      weatherShow: true,
      show: false, //通告是否显示
      changePswVis: false,
      trueAlarmVis: false,
      //自适应屏幕高度 ryq
      fullHeight: (process.browser) ? document.documentElement.clientHeight : "0",
      classObj: {
        // popperClass: {
        //     'max-height': '50px',
        //     'overflow-y': 'auto',
        //     'overflow-x': 'hidden',
        // }
      },
      userName: '',
      roleName:"",
      userObj: "", //api.getGlobalVal('userObj'),
      orgName: '',
      uerLogo: require('../assets/img/new-portrait.png'),
      weatherInfo: "",
      weatherClass: "",
      lightMenu: (api.getGlobalVal("CmenuName") ? api.getGlobalVal("CmenuName").lightMenu : (api.getGlobalVal(
        "userObj") && api.getGlobalVal("userObj").id == 'sa' ? '0-0' : '0')),
      user: "",
      list: menuName.urlList,
      popAlarm: {},
      isPopOpen: false,
      socket: null,
      // 初始化 webSocket
      stompClient: null,
    };
  },
  mounted() {
    require('~/utils/sockjs.min.js');
    require('~/utils/stomp.min.js');
    if (!api.getGlobalVal("userObj")) return;
    this.pageInit();
    //this.connect(api.getGlobalVal("userObj").orgCode);
    this.initColor();
    // console.log('2222',api.getGlobalVal("userObj"))
    this.roleName = localStorage.getItem("roleName");;
    //

  },
  methods: {
    ...mapMutations(['changeGroupFlag']),
    setOrgCode() {
      let userObj = api.getGlobalVal("userObj");
    },
    success(res) {
      this.changePswVis = res;
    },
    trueAlarmSuccess(res) {
      this.trueAlarmVis = res;
    },
    collapse: function () {
      this.collapsed = !this.collapsed;
      this.$store.commit('pageW', Math.random())
      this.initColor();
    },
    handleOpen(key, keyPath) { },
    handleClose(key, keyPath) { },
    handleselect: function (a, b) { },
    handleCommand(command) {
      if (command == "logout") {

        this.$confirm('是否确认退出?', '提示', {

          cancelButtonText: '取消',
          confirmButtonText: '确定'
        }).then(() => {
          //退出登录后清除cookie和store中的数据
          api.removeGlobalVal("loginName");
          api.removeGlobalVal("userObj");

          this.$store.commit('update', '');
          this.$store.commit('updateUserObj', {});
          this.$router.push({
            "path": "/login"
          });

        }).catch((err) => { })
      } else if (command == "changePwd") {
        this.changePswVis = true;
      }
    },
    unique1: function (arr) {
      var hash = [];
      for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
          hash.push(arr[i]);
        }
      }
      return hash;
    },
    init: function () {
      this.weatherShow = true;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.8)',
        customClass: 'border',
        target: document.getElementById('navScroll'),
      })
      if (this.userObj.loginName) {
        var roles = api.getGlobalVal("cur_usr_roles");
        var roleStr = '';
        for (let k in roles) {
          roleStr += k + ',';
        }
        api.post('/remoteApi/tool/role/findResourceByRoleIdAndResType', {
          roleId: roleStr,
          resType: '0,1',
        }).then(
          res => {
            this.jump_attr = 'name'
            // if (res.data&&res.data.length > 0){
            //   res.data.forEach(element=>{
            //     if (element.parentId == "-1"){
            //       var children = [];
            //       res.data.forEach(obj=>{
            //         if (element.id==obj.parentId&&obj.resType==1){
            //           children.push({
            //             menuName:obj.resName,
            //             name: "PatrolPlan-ControlRoomDuty"
            //           });
            //         }
            //       });
            //       this.list.push({
            //         menuName: element.resName,
            //         name: "PatrolPlan",
            //         children: children,
            //       });
            //     }
            //   });
            // }
            // this.list = common.formatJSONMenu(menuName.urlList, res[0].children);
            loading.close();
          })
      }
    },
    checkType: function (data) { // 用来判断被拷贝对象数据类型的函数
      return Object.prototype.toString.call(data).slice(8, -1)
    },
    deepClone: function (target) { // 实现深度拷贝的函数
      let result, targetType = this.checkType(target)
      if (targetType === 'Object') { // 只有对象和数组才进行深度拷贝
        result = {}
      } else if (targetType === 'Array') {
        result = []
      } else {
        return target
      }
      for (let i in target) { // i为对象的key或数组的下标
        let value = target[i]
        let valueType = this.checkType(value)
        if (valueType === 'Object' || valueType === 'Array') {
          result[i] = deepClone(value) // 当拷贝的对象中还有数组或是对象时进行递归，克隆它们中的内容，直到递归完所有数组或对象为止
        } else {
          result[i] = value
        }
      }
      return result // 返回最终的结果
    },
    //页面跳转
    changeMenu: function (item, pathName, parName, index, index1) {

      var url = item[this.jump_attr];
      var that = this;
      api.setGlobalVal("CmenuName", JSON.stringify({
        name: pathName,
        parName: parName,
        lightMenu: (pathName && pathName == '首页' ? '0' : index + "-" + index1)
      }));
      this.$router.push({
        name: "Refresh",
        params: {
          name: pathName,
          parName: parName
        }
      }, () => {
        // 路由跳转完成回调
        that.$router.push({
          name: (url ? url : "Building"),
          params: {
            name: pathName,
            parName: parName
          }
        })
      }, () => {
        // 路由跳转中断,进入该路由初始状态,解决强制刷新问题
        //this.$router.go(0);
      })
    },
    getWeather: function () {
      api.get(api.forent_url.base_url + "/weather/district/getWeatherInfoByOrgCode?orgCode=" + this.userObj.orgCode)
        .then(res => {
          if (res.code == "success" && res.data && res.data != null) {
            this.weatherInfo = res.data;
            this.weatherClass = weathercode.WEATHER_CODE[res.data.weatherImg]
          }
        }).catch({})
    },
    getUserObj: function () {
      if (!api.getGlobalVal('userObj')) return;
      this.userObj = api.getGlobalVal('userObj');

      this.$store.commit('updateUserObj', this.userObj);
      //头部信息栏消息写入
      // this.uerLogo = (this.userObj.usrImgUrl ? api.forent_url.pic_url + '/' + this.userObj.usrImgUrl : require(
      //   '../assets/img/new-portrait.png'));
      // this.getUserUploadImg(); //获取用户头像
      this.userName = this.userObj.userName;
      this.orgName = this.userObj.orgName;
      //获取天气信息
      //this.getWeather();
      this.init();

    },
    /*获取用户头像*/
    getUserUploadImg() {
      if (!this.userObj) return;
      // api.post('http://112.27.198.15:9832/api/v1/fire-society/user/getUserInfoDetailById?userId=' + this.userObj.id)
      api.post(api.forent_url.base_url + '/user/getUserInfoDetailById?userId=' + this.userObj.id)
        .then((res) => {
          if (res.status = 'success') {
            // this.uerLogo = 'http://112.27.198.15:9832/image/' + res.userInfo.imgSrc;
            //console.log(api.forent_url.pic_url);
            if (res.userInfo.imgSrc != '') {
              this.uerLogo = api.forent_url.pic_url + '/' + res.userInfo.imgSrc;
            } else {
              this.uerLogo = require('../assets/img/new-portrait.png');
            }

            //console.log("res.userInfo.imgSrc:",res.userInfo.imgSrc);
            //console.log(this.uerLogo);
          } else {
            this.uerLogo = require('~/assets/img/new-portrait.png');
            //this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.uerLogo = require('../assets/img/new-portrait.png');
          //this.$message.error(error.message);
        })
    },
    getUserRole() {
      var id = api.getGlobalVal('userObj') ? api.getGlobalVal('userObj').id : '';
      if (!id) return;
      let params = {
        userId: id,
        sysCode: 'eRecord',
      };
      let res = api.post('/remoteApi/tool/user/getAuthSystemList', params).then(res => {

        var jsonObj = {};
        var roleData = res.data;
        for (var index in roleData) {
          var rolArr = roleData[index].roles;
          for (var i in rolArr) {
            var rolObj = rolArr[i];
            jsonObj[rolObj.id] = rolObj.id;
          }
        }
        api.setGlobalVal("cur_usr_roles", JSON.stringify(jsonObj))
      });

    },
    openChildDialog() {
      this.$refs.childNode.opendialog(true);
    },
    handlerPath(userPath) {
      this.uerLogo = userPath;
    },
    toGroup() {
      let toG = this.$router.resolve({
        name: 'Group_main'
      });
      window.open(toG.href, 'Group'); //TODO:打开集团首页
    },
    pageInit() {
      //判断是否是集团用户
      if (api.getGlobalVal("bus_group_userObj") == '' || api.getGlobalVal("bus_groupStatus") == '403' && window.name ==
        'notGroup') {
        this.changeGroupFlag(false);
      } else {
        this.changeGroupFlag(true);
      }
      //判断普通用户按钮隐藏,TODO:防止在集团首页,页面进入
      if (api.getGlobalVal("bus_groupStatus") == '403') {
        this.changeGroupFlag(false);
      }
      this.getUserObj();
      this.getUserRole();
      const that = this;
      if (process.browser) {
        window.onresize = () => {
          return (() => {
            that.fullHeight = document.documentElement.clientHeight;
            that.$refs.pageHeight.style.height = that.fullHeight + 'px';
          })()
        }
      }
    },
    initColor() {
      let val = '#409EFF'
      setTimeout(() => {
        let subItem = [].slice.call(document.getElementsByClassName('el-menu-item')).map(item => {
          
          item.onclick = function () {
            [].slice.call(document.getElementsByClassName('el-menu-item')).map(i => {
              i.isClick = false
              
            })
            item.isClick = true
            
          }
          
        })
        let _active = document.getElementsByClassName('el-menu-item is-active')
        if (_active.length !== 0) {
          _active[0].isClick = true
          let _child = _active[0].childNodes[0]
          if (_child.nodeName === 'SPAN') {
            _child.style.background = val
          }
        } else {
          this.initColor()
        }
      }, 500)
    },
    /*
     *全局websocket
     */
    connect(subTopic) {
      var that = this;
      var _url = api.forent_url.base_socket_url + '/ws';
      var socket = new SockJS(_url);
      that.stompClient = Stomp.over(socket);
      that.stompClient.connect({},
        function connectCallback(frame) {
          // 订阅 /topic/* 订阅模式,可以同时订阅多个主题
          that.stompClient.subscribe('/topic/' + subTopic, function (response) {
            var _data = response.body;
            _data = JSON.parse(_data);
            if (_data) {
              //var alarmObj = jQuery.parseJSON(_data);
              var alarmObj = _data;
              that.popAlarm.deviceId = alarmObj.deviceId; //设备id
              that.popAlarm.log = alarmObj.log; //经度
              that.popAlarm.lat = alarmObj.lat; //纬度
              that.popAlarm.deviceTypeName = alarmObj.deviceTypeName; //设备类型名称
              that.popAlarm.address = alarmObj.address; //设备地址
              that.popAlarm.alarmTime = alarmObj.alarmTime; //报警时间
              that.popAlarm.buildId = alarmObj.buildId; //楼栋id
              that.popAlarm.floorId = alarmObj.floorId; //楼层id
              that.popAlarm.laLoop = alarmObj.laLoop == null ? "" : alarmObj.laLoop; //回路
              that.popAlarm.laPoint = alarmObj.laPoint == null ? "" : alarmObj.laPoint; //点位
              that.popAlarm.receiveTime = alarmObj.receiveTime; //接收时间
              that.popAlarm.lastTime = alarmObj.lastTime; //接收预警时间
              that.popAlarm.devicetypeid = alarmObj.deviceTypeId; //接收报警类型
              if (!that.trueAlarmVis) {
                that.trueAlarmVis = true;
                // alert(1)
                // $("#alarm_pop").fadeIn();
                //   console.log("start");
                //  $("#alarm_pop").load("page/real-time-monitoring/alarm_pop.html");
                //  console.log("end");
              } else {
                console.log("多余数据不弹框...");
              }
            }
          })
        },
        function errorCallBack(error) {
          // 连接失败时（服务器响应 ERROR 帧）的回调方法
          console.log('stompWebSocket connect failed');
          setTimeout(function () {
            //var orgObj=JSON.parse(localStorage.getItem('yygl_orgObj'));
            that.connect(api.getGlobalVal("userObj").id);
          }, 120000);
        }
      );
      that.stompClient.heartbeat.outgoing = 300000;
      that.stompClient.heartbeat.incoming = 0; //客户端不从服务端接收心跳包
    },
    setColor() {
      let val = '#409EFF'
      setTimeout(() => {
        let _active = document.getElementsByClassName('el-menu-item is-active')
        if (_active.length !== 0) {
          _active[0].isClick = true
          let _child = _active[0].childNodes[0]
          if (_child.nodeName === 'SPAN') {
            _child.style.background = val
          }
        }
      }, 800)
    }
  },
  computed: {
    listAll: function () {
      return this.list
    },
    ...mapState(['GroupFlag'])
  },
  watch: {
    $route(to, from, sd) {
      this.lightMenu = (
        api.getGlobalVal("CmenuName").lightMenu ?
          api.getGlobalVal("CmenuName").lightMenu : (api.getGlobalVal("userObj").id == 'sa' ? '0-0' : '0'))
      this.setColor();
    },
    //自适应屏幕高度，监听屏幕高度 ryq
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
}

</script>
<style>
@import "../assets/font-icon/style.css";
.contentAll .logo-width .gg-logo {
  margin-top: 2.5rem;
  height: 50px;
  width: 80%;
  margin-left: 10%;
  text-align: center;
  background: url(../assets/img/logo.png) no-repeat center/100% auto;
}

/* 全局弹框动画效果 */
@keyframes dialog-fade-in {
  0% {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
}

</style>
<style scoped="scoped" type="text/css">
.el-menu{
	background: transparent;
}
	.el-menu-item{
		background: transparent;
		line-height: 38px;
		height: 38px;
		padding: 0 5px;
		margin-top: 10px;

	}
	.el-menu-item a{
		color: #fff;
		font-size: 16px;
		display: block;
		text-indent: 30px;
    margin: 0 auto;
        border-radius: 31px;
	}
	.nuxt-link-active{
		background: linear-gradient(90deg,#1d71f2,#1bb9fa)!important;
	}
	.menu-collapsed .el-menu-item{
		
	}
	.menu-collapsed .el-menu-item a{
		font-size: 12px;
		text-indent: -2px;
	}
</style>