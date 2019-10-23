<template>
    <div :class="['gg-body-bg',{group_light:group_light}]">
        <header class="gg-header">
            <div class="gg-header-logo">
                <div class="gg-group-logo"></div>
            </div>
            <div class="gg-header-build">
                <span class="ggicon-building"></span>
                <span class="gg-header-name">{{GroupName}}</span>
            </div>
            <div class="gg-header-nav">
                <ul class="gg-header-nav_ul">
                    <li>
                        <div style="color:#fff;">
                            <span @click="changeColor" class="gg-header-nav_item_icon changeTone" style="cursor: pointer;">
                                <b :class="['change_tone_btn',group_light?'ggicon-dark_bg_btn':'ggicon-light_bg_btn']"></b>
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span class="gg-header-nav_item_icon toHome" @click="to_index">
                                <i class="ggicon-homeActive"></i>
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span class="gg-header-nav_item_icon gg-admin-avatar">
                                <b class="ggicon-user"></b>
                            </span>
                            <span class="gg-header-nav_user">
                                <em>{{GroupName}}</em>
                                <i class="ggicon-arrowDown"></i>
                            </span>
                        </div>
                        <div class="gg-exit-model">
                            <div class="gg-exit-item" @click="openUpdatePaw">
                                <b class="ggicon-passowrd"></b>修改密码
                            </div>
                            <div class="gg-exit-item" @click="logOut">
                                <b class="ggicon-exit"></b>退出系统
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
        <el-map @childHandleGroup_light="childLight" :group_light="group_light"/>
        <change-psw :changePswVis="changePswVis" @success="success"/>
    </div>
</template>

<script>
  import api from '~/config/http';
  import ElMap from '~/pages/Group/ElMap';
  import ChangePsw from '~/pages/ChangePsw';
  import {mapMutations} from 'vuex'

  export default {
    layout: "login",
    data() {
      return {
        GroupName: '',
        changePswVis: false,
        userObj: {},
        flag: false,
        group_light: true,//如果是true就是白天效果,如果是false就是黑夜效果
      }
    },
    created() {

    },
    methods: {
      ...mapMutations(['changeGroupFlag', 'update', 'updateUserObj']),
      //获取用户名
      getGroupName(orgCode) {
        console.log(orgCode);
        api.get(api.forent_url.base_url + "/sys/org/" + orgCode)
          .then((data) => {
            if (data&&data.code == 'success') {
              this.GroupName = data.data.orgName;
            }
          })
      },
      success(res) {
        this.changePswVis = res;
      },
      openUpdatePaw() {
        this.changePswVis = true;
      },
      logOut() {
        //退出登录
        this.$confirm('是否确认退出?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        }).then(() => {
          api.removeGlobalVal("loginName");
          api.removeGlobalVal("userObj");
          api.removeGlobalVal("bus_group_userObj");
          this.update('');//操作vuex
          this.updateUserObj({});//操作vuex
          this.$router.push({
            "path": "/login"
          });
        }).catch((err) => {

        })
      },
      to_index() {
        this.changeGroupFlag(true);
        api.setGlobalVal('userObj', JSON.stringify(api.getGlobalVal('bus_group_userObj')));
        let toIndex = this.$router.resolve({
          name: 'index'
        })
        api.setGlobalVal("bus_groupStatus",'200');
        window.open(toIndex.href,"index");
      },
      //  手动换色
      changeColor() {
        this.group_light = !this.group_light;
      },
      childLight(val){
        this.group_light = val;
      }
    },
    mounted(){
      //=>TODO:防止orgCode找不到,报错!!
      new Promise((resolve, reject) => {
        this.userObj = api.getGlobalVal('bus_group_userObj');
        resolve(this.userObj.orgCode);
      })
        .then((data) => {
          this.getGroupName(data);
        })
      window.onresize=()=>{
        return false;
      }
    },
    components: {
      ElMap,
      ChangePsw
    }
  }
</script>
<style lang="scss" scoped>
    @import "../assets/font-icon/style.css";

    .group_light.gg-body-bg {
        height:100vh;
        font-size: 16px;
        .gg-header {
            width: 100%;
            height: 74px;
            background: #162b49;
            .gg-header-logo {
                display: inline-block;
                width: 230px;
                height: 74px;
                background: #132a48;
                float: left;
                .gg-group-logo {
                    display: inline-block;
                    width: 230px;
                    height: 74px;
                    background: url(../assets/img/group_logo.png) no-repeat center center;
                }
            }
        }
        .gg-header-build {
            display: inline-block;
            color: #fff;
            float: left;
            margin-left: 20px;
            /*字体*/
            .ggicon-building {
                font-size: 26px;
                margin: 0 10px;
                line-height: 70px;
            }
            .gg-header-name {
                font-size: 22px;
                letter-spacing: 2px;
            }

        }
        .gg-header-nav {
            display: inline-block;
            float: right;
            .gg-header-nav_ul {
                margin: 0;
                padding: 10px 30px 0 0;
                li {
                    position: relative;
                    display: inline-block;
                    padding: 12px 10px 18px;
                    .gg-header-nav_item_icon.toHome {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        border: 1px solid #4c5765;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 32px;
                        cursor: pointer;
                    }
                    .gg-header-nav_item_icon.gg-admin-avatar {
                        display: inline-block;
                        width: 32px;
                        height: 32px;
                        background: #4c5765;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 32px;
                        color: #fff;
                    }
                    .gg-exit-model {
                        display: none;
                        position: absolute;
                        top: 62px;
                        left: 4px;
                        box-sizing: border-box;
                        width: 125px;
                        padding-top: 8px;
                        padding-bottom: 8px;
                        background-color: #0f2744;
                        border-radius: 3px;
                        z-index: 30;
                        .gg-exit-item {
                            display: block;
                            padding: 6px 15px;
                            font-size: 16px;
                            color: #fff;
                            cursor: pointer;
                            b {
                                margin-right: 10px;
                                font-size: 18px;
                            }
                        }
                        .gg-exit-item:hover {
                            -webkit-box-shadow: inset 0 0 35px rgba(213, 240, 255, .8);
                            -moz-box-shadow: inset 0 0 35px rgba(213, 240, 255, .8);
                            box-shadow: inset 0 0 35px rgba(213, 240, 255, .8);
                        }
                        &:before {
                            content: '';
                            transform: rotate(45deg);
                            position: absolute;
                            top: -8px;
                            left: 15px;
                            display: block;
                            width: 15px;
                            height: 15px;
                            background: #0f2744;
                            box-shadow: -1px -1px 1px 0 rgba(114, 198, 247, .6);
                        }
                    }
                    .gg-header-nav_user {
                        color: #fff;
                        .ggicon-arrowDown {
                            margin-left: 8px;
                            position: relative;
                            top: 2px;
                            color: #888f99;
                        }
                    }

                }
            }
        }
    }

    .gg-body-bg .gg-header-nav_item_icon.changeTone, .gg-body-bg .gg-header-nav_item_icon.toHome {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #4c5765;
        border-radius: 50%;
        text-align: center;
        line-height: 32px;
    }

    .change_tone_btn.ggicon-light_bg_btn {
        color: #ffd200;
    }

    .ggicon-homeActive::before {
        color: #14adef;
    }

    .gg-header-nav_ul li:hover .gg-exit-model {
        display: block !important;
    }

    /*黑夜模式*/
    /*.gg-header {*/
    /*background: #162b49;*/
    /*.gg-header-logo {*/
    /*background: red;*/
    /*}*/
    /*}*/

    /*.gg-body-bg .gg-header {*/
    /*width: 100%;*/
    /*height: 74px;*/
    /*background: red;*/
    /*}*/

    .gg-body-bg {
        font-size: 16px;
        height:100vh;
        .gg-header {
            width: 100%;
            height: 74px;
            background: #101f32;
            .gg-header-logo {
                display: inline-block;
                width: 230px;
                height: 74px;
                background: #132a48;
                float: left;
                .gg-group-logo {
                    display: inline-block;
                    width: 230px;
                    height: 74px;
                    background: url(../assets/img/group_logo.png) no-repeat center center;
                }
            }
        }
        .gg-header-build {
            display: inline-block;
            color: #fff;
            float: left;
            margin-left: 20px;
            /*字体*/
            .ggicon-building {
                font-size: 26px;
                margin: 0 10px;
                line-height: 70px;
            }
            .gg-header-name {
                font-size: 22px;
                letter-spacing: 2px;
            }

        }
        .gg-header-nav {
            display: inline-block;
            float: right;
            .gg-header-nav_ul {
                margin: 0;
                padding: 10px 30px 0 0;
                li {
                    position: relative;
                    display: inline-block;
                    padding: 12px 10px 18px;
                    .gg-header-nav_item_icon.toHome {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        border: 1px solid #4c5765;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 32px;
                        cursor: pointer;
                    }
                    .gg-header-nav_item_icon.gg-admin-avatar {
                        display: inline-block;
                        width: 32px;
                        height: 32px;
                        background: #4c5765;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 32px;
                        color: #fff;
                    }
                    .gg-exit-model {
                        display: none;
                        position: absolute;
                        top: 62px;
                        left: 4px;
                        box-sizing: border-box;
                        width: 125px;
                        padding-top: 8px;
                        padding-bottom: 8px;
                        background-color: #0f2744;
                        border-radius: 3px;
                        z-index: 30;
                        .gg-exit-item {
                            display: block;
                            padding: 6px 15px;
                            font-size: 16px;
                            color: #fff;
                            b {
                                margin-right: 10px;
                                font-size: 18px;
                            }
                        }
                        .gg-exit-item:hover {
                            -webkit-box-shadow: inset 0 0 35px rgba(213, 240, 255, .8);
                            -moz-box-shadow: inset 0 0 35px rgba(213, 240, 255, .8);
                            box-shadow: inset 0 0 35px rgba(213, 240, 255, .8);
                        }
                        &:before {
                            content: '';
                            transform: rotate(45deg);
                            position: absolute;
                            top: -8px;
                            left: 15px;
                            display: block;
                            width: 15px;
                            height: 15px;
                            background: #0f2744;
                            box-shadow: -1px -1px 1px 0 rgba(114, 198, 247, .6);
                        }
                    }
                    .gg-header-nav_user {
                        color: #fff;
                        .ggicon-arrowDown {
                            margin-left: 8px;
                            position: relative;
                            top: 2px;
                            color: #888f99;
                        }
                    }

                }
            }
        }
    }

    .gg-body-bg .gg-header-nav_item_icon.changeTone, .gg-body-bg .gg-header-nav_item_icon.toHome {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #4c5765;
        border-radius: 50%;
        text-align: center;
        line-height: 32px;
    }

    .change_tone_btn.ggicon-light_bg_btn {
        color: #ffd200;
    }

    .ggicon-homeActive::before {
        color: #14adef;
    }

    .gg-header-nav_ul li:hover .gg-exit-model {
        display: block !important;
    }
</style>

