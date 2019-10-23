<template>
  <div>
    <el-dialog :title="fullInfo.tit" :visible.sync="addVis" width="620px" :before-close="handleClose" class="add" :close-on-click-modal="false">
      <el-scrollbar style="height:300px">
        <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" :class="['demo-ruleForm',isPg]" label-width="80px">
          <!--    
        validate-on-rule-change -->
          <el-form-item label="名称：" prop="name">
            <el-input type="text" maxlength="50" placeholder="名称" v-model="ruleForm.name" clearable></el-input>
          </el-form-item>
          <!-- 培训演练 -->
          <el-form-item v-if="pxyl" label="类型：" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择" style="width:100%">
              <el-option v-for="(item,index) in types" :key="index" :label="item.attachmentType" :value="item.attachmentTypeCode">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 评估报告 -->
          <el-form-item v-if="pgbg" label="评估单位：" prop="unit">
            <el-input clearable type="text" maxlength="50" placeholder="评估单位" v-model="ruleForm.unit"></el-input>
          </el-form-item>
          <el-form-item v-if="pgbg" label="联系电话：" prop="tel">
            <el-input clearable type="text" maxlength="50" placeholder="联系电话" v-model="ruleForm.tel"></el-input>
          </el-form-item>
          <!--备注-->
          <el-form-item label="备注：" prop="explain" v-if="wbbz">
            <el-input clearable type="textarea" maxlength="500" v-model="ruleForm.explain" :autosize="{ minRows: 5, maxRows: 20}" placeholder="" :change="handleChange(ruleForm.explain)"></el-input>
            <p class="textNum">{{txtNo}}/500</p>
          </el-form-item>
          <el-form-item label="说明：" prop="explain" v-if="!wbbz">
            <el-input clearable type="textarea" maxlength="500" v-model="ruleForm.explain" :autosize="{ minRows: 5, maxRows: 20}" placeholder="" :change="handleChange(ruleForm.explain)"></el-input>
            <p class="textNum">{{txtNo}}/500</p>
          </el-form-item>
          <el-form-item label="附件：" style="text-align:left">
            <label class="ggicon-uploadings" for="contract" v-show="isUpload"> 上传 </label>
            <input type="file" v-show="false" name="contract" id="contract" @change="upload($event)" />
            <span id="fileName" v-show="!isUpload"> {{fileName}} <i class="ggicon-deleteSolid" @click="removeFile()"></i></span>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer addFooter">
        <el-button type="primary" @click.native="submitForm('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import api from '~/config/http';
import axios from 'axios'
import qs from 'qs';
import $ from "jquery";
import {
  Message
} from 'element-ui'
export default {
  props: {
    addVis: {
      default: true
    },
    fullInfo: Object
  },
  data() {
    var name = (rule, value, callback) => {
      if (value === '') {
        //远程请求
        return callback(new Error('*此处不可空白'));
      } else {
        callback();
      }

    };
    var explain = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('*此处不可空白'));
      } else {
        callback()

      }
    };

    return {
      userObj: api.getGlobalVal("userObj"),
      isTrue: true,
      myAddVis: this.addVis,
      btnShow: true,
      enclosure: '',//附件
      isUpload: true,
      unitId: 'AHHF_QHHFY_99999997',
      fileList: [],
      txtNo: 0,
      fileName: '',
      headers: { 'Content-Type': 'multipart/form-data' },
      pxyl: (this.fullInfo.pageName == "培训演练" ? true : false),
      pgbg: (this.fullInfo.pageName == "评估报告" ? true : false),
      isPg: (this.fullInfo.pageName == "评估报告" ? "isPg" : ''),
      wbbz: (this.fullInfo.pageName == "维保关系" ? true : false),
      ruleForm: {
        name: '',
        type: '',
        explain: '',
        unit: '',
        tel: ''
      },
      types: [],
      rules2: {
        name: [{
          validator: name,
          required: true,
          trigger: 'blur'
        }],
        unit: [{
          validator: name,
          required: true,
          trigger: 'blur'
        }],
        tel: [{
          validator: name,
          required: true,
          trigger: 'blur'
        }],
        explain: [{
          required: false,
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    removeFile() {
      ///删除
      this.fileName = '';
      this.enclosure = '';
      this.isUpload = true;
    },
    upload(event) {
      console.log(event)
      var file = event.target.files[0];
      var fileName = file.name;
      var index = fileName.lastIndexOf(".");
      fileName = fileName.substring(index + 1, fileName.length).toLowerCase();
      var fileSize = file.size;
      var fileTypeArray = ["doc", "docx", "pdf", "png", "jpg", "bmp", "gif"];
      if (fileTypeArray.indexOf(fileName) < 0) {
        Message.warning("文件格式不正确，请上传doc、docx、pdf,图片类型的合同附件。");
        this.enclosure = event.target.value = '';
        this.isUpload = true;
      } else if (fileSize > 10485760) {
        Message.warning("单个文件大小不能超过10M");
        this.enclosure = event.target.value = '';
        this.isUpload = true;
      } else {
        this.enclosure = file;
        this.fileName = event.target.value;
        this.isUpload = false;
      }
      event.target.value = '';
    },
    handleChange(val) {
      this.txtNo = val.length;
    },
    handleClose(done) {
      this.myAddVis = false;
      this.isUpload = true;
      this.$emit('isShow', this.myAddVis);
      this.$refs["ruleForm"].resetFields();//表单内容重置
    },
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.enclosure == '') {
            Message.error("请上传附件！");
            return;
          }
          var formData;

          if (this.fullInfo.pageName == "安全管理") {
            formData = new FormData();
            formData.append("safetyAttachName", this.ruleForm.name);
            formData.append("remark", this.ruleForm.explain);
            formData.append("safetyAttachTypeCode", 'AQGL');
            formData.append("userId", this.userObj.id);
            formData.append("file", this.enclosure);
            formData.append("orgId", this.userObj.orgCode);
            formData.append("creator", this.userObj.name);
          } else if (this.fullInfo.pageName == "年度计划") {
            formData = new FormData();
            formData.append("planName", this.ruleForm.name);
            formData.append("remark", this.ruleForm.explain);
            formData.append("attachmentTypeCode", 'NDJH');
            formData.append("userId", this.userObj.id);
            formData.append("file", this.enclosure);
            formData.append("orgId", this.userObj.orgCode);
            formData.append("creator", this.userObj.name);
          } else if (this.fullInfo.pageName == "维保合同") {
            formData = new FormData();
            formData.append("contractName", this.ruleForm.name);
            formData.append("remark", this.ruleForm.explain);
            formData.append("attachmentTypeCode", 'WBHT');
            formData.append("userId", this.userObj.id);
            formData.append("file", this.enclosure);
            formData.append("orgId", this.userObj.orgCode);
            formData.append("creator", this.userObj.name);
          } else if (this.fullInfo.pageName == "检测报告") {
            formData = new FormData();
            formData.append("monitReportName", this.ruleForm.name);
            formData.append("remark", this.ruleForm.explain);
            formData.append("attachmentTypeCode", 'NDJCBG');
            formData.append("userId", this.userObj.id);
            formData.append("file", this.enclosure);
            formData.append("orgId", this.userObj.orgCode);
            formData.append("creator", this.userObj.name);
          } else if (this.fullInfo.pageName == "培训演练") {
            formData = new FormData();
            formData.append("trainName", this.ruleForm.name);
            formData.append("remark", this.ruleForm.explain);
            formData.append("tainAttachTypeCode", this.ruleForm.type);
            formData.append("userId", this.userObj.id);
            formData.append("file", this.enclosure);
            formData.append("orgId", this.userObj.orgCode);
            formData.append("creator", this.userObj.name);
          } else if (this.fullInfo.pageName == "预案管理") {
            formData = new FormData();
            formData.append("planManageName", this.ruleForm.name);
            formData.append("remark", this.ruleForm.explain);
            formData.append("attachmentTypeCode", 'YAGL');
            formData.append("userId", this.userObj.id);
            formData.append("file", this.enclosure);
            formData.append("orgId", this.userObj.orgCode);
            formData.append("creator", this.userObj.name);
          } else if (this.fullInfo.pageName == "评估报告") {
            formData = new FormData();
            formData.append("reportName", this.ruleForm.name);
            formData.append("remark", this.ruleForm.explain);
            formData.append("companyName", this.ruleForm.unit);
            formData.append("companyContact", this.ruleForm.tel);
            formData.append("attachmentTypeCode", 'FXPGBG');
            formData.append("userId", this.userObj.id);
            formData.append("file", this.enclosure);
            formData.append("orgId", this.userObj.orgCode);
            formData.append("creator", this.userObj.name);
          } else if (this.fullInfo.pageName == "维保关系") {
            formData = new FormData();
            formData.append("file", this.enclosure);
            formData.append("name", this.ruleForm.name);
            formData.append("remark", this.ruleForm.explain);
            formData.append("unitId", api.getGlobalVal("userObj").orgCode);
          }
          axios({
            method: 'post',
            url: this.fullInfo.addUrl,
            data: formData,
            contentType: false,
            processData: false
          }).then(
            (res) => {
              res = res.data;
              if (res.code == "success") {
                var code = res["code"];
                if (code == "success") {
                  this.myAddVis = false;
                  this.$emit('isShow', this.myAddVis);
                  Message.success("操作成功!");
                  this.$emit('addList', { pageNo: 1 })
                  this.$refs["ruleForm"].resetFields();//表单内容重置
                  this.isUpload = true;
                  this.enclosure = "";

                  //刷新列表
                } else {
                  Message.success(res["message"]);
                }
              }
            }
          ).catch(
            (res) => {
              return res
            }
          )
          // api.post(this.fullInfo.addUrl,params).then(res => {
          //   if (res.code == "success") {
          //     debugger
          //      var code = res["code"];
          //       if(code == "success"){
          //           that.myChangePswVis = false;
          //           Message.success("操作成功!");
          //           this.$emit('addList', {pageNo:1})
          //           //刷新列表
          //       }else{
          //           GS.$Message.success(res["message"]);
          //       }
          //   }
          // })

        } else {

          return false;
        }
      });
    }
  },
  created() {
    if (this.fullInfo.pageName == "培训演练") {
      api.get(api.forent_url.base_url + "/attachment/queryByCode/PXYL").then(res => {
        this.types = res.data;
        this.ruleForm.type = res.data[0].attachmentTypeCode;
      })
    }
    //this.$refs["ruleForm"].resetFields();//表单内容重置
  }
}

</script>
<style lang="scss" >
.add {
  .el-form-item__label {
    font-size: 17px;
  }
  .el-input--small .el-input__inner {
    line-height: auto;
    height: auto;
  }
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    color: transparent;
  }
  .el-form-item__content {
    margin-right: 80px;
  }
  .upload-demo,
  .textNum {
    text-align: left;
  }
  .uploadBtn {
    color: #33b87b;
  }
  .addFooter {
    .el-button {
      padding: 1rem 4rem;
    }
  }
  .el-upload-list {
    margin-top: -40px;
  }

  .ggicon-deleteSolid {
    cursor: pointer;
    position: relative;
    top: 2px;
  }
  .ggicon-uploadings {
    color: #33b87b;
    cursor: pointer;
  }
  .isPg {
    //评估页面
    .el-input,
    .el-textarea {
      width: 92% !important;
    }
    .el-form-item__label {
      width: 112px !important;
    }
    .textNum {
      padding-left: 34px;
    }
    .el-form-item__error {
      left: 32px;
    }
  }
}
</style>
