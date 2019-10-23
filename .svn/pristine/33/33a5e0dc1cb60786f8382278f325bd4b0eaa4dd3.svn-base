<template>
    <div>
        <el-container>
            <el-aside width="18vw">
                <div class="closeBox" @click="closeBox()">
                    <el-collapse
                        accordion
                        @change="handleCollapseChange"
                         v-model.trim="systemCode">
                        <el-collapse-item
                            v-for="(item, index) in systems"
                            :key="index"
                            :name="item.systemCode">
                            <template slot="title">
                                <span class="title">{{item.systemName}}</span>
                            </template>
                            <FilterTree
                                :refData="item.systemCode+'_tree'"
                                :data="item.tree"
                                :treeHeight="200"
                                :defaultProps="{label: 'privName',children: 'children',isLeaf: 'leaf'}"
                                @handleTreeNodeClick="handleSystemTreeNodeClick"></FilterTree>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-aside>
            <el-main>
                <el-row class="header" :gutter="10">
                    <el-col :span="5" class="title">
                        <span>权限列表</span>
                    </el-col>
                    <el-col :span="19" class="right">
                        <el-button
                            v-show='addAuthBtnVisible'
                            size="mini"
                            type="primary"
                            icon="el-icon-plus"
                            @click="handleUserClick('addAuth')">添加权限</el-button>
                        <el-button
                            v-show='!addAuthBtnVisible'
                            size="mini"
                            type="primary"
                            icon="el-icon-plus"
                            @click="handleUserClick('addURL')">添加URL</el-button>
                    </el-col>

                </el-row>
                <!--列表-->
                <el-row class="body">
                    <el-row>
                        <el-col :span="24">
                            <div class="userNotab" v-show="modulesVisible.systemTableVisble">
                                <el-table
                                    ref="table"
                                    :data="systemTableData"
                                    style="width: 100%;"
                                    height="100%">
                                    <el-table-column
                                        label="权限编码"
                                        prop="privOrder"
                                        width="180"></el-table-column>
                                    <el-table-column label="权限名称" prop="privName"></el-table-column>
                                    <el-table-column
                                        label="权限类型"
                                        show-overflow-tooltip
                                        prop="privType"
                                        :formatter="privTypeFormatter"></el-table-column>
                                    <el-table-column min-width="100" label="操作">
                                        <template slot-scope="scope">

                                            <el-tooltip
                                                v-show="operateAuth.edit"
                                                content="编辑"
                                                placement="bottom">
                                                <i @click="handleUserClick('editAuth',orgObj,scope)" class="ggicon-modification icon-l-new l-icons"></i>
                                            </el-tooltip>

                                            <el-tooltip
                                                v-show="operateAuth.logoff"
                                                content="删除"
                                                placement="bottom">
                                                <i @click="handleUserClick('deleteAuth',orgObj,scope)" class="cloud-trash icon-l-new l-icons"></i>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <Pagination
                                    class="userPage"
                                    :widgetInfo="authListPageInfo"
                                    @sonHandleCurrentChange="authListCurrentChange" />

                            </div>
                        </el-col>

                    </el-row>

                    <el-row>
                        <el-col :span="24">
                            <el-tabs
                                type="border-card"
                                 v-model.trim="activeName"
                                @tab-click="handleTabClick"
                                v-show="modulesVisible.childSystemTableVisble"
                                style="width:100%;border:none;box-shadow:none;padding-bottom:none">
                                <!-- TODO: 分页插件下部显示多条border 暂处理 -->
                                <el-tab-pane label="权限信息" name="auth">
                                    <div class="authNotab" v-show="!modulesVisible.systemTableVisble">
                                        <el-table
                                            ref="authTableData"
                                            :data="authTableData"
                                            style="width: 100%;">
                                            <el-table-column
                                                label="权限编码"
                                                prop="privCode"
                                                width="180"></el-table-column>
                                            <el-table-column label="权限名称" prop="privName"></el-table-column>
                                            <el-table-column
                                                label="权限类型"
                                                show-overflow-tooltip
                                                prop="privType"
                                                :formatter="privTypeFormatter"></el-table-column>
                                            <el-table-column min-width="100" label="操作">
                                                <template slot-scope="scope">

                                                    <el-tooltip
                                                        v-show="operateAuth.edit"
                                                        content="编辑"
                                                        placement="bottom">
                                                        <i @click="handleUserClick('editAuth',orgObj,scope)" class="ggicon-modification icon-l-new l-icons"></i>
                                                    </el-tooltip>

                                                    <el-tooltip
                                                        v-show="operateAuth.logoff"
                                                        content="删除"
                                                        placement="bottom">
                                                        <i @click="handleUserClick('deleteAuth',orgObj,scope)" class="cloud-trash icon-l-new l-icons"></i>
                                                    </el-tooltip>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <Pagination
                                            class="userPage"
                                            :widgetInfo="authInfoPageInfo"
                                            @sonHandleCurrentChange="authInfoCurrentChange" />
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="控制URL信息" name="url">
                                    <div class="authNotab" v-show="!modulesVisible.systemTableVisble">
                                        <el-table
                                            ref="controlUrlTableData"
                                            :data="controlUrlTableData"
                                            style="width: 100%;">
                                            <el-table-column label="权限名称" prop="url"></el-table-column>
                                            <el-table-column min-width="100" label="操作">
                                                <template slot-scope="scope">

                                                    <el-tooltip
                                                        v-show="operateAuth.edit"
                                                        content="编辑"
                                                        placement="bottom">
                                                        <i @click="handleUserClick('editURL',orgObj,scope)" class="ggicon-modification icon-l-new l-icons"></i>
                                                    </el-tooltip>

                                                    <el-tooltip
                                                        v-show="operateAuth.logoff"
                                                        content="删除"
                                                        placement="bottom">
                                                        <i @click="handleUserClick('deleteURL',orgObj,scope)" class="cloud-trash icon-l-new l-icons"></i>
                                                    </el-tooltip>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <Pagination
                                            class="userPage"
                                            :widgetInfo="urlPageInfo"
                                            @sonHandleCurrentChange="urlCurrentChange" />

                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>

                    </el-row>

                </el-row>

            </el-main>
            <!-- <el-pagination
     small
     layout="prev, pager, next"
     @current-change="changePage"
     :current-page="pageNo"
     :page-size="pageSize"
     :total="total"></el-pagination> -->

            <ModifyUser
                ref="formModifyUser"
                :form="userObj"
                :loginName="userObj.loginNameValidate"
                :show="formObj.editFormVisible"
                @userPageListener="userPageListener"></ModifyUser>
            <ModifyRoleUser
                ref="formModifyRoleUser"
                :form="userObj"
                :show="formObj.roleFormVisible"
                @userPageListener="userPageListener"></ModifyRoleUser>
            <AddUser :show="formObj.addFormVisible" @userPageListener="userPageListener"></AddUser>
            <RefuseUser
                :show="formObj.refuseFormVisible"
                @userPageListener="userPageListener"
                :userObj="userObj"></RefuseUser>
            <el-dialog
                title="添加权限"
                :visible.sync="addAuthDialogVisible"
                width="25%"
                @close="handleAuthDialogClose('addAuthObj')">
                <el-form
                    :model="authObj"
                    ref="addAuthObj"
                    :rules="authFormRules"
                    label-width="120px">
                    <!-- <el-form-item label="权限编码"><el-input clearable   v-model.trim="authObj.parentId"></el-input></el-form-item> -->

                    <el-form-item label="权限编码" prop="privCode">
                        <el-input clearable v-model.trim="authObj.privCode"></el-input>
                    </el-form-item>
                    <el-form-item label="权限类型" prop="privType">
                        <el-select  v-model.trim="authObj.privType" style="width: 100%;">
                            <el-option label="模块点" value="1">模块点</el-option>
                            <el-option label="功能点" value="2">功能点</el-option>
                        </el-select>
                    
                    </el-form-item>

                    <el-form-item label="权限顺序" prop="privOrder">
                        <el-input clearable   v-model.trim="authObj.privOrder"></el-input>
                    </el-form-item>

                    <el-form-item label="权限名称" prop="privName">
                        <el-input clearable   v-model.trim="authObj.privName"></el-input>
                    </el-form-item>

                    <el-form-item label="所属组件名称" prop="moduleName">
                        <el-input clearable   v-model.trim="authObj.moduleName"></el-input>
                    </el-form-item>

                    <el-form-item label="操作日志key" prop="privLogKey">
                        <el-input clearable   v-model.trim="authObj.privLogKey"></el-input>
                    </el-form-item>

                    <el-form-item label="同步到其他系统" prop="belongSystemCode">
                        <FilterTree
                            ref="addAuth"
                            :inputWidth="24"
                            :inputOffset="0"
                            :check="true"
                            :data="authTreeObj"
                            :defaultProps="{label: 'systemName',children: 'children',isLeaf: 'leaf'}"></FilterTree>
                    </el-form-item>

                </el-form>
                <span slot="footer">
                    <el-button @click="addAuthDialogVisible = false;test;handleAuthDialogClose('addAuthObj')">取 消</el-button>
                    <el-button type="primary" @click="addAuth">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="编辑权限"
                :visible.sync="editAuthDialogVisible"
                width="25%"
                @close="handleAuthDialogClose('editAuthObj')">
                <el-form
                    :model="authObj"
                    ref="editAuthObj"
                    :rules="editAuthFormRules"
                    label-width="120px">
                    <!-- <el-form-item label="权限编码"><el-input clearable   v-model.trim="authObj.parentId"></el-input></el-form-item> -->
                    <el-row>
                        <el-col :span="20" :offset="2">
                            <el-form-item label="权限编码" prop="privCode">
                                <el-input clearable   v-model.trim="authObj.privCode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="权限类型" prop="privType">

                        <el-col :span="20" :offset="2">
                            <el-select  v-model.trim="authObj.privType" style="width:93%">
                                <el-option label="模块点" value="1">模块点</el-option>
                                <el-option label="功能点" value="2">功能点</el-option>
                            </el-select>
                        </el-col>

                    </el-form-item>
                    <el-row>

                    </el-row>

                    <el-row>
                        <el-col :span="20" :offset="2">
                            <el-form-item label="权限顺序" prop="privOrder">
                                <el-input clearable   v-model.trim="authObj.privOrder"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="20" :offset="2">
                            <el-form-item label="权限名称" prop="privName">
                                <el-input clearable   v-model.trim="authObj.privName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="20" :offset="2">
                            <el-form-item label="所属组件名称" prop="moduleName">
                                <el-input clearable   v-model.trim="authObj.moduleName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="20" :offset="2">
                            <el-form-item label="操作日志key" prop="privLogKey">
                                <el-input clearable   v-model.trim="authObj.privLogKey"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer">
                    <el-button @click="editAuthDialogVisible = false;handleAuthDialogClose('editAuthObj')">取 消</el-button>
                    <el-button type="primary" @click="editAuth">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="添加URL"
                :visible.sync="addURLDialogVisible"
                width="30%"
                @close="handleURLDialogClose('addURLObj')">

                <el-form
                    :model="addURLObj"
                    ref="addURLObj"
                    :rules="urlFormRules"
                    label-width="150px">
                    <el-form-item label="控制URL" prop="url">
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-input clearable
                                    type="textarea"
                                    :rows="4"
                                     v-model.trim="addURLObj.url"></el-input>
                            </el-col>

                        </el-row>

                    </el-form-item>
                    <el-form-item label="同步到其他系统">
                        <FilterTree
                            ref="addURLTree"
                            :inputWidth="20"
                            :inputOffset="2"
                            :check="true"
                            :data="addURLObjTree"
                            :defaultProps="{label: 'systemName',children: 'children',isLeaf: 'leaf'}"></FilterTree>
                    </el-form-item>
                </el-form>

                <span slot="footer">
                    <el-button @click="addURLDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addURL">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="编辑URL"
                :visible.sync="editURLDialogVisible"
                width="30%"
                @close="handleURLDialogClose('editURLObj')">

                <el-form
                    :model="editURLObj"
                    ref="editURLObj"
                    :rules="urlFormRules"
                    label-width="150px">
                    <el-form-item label="控制URL" prop="url">
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-input clearable
                                    type="textarea"
                                    :rows="4"
                                     v-model.trim="editURLObj.url"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>

                <span slot="footer">
                    <el-button @click="editURLDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editURL">确 定</el-button>
                </span>
            </el-dialog>
        </el-container>

    </div>
</template>

<script>
import api from "~/config/http";
import Mock from "mockjs";
// import qs from "qs";
import ModifyUser from "~/components/SystemManagement/UserManagement/ModifyUser";
import ModifyRoleUser from "~/components/SystemManagement/UserManagement/ModifyRoleUser";
import AddUser from "~/components/SystemManagement/UserManagement/AddUser";
import RefuseUser from "~/components/SystemManagement/UserManagement/RefuseUser";
import Pagination from "~/components/Pagination"
import FilterTree from "~/components/FilterTree"
import "~/assets/css/style.css";
import "~/assets/css/ggicon.css";
import common from "~/utils/common";

export default {
    components: {
        ModifyUser,
        ModifyRoleUser,
        AddUser,
        RefuseUser,
        Pagination,
        FilterTree
    },

    data() {
        ///upmsUser/queryUserList
        return {
            ACCEPT_URL: "/user/acceptOrRefuse",
            tenantId: "",
            orgCode: "", //组织机构编码
            cloShow: true, //隐藏不显示的列
            userStatus: "0",
            setFlag: true,
            searchUserName: "",
            flag: true,
            firstLevel: false,
            menuVisible: false,
            markFloat: 1,
            iconClass: "el-icon-delete",
            iconCont: "已激活",
            orgObj: "",
            keys: [],
            node: "",

            authListPageInfo: {
                pageNo: 1,
                pageSize: 10,
                total: 1,
            },
            authInfoPageInfo: {
                pageNo: 1,
                pageSize: 6,
                total: 1,
            },
            urlPageInfo: {
                pageNo: 1,
                pageSize: 6,
                total: 1,
            },
            islock: true,

            systems: [],
            // 记录手风琴和tree的对应index关系 systemCode,index 形式
            systemsLoadedMap: new Map(),
            systemCode: 'fire',
            systemObj: {

            },
            operateAuth: {
                edit: true,
                logoff: true,
                locked: false,
                actived: true,
                role: true,
                reset: true,
                restore: false,
                accept: false,
                refuse: false
            },
            activeName: 'auth',
            formObj: {
                addFormVisible: false,
                editFormVisible: false,
                roleFormVisible: false,
                refuseFormVisible: false
            },
            authTreeObj: [],
            authObj: {
                parentId: '',
                systemCode: '',
                belongSystemCode: '',
                privCode: '',
                privType: '',
                privOrder: '',
                privName: '',
                moduleName: '',
                privLogKey: '',
                init() {
                    this.parentId = ''
                    this.systemCode =
                        this.belongSystemCode = ''
                    this.privCode = ''
                    this.privType = ''
                    this.privOrder = ''
                    this.privName = ''
                    this.moduleName = ''
                    this.privLogKey = ''
                },
            },
            currentAuthObj: {
                parentId: '',
                systemCode: '',
                belongSystemCode: '',
                privCode: '',
                privType: '',
                privOrder: '',
                privName: '',
                moduleName: '',
                privLogKey: '',
            },
            addAuthBtnVisible: true,
            modulesVisible: {
                systemTableVisble: true,
                childSystemTableVisble: false,
            },
            activeTab: 'first',
            editAuthDialogVisible: false,
            addAuthDialogVisible: false,
            addURLDialogVisible: false,
            editURLDialogVisible: false,
            userObj: {
                loginNameValidate: "",
                username: "",
                newPassword: "",
                validatePassword: "",
                name: "",
                sex: "",
                phone: "",
                mobile: "",
                email: ""
            },
            addURLObj: {
                url: '',
                urlId: '',
            },
            editURLObj: {
                url: '',
                urlId: '',
            },
            addURLObjTree: [],
            editURLObjTree: [],
            defaultProps: {
                children: "children",
                label: "label"
            },
            authFormRules: {
                privCode: [{
                    required: true,
                    message: '权限编码必填',
                    trigger: 'blur',
                }],
                privType: [{
                    required: true,
                    message: '权限类型必填',
                    trigger: 'change',
                }],
                privName: [{
                    required: true,
                    message: '权限名称必填',
                    trigger: 'blur',
                }],
                moduleName: [{
                    required: true,
                    message: '所属组件名称必填',
                    trigger: 'blur',
                }],
            },
            editAuthFormRules: {
                privCode: [{
                    required: true,
                    message: '权限编码必填',
                    trigger: 'blur',
                }],
                privType: [{
                    required: true,
                    message: '权限类型必填',
                    trigger: 'change',
                }],
                privName: [{
                    required: true,
                    message: '权限名称必填',
                    trigger: 'blur',
                }],
                moduleName: [{
                    required: true,
                    message: '所属组件名称必填',
                    trigger: 'blur',
                }],
            },
            urlFormRules: {
                url: [{
                    required: true,
                    message: 'URL必填',
                    trigger: 'blur',
                }]
            },
            systemTableData: [],
            authTableData: [],
            controlUrlTableData: [],
            tempTreeData: [],
        };
    },

    mounted() {
        this.initTree();
    },

    methods: {
        async initTree() {
            let result = await api.post(api.forent_url.url + "/system/all.mvc")
            let systems = result.data;
            if (result.code === 'success') {

                for (var i = 0; i < systems.length; i++) {
                    if (i == 0) {
                        let {
                            code,
                            data
                        } = await this.getPrivTreeData({
                            systemCode: systems[i].systemCode
                        })
                        if (code == 'succses') {
                            systems[i].tree = common.formatJSONTreeData(data, "children", "privId", "parentId");
                        }
                    } else {
                        // 懒加载后续tree
                        systems[i].tree = [];
                    }
                    this.systemsLoadedMap.set(systems[i].systemCode, i);

                }
                this.systems = systems;

            }

            // api
            //     .post(api.forent_url.url + "/roleGroup/roleGroupListBySysCode.mvc", {
            //         systemCode: "transformers"
            //     })
            //     .then(res => {
            //         this.tree.transFormer = res.data;
            //     });

            // api
            //     .post(api.forent_url.url + "/roleGroup/roleGroupListBySysCode.mvc", {
            //         systemCode: "fire"
            //     })
            //     .then(res => {
            //         this.tree.fire = res.data;
            //     });
        },
        //监听总函数
        userPageListener(name, data) {
            if ((name = "ModifyUser")) {
                this.formObj.editFormVisible = false;
            }
            if ((name = "ModifyRoleUser")) {
                this.formObj.roleFormVisible = false;
            }
            if ((name = "AddUser")) {
                this.formObj.addFormVisible = false;
            }
            if ((name = "RefuseUser")) {
                this.formObj.refuseFormVisible = false;
            }
        },

        addUpdate(name, orgObj, rowObj) {
            if (JSON.stringify(this.orgObj) == "{}") {
                this.$message({
                    type: "warning",
                    message: "请先选择组织机构!"
                });
            } else {
                var params = {};
                if (rowObj) {
                    params = {
                        orgObj: orgObj,
                        rowObj: rowObj ? rowObj : null
                    };
                } else {
                    params = {
                        orgObj: orgObj
                    };
                }
                this.$router.push({
                    name: name,
                    params: params
                });
            }
        },

        handleEdit(name, orgObj, index, row) {},

        handleDelete(index, row) {

            this.$confirm("确认注销该用户吗?", "提示信息", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    let params = {
                        tenantId: this.tenantId,
                        userIds: row.userId
                    };
                    api.post(api.ajaxUrl + "/upmsUser/deleteUser", params).then(res => {
                        let data = res.data;
                        if (data.code == "success") {
                            this.getUserList(0);
                            this.$message({
                                type: "success",
                                message: "注销成功!"
                            });
                        } else {
                            this.$message({
                                type: "success",
                                message: "注销失败!"
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },

        handleRestore(name, orgObj, index, row) {},

        handleUserClick(operateType, orgObj, scope) {
            // 判断本次操作是否执行

            var isExcute = false;
            let params = {};

            //
            //
            //
            //

            // 修改
            if (operateType === "addAuth") {
                this.addAuthDialogVisible = true;
                api.post(api.forent_url.url + '/system/querySystemTreeNoSelf.mvc', {
                    systemCode: this.systemCode
                }).then(res => {
                    if (res.code == 'success') {

                        this.authTreeObj = common.formatJSONTreeData(res.data, "children", "systemId", "parentId");
                    }
                })
            }
            if (operateType === "editAuth") {
                // /user/editsave.mvc
                // 执行完毕后确认

                this.editAuthDialogVisible = true;
                this.authObj = common.deepCopy(scope.row);

                this.authObj.$index = scope.$index;
                // api.post(api.forent_url.url + '/system/querySystemTreeNoSelf.mvc', {
                //     systemCode: this.systemCode
                // }).then(res => {
                //     if (res.code == 'success') {

                //         this.authTreeObj = common.formatJSONTreeData(res.data, "children", "systemId", "parentId");
                //     }
                // })

                isExcute = true;
            }

            if (operateType === "deleteAuth") {

                var _this = this;
                this.$confirm("确定要删除该权限吗？", "提示信息", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        api.post(api.forent_url.url + '/priv/valDelete.mvc', {
                            privId: scope.row.privId,
                        }).then(res => {
                            if (res.code == 'success') {
                                api
                                    .post(api.forent_url.url + "/priv/deletePrivByPrivId.mvc", {
                                        privId: scope.row.privId,
                                    })
                                    .then(res => {
                                        if (res.code == 'success') {
                                            this.$message({
                                                type: "success",
                                                message: "删除成功"
                                            });

                                            this.systemTableData.splice(scope.$index, 1);
                                        }
                                    });
                            }
                        })
                    })
                    .catch((a, b) => {
                        this.$message({
                            type: "info",
                            message: "删除失败"
                        });
                    });

                // /user/deleteById.mvc
                isExcute = true;
            }

            if (operateType == "addURL") {
                this.addURLDialogVisible = true;
                api.post(api.forent_url.url + '/system/querySystemTreeNoSelf.mvc', {
                    systemCode: this.systemCode
                }).then(res => {
                    if (res.code == 'success') {

                        this.addURLObjTree = common.formatJSONTreeData(res.data, "children", "systemId", "parentId");
                    }
                })
            }
            if (operateType == "editURL") {
                this.editURLDialogVisible = true;
                this.editURLObj = common.deepCopy(scope.row);
                this.editURLObj.$index = scope.$index;
                // api.post(api.forent_url.url + '/system/querySystemTreeNoSelf.mvc', {
                //     systemCode: this.systemCode
                // }).then(res => {
                //     if (res.code == 'success') {

                //         this.addURLObjTree = common.formatJSONTreeData(res.data, "children", "systemId", "parentId");
                //     }
                // })
            }
            if (operateType == "deleteURL") {
                this.$confirm("确定要删除该URL吗？", "提示信息", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(res => {
                    api.post(api.forent_url.url + '/priv/URL/deleteURLByUrlId.mvc', {
                        urlId: scope.row.urlId,
                    }).then(res => {
                        if (res.code === 'success') {

                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            this.controlUrlTableData.splice(scope.$index, 1);
                        }
                    }).catch(err => {
                        this.$message({
                            message: '删除失败',
                            type: 'warning'
                        })
                    });
                })

            }
            if (!isExcute) {
                return;
            }

            // 删除
            // 还原
            // 重置
            //激活
        },

        handleNodeClick(data, obj, node) {
            this.tenantId = data.tenantId;
            this.orgCode = data.orgCode;
            this.orgObj = data;
            this.flag = true;
            this.markFloat = obj.id;
            this.keys = data.parentCode;
            if (obj.id != 1) {
                this.getUserList(this.userStatus);
            } else {
                this.orgCode = "";
                this.getUserList(this.userStatus);
            }
        },
        handleTabClick(tab) {

            var value = tab.name;
            if (!!value) {
                value == 'auth' ? this.addAuthBtnVisible = true : this.addAuthBtnVisible = false
            }
        },
        async handleSystemTreeNodeClick({
            data,
            obj,
            node
        }) {
            // 隐藏角色组表

            this.currentAuthObj = common.deepCopy(data);
            this.modulesVisible.systemTableVisble = false;
            this.modulesVisible.childSystemTableVisble = true;
            // 系统列表部分
            // api.post(api.forent_url.url + '/priv/list.mvc', {
            //     systemCode: this.systemCode,
            //     privId: data.privId,
            //     pageNo: 1,
            //     pageSize: 20,

            // }).then(res => {
            //     if (res.code == 'success') {

            //         this.systemTableData = res.data.rows;
            //     }
            // })

            let systemRes = await this.getAuthList({
                systemCode: this.systemCode,
                privId: this.currentAuthObj.privId,
                pageNo: 1,
                pageSize: 6,
            })
            if (systemRes.code == 'success') {
                this.authTableData = systemRes.data.rows
            }

            let urlRes = await this.getUrlList({
                systemCode: this.systemCode,
                privId: this.currentAuthObj.privId,
                pageNo: 1,
                pageSize: 6,
            })
            if (urlRes.code == 'success') {
                this.controlUrlTableData = urlRes.data.rows
            }

            // url列表部分
            // api.post(api.forent_url.url + '/priv/URL/list.mvc', {
            //     systemCode: this.systemCode,
            //     privId: data.privId,
            //     pageNo: 1,
            //     pageSize: 20,

            // }).then(res => {
            //     if (res.code == 'success') {

            //         this.controlUrlTableData = res.data.rows;
            //     }
            // })

        },
        // 处理菜单展开事件
        async handleCollapseChange(value) {
            this.modulesVisible.systemTableVisble = true
            this.modulesVisible.childSystemTableVisble = false;
            this.currentAuthObj = '';

            if (!!value) {
                this.systemObj = value;
                let treeIndex = this.systemsLoadedMap.get(value)

                let {
                    code: tree_code,
                    data: tree_data
                } = await this.getPrivTreeData({
                    systemCode: value
                })
                if (tree_code == 'success') {

                    this.systems[treeIndex].tree = common.formatJSONTreeData(tree_data, "children", "privId", "parentId");

                }

                let {
                    code,
                    data
                } = await this.getAuthList({
                    systemCode: this.systemCode,
                    privId: '',
                    pageNo: this.authListPageInfo.pageNo,
                    pageSize: this.authListPageInfo.pageSize
                })

                if (code == 'success') {

                    this.systemTableData = data.rows;
                }
            }
        },
        hanleContextmenu(event, obj, node, self) {
            this.menuVisible = true;
            this.firstLevel = node.level === 1 ? false : true;
            let menu = document.querySelector("#menu");
            menu.style.left = event.clientX + 20 + "px";
            menu.style.top = event.clientY - 60 + "px";

            this.orgCode = obj.orgCode;
            this.keys = obj.parentCode;
            this.orgObj = obj;
            this.node = node;
        },
        async authListCurrentChange(pageInfo) {
            // 处理分页信息并赋值
            this.authListPageInfo.pageSize = pageInfo.pageSize ?
                parseInt(pageInfo.pageSize) :
                this.authListPageInfo.pageSize;
            this.authListPageInfo.pageNo = pageInfo.pageNo ?
                parseInt(pageInfo.pageNo) :
                this.authListPageInfo.pageNo;
            //重新加载列表
            let {
                code,
                data
            } = await this.getAuthList({
                systemCode: this.systemCode,
                privId: '',
                pageNo: this.authListPageInfo.pageNo,
                pageSize: this.authListPageInfo.pageSize
            })

            if (code == 'success') {

                this.systemTableData = data.rows;
            }
        },
        async authInfoCurrentChange(pageInfo) {
            // 处理分页信息并赋值
            this.authInfoPageInfo.pageSize = pageInfo.pageSize ?
                parseInt(pageInfo.pageSize) :
                this.authInfoPageInfo.pageSize;
            this.authInfoPageInfo.pageNo = pageInfo.pageNo ?
                parseInt(pageInfo.pageNo) :
                this.authInfoPageInfo.pageNo;
            //重新加载列表
            // this.getUserList(this.userStatus);
            // this.getData();
            // this.getRoleGroupList();

            let systemRes = await this.getAuthList({
                systemCode: this.systemCode,
                privId: this.currentAuthObj.privId,
                pageNo: this.authInfoPageInfo.pageNo,
                pageSize: this.authInfoPageInfo.pageSize,
            })
            if (systemRes.code == 'success') {
                this.authTableData = systemRes.data.rows
            }
        },
        async urlCurrentChange(pageInfo) {
            // 处理分页信息并赋值
            this.urlPageInfo.pageSize = pageInfo.pageSize ?
                parseInt(pageInfo.pageSize) :
                this.urlPageInfo.pageSize;
            this.urlPageInfo.pageNo = pageInfo.pageNo ?
                parseInt(pageInfo.pageNo) :
                this.urlPageInfo.pageNo;
            //重新加载列表
            let urlRes = await this.getUrlList({
                systemCode: this.systemCode,
                privId: this.currentAuthObj.privId,
                pageNo: this.urlPageInfo.pageNo,
                pageSize: this.urlPageInfo.pageSize,
            })
            if (urlRes.code == 'success') {
                this.controlUrlTableData = urlRes.data.rows
            }
        },

        removeTree(node, data) {

            //  const parent = node.parent;
            // const children = parent.data.children || parent.data;
            // const index = children.findIndex(d => d.id === data.id);
            // children.splice(index, 1);

        },

        closeBox() {
            this.menuVisible = false;
        },

        changeIcon(index, row) {
            // this.$refs.table
            this.islock = !this.islock;
            if (this.islock) {
                this.iconClass = "el-icon-delete";
                this.iconCont = "已激活";
                row.status = 0;
            } else {
                this.iconClass = "el-icon-edit";
                this.iconCont = "已锁定";
                row.status = 1;
            }
            this.$message({
                type: "success",
                message: "操作成功!"
            });
        },

        classIconLock(scope) {

            if (this.formatIsLock(scope.row) == '已激活') {
                return 'cloud-unlocked icon-l-new l-icons'
            } else if (this.formatIsLock(scope.row) == '已锁定') {
                return 'cloud-locked icon-l-new l-icons'
            }
        },

        formatIsLock(value) {
            var isLock = value.isLock;
            if (isLock == '' || isLock == null || isLock == 'false') {
                return '已激活'
            } else {
                return '已锁定';
            }
        },
        privTypeFormatter(value) {

            return value.privType == '1' ? '模块点' : '功能点';
        },
        formatRole(row) {
            return '1'
        },
        testT: function () {
            // this.$nextTick(function () {
            //     if (this.markFloat == 1) {
            //         
            //         document.getElementsByClassName('el-tree-node')[0].classList.add('is-current');
            //         this.orgCode = "";
            //         this.getUserList(this.userStatus);
            //     } else {
            //         
            //         document.getElementsByClassName('el-tree-node')[0].classList.remove('is-current');
            //     }
            // })
        },
        async addAuth() {
            this.$refs['addAuthObj'].validate(async (valid) => {
                if (valid) {
                    let checked = this.$refs['addAuth'].$refs['filter-tree'].getCheckedNodes();
                    let checkedIds = [];
                    for (let i = 0; i < checked.length; i++) {
                        checkedIds.push(checked[i].systemId);

                    }
                    let {
                        code,
                        data
                    } = await api.post(api.forent_url.url + '/priv/save.mvc', {
                        parentId: this.currentAuthObj.privId || '-1',
                        privId: this.authObj.privId,
                        systemCode: this.systemCode,
                        belongSystemCode: checkedIds.join(','),
                        privCode: this.authObj.privCode,
                        privType: this.authObj.privType,
                        privOrder: this.authObj.privOrder,
                        privName: this.authObj.privName,
                        moduleName: this.authObj.moduleName,
                        privLogKey: this.authObj.privLogKey,
                    })
                    if (code == 'success') {

                        this.$message({
                            message: '创建成功',
                            type: 'success',
                        })
                    } else {
                        this.$message({
                            message: '创建失败',
                            type: 'warning',
                        })
                    }
                    // this.authObj.init();
                    this.$refs['addAuthObj'].resetFields();
                    this.addAuthDialogVisible = false;
                }
            });

        },
        async editAuth() {
            // let checked = this.$refs['addAuth'].$refs['filter-tree'].getCheckedNodes();
            // let checkedIds = [];
            // for (let i = 0; i < checked.length; i++) {
            //     checkedIds.push(checked[i].systemId);

            // }
            this.$refs['editAuthObj'].validate(async (valid) => {
                if (valid) {
                    let {
                        code,
                        data
                    } = await api.post(api.forent_url.url + '/priv/save.mvc', {
                        parentId: this.systemObj.systemId,
                        privId: this.authObj.privId,
                        systemCode: this.systemCode,
                        belongSystemCode: '',
                        privCode: this.authObj.privCode,
                        privType: this.authObj.privType,
                        privOrder: this.authObj.privOrder,
                        privName: this.authObj.privName,
                        moduleName: this.authObj.moduleName,
                        privLogKey: this.authObj.privLogKey,
                    })
                    if (code == 'success') {

                        this.$message({
                            message: '修改成功',
                            type: 'success',
                        })
                    } else {
                        this.$message({
                            message: '修改失败',
                            type: 'warning',
                        })
                    }
                    // this.authObj.init();
                    this.$refs['editAuthObj'].resetFields();
                    this.editAuthDialogVisible = false;
                }
            })

        },
        async addURL() {
            this.$refs['addURLObj'].validate(async (valid) => {
                if (valid) {
                    let checked = this.$refs['addURLTree'].$refs['filter-tree'].getCheckedNodes();
                    let checkedIds = [];
                    for (let i = 0; i < checked.length; i++) {
                        checkedIds.push(checked[i].systemId);

                    }
                    let {
                        code,
                        data
                    } = await api.post(api.forent_url.url + '/priv/URL/save.mvc', {
                        privId: this.currentAuthObj.privId,
                        belongSystemCode: checkedIds.join(','),
                        urlId: this.addURLObj.urlId || '',
                        url: this.addURLObj.url || '',
                    })
                    if (code == 'success') {

                        this.$message({
                            message: '修改成功',
                            type: 'success',
                        })
                        this.controlUrlTableData.push(data);

                    } else {
                        this.$message({
                            message: '修改失败',
                            type: 'warning',
                        })
                    }
                    // this.authObj.init();
                    this.addURLDialogVisible = false;
                }
            })

        },
        async editURL() {
            this.$refs['editURLObj'].validate(async (valid) => {
                if (valid) {
                    let {
                        code,
                        data
                    } = await api.post(api.forent_url.url + '/priv/URL/save.mvc', {
                        privId: this.currentAuthObj.privId || '',
                        belongSystemCode: '',
                        urlId: this.editURLObj.urlId || '',
                        url: this.editURLObj.url || '',
                    })
                    if (code == 'success') {

                        this.$message({
                            message: '修改成功',
                            type: 'success',
                        })
                        this.controlUrlTableData[this.editURLObj.$index] = data;

                    } else {
                        this.$message({
                            message: '修改失败',
                            type: 'warning',
                        })
                    }
                    // this.authObj.init();
                    this.addURLDialogVisible = false;
                }
            })

        },
        handleAuthDialogClose(refName) {

            // this.authObj.parentId = ''
            // this.authObj.systemCode =
            //     this.authObj.belongSystemCode = ''
            // this.authObj.privCode = ''
            // this.authObj.privType = ''
            // this.authObj.privOrder = ''
            // this.authObj.privName = ''
            // this.authObj.moduleName = ''
            // this.authObj.privLogKey = ''
            this.$refs[refName].clearValidate();
            this.$refs[refName].resetFields();

        },
        handleURLDialogClose(refName) {
            this.$refs[refName].clearValidate();
            this.$refs[refName].resetFields();

        },
        test() {

        },
        async getUrlList(obj) {
            let params = {
                systemCode: obj.systemCode,
                privId: obj.privId,
                pageNo: obj.pageNo,
                pageSize: obj.pageSize,
            }
            let res = await api.post(api.forent_url.url + '/priv/URL/list.mvc', params)
            if (res.code != 'success') {
                this.$message({
                    message: '请求失败',
                    type: 'warn',
                })
            }
            return res
        },
        async getAuthInfo(obj) {
            let params = {
                systemCode: obj.systemCode,
                privId: obj.privId,
                pageNo: obj.pageNo,
                pageSize: obj.pageSize,
            }
            let res = await api.post(api.forent_url.url + '/priv/list.mvc', params)
            if (res.code != 'success') {
                this.$message({
                    message: '请求失败',
                    type: 'warn',
                })
            }
            return res
        },
        async getAuthList(obj) {
            let params = {
                systemCode: obj.systemCode || '',
                privId: obj.privId || '',
                pageNo: obj.pageNo || 1,
                pageSize: obj.pageSize || 6,
            }
            let res = await api.post(api.forent_url.url + '/priv/list.mvc', params)
            if (res.code != 'success') {
                this.$message({
                    message: '请求失败',
                    type: 'warn',
                })
            }
            return res
        },
        async getPrivTreeData(obj) {
            let res = await api.post(api.forent_url.url + '/priv/privsInSystem.mvc', obj)
            if (res.code != 'success') {
                this.$message({
                    message: res.message,
                    type: 'warning'
                })
            }
            return res;
        }
    },

    watch: {
        tempTreeData: function (newValue, oldValue) {
            if (newValue != oldValue) {
                this.testT();
            }
        },

        orgCode(newValue, oldValue) {

        }
    },
    filters: {

        statusEve: function (row, column, cellValue, index) {

            return (row != 'false') ? "已激活" : "锁定";
        },
    }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/table.scss";

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

        // 手风琴容器
        .el-collapse {
            .el-collapse-item {
                span.title {
                    text-indent: 2em;
                    font-size: 16px;
                    color: #2892e2;
                }
            }
        }

        /* tree容器 */
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

            .authNotab {
                width: 100%;
                overflow-y: auto;
                // height: calc(100vh - 78px - 128px);

                // height: calc(100vh - 78px - 50px - 42px - 90px);
                // 表头表身总高度
                .el-tabs--border-card {
                    box-shadow: none;
                    border: none;
                }

                div:first-child {
                    margin: 0;
                    width: 100%;
                    height: calc(100vh - 78px - 171px);
                    overflow-y: auto;
                }

                .el-pagination {
                    //123
                    position: absolute;
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
