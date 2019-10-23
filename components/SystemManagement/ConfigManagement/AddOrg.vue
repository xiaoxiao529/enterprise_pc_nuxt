<template>
  <div class="add-user">
    <el-dialog :title="formObj.title" :visible="addVis" width="30%" @close="handleClose">

      <el-form :model="form" ref="addform" label-width="120px" :rules="rules">
        <el-form-item label="配置类型" prop="configName" required>
          <el-input clearable   v-model.trim="form.configName" maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleSubmit('addform')">保 存</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import api from "~/config/http";
  export default {
    name: "add-user",
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
          return callback(new Error('*配置类型不能为空'));
        }else {
          callback();
        }
      }

      return {
        GETROLELIST_URL: "/user/allroles.mvc",
        myAddVis: this.addVis,
        tree: [],
        form: {
          configName: this.formObj.configName
        },
        rules: {
          configName: {
            require: true,
            validator: validator_configName,
            trigger: 'blur',
          }
        }
      };
    },
    computed: {
      treeFiltered() {
        // 处理代码
        return [];
      }
    },

    mounted() {
      this.form.configName = this.formObj.configName;
      this.initTree();
    },

    methods: {
      initTree() {
        let params = {
          id: api.getGlobalVal("userObj").id
        };
        api
          .post(api.forent_url.url + this.GETROLELIST_URL, params)
          .then(res => {});
      },
      handleClose() {
        this.myAddVis = false;
        this.$emit("userPageListener", "AddOrg", this.myAddVis);
        this.$refs["addform"].resetFields();//表单重置
      },

      handleSubmit(formName) {
        let that = this; 
        this.$refs[formName].validate((valid) => {
            if(valid){
                api.post(api.forent_url.url + '/configclass/saveClass.mvc',{
                    classId:that.formObj.classId ? that.formObj.classId : '', 
                    parentId: that.formObj.parentId ? that.formObj.parentId : '-1',
                    className: that.form.configName
                }).then(res => {
                  if (res.success) {
                    this.$message({
                      type: 'success',
                      message: '操作成功'
                    })
                    this.$emit("userPageListener", "AddOrg", false);
                  }
                }).catch(err => {
                  this.$message({
                    type: 'warn',
                    message: '操作失败'
                  })
                });
                 this.$refs["addform"].resetFields();//表单重置
            }
        })
       
      },
      handleNodeClick() {}
    },
    watch: {
      formObj : function(newValue, oldValue){
        if (newValue != oldValue) {
          this.formObj = newValue;
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
