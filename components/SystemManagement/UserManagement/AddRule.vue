
<template>
  <div class="add-user">
    <el-dialog title="添加密码规则" :visible="show" width="40%" @close="handleClose">
      <el-row>
        <el-col :span="24">
          <el-form :model="form" ref="AddRule" label-width="150px" :rules="rules">
            <el-form-item label="规则表达式" prop="ruleCode" >
              <el-input clearable   v-model.trim="form.ruleCode" placeholder="规则表达式"></el-input>
            </el-form-item>
            <el-form-item label="规则描述" prop="ruleName" >
              <el-input clearable   v-model.trim="form.ruleName" placeholder="规则描述"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="isSelected" >
              <el-col :span="13">
                <el-radio :span="6"  v-model.trim="radio" label="0">关闭</el-radio>
                <el-radio :span="6"  v-model.trim="radio" label="1">启用</el-radio>
              </el-col>
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
    var validator_ruleCode = function(rule, value, callback) {
      if (!value || value == "") {
        callback(new Error("规则表达式不能为空"));
      }else{
        callback();
      }

    };
    var validator_ruleName = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("规则描述不能为空"));
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
        ruleCode: "",
        ruleName: "",
        id: "",
      },

      rules: {
        ruleCode: {
          required: true,
          validator: validator_ruleCode,
          trigger: "blur"
        },
        ruleName: {
          required: true,
          validator: validator_ruleName,
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
    this.downList();
  },

  methods: {
    downList() {
      // 下拉选框列表
      api.post(api.forent_url.url + "/tenant/all.mvc").then(res => {
        this.options2 = res.data;
      });
    },
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
      this.$emit("userPageListener", "AddRule", false);
      this.$refs.AddRule.resetFields();
    },

    handleSubmit() {
      // 保存表單
      var params = {
          ruleCode: this.form.ruleCode,
          ruleName: this.form.ruleName,
          isSelected:this.radio,
      };

      api
        .post(api.forent_url.url + "/pwdRule/save.mvc", params)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.$emit("userPageListener", "AddRule", false);
            this.$refs.AddRule.resetFields();
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
