<template>
  <div class="videoDialog">
    <el-dialog title :visible.sync="isShowVideo" :before-close="handleClose" width="600px">
      <!-- before-close="handleClose" class="add" :close-on-click-modal="false" -->
      <video id="myPlayer" controls playsinline webkit-playsinline autoplay>
        <source type="application/x-mpegURL" :src="http_url">
        <!-- <source :src="rtmp_url"/> -->
      </video>
    </el-dialog>
  </div>
</template>
<script>
import api from "~/config/http";
require("~/static/js/ezuikit1.3.js");
import { Message } from "element-ui";
export default {
  props: {
    videoPath: String,
    isShowVideo: Boolean
  },

  data() {
    return {
      player: "",
      rtmp_url: "",
      http_url: "",
      message: "加载中...",
      myVideo: this.isShowVideo,
      path: ""
    };
  },
  mounted() {
    require("~/static/js/ezuikit1.3.js");
    this.GetLiveUrl();
  },
  updated() {
    //在mounted中声明，直播地址还未取到，导致视频不显示。所以放在这里
    this.player = new EZUIPlayer("myPlayer");
  },
  methods: {
    GetLiveUrl() {
      this.http_url = this.videoPath; //清华1号楼消控室
      //this.http_url = "http://hls.open.ys7.com/openlive/9d00aac8a2b6482abb281167b405afdb.hd.m3u8";//
    },
    handleClose() {
      this.myVideo = false;
      this.$emit("showV", false);
    }
  }
};
</script>
<style lang="scss">
.videoDialog .el-dialog .el-dialog__header {
  padding: 0;
  height: 27px;
  background: transparent;
}
.videoDialog .el-dialog .el-dialog__body {
  padding: 0;
}
.videoDialog .el-dialog__headerbtn {
  top: 5px;
}
</style>
<style lang="scss" scoped>
body {
  margin: 0;
}

#url {
  width: 100%;
}

#myPlayer {
  width: 600px;
  height: 400px;
}

.headclosd {
  width: 600px;
  height: 40px;
}

/* .headclosd a{    top: 15px;
        position: absolute;
        font-size: 13pt;
        color: #bec4e0;
        font-weight: 50;
        padding-left: 480px;
        text-decoration: none;
        } */
.dsb-btn-close {
  cursor: pointer;
  z-index: 20000;
  display: block;
  position: absolute;
  right: 15px;
  top: 75px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #194063;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.dsb-btn-close:before,
.dsb-btn-close:after {
  position: absolute;
  display: inline-block;
  opacity: 0.8;

  content: "";
  background-color: #fff;
}

.dsb-btn-close:before {
  top: 3px;
  left: 50%;
  width: 2px;
  height: 18px;
  margin-left: -2px;
  transform: scale(0.8);
}

.dsb-btn-close:after {
  left: 3px;
  margin-top: -2px;
  top: 50%;
  width: 18px;
  height: 2px;
  transform: scale(0.8);
}

.dsb-btn-close:hover {
  background-color: #1c588e;
}
</style>
