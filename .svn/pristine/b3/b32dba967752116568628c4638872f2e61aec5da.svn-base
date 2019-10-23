<template>
    <div class="upload-content">
        <el-form ref="form" :model="form" label-width="100px" class="upload-content-from">
            <el-form-item label="新增类型:" v-if="uploadDataVal.type === 'newAdd'">
                <el-cascader
                        :options="dataOptions"
                        @active-item-change="handleItemChange"
                        @change="onProvincesChange"
                        v-model="form.selectedOptions"
                        :props="props"
                        ref="cascaderAddr">
                </el-cascader>
            </el-form-item>
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
            <el-form-item label="优先级:">
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
            <el-form-item label="备注:">
                <el-input type="textarea" v-model="form.remarks"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="onSubmit" v-if="uploadDataVal.type === 'newAdd'">新增保存</el-button>
                <el-button type="primary" @click="onSubmit" v-else-if="uploadDataVal.type === 'edit'">编辑保存</el-button>
                <el-button @click="dataDigEmp('newAdd')">重置</el-button>
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
                form: {
                    fileList:[],
                    setState:null,
                    priority:2,
                    selectedOptions: [],
                    remarks:''
                },
                dialogFormVisible: false,
                oFile: '',
                uploadData:{
                    operationId:"",
                    unitId:''
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

            }
        },
        created(){
            this.getEditInfo();

        },
        mounted() {
            this.loadUnitData();

        },
        methods:{
            dataDigEmp(typeVal){
                if( this.uploadDataVal.type === typeVal){
                    this.form.fileList=[];
                    this.form.setState='';
                    this.form.priority='2',
                    this.form.selectedOptions =[];
                    this.form.remarks='';
                }
            },

            onProvincesChange(item){
                if (item.length == 2){
                    // debugger
                    this.dataOptions.forEach(element=>{
                        if (element.label == item[0]){
                            this.uploadData.operationId = element.value;
                            var arr = element.cities;
                            arr.forEach(cite=>{
                                if (cite.label == item[1]){
                                    this.uploadData.unitId = cite.value;
                                }
                            });
                        }
                    });
                }
            },
            handleItemChange(val) {
                var then = this;
                this.dataOptions.forEach(element=>{
                    if (element.label == val.toString()&&element.cities.length==0){
                        api.post('/remoteApi/tool/unit/findAllUnit', {
                            subCenterCode: element.value
                        }, 5000).then(res => {
                            if (res.code === "success") {
                                if (res.data&&res.data.length>0){
                                    for (var i = 0; i < res.data.length; i++) {
                                        var dataObj = res.data[i];
                                        element.cities.push(dataObj);
                                    }
                                }
                            }
                        }).catch(err => {
                            this.$message({
                                type: 'warning',
                                message: "加载超时,请重新加载!"
                            });
                        });
                    }
                });
            },

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

            //新增提交
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
            async loadUnitData() {
                var that = this;
                api.post('/remoteApi/tool/org/findOrgListByUserId', {
                    userId: api.getGlobalVal("userObj").id,
                    sysCode:'eRecord',
                    orgStatus:'1'
                }, 5000).then(res => {
                    if (res.code === "success") {
                        if (res.data&&res.data.length>0){
                            for (var i = 0; i < res.data.length; i++) {
                                var dataObj = res.data[i];
                                var obj = {};
                                obj.label = dataObj.orgName;
                                obj.value = dataObj.orgCode;
                                obj.cities = [];
                                that.dataOptions.unshift(obj);
                            }
                        }
                    }
                }).catch(err => {
                    this.$message({
                        type: 'warning',
                        message: "加载超时,请重新加载!"
                    });
                });
            },

            //编辑信息获取
            getEditInfo(){
                var uploadDatVal = this.uploadDataVal;
                if(uploadDatVal.type = 'edit'){
                    this.form.setState=uploadDatVal.editVal.oprFlag;
                    this.form.priority=uploadDatVal.editVal.priority;
                    this.form.remarks=uploadDatVal.editVal.describes;
                    for(let i = 0; i<uploadDatVal.editVal.fileName.length; i++){
                        let obj = {
                            name:uploadDatVal.editVal.fileName[i],
                            url:uploadDatVal.editVal.fileUrl[i],
                        };
                        this.form.fileList.push(obj);
                    }
                    console.log(uploadDatVal)
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
        overflow-y: auto;
        .upload-content-from{
            width: 530px;
            .el-upload-list{
                width: 470px;
            }
        }

    }

</style>

