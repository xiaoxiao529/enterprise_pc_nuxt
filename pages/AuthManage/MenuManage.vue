<template>
<div>
    <el-container>
            <el-aside width="18vw">
                <div class="closeBox">
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
                                :treeHeight="400"
                                :treeWidth="22"
                                :data="item.tree"
                                :defaultProps="{label: 'menuName',children: 'children',isLeaf: 'leaf'}"
                                @handleTreeNodeClick="handleSystemTreeNodeClick"></FilterTree>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-aside>
            <el-main>
                <el-row class="header" :gutter="10">
                    <el-col :span="5" class="title">
                        <span>菜单管理</span>
                    </el-col>
                    <el-col :span="19" class="right">
                        <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-plus"
                            @click="handleTableClick('add')">新建菜单</el-button>
                    </el-col>
                </el-row>
                <!--列表-->
                <el-row class="body">
                    <div class="userNotab">
                        <el-table
                            ref="table"
                            :data="tableData"
                            v-loading="isLoading"
                            style="width: 100%;"
                            height="100%">
                            <el-table-column
                                label="序号"
                                prop="menuOrder"
                                width="180"></el-table-column>
                            <el-table-column label="菜单名称" prop="menuName"></el-table-column>
                            <el-table-column
                                label="菜单别名"
                                show-overflow-tooltip
                                prop="menuAlias"></el-table-column>
                            <el-table-column
                                label="菜单url"
                                width="180"
                                prop="menuUrl"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column min-width="100" label="操作">
                                <template slot-scope="scope">
                                    <el-tooltip content="编辑" placement="bottom">
                                        <i @click="handleTableClick('edit',scope)" class="ggicon-modification  icon-l-new l-icons"></i>
                                    </el-tooltip>
                                    <el-tooltip content="注销" placement="bottom">
                                        <i @click="handleTableClick('delete',scope)" class="cloud-trash icon-l-new l-icons"></i>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                        <Pagination
                            class="userPage"
                            :widgetInfo="pageInfo"
                            v-on:sonHandleCurrentChange="sonHandleCurrentChange" />

                    </div>
                </el-row>

            </el-main>
        </el-container>

        <MenuDialog
            :systemCode="systemCode"
            :show="addMenuDialogVisable"
            :treeData="menuTree"
            :title="'新建菜单'"
            @menuDialogSubmit="menuDialogSubmit"
            @close="addMenuDialogVisable=false"></MenuDialog>

        <MenuDialog
            :checkedArray="menuTreeChecked"
            v-if="editMenuDialogVisable"
            :show="editMenuDialogVisable"
            :treeData="menuTree"
            :data="menuObj"
            :title="'修改菜单信息'"
            @menuDialogSubmit="menuDialogSubmit"
            @close="editMenuDialogVisable=false"></MenuDialog>
    </div>
</template>

<script>
import api from "~/config/http"
import Mock from "mockjs"
import Pagination from "~/components/Pagination"
import FilterTree from "~/components/FilterTree"
import MenuDialog from "~/components/AuthManage/MenuManage/MenuDialog"
import "~/assets/css/style.css"
import "~/assets/css/ggicon.css"
import common from "~/utils/common"
import {
    reject,
    async
} from 'q'

export default {
    components: {
        FilterTree,
        Pagination,
        MenuDialog,
    },

    data() {
        return {
            pageInfo: {
                pageNo: 1,
                pageSize: 10,
                total: 1,
            },
            // 当前手风琴所处状态
            systemCode: 'fire',
            // 侧边栏系统菜单数组
            systems: [],
            // 记录手风琴和tree的对应index关系 systemCode,index 形式
            systemsLoadedMap: new Map(),
            // 当前权限对象
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
            isLoading: false,
            currentMenuId: '',
            menuObj: '',
            addMenuDialogVisable: false,
            editMenuDialogVisable: false,
            tableData: [],
            menuTree: [],
            menuTreeChecked: [],

        }
    },

    mounted() {
        this.initTree()
    },

    methods: {
        // 初始化初始化FilterTree
        async initTree() {
            let result = await api.post(api.forent_url.url + "/system/all.mvc")
            let systems = result.data
            if (result.code === 'success') {

                for (var i = 0; i < systems.length; i++) {
                    if (i == 0) {
                        let {
                            data
                        } = await this.getMenuListBySysCode(systems[i].systemCode)
                        systems[i].tree = common.formatJSONTreeData(data, "children", "menuId", "parentId")
                    }else{
                        // 懒加载后续tree
                        systems[i].tree = [];
                    }
                    this.systemsLoadedMap.set(systems[i].systemCode,i);

                }
                this.systems = systems

            }
        },
        initTable() {

        },
        // 增删改查点击事件
        async handleTableClick(operateType, scope) {
            // 判断本次操作是否执行

            var isExcute = false
            let params = {}

            // 修改
            if (operateType === "add") {
                this.addMenuDialogVisable = true
                let {
                    data
                } = await this.getTreeDataBySystemCode(this.systemCode)
                this.menuTree = common.formatJSONTreeData(data, "children", "systemId", "parentId")

            }
            if (operateType === "edit") {
                // /user/editsave.mvc
                // 执行完毕后确认
                this.menuObj = common.deepCopy(scope.row)
                let {
                    data
                } = await this.getTreeDataBySystemCode(scope.row.systemCode)
                this.menuTree = common.formatJSONTreeData(data, "children", "systemId", "parentId")
                // 获取tree回显数据
                var checkedRes = await this.getCheckedTreeData(scope.row.menuId)

                this.menuTreeChecked = checkedRes.data.split(',')
                this.editMenuDialogVisable = true

            }

            if (operateType === "delete") {
                var _this = this
                this.$confirm("确定要删除该菜单吗？", "提示信息", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(async () => {
                        let {
                            code
                        } = await this.judgeRefByMenuId(scope.row.menuId)
                        if (code != 'success') {
                            reject('存在关联菜单')
                        }
                    })
                    .then(async () => {
                        let {
                            code
                        } = await this.judgeSonByMenuId(scope.row.menuId)

                        if (code != 'success') {
                            reject('存在子菜单')
                        }
                    })
                    .then(async () => {
                        let {
                            code
                        } = await this.deleteMenuById(scope.row.menuId)
                        if (code != 'success') {
                            reject('删除失败')
                        } else {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                        }

                    })
                    .then(index => {
                        this.tableData.splice(scope.$index, 1)
                    })
                    .catch((msg) => {

                        this.$message({
                            type: "warning",
                            message: msg == 'cancel' ? '取消删除' : msg
                        })
                    })

                // /user/deleteById.mvc
                isExcute = true
            }
            if (!isExcute) {
                return
            }

            // 删除
            // 还原
            // 重置
            //激活
        },
        // 手风琴点击事件
        async handleCollapseChange(value) {

            if (!!value) {
                // 加载右侧table部分
                
                this.systemCode = value
                this.currentMenuId = ''
                this.isLoading = true;
                let {
                    code,
                    data
                } = await this.getMenuListByCondition({
                    systemCode: this.systemCode,
                    menuId: '',
                    pageNo: this.pageInfo.pageNo,
                    pageSize: this.pageInfo.pageSize
                })
                if (code == 'success') {
                    
                    this.tableData = data.rows
                }
                this.isLoading = false

                // 加载左侧tree部分
                let treeIndex = this.systemsLoadedMap.get(this.systemCode)
                
                let res = await this.getMenuListBySysCode(this.systemCode)
                if(res.code=='success'){
                    this.systems[treeIndex].tree = common.formatJSONTreeData(res.data, "children", "menuId", "parentId")
                }
                

            }

        },
        // 树节点点击事件
        async handleSystemTreeNodeClick({
            data,
            obj,
            node
        }) {
            // 隐藏角色组表
            
            // this.currentAuthObj = common.deepCopy(data)
            this.currentMenuId = data.menuId
            this.isLoading = true;

            let {
                code,
                data: res
            } = await this.getMenuListByCondition({
                systemCode: this.systemCode,
                menuId: data.menuId,
                pageNo: this.pageInfo.pageNo,
                pageSize: this.pageInfo.pageSize
            })
            if (code == 'success') {
                this.tableData = res.rows
            }
            this.isLoading = false;

        },
        // 分页信息改变监听
        async sonHandleCurrentChange(pageInfo) {
            // 处理分页信息并赋值
            this.pageInfo.pageSize = (pageInfo.pageSize ? parseInt(pageInfo.pageSize) : this.pageInfo.pageSize)
            this.pageInfo.pageNo = (pageInfo.pageNo ? parseInt(pageInfo.pageNo) : this.pageInfo.pageNo)
            this.isLoading = true
            let {
                code,
                data: res
            } = await this.getMenuListByCondition({
                systemCode: this.systemCode,
                menuId: this.currentMenuId,
                pageNo: this.pageInfo.pageNo,
                pageSize: this.pageInfo.pageSize
            })
            if (code == 'success') {
                
                this.tableData = res.rows
            }
            this.isLoading = false
        },
        menuDialogSubmit(obj) {
            if (obj.type == 'edit') {
                this.tableData[obj.index] = obj.value
            } else if (obj.type == 'add') {
                this.tableData.push(obj.value)
            }
        },
        // 请求数据方法封装
        async getMenuByMenuId(id) {
            let res = await api.post(api.forent_url.url + '/menu/menuByMenuId.mvc', {
                systemCode: id
            })
            return res
        },
        async getCheckedTreeData(menuId) {
            let res = await api.post(api.forent_url.url + '/menu/sameMenuFlagSystemCodes.mvc', {
                menuId: menuId
            })
            return res
        },
        async getTreeDataBySystemCode(systemCode) {
            let res = await api.post(api.forent_url.url + '/system/querySystemTreeNoSelf.mvc', {
                systemCode: systemCode
            })
            return res
        },
        async deleteMenuById(id) {
            let res = await api.post(api.forent_url.url + '/menu/deleteByMenuId.mvc', {
                menuId: id
            })
            return res
        },
        async judgeAsynToOtherSystemByMenuId(id) {
            let res = await api.post(api.forent_url.url + '/menu/judgeAysnToOtherSystem.mvc', {
                menuId: id
            })
            return res
        },
        async judgeRefByMenuId(id) {
            let res = await api.post(api.forent_url.url + '/menu/judgeRefMenu.mvc', {
                menuId: id
            })
            return res
        },
        async judgeSonByMenuId(id) {
            let res = await api.post(api.forent_url.url + '/menu/judgeSonMenu.mvc', {
                menuId: id
            })
            return res
        },
        async getMenuListByCondition(obj) {

            let res = await api.post(api.forent_url.url + '/menu/list.mvc', obj)
            if (res.code !== 'success') {
                this.$message({
                    message: '请求失败',
                    type: 'warning'
                })
            }
            return res
        },
        async getMenuListBySysCode(systemCode){
            let res = await api.post(api.forent_url.url + '/menu/menuListBySysCode.mvc', {
                systemCode:systemCode
            })
            if (res.code !== 'success') {
                this.$message({
                    message: '请求失败',
                    type: 'warning'
                })
            }
            return res
        }

    },
    watch: {
        tableData(ov, nv) {

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
