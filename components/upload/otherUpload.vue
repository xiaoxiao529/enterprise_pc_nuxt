<template>
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
                    <div class="el-upload__text">在此处上传文件<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="onSubmit">上传保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import api from '~/config/http';
    export default {
        props:['otherUpload'],
        data() {
            return{
                form: {
                    fileList:[],
                },
                dialogFormVisible: false,
                oFile: '',
                uploadData:{
                    operationId:"",
                    unitId:''
                },
                callbackUrl:[],
            }
        },
        created(){

        },
        mounted() {

        },
        methods:{


            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {

                for(let i = 0; i< fileList.length; i++){
                    this.callbackUrl.push(fileList[i].response.data.url)
                }

                console.log(this.callbackUrl)

            },
            //预览
            handlePreview(file) {
                console.log(file);
            },

            //编辑提交
            onSubmit() {
                var that = this;
                if (that.form.selectedOptions == '') {
                    this.$message({
                        type: 'warning',
                        message: "请选择新增类别"
                    });
                    return;
                }
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
                api.post("/remoteApi/tool/record/uploadfileInfo", {
                    userId:api.getGlobalVal("userObj").id,//上传人
                    operationOrg:that.uploadData.operationId,//运营中心Id
                    unitId:that.uploadData.unitId,//单位id
                    priority:that.form.priority,//优先级
                    oprFlag:that.form.setState,//上传类型
                    describes:that.form.remarks,//描述信息
                    fileUrl:that.callbackUrl.join(',')//上传地址
                }).then(res => {
                    if (res.code == "success") {
                        this.$message.success('保存成功');
                        this.dataDigEmp('newAdd');
                    }else{
                        this.$message.error('保存失败');
                    }
                });
                this.$emit("saveHandel")
            },


            //上传成功
            handleAvatarSuccess(res, file) {
                this.callbackUrl.push(res.data.url);
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
        height:auto;
        width:100%;
        background:#fff;
        text-align: left;
        padding: 5px 0;
        overflow-y: auto;
        .upload-content-from{
            width: 530px;
            .el-upload-list{
                width: 470px;
            }
        }

    }

</style>

