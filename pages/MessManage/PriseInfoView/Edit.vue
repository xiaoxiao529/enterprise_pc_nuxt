<template>
  <div>

    <!-- 编辑页面 -->
    <div class="gg-base-info edit">
      <div class="gg-base-unit">
        <h3 class="gg-base-h3">
          基本信息
          <div class="is-right">
            <el-button type="primary" size="medium" class="gg-btn  btn_update_qx" @click="update()">更新</el-button>
            <el-button size="medium" class="gg-btn  btn_update_cencel" @click="returnMain()">取消</el-button>
          </div>
        </h3>

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
              <td colspan="3"> {{priseInfo.unitId }}</td>
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

            </tr>
            <tr>
              <th>单位类别：</th>
              <td colspan="3">
                <el-select  v-model.trim="priseInfo.unitClass" placeholder="请选择" style="width: 83%;margin:0;">
                  <el-option v-for="(val, key, index) in unitClassList" :key="index" :label="val" :value="key">
                  </el-option>
                </el-select>
                <!-- // {{ unitClassList[priseInfo.unitClass] }} -->
              </td>
              <th>所属行业：</th>
              <td>
                <el-select  v-model.trim="priseInfo.unitIndustry" placeholder="请选择" style="width: 60%;margin:0;">
                  <el-option v-for="(val, key, index) in unitIndustryList" :key="index" :label="val" :value="key">
                  </el-option>
                </el-select>
                <!-- {{ unitClassList[priseInfo.unitClass] }} -->
              </td>
            </tr>
            <tr>
              <th>单位地址：</th>
              <td colspan="6">
                <div class="gg-unit-address--form"  style="width:12%;">
                  <el-select  v-model.trim="provinceCode" placeholder="省">
                    <!-- <el-option key="0" value=" " label="请选择省份"></el-option> -->
                    <el-option v-for="(province,index) in distArr" :key="index+1" v-if="province.parentCode=='000000'"
                      :value="province.distCode" :label="province.distName">
                    </el-option>
                  </el-select>
                </div>
                <div class="gg-unit-address--form" style="width:14%;">
                  <el-select  v-model.trim="cityCode" placeholder="市">
                    <el-option v-for="(province,index) in distArr" :key="index" v-if="province.parentCode==priseInfo.province"
                      :value="province.distCode" :label="province.distName">
                    </el-option>
                  </el-select>
                </div>

                <div class="gg-unit-address--form" style="width:12%;">
                  <el-select  v-model.trim="countyCode" placeholder="县/区">
                    <el-option v-for="(province,index) in distArr" :key="index" v-if="province.parentCode==priseInfo.city"
                      :value="province.distCode" :label="province.distName">
                    </el-option>
                  </el-select>
                </div>

                <div class="gg-unit-address--form" style="width:39%">
                  <el-input clearable   v-model.trim="priseInfo.unitAddress" placeholder="请输入街道门牌号"></el-input>
                </div>
                <!-- {{ priseInfo.provinceName + priseInfo.cityName + priseInfo.countryName +
                    priseInfo.unitAddress
                    }}-->
              </td>
            </tr>
            <tr>
              <th>占地面积：</th>
              <td>{{ priseInfo.areaCode }}</td>
              <th>总建筑面积：</th>
              <td>{{ priseInfo.buildArea }}</td>
              <th>建筑数量：</th>
              <td>{{ priseInfo.buildCount }}</td>
            </tr>
            <tr>
              <th>风险类别：</th>
              <td>
                <el-select  v-model.trim="priseInfo.riskClass" placeholder="请选择风险类别">
                  <el-option v-for="(val, key, index) in riskClassList" :key="index" :label="val" :value="key">
                  </el-option>
                </el-select>
                <!-- {{ riskClassList[priseInfo.riskClass] }}-->
              </td>
              <th>经济所有制：</th>
              <td>
                <el-select  v-model.trim="priseInfo.unitProperty" placeholder="请选择经济所有制">
                  <el-option v-for="(val, key, index) in unitPropertyList" :key="index" :label="val" :value="key">
                  </el-option>
                </el-select>
                <!-- {{  unitPropertyList[priseInfo.unitProperty] }}-->
              </td>
              <th>常驻人数：</th>
              <td>
                <el-input clearable  style="width: 30%;"  v-model.trim="priseInfo.employeeNum" placeholder="请输入常驻人数"></el-input>
              </td>
            </tr>
            <tr>
              <th>消防主管部门：</th>
              <td colspan="5">
                <el-input clearable  style="width: 44.6%;"  v-model.trim="priseInfo.superviseClass" placeholder="请输入所属辖区消防主管部门"></el-input>
              </td>
            </tr>
            <tr>
              <th class="va-top">单位简介：</th>
              <td colspan="5">
                <el-input clearable  class="noResize" type="textarea" :rows="3" placeholder="请输入单位简介"  v-model.trim="priseInfo.introduce">
                </el-input>
                <!-- {{ priseInfo.introduce }}vihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh -->
              </td>
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
                <el-input clearable  style="width: 85%"  v-model.trim="priseInfo.legalperson" placeholder="请输入姓名"></el-input>
                <!-- {{  priseInfo.legalperson }}-->
              </td>
              <th>身份证号：</th>
              <td>
                <el-input clearable  style="width: 85%"  v-model.trim="priseInfo.legalpersonIdnum" placeholder="请输入身份证号"></el-input>
                <!-- {{  priseInfo.legalpersonIdnum }}-->
              </td>
            </tr>
            <tr>
              <th>联系方式：</th>
              <td>
                <el-input clearable  style="width: 56.5%"  v-model.trim="priseInfo.legalpersonTel" placeholder="请输入联系方式"></el-input>
                <!-- {{  priseInfo.legalpersonTel }}-->
              </td>
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
                <el-input clearable  style="width: 85%"  v-model.trim="priseInfo.personliable" placeholder="请输入姓名"></el-input>
                <!-- {{  priseInfo.personliable }}-->
              </td>
              <th>身份证号：</th>
              <td>
                <el-input clearable  style="width: 85%"  v-model.trim="priseInfo.personliableIdnum" placeholder="请输入身份证号"></el-input>
                <!-- {{  priseInfo.personliableIdnum }}-->
              </td>
            </tr>
            <tr>
              <th>联系方式：</th>
              <td>
                <el-input clearable  style="width: 56.5%"  v-model.trim="priseInfo.personliableTel" placeholder="请输入联系方式"></el-input>
                <!-- {{  priseInfo.personliableTel }}-->
              </td>
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
                <el-input clearable  style="width: 85%"  v-model.trim="priseInfo.contacts" placeholder="请输入姓名"></el-input>
                <!-- {{  priseInfo.contacts }}-->
              </td>
              <th>身份证号：</th>
              <td>
                <el-input clearable  style="width: 85%"  v-model.trim="priseInfo.contactsIdnum" placeholder="请输入身份证号"></el-input>
                <!-- {{  priseInfo.contactsIdnum }}-->
              </td>
            </tr>
            <tr>
              <th>联系方式：</th>
              <td>
                <el-input clearable  style="width: 56.5%"  v-model.trim="priseInfo.contactsTel" placeholder="请输入联系方式"></el-input>
                <!-- {{  priseInfo.contactsTel }}-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


  </div>
</template>

<script>
  import api from '~/config/http';
  import ZSPriseInfo from '~/config/priseInfo';
  import { Message } from 'element-ui';
  export default {
    props: {
      showMain: false,
      mainPriseInfo:Object
      
    },
    data() {
      return {
        userObj: api.getGlobalVal("userObj"),
        priseInfo: '',
        offShowMain: this.showMain,
        distArr: [], // 行政区划
        unitClassList: ZSPriseInfo.ZS.priseInfo.unitClassList,
        unitIndustryList: ZSPriseInfo.ZS.priseInfo.unitIndustryList, // 所属行业
        riskClassList: ZSPriseInfo.ZS.priseInfo.riskClassList, // 风险类别
        unitPropertyList: ZSPriseInfo.ZS.priseInfo.unitPropertyList, // 风
        provinceCode: this.mainPriseInfo.province,
        cityCode: this.mainPriseInfo.city,
        countyCode: this.mainPriseInfo.county
      }
    },
    mounted() {
      this.getData();

    },
    methods: {
      returnMain: function () {
        this.offShowMain = true;
        //this.$emit('exitEdit', this.offShowMain);
      },
      getData: function () {
        let that = this;
        api.get(api.forent_url.e_record_url + '/record/enterprises/1/' + this.userObj.orgCode).then(res => {
          if (res && res.code == 'success') {
            that.priseInfo = res.data[0];
            if(that.distArr.length > 0){
                that.showDist(); // 省市县回显
            }
          }
        });
        api.post(api.forent_url.url + "/district/allInfo.mvc").then(res => {
          if (res && res.code == 'success') {
            for (let i in res.data) {
              if (res.data[i].distCode == '000000') {
                res.data[i].parentCode = '999999';
              }
            }
            that.distArr = res.data;
            if (that.priseInfo.province) {
              that.showDist(); // 省市县回显
            }
          }
        })

        

      },
      showDist: function () {
        for (let i in this.distArr) {
          if (this.distArr[i].distName == this.priseInfo.province) {
            this.provinceCode = this.distArr[i].distCode;
          }
          if (this.distArr[i].distName == this.priseInfo.city) {
            this.cityCode = this.distArr[i].distCode;
          }
          if (this.distArr[i].distName == this.priseInfo.county) {
            this.countyCode = this.distArr[i].distCode;
          }
        }
      },
      updateCity: function () {
        var isU = true;
        for (let i in this.distArr) {
          if (this.distArr[i].distCode == this.cityCode && this.distArr[i].parentCode == this.provinceCode) {
            isU = false;
          }
          if (this.distArr[i].distCode == this.provinceCode) {
            this.priseInfo.province = this.distArr[i].distCode;
          }
        }
        if (isU) {
          this.cityCode = '';
          this.priseInfo.city = '';
        }
      },
      updateCounty: function () {
        var isU = true;
        for (let i in this.distArr) {
          if (this.distArr[i].distCode == this.countyCode && this.distArr[i].parentCode == this.cityCode) {
            isU = false;
          }
          if (this.distArr[i].distCode == this.cityCode) {
            this.priseInfo.city = this.distArr[i].distCode;
          }
        }
        if (isU) {
          this.countyCode = '';
          this.priseInfo.county = '';
        }
      },
      update:function(){
        let that = this;
         if(this.priseInfo.county){
           
              api.post(api.forent_url.e_record_url+"/record/updateEnterpriseByOrgCode",that.priseInfo).then( res=> {
                if(res && res.code == 'success'){
                      this.offShowMain = true;
                      Message.success("保存成功!");
                  }else {
                      Message.error("保存失败!");
                  }
              })
                
          }else{
              Message.error("请将地址填写完整");
          }
      }
    },
    watch: {
      provinceCode: function () {
        this.updateCity();
        this.updateCounty();
        this.priseInfo.unitAddress = '';
      },
      cityCode: function () {
        this.updateCounty();
        this.priseInfo.unitAddress = '';
      },
      countyCode: function () {
        this.priseInfo.unitAddress = '';
        for (let i in this.distArr) {
          if (this.distArr[i].distCode == this.countyCode) {
            this.priseInfo.county = this.distArr[i].distCode;
          }
        }
      },
      offShowMain:function(){
        this.$emit('exitEdit', this.offShowMain);
      }
    },
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

      }

      .is-right {
        position: absolute;
        right: 10px;
        top: 4px;
      }

      .gg-base-h3:before {
        position: absolute;
        top: -.2rem;
        left: -.1rem;
        display: inline-block;
        content: '';
        width: .4rem;
        height: 105%;
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
