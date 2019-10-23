<template>
    <el-dialog
            :title="title"
            :visible.sync="infoDialogShow"
            width="840px"
            height="500px"
            :before-close="cancel">
        <div style="height: 500px"  v-loading="quillUpdateImg">
            <el-scrollbar style="height: 100%;">
                <!-- 图片上传组件辅助-->
                <el-upload
                        class="avatar-uploader"
                        :action="serverUrl"
                        name="file"
                        accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png"
                        :data="imgData"
                        :show-file-list="false"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        :before-upload="beforeUpload"
                        id="quill-upload">
                </el-upload>
                <!--富文本编辑器组件-->
                <el-row>
                    <quill-editor
                            v-model="detailContent"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @change="onEditorChange($event)"
                            @ready="onEditorReady($event)"
                    >
                    </quill-editor>
                </el-row>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="infoDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
    const toolbarOptions = [
        ['bold', 'italic', 'underline'],
        [{'header': 1}, {'header': 2}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],
        [{'align': []}],
        ['clean'],
        ['link', 'image']
    ]
    export default {
        // props:{
        //     serverUrl:String,
        //     imgData:Object
        // },
        data() {
            return {
                typeData:'1',
                title:'驳回',
                infoDialogShow:false,
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: '/remoteApi/tool/recordTrial/uploadfile', // 这里写你要上传的图片服务器地址
                imgData:{
                    trailId:'317'
                },
                // header: {token: sessionStorage.token}, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
                detailContent: '', // 富文本内容
                editorOption: {
                    placeholder: '',
                    theme: 'snow', // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions, // 工具栏
                            handlers: {
                                'image': function (value) {
                                    console.log(value)
                                    if (value) {
                                        document.querySelector('#quill-upload input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                } // 富文本编辑器配置
            }
        },
        methods: {
            init(typeData){
                const that = this;
                that.typeData = typeData;
                that.title = that.typeData  == '1' ? '通过信息':'驳回信息'
                that.infoDialogShow = true;
                that.detailContent = '';
            },
            // 上传图片前
            beforeUpload(res, file) {
                this.quillUpdateImg = true
            },
            // 上传图片成功
            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                console.log(res)
                if (res.code == 'success' && res.data !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片 res.info为服务器返回的图片地址
                    console.log(res.data.url)
                    quill.insertEmbed(length, 'image', res.data.url)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },
            // 上传图片失败
            uploadError(res, file) {
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            },
            onEditorChange(){},
            onEditorReady(){},
            // getContent(value){
            //     this.detailContent = value
            // },
            sure(){
                // console.log(this.detailContent);
                this.$emit('sureEditorBtn',this.detailContent,this.typeData)
            },
            cancel(){
                this.infoDialogShow = false;
                this.detailContent = '';
            }
        },

        watch:{
            // detailContent(newVal,oldVal){
            //     this.$emit('changeContent',newVal)
            // }
        }
    }
</script>
<style>
    .avatar-uploader{
        display: none;
    }
</style>
