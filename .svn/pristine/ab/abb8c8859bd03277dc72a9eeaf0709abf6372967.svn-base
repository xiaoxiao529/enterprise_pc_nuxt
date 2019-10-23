<template>
  <div class="add-user">
    <el-dialog :title="formObj.title" :visible="addVis" width="36%" @close="handleClose">
      <el-scrollbar style="height:300px">
      <el-form :model="form" ref="configForm" label-width="120px" :rules="rules">
        <el-form-item label="配置类型" prop="configName">
          <el-input clearable   v-model.trim="form.configName" maxlength="50"  placeholder="配置类型" disabled ></el-input>
        </el-form-item>
         <el-form-item label="配置ID" prop="key">
          <el-input clearable   v-model.trim="form.key" maxlength="50"  placeholder="配置ID"></el-input>
        </el-form-item>
         <el-form-item label="配置值" prop="value">
          <el-input clearable  type="textarea" maxlength="500"  v-model.trim="form.value" :autosize="{ minRows: 2, maxRows: 20}"  placeholder="配置值" ></el-input>
        </el-form-item>
         <el-form-item label="配置描述" prop="comment">
          <el-input clearable  type="textarea" maxlength="500"  v-model.trim="form.comment" :autosize="{ minRows: 2, maxRows: 20}"  placeholder="配置描述" ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleSubmit('configForm')">保 存</el-button>
     </el-scrollbar> 
    </el-dialog>
  </div>
</template>

<script>
  import api from "~/config/http";
  export default {
    props: {
      addVis: {
        default: true
      },
      formObj:Object
    },
    data() {
      var _this = this;
      var validator_configName = function (rule, value, callback) {
        if (!value || value === '') {
          //远程请求
          return callback(new Error('*此处不可为空白'));
        }else {
          callback();
        }
      }

      return {
        myAddVis: this.addVis,
        tree: [],
        form: {
          configName: this.formObj.configName,
          key:'',
          value:'',
          comment:''
        },
        rules: {
          configName: {
            validator: validator_configName,
            trigger: 'blur',
          },
           key: {
            require: true,
            validator: validator_configName,
            trigger: 'blur',
          },
           value: {
            require: true,
            validator: validator_configName,
            trigger: 'blur',
          }
        }
      };
    },
    mounted() {
     
    },
    methods: {
      handleClose() {
        this.myAddVis = false;
        this.$emit("configListener", "AddConfig", false);
        this.$refs["configForm"].resetFields();//表单重置
      },
      handleSubmit(formName) {
        let that = this; 
        this.$refs[formName].validate((valid) => {
            if(valid){
                api.post(api.forent_url.url + '/config/save.mvc',{
                  configId: that.formObj.configId ? that.formObj.configId : '', 
                  classId: that.formObj.classId ? that.formObj.classId: '' , 
                  className: that.form.configName,
                  key: that.form.key,
                  value: that.form.value,
                  comment: that.form.comment,
                }).then(res => {
                  if (res.success) {
                    this.$message({
                      type: 'success',
                      message: '操作成功'
                    })
                    this.$emit("configListener", "AddConfig", false);
                  }
                }).catch(err => {
                  this.$message({
                    type: 'warn',
                    message: '操作失败'
                  })
                });
                this.$refs["configForm"].resetFields();//表单重置
            }
        })
       
      }
    },
    watch: {
      formObj : function(newValue, oldValue){
        if (newValue != oldValue) {
          this.formObj = newValue;
          this.form = newValue.formObj;
          this.form.configName = newValue.configName;
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  .el-form {
    padding: 0 40px 0 0
  }

</style>

