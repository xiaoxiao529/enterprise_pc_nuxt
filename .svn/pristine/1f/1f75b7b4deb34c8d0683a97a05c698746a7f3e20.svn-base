<template>
    <div>
        <el-container>

            <el-main>
                <el-row class="header" :gutter="10">
                    <el-col :span="5" class="title">
                        <span>密级管理</span>
                    </el-col>
                    <el-col :span="19" class="right">
                        <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleUserClick('add')">新增密级</el-button>

                    </el-col>

                </el-row>
                <!--列表-->
                <el-row class="body">
                    <div class="userNotab">
                        <el-table ref="table" :data="listData" style="width: 100%;" height="100%" >
                            <el-table-column label="序号" type="index" width="180"></el-table-column>
                            <el-table-column label="密级名称" prop="securityName"></el-table-column>
                            <el-table-column label="密级级别" show-overflow-tooltip prop="leve"></el-table-column>
                            <el-table-column min-width="100" label="操作">
                                <template slot-scope="scope">

                                    <el-tooltip v-show="operateAuth.edit" content="编辑" placement="bottom">
                                        <i @click="handleUserClick('edit',orgObj,scope.row)" class="ggicon-modification icon-l-new l-icons"></i>
                                    </el-tooltip>

                                    <el-tooltip v-show="operateAuth.logoff" content="删除" placement="bottom">
                                        <i @click="handleUserClick('remove',orgObj,scope.row)" class="ggicon-forbid icon-l-new l-icons"></i>
                                    </el-tooltip>

                                </template>
                            </el-table-column>
                        </el-table>
                        <Pagination class="userPage" :widgetInfo="pageInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />

                    </div>
                </el-row>

            </el-main>
            <UpdateManage ref="formModifyUser" :form="userObj" :loginName="userObj.securityName" :show="formObj.editFormVisible" @userPageListener="userPageListener"></UpdateManage>
            <AddManage :show="formObj.addFormVisible" @userPageListener="userPageListener"></AddManage>
        </el-container>

    </div>
</template>

<script>
import api from "~/config/http";
import Mock from "mockjs";
import UpdateManage from "~/components/SystemManagement/UserManagement/UpdateManage";
import AddManage from "~/components/SystemManagement/UserManagement/AddManage";
import Pagination from "~/components/Pagination"
import "~/assets/css/style.css";
import "~/assets/css/ggicon.css";
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
        UpdateManage,
        AddManage,
        Pagination
    },

    data() {
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
                securityName:"",
                leve:"",
                id:"",
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

            tableData: [],
            tempTreeData: [],
            listData:[],
        };
    },

    mounted() {
        this.changeUser(0);
        this.initList();
    },

    methods: {
        initList(){
             api
                .post(api.forent_url.url + "/security/list.mvc", {
                    pageNo: 1,
                    pageSize: 14,
                })
                .then(res => {
                    this.listData = res.data.rows;
                });
        },
        //监听总函数
        userPageListener(name, data) {
            if ((name = "ModifyUser")) {
                this.formObj.editFormVisible = false;
            }
            if ((name = "AddManage")) {
                this.formObj.addFormVisible = false;
                this.initList();
                this.changeUser(0);
            }
        },
        handleUserClick(operateType, orgObj, row) {
            // 判断本次操作是否执行

            var isExcute = false;
            let params = {};

            // 新增
            if (operateType === "add") {
                this.formObj.addFormVisible = true;
            }
            // 修改
            if (operateType === "edit") {
                // 执行完毕后确认

                this.formObj.editFormVisible = true;
                this.userObj = row;
                this.userObj.securityName = row.securityName;
                this.userObj.leve = row.leve;
                this.userObj.id =row.id;

                isExcute = true;
            }
            // 删除
            if (operateType === "remove") {
                var _this = this;
                this.$confirm("确定要删除选择的数据吗？", "提示信息", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        let params = {
                            id: row.id
                        };
                        api
                            .post(api.forent_url.url + "/security/deleteById.mvc", params)
                            .then(res => {
                                let data = res.data;
                                if (res.code == "success") {
                                    _this.$message({
                                        type: "success",
                                        message: "删除成功"
                                    });
                                    _this.initList();
                                    _this.changeUser(0);
                                }
                            });
                    })
                    .catch((a, b) => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });

                // /user/deleteById.mvc
                isExcute = true;
            }
            if (operateType === "role") {
                // /user/roleConfig.mvc

                this.formObj.roleFormVisible = true;

                isExcute = true;
            }

            if (!isExcute) {
                return;
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
        sonHandleCurrentChange(pageInfo) {
            // 处理分页信息并赋值
            this.pageInfo.pageSize = (pageInfo.pageSize ? parseInt(pageInfo.pageSize) : this.pageInfo.pageSize);
            this.pageInfo.pageNo = (pageInfo.pageNo ? parseInt(pageInfo.pageNo) : this.pageInfo.pageNo);
            //重新加载列表
            this.getUserList(this.userStatus);
            // this.getData();
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
        changePage: function (page) {
            this.pageNo = page;

            this.getUserList(this.userStatus);
        },

        getUserList(userStatus) {
            let params = {
                pageNo: this.pageInfo.pageNo,
                pageSize: this.pageInfo.pageSize,
                // tenantId: this.tenantId,
                // orgCode: "AHHF_QHHFY_99999997",
                // showFlag: userStatus,
                // userName: "",
                flag: ""
            };

            // var url = "";
            // if (userStatus == 1 || userStatus == 0) {
            //     url = api.forent_url.url;
            // } else {
            //     url = api.forent_url.base_url;
            // }

            return api.post(api.forent_url.url + "/security/list.mvc", params).then(res => {
                if (!res.data) {}
                this.pageInfo.total = res.data.total;
                //过滤原始数据

                this.listData = res.data.rows;
                this.listLoading = false;
            });
        },
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
    overflow:hidden;
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
                border:none;
                .el-pagination {

                    // text-align: right;
                    height: 100%;
                }
            }
            .userPage{

            }

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
