<template>
  <div class="add-user">
    <el-dialog title="添加用户" :visible="show" width="45%" @close="handleClose">
      <el-row>
        <el-col :span="20">
          <el-form :model="form" ref="AddSystem" label-width="150px" :rules="rules">
            <el-form-item label="系统名称" prop="xtName" >
              <el-input clearable   v-model.trim="form.xtName" placeholder="系统名称"></el-input>
            </el-form-item>
            <el-form-item label="系统编码" prop="xtcode" >
              <el-input clearable   v-model.trim="form.xtcode" placeholder="系统编码"></el-input>
            </el-form-item>
            <el-form-item label="系统访问地址">
              <el-input clearable   v-model.trim="form.xturl" placeholder="系统访问地址"></el-input>
            </el-form-item>
            <el-form-item label="系统菜单图片">
              <el-input clearable   v-model.trim="form.xtimg" placeholder="系统菜单图片"></el-input>
            </el-form-item>
            <el-form-item label="序号" prop="xtserial" >
              <el-input clearable  type="" placeholder="序号"  v-model.trim="form.xtserial"></el-input>
            </el-form-item>
            <el-form-item label="所属租户" prop="telephone">
              <el-select  v-model.trim="value" placeholder="所属租户" class="setInput">
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.tenantName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item></el-form-item>
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
    var validator_xtName = function(rule, value, callback) {
      if (!value || value == "") {
        callback(new Error("系统名称不能为空"));
      } else {
        callback();
      }
    };
    var validator_xtcode = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("系统编码不能为空"));
      } else {
        callback();
      }
    };

    var validator_xtserial = function(rule, value, callback) {
      if (value === "" ) {
        callback(new Error("序号不能为空"));
      } else if(isNaN(value)){
        callback(new Error("无效的整数"));
      }else{
        callback();
      }
    };
    var validator_cellphone = function(rule, value, callback) {};
    return {
      VALIDATE_CHECKPSW_URL: "/user/checkPwdRules.mvc",
      VALIDATE_CHECKUSER_NAME_URL: "/user/judgeLoginName.mvc",
      ADDUSER_URL: "/user/addsave.mvc",
      GETROLELIST_URL: "/user/allroles.mvc",
      REG_PHONE: /^1(3[\d]|4[57]|5[012356789]|8[012356789])\d{8}$/g,
      myVisible: this.show,
      tree: [],
      // 下拉选项
      options2: [],
      value2: "",
      value: "",
      form: {
        xtName: "",
        xtcode: "",
        xturl: "",
        xtimg: "",
        xtserial: "",
        telephone: "",
        email: "",
        id: "",
        orgCode: "",
        selectedRoleIds: "",
        tenantId: "",
        userType: "",
        selectedRoleIds: ""
      },

      rules: {
        xtName: {
          required: true,
          validator: validator_xtName,
          trigger: "blur"
        },
        xtcode: {
          required: true,
          validator: validator_xtcode,
          trigger: "blur"
        },
        xtserial: {
          required: true,
          validator: validator_xtserial,
          trigger: "blur"
        },
        name: {
          require: true,
          trigger: "blur"
        },
        sex: {
          require: true,
          trigger: "blur"
        },
        cellphone: {
          required: true,
          validator: validator_cellphone,
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
      this.$emit("userPageListener", "AddSystem", false);
      this.$refs.AddSystem.resetFields();
    },

    handleSubmit() {
      // 保存表單
      var params = {
        systemName: this.form.xtName,
        systemCode: this.form.xtcode,
        systemUrl: this.form.xturl,
        iconUrl: this.form.xtimg,
        orderNum: this.form.xtserial,
        // input_sysTenant: this.value2,
        tenantId: this.value
      };
      // console.log(this.value)
      api
        .post(api.forent_url.url + "/system/save.mvc", params)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.$emit("userPageListener", "AddSystem", false);
            this.$refs.AddSystem.resetFields();
          }
        })
        .catch(err => {
          console.log(err)
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
}
.setInput {
  width: 100%;
}
</style>
