<template>
    <div>
        <el-container>
            <el-main>
                <div class="header">
                    <el-form :inline="true" :model="searchForm" class="demo-form-inline filterAll" style="padding-top:0;height:40px;line-height:40px;">
                        <el-row style="padding-bottom: 5px">
                            <el-col :span="6" class="text-4">
                              <label>配置key</label>
                                <el-input style="width:60%" size="mini" v-model.trim="searchForm.configKey" placeholder=" 配置key" clearable> </el-input>
                            </el-col>
                            <el-col :span="6" class="text-4">
                              <label>配置描述</label>
                                <el-input style="width:60%" size="mini" v-model.trim="searchForm.configDes" placeholder=" 配置描述" clearable> </el-input>
                            </el-col>
                            <el-col :span="12"  >
                                <el-row>
                                    <el-col :span="4" :offset="16">
                                        <el-button type="primary" @click="handleSearch">查询</el-button>
                                    </el-col>
                                    <el-col :span="4" >
                                        <el-button type="primary" @click="handleCreate">新建</el-button>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <!--列表-->
                <el-row class="body">
                    <div class="userNotab">
                        <el-table ref="table" :data=" tableData  " style="width: 100%;" height="90%" show-overflow-tooltip v-loading="isLoading" stripe>
                            <el-table-column label="排序号"  prop="configNo" width="180" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column label="配置key" prop="configKey" show-overflow-tooltip align="center"></el-table-column>
                            <el-table-column label="配置描述" prop="configDes" show-overflow-tooltip align="center"></el-table-column>
                            <el-table-column label="是否启用" width="180" prop="configStatus" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span v-if="scope.row.configStatus === '0' ">停用</span>
                                    <span v-if="scope.row.configStatus === '1' ">启用</span>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="100" label="操作" align="center">
                                <template slot-scope="scope">

                                    <el-tooltip v-show="operateAuth.edit" content="编辑" placement="bottom">
                                        <el-button  type="text" @click="onEdit(scope.row)" :disabled="scope.row.configStatus === '0' ? true: false">
                                           <!--<i class="ggicon-modification icon-l-new l-icons" ></i>-->
                                            <i class="icon-l-new ggicon-modification" style="font-size: 16px"></i>
                                        </el-button>
                                    </el-tooltip>

                                    <el-tooltip v-show="operateAuth.locked" :content="scope.row.configStatus === '0' ? '已锁定': '已激活'" placement="bottom" v-if="islock">
                                       <el-button type="text" @click="handleUserClick('lock',scope)"  >
                                           <i :class="classIconLock(scope)" style="font-size: 16px"></i>
                                       </el-button>
                                    </el-tooltip>

                                    <el-tooltip v-show="operateAuth.delete" content="删除" placement="bottom">
                                        <el-button type="text" @click="handleUserClick('delete',scope)" :disabled="scope.row.configStatus === '0' ? true: false">
                                            <i class="el-icon-delete" style="font-size: 16px"></i>
                                        </el-button>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- FIXME: 样式修复 2018年12月14日     -->
                        <Pagination class="userPage" :widgetInfo="pageInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
                    </div>
                </el-row>
            </el-main>
        </el-container>
        <!--新建对话框-->
        <el-dialog title="添加配置信息" :visible.sync='isNewShow' width="620px" @close="onNewClose" >
            <el-scrollbar>
                <div style="height:200px">
                    <el-form :model="form" ref="form" label-width="120px" :rules="newRules">
                        <el-form-item label="配置key" prop="configKey"  :required="isInput" >
                            <el-input clearable  type="textarea" maxlength="50" placeholder="请输入配置key"   v-model.trim="form.configKey"  autocomplete="off"  ></el-input><!--@change="changeConfig(form.configKey)"-->
                        </el-form-item>
                        <el-form-item label="配置描述" prop="configDes" :required="isInput" >
                            <el-input clearable   v-model.trim="form.configDes" type="textarea" maxlength="50" placeholder="请输入配置描述"  autocomplete="off"  ></el-input><!--@change="changeConfig(form.configDes)"-->
                        </el-form-item>
                        <el-form-item label="排序号" prop="configNo" :required="isInput" >
                            <el-input clearable   v-model.trim="form.configNo" type="textarea" maxlength="50"  autocomplete="off"  :placeholder="form.configNo ? '' :'排序号必须为数值'" ></el-input><!--@change="changeConfig(form.configNo)"-->
                        </el-form-item>
                        <el-form-item label="是否启用" prop="configStatus" >
                            <el-col :span="13">
                                <el-radio-group  v-model.trim="form.configStatus"  >
                                    <el-radio  :span="6"  label= "1">启用</el-radio>
                                    <el-radio  :span="6"  label= "0" >停用</el-radio>
                                </el-radio-group>
                            </el-col>

                        </el-form-item>
                    </el-form>
                    <!--确定按钮-->
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button type="primary" @click="createSave('form')">确 定</el-button>
                    </div>
                </div>
            </el-scrollbar>
        </el-dialog>
        <!--编辑对话框-->
        <el-dialog title="添加配置信息" :visible.sync='isEditShow' width="620px" @close="onEditClose">
            <el-scrollbar>
                <div style="height: 200px">
                    <el-form :model="editForm" ref="editForm" label-width="120px" :rules="rules">
                        <el-form-item label="配置key" prop="configKey" >
                            <el-input clearable  type="textarea" maxlength="50"   v-model.trim="editForm.configKey"  autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="配置描述" prop="configDes" >
                            <el-input clearable  type="textarea" maxlength="50"  v-model.trim="editForm.configDes"  autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="排序号" prop="configNo"  >
                            <el-input clearable   v-model.trim="editForm.configNo" type="textarea" maxlength="50" autocomplete="off"  placeholder="排序号必须为数值"></el-input>
                        </el-form-item>
                        <el-form-item label="是否启用" prop="configStatus">
                            <el-col :span="13">
                                <el-radio-group  v-model.trim="editForm.configStatus">
                                    <el-radio :span="6" label='1' >已启用</el-radio>
                                    <el-radio :span="6" label='0' >已停用</el-radio>
                                </el-radio-group>
                            </el-col>

                        </el-form-item>
                    </el-form>
                    <!--确定按钮-->
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button type="primary" @click="editSave('editForm')">确 定</el-button>
                    </div>
                </div>
            </el-scrollbar>
        </el-dialog>
    </div>
</template>

<script>
  import api from "~/config/http";
  import Mock from "mockjs";
  import Pagination from "~/components/Pagination"
  import "~/assets/css/style.css";
  import "~/assets/css/ggicon.css";

  export default {
    components: {
      Pagination
    },

    data() {
      var that = this;
      var configKey_configName = function (rule, value, callback) {
        if (!value || value === '') {
          //远程请求
           callback(new Error('*配置key不能为空'));
        } else if(value){
          api.post(api.forent_url.url +'/logauditconfig/valConfigKey.mvc',{
            id:that.editForm.id ? that.editForm.id :'' ,
            configKey : that.editForm.configKey ? that.editForm.configKey : that.form.configKey ,
          }).then(res=>{
            if (res.code == "error") {
              callback(new Error(res.message));
            } else {
              callback();
            }
          })
        }else {
          callback();
        }
      };
      var configDes_configName = function (rule, value, callback) {
        if (!value || value === '') {
          //远程请求
           callback(new Error('*配置描述不能为空'));
        }else if(value){
          api.post(api.forent_url.url +'/logauditconfig/valConfigDes.mvc',{
            id:that.editForm.id ? that.editForm.id :'' ,
            configDes : that.editForm.configDes ? that.editForm.configDes : that.form.configDes ,
          }).then(res=>{
            if (res.code == "error") {
              callback(new Error(res.message));
            } else {
              callback();
            }
          })
        }else {
          callback();
        }
      };
      var configNo_configName = function (rule, value, callback) {
        if (!value || value === '') {
          //远程请求
           callback(new Error('*排序号不能为空'));
        } else if(value){
          api.post(api.forent_url.url +'/logauditconfig/valConfigNo.mvc',{
            id:that.editForm.id ? that.editForm.id :'' ,
            configNo : that.editForm.configNo ? that.editForm.configNo : that.form.configNo ,
          }).then(res=>{
            if (res.code == "error") {
              callback(new Error('*排序号已存在'));
            }else {
              callback();
            }
          })
        }else {
          callback();
        }
      };
      var configKey_editName = function (rule, value, callback) {
        if (!value || value === '') {
          //远程请求
          callback(new Error('*配置key不能为空'));
        } else if(value){
          api.post(api.forent_url.url +'/logauditconfig/valConfigKey.mvc',{
            id:that.editForm.id ? that.editForm.id :'' ,
            configKey : that.editForm.configKey ? that.editForm.configKey : that.form.configKey ,
          }).then(res=>{
            if (res.code == "error") {
              callback(new Error(res.message));
            } else {
              callback();
            }
          })
        }
      };
      var configDes_editName = function (rule, value, callback) {
        if (!value || value === '') {
          //远程请求
          callback(new Error('*配置描述不能为空'));
        }else if(value){
          api.post(api.forent_url.url +'/logauditconfig/valConfigDes.mvc',{
            id:that.editForm.id ? that.editForm.id :'' ,
            configDes : that.editForm.configDes ? that.editForm.configDes : that.form.configDes ,
          }).then(res=>{
            if (res.code == "error") {
              callback(new Error(res.message));
            } else {
              callback();
            }
          })
        }else {
          callback();
        }
      };
      var configNo_editName = function (rule, value, callback) {
        if (!value || value === '') {
          //远程请求
          callback(new Error('*排序号不能为空'));
        } else if(value){
          api.post(api.forent_url.url +'/logauditconfig/valConfigNo.mvc',{
            id:that.editForm.id ? that.editForm.id :'' ,
            configNo : that.editForm.configNo ? that.editForm.configNo : that.form.configNo ,
          }).then(res=>{
            if (res.code == "error") {
              callback(new Error(res.message));
            } else {
              callback();
            }
          })
        }else {
          callback();
        }
      };
      return {
        tableData:[],
        isLoading: false,
        isEditShow: false, //编辑对话框
        isNewShow : false,//新建对话框
        islock: true,//上锁
        isEdit: false,//key,des,No,是否成功
        orgCode: "", //组织机构编码
        cloShow: true, //隐藏不显示的列
        isSearch:false,//是否查询
        isNull:true,//新建是否为空
        isInput: false,
        isHolder:false,//是否显示
        rules: {
          configKey: [
              {
            required: true,
            validator: configKey_editName,
            trigger: 'change'
          }],
          configDes: [{
            required: true,
            validator: configDes_editName,
            trigger: 'change'
          }],
          configNo: [{
            required: true,
            validator: configNo_editName,
            trigger: 'change'
          }],
        },
        newRules:{
          configKey: [
            {
            required: true,
            validator: configKey_configName,
            trigger: 'change'
            }],
          configDes: [{
            required: true,
            validator: configDes_configName,
            trigger: 'change'
          }],
          configNo: [{
            required: true,
            validator: configNo_configName,
            trigger: 'change',
            type: 'number',
          }],
        },
        //后台返回message
        keyMessage:'',
        desMessage:'',
        noMessage:'',
        isUseing:'',
        operator: '',
        dateValue: '',
        value: '',
        tenantId: "",
        setFlag: true,
        searchUserName: "",
        flag: true,
        firstLevel: false,
        menuVisible: false,
        markFloat: 1,
        iconClass: "el-icon-delete",
        iconCont: "",
        orgObj: "",
        keys: [],
        node: "",
        pageNo: 1,
        pageSize: 15,
        total: 0,
        pageInfo: {
          pageNo: 1,
          pageSize: 6,
          total: 0,
        },
        operateAuth: {
          edit: true,
          logoff: true,
          locked: true,
          actived: true,
          delete:true,
          role: true,
          reset: true,
          restore: false,
          accept: false,
          refuse: false
        },


        formRules: "",

        props: {
          label: "orgName",
          children: "zones",
          isLeaf: "leaf"
        },

        defaultProps: {
          children: "children",
          label: "label"
        },

        searchForm: {
          configKey: '',
          configDes: '',
        },
        //新建的form
        form: {
          configKey: '',
          configDes: '',
          configNo: null,
          configStatus: '1',//1启用，0停止
          id : ''
        },
        //编辑form
        editForm:{
          configKey: '',
          configDes: '',
          configNo: null,
          configStatus: '',
          id : ''
        },
        id: '402881ee539c540001539c571fcb0000',
      };
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      // 点击编辑对话框
      onEdit(editValue) {
            //解锁状态可以编辑
            this.isEditShow = true;
            var editValue  = JSON.parse(JSON.stringify(editValue));
            this.editForm = editValue ;
        api.post(api.forent_url.url +'/logauditconfig/updateState.mvc',{id: editValue.id})
            .then(res=>{
              if(res.code === 'error'){
                this.isEditShow = true;
                this.$message({message:'编辑失败',type:'warning'});
              }else {
                //this.$message({message:'编辑成功',type:'success'});
                this.isEditShow = true;
              }
            });
       // this.handleEditDey();
      },
      //编辑对话框确定按钮
      editSave(){
        this.$refs['editForm'].validate((valid)=>{
          console.log(valid,"valid0000000000");
          if(valid ){
           api.post(api.forent_url.url + '/logauditconfig/save.mvc', {
             id : this.editForm.id,
             configKey : this.editForm.configKey,
             configDes : this.editForm.configDes,
             configNo : this.editForm.configNo,
             configStatus : this.editForm.configStatus
           }).then(res => {
             if (res.code === 'success') {
               //隐藏对话框
               this.isEditShow = false;
               this.pageInfo.pageNo = 1;
               this.getTableData();
               this.$message({ message: '编辑成功', type: 'success'  });
               this.$refs["editForm"].resetFields();
             }else {
               this.isEditShow = false;
               this.$message({ message: '编辑失败', type: 'warning' });
               this.$refs["editForm"].resetFields();
             }
           }).catch(err =>{
             console.log(err);
             this.isEditShow = false;
             this.$refs["editForm"].resetFields();
             return false;
           });
         }
        });
      } ,
      //新建对话框
      handleCreate(){
        this.isNewShow = true;
        this.$nextTick(()=>{
          api.post(api.forent_url.url + '/logauditconfig/getMaxNumber.mvc')
              .then(res=>{
                if(res.code === 'success'){
                  this.form.configNo =  res.data;
                }
              })
              .catch(err=>{
                console.log(err);
              });
        })
      },
      //新建保存
      createSave(){
        this.$refs['form'].validate(valid=>{
          //console.log(valid,'valid.....')
          if(valid) {
            api.post(api.forent_url.url + '/logauditconfig/save.mvc', {
              id : this.form.id,
              configKey : this.form.configKey,
              configDes : this.form.configDes,
              configNo : this.form.configNo,
              configStatus : this.form.configStatus
            }).then(res => {
              if (res.code === 'success') {
                this.isNewShow = false;
                this.pageInfo.pageNo = 1;
                this.getTableData();
                this.$message({ message: '新建成功', type: 'success'  });
                this.$refs["form"].resetFields();
              }else {
                this.isNewShow = false;

                this.$refs["form"].resetFields();
              }
            }).catch(err =>{
            });
          }
        });
      },
      //关闭按钮表单内容重置
      onEditClose() {
      this.$refs['editForm'].resetFields();
      },
      //新建关闭按钮表单内容重置
      onNewClose(){
        this.$refs.form.resetFields();
        //重置排序号
        this.form.configNo = '';
      },
      //上锁的图标
      classIconLock(scope) {
        //已停用，上锁状态
        if (scope.row.configStatus === '1') {
          return 'cloud-unlocked icon-l-new l-icons';
        } else if(scope.row.configStatus === '0'){
          return 'cloud-locked icon-l-new l-icons'
        }
        return false
      },
       //上锁、删除操作
      handleUserClick(operateType, scope) {
        if (operateType === "lock") {
          //上锁切换
         var state = scope.row.configStatus==='0'?'1':'0';
          api.post(api.forent_url.url + "/logauditconfig/updateStateAnreFreshCach.mvc", {
            ids:scope.row.id,
            state:state,
          }).then(res=>{
            if(res.code==='success'){
              this.getTableData();
              this.$message({message:'操作成功',type:'success'});
            }else {
              this.$message({message:'操作失败',type:'warning'})
            }
          }).catch(err=>{
            console.log(err)
          })
        }
        if (operateType === 'delete') {
          this.$confirm('确定要删除选择的数据吗？', '通知', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: "warning"
              }).then(async ()=>{
                await api.post(api.forent_url.url + '/logauditconfig/delete.mvc',{ids:scope.row.id})
                  .then(res=>{
                     if(res.code === 'success'){
                         
                       this.pageInfo.pageNo = 1;
                       this.getTableData();
                       this.$message({ type: 'success',message : res.message});
                       this.$refs['form'].resetFields();
                     }else {
                       this.$message({ type: 'warning',message : '删除失败'})
                     }
                   })
                  .catch(err=>{
                        console.log(err)
                  })
             })
         }
      },
      // 处理input框回车搜索事件
      async handleSearch() {
        //改变isSearch
        this.isSelect = true;
        this.pageInfo.pageNo = 1;
        let res = await this.getTableData({
          pageNo: this.pageInfo.pageNo,
          pageSize: this.pageInfo.pageSize || 6,
          configKey: this.searchForm.configKey,
          configDes: this.searchForm.configDes,
        });
        if (res.code === 'success') {
          this.tableData  = res.data.rows
        }
      },
      //table数据
      getTableData() {
        this.isLoading = true;
         api.post(api.forent_url.url + "/logauditconfig/list.mvc", {
          pageSize:this.pageInfo.pageSize,
          pageNo:this.pageInfo.pageNo,
          configKey:this.searchForm.configKey,
          configDes:this.searchForm.configDes,
        }).then(res=>{
           if (res && res.code === 'success') {
             this.isLoading = false;
             this.tableData = res.data.rows;
             this.pageInfo.total = res.data.total === null ? 0 : res.data.total;
           }else {
              this.isLoading = false;
              this.tableData = [];
              this.widgetInfo.total = 0;
           }/*else if(this.isEditShow || !this.isEditShow ){
             //如果是编辑,total是编辑的configNo
             this.pageInfo.total = this.editForm.configNo;
             console.log("编辑的。。。。。")
           }else {
             this.tableData = [];
             //this.widgetInfo.list = res.data.rows;
             this.widgetInfo.total = 0;
             //console.log('没有数值。。。。。')
           }*/
         }).catch(err=>{
           this.isLoading = false;
           console.log(err);
         })
      },
      // 处理分页信息并赋值
      async sonHandleCurrentChange(pageInfo) {
        this.pageInfo.pageSize = (pageInfo.pageSize ? parseInt(pageInfo.pageSize) : this.pageInfo.pageSize);
        this.pageInfo.pageNo = (pageInfo.pageNo ? parseInt(pageInfo.pageNo) : this.pageInfo.pageNo);
        this.getTableData();
      },
    },
  };
</script>

<style lang="scss" scoped>
    @import "~/assets/css/table.scss";

    .el-form {
        padding: 0 40px 0 0
    }

    [v-cloak] {
        display: none;
    }

    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        background: rgba(32, 160, 255, 0.5) !important;
    }

    // .l-icon {
    //     i {
    //         font-size: 2rem;
    //         color: #2892e2;
    //     }
    // }

    .l-icons {
        font-size: 2rem;
        cursor: pointer;
        color: #2892e2;
    }

    .el-container {
        height: calc(100vh - 75px);
        overflow: hidden;

        /* 左侧侧栏 */
        .el-aside {
            background-color: #fff;
            color: #333;
            border: 1px solid #bfcbd9;
            margin: 10px 10px 0 0;
            height: calc(100% - 13px);

            /* tree容器 */
            .closeBox {
                width: 100%;
                height: 100%;

                /* 标题 */
                .title {
                    border-bottom: 1px solid #bfcbd9;
                    margin: 0;
                    line-height: 30px;
                    padding: 5px;
                    font-size: 16px;
                    /* font-weight: bold;
               color: #2892e2;*/
                    text-align: left;
                    text-indent: 1em;
                }

                /* 右键菜单 */
                //组织机构操作
                .orgBox {
                    position: absolute;
                    font-size: 12px;
                    color: grey;
                    border: 1px solid #ccc;
                    text-align: center;
                    padding: 0;
                    width: 90px;
                    background: #fff;
                    z-index: 2;

                    // left:56px;
                    li {
                        line-height: 23px;
                        padding: 5px 0px;
                        width: 100%;
                        cursor: pointer;

                        a {
                            width: 100%;
                            display: inline-block;
                            color: grey;
                        }

                        :hover {
                            background: #eee;
                        }
                    }
                }
            }
        }

        .el-main {
            position: relative;
            background-color: #fff;
            color: #333;
            border: 1px solid #bfcbd9;
            margin: 10px 0 0 0;
            padding: 0;
            height: calc(100% - 13px);

            .header {
                /*padding: 5px 0 0 20px;*/
                border-bottom: 1px solid #bfcbd9;
                margin-bottom: 1%;

                .title {
                    // border-bottom: 1px solid #bfcbd9;
                    margin: 0;
                    line-height: 30px;
                    padding: 0 10px 0 10px;
                    font-size: 14px;
                    text-align: left;
                    // text-indent: 1em;
                }

                .right {
                    text-align: right;

                }

                .left {
                    text-align: left;
                }
            }

            .body {
                .userNotab {
                    border: none;

                    .el-pagination {

                        // text-align: right;
                        height: 100%;
                    }
                }

                .userPage {}

            }

            .is-ableClick {
                cursor: pointer;
            }

            .table-row {
                height: 46px;
            }

        }

        .left {
            // float: left;
            text-align: left;
        }

    }
</style>
<style>
.el-tooltip__popper.is-dark{
max-width: 300px;
}
</style>
