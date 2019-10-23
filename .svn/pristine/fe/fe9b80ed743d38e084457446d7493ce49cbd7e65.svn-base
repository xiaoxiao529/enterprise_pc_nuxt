<template>
  <div class="main priseInfo">
    <el-row>
      <el-col :span="24">
        <div class="grid-content notab">
          <Title />
          <el-scrollbar>
            <div class="gg-base-info" v-show="showMain">
              <div id="baseInfo" class="baseInfo-container">
                <span id="subCenterCode">{{enterpriseInfo ? enterpriseInfo[0].subCenterName : ''}}</span>
                <span id="serviceModelName">{{enterpriseInfo ? enterpriseInfo[0].serviceModelName : ''}}</span>
                <span style="margin-right:0">服务期:</span>
                <span id="serviceStartDate">{{enterpriseInfo ? enterpriseInfo[0].serviceStartDate : ''}}</span>
                <span>~</span>
                <span id="serviceEndDate">{{enterpriseInfo ? enterpriseInfo[0].serviceEndDate : ''}}</span>
                <el-button type="primary" class="gg-btn  baseInfo-btn" @click="editBtn(priseInfo)">编辑</el-button>
              </div>
              <div class="gg-base-unit" v-loading="isLoading">
                <h3 class="gg-base-h3">基本信息</h3>
                <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
                  <colgroup>
                    <col width="7.5%" />
                    <col width="17.5%" />
                    <col width="7.5%" />
                    <col width="17.5%" />
                    <col width="7.5%" />
                    <col width="42.5%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>单位编号：</th>
                      <td colspan="3">{{ priseInfo.unitId }}</td>
                      <th>信用代码：</th>
                      <td>
                        {{ priseInfo.unitCreditCode }}</td>
                    </tr>
                    <tr>
                      <th>单位名称：</th>
                      <td colspan="3">
                        {{ priseInfo.unitName }}</td>
                      <th>单位简称：</th>
                      <td>
                        {{ priseInfo.unitShortName }}</td>
                    </tr>
                    <tr>
                      <th>英文名称：</th>
                      <td colspan="3">
                        {{ priseInfo.unitEnglishName }}</td>
                      <th>单位类别：</th>
                      <td>
                        {{ unitClassList[priseInfo.unitClass] }}</td>
                    </tr>
                    <tr>
                      <th>所属行业：</th>
                      <td colspan="3">
                        {{ unitIndustryList[priseInfo.unitIndustry] }}</td>
                      <th>单位地址：</th>
                      <td>
                        {{ region.provinceName + region.cityName + region.countryName + priseInfo.unitAddress }}</td>
                    </tr>
                    <tr>
                      <th>占地面积：</th>
                      <td colspan="3">
                        {{ priseInfo.areaCode }}</td>
                      <th>常驻人数：</th>
                      <td>
                        {{ priseInfo.employeeNum }}</td>
                    </tr>
                    <tr>
                      <th>总建筑面积：</th>
                      <td colspan="3">
                        {{ priseInfo.buildArea }}</td>
                      <th>建筑数量：</th>
                      <td>
                        {{ priseInfo.buildCount }}</td>
                    </tr>
                    <tr>
                      <th>风险类别：</th>
                      <td colspan="3">
                        {{ riskClassList[priseInfo.riskClass] }}</td>
                      <th>经济所有制：</th>
                      <td>
                        {{ unitPropertyList[priseInfo.unitProperty] }}</td>
                    </tr>
                    <tr>
                      <th>消防主管部门：</th>
                      <td colspan="5">
                        {{ priseInfo.superviseClass }}</td>
                    </tr>
                    <tr>
                      <th class="va-top">单位简介：</th>
                      <td colspan="5">
                        {{ priseInfo.introduce }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="gg-base-unit">
                <h3 class="gg-base-h3">法人</h3>
                <table class="gg-table gg-tableFix">
                  <colgroup>
                    <col width="7.5%" />
                    <col width="17.5%" />
                    <col width="7.5%" />
                    <col width="17.5%" />
                    <col width="7.5%" />
                    <col width="42.5%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>单位法人：</th>
                      <td colspan="3">
                        {{ priseInfo.legalperson }}</td>
                      <th>身份证号：</th>
                      <td>
                        {{ priseInfo.legalpersonIdnum }}</td>
                    </tr>
                    <tr>
                      <th>联系方式：</th>
                      <td>
                        {{ priseInfo.legalpersonTel }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="gg-base-unit">
                <h3 class="gg-base-h3">消防安全责任人</h3>
                <table class="gg-table gg-tableFix">
                  <colgroup>
                    <col width="7.5%" />
                    <col width="17.5%" />
                    <col width="7.5%" />
                    <col width="17.5%" />
                    <col width="7.5%" />
                    <col width="42.5%" />
                  </colgroup>
                  <tbody>
          
                    <tr>
                      <th>责 任 人：</th>
                      <td colspan="3">
                        {{ priseInfo.personliable }}</td>
                      <th>身份证号：</th>
                      <td>
                        {{ priseInfo.personliableIdnum }}</td>
                    </tr>
                    <tr>
                      <th>联系方式：</th>
                      <td>
                        {{ priseInfo.personliableTel }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="gg-base-unit">
                <h3 class="gg-base-h3">消防安全管理人</h3>
                <table class="gg-table gg-tableFix">
                  <colgroup>
                    <col width="7.5%" />
                    <col width="17.5%" />
                    <col width="7.5%" />
                    <col width="17.5%" />
                    <col width="7.5%" />
                    <col width="42.5%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>管 理 人：</th>
                      <td colspan="3">
                        {{ priseInfo.contacts }}</td>
                      <th>身份证号：</th>
                      <td>
                        {{ priseInfo.contactsIdnum }}</td>
                    </tr>
                    <tr>
                      <th>联系方式：</th>
                      <td>
                        {{ priseInfo.contactsTel }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>


            <!-- 编辑页面 -->
            <Edit v-if="!showMain" :showMain="showMain"  v-on:exitEdit="exitEdit" :mainPriseInfo="priseInfo"/>
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '~/config/http';
  import Title from '~/components/Title';
  import ZSPriseInfo from '~/config/priseInfo';
  import Edit from '~/pages/MessManage/PriseInfoView/Edit';

  import {
    Message
  } from 'element-ui'
  export default {
    components: {
      Title,
      Edit
    },
    data() {
      
      
      return {
        isLoading: true,
        userObj: api.getGlobalVal("userObj"),
        showMain:true,
        subOrgCode: '',
        enterpriseInfo: '', //顶部基础信息
        priseInfo: {},
        region: {},
        unitClassList: ZSPriseInfo.ZS.priseInfo.unitClassList,
        unitIndustryList: ZSPriseInfo.ZS.priseInfo.unitIndustryList, // 所属行业
        riskClassList: ZSPriseInfo.ZS.priseInfo.riskClassList, // 风险类别
        unitPropertyList: ZSPriseInfo.ZS.priseInfo.unitPropertyList, // 风
      }
    },
    created() {},
    mounted() {
      this.getData();

    },
    methods: {
      /**
       * 获取组织机构 详细信息
       * @param orgCode
       */
      // getRelationId() {
      //   let that = this;
      //   api.post(api.forent_url.base_url + '/system/getEmsOrg', {
      //     orgCode: that.userObj.orgCode
      //   }).then(res => {
      //     var code = res["code"];
      //     if (code == "success") {
      //       that.subOrgCode = res["data"].extendstr7;
      //     } else {
      //       Message.error(res["message"]);
      //     }
      //   })
      // },
      async getData() {
        let that = this;
        let temp;
        api.post(api.forent_url.base_url + '/system/getEmsOrg', {
          orgCode: that.userObj.orgCode
        }).then(res => {
          var code = res["code"];
          if (code == "success") {
            that.subOrgCode = (res["data"] && res["data"].extendstr7 ? res["data"].extendstr7 : '');

          } else {
            Message.error(res["message"]);
          }
        })
        /* 查询组织机构基本信息 查询 服务中心编码 */
        await api.post(api.forent_url.base_url + '/relation/getRelationInfo', {
          "unitId": that.userObj.orgCode,
          "subOrgCode": that.subOrgCode
        }).then(res => {
          var code = res["code"];
          if (code == "success") {
            var data = res["data"];
            that.enterpriseInfo = data["data"].enterpriseInfo;
          } else {
            Message.error(res["message"]);
          }
        })

        api.get(api.forent_url.e_record_url+'/record/enterprises/1/' + this.userObj.orgCode).then(res => {
            if(res && res.code == 'success'){
                that.priseInfo = res.data[0];
            }
        })

        await api.post(api.forent_url.url+"/district/allInfo.mvc")
        .then(res=> {
          // console.log('res======', res)
          if (res && res.code == 'success') {
            that.region = res.data
            that.region.forEach(element=>{
              if (element.distCode === that.priseInfo.province) {
                that.region.provinceName = element.distName
                // console.log(that.region.provinceName)
              }
              if (element.distCode === that.priseInfo.city) {
                that.region.cityName = element.distName
                // console.log(that.region.cityName)
              }
              if (element.distCode === that.priseInfo.county) {
                that.region.countryName = element.distName
                // console.log(that.region.countryName)
              }
              this.isLoading = false;
            })
          }

        })


      },
      editBtn(){
        this.showMain = false;
      },
      exitEdit(){
        this.showMain = true;
      }
    },
    watch:{
      showMain:function () {
         this.getData();
      }
    }
  }

</script>
<style lang="scss">
  .noResize {
    .el-textarea__inner {
      resize: none;
    }
  }

</style>
<style lang="scss" scoped>
  .priseInfo {

    .el-scrollbar {
      min-height: 100vh;
      background: #fff;
    }

    .gg-base-info {
      padding: 1px 1.5rem 1rem;
      box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.11);
      box-sizing: border-box;
      position: relative;
    }

    .edit {
      .gg-base-unit {
        margin-top: 40px;

        .gg-base-h3 {
          background: #fff;
        }
      }

    }

    .baseInfo-container {
      color: #35445c;
      font-size: 1.8rem;
      margin: 50px 0;
      position: relative;
    }

    .baseInfo-container span {
      margin-right: 2rem;
    }

    .baseInfo-btn {
      position: absolute;
      right: 0;
      background: #4777e7;
      color: white;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 1.6rem;
      padding: 7px 19px;
    }

    .gg-base-unit {
      border: 1px solid #dbdbdb;
      margin-bottom: 40px;

      .gg-base-h3 {
        display: inline-block;
        position: relative;
        font-size: 1.8rem;
        font-weight: normal;
        color: #35445c;
        line-height: 44px;
        padding: 0 24px;
        vertical-align: middle;
        background: #eef3fe;
        width: 100%;
        box-sizing: border-box;
        color: #35445c;
        border:none;

      }

      .is-right {
        position: absolute;
        right: 10px;
        top: 4px;
      }

      .gg-base-h3:before {
        position: absolute;
        top: 0rem;
        left: -.1rem;
        display: inline-block;
        content: '';
        width: .4rem;
        height: 100%;
        background-color: #4777e7;

      }

      .gg-table {
        width: 95%;
        margin: 2rem auto;
        line-height: 20px;

        th,
        td {
          font-size: 1.6rem;

        }

        th {
          padding: 10px;
          white-space: nowrap;
          color: #6e6e6f;
        }
      }
    }

    .gg-unit-address--form {
      float: left;
      margin-right: 5px;
    }

  }

  @media screen and (max-width: 1680px) {
    .priseInfo {
      .gg-base-unit {

        .gg-table {
          th {
            padding: 10px 6px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1440px) {
    .priseInfo {
      .baseInfo-container {
        margin: 0;
        line-height: 57px;
      }

      .gg-base-unit {
        .gg-base-h3 {
          line-height: 42px;
        }
      }
    }
  }

</style>
