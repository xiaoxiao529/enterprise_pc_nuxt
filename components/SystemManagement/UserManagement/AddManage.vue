
<template>
  <div class="add-user">
    <el-dialog title="添加密级" :visible="show" width="30%" @close="handleClose">
      <el-row>
        <el-col :span="22">
          <el-form :model="form" ref="AddManage" label-width="120px" :rules="rules">
            <el-form-item label="密级名称" prop="securityName" required>
              <el-input clearable   v-model.trim="form.securityName" placeholder="密级名称"></el-input>
            </el-form-item>
            <el-form-item label="密级级别" prop="leve" required>
              <el-input clearable   v-model.trim="form.leve" placeholder="密级级别"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import api from "~/config/http";
import Vue from "vue";
import Router from "vue-router";
import RoleTree from "~/components/SystemManagement/UserManagement/RoleTree";
export default {
  name: "add-user",
  components: {
    RoleTree
  },
  props: {
    show: {
      require: true,
      default: true,
      type: Boolean
    }
  },

  data() {
    var _this = this;
    var validator_securityName = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("密级名称不能为空"));
      }else{
        callback();
      }
    };
    var validator_leve= function(rule, value, callback) {
      if (value == "") {
        callback(new Error("密级级别不能为空"));
      }else if(value.length >2){
        callback(new Error("密级级别为2位数"));
      }else if(isNaN(value)){
        callback(new Error("无效的整数"));
      }else{
        callback();
      }
    };

    return {
      VALIDATE_CHECKPSW_URL: "/user/checkPwdRules.mvc",
      VALIDATE_CHECKUSER_NAME_URL: "/user/judgeLoginName.mvc",
      ADDUSER_URL: "/user/addsave.mvc",
      GETROLELIST_URL: "/user/allroles.mvc",
      REG_PHONE: /^1(3[\d]|4[57]|5[012356789]|8[012356789])\d{8}$/g,
      myVisible: this.show,
      tree: [],
      radio:'1',
      // 下拉选项
      options2: [],
      value2: "",
      value: "",
      form: {
        securityName: "",
        leve: "",
        id: "",
      },

      rules: {
        securityName: {
          required: true,
          validator: validator_securityName,
          trigger: "blur"
        },
        leve: {
          required: true,
          validator: validator_leve,
          trigger: "blur"
        },
        telephone: "",
        email: "",
        id: "",
        orgCode: "",
        selectedRoleIds: "",
        tenantId: "",
        userType: ""
      },

      defaultProps: {
        children: "children",
        label: "title"
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
    this.myVisible = true;
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

    userPageListener(name, data) {
      if ((name = "roleTreeChange")) {
        this.form.selectedRoleIds = data;
      }
    },

    handleClose() {
      this.$emit("userPageListener", "AddManage", false);
      this.$refs.AddManage.resetFields();
    },

    handleSubmit() {
      // 保存表單
      var params = {
          securityName: this.form.securityName,
          leve: this.form.leve,
      };

      api
        .post(api.forent_url.url + "/security/save.mvc", params)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.$emit("userPageListener", "AddManage", false);
            this.$refs.AddManage.resetFields();
          }
        })
        .catch(err => {
          this.$message({
            type: "warn",
            message: "保存失败"
          });
        });
    },
    handleNodeClick() {}
  },
  watch: {
    myVisible() {
      this.initTree();
    }
  }
};
</script>

<style lang="scss" scoped>
.add-user {
  // height: 40%;
}
.setInput {
  width: 100%;
}
</style>
