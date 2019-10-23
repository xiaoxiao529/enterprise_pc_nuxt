<template>
<div class="add-user">
    <el-dialog title="添加用户" :visible="show" width="50%" @close="handleClose">
        <el-row>
            <el-col :span="13">
                <el-form :model="form" ref="addform" label-width="120px" :rules="rules">
                    <el-form-item label="用户名" prop="loginName">
                        <el-input clearable v-model.trim="form.loginName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input clearable type="password" v-model.trim="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPsd">
                        <el-input clearable type="password" v-model.trim="form.confirmPsd"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input clearable v-model.trim="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-col :span="13">
                            <el-radio :span="6" v-model.trim="form.sex" label="1">男</el-radio>
                            <el-radio :span="6" v-model.trim="form.sex" label="2">女</el-radio>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="办公电话" prop="telephone">
                        <el-input clearable v-model.trim="form.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="移动电话" prop="cellphone">
                        <el-input clearable v-model.trim="form.cellphone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input clearable v-model.trim="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="用户类型" prop="userType" v-show="userTypeShow">
                        <el-select v-model.trim="form.userType" placeholder="请选择用户类型" style="width: 100%;">
                            <el-option label="上级机构" value="0" key="0">上级机构</el-option>
                            <el-option label="下级机构" value="1" key="1">下级机构</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="11">
                <RoleTree :height="'464px'" @userPageListener="userPageListener" ref="roleTree"></RoleTree>
            </el-col>
        </el-row>
        <!-- <el-button
     type="info"
      @click="myVisible=false">取消</el-button>-->
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
        },
        // 默认不显示用户类型选项
        userTypeShow: {
            default: false,
            type: Boolean,
            require: false
        }
    },

    data() {
        var _this = this;

        function validator_loginName(rule, value, callback) {

            if (!value || value == "") {

                callback(new Error("用户名不能为空啊"));
            } else if (value) {
                api
                    .post(api.forent_url.url + _this.VALIDATE_CHECKUSER_NAME_URL, {
                        loginName: value
                    })
                    .then(res => {
                        if (res.code == "error") {
                            callback(new Error(res.message));
                            // callback(new Error('res.message'));
                        } else {
                            callback();
                        }
                    });
            } else {

                callback();
            }
        }

        function validator_password(rule, value, callback) {
            if (value === "") {
                callback(new Error("密码不能为空"));
            } else if (value && value != "") {
                api
                    .post(api.forent_url.url + _this.VALIDATE_CHECKPSW_URL, {
                        pwd: value
                    })
                    .then(res => {
                        if (res.code == "error") {
                            return callback(new Error(res.message));
                        } else {
                            callback();
                        }
                    });
            } else {
                callback();
            }
        }

        function validator_confirmPsd(rule, value, callback) {
            if (value === "") {
                callback(new Error("验证密码不能为空"));
            } else if (value != _this.form.password) {
                callback(new Error("两次密码不一致"));
            } else {
                callback();
            }
            callback();
        }

        function validator_cellphone(rule, value, callback) {

            let flag = new RegExp(_this.REG_PHONE).test(value);

            if (value === "") {
                callback(new Error("手机号不能为空"));
            } else if (flag) {

                callback();
            } else {
                callback(new Error("不是有效手机号码"));
            }
        }

        function validator_userType(rule, value, callback) {
            if (this.userTypeShow) {
                if (value === "") {
                    callback(new Error("必须选择用户类型"));
                } else if (value === undefined) {
                    callback(new Error("必须选择用户类型"));
                } else {
                    callback();
                }
            }else{
                callback();
            }

        }

        function validator_name(rule, value, callback) {
            if (!value) {
                callback(new Error("用户名不能为空"));
            } else {
                callback();
            }
        }
        return {
            VALIDATE_CHECKPSW_URL: "/user/checkPwdRules.mvc",
            VALIDATE_CHECKUSER_NAME_URL: "/user/judgeLoginName.mvc",
            ADDUSER_URL: "/user/addsave.mvc",
            GETROLELIST_URL: "/user/allroles.mvc",
            REG_PHONE: /^1[345789]\d{9}$/,
            myVisible: this.show,
            tree: [],

            form: {
                loginName: "",
                password: "",
                confirmPsd: "",
                name: "",
                sex: "",
                cellphone: "",
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
                loginName: {
                    required: true,
                    validator: validator_loginName,
                    trigger: "blur"
                },
                password: {
                    required: true,
                    validator: validator_password,
                    trigger: "blur"
                },
                confirmPsd: {
                    required: true,
                    validator: validator_confirmPsd,
                    trigger: "blur"
                },
                name: {

                    required: true,
                    validator: validator_name,
                    trigger: "blur"
                },
                sex: {
                    required: true,
                    trigger: "blur",
                    message: '性别不能为空',
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
                userType: {
                    require: this.userTypeShow,
                    validator: validator_userType,
                    trigger: "change",
                    message: '用户类型不能为空'
                }
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

    },

    methods: {
        userPageListener(name, data) {
            if ((name = "roleTreeChange")) {
                this.form.selectedRoleIds = data;
            }

        },

        handleClose() {
            this.$emit("userPageListener", "AddUser", false);
            this.$refs.addform.resetFields();
            this.$refs.addform.clearValidate();
        },

        handleSubmit() {

            this.$refs.addform.validate(valid => {
                if (valid) {
                    var params = {
                        cellphone: this.form.cellphone,
                        confirmPsd: this.form.confirmPsd,
                        email: this.form.email,
                        id: this.form.id,
                        loginName: this.form.loginName,
                        name: this.form.name,
                        orgCode: api.getGlobalVal('userObj').orgCode,
                        password: this.form.password,
                        selectedRoleIds: this.form.selectedRoleIds,
                        sex: this.form.sex,
                        telephone: this.form.telephone,
                        tenantId: this.form.tenantId,
                        userType: this.form.userType
                    };

                    api
                        .post(api.forent_url.url + this.ADDUSER_URL, params)
                        .then(res => {
                            if (res.code == "success") {
                                this.$message({
                                    type: "success",
                                    message: "修改成功"
                                });
                                this.$emit("userPageListener", "AddUser", res.data);

                                this.$refs.addform.resetFields();
                            }
                        })
                        .catch(err => {
                            console.error("err", err);
                            this.$message({
                                type: "warn",
                                message: "修改失败"
                            });
                        });
                }
            })

        },
        handleNodeClick() {}
    },
    watch: {
        myVisible() {}
    }
};
</script>

<style lang="scss" scoped>
.add-user {}
</style>
