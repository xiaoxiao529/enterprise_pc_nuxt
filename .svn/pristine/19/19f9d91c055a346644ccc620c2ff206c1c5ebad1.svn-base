<template>
    <div class="upload-content upload-content-big">
        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="90px" class="upload-content-from">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="任务描述:" required>
                        <el-input type="textarea" v-model="form.remarks" :rows="4" maxlength="100"
                                  show-word-limit placeholder="不超过100字符"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="运营中心:" required>
                        <el-select v-model="orgListValue"
                                   placeholder="请选择" filterable
                                   @change="changeSubVal()"
                                   @focus="getOrgListByUserId">
                            <el-option
                                    v-for="(item,index) in orgList"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="企业名称:" required>
                        <el-select v-model="allUnitListVal"
                                   placeholder="请选择"
                                   @focus="getAllUnit" filterable
                                   @change="changeUnitVal()"
                                   :loading="loading">
                            <el-option
                                    v-for="(item,index) in allUnitList"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>


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
                        <el-select v-model="form.priority" placeholder="请选择优先级">
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

            <el-row>
                <el-col :span="23">
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
                                :on-exceed="handleExceed"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">请先选择任务描述、运营中心、企业名称，最多20个文件</div>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="">
                <el-button type="primary" :disabled="uploadFlag" @click="onSubmit">新增保存</el-button>
                <el-button @click="dataDigEmp('newAdd')"  :disabled="uploadFlag">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import api from '~/config/http';
    export default {
        props:['uploadDataVal'],
        data() {
            return{
                uploadFlag:false,
                dragFlag:true,
                labelPosition:'right',
                disabledFlag:true,
                form: {
                    fileList:[],
                    setState:null,
                    priority:2,
                    selectedOptions: [],
                    remarks:''
                },
                orgList:[],
                orgListValue: '',
                allUnitList:[],
                allUnitListVal: '',
                dialogFormVisible: false,
                oFile: '',
                uploadData:{
                    operationId:"",
                    unitId:'',
                    timestamp:'',
                    describe:'',
                    trailId:''
                },
                callbackUrl:[],
                dataOptions: [{
                    value: '2',
                    label: '项目',
                    disabled: true
                }],
                props: {
                    value: 'label',
                    children: 'cities'
                },
                priorityList:[{
                    id:'0000',
                    value: '',
                    label: '请选择'
                },{
                    id:'0001',
                    value: 1,
                    label: '紧急'
                }, {
                    id:'0002',
                    value: 2,
                    label: '普通'
                }],
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
                loading: false,
                showFileFlag:true

            }
        },
        created(){

        },
        mounted() {
            this.getOrgListByUserId();
        },
        methods:{
            //选择运营中心时候的操作
            changeSubVal(){
                this.allUnitListVal = null;
            },
            //选择企业的时候
            changeUnitVal(){
                var that = this;
                return that.orgListValue = that.allUnitList.find(item=>item.value==that.allUnitListVal).subCenterCode;
            },
            //根据用户id,系统编码获取组织机构列表
            getOrgListByUserId() {
                var that = this;
                api.post('/remoteApi/tool/org/findOrgListByRole', {
                    userId: api.getGlobalVal("userObj").id,
                    roleName: api.getGlobalVal('userObj').userAuthList[0].authRoleList[0].roleName
                }, 5000).then(res => {
                    if (res.code === "success") {
                        if (res.data&&res.data.length>0){
                            that.orgList=[];
                            res.data.map(function(item){
                                that.orgList.push({
                                    label: item.orgName,
                                    value: item.orgCode
                                })
                            })
                        }
                    }else{
                        this.$message({
                            type: 'warning',
                            message: "错误"
                        });
                    }
                }).catch(err => {
                    this.$message({
                        type: 'warning',
                        message: err
                    });
                });
            },
            //获取所有企业
            getAllUnit() {
                var that = this;
                that.allUnitList = [];
                this.loading = true;
                api.post('/remoteApi/tool/unit/findAllUnit', {
                    subCenterCode: this.orgListValue
                }, 5000).then(res => {
                    if (res.code === "success") {
                        this.loading = false;
                        if (res.data&&res.data.length>0){
                            that.allUnitList=[];
                            res.data.map(function(item){
                                that.allUnitList.push({
                                    label: item.label,
                                    value: item.value,
                                    subCenterCode:item.subCenterCode
                                })
                            })

                        }

                    }
                }).catch(err => {
                    this.$message({
                        type: 'warning',
                        message: err
                    });
                });
            },

            dataDigEmp(typeVal){
                if( this.uploadDataVal.type === typeVal){
                    this.form.fileList=[];
                    this.form.setState=null;
                    this.form.priority=2,
                        this.form.selectedOptions =[];
                    this.form.remarks='';
                    this.orgListValue= '';
                    this.allUnitListVal= '';
                    if(this.callbackUrl == '' || this.callbackUrl == null  || this.callbackUrl == undefined){
                        return
                    }
                    api.get("/remoteApi/tool/record/withdrawAttachmentFile?url="+ this.callbackUrl.join(','))
                        .then(res => {
                            if (res.code === "success") {
                                this.callbackUrl = [];
                            } else {
                                this.$message({
                                    type: "warning",
                                    message: res.message
                                });
                            }
                        })
                        .catch(err => {
                            this.$message({
                                type: "warning",
                                message: '删除异常'
                            });
                        });
                }
            },
            /**
             * 最多20个文件
             * @param files
             * @param fileList
             */
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            close(){
                this.form.fileList=[];
                this.form.setState=null;
                this.form.priority=2,
                    this.form.selectedOptions =[];
                this.form.remarks='';
                this.orgListValue= '';
                this.allUnitListVal= '';
                if(this.callbackUrl == '' || this.callbackUrl == null  || this.callbackUrl == undefined){
                    return
                }
                api.get("/remoteApi/tool/record/withdrawAttachmentFile?url="+ this.callbackUrl.join(','))
                    .then(res => {
                        if (res.code === "success") {
                            this.callbackUrl = [];
                        } else {
                            this.$message({
                                type: "warning",
                                message: res.message
                            });
                        }
                    })
                    .catch(err => {
                        this.$message({
                            type: "warning",
                            message: '删除异常'
                        });
                    });
            },

            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                var that = this;
                if(!file.response){
                  return
                }
                api.get("/remoteApi/tool/record/withdrawAttachmentFile?url="+file.response.data.url)
                    .then(res => {
                        if (res.code === "success") {
                            that.callbackUrl = [];
                            for(let i = 0; i< fileList.length; i++){
                                that.callbackUrl.push(fileList[i].response.data.url)
                            }
                        } else {
                            this.$message({
                                type: "warning",
                                message: res.message
                            });
                            let fileList = this.form.fileList;
                            for(let i = 0; i< fileList.length; i++) {
                                if (fileList[i][name] == fileList.name) {
                                    // fileList 里面有这一条就删除
                                    fileList.splice(i, 1);
                                    break;
                                }
                            }

                        }
                    })
                    .catch(err => {
                        this.$message({
                            type: "warning",
                            message: '删除异常'
                        });
                    });
            },
            //预览
            handlePreview(file) {
                console.log(file);
            },
            //新增提交
            onSubmit() {
                var that = this;
                if (!that.orgListValue) {
                    this.$message({
                        type: 'warning',
                        message: "请选择所属运营中心"
                    });
                    return;
                }
                if (!that.allUnitListVal) {
                    this.$message({
                        type: 'warning',
                        message: "请选择所属企业"
                    });
                    return;
                }
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
                        message: "任务描述不能为空"
                    });
                    return;
                }
                api.post("/remoteApi/tool/recordTrial/addRecordTrial", {
                    userId:api.getGlobalVal("userObj").id,//上传人
                    userName:api.getGlobalVal("userObj").userName,//上传人
                    subCenterCode:that.orgListValue,//运营中心Id
                    unitId:that.allUnitListVal,//单位id
                    describes:that.form.remarks,//描述信息
                    priority:that.form.priority,//优先级
                    fileUrls:that.callbackUrl.join(','),//上传地址
                    operFlag:that.form.setState,//上传类型
                    timestamp:that.uploadDataVal.timestamp,

                }).then(res => {
                    if (res.code == "success") {
                        this.$message.success('保存成功');
                        this.$emit("saveHandel")
                        this.form.fileList=[];
                        this.form.setState=null;
                        this.form.priority=2,
                        this.form.selectedOptions =[];
                        this.form.remarks='';
                        this.orgListValue= '';
                        this.allUnitListVal= '';
                        that.callbackUrl = [];
                    }else{
                        this.$message.error('保存失败');
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
                that.uploadFlag = true;
                if(res.code == 'success'){
                    that.uploadFlag = false;
                    console.log(111,res)
                    that.callbackUrl.push(res.data.url);
                    that.showFileFlag = true
                }else if(res.code == 'error'){
                    that.uploadFlag = false;
                    console.log(222,res)
                    that.$message({
                        message: res.message,
                        type: 'error'
                    });
                    let fileList = this.form.fileList;
                    for(let i = 0; i< fileList.length; i++) {
                        if (fileList[i][name] == fileList.name) {
                            // fileList 里面有这一条就删除
                            fileList.splice(i, 1);
                            break;
                        }
                    }
                    that.showFileFlag = false

                }
            },



            /**
             * 上传之前的验证
             * @param file
             * @returns {boolean}
             */
            beforeAvatarUpload(file){
                this.uploadData.operationId = this.orgListValue;
                this.uploadData.unitId = this.allUnitListVal;
                this.uploadData.describe = this.form.remarks;
                this.uploadData.timestamp = this.uploadDataVal.timestamp;
                if (!this.uploadData.describe) {
                    this.$message.error('请输入任务描述')
                    return false;
                }
                if (!this.uploadData.operationId) {
                    this.$message.error('请选择运营中心')
                    return false;
                }
                if (!this.uploadData.unitId) {
                    this.$message.error('请选择企业')
                    return false;
                }
            },
            /**
             * 文件上传失败
             * @param res
             * @param file
             * @param fileList
             */
            handleAvatarError(res, file, fileList) {
                this.uploadFlag = false;
                this.$message({
                    message: '上传文件失败',
                    type: 'error'
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .upload-content{
        height:auto;
        max-height: 550px;
        margin: 0 20px;
        background:#fff;
        text-align: left;
        overflow-y: auto;
        overflow-x: hidden;
        .el-upload-dragger{
            width: 430px !important;
        }
        /deep/.el-form-item__label{ padding-right: 6px}
    }

</style>

