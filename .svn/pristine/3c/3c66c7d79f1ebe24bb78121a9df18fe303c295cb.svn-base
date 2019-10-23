<template>
    <div>
        <el-container>
            <el-aside width="18vw">
                <div class="closeBox" @click="closeBox()">
                    <p class="title">组织机构</p>
                    <el-scrollbar :style="borderStyle">
                        <el-tree :data="tempTreeData" :props="props" @node-click="handleNodeClick"></el-tree>
                    </el-scrollbar>
                    <!-- <Tree
                        :data="tempTreeData"
                        :props="props"
                        :refData="'tree'"
                        @handleNodeClick="handleNodeClick"></Tree> -->
                    <ul
                        v-show="menuVisible"
                        id="menu"
                        class="orgBox"
                        ref="menu">
                        <li>
                            <nuxt-link :to="{'name':'authManagement-user-orgAdd','params':{'orgObj':orgObj}}">添加</nuxt-link>
                        </li>
                        <li v-show="firstLevel">
                            <nuxt-link :to="{'name':'authManagement-user-orgEdit','params':{'orgObj':orgObj}}">修改</nuxt-link>
                        </li>
                        <li @click="orgDel(node,orgObj)" v-show="firstLevel">删除</li>
                    </ul>
                </div>
            </el-aside>
            <el-main>
                <el-row class="header" :gutter="10">
                    <el-col :span="5" class="title">
                        <span>用户管理</span>
                    </el-col>
                    <el-col :span="19" class="right">
                        <el-row>
                            <el-col
                                :span="12"
                                :offset="3"
                                class="right">
                                <el-row>
                                    <el-col :span="24">
                                        <el-button
                                            size="mini"
                                            type="primary"
                                            icon="el-icon-plus"
                                            @click="handleUserClick('add')">新增用户</el-button>
                                        <el-radio-group
                                             v-model.trim="userStatus"
                                            @change="changeUser"
                                            size="mini">
                                            <el-radio-button label="0">活动用户</el-radio-button>
                                            <el-radio-button label="1">注销用户</el-radio-button>
                                            <!-- <el-radio-button label="2">用户申请</el-radio-button> -->
                                        </el-radio-group>
                                    </el-col>

                                </el-row>

                            </el-col>
                            <el-col :span="8" :offset="1">
                                <el-input clearable
                                    placeholder="请输入姓名查询关键字"
                                     v-model.trim="searchUserName"
                                    ref="inputSearch"
                                    size="mini"
                                    @keyup.enter.native="handleSearch"
                                    @change="handleSearch">
                                    <i slot="suffix" class="el-input__icon el-icon-search is-ableClick"></i>
                                </el-input>
                            </el-col>

                        </el-row>

                    </el-col>

                </el-row>
                <!--列表-->
                <el-row class="body">
                    <div class="userNotab">
                        <!-- FIXME: 2018年12月17日 增加超时五秒请重新请求提示 -->
                        <el-table
                            ref="table"
                            :data="tableData"
                            style="width: 100%;"
                            height="100%"
                            v-loading="listLoading">
                            <el-table-column
                                label="序号"
                                type="index"
                                width="180"></el-table-column>
                            <el-table-column label="姓名" prop="name"></el-table-column>
                            <el-table-column
                                label="用户名"
                                show-overflow-tooltip
                                prop="loginName"></el-table-column>
                            <el-table-column
                                label="角色"
                                v-if="cloShow"
                                width="180"
                                prop="belongRoleName"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                label="状态"
                                prop="isLock"
                                :formatter="formatIsLock">
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
                                        <i @click="handleUserClick('edit',orgObj,scope)" class="ggicon-modification icon-l-new l-icons"></i>
                                    </el-tooltip>

                                    <el-tooltip
                                        v-show="operateAuth.logoff"
                                        content="注销"
                                        placement="bottom">
                                        <i @click="handleUserClick('remove',orgObj,scope)" class="ggicon-forbid icon-l-new l-icons"></i>
                                    </el-tooltip>

                                    <!-- <el-tooltip
     v-show="operateAuth.locked"
     :content="iconCont"
     placement="bottom">
                                        <i @click="handleUserClick('lock',orgObj,scope)" :class="scope.isLock!='false'?'cloud-unlocked icon-l-new l-icons':'cloud-locked icon-l-new l-icons'"></i>
                                    </el-tooltip> -->
                                    <el-tooltip
                                        v-show="operateAuth.locked"
                                        :content="iconCont"
                                        placement="bottom">
                                        <i @click="handleUserClick('lock',orgObj,scope)" :class="classIconLock(scope)"></i>
                                    </el-tooltip>
                                    <el-tooltip
                                        v-show="operateAuth.reset"
                                        content="重置"
                                        placement="bottom">
                                        <i @click="handleUserClick('reset',orgObj,scope)" class="ggicon-resets icon-l-new l-icons"></i>
                                    </el-tooltip>

                                    <el-tooltip
                                        v-show="operateAuth.role"
                                        content="角色配置"
                                        placement="bottom">
                                        <i @click="handleUserClick('role',orgObj,scope)" class="ggicon-authority icon-l-new l-icons"></i>
                                    </el-tooltip>

                                    <el-tooltip
                                        v-show="operateAuth.restore"
                                        content="还原"
                                        placement="bottom">
                                        <i @click="handleUserClick('restore',orgObj,scope)" class="cloud-release icon-l-new l-icons"></i>
                                    </el-tooltip>

                                    <el-tooltip
                                        v-show="operateAuth.accept"
                                        content="同意申请"
                                        placement="bottom">
                                        <i @click="handleUserClick('accept',orgObj,scope)" class="ggicon-agree icon-l-new l-icons"></i>
                                    </el-tooltip>

                                    <el-tooltip
                                        v-show="operateAuth.refuse"
                                        content="拒绝申请"
                                        placement="bottom">

                                        <i @click="handleUserClick('refuse',orgObj,scope)" class="ggicon-disagree icon-l-new l-icons"></i>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- TODO:组织树增加滚动条 -->
                        <Pagination
                            class="userPage"
                            :widgetInfo="pageInfo"
                            v-on:sonHandleCurrentChange="sonHandleCurrentChange" />

                    </div>
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
                v-if="formObj.editFormVisible"
                ref="formModifyUser"
                :form="userObj"
                :loginName="userObj.loginNameValidate"
                :show="formObj.editFormVisible"
                @userPageListener="userPageListener"
                :userTypeShow="true"></ModifyUser>
            <ModifyRoleUser
                v-if="formObj.roleFormVisible"
                ref="formModifyRoleUser"
                :form="userObj"
                :show="formObj.roleFormVisible"
                @userPageListener="userPageListener"></ModifyRoleUser>
            <AddUser
                :show="formObj.addFormVisible"
                @userPageListener="userPageListener"
                :userTypeShow="true"></AddUser>
            <RefuseUser
                :show="formObj.refuseFormVisible"
                @userPageListener="userPageListener"
                :userObj="userObj"></RefuseUser>
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
import Tree from "~/components/Tree"
import "~/assets/css/style.css";
import "~/assets/css/ggicon.css"
import common from '~/utils/common';
/* 本地数据开始 */
const Random = Mock.Random;
//数结构
const loginData = function () {
    let newArticleObject = {
        status: "OK",
        code: "success",
        message: "",
        data: [{
            orgName: "全部",
            parentCode: "-1",
            orgCode: "1",
            tenantId: "1",
            leaf: false,
            orgId: "1"
        }],
        token: "",
        refreshToken: "",
        dataType: "json"
    };
    return newArticleObject;
};

if (!api.isOnline) {
    Mock.mock(
        RegExp(api.ajaxUrl + "/upmsOrg/findUpmsOrgTree" + ".*"),
        "post",
        loginData
    );
    Mock.mock(RegExp(api.ajaxUrl + "/upmsUser/queryUserList" + ".*"), "post", {
        status: "OK",
        code: "success",
        message: "",
        data: {
            "content|3-10": [{
                "userId|+1": "1",
                loginName: "@name",
                password: "Y13RNmw6TBE=",
                userName: "@cname",
                userSex: "0",
                userEmail: "@email",
                userPhone: /\d{11}/,
                createDate: "@date",
                userType: "0",
                userPhoto: "",
                status: "0",
                "tenantId|+1": "1",
                "orgCode|+1": "1",
                extendstr1: "",
                extendstr2: "",
                extendstr3: ""
            }],
            last: true,
            totalPages: 1,
            totalElements: 10,
            number: 0,
            size: 15,
            sort: [{
                direction: "DESC",
                property: "createDate",
                ignoreCase: false,
                nullHandling: "NATIVE",
                ascending: false,
                descending: true
            }],
            first: true,
            numberOfElements: 1
        },
        token: "",
        refreshToken: "",
        dataType: "json"
    });
}

export default {
    components: {
        ModifyUser,
        ModifyRoleUser,
        AddUser,
        RefuseUser,
        Pagination,
        Tree
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

            pageNo: 1,
            pageSize: 15,
            total: 0,
            pageInfo: {
                pageNo: 1,
                pageSize: 6,
                total: 1,
            },
            islock: true,

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

            formObj: {
                addFormVisible: false,
                editFormVisible: false,
                roleFormVisible: false,
                refuseFormVisible: false
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
            listLoading: false,
            formRules: "",

            props: {

                label: "orgName",
                children: "children",
                isLeaf: "leaf"
            },

            defaultProps: {
                children: "children",
                label: "label"
            },

            tableData: [],
            tempTreeData: []
        };
    },
    computed:{
        borderStyle() {
            return {
                height: 'calc(100% - 41px)',
                // height: 'inherit',
                // 'overflow-y':'hidden',
                // border: '1px solid #d8d8d8',
                // width: '100%',
                // margin: '0px 20px',
                // borderRadius: '5px'
            };
        }
    },
    mounted() {
        this.changeUser(0);
        this.initTree();

    },

    methods: {
        initTree() {
            api
                .post(api.forent_url.url + "/org/allorg.mvc")
                .then(res => {
                    this.tempTreeData = common.formatJSONTreeData(res.data, 'children', 'orgCode', 'parentCode');
                });
        },
        //监听总函数
        userPageListener(name,data,index) {
            if (name == "ModifyUser") {
                this.formObj.editFormVisible = false;
                if(!!data&&!!index){
                    this.tableData.splice(index,1,data);
                }
                
            }
            if (name == "ModifyRoleUser") {
                this.formObj.roleFormVisible = false;
            }
            if (name == "AddUser") {
                this.formObj.addFormVisible = false;
                this.tableData.push(data);
            }
            if (name == "RefuseUser") {
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
            var row;
            if (scope) {
                row = common.deepCopy(scope.row);
                row.index = scope.$index;
            }

            var isExcute = false;
            let params = {};

            //
            //
            //
            //

            // 修改
            if (operateType === "add") {
                this.formObj.addFormVisible = true;
            }
            if (operateType === "edit") {
                // /user/editsave.mvc
                // 执行完毕后确认

                this.formObj.editFormVisible = true;
                this.userObj = row;
                this.userObj.loginNameValidate = row.loginName;

                isExcute = true;
            }

            if (operateType === "remove") {
                var _this = this;
                this.$confirm("确定要注销该用户吗？", "提示信息", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        let params = {
                            id: row.id
                        };
                        api
                            .post(api.forent_url.url + "/user/deleteById.mvc", params)
                            .then(res => {
                                let data = res.data;
                                if (res.code == "success") {
                                    _this.$message({
                                        type: "success",
                                        message: "注销成功"
                                    });
                                    this.tableData.splice(scope.$index, 1)
                                }
                            });
                    })
                    .catch((a, b) => {
                        this.$message({
                            type: "info",
                            message: "已取消注销"
                        });
                    });

                // /user/deleteById.mvc
                isExcute = true;
            }
            if (operateType === "restore") {
                var _this = this;
                // /user/recoveryUser.mvc
                this.$confirm("确定要恢复该用户吗？")
                    .then(() => {
                        let params = {
                            id: row.id
                        };
                        api
                            .post(api.forent_url.url + "/user/recoveryUser.mvc", params)
                            .then(res => {
                                let data = res.data;
                                if (res.code == "success") {
                                    this.$message({
                                        type: "success",
                                        message: "恢复成功"
                                    });
                                }
                            });
                    })
                    .catch((a, b) => {
                        this.$message({
                            type: "info",
                            message: "已取消恢复"
                        });
                    });

                isExcute = true;
            }

            if (operateType === "reset") {
                var _this = this;
                // /user/restPassword.mvc
                this.$confirm("确定要重置密码吗？")
                    .then(() => {
                        let params = {
                            id: row.id
                        };
                        api
                            .post(api.forent_url.url + "/user/restPassword.mvc", params)
                            .then(res => {
                                let data = res.data;
                                if (res.code == "success") {
                                    this.$message({
                                        type: "success",
                                        message: "重置成功"
                                    });
                                }
                            });
                    })
                    .catch((a, b) => {
                        this.$message({
                            type: "info",
                            message: "已取消重置"
                        });
                    });

                isExcute = true;
            }
            if (operateType === "lock") {

                var flag;
                if (row.isLock == null || row.isLock == '' || row.isLock == 'false') {
                    flag = false;
                } else {
                    flag = true;
                }
                let params = {
                    id: row.id,
                    flag: !flag
                };

                api
                    .post(api.forent_url.base_url + "/user/lockandunlockById.mvc", params)
                    .then(res => {
                        let data = res.data;

                        if (res.code == "success") {
                            this.$message({
                                type: "success",
                                message: res.message
                            });

                            if (row.isLock == 'false') {
                                scope.row.isLock = 'true';
                            } else {
                                scope.row.isLock =  'false'; 
                            }
                        }
                    });

                // /user/lockandunlockById.mvc
                isExcute = true;
            }
            if (operateType === "role") {
                // /user/roleConfig.mvc

                this.formObj.roleFormVisible = true;

                this.userObj = row;
                isExcute = true;
            }

            if (operateType === "accept") {
                var _this = this;
                //url:  forent_url.base_url +"/user/acceptOrRefuse",
                api
                    .post(api.forent_url.base_url + this.ACCEPT_URL, {
                        currentUserId: api.getGlobalVal("userObj").id,
                        userId: row.id,
                        content: "",
                        flag: "1"
                    })
                    .then(res => {
                        if (res.code == "success") {
                            this.$message({
                                type: "success",
                                message: res.message
                            });
                        }
                    })
                    .catch(err => {
                        this.$message({
                            type: "warn",
                            message: "操作失败"
                        });
                    });
            }
            if (operateType === "refuse") {
                var _this = this;
                // /user/restPassword.mvc
                this.userObj = row;
                this.formObj.refuseFormVisible = true;
            }
            if (!isExcute) {
                return;
            }

            // 删除
            // 还原
            // 重置
            //激活
        },

        // 处理input框回车搜索事件
        handleSearch() {
            let params = {
                pageNum: this.pageInfo.pageNo || 1,
                pageSize: this.pageInfo.pageSize || 15,
                tenantId: this.tenantId || "",
                orgCode: this.orgCode,
                showFlag: this.userStatus,
                userName: this.$refs.inputSearch.value
            };
            api.post(api.forent_url.url + "/user/list.mvc", params).then(res => {
                if (res.code == 'success') {
                    this.total = res.data.total;
                    this.tableData = res.data.rows;
                    this.listLoading = false;
                    this.pageInfo.pageNo = res.data.pageNo;
                    this.pageInfo.total = res.data.total;
                    this.pageInfo.pageSize = res.data.pageSize;
                }
            });
        },

        handleNodeClick(data,obj,node) {

            this.tenantId = data.tenantId;
            this.orgCode = data.orgCode;
            this.orgObj = data;
            this.flag = true;
            this.markFloat = obj.id;
            this.keys = data.parentCode;
            this.getUserList(this.userStatus);
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
        sonHandleCurrentChange(pageInfo) {
            // 处理分页信息并赋值
            this.pageInfo.pageSize = (pageInfo.pageSize ? parseInt(pageInfo.pageSize) : this.pageInfo.pageSize);
            this.pageInfo.pageNo = (pageInfo.pageNo ? parseInt(pageInfo.pageNo) : this.pageInfo.pageNo);
            //重新加载列表
            this.getUserList(this.userStatus);
            // this.getData();
        },
        removeTree(node, data) {
            // 
            //  const parent = node.parent;
            // const children = parent.data.children || parent.data;
            // const index = children.findIndex(d => d.id === data.id);
            // children.splice(index, 1);
            // 
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

        changeUser(label) {
            if (label == "0") {
                this.operateAuth.edit = true;
                this.operateAuth.logoff = true;
                this.operateAuth.locked = true;
                // this.operateAuth.actived = true;
                this.operateAuth.role = true;
                this.operateAuth.reset = true;
                this.operateAuth.restore = false;
                this.operateAuth.accept = false;
                this.operateAuth.refuse = false;
            }
            if (label == "1") {
                this.operateAuth.edit = true;
                this.operateAuth.logoff = false;
                this.operateAuth.locked = false;
                // this.operateAuth.actived = false;
                this.operateAuth.role = false;
                this.operateAuth.reset = false;
                this.operateAuth.restore = true;
                this.operateAuth.accept = false;
                this.operateAuth.refuse = false;
            }
            if (label == "2") {
                this.operateAuth.edit = false;
                this.operateAuth.logoff = false;
                this.operateAuth.locked = false;
                // this.operateAuth.actived = false;
                this.operateAuth.role = false;
                this.operateAuth.reset = false;
                this.operateAuth.restore = false;
                this.operateAuth.accept = true;
                this.operateAuth.refuse = true;
            }
            this.userStatus = label;
            this.pageNo = 1;
            this.getUserList(label);
        },

        statusEve: function (row, column, cellValue, index) {

            return (row.isLock != 'false') ? "已激活" : "锁定";
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

        changePage: function (page) {
            this.pageNo = page;

            this.getUserList(this.userStatus);
        },

        getUserList(userStatus) {
            let params = {
                pageNo: this.pageInfo.pageNo,
                pageSize: this.pageInfo.pageSize,
                tenantId: this.tenantId,
                orgCode: this.orgCode || '',
                showFlag: userStatus,
                userName: this.$refs.inputSearch.value,
                flag: ""
            };

            var url = "";
            if (userStatus == 1 || userStatus == 0) {
                url = api.forent_url.url;
            } else {
                url = api.forent_url.base_url;
            }
            this.listLoading = true;
            api.post(url + "/user/list.mvc", params).then(res => {
                if (!res.data) {}

                this.pageInfo.total = res.data.total;
                this.pageInfo.pageSize = res.data.pageSize;
                //过滤原始数据
                // this.formateUserList(res.data.rows);
                this.tableData = res.data.rows;
                this.listLoading = false;
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
            if(!!value){
                var isLock = value.isLock;
            if (isLock == '' || isLock == null || isLock == 'false') {
                return '已激活'
            } else {
                return '已锁定';
            }
            }else{
                return '已锁定';
            }
            
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

// .r,
// .el-button-group {
//     line-height: 40px;
// }

// .r {
//     overflow: hidden;

//     // span {
//     //     float: left;
//     // }

//     // .el-radio-group {
//     //     float: right;
//     //     line-height: 40px;
//     // }

//     // .addBtn {
//     //     float: right;
//     //     margin: 6px 0 0 10px;
//     // }

//     // .addBtn {
//     //     float: right;
//     // }
// }

// .zTree .el-tree-node__content {
//     background-color: red !important;
// }

// .el-button--mini,
// .el-button--small {
//     padding: 5px;
//     margin: 2px;
// }
</style>
