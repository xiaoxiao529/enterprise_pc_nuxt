<template>
    <div>
        <el-container>
            <el-aside width="18vw">
                <div class="closeBox">
                    <p class="title">组织机构</p>
                    <FilterTree refData="transFormer" :treeWidth="22"  :treeHeight="480" :data="tree.transFormer" :defaultProps="tree.props" @handleTreeNodeClick="handleTreeNodeClick" style="margin-top: 10px;"></FilterTree>
                </div>
            </el-aside>
            <el-main>
                <el-row class="header" :gutter="10" style="border-bottom: none;">
                    <el-col :span="5" class="title">
                        <span>机构列表</span>
                    </el-col>
                    <el-col :span="19" class="right">
                        <el-row>
                            <el-col :span="8" :offset="16">
                                <el-button size="mini" type="primary" icon="el-icon-plus" @click="NewInstitution">新建机构</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <!--列表-->
                <el-row class="body">
                    <div class="userNotab">
                        <!-- FIXME: 2018年12月17日 增加超时五秒请重新请求提示 -->
                        <el-table ref="table" :data="tableData" style="width: 100%;" height="100%" v-loading="isLoading" stripe>
                            <el-table-column label="机构名称" prop="orgName" min-width="18%" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="机构职责" prop="orgDuty" min-width="18%" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="联系电话" prop="dutyTel" min-width="18%" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="地址" prop="address" min-width="20%" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="修改时间" prop="updateTime" min-width="20%" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="操作" min-width="11%" align="center">
                                <template slot-scope="scope">
                                    <el-tooltip content="编辑" placement="bottom">
                                        <el-button type="text" icon="icon-l-new ggicon-modification" style="font-size: 16px" @click="EditorialOrganization(scope.row)"></el-button>
                                    </el-tooltip>  
                                    <el-tooltip content="删除" placement="bottom"> 
                                        <el-button type="text" icon="el-icon-delete" style="font-size: 16px" @click="handleDelete(scope.row.orgCode)"></el-button>
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
        <el-dialog title="添加组织机构" :visible.sync="newlyAddedVisible" :close-on-click-modal="false" @close="handleURLDialogClose('form')">
            <el-scrollbar>
                <div style="height: 500px;">
                    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                        <el-form-item label="机构名称" prop="orgName">
                        <el-input  v-model.trim="form.orgName" autocomplete="off" clearable placeholder="机构名称" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="机构职责">
                        <el-input  v-model.trim="form.orgDuty" autocomplete="off" clearable placeholder="机构职责" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="dutyTel">
                        <el-input  v-model.trim="form.dutyTel" autocomplete="off" clearable placeholder="联系电话" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="传真" prop="fax">
                        <el-input  v-model.trim="form.fax" autocomplete="off" clearable placeholder="传真" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                        <el-input  v-model.trim="form.address" autocomplete="off" clearable placeholder="地址" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="邮编" prop="zipCode">
                        <el-input  v-model.trim="form.postCode" autocomplete="off" clearable placeholder="邮编" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="机构类型">
                        <el-select  v-model.trim="form.orgTypeCode" clearable placeholder="机构类型" style="width: 98%;">
                            <el-option
                            v-for="item in organization"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            selected>
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="排序" prop="dispOrder">
                        <el-input  v-model.trim="form.dispOrder" autocomplete="off" clearable placeholder="排序" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="行政区划">
                        <el-select  v-model.trim="form.districtCode" clearable placeholder="行政区划" style="width: 98%;">
                            <el-option
                            v-for="item in administrative"
                            :key="item.distCode"
                            :label="item.distName"
                            :value="item.distCode"
                            selected>
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="所属租户">
                        <el-select  v-model.trim="form.tenantId" clearable placeholder="所属租户" style="width: 98%;">
                            <el-option
                            v-for="item in tenants"
                            :key="item.id"
                            :label="item.tenantName"
                            :value="item.id"
                            selected>
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button type="primary" style="width: 90px; margin-bottom: 20px;" @click="addMechanism('form')">确 定</el-button>
                    </div>
                </div>
            </el-scrollbar>
        </el-dialog>
        <!-- 编辑对话框 -->
        <el-dialog title="编辑组织机构信息" :visible.sync="editVisible" :close-on-click-modal="false" @close="handleURLDialogClose('form')">
            <el-scrollbar>
                <div style="height: 500px;">
                    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                        <el-form-item label="机构名称" prop="orgName">
                        <el-input  v-model.trim="form.orgName" autocomplete="off" clearable placeholder="机构名称" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="机构职责">
                        <el-input  v-model.trim="form.orgDuty" autocomplete="off" clearable placeholder="机构职责" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="dutyTel">
                        <el-input  v-model.trim="form.dutyTel" autocomplete="off" clearable placeholder="联系电话" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="传真" prop="fax">
                        <el-input  v-model.trim="form.fax" autocomplete="off" clearable placeholder="传真" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                        <el-input  v-model.trim="form.address" autocomplete="off" clearable placeholder="地址" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="邮编" prop="zipCode">
                        <el-input  v-model.trim="form.postCode" autocomplete="off" clearable placeholder="邮编" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="机构类型">
                        <el-select  v-model.trim="form.orgTypeCode" clearable placeholder="机构类型" style="width: 98%;">
                            <el-option
                            v-for="item in organization"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            selected>
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="排序" prop="dispOrder">
                        <el-input  v-model.trim="form.dispOrder" autocomplete="off" clearable placeholder="排序" style="width: 98%;"></el-input>
                        </el-form-item>
                        <el-form-item label="行政区划">
                        <el-select  v-model.trim="form.districtCode" clearable placeholder="行政区划" style="width: 98%;">
                            <el-option
                            v-for="item in administrative"
                            :key="item.distCode"
                            :label="item.distName"
                            :value="item.distCode"
                            selected>
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="所属租户">
                        <el-select  v-model.trim="form.tenantId" clearable placeholder="所属租户" style="width: 98%;">
                            <el-option
                            v-for="item in tenants"
                            :key="item.id"
                            :label="item.tenantName"
                            :value="item.id"
                            selected>
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button type="primary" style="width: 90px; margin-bottom: 20px;" @click="editMechanism('form')">确 定</el-button>
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
        // 验证联系电话
        var checkTel = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!/^1[34578]\d{9}$|^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
                    callback(new Error('你输入的联系电话有误'));
                } else {
                    callback();
                }
            };
        };
        // 验证传真
        var checkFax = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
                    callback(new Error('你输入的传真号码有误'));
                } else {
                    callback();
                }
            };
        };
        // 验证邮编
        var checkPostCode = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!/^-?\d+$/.test(value)) {
                    callback(new Error('*无效的整数'));
                } else {
                    if (!/^[1-9][0-9]{5}$/.test(value)) {
                        callback(new Error('*无效的邮政编码'));
                    }
                }
            };
        };
        // 验证排序
        var checkDispOrder = (rule, value, callback) => {
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
                    label: "orgName",
                    children: "children",
                    isLeaf: "leaf"
                }
            },
            // 新增对话框
            newlyAddedVisible: false,
            // 编辑对话框
            editVisible: false,
            form: {
                orgName: '',
                orgDuty: '',
                dutyTel: '',
                fax: '',
                address: '',
                postCode: '',
                orgTypeCode: '',
                dispOrder: '',
                districtCode: '',
                tenantId: ''
            },
            rules: {
                orgName: [
                    { required: true, message: '*此处不可为空', trigger: 'blur' }
                ],
                dutyTel: [
                    { trigger: 'blur', validator: checkTel }
                ],
                fax: [
                    { trigger: 'blur', validator: checkFax }
                ],
                zipCode: [
                    { trigger: 'blur', validator: checkPostCode }
                ],
                dispOrder: [
                    { trigger: 'blur', validator: checkDispOrder }
                ]
            },
            organization: [],
            administrative: [],
            tenants: [],
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
                .post(api.forent_url.url + "/org/allorg.mvc")
                .then(res => {
                    this.tree.transFormer = common.formatJSONTreeData(res.data,'children','orgCode','parentCode');
                });
        },
        handleTreeNodeClick({node,data,obj}){
            this.tenantId = data.tenantId;
            this.orgCode = data.orgCode;
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
        },
        // 机构类型选项
        TypeOfOrganization () {
            api.post(api.forent_url.url + '/org/orgType.mvc')
            .then(res=>{
                const code = res.code
                if (code == 'success') {
                    const obj = JSON.parse(res.data)
                    this.organization = obj
                }
            })
        },
        // 获取行政区划信息
        AdministrativeDivision () {
            api.post(api.forent_url.url + '/district/allInfo.mvc?districtCode=110')
            .then(res=>{
                const code = res.code
                if (code == 'success') {
                    this.administrative = res.data
                }
            })
        },
        // 获取所属租户信息
        TenantList () {
            api.post(api.forent_url.url + '/org/alltenant.mvc')
            .then(res=>{
                const code = res.code
                if (code == 'success') {
                    this.tenants = res.data
                }
            })
        },
        // 右侧表格加载
        async getMechanismList () {
            this.isLoading = true;
            await api.post(api.forent_url.url + '/org/list.mvc', {
                pageNo: this.pageInfo.pageNo,
                pageSize: this.pageInfo.pageSize,
                orgCode: this.orgCode||''
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
        handleDelete (orgCode) {
            let that = this;
            this.$confirm('确定要删除选择的数据吗？', '通知', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                await api.post(api.forent_url.url + '/org/deleteById.mvc', {
                    orgCode: orgCode
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
                // this.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // });          
            });
        },
        // 点击新建按钮显示对话框
        NewInstitution () {
            this.form = {};//表单内容重置
            this.newlyAddedVisible = true;
            this.TypeOfOrganization()
            this.AdministrativeDivision()
            this.TenantList()
        },
        // 点击新建对话框确定按钮
        addMechanism (form) {
            this.$refs[form].validate(async (valid) => {
                if (valid) {
                    await api.post(api.forent_url.url + '/org/save.mvc', {
                        parentCode: -1,
                        orgCode: this.orgCode || '',
                        orgName: this.form.orgName,
                        orgDuty: this.form.orgDuty,
                        dutyTel: this.form.dutyTel,
                        fax: this.form.fax,
                        address: this.form.address,
                        postCode: this.form.postCode,
                        orgTypeCode: this.form.orgTypeCode,
                        dispOrder: this.form.dispOrder,
                        districtCode: this.form.districtCode,
                        tenantId: this.form.tenantId
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
                            this.$refs["form"].resetFields();//表单内容重置
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
        EditorialOrganization (planObj) {
            var plan = JSON.parse(JSON.stringify(planObj));
            this.TypeOfOrganization()
            this.AdministrativeDivision()
            this.TenantList()
            // 显示对话框
            this.editVisible = true;
            this.form = plan
            this.form.orgName = plan.orgName
            this.form.orgDuty = plan.orgDuty
            this.form.dutyTel = plan.dutyTel
            this.form.fax = plan.fax
            this.form.address = plan.address
            this.form.postCode = plan.postCode
            this.form.orgTypeCode = plan.orgTypeCode == '0' ? '上级' : plan.orgTypeCode == '1' ? '下级' : ''
            this.form.dispOrder = plan.dispOrder
            this.form.districtCode = plan.districtCode
            this.form.tenantId = plan.tenantId
        },
        // 点击编辑对话框确定按钮
        editMechanism (form) {
            console.log('点击')
            this.$refs[form].validate(async (valid) => {
                console.log('进来了')
                if (valid) {
                    console.log('进入if')
                    await api.post(api.forent_url.url + '/org/save.mvc', {
                        parentCode: this.form.parentCode,
                        orgCode: this.form.orgCode,
                        orgName: this.form.orgName,
                        orgDuty: this.form.orgDuty,
                        dutyTel: this.form.dutyTel,
                        fax: this.form.fax,
                        address: this.form.address,
                        postCode: this.form.postCode,
                        orgTypeCode: this.form.orgTypeCode,
                        dispOrder: this.form.dispOrder,
                        districtCode: this.form.districtCode,
                        tenantId: this.form.tenantId
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
.el-form-item__error{
    left:132px;
}
</style>
<style>
.el-tooltip__popper.is-dark{
    max-width: 300px;
}
</style>