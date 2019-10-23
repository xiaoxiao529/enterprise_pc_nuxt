<template>
  <div id="userAdd">
    <el-form ref="form" :rules="rules" :model="form" size="mini" status-icon label-width="100px">
      <!-- target="_blank" -->
      <nuxt-link tag='a'  to="/authManagement/organization/list"><i class="el-icon-back"></i></nuxt-link>
      <el-form-item label="组织机构名称" prop="orgName">
        <el-input clearable  style="max-width:300px;" type="text"  v-model.trim="form.orgName" auto-complete="off"></el-input>
      </el-form-item>
      
      <el-form-item prop="orgType" label="组织机构类型">
        <el-select  v-model.trim="form.orgType" placeholder="请选择组织机构类型">
          <el-option label="集团型" value="0"></el-option>
          <el-option label="非集团型" value="1"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item class="sub">
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from '~/config/http';
  export default {
    data() {
      
      let validateName = (rule,value,callback) => {
        let nameReg = /^[\u4E00-\u9FA5a-zA-Z_0-9]+$/;
        if(value === ""){
          callback(new Error('组织机构名称不应为空'));
        }else if (!nameReg.test(value)) {
          callback(new Error('只能输入中文，且不能有空格'));
        } else {
          callback();
        }
        
      };
     
      let validateOrgType = (rule,value,callback) => {
        if (!value) {
          callback(new Error('请选择组织机构类型'));
        } else {
          callback();
        }
        
      }
      return {
        orgCode:1,
        form: {
          orgName: '',
          orgType: ''
        },
        rules: {
          orgName:[{
            validator: validateName,
            trigger: 'blur',
          }],
          orgType:[{
            validator: validateOrgType,
            trigger: 'blur',
          }]
        },
        imageUrl: ''
      }
    },
    methods: {
      //查询详情/upmsUser/findUserById
      getDetail(params){
        api.post(api.ajaxUrl + 'upmsOrg/findOrgById',params).then(res => {
          if(res.data.code == "success"){
            this.form = res.data.data;
            console.log(this.form)
          }else{ }
            
        }).catch(err=>{})
      },
      onSubmit(formName) {
        var that = this;
         this.$refs[formName].validate((valid) => {
          if (valid) {
            var pId = this.$route.params.orgObj.parentCode;
            var params = {
              orgName	:this.form.orgName,
              orgType	:this.form.orgType,
              tenantId :this.$route.params.orgObj.tenantId,
              parentCode : this.$route.params.orgObj.orgCode,
              // orgId : this.$route.params.orgObj.orgId
              orgCode : this.$route.params.orgObj.orgCode
            }
            //debugger
            api.post(api.ajaxUrl + 'upmsOrg/updateOrg',params).then(res => {
              let data = res.data;
              if(data.code == 'success'){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                //that.$router.push({path:'/authManagement/organization/list'});
                 that.$router.push({
                  name:'authManagement-organization-list',
                  params:{"id":pId,"tenantId":params.tenantId}
                });
              }else{
                this.$message({
                  message: '修改失败',
                  type: 'error'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     
    },
    mounted(){
     console.log(this.$route.params)
      if(!this.$route.params.orgObj){
        this.$router.push({"path":'/authManagement/organization/list'});
      }else{
        let params = {
          tenantId:this.$route.params.orgObj.tenantId,
          orgId:this.$route.params.orgObj.orgId
        }
        this.getDetail(params);
      }
    }
  }

</script>

<style scoped lang="scss">
@import url("~/assets/css/user.scss");
  //用户头像上传
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
    border:1px solid #eee;
  }

  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
</style>  