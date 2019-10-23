<template>
  <div>
    <el-container>
      <el-aside width="18vw">
        <div class="closeBox">
          <p class="title">行政区划</p>
          <FilterTree refData="transFormer" :treeWidth="22" :treeHeight="480" :data="tree.transFormer" :defaultProps="tree.props" @handleTreeNodeClick="handleTreeNodeClick" style="margin-top: 10px;"></FilterTree>
        </div>
      </el-aside>
      <el-main>
        <el-row class="header" :gutter="10" style="border-bottom: none;"> 
          <el-col :span="5" class="title">
            <span>编码列表</span>
          </el-col>
          <el-col :span="19" class="right">
            <el-row>
              <el-col :span="8" :offset="16">
                <el-button size="mini" type="primary" icon="el-icon-plus" @click="NewNode">新建节点</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--列表-->
        <el-row class="body">
          <div class="userNotab">
            <!-- FIXME: 2018年12月17日 增加超时五秒请重新请求提示 -->
            <el-table ref="table" :data="tableData" style="width: 100%;" height="100%" v-loading="isLoading" stripe>
              <el-table-column label="名称" prop="distName" min-width="20%" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="行政区划编码" prop="distCode" min-width="20%" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="行政区划简称" prop="distShortName" min-width="24%" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="经度坐标" prop="longitude" min-width="15%" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="纬度坐标" prop="latitude" min-width="15%" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作" min-width="11%" align="center">
                <template slot-scope="scope">
                  <el-tooltip content="编辑" placement="bottom">
                    <el-button type="text" icon="icon-l-new ggicon-modification" style="font-size: 16px" @click="EditNode(scope.row)"></el-button>
                  </el-tooltip>  
                  <el-tooltip content="删除" placement="bottom"> 
                    <el-button type="text" icon="el-icon-delete" style="font-size: 16px" @click="handleDelete(scope.row.distCode)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <!-- TODO:组织树增加滚动条 -->
            <Pagination class="userPage" :widgetInfo="pageInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
          </div>
        </el-row>
      </el-main>
    </el-container>
    <!-- 添加对话框 -->
    <el-dialog title="添加行政区划" :visible.sync="newlyAddedVisible" :close-on-click-modal="false" @close="handleURLDialogClose('form')">
        <el-scrollbar>
            <div style="height: 500px;">
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <el-form-item label="编码" prop="distCode">
                        <el-input  v-model.trim="form.distCode" autocomplete="off" clearable placeholder="编码" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" prop="distName">
                        <el-input  v-model.trim="form.distName" autocomplete="off" clearable placeholder="名称" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="简称">
                        <el-input  v-model.trim="form.distShortName" autocomplete="off" clearable placeholder="简称" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="全拼">
                        <el-input  v-model.trim="form.fullSpelling" autocomplete="off" clearable placeholder="全拼" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="经度" prop="longitude">
                        <el-input  v-model.trim="form.longitude" autocomplete="off" clearable placeholder="经度" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度" prop="latitude">
                        <el-input  v-model.trim="form.latitude" autocomplete="off" clearable placeholder="纬度" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="简拼" prop="shortSpelling">
                        <el-input  v-model.trim="form.shortSpelling" autocomplete="off" clearable placeholder="简拼" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sortNum">
                        <el-input  v-model.trim="form.sortNum" autocomplete="off" clearable placeholder="排序" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input  v-model.trim="form.distNotes" autocomplete="off" clearable placeholder="备注" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="是否叶子节点">
                        <el-select  v-model.trim="form.isLeaf" clearable placeholder="请选择" style="width: 98%;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            selected>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center;">
                    <el-button type="primary" style="width: 90px; margin-bottom: 20px;" @click="addZoning('form')">确 定</el-button>
                </div>
            </div>
        </el-scrollbar>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="修改行政区划信息" :visible.sync="editVisible" :close-on-click-modal="false" @close="handleURLDialogClose('form')">
        <el-scrollbar>
            <div style="height: 500px;">
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <el-form-item label="编码" prop="distCode">
                        <el-input  v-model.trim="form.distCode" autocomplete="off" clearable placeholder="编码" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" prop="distName">
                        <el-input  v-model.trim="form.distName" autocomplete="off" clearable placeholder="名称" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="简称">
                        <el-input  v-model.trim="form.distShortName" autocomplete="off" clearable placeholder="简称" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="全拼">
                        <el-input  v-model.trim="form.fullSpelling" autocomplete="off" clearable placeholder="全拼" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="经度" prop="longitude">
                        <el-input  v-model.trim="form.longitude" autocomplete="off" clearable placeholder="经度" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度" prop="latitude">
                        <el-input  v-model.trim="form.latitude" autocomplete="off" clearable placeholder="纬度" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="简拼" prop="shortSpelling">
                        <el-input  v-model.trim="form.shortSpelling" autocomplete="off" clearable placeholder="简拼" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sortNum">
                        <el-input  v-model.trim="form.sortNum" autocomplete="off" clearable placeholder="排序" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input  v-model.trim="form.distNotes" autocomplete="off" clearable placeholder="备注" style="width: 98%;"></el-input>
                    </el-form-item>
                    <el-form-item label="是否叶子节点">
                        <el-select  v-model.trim="form.isLeaf" clearable placeholder="请选择" style="width: 98%;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            selected>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center;">
                    <el-button type="primary" style="width: 90px; margin-bottom: 20px;" @click="editZoning('form')">确 定</el-button>
                </div>
            </div>
        </el-scrollbar>
    </el-dialog>
  </div>
</template>
<script>
import api from "~/config/http";
import Pagination from "~/components/Pagination"
import FilterTree from "~/components/FilterTree";
import "~/assets/css/style.css";
import "~/assets/css/ggicon.css"
import common from '~/utils/common';
export default {
    components: {
        Pagination,
        FilterTree,
    },
    data () {
        // 验证经度
        var checkLongitude = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!/^[-+]?\d+(\.\d+)?$/.test(value)) {
                    callback(new Error('*无效的数值'));
                } else {
                    callback();
                }
            };
        };
        // 验证维度
        var checkLatitude = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!/^[-+]?\d+(\.\d+)?$/.test(value)) {
                    callback(new Error('*无效的数值'));
                } else {
                    callback();
                }
            };
        };
        // 验证简拼
        var checkShortSpelling = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!/^[A-Za-z]+$/.test(value)) {
                    callback(new Error('只能输入字母'));
                } else {
                    callback();
                }
            };
        };
        // 验证排序
        var checkSortNum = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!/^-?\d+$/.test(value)) {
                    callback(new Error('*无效的整数'));
                } else {
                    callback();
                }
            };
        };
        return {
            isLoading: false,
            tableData: [],
            pageInfo: {
                pageNo: 1,
                pageSize: 6,
                total: null,
            },
            tree: {
                transFormer: [],
                props: {
                    label: "distName",
                    children: "children",
                    isLeaf: "leaf"
                }
            },
            // 新增对话框
            newlyAddedVisible: false,
            // 编辑对话框
            editVisible: false,
            form: {
                distCode: '',
                distName: '',
                distShortName: '',
                fullSpelling: '',
                longitude: '',
                latitude: '',
                shortSpelling: '',
                sortNum: '',
                distNotes: '',
                isLeaf: ''
            },
            rules: {
                distCode: [
                    { required: true, message: '*此处不可为空', trigger: 'blur' }
                ],
                distName: [
                    { required: true, message: '*此处不可为空', trigger: 'blur' }
                ],
                longitude: [
                    { trigger: 'blur', validator: checkLongitude }
                ],
                latitude: [
                    { trigger: 'blur', validator: checkLatitude }
                ],
                shortSpelling: [
                    { trigger: 'blur', validator: checkShortSpelling }
                ],
                sortNum: [
                    { trigger: 'blur', validator: checkSortNum }
                ]
            },
            organization: '',
            administrative: [],
            tenants: [],
            // 搜索值
            searchValue: '',
            options: [{
                    value: '0',
                    label: '否'
                }, {
                    value: '1',
                    label: '是'
                }
            ],
        }
    },
    mounted() {
        this.initTree();
    },

    methods: {
        handleURLDialogClose(refName) {
            this.$refs[refName].clearValidate();
            this.$refs[refName].resetFields();
        },
        // 左侧树加载
        initTree() {
            api
                .post(api.forent_url.url + "/district/allInfo.mvc")
                .then(res => {
                    this.tree.transFormer = common.formatJSONTreeData(res.data,'children','distCode','parentCode');
                });
        },
        handleTreeNodeClick({node,data,obj}){
            this.distName = data.distName;
            this.distCode = data.distCode;
            this.orgObj = data;
            this.flag = true;
            this.markFloat = obj.id;
            this.keys = data.parentCode;
            this.getMechanismList();
        },
        // 分页
        sonHandleCurrentChange(pageInfo) {
            // 处理分页信息并赋值
            this.pageInfo.pageSize = (pageInfo.pageSize ? parseInt(pageInfo.pageSize) : this.pageInfo.pageSize);
            this.pageInfo.pageNo = (pageInfo.pageNo ? parseInt(pageInfo.pageNo) : this.pageInfo.pageNo);
            //重新加载列表
            this.getMechanismList();
            // this.getData();
        },
        // 右侧表格加载
        async getMechanismList () {
            this.isLoading = true;
            await api.post(api.forent_url.url + '/district/list.mvc', {
                pageNo: this.pageInfo.pageNo,
                pageSize: this.pageInfo.pageSize,
                distCode: this.distCode||'000000'
            }).then(res=> {
                const code = res.code;
                if (code == 'success') {
                    this.isLoading = false;
                    this.pageInfo.total = res.data.total;
                    this.tableData = res.data.rows;
                }
            }).catch(err => {
                this.isLoading = false;
                this.$message(
                { type:'warning',
                message:"加载超时,请重新加载!"});
            });
        },
        // 删除操作
        handleDelete (distCode) {
            let that = this;
            this.$confirm('确定要删除选择的数据吗？', '通知', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                await api.post(api.forent_url.url + '/district/deleteById.mvc', {
                    distCode: distCode
                }).then(res=>{
                    const code = res.code
                    const message = res.message
                    if (code == 'success') {
                        // 删除成功 重新加载数据
                        this.pageInfo.pageNo = 1
                        this.getMechanismList()
                        this.$message({
                            type: 'success',
                            message: message
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: message
                        })
                    }
                })
            })
            .catch(() => {
                console.log('已取消删除')       
            });
        },
        // 点击新建按钮显示对话框
        NewNode () {
            this.form = {};//表单内容重置
            this.newlyAddedVisible = true;
        },
        // 点击新建对话框确定按钮
        addZoning (form) {
            this.$refs[form].validate(async (valid) => {
                if (valid) {
                    await api.post(api.forent_url.url + '/district/save.mvc', {
                        parentCode: '000000',
                        oldDistrictCode: this.form.oldDistrictCode||'',
                        distCode: this.form.distCode,
                        distName: this.form.distName,
                        distShortName: this.form.distShortName,
                        fullSpelling: this.form.fullSpelling,
                        longitude: this.form.longitude,
                        latitude: this.form.latitude,
                        shortSpelling: this.form.shortSpelling,
                        sortNum: this.form.sortNum,
                        distNotes: this.form.distNotes,
                        isLeaf: this.form.isLeaf
                    }).then(res=>{
                        const code = res.code
                        const message = res.message
                        if (code === 'success') {
                            this.pageInfo.pageNo = 1
                            // 添加成功    
                            // 隐藏对话框
                            this.newlyAddedVisible = false
                            // 提示成功
                            this.$message.success(message)
                            // 重新加载数据
                            this.initTree();
                            this.getMechanismList();
                            this.form = {};//表单内容重置
                        } else {
                            this.pageInfo.pageNo = 1
                            // 隐藏对话框
                            this.newlyAddedVisible = false
                            this.$message.error(message)
                            this.$refs["form"].resetFields();//表单内容重置
                        }
                    }).catch(err=>{
                        this.pageInfo.pageNo = 1
                        console.log(err);
                    })
                }
            });
        },
        // 显示编辑对话框
        EditNode (planObj) {
            var plan = JSON.parse(JSON.stringify(planObj));
            // 显示对话框
            this.editVisible = true;
            this.form = plan
            this.form.distCode = plan.distCode,
            this.form.distName = plan.distName,
            this.form.distShortName = plan.distShortName,
            this.form.fullSpelling = plan.fullSpelling,
            this.form.longitude = plan.longitude,
            this.form.latitude = plan.latitude,
            this.form.shortSpelling = plan.shortSpelling,
            this.form.sortNum = plan.sortNum,
            this.form.distNotes = plan.distNotes,
            this.form.isLeaf = plan.isLeaf
        },
        // 点击编辑对话框确定按钮
        editZoning (form) {
            this.$refs[form].validate(async (valid) => {
                if (valid) {
                    await api.post(api.forent_url.url + '/district/save.mvc', {
                        parentCode: this.form.parentCode,
                        oldDistrictCode: this.form.oldDistrictCode || '',
                        distCode: this.form.distCode,
                        distName: this.form.distName,
                        distShortName: this.form.distShortName,
                        fullSpelling: this.form.fullSpelling,
                        longitude: this.form.longitude,
                        latitude: this.form.latitude,
                        shortSpelling: this.form.shortSpelling,
                        sortNum: this.form.sortNum,
                        distNotes: this.form.distNotes,
                        isLeaf: this.form.isLeaf
                    }).then(res=>{
                        const code = res.code
                        const message = res.message
                        // 编辑成功    
                        if (code === 'success') {
                            this.pageInfo.pageNo = 1
                            // 隐藏对话框
                            this.editVisible = false;
                            // 提示成功
                            this.$message.success(message)
                            // 重新加载数据
                            this.initTree();
                            this.getMechanismList();
                            this.$refs["form"].resetFields();//表单内容重置
                        } else {
                            this.pageInfo.pageNo = 1
                            this.$message.error(message)
                            // 隐藏对话框
                            this.editVisible = false;
                            this.$refs["form"].resetFields();//表单内容重置
                        }
                    }).catch(err=>{
                        this.pageInfo.pageNo = 1
                        console.log(err);
                        // 隐藏对话框
                        this.editVisible = false;
                        this.$refs["form"].resetFields();//表单内容重置
                    })
                }
            });
        }
    }
}

</script>
<style lang="scss" scoped>
@import "~/assets/css/table.scss";

[v-cloak] {
    display: none;
}

.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background: rgba(32, 160, 255, 0.5) !important;
}
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
                font-weight: bold;
                color: #2892e2;
                text-align: left;
                text-indent: 1em;
                padding: 5px;
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
            padding: 5px;
            border-bottom: 1px solid #bfcbd9;

            .title {
                // border-bottom: 1px solid #bfcbd9;
                margin: 0;
                line-height: 30px;
                padding: 0 10px 0 10px;
                font-size: 16px;
                font-weight: bold;
                color: #2892e2;
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