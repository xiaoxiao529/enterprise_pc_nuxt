<template>
  <div>
    <el-dialog title="修改密码" v-bind:visible.sync="changePswVis" width="500px" :before-close="handleClose"><!--    -->
    <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm pswform"
      validate-on-rule-change>
      <el-form-item label="原密码" prop="oldPass">
        <el-input clearable  type="password"  v-model.trim="ruleForm.oldPass" placeholder="原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input clearable  type="password"  v-model.trim="ruleForm.newPass" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input clearable  type="password"  v-model.trim="ruleForm.checkPass" placeholder="确认密码"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="submitForm('ruleForm')">确认</el-button>
    </div>
    </el-dialog>
  </div>

</template>
<script>
  import api from '~/config/http';
  import Vue from 'vue'
  import Router from 'vue-router'
  import {
    Message
  } from 'element-ui'
  export default {
     props:{
        changePswVis:{
          default:true
        }
    },
    data() {
      var oldPass = (rule, value, callback) => {
        if (value === '') {
          //远程请求
          return callback(new Error('*此处不可空白'));
        } else if (value && value != '') {
          api.post(api.forent_url.url + '/user/judgeOldPassword.mvc', {
            'oldPsd': value,
            'id': api.getGlobalVal('userObj').id
          }).then(res => {
            if (res.code == "error") {
              return callback(new Error('*密码错误！'));
            }else{
              callback()
            }
          })
        } else {
          callback();
        }

      };
      var validateNewPass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('*此处不可空白'));
        } else if (value && value != '') {
          api.post(api.forent_url.url + '/user/checkPwdRules.mvc', {
            'pwd': value
          }).then(res => {
            if (res.code == "error") {
              return callback(new Error(res.message));
            }else{
              callback()
            }
          })
        } else {
          callback()

        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('*此处不可空白'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('*两次输入密码不一致!'));
        } else {
          callback();
        }

      };
      return {
        isTrue: true,
        myChangePswVis:this.changePswVis,
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        rules2: {
          oldPass: [{
            validator: oldPass,
            required: true,
            trigger: 'blur'
          }],
          newPass: [{
            validator: validateNewPass,
            required: true,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            required: true,
            trigger: 'blur'
          }],
        }
      };
    },
    methods: {
      handleClose(done) {
        this.myChangePswVis = false;
        this.$emit('success', this.myChangePswVis);
        this.$refs["ruleForm"].resetFields();
      },
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.post(api.forent_url.url + '/user/saveNewPassword.mvc', {
              'SID':api.getGlobalVal('userObj').id,
              'defaultPsd': that.ruleForm.oldPass,
              'newPsd': that.ruleForm.newPass,
              'confirmPsd': that.ruleForm.checkPass
            }).then(res => {
              if (res.code == "success") {
                this.myChangePswVis = false;
                this.$emit('success', this.myChangePswVis)
                Message.success("修改成功！");
                api.post(api.forent_url.url + "/login/toLogout.mvc").then(res => {
                  Message.info("请重新登录!")
                  setTimeout(function () {
                     that.$router.push({
                      "path": "/login"
                    })
                  }, 1000)
                })

              }
            })
          } else {

            return false;
          }
        });
      }
    },
    mounted() {
     // console.log(this.$store)
     // this.rou = this.$store.$router;
    },
  }

</script>
<style lang="scss" scoped>
.el-dialog{
  height:300px;
  .el-dialog__body{
    padding:15px 10px;
  }
}
.el-form-item--small.el-form-item {
    margin-bottom: 18px;
}
  /* 修改密码 */
  .open-window-all {
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
  }

  .pswform {
    width: 450px;
    padding: 0 30px;
    box-sizing: border-box;
    text-align: center;
    .pswSure {
      margin-top: 20px;
    }

  }

</style>
<style lang="scss">
  /* .pswform{
  .el-form-item__content {
      text-align: center!important;
      margin-left: 0!important;
    }
}
    */

</style>
