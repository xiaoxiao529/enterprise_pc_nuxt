<template>
    <div class="Panel">
        <div class="gg-warnNum-dialog gg-prober-pos gg-warnNum-short-dialog">
            <div class="gg-prober-header clearfix">
                <div class="gg-prober-header--info">
                    <span class="gg-prober-h5" id="deviceTitle">气体喷嘴</span><a class="gg-online-item"><span
                        id="onlineState"></span></a>
                    <a class="gg-prober-location"><span id="deviceTitle1" title="">指挥中心大楼（1号楼）1层指挥中心大楼一层数据机房内东南侧</span></a>
                </div>
                <div class="gg-prober-group">
                    <a class="gg-normal-item"><span id="currentState">正常</span></a>
                </div>
            </div>
            <div class="gg-prober-body">
                <div class="gg-prober-content">
                    <div class="gg-switch-content">
                        <div class="gg-btn-capsuleGroup gg-btn-capsuleInline gg-prober-capsule">
                            <a @click.prevent="infoState=0" :class="['gg-btn-capsule', {'is-active':infoState==0}]" name="info">设施信息</a>
                            <a @click.prevent="infoState=1" :class="['gg-btn-capsule',{'is-active':infoState==1}]" name="accidRecord">异常记录</a>
                        </div>
                    </div>
                    <div class="gg-prober-model">
                        <div v-show="infoState==0" class="gg-prober-unit ">
                            <!--设施信息 列表-->
                            <div class="gg-prober-device-list">
                                <div class="gg-prober-device">
                                    <span class="gg-probe-cell">回路点位：</span>
                                    <span class="gg-probe-cell">
                                                        <a class="gg-probe-unit-item" id="loop">-</a>
                                                    </span>
                                </div>
                                <div class="gg-prober-device">
                                    <span class="gg-probe-cell">设备ID：</span>
                                    <span class="gg-probe-cell" id="deviceId">33455</span>
                                </div>
                                <div class="gg-prober-device">
                                    <span class="gg-probe-cell">设施品牌：</span>
                                    <span class="gg-probe-cell">
                                                       <a class="gg-probe-unit-item" id="deviceBrand">DN40</a>
                                               </span>
                                </div>
                            </div>
                        </div>
                        <div v-show="infoState==1" class="gg-prober-unit">
                            <!--异常记录 列表-->
                            <ul class="gg-probe-list" id="deviceAccident">
                                <li><a class="gg-probe-list--item" title="发生了报警"><span class="gg-probe-list--num">1</span>发生了报警</a><a class="gg-probe-list--item"><span class="gg-probe-list--time">2018-12-06 16:07:25<span class="gg-margin-l-20"></span></span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "ElectricalPanel",
    data() {
      return {
        //控制选项卡索引
        infoState:0
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
    .gg-prober-header, .gg-prober-body {
        line-height: 2;
    }

    @media screen and (max-width: 1920px) {
        html {
            font-size: 62.5%;
        }
    }

    @media screen and (max-width: 1680px) {
        html {
            font-size: 50%;
        }
    }

    @media screen and (max-width: 1440px) {
        html {
            font-size: 45%;
        }
    }

    .nav-sec-ul li:hover,
    .nav-first-ul .is-checked, .fir-is-checked {
        background: linear-gradient(to right, #1d71f2, #1bb9fa);
    }

    .gg-nav-body li span {
        font-size: 1.8rem;
        color: #fff;
    }

    .nav-sec-ul li {
        line-height: 2.8rem;
        border-radius: 1.5rem;
        cursor: pointer;
        color: #fff;
        font-size: 1.7rem;
        margin: 1rem;
        padding-left: 2.5rem;
    }

    .nav-sec-ul li span {
        margin-right: .8rem;
        font-size: 1.6rem;
        font-weight: 600;
    }

    .nav-first-li a b {
        position: relative;
        top: .2rem;
        margin-left: .9rem;
        color: #fff;
        font-size: 2rem;
    }

    .nav-first-li a span {
        margin-left: 1.5rem;
    }

    @media screen and (max-width: 1440px) {

        .nav-first-li a span {
            margin-left: .8rem;
        }

        .nav-sec-ul li {
            line-height: 30px;
            margin: .4rem .6rem;
            padding-left: 2.2rem;
        }
    }

    .gg-nav-head .is-active {
        display: block;
    }

    .gg-login-info ul {
        list-style-type: none;
    }

    .gg-login-info ul li {
        float: left;
        margin-left: .4rem;
        margin-right: 1.4rem;
        font-size: 16px;
        line-height: 55px;
        color: #6a6a6a;
    }

    @media screen and (max-width: 1440px) {
        .gg-login-info ul li {
            font-size: 14px;
        }
    }

    #gg-admin-logo img {
        width: 10% !important;
        height: 10% !important;
    }

    #gg-admin-logo ul {
        display: none;
    }

    #gg-admin-logo ul li:hover {
        color: #185785;
    }

    #gg-admin-logo:hover > ul {
        display: block;
    }

    #gg-admin-logo ul:before {
        content: '';
        position: absolute;
        left: 40%;
        top: -21px;
        display: block;
        border: 10px solid transparent;
        border-bottom-color: #a5a5a5;
    }

    #gg-admin-logo ul:after {
        content: '';
        position: absolute;
        left: 40%;
        top: -20px;
        display: block;
        border: 10px solid transparent;
        border-bottom-color: #fff;
    }

    #gg-admin-logo ul {
        padding-left: 10px;
        width: 100px;
        height: 60px;
        background: #fff;
        position: relative;
        top: 44px;
        right: 32px;
        z-index: 6;
        border-radius: 5px;
        border: 1px solid #d6ddec;
        box-shadow: 0 0 1px rgba(37, 40, 41, .5);
    }

    #gg-admin-logo ul li {
        color: #000;
        height: 24px;
        line-height: 24px;
        margin: 0;
        margin-top: 5px;
        font-size: 14px;
    }

    #gg-admin-logo ul li b {
        color: #108cee;
        font-weight: 700;
        margin-right: 10px;
    }

    .gg-fire-info ul {
        list-style-type: none;
    }

    .gg-fire-info .fire-info-normal li {
        position: relative;
        float: left;
        margin-right: 1%;
        width: 31.5%;
        height: 100px;
        line-height: 100px;
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 0 30px rgba(37, 40, 41, .13);
        cursor: pointer;
    }

    /*linyi*/
    .gg-fire-info .fire-info-linyi li {
        position: relative;
        float: left;
        margin-right: 10px;
        width: calc((100% - 20px) / 3);
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 0 30px rgba(37, 40, 41, .13);
        cursor: pointer;
    }

    .gg-fire-info ul li div {
        float: left;
    }

    @media screen and (max-width: 1440px) {

        .gg-fire-info .fire-info-normal li {
            height: 84px;
            line-height: 84px;
        }
    }

    .gg-check-main li span {
        font-size: 1.6rem;
        margin-left: 1rem;
    }

    #deviceAccident {
        border: 1px solid #ccc;
        border-bottom: none;
        border-left: none;
        border-right: none;
    }

    .gg-check-main li {
        height: 22px;
        margin: 1rem 0 1rem 1rem;
    }

    .gg-check-main li div {
        float: left
    }

    @media screen and (max-width: 1440px) {
        .gg-check-main li span {
            margin-left: .6rem;
        }
    }

    .gg-build-fire div {
        width: 40px;
        height: 55px;
        margin-top: .5rem;
        /*background: url('../image/fire-logo.png')*/
    }

    .build-content-head table {
        margin-left: 0;
        width: 96%;
    }

    .build-td-select select {
        width: 80%;
        height: 30px;
    }

    #build_content .gg-enlarge-btn, #build_content .gg-narrow-btn {
        position: absolute;
        right: 2rem;
        top: 1rem;
        cursor: pointer;
    }

    .gg-enlarge-btn .ggicon-enlarge, .gg-narrow-btn .ggicon-narrow {
        margin: 0;
        font-size: 2.2rem;
        color: #949494;
    }

    #build_content .gg-narrow-btn {
        display: none;
    }

    .gg-search-btn button {
        width: 80px;
        height: 30px;
        border-radius: 5px;
        background: #4777e7;
        text-align: center;
        border: 0;
        color: #fff;
        font-size: 1.4rem;
    }

    /* 闅愯棌宸︿晶鑿滃崟鏍�  */
    .min-side .nav-first-li .ggicon-arrowRight,
    .min-side .nav-first-li a span {
        display: none;
        transition: all .5s linear;
    }

    @media screen and (max-width: 1680px) {
        .min-side .nav-sec-div {
            width: 180px;
        }

        .nav-first-li a b {
            margin-left: 1rem;
        }
    }

    .floor-nav a {
        color: #424242;
        display: block;
        text-align: center;
    }

    .floor-ul-div ul li {
        position: relative;
        text-align: center;
        font-size: 1.6rem;
    }

    .icon-lift-up > i,
    .icon-lift-down > i {
        font-size: 20px;
    }

    @media screen and (max-width: 1440px) {
        .floor-ul-div {
            height: 240px;
        }

        .floor-header .gg-floor-btn {
            height: 30px;
            padding: 0;
        }
    }

    .floor-ul-div > ul {
        list-style: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0;
        margin: 0;
    }

    .floor-ul-div > ul > li {
        position: relative;
        width: 100%;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #000;
        margin-bottom: 8px;
    }

    .floor-ul-div > ul > li.is-warning a {
        color: #ff9204;
    }

    .floor-ul-div > ul > li > b {
        position: absolute;
        bottom: -2px;
        right: -2px;
        font-size: 20px;
    }

    .gg-warnNum-short-dialog {
        width: 450px;
        height: 330px;
    }

    .gg-prober-pos {
        position: absolute;
        top: 270px;
        left: 395px;
        width: 468px;
        height: 300px;
        padding: 12px 9px;
        text-align: left;
    }

    .gg-warnNum-short-dialog {
        width: 450px;
        height: 330px;
    }

    .gg-warnNum-dialog {
        position: absolute;
        z-index: 999;
        border: 1px solid #3c8dbc;
        background-color: #fff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .22), 0 0 6px rgba(0, 0, 0, .34);
    }

    .gg-warnNum-dialog:before, .gg-warnNum-dialog:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: -18px;
        display: block;
        width: 0;
        height: 0;
        border: 9px solid transparent;
        margin-left: -9px;
    }

    .gg-warnNum-dialog:before {
        border-top-color: #3c8dbc;
    }

    .gg-warnNum-dialog:after {
        border-width: 8px;
        border-top-color: #fff;
        bottom: -16px;
        margin-left: -8px;
    }

    .gg-prober-header {
        padding-bottom: 9px;
        text-align: left;
    }

    .gg-btn-capsuleGroup a {
        float: left;
        margin-right: 0.5rem;
    }

    .gg-prober-h5 {
        font-size: 1.8rem;
        color: #3e3d3d;
        font-weight: 600;
    }

    .gg-probe-cell a {
        color: #000000;
    }

    #deviceId {
        color: #000000;
    }

    .gg-switch-content {
        border-top: 1px solid #eeeeee;
        padding-top: 0.6rem;
    }

    /*骞抽潰鍥惧脊绐�*/
    .gg-prober-location {
        font-size: 1.6rem;
        padding-top: .8rem !important;
        padding-bottom: .4rem !important;
        color: #000000;
        display: block;
        width: 70%;
        margin-left: 0;
    }

    .gg-online-item {
        display: inline-block;
        padding: 0 9px;
        margin-left: 10px;
        color: #fff;
        font-size: 16px;
        background-color: #66CC99;
        border-radius: 5px;
    }

    .gg-prober-header .gg-prober-group {
        position: absolute;
        top: 20px;
        right: 20px;
    }

    .gg-normal-item {
        display: inline-block;
        padding: 5px 9px;
        color: #fff;
        font-size: 16px;
        background-color: #66CC99;
    }

    .gg-prober-unit {
        margin-top: 10px;
    }

    .gg-probe-list li {
        border-bottom: 1px solid #ccc;
        padding: 8px;
    }

    #deviceAccident li:nth-child(odd) {
        background-color: #f8f9fa;
    }

    .gg-btn-capsule {
        color: #808080;
        font-size: 1.6rem;
        border-radius: 5px;
        border: 1px solid #808080;
        cursor: pointer;
    }

    .gg-btn-capsule:hover {
        border: 1px solid #0d87d4;
        color: #0d87d4;
    }

    .gg-btn-capsule.is-active {
        border: 1px solid #0d87d4;
        color: #0d87d4;

    }

    .gg-prober-device {
        margin: 5px 0 5px 0;
    }

    .gg-prober-device span, .gg-probe-list li a {
        font-size: 1.6rem;
    }

    .gg-prober-model {
        display: inline-block;
        width: 100%;
    }
    .gg-probe-list--time {
        float: right;
    }
</style>
