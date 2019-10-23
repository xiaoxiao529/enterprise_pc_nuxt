<template>
    <div class="role-manage">
        <el-container>
            <el-aside width="18vw">
                <div class="closeBox" @click="closeBox()">
                    <!-- <el-collapse
     accordion
     @change="handleCollapseChange"
      v-model.trim="systemCode">
                        <el-collapse-item name="transformers">
                            <template slot="title">
                                <span class="title">业务基础平台</span>
                            </template>
                            <FilterTree
                                refData="transFormer"
                                :data="tree.transFormer"
                                :defaultProps="tree.props"
                                @handleTreeNodeClick="handleTreeNodeClick"></FilterTree>
                        </el-collapse-item>
                        <el-collapse-item name="fire">
                            <template slot="title">
                                <span class="title">企业消防服务平台</span>
                            </template>
                            <FilterTree
                                refData="fire"
                                :data="tree.fire"
                                :defaultProps="tree.props"
                                @handleTreeNodeClick="handleTreeNodeClick"></FilterTree>
                        </el-collapse-item>
                    </el-collapse> -->
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
                                :treeHeight="200"
                                :refData="item.systemCode+'_tree'"
                                :data="item.tree"
                                :defaultProps="{label: 'groupName',children: 'children',isLeaf: 'leaf'}"
                                @handleTreeNodeClick="handleSystemTreeNodeClick"></FilterTree>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-aside>
            <el-main style="width:82vw">
                <el-row class="header">
                    <el-col :span="5" class="title">
                        <span>角色组信息</span>
                    </el-col>
                    <el-col :span="19" class="right">
                        <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-plus"
                            @click="handleTableClick('addRoleGroup','roleGroup')">添加角色组</el-button>
                    </el-col>
                </el-row>
                <!--列表-->
                <el-row class="body">
                    <!-- 角色组信息表 -->
                    <el-scrollbar>
                        <el-row v-if="isRoleInfoShow">
                            <el-col :span="10">角色组名称: {{ roleInfo.groupName }}</el-col>
                            <el-col :span="4">序号: {{ roleInfo.orderNum }}</el-col>
                            <el-col :span="10">
                                <!-- 所属角色组 暂时不清楚字段是什么 -->
                                所属角色组: {{ !!roleInfo.dep?'有':'无' }}
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <div class="roleManageNoTab" v-if="tableVisible.roleGroupTableVisible">
                                    <el-table
                                        ref="table"
                                        :data="roleGroupTableData"
                                        style="width: 100%;min-height:200px;max-height:300px;">
                                        <el-table-column
                                            label="序号"
                                            type="index"
                                            width="200"></el-table-column>
                                        <el-table-column
                                            label="角色组名称"
                                            min-width="380"
                                            prop="groupName"
                                            show-overflow-tooltip></el-table-column>
                                        <el-table-column
                                            min-width="100"
                                            label="操作"
                                            max-width="100">
                                            <template slot-scope="scope">
                                                <el-tooltip
                                                    v-show="operateAuth.edit"
                                                    content="编辑"
                                                    placement="bottom">
                                                    <i
                            @click="handleTableClick('editRoleGroup','roleGroup',orgObj,scope)"
                            class="ggicon-modification icon-l-new l-icons"
                          ></i>
                                                </el-tooltip>
                                                <el-tooltip
                                                    v-show="operateAuth.logoff"
                                                    content="删除"
                                                    placement="bottom">
                                                    <i
                            @click="handleTableClick('deleteRoleGroup','roleGroup',orgObj,scope)"
                            class="ggicon-forbid icon-l-new l-icons"
                          ></i>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <Pagination
                                        class="userPage"
                                        :widgetInfo="roleGroupPageInfo"
                                        @sonHandleCurrentChange="roleGroupCurrentChange" />
                                </div>
                            </el-col>
                        </el-row>

                        <!-- 角色子组信息表 -->
                        <el-row>
                            <el-col :span="24">
                                <div class="roleManageNoTab" v-if="tableVisible.roleGroupChildTableVisible">
                                    <el-row class="header">
                                        <el-col :span="5" class="title">
                                            <span>子组信息</span>
                                        </el-col>
                                    </el-row>
                                    <el-table
                                        ref="table"
                                        :data="roleTableChildData"
                                        style="width: 100%;min-height:200px;max-height:300px;">
                                        <el-table-column
                                            label="序号"
                                            type="index"
                                            width="200"></el-table-column>
                                        <el-table-column
                                            label="角色组名称"
                                            width="380"
                                            prop="belongRoleName"
                                            show-overflow-tooltip></el-table-column>
                                        <el-table-column
                                            label="状态"
                                            prop="isLock"
                                            :formatter="formatIsLock"
                                            min-width="100">
                                            <template slot-scope="scope">
                                                <el-tag :type="formatIsLock(scope.row)=='已激活' ? 'success' : 'danger'" disable-transitions>{{formatIsLock(scope.row)}}</el-tag>
                                            </template>
                                        </el-table-column>

                                        <el-table-column min-width="100" label="操作">
                                            <template slot-scope="scope">
                                                <el-tooltip
                                                    v-show="operateAuth.edit"
                                                    content="编辑"
                                                    placement="bottom">
                                                    <i
                            @click="handleUserClick('editRole',orgObj,scope.row)"
                            class="ggicon-modification icon-l-new l-icons"
                          ></i>
                                                </el-tooltip>

                                                <el-tooltip
                                                    v-show="operateAuth.logoff"
                                                    content="删除"
                                                    placement="bottom">
                                                    <i
                            @click="handleUserClick('deleteRole',orgObj,scope.row)"
                            class="ggicon-forbid icon-l-new l-icons"
                          ></i>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <Pagination
                                        class="userPage"
                                        :widgetInfo="roleGroupChildpageInfo"
                                        @sonHandleCurrentChange="roleGroupChildCurrentChange" />
                                </div>
                            </el-col>
                        </el-row>

                        <!-- 角色信息表 -->
                        <el-row>
                            <el-col :span="24">
                                <div class="roleManageNoTab" v-if="tableVisible.roleTableVisible">
                                    <el-row class="header">
                                        <el-col :span="5" class="title">
                                            <span>包含角色</span>
                                        </el-col>
                                        <el-col :span="19" class="right">
                                            <el-button
                                                size="mini"
                                                type="primary"
                                                icon="el-icon-plus"
                                                @click="handleTableClick('addRole','role')">添加角色</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-table
                                        ref="table"
                                        :data="roleTableData"
                                        style="width: 100%;min-height:200px;max-height:500px;">
                                        <el-table-column
                                            label="序号"
                                            type="index"
                                            width="200"></el-table-column>
                                        <el-table-column
                                            label="角色名称"
                                            min-width="600"
                                            prop="roleName"
                                            show-overflow-tooltip></el-table-column>
                                        <el-table-column min-width="200" label="操作">
                                            <template slot-scope="scope">
                                                <el-tooltip content="菜单" placement="bottom">
                                                    <i
                            @click="handleTableClick('menuConfig','role',orgObj,scope)"
                            class="cloud-menuPic icon-l-new l-icons"
                          ></i>
                                                </el-tooltip>

                                                <el-tooltip content="权限" placement="bottom">
                                                    <i
                            @click="handleTableClick('authConfig','role',orgObj,scope)"
                            class="cloud-userBrsh icon-l-new l-icons"
                          ></i>
                                                </el-tooltip>
                                                <el-tooltip content="编辑" placement="bottom">
                                                    <i
                            @click="handleTableClick('roleEdit','role',orgObj,scope)"
                            class="cloud-listEdit icon-l-new l-icons"
                          />
                                                </el-tooltip>

                                                <el-tooltip content="删除" placement="bottom">
                                                    <i
                            @click="handleTableClick('roleDelete','role',orgObj,scope)"
                            class="cloud-trash icon-l-new l-icons"
                          ></i>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <Pagination
                                        class="userPage"
                                        :widgetInfo="rolePageInfo"
                                        @sonHandleCurrentChange="roleCurrentChange" />
                                </div>
                            </el-col>
                        </el-row>
                    </el-scrollbar>
                </el-row>
            </el-main>

            <!-- 编辑角色组信息 -->
            <el-dialog
                title="编辑角色组信息"
                ref="editRoleGroup"
                :visible.sync="dialogVisible.editRoleGroupVisible"
                width="20%"
                @close="handleCloseDialog">
                <el-form
                    :model="roleGroupObj"
                    ref="editRoleGroupForm"
                    :rules="editRoleGroupFormRules"
                    label-width="100px">
                    <el-form-item label="角色组名称" prop="groupName">
                        <el-col :span="20" :offset="2">
                            <el-input clearable   v-model.trim="roleGroupObj.groupName"></el-input>
                        </el-col>

                    </el-form-item>
                    <el-form-item label="序号" prop="orderNum">
                        <el-col :span="20" :offset="2">
                            <el-input clearable   v-model.trim="roleGroupObj.orderNum"></el-input>
                        </el-col>

                    </el-form-item>
                </el-form>
                <span slot="footer">
          <el-button @click="dialogVisible.editRoleGroupVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRoleGroup('editRoleGroupForm')">确 定</el-button>
        </span>
            </el-dialog>

            <el-dialog
                title="新增角色组信息"
                ref="addRoleGroup"
                :visible.sync="dialogVisible.addRoleGroupVisible"
                width="20%"
                @close="handleCloseDialog">
                <el-form
                    :model="roleGroupObj"
                    ref="addRoleGroupForm"
                    :rules="addRoleGroupFormRules"
                    label-width="100px">
                    <el-form-item label="角色组名称" prop="groupName">
                        <el-col :span="20">
                            <el-input clearable   v-model.trim="roleGroupObj.groupName"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="序号" prop="orderNum">
                        <el-col :span="20">
                            <el-input clearable   v-model.trim="roleGroupObj.orderNum"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <span slot="footer">
          <el-button @click="dialogVisible.addRoleGroupVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRoleGroup('addRoleGroupForm')">确 定</el-button>
        </span>
            </el-dialog>

            <el-dialog
                title="添加角色"
                ref="addRole"
                :visible.sync="dialogVisible.addRoleVisible"
                width="20%"
                @close="handleCloseDialog">
                <el-form
                    :model="roleObj"
                    ref="addRoleForm"
                    :rules="addRoleFormRules"
                    label-width="100px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-col :span="20">
                            <el-input clearable   v-model.trim="roleObj.roleName" prop="roleName"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="序号" prop="orderNum">
                        <el-col :span="20">
                            <el-input clearable   v-model.trim="roleObj.orderNum" prop="orderNum"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <span slot="footer">
          <el-button @click="dialogVisible.addRoleVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole('addRoleForm')">确 定</el-button>
        </span>
            </el-dialog>

            <el-dialog
                title="菜单配置"
                ref="menuConfig"
                :visible.sync="dialogVisible.roleMenuVisible"
                width="20%"
                @close="handleCloseDialog">
                <el-row>
                    <el-col :span="24" style="">
                        <FilterTree
                            :setCheckedKeys="true"
                            ref="menuTree"
                            :check="true"
                            :data="tree.menu"
                            :nodeKeyName="'menuId'"
                            :checkedArray="tree.menuChecked"
                            :defaultProps="{label:'menuName',children:'children'}"></FilterTree>
                    </el-col>
                </el-row>

                <span slot="footer">
          <el-button @click="dialogVisible.roleMenuVisible = false">取 消</el-button>
          <el-button type="primary" @click="cofingRoleMenu">确 定</el-button>
        </span>
            </el-dialog>

            <el-dialog
                title="权限配置"
                ref="authConfig"
                :visible.sync="dialogVisible.roleAuthVisible"
                width="20%"
                @close="handleCloseDialog">
                <el-scrollbar wrap-style="color:red">
                    <FilterTree
                        :setCheckedKeys="true"
                        ref="authTree"
                        :data="tree.auth"
                        :check="true"
                        :nodeKeyName="'privId'"
                        :checkedArray="tree.authChecked"
                        :defaultProps="{label:'privName',children:'children',isLeaf:'leaf'}"></FilterTree>
                </el-scrollbar>

                <span slot="footer">
          <el-button @click="dialogVisible.roleAuthVisible = false">取 消</el-button>
          <el-button type="primary" @click="configRoleAuth">确 定</el-button>
        </span>
            </el-dialog>

            <el-dialog
                title="编辑角色"
                ref="editRole"
                :visible.sync="dialogVisible.editRoleVisible"
                width="20%"
                @close="handleCloseDialog">
                <el-form
                    :model="roleObj"
                    ref="editRoleForm"
                    :rules="editRoleFormRules"
                    label-width="100px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-col :span="20">
                            <el-input clearable   v-model.trim="roleObj.roleName"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="序号" prop="orderNum">
                        <el-col :span="20">
                            <el-input clearable   v-model.trim="roleObj.orderNum"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <span slot="footer">
          <el-button @click="dialogVisible.editRoleVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRole('editRoleForm')">确 定</el-button>
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
import Pagination from "~/components/Pagination";
import FilterTree from "~/components/FilterTree";

import AddRole from "~/components/AuthManage/AddRole";
import AddRoleGroup from "~/components/AuthManage/AddRoleGroup";
import AuthConfig from "~/components/AuthManage/AuthConfig";
import EditRole from "~/components/AuthManage/EditRole";
import MenuConfig from "~/components/AuthManage/MenuConfig";
import common from "~/utils/common";
import "~/assets/css/style.css";
import "~/assets/css/ggicon.css";

export default {
    components: {
        ModifyUser,
        ModifyRoleUser,
        AddUser,
        RefuseUser,
        Pagination,
        FilterTree,
        AddRole
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
            roleInfo: "",
            currentRole: "",
            isRoleInfoShow: false,
            roleGroupPageInfo: {
                pageNo: 1,
                pageSize: 20,
                total: 1
            },
            roleGroupChildpageInfo: {
                pageNo: 1,
                pageSize: 20,
                total: 1
            },
            rolePageInfo: {
                pageNo: 1,
                pageSize: 20,
                total: 1
            },
            systemCode: "fire",
            systems: [],
            // 记录手风琴和tree的对应index关系 systemCode,index 形式
            systemsLoadedMap: new Map(),
            filterTransformerText: "",
            filterFireText: "",
            tree: {
                transFormer: [],
                fire: [],
                auth: [],
                authChecked: [],
                menu: [],
                menuChecked: [],
                props: {
                    label: "groupName",
                    children: "children",
                    isLeaf: "leaf"
                },
                //初始化权限选中状态方法
                initAuthChecked() {
                    this.authChecked = [];
                },
                // 初始化菜单选中状态方法
                initMenuChecked() {
                    this.menuChecked = [];
                }
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

            //组件状态
            // form: {
            //     editRoleGroupVisible:false,

            // },

            roleGroupObj: {
                groupId: "",
                groupName: "",
                orderNum: "",
                parentId: "",
                systemCode: "",
                tenantId: "",
            },
            roleGroupChildObj: "",
            roleObj: {
                roleName: '',
                roleId: '',
                orderNum: '',
            },
            tableVisible: {
                // 角色组信息表可见性
                roleGroupTableVisible: true,
                // 角色组子组信息表可见性
                roleGroupChildTableVisible: false,
                // 角色信息表可见性
                roleTableVisible: false
            },
            dialogVisible: {
                addRoleGroupVisible: false,
                editRoleGroupVisible: false,
                addRoleVisible: false,
                roleMenuVisible: false,
                roleAuthVisible: false,
                editRoleVisible: false
            },

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

            editMenu: "",

            addRoleGroupFormRules: {
                groupName: {
                    required: true,
                    message: '该项不可为空',
                    trigger: 'blur'
                },
                orderNum: {
                    required: true,
                    message: '该项不可为空',
                    trigger: 'blur'
                },
            },
            editRoleGroupFormRules: {
                groupName: {
                    required: true,
                    message: '该项不可为空',
                    trigger: 'blur'
                },
                orderNum: {
                    required: true,
                    message: '该项不可为空',
                    trigger: 'blur'
                },
            },

            addRoleFormRules: {
                roleName: {
                    required: true,
                    message: '该项不可为空',
                    trigger: 'blur'
                },
                orderNum: {
                    required: true,
                    message: '该项不可为空',
                    trigger: 'blur'
                },
            },
            editRoleFormRules: {
                roleName: {
                    required: true,
                    message: '该项不可为空',
                    trigger: 'blur'
                },
                orderNum: {
                    required: true,
                    message: '该项不可为空',
                    trigger: 'blur'
                },
            },

            props: {
                label: "orgName",
                children: "children",
                isLeaf: "leaf"
            },

            defaultProps: {
                children: "children",
                label: "label"
            },
            // 角色组表
            roleGroupTableData: [],
            // 角色子表
            roleTableChildData: [],
            // 角色表
            roleTableData: [],

            tempTreeData: []
        };
    },

    mounted() {
        this.getRoleGroupList();

        this.InitTree();
    },

    methods: {
        async InitTree() {
            let result = await api.post(api.forent_url.url + "/system/all.mvc")
            let systems = result.data;
            if (result.code === 'success') {
                for (var i = 0; i < systems.length; i++) {
                    if (i == 0) {
                        let {
                            data
                        } = await api.post(api.forent_url.url + '/roleGroup/roleGroupListBySysCode.mvc', {
                            systemCode: systems[i].systemCode
                        })
                        systems[i].tree = common.formatJSONTreeData(data, "children", "groupId", "parentId");
                    } else {
                        systems[i].tree = [];

                    }
                    this.systemsLoadedMap.set(systems[i].systemCode, i)

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
            if ((name = "AddRole")) {
                this.dialogVisible.addRoleVisible = false;
            }
        },

        handleTableClick(operateType, tableType, orgObj, scope) {
            // 判断本次操作是否执行

            var isExcute = false;
            let params = {};
            if (tableType === "roleGroup") {
                if (operateType === "addRoleGroup") {
                    this.dialogVisible.addRoleGroupVisible = true;
                }
                if (operateType === "editRoleGroup") {
                    this.dialogVisible.editRoleGroupVisible = true;
                    this.roleGroupObj = common.deepCopy(scope.row);
                    this.roleGroupObj.index = scope.$index;
                }
                if (operateType === "deleteRoleGroup") {
                    var index = scope.$index;
                    var groupId = scope.row.groupId;
                    this.$confirm("确定删除此角色组么?", "提示").then(res => {
                        let params = {
                            groupId: groupId
                        };
                        api
                            .post(
                                api.forent_url.url + "/roleGroup/deleteJudgeByRoleGroupId.mvc",
                                params,
                                3000
                            )
                            .then(res => {
                                if (res.data === "true") {
                                    api
                                        .post(
                                            api.forent_url.url +
                                            "/roleGroup/delRoleGroupByGroupId.mvc",
                                            params,
                                            3000
                                        )
                                        .then(res => {
                                            if (res.code === "success") {
                                                this.$message({
                                                    message: "删除成功",
                                                    type: "success"
                                                });
                                                this.roleGroupTableData.splice(index, 1);
                                            }
                                        })
                                        .catch(err => {
                                            this.$message({
                                                message: "操作超时",
                                                type: "warning"
                                            });
                                        });
                                }
                            })
                            .catch(err => {
                                this.$message({
                                    message: "操作超时",
                                    type: "warning"
                                });
                            });
                    });
                }
            }
            if (tableType === "roleGroupChild") {}
            if (tableType == "role") {
                if (operateType === "addRole") {
                    this.dialogVisible.addRoleVisible = true;
                    this.roleObj.groupId = this.roleInfo.groupId;
                }
                if (operateType === "menuConfig") {
                    this.dialogVisible.roleMenuVisible = true;

                    // 获取菜单树数据
                    this.tree.menu = [];
                    this.tree.initMenuChecked();
                    api
                        .post(api.forent_url.url + "/menu/menuListBySysCode.mvc", {
                            systemCode: this.systemCode
                        })
                        .then(res => {
                            if (res.code === "success") {
                                this.tree.menu = common.formatJSONTreeData(
                                    res.data,
                                    "children",
                                    "menuId",
                                    "parentId"
                                );
                                
                                this.$nextTick(function () {
                                    api
                                        .post(api.forent_url.url + "/role/menuIdsRefRole.mvc", {
                                            roleId: scope.row.roleId
                                        })
                                        .then(res => {
                                            if (res.code === "success") {
                                                this.tree.menuChecked = res.data;
                                            }
                                        });
                                });
                            }
                        });
                    // 菜单配置树回显
                }
                if (operateType === "authConfig") {
                    this.dialogVisible.roleAuthVisible = true;

                    this.tree.initAuthChecked();
                    this.roleObj = scope.row;

                    api
                        .post(api.forent_url.url + "/priv/privsInSystem.mvc", {
                            systemCode: this.systemCode
                        })
                        .then(res => {
                            if (res.code === "success") {
                                this.tree.auth = common.formatJSONTreeData(
                                    res.data,
                                    "children",
                                    "privId",
                                    "parentId"
                                );
                                // 选中状态回显示

                                api
                                    .post(api.forent_url.url + "/role/privIdsRefRole.mvc", {
                                        roleId: scope.row.roleId
                                    })
                                    .then(res => {

                                        this.tree.authChecked = res.data;
                                    });
                            }
                        });
                }
                if (operateType === "roleEdit") {
                    
                    this.roleTableData[scope.$index]
                    this.dialogVisible.editRoleVisible = true;
                    
                    this.roleObj = common.deepCopy(scope.row);
                    
                    this.roleObj.index = scope.$index;
                    
                }
                if (operateType === "roleDelete") {
                    this.$confirm("确定删除角色", "提示").then(res => {
                        // 执行

                        // 查询角色关系
                        api
                            .post(
                                api.forent_url.url + "/role/judgeMenuRel.mvc", {
                                    roleId: scope.row.roleId
                                }
                            )
                            .then(res => {
                                if (res.code === "success") {
                                    // 查询角色权限关联
                                    api
                                        .post(
                                            api.forent_url.url + "/role/judgePrivRef.mvc", {
                                                roleId: scope.row.roleId
                                            }
                                        )
                                        .then(res => {
                                            if (res.code === "success") {
                                                // 查询用户引用关联
                                                api
                                                    .post(
                                                        api.forent_url.url + "/role/judgeUserRef.mvc", {
                                                            roleId: scope.row.roleId
                                                        }
                                                    )
                                                    .then(res => {
                                                        if (res.code === "success") {
                                                            // 执行删除操作
                                                            api
                                                                .post(
                                                                    api.forent_url.url + "/role/delete.mvc", {
                                                                        roleId: scope.row.roleId
                                                                    }
                                                                )
                                                                .then(res => {
                                                                    if (res.code === "success") {
                                                                        this.$message({
                                                                            message: '删除成功',
                                                                            type: 'success',
                                                                        })

                                                                        this.roleTableData.splice(scope.$index, 1);
                                                                    }
                                                                })
                                                                .catch(err => {
                                                                    this.$message({
                                                                        message: '删除失败',
                                                                        type: 'warning',
                                                                    })
                                                                });
                                                        }
                                                    })
                                                    .catch(err => {
                                                        this.$message({
                                                            message: err.message,
                                                            type: 'warning',
                                                        });
                                                    });
                                            }
                                        })
                                        .catch(err => {
                                            this.$message({
                                                message: err.message,
                                                type: 'warning',
                                            });
                                        });
                                }
                            })
                            .catch(err => {
                                this.$message({
                                    message: err.message,
                                    type: 'warning',
                                });
                            });
                    });
                }
            }
        },

        // 处理菜单展开事件
        async handleCollapseChange(value) {
            
            
            this.tableVisible.roleGroupTableVisible = true;
            this.tableVisible.roleGroupChildTableVisible = false;
            this.tableVisible.roleTableVisible = false;

            this.isRoleInfoShow = false;

            if (!!value) {
                this.systemCode = value;
                let treeIndex = this.systemsLoadedMap.get(value)
                let {
                    code,
                    data
                } = await this.getRoleGroupTreeData({
                    systemCode: value
                });

                if (code == 'success') {
                    this.systems[treeIndex].tree = common.formatJSONTreeData(data, "children", "groupId", "parentId")
                }
                this.getRoleGroupList();
            }
        },
        // 处理input框回车搜索事件

        // 树监听事件

        handleCloseDialog(refName) {
            if (!!this.$refs[refName]) {
                this.$refs[refName].resetFiled();
            } else {}
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
        // 过滤树监听事件
        handleTreeNodeClick({
            data,
            obj,
            node
        }) {
            // 隐藏角色组表

            this.$nextTick(function () {
                this.roleInfo = data;
            });
        },
        handleSystemTreeNodeClick({
            data,
            obj,
            node
        }) {
            // 隐藏角色组表
            
            
            this.tableVisible.roleGroupTableVisible = false;
            this.tableVisible.roleGroupChildTableVisible = false;
            this.tableVisible.roleTableVisible = true;
            this.isRoleInfoShow = true;

            this.$nextTick(function () {
                this.roleInfo = data;
            });

            //显示子组信息
            ;
            this.currentRole = data;
            
            this.getRoleList({
                parentId: data.groupId,
                systemCode: data.systemCode
            });
        },
        filterNode(value, data) {
            
            
            if (!value) return true;
            return data.orgName.indexOf(value) !== -1;
        },
        roleGroupCurrentChange(pageInfo) {
            // 处理分页信息并赋值
            this.roleGroupPageInfo.pageSize = pageInfo.pageSize ?
                parseInt(pageInfo.pageSize) :
                this.roleGroupPageInfo.pageSize;
            this.roleGroupPageInfo.pageNo = pageInfo.pageNo ?
                parseInt(pageInfo.pageNo) :
                this.roleGroupPageInfo.pageNo;
            //重新加载列表
            // this.getUserList(this.userStatus);
            // this.getData();
            this.getRoleGroupList();
        },
        roleGroupChildCurrentChange(pageInfo) {
            // 处理分页信息并赋值
            this.roleGroupChildPageInfo.pageSize = pageInfo.pageSize ?
                parseInt(pageInfo.pageSize) :
                this.roleGroupChildPageInfo.pageSize;
            this.roleGroupChildPageInfo.pageNo = pageInfo.pageNo ?
                parseInt(pageInfo.pageNo) :
                this.roleGroupChildPageInfo.pageNo;
            //重新加载列表
            // this.getUserList(this.userStatus);
            // this.getData();
            this.getRoleGroupChildList();
        },
        roleCurrentChange(pageInfo) {
            // 处理分页信息并赋值
            this.rolePageInfo.pageSize = pageInfo.pageSize ?
                parseInt(pageInfo.pageSize) :
                this.rolePageInfo.pageSize;
            this.rolePageInfo.pageNo = pageInfo.pageNo ?
                parseInt(pageInfo.pageNo) :
                this.rolePageInfo.pageNo;
            //重新加载列表
            // this.getUserList(this.userStatus);
            // this.getData();
            this.getRoleList({
                systemCode: this.currentRole.systemCode,
                parentId: this.currentRole.groupId,
            });
        },
        orgDel(node, orgObj) {
            this.$confirm("确认删除?", "提示信息", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    let params = {
                        tenantId: orgObj.tenantId,
                        orgId: orgObj.orgId
                    };
                    api.post(api.ajaxUrl + "upmsOrg/deleteOrg", params).then(res => {
                        if (res.data.code == "success") {
                            var inn = 0;
                            for (var i = 0; i < this.tempTreeData.length; i++) {
                                if (
                                    this.tempTreeData[i].tenantId == orgObj.tenantId &&
                                    this.tempTreeData[i].orgId == orgObj.orgId
                                ) {
                                    inn = i;
                                }
                            }
                            this.tempTreeData.splice(inn, 1);
                            this.$refs.tree.updateKeyChildren([this.keys], this.tempTreeData);
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                        } else {
                            this.$message({
                                type: "success",
                                message: "删除失败!"
                            });
                        }
                    });
                })
                .catch(err => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
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

        statusEve: function (row, column, cellValue, index) {
            return row.isLock != "false" ? "已激活" : "锁定";
        },

        //ztree
        async loadNode(node, resolve) {
            var that = this;

            let paramsChild = {
                tenantId: node.level === 0 ? "" : node.data.tenantId,
                parentCode: node.level === 0 ? -1 : node.data.orgCode,
                userName: "",
                orgCode: "AHHF_QHHFY_99999997",
                showFlag: 0,
                flag: ""
            };

            await api
                .post(
                    api.forent_url.url + "/org/allSonOrgListincludeitself.mvc",
                    paramsChild
                )
                .then(res => {
                    if (res.code == "success") {
                        if (!res.data) return;
                        that.tempTreeData = res.data;
                        this.tenantId = res.data[0].tenantId;

                        this.orgCode = res.data[0].orgCode;
                        this.orgObj = res.data[0];

                        return resolve(that.tempTreeData);
                    } else {
                        this.$message({
                            type: "error",
                            message: res.data.message
                        });
                    }
                })
                .catch(err => {
                    this.$message({
                        type: "error",
                        message: "加载失败"
                    });
                });
            // await this.getUserList(this.userStatus);
        },

        getRoleGroupList() {
            let params = {
                pageNo: this.roleGroupPageInfo.pageNo || 1,
                pageSize: this.roleGroupPageInfo.pageSize || 6,
                systemCode: this.systemCode || "transformers",
                parentId: "-1"
            };

            var url = api.forent_url.url;

            return api.post(url + "/roleGroup/list", params).then(res => {
                if (!res.data) {}
                
                this.roleGroupPageInfo.total = res.data.total;
                //过滤原始数据
                // this.formateUserList(res.data.rows);
                this.roleGroupTableData = res.data.rows;
                this.listLoading = false;
            });
        },
        getRoleGroupChildList() {
            let params = {
                pageNo: this.roleGroupPageInfo.pageNo,
                pageSize: this.roleGroupPageInfo.pageSize,
                systemCode: "transformers",
                parentId: ""
            };

            var url = api.forent_url.url;

            return api.post(url + "/roleGroup/list", params).then(res => {
                if (!res.data) {}
                
                this.rolePageInfo.total = res.data.total;
                //过滤原始数据
                // this.formateUserList(res.data.rows);
                this.tableData = res.data.rows;
                this.listLoading = false;
            });
        },
        getRoleList(obj) {
            let params = {
                pageNo: this.rolePageInfo.pageNo,
                pageSize: this.rolePageInfo.pageSize,
                systemCode: obj.systemCode,
                groupId: obj.parentId
            };

            var url = api.forent_url.url;

            api
                .post(url + "/role/list.mvc", params)
                .then(res => {
                    if (res.code == 'success') {
                        
                        this.rolePageInfo.total = res.data.total;
                        //过滤原始数据
                        // this.formateUserList(res.data.rows);
                        this.roleTableData = res.data.rows;

                    }
                    this.listLoading = false;
                    this.$forceUpdate();
                })
                .catch(err => {
                    
                    
                });
        },
        classIconLock(scope) {
            if (this.formatIsLock(scope.row) == "已激活") {
                return "cloud-unlocked icon-l-new l-icons";
            } else if (this.formatIsLock(scope.row) == "已锁定") {
                return "cloud-locked icon-l-new l-icons";
            }
        },
        formatUserData(user) {
            return user;
        },
        formatIsLock(value) {
            var isLock = value.isLock;
            if (isLock == "" || isLock == null || isLock == "false") {
                return "已激活";
            } else {
                return "已锁定";
            }
        },
        formatRole(row) {
            return "1";
        },
        testT: function () {},
        //TODO:列表操作
        editRoleGroup(refName) {
            this.roleGroupObj;

            let params = {
                systemCode: this.roleGroupObj.systemCode || "",
                parentId: this.roleGroupObj.parentId || "",
                groupId: this.roleGroupObj.groupId || "",
                roleId: this.roleGroupObj.roleId || "",
                groupName: this.roleGroupObj.groupName || "",
                orderNum: this.roleGroupObj.orderNum || ""
            };

            api
                .post(
                    api.forent_url.url + "/roleGroup/judgeOrderNumInSystemCode.mvc",
                    params,
                    5000
                )
                .then(res => {
                    if (res.code === "success") {
                        api
                            .post(api.forent_url.url + "/roleGroup/save.mvc", params, 5000)
                            .then(res => {
                                if (res.code === "success") {
                                    this.$message({
                                        type: "success",
                                        message: "修改成功"
                                    });
                                    this.$refs["editRoleGroupForm"].resetFields();
                                    this.dialogVisible.editRoleGroupVisible = false;
                                    
                                    this.roleGroupTableData.splice(this.roleGroupObj.index,1,res.data);
                                }
                            })
                            .catch(err => {
                                this.$message({
                                    type: "warning",
                                    message: "修改失败"
                                });
                            });
                    }
                })
                .catch(err => {
                    this.$message({
                        type: "warning",
                        message: "操作失败"
                    });
                });
        },
        addRoleGroup(refName) {
            let params = {
                systemCode: this.systemCode,
                parentId: "-1",
                groupId: "",
                roleId: "",
                groupName: this.roleGroupObj.groupName,
                orderNum: this.roleGroupObj.orderNum
            };
            api
                .post(api.forent_url.url + "/roleGroup/save", params, 5000)
                .then(res => {
                    if (res.code == "success") {
                        this.$message({
                            message: "创建成功",
                            type: "success"
                        });
                    }
                    this.$refs["addRoleGroupForm"].resetFields();
                    this.dialogVisible.addRoleGroupVisible = false;
                    this.roleGroupTableData.push(this.roleGroupObj);
                })
                .catch(err => {
                    this.$message({
                        message: "创建超时",
                        type: "warning"
                    });
                });
        },
        addRole(refName) {
            // /role/valRoleNameIsExist.mvc
            // /role/valOrderNumIsExist.mvc
            // /role/valRoleNameIsExist.mvc
            // /role/valOrderNumIsExist.mvc
            // /role/save.mvc
            // 同一角色组下角色名称唯一！
            this.$refs[refName].validate(valid => {
                if (valid) {
                    api.post(api.forent_url.url + '/role/valRoleNameIsExist.mvc', {
                        roleName: this.roleObj.roleName,
                        groupId: this.roleObj.groupId,
                    }).then(res => {
                        if (res.code === 'success') {
                            // 同一角色组下角色序号唯一！
                            api.post(api.forent_url.url + '/role/valOrderNumIsExist.mvc', {
                                orderNum: this.roleObj.orderNum,
                                groupId: this.roleObj.groupId,
                            }).then(res => {
                                if (res.code === 'success') {
                                    // 同一角色组下角色名称唯一！
                                    api.post(api.forent_url.url + '/role/valRoleNameIsExist.mvc', {
                                        systemCode: '',
                                        parentId: '',
                                        groupId: this.roleObj.groupId,
                                        roleId: '',
                                        roleName: this.roleObj.roleName,
                                        orderNum: this.roleObj.orderNum,
                                    }).then(res => {
                                        if (res.code === 'success') {
                                            // 同一角色组下角色序号唯一！
                                            api.post(api.forent_url.url + '/role/valOrderNumIsExist.mvc', {
                                                systemCode: '',
                                                parentId: '',
                                                groupId: this.roleObj.groupId,
                                                roleId: '',
                                                roleName: this.roleObj.roleName,
                                                orderNum: this.roleObj.orderNum,
                                            }).then(res => {
                                                if (res.code === 'success') {

                                                    // 保存成功
                                                    api.post(api.forent_url.url + '/role/save.mvc', {
                                                        systemCode: '',
                                                        parentId: '',
                                                        groupId: this.roleObj.groupId,
                                                        roleId: '',
                                                        roleName: this.roleObj.roleName,
                                                        orderNum: this.roleObj.orderNum,
                                                    }).then(res => {
                                                        if (res.code === 'success') {

                                                            this.$message({
                                                                message: '保存成功',
                                                                type: 'success',
                                                            })
                                                            this.roleTableData.push(res.data);
                                                            this.$refs[refName].resetFields();
                                                            this.$refs[refName].clearValidate();
                                                            this.dialogVisible.addRoleVisible = false;
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })

        },
        editRole(refName) {
            this.roleObj;
            this.$refs[refName].validate(valid => {
                if (valid) {
                    api.post(api.forent_url.url + '/role/valRoleNameIsExist.mvc', {
                        systemCode:"",
                        parentId:"",
                        roleId:this.roleObj.roleId,
                        roleName: this.roleObj.roleName,
                        groupId: this.roleObj.groupId,
                        orderNum: this.roleObj.orderNum,
                    }).then(res => {
                        if (res.code === 'success') {
                            // 同一角色组下角色序号唯一！
                            api.post(api.forent_url.url + '/role/valOrderNumIsExist.mvc', {
                                systemCode:"",
                                parentId:"",
                                roleId:this.roleObj.roleId,
                                roleName: this.roleObj.roleName,
                                groupId: this.roleObj.groupId,
                                orderNum: this.roleObj.orderNum,
                            }).then(res => {
                                if (res.code === 'success') {
                                    // 同一角色组下角色名称唯一！
                                    // 保存成功
                                    api.post(api.forent_url.url + '/role/save.mvc', {
                                        systemCode: '',
                                        parentId: '',
                                        groupId: this.roleObj.groupId,
                                        roleId: this.roleObj.roleId,
                                        roleName: this.roleObj.roleName,
                                        orderNum: this.roleObj.orderNum,
                                    }).then(res => {
                                        if (res.code === 'success') {
                                            this.roleTableData.splice(this.roleObj.index,1,res.data);
                                            this.$message({
                                                message: '保存成功',
                                                type: 'success',
                                            })
                                           
                                            
                                            
                                            
                                            this.$refs[refName].resetFields();
                                            this.dialogVisible.editRoleVisible = false;
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        },
        deleteRole(obj) {

        },
        cofingRoleMenu(obj) {
            let checked = this.$refs['menuTree'].$refs['filter-tree'].getCheckedNodes();
            let checkedIds = [];
            for (let i = 0; i < checked.length; i++) {
                checkedIds.push(checked[i].menuId);

            }
            api.post(api.forent_url.url + '/role/saveRoleMenuRel.mvc', {
                systemCode: this.systemCode,
                groupId: this.roleObj.groupId,
                roleId: this.roleObj.roleId,
                emsRoleMenuRels: checkedIds.join(','),
                emsRolePrivRels: '',
            }).then(res => {
                if (res.code === 'success') {
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                    })
                }

            })
            this.dialogVisible.roleMenuVisible = false;

        },
        configRoleAuth(obj) {
            let checked = this.$refs['authTree'].$refs['filter-tree'].getCheckedNodes();
            let checkedIds = [];
            for (let i = 0; i < checked.length; i++) {
                checkedIds.push(checked[i].privId);

            }

            api.post(api.forent_url.url + '/role/saveRolePrivRel.mvc', {
                systemCode: this.systemCode,
                groupId: this.roleObj.groupId,
                roleId: this.roleObj.roleId,
                emsRoleMenuRels: '',
                emsRolePrivRels: checkedIds.join(','),
            }).then(res => {
                if (res.code === 'success') {
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                    })
                }

            })
            this.dialogVisible.roleAuthVisible = false;
        },
        async getRoleGroupTreeData(obj) {
            let res = await api.post(api.forent_url.url + '/roleGroup/roleGroupListBySysCode.mvc', obj)
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
        filterText(val) {
            this.$refs.tree1.filter(val);
        },

        orgCode(newValue, oldValue) {},
        filterTransformerText(val) {
            this.$refs.tree1.filter(val);
        },
        filterFireText(val) {
            this.$refs.tree1.filter(val);
        }
    },
    filters: {
        statusEve: function (row, column, cellValue, index) {
            return row != "false" ? "已激活" : "锁定";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/table.scss";

.role-manage {
    [v-cloak] {
        display: none;
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
                border: none;

                .roleManageNoTab {
                    .el-table {
                        .l-icons {
                            font-size: 2rem;
                            cursor: pointer;
                            color: #2892e2;
                        }
                    }

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
}
</style>
