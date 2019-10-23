<template>
  <div>
    <div v-show="isTrue" class="container-num">
      <div class="advertise-container">
        <!--<h1 style="color:red;text-align: center;z-index:10">通知公告</h1>-->
        <p class="advertise-title">通知公告</p>
        <div class="advertise-headerImage">
          <img src="~/assets/img/advertise.png" alt="">
        </div>
        <div class="advertise-body">
          <p id="btn_innerHTML">为了给各位新老用户带来更好的产品体验，消防管家将在下一个版本切换为手机号码登录，届时手机号码将作为唯一的登录凭证。敬请各位新老用户拨打服务热线或线下联系商务人员补充或更新您的手机号码信息。感谢支持！
          </p>
          <p> 服务热线：0551-64367593 服务时间：9:00~18:00</p>

          <p id="advertise-close" @click="closeNotice">关闭</p>
        </div>
      </div>
    </div>
    <div v-show="isTrue" class="open-window"></div>
  </div>

</template>
<script>
export default {
    data() {
        return{
            isTrue:true
        }
    },
    methods:{
        closeNotice:function(){
            this.isTrue = false;
        }
    }
}
</script>
<style lang="scss" scoped>
  /* 通知公告 */
  .open-window {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
  }

  .container-num {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -240px 0 0 -418px;
    z-index: 1000;

  }

  .advertise-container {
    margin-top: 30px;
    width: 836px;
    height: 480px;
    background: white;
    position: relative;
    z-index: 199;

    .advertise-headerImage {
      position: absolute;
      left: 115px;
      top: -30px;
    }

    .advertise-title {
      margin: 0;
      position: absolute;
      left: 340px;
      display: block;
      color: white;
      font-size: 40px;
      z-index: 99;
      letter-spacing: 10px;
      top: -10px;
    }

  }

  .advertise-body {
    /*width:757px;*/
    width: 760px;
    height: 380px;
    border: 4px dotted #4777e7;
    position: absolute;
    left: 35px;
    top: 35px;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;

    p:first-child {
      margin: 0;
      padding: 110px 68px;
      font-size: 24px;
      line-height: 35px;
      text-indent: 2em;
    }

    p:nth-child(2) {
      margin: 0;
      font-size: 24px;
      line-height: 35px;
      text-indent: 2em;
      color: #4777e7;
      position: absolute;
      bottom: 90px;
      left: 22px;
    }

    p:last-child {
      margin: 0;
      font-size: 22px;
      line-height: 35px;
      text-indent: 2em;
      font-weight: 100;
      color: black;
      position: absolute;
      bottom: 20px;
      right: 35px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 1440px) {
    /* 通知公告 */

    .advertise-container {
      width: 700px;
      height: 410px;

      .advertise-title {
        left: 276px;
        top: -8px;
        font-size: 30px;
      }

      .advertise-headerImage {
        top: -24px;
      }
    }

    .advertise-body {
      width: 620px;
      height: 335px;

      p:first-child {
        font-size: 18px;
        padding: 55px 68px;
      }

      p:nth-child(2) {
        bottom: 80px;
        font-size: 20px;
        text-align: center;
        left: 32px;
      }

      p:last-child {
        font-size: 16px;
      }
    }

    .advertise-headerImage img {
      width: 81%;
    }

    .container-num {
      margin: -240px 0 0 -350px;
    }

  }

</style>
