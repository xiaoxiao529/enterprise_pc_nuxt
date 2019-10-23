<template>
    <div class="upload-content">
        <el-form ref="form" :model="form" label-width="100px" class="upload-content-from">
            <el-form-item label="任务描述:" required>
                <el-input type="textarea"  v-model="form.remarks" :rows="4" maxlength="100"
                          show-word-limit placeholder="不超过100字符"></el-input>
            </el-form-item>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="状态类型:" :rules="{ required: true, message: '状态类型不能为空', trigger: 'change' }">
                        <el-select v-model="form.setState" placeholder="请选择状态类型" filterable>
                            <el-option
                                    v-for="item in oprFlagList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="优先级:" :rules="{ required: true, message: '优先级不能为空', trigger: 'change' }">
                        <el-select v-model="form.priority" placeholder="请选择优先级" filterable>
                            <el-option
                                    v-for="item in priorityList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="上传文件:">
                <el-upload
                        class="upload-demo"
                        multiple
                        action="/remoteApi/tool/record/uploadfile"
                        accept="multipart/form-data"
                        :data="uploadData"
                        :on-preview="handlePreview"
                        :on-progress="handleAvatarProgress"
                        :on-remove="handleRemove"
                        :file-list="form.fileList"
                        :on-error="handleAvatarError"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="true"
                        :show-file-list="showFileFlag"
                        :limit="20"
                        :on-exceed="handleExceed">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">请先选择任务描述、运营中心、企业名称，最多20个文件</div>
                </el-upload>
            </el-form-item>


            <el-form-item label="">
                <el-button type="primary" @click="onSubmit" :disabled="uploadFlag">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import api from '~/config/http';
    export default {
        props:['editUploadData'],
        data() {
            return{
                uploadFlag:false,
                form: {
                    fileList:[],
                    setState:null,
                    priority:2,
                    remarks:''
                },
                dialogFormVisible: false,
                oFile: '',
                uploadData:{
                    operationId:'',
                    unitId:'',
                    timestamp:'',
                    trialId:'',
                    describe:''
                },
                callbackUrl:[],
                tempUrls:[],
                priorityList:[{
                    id:'0001',
                    value: 1,
                    label: '紧急'
                }, {
                    id:'0002',
                    value: 2,
                    label: '普通'
                }],
                priorityListVal:'',
                oprFlagList:[{
                    id:'00001',
                    value: 1,
                    label: '新建'
                }, {
                    id:'00002',
                    value: 2,
                    label: '修改'
                }, {
                    id:'00003',
                    value: 3,
                    label: '删除'
                }, {
                    id:'00004',
                    value: 4,
                    label: '补录'
                }],
                oprFlagListVal:'',
                showFileFlag:true

            }
        },
        watch:{
            editUploadData:{
                handler:function(nv,ov){
                    this.getEditInfo()
                },
                deep:true
            }
        },
        created(){
            this.getEditInfo()
        },
        mounted() {
            console.log(this.editUploadData)
        },

        methods:{
            dataDigEmp(){
                this.form.fileList=[];
                this.form.setState='';
                this.form.priority='2',
                this.form.remarks='';
                this.callbackUrl=[];
                if(this.tempUrls.length == '0'){
                    return;
                }
                api.get("/remoteApi/tool/record/cancelEditAttachment?tempUrls="+this.tempUrls.join(',')+'&trialId='+this.editUploadData.editVal.trialId).then(res => {
                    if (res.code == "success") {
                        this.tempUrls=[]
                    }
                });
            },
            /**
             * 最多20个文件
             * @param files
             * @param fileList
             */
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },

            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log(fileList)
                this.callbackUrl = []
                for(let i = 0; i< fileList.length; i++){
                    if(fileList[i].url){
                        this.callbackUrl.push(fileList[i].url)
                    }
                    if(fileList[i].response){
                        this.callbackUrl.push(fileList[i].response.data.url)
                    }
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
                if (!that.form.setState) {
                    this.$message({
                        type: 'warning',
                        message: "状态类型不能为空"
                    });
                    return;
                }
                if (!that.form.remarks) {
                    that.$message({
                        type: 'warning',
                        message: "任务描述信息不能为空"
                    });
                    return;
                }

                api.post("/remoteApi/tool/recordTrial/updateRecordTrial", {
                    id:that.editUploadData.editVal.rowId,
                    // userName:api.getGlobalVal("userObj").userName,//上传人
                    userId:api.getGlobalVal("userObj").id,//上传人
                    describes:that.form.remarks,//描述信息
                    priority:that.form.priority,//优先级
                    fileUrls:that.callbackUrl.join(','),//上传地址
                    tempUrls:that.tempUrls.join(','),//临时文件地址
                    oprFlag:that.form.setState,//上传类型
                    //operationOrg:that.editUploadData.editVal.operationId,//运营中心Id
                    //recordStatus:that.editUploadData.editVal.recordStatus//任务状态
                }).then(res => {
                    if (res.code == "success") {
                        this.$message.success('编辑保存成功');
                        this.form.fileList=[];
                        this.form.setState='';
                        this.form.priority='2',
                        this.form.remarks='';
                        this.callbackUrl=[];
                        this.tempUrls=[];
                        this.$emit("saveHandel",res.data)
                    }else{
                        this.$message.error('编辑保存失败');
                    }
                });

            },
//上传中
            handleAvatarProgress(){
                const that = this;
                that.uploadFlag = true;
            },

            //上传成功
            handleAvatarSuccess(res, file) {
                const that = this;
                this.uploadFlag = true;
                if(res.code == 'success'){
                    that.uploadFlag = false;
                    that.callbackUrl.push(res.data.url);
                    that.tempUrls.push(res.data.url);
                    that.showFileFlag = true
                }else{
                    that.uploadFlag = false;
                    that.$message({
                        message: '上传文件失败',
                        type: 'error'
                    });
                    that.showFileFlag = false
                }
            },
            //上传失败
            handleAvatarError(err, file, fileList) {
                this.$message({
                    message: '上传文件失败',
                    type: 'error'
                });
                this.uploadFlag = false;
            },
            beforeAvatarUpload(file){
                this.uploadData.operationId = this.editUploadData.editVal.operationId;
                this.uploadData.unitId = this.editUploadData.editVal.unitId;
                this.uploadData.timestamp = this.editUploadData.editVal.timestamp;
                this.uploadData.trialId = this.editUploadData.editVal.trialId;
                this.uploadData.describe = this.form.remarks;
                //timestamp
                if (!this.uploadData.describe) {
                    this.$message.error('任务描述为空')
                    return false;
                }
                if (!this.uploadData.operationId) {
                    this.$message.error('运营中心为空')
                    return false;
                }
                if (!this.uploadData.unitId) {
                    this.$message.error('企业为空')
                    return false;
                }
            },

            //编辑信息获取
            getEditInfo(){
                this.form.fileList = [];
                var editUploadData = this.editUploadData;
                this.form.setState=editUploadData.editVal.oprFlag;
                this.form.priority=editUploadData.editVal.priority;
                this.form.remarks=editUploadData.editVal.describes;

                this.uploadData={
                    operationId:editUploadData.editVal.operationId,
                    unitId:editUploadData.editVal.unitId
                };
                // this.callbackUrl=[];
                // this.tempUrls=[];
                console.log(editUploadData.editVal.fileUrl)
                if(editUploadData.editVal.fileName){
                    for(let i = 0; i<editUploadData.editVal.fileName.length; i++){

                        let obj = {
                            name:editUploadData.editVal.fileName[i],
                            url:editUploadData.editVal.fileUrl[i],
                        };
                        this.form.fileList.push(obj);
                        this.callbackUrl.push(this.form.fileList[i].url);
                        this.tempUrls.push(this.form.fileList[i].url);
                    }
                }
            }

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
        .upload-content-from{
            width: 530px;
            .el-upload-list{
                width: 470px;
            }
        }

    }

</style>

