<template>
   <div class="upload-content-wrapper">
       <div class="upload-content">
           <div style="padding-left: 20px">
               <el-form ref="form" :model="form" :label-position="labelPosition" label-width="100px" class="upload-content-from">
                   <el-form-item v-if="form.fileList.length > 0">
                       <el-button type="primary"  :disabled="limtShow" icon="el-icon-delete" @click="yjClear">一键清除图纸</el-button>
                       <el-button type="success"  icon="el-icon-download" @click="yjDownload">一键下载图纸</el-button>
                   </el-form-item>
                   <el-form-item label="上传文件:">
                       <el-upload
                               class="upload-demo"
                               ref="upload"
                               :disabled="limtShow"
                               :data="{unitId:unitId}"
                               drag
                               action="/remoteApi/tool/record/uploadFinishFile"
                               accept="multipart/form-data"
                               :on-remove="handleRemove"
                               :file-list="form.fileList"
                               :on-error="handleAvatarError"
                               :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload"
                               :on-progress="handleAvatarProgress"
                               :auto-upload="true"
                               :show-file-list="showFileFlag"
                               v-loading.fullscreen.lock="fullscreenLoading"
                               multiple>
                           <i class="el-icon-upload"></i>
                           <div class="el-upload__text">在此处上传文件<em>点击上传</em></div>
                       </el-upload>
                   </el-form-item>

               </el-form>
           </div>
       </div>
   </div>
</template>
<script>
    import api from '~/config/http';
    export default {
        data() {
            return{
                labelPosition:'top',
                form: {
                    fileList:[],
                },
                dialogFormVisible: false,
                showFileFlag:true,
                uploadData:'',
                unitId:'',
                facilitiesInData:null,
                limtShow:false,
                fullscreenLoading:false

            }
        },
        created(){

        },
        mounted() {
           const that = this;
           that.unitId =localStorage.getItem("unitId");
           that.facilitiesInData = that._Storage.getObj("fileItem", "obj");
           if(that.facilitiesInData.limtShow == false){
               //debugger
               that.limtShow = true
           }
           that.findFileAll(that.unitId);
        },
        methods:{
            //上传中
            handleAvatarProgress(){
                this.fullscreenLoading = true;
            },
            //一键清除所有图纸
            yjClear(){
                this.$confirm("确定要一键删除图纸吗?", "下载提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        api.get("/remoteApi/tool/record/withdrawPictureByUnitId?unitId=" +
                            this.unitId)
                            .then(res => {
                                if (res.code === "success") {
                                    this.form.fileList=[];
                                    this.findFileAll(this.unitId);
                                } else {
                                    this.findFileAll(this.unitId);
                                    this.$message({
                                        type: "warning",
                                        message: "一键删除失败"
                                    });
                                }
                            })
                            .catch(res => {
                                this.$message({
                                    type: "warning",
                                    message: '删除失败'
                                });
                            });
                    })
                    .catch(err => {
                        this.$message({
                            type: "warning",
                            message: "取消一键删除!"
                        });
                    });
            },
            //一键下载所有图纸
            yjDownload(){
                this.$confirm("确定要一键下载图纸吗?", "下载提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        window.open(
                            "/remoteApi/tool/record/downloadPictureZip?unitId=" +
                            this.unitId
                        );
                    })
                    .catch(err => {
                        this.$message({
                            type: "warning",
                            message: "取消下载!"
                        });
                    });
            },
            //查询文件列表
            findFileAll(unitIdData){
                var that = this;
                api.get("/remoteApi/tool/record/findFinishPicturePath?unitId="+unitIdData)
                // api.get("/remoteApi/tool/record/findFinishPicturePath?unitId=NMGHHHT_BGHDJD_20180705")
                    .then(res => {
                        if (res.code === "success") {
                            if(!(res.data instanceof Array)){
                                return
                            }
                            that.form.fileList = res.data;
                        } else {
                            this.$message({
                                type: "warning",
                                message:res.rspMsg || res.message
                            });
                        }
                    })
                    .catch(err => {
                        this.$message({
                            type: "warning",
                            message: err
                        });

                    });
            },
            handleRemove(file, fileList) {
                var that = this;
                if(!file.url){
                    return
                }
                api.get("/remoteApi/tool/record/withdrawAttachment?url="+file.url)
                    .then(res => {
                        if (res.code === "success") {
                            that.form.fileList=[];
                            that.findFileAll(that.unitId);
                        } else {
                            that.findFileAll(that.unitId);
                            this.$message({
                                type: "warning",
                                message: "删除失败"
                            });
                        }
                    })
                    .catch(err => {
                        this.$message({
                            type: "warning",
                            message: '删除失败'
                        });
                    });
            },
            //上传失败
            handleAvatarError(err, file, fileList) {
                this.fullscreenLoading = false;
                this.$message({
                    message: '上传文件失败失败',
                    type: 'error'
                });
            },
            //上传成功
            handleAvatarSuccess(res, file) {
                const that = this;
                if(res.code == 'success'){
                    if(res.data = that.unitId){
                        that.form.fileList=[];
                        that.findFileAll(that.unitId);
                    }else{
                        that.findFileAll(that.unitId);
                        this.$message({
                            type: "warning",
                            message: " 上传文件夹名称不匹配"
                        });
                    }
                    that.showFileFlag = true;
                    that.fullscreenLoading = false;
                }else{
                    that.fullscreenLoading = false;
                    that.findFileAll(that.unitId);
                    that.$message({
                        message: res.message,
                        type: 'error'
                    });
                    that.showFileFlag = false
                }
            },
            beforeAvatarUpload(file){
                var that = this;
                //如果格式不是zip 就取消上传
                // debugger
                // if(!(file.type == 'application/zip')){
                //     this.$message.error('文件格式请传zip')
                //     return false;
                // }
                if('.zip' != file.name.substring(file.name.length-4)){
                    this.$message.error('文件格式请传zip')
                    return false;
                }
                if(that.unitId != file.name.slice(0,-4)){
                    this.$message.error('文件名和单位名称不匹配')
                    return false;
                }


            },
        }
    }
</script>
<style lang="scss" scoped>
    .upload-content-wrapper{
        height: calc(100vh - 165px);
        overflow-x: hidden;
        overflow-y: auto;
    }
    .upload-content{
        height:auto;
        width:100%;
        background:#fff;
        text-align: left;
        padding: 5px 0;
        overflow-y: auto;
        .upload-content-from{
            width: 450px;
            .el-upload-list{
                width: 410px;
            }
            .el-form--label-top .el-form-item__label{
                padding: 0;
            }
        }
    }
</style>

