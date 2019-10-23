<template>
    <div class="upload-wrapper">
        <div class="l-head">
            <!-- 面包屑 -->
            <Title/>
        </div>

        <div class="upload-content">
            <el-form ref="form" :model="form" label-width="100px" class="upload-content-from">
                <el-form-item label="上传文件:">
                    <el-upload
                            class="upload-demo"
                            drag
                            multiple
                            action="/remoteApi/tool/record/uploadfile"
                            accept="multipart/form-data"
                            :data="uploadData"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="form.fileList"
                            :on-error="handleAvatarError"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :auto-upload="true">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="状态类型:">
                    <el-select v-model="form.setState" placeholder="请选择状态类型">
                        <el-option label="新建" value="1"></el-option>
                        <el-option label="补充" value="2"></el-option>
                        <el-option label="修改" value="3"></el-option>
                        <el-option label="删除" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级:">
                    <el-select v-model="form.priority" placeholder="请选择优先级">
                        <el-option label="普通" value="2" selected></el-option>
                        <el-option label="紧急" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>

                <el-form-item label="">
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import api from '~/config/http';
    import Title from '~/components/Title';
    import apiConfig from '~/config/api.config'
    import axios from "axios";
    export default {
        components:{
            Title
        },
        data() {
            return{
                form: {
                    fileList:[],
                    setState:'',
                    priority:'2',
                    remarks:''
                },
                dialogFormVisible: false,
                oFile: '',
                uploadData:{
                    operationOrg:this.$route.params.operationOrgId,
                    unitId:this.$route.params.unitId,
                },
            }
        },

        methods:{
            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                debugger
                console.log(file, fileList);
            },
            //预览
            handlePreview(file) {
                console.log(file);
            },

            onSubmit() {
                var that = this;
                if (that.form.setState == '') {
                    this.$message({
                        type: 'warning',
                        message: "状态类型不能为空"
                    });
                    return;
                }
                if (that.form.remarks == '') {
                    that.$message({
                        type: 'warning',
                        message: "备注信息不能为空"
                    });
                    return;
                }

                api.post("/remoteApi/tool/record/uploadInfo", {
                    userId:api.getGlobalVal("userObj").id,
                    operationOrg:that.uploadData.operationOrg,
                    unitId:that.uploadData.unitId,
                    priority:that.form.priority,
                    oprFlag:that.form.setState,
                    describe:that.form.remarks,
                    fileUrl:'sss'
                }).then(res => {
                    if (res.code == "success") {
                        this.$router.push({
                            name:'PatrolPlan-addElectronic',
                            params:{"operationOrgId":this.operationOrgId,"unitId":this.unitId,state:1}
                        });
                    }else{
                        this.$message.error('保存失败');
                    }
                });
            },
            //上传成功
            handleAvatarSuccess(res, file) {
                // this.form.urlList.push(res.data.fileUrl);
            },
            //上传失败
            handleAvatarError(err, file, fileList) {
                this.$message({
                    message: '上传文件失败失败',
                    type: 'error'
                });
            },
            beforeAvatarUpload(file){
                this.oFile = file;
            },
        }
    }
</script>
<style lang="scss" scoped>
    .upload-content{
        height: calc(100vh - 138px - 35px);
        width:100%;
        background:#fff;
        text-align: left;
        padding: 20px 0;
        overflow-y: auto;
        .upload-content-from{
            width: 470px;
            .el-upload-list{
                width: 370px;
            }
        }

    }

</style>

