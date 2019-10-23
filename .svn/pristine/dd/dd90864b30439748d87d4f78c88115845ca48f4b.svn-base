<template>
    <div class="modify-user">
        <el-dialog
            title="修改信息"
            :visible="show"
            @close="handleClose"
            width="40%">
            <el-form
                :model="formObj"
                :rules="rules"
                ref="form">
                <el-form-item
                    
                    label="用户名"
                    :label-width="formLabelWidth"
                    prop="loginName">
                    <el-col :span="16">
                        <el-input clearable
                             v-model.trim="formObj.loginName"
                            autocomplete="off"
                            placeholder="请选择用户名"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                    label="新密码"
                    :label-width="formLabelWidth"
                    prop="newPassword">
                    <el-col :span="16">
                        <el-input clearable
                             v-model.trim="formObj.newPassword"
                            type="password"
                            @blur="inputEvent(formObj.newPassword)"
                            autocomplete="off"
                            placeholder="请输入新密码"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                    label="确认密码"
                    :label-width="formLabelWidth"
                    prop="confirmPassword">
                    <el-col :span="16">
                        <el-input clearable
                             v-model.trim="formObj.confirmPassword"
                            type="password"
                            autocomplete="off"
                            placeholder="请再次输入密码"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                    
                    label="姓名"
                    :label-width="formLabelWidth"
                    prop="name">
                    <el-col :span="16">
                        <el-input clearable
                             v-model.trim="formObj.name"
                            autocomplete="off"
                            placeholder="请输入姓名"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                    
                    label="性别"
                    :label-width="formLabelWidth"
                    prop="sex">
                    <el-col
                        :span="10"
                        style="text-align:left"
                        :offset="1">
                        <el-radio-group  v-model.trim="formObj.sex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item
                    label="办公电话"
                    :label-width="formLabelWidth"
                    prop="telephone">
                    <el-col :span="16">
                        <el-input clearable
                             v-model.trim="formObj.telephone"
                            autocomplete="off"
                            placeholder="请输入办公电话"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                   prop="cellphone" 
                    label="移动电话"
                    :label-width="formLabelWidth">
                    <el-col :span="16">
                        <el-input clearable
                             v-model.trim="formObj.cellphone"
                            autocomplete="off"
                            placeholder="请输入移动电话"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
                    <el-col :span="16">
                        <el-input clearable   v-model.trim="formObj.email" placeholder="请输入邮箱"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                    label="用户类型"
                    prop="userType"
                    :label-width="formLabelWidth"
                    v-show="userTypeShow"
                    >
                    <el-col :span="16">
                        <el-select
                             v-model.trim="formObj.userType"
                            placeholder="请选择用户类型"
                            style="width: 100%;">
                            <el-option
                                label="上级机构"
                                :value=0
                                :key="0">上级机构</el-option>
                            <el-option
                                label="下级机构"
                                :value=1
                                :key="1">下级机构</el-option>
                        </el-select>
                    </el-col>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="handleClose">取 消</el-button> -->
                <el-button type="primary" @click="handleSubmit">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from "~/config/http";
import Vue from "vue";
import common from "~/utils/common"
import Router from "vue-router";
export default {
    name: "modify-user",
    props: {
        modifyUserFormVisible: {},
        loginName: "",
        form: {},
        show: {
            default: true
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
        /* 校验器 */
        
        var validator_cellphone = function (rule, value, callback) {
            if (value === "") {
                callback(new Error("手机号不能为空"));
            } else if (!_this.REG_PHONE.test(value)) {
                callback(new Error("不是有效手机号码"));
            } else {
                callback();
            }
        };

        var validator_loginName = function (rule, value, callback) {
            //
            if (!value || value == "") {
                callback(new Error("用户名不能为空"));
            } else if (value) {
                //允许和自己重名 不允许和别人崇明

                if (value == _this.loginName) {
                    callback();
                } else {
                    // 若不和自己重名再发送至服务器检验
                    api
                        .post(api.forent_url.url + _this.VALIDATE_CHECKUSER_NAME_URL, {
                            loginName: value
                        })
                        .then(res => {
                            if (res.code == "error") {
                                callback(new Error("用户名已存在"));
                            } else {
                                callback();
                            }
                        });
                }
            } else {
                callback();
            }
        };

        var validator_password = function (rule, value, callback) {
            if (_this.passwordHasinput) {
                if (value == "" || !value) {
                    callback(new Error("确认密码不能为空"));
                } else {
                    callback();
                }
            }else{
                callback();
            }

        }

        var validator_password2 = function (rule, value, callback) {
            if(_this.passwordHasinput){
                if (value == "") {
                    callback(new Error("确认密码不能为空"));
                } else if (value != _this.formObj.newPassword) {
                    callback(new Error("密码不一致"));
                } else {
                    callback();
                }
            }else{
                callback();
            }
            
            

        };

        return {
            VALIDATE_CHECKPSW_URL: "/user/checkPwdRules.mvc",
            VALIDATE_CHECKUSER_NAME_URL: "/user/judgeLoginName.mvc",
            
            REG_PHONE: /^1[345789]\d{9}$/,

            formLabelWidth: "30%",
            formVisibel: this.show,
            passwordHasinput: false,
            isSuccess:false,
            rules: {
                loginName: {
                    required: true,
                    validator: validator_loginName,
                    message:'登录名不能为空',
                    trigger: "blur"
                },
                newPassword: {
                    required: false,
                    validator: validator_password,
                    trigger: "blur"
                },
                confirmPassword: {
                    required: false,
                    validator: validator_password2,
                    trigger: "blur"
                },
                name: {
                    required: true,
                    trigger: "blur",
                    message: "姓名不能为空"
                },
                sex: {
                    required: true,
                    trigger: "blur",
                    message: "性别不能为空"
                },
                telephone: {},
                cellphone: {
                    required: true,
                    validator: validator_cellphone,
                    trigger: "blur"
                },
                email: {}
            },
            formObj: {
                id: '',
                orgCode: '',
                tenantId: '',
                selectedRoleIds: '',
                loginName: '',
                password: '',
                newPassword: '',
                confirmPassword: '',
                name: '',
                sex: '',
                cellphone: '',
                telephone: '',
                email: '',
                userType: '',
            }
        };
    },
    watch: {
    },
    beforeMount() {

    },
    mounted() {
        this.formObj = common.deepCopy(this.form);
    },
    methods: {
        // 动态设置必填校验
        inputEvent(value) {
            
            if (this.formObj.newPassword == ""&&this.formObj.confirmPassword == "") 
            {   

                this.rules.newPassword.required = false;
                this.rules.confirmPassword.required = false;
                
                this.passwordHasinput = false;
                
                this.$nextTick(function(){
                    
                    this.$refs['form'].clearValidate();    
                
                })
                
            } else {
                this.passwordHasinput = true;
                this.rules.newPassword.required = true;
                this.rules.confirmPassword.required = true;
            }
            // this.$forceUpdate();
        },
        handleClose(done) {
            
            if(done){
                this.$emit("userPageListener", "ModifyUser", done.data,done.index);
            }else{
                this.$emit("userPageListener", "ModifyUser");
            }
            
            this.$refs["form"].resetFields();
        },
        handleSubmit() {
            
            this.$refs["form"].validate(valid => {
                
                if (valid) {
                    let params = {
                        id: this.formObj.id,
                        orgCode: this.formObj.orgCode,
                        tenantId: this.formObj.tenantId,
                        selectedRoleIds: "",
                        loginName: this.formObj.loginName,
                        password: this.formObj.password,
                        newPsd: this.formObj.newPassword,
                        confirmPassword: this.formObj.confirmPassword,
                        name: this.formObj.name,
                        sex: this.formObj.sex,
                        cellphone: this.formObj.cellphone,
                        telephone: this.formObj.telephone,
                        email: this.formObj.email,
                        userType: this.formObj.userType
                    };
                    // 保存更改     http://112.27.198.15:9832/enterprise-pc/user/editsave.mvc
                    api
                        .post(api.forent_url.url + "/user/editsave.mvc", params)
                        .then(res => {
                            if (res.code == "success") {
                                this.$message({
                                    type: "success",
                                    message: "修改成功"
                                });

                                this.handleClose({
                                    data:res.data,
                                    index:this.formObj.index,
                                })
                            }
                        })
                        .catch(err => {
                            this.$message({
                                type: "warn",
                                message: "修改失败"
                            });
                        });
                }

            });

        },
        handleValidate() {
            // 请求校验     http://112.27.198.15:9832/enterprise-pc/user/checkPwdRules.mvc
            api.post(api.forent_url.url + "/user/checkPwdRules.mvc", validateParams);
        }
    }
};
</script>

<style lang="scss" scoped>
// .modify-user {}
</style>
