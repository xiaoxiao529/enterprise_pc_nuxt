<template>
<div>
    <el-container>
        <!-- 侧栏 -->
        <el-aside width="18vw">
            <div class="closeBox">
                <p class="title">组织机构</p>
                <DragTree 
                    :treeStyle="{height:'800px'}"
                    :treeWidth="22"
                    ref="transFormer" :draggable="true" id="filterTree" :data="tree.data" :nodeKeyName="'orgCode'" :defaultProps="tree.props" @dropNodeEnd="handleDropNodeEnd" @handleTreeOperate="handleTreeOperate" @handleDrag="handleDrag" @handleTreeNodeClick="handleTreeNodeClick" style="margin-top: 10px;"></DragTree>
            </div>
        </el-aside>
        <!-- 详细信息 -->
        <el-main>
            <el-row class="header" :gutter="10">
                <el-col :span="5" class="title">
                    <span>组织机构详细信息</span>
                </el-col>
                <!-- <el-col :span="19" class="right">
                        <el-row>
                            <el-col :span="8" :offset="16">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    icon="el-icon-plus"
                                    @click="NewInstitution">新建机构</el-button>
                            </el-col>
                        </el-row>
          </el-col>-->
            </el-row>
            <!--列表-->
            <el-row class="body">
                <el-row>
                    <el-col :span="24">
                        <div class="content wrapper_border" style="min-height:220px;">
                            <div class="content_body table_wrapper">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>机构名称：</td>
                                            <td id="unitName">{{ orgInfo.unitName }}</td>
                                            <td style="line-height: 0;">
                                                创 建 人：
                                                <span></span>
                                            </td>
                                            <td id="updateUser">{{orgInfo.updateUser}}</td>
                                        </tr>
                                        <tr>
                                            <td>上级机构：</td>
                                            <td id="parentBody">{{orgInfo.parentName||'--'}}</td>
                                            <td>创建时间：</td>
                                            <td id="createTime">2018-7-16 00:00:23</td>
                                        </tr>
                                        <tr>
                                            <td>机构编码：</td>
                                            <td id="unitId">{{orgInfo.unitId}}</td>
                                            <td style="line-height: 0;">gis 坐 标</td>
                                            <td id="xy">{{orgInfo.unitPointX}},{{orgInfo.unitPointY}}</td>
                                        </tr>
                                        <tr>
                                            <td>机构分类：</td>
                                            <td id="unitClass">{{orgInfo.unitClass}}</td>
                                            <td>机构地址：</td>
                                            <td id="unitAddress">{{orgInfo.unitAddress}}</td>
                                        </tr>
                                        <tr>
                                            <td>联系电话：</td>
                                            <td>010-87687212</td>
                                            <td style="line-height: 0;">
                                                备 注：
                                                <span></span>
                                            </td>
                                            <td id="remark">{{orgInfo.remark}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </el-col>
                    <el-row :gutter="0">
                        <el-col :span="12">
                            <div class="content wrapper_border" style="min-height:200px;">
                                <div class="content_header border_bottom">包含用户</div>
                                <div class="content_body">
                                    <el-scrollbar style="height:100%">
                                        <el-row>
                                            <ul class="list">
                                                <li v-for="(user, index) in userList" :key="index" :class="activeClassObj(user)" @click="changeRoleList(index,user)">
                                                    <span class="inner">{{user.userName}}</span>
                                                </li>
                                            </ul>        
                                        </el-row>
                                    </el-scrollbar>
                                    
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="content wrapper_border" style="min-height:200px;">
                                <div class="content_header border_bottom">所属角色</div>
                                <div class="content_body">
                                    <el-row>
                                        <el-scrollbar style="height:100%">
                                            <ul class="list">
                                                <li class="list_item" v-for="(item, index) in roleList" :key="index">
                                                    <span class="inner">{{item}}</span>
                                                </li>
                                            </ul>
                                        </el-scrollbar>
                                    </el-row>
                                    
                                    
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-row>
            </el-row>
        </el-main>
        <el-dialog title="新建组织结构" :visible.sync="appendDialogVisable" width="50%" @close="appendDialogVisable = false">
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-form :model="orgInfoFormObj" ref="orgInfoForm" label-width="80px">
                        <el-row>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="机构名称:" label-width="80px">
                                    <!-- <el-input clearable   v-model.trim="orgInfoFormObj.unitName" placeholder="请输入机构名称"></el-input> -->
                                    <el-select  v-model.trim="orgInfoFormObj.unitName" :disabled="orgInfoFormObjDisableFlag.unitName" placeholder="请选择机构名称" @change="dialogData" style="width:100%">
                                        <el-option v-for="item in orgInfoFormSelectData" :key="item.orgCode" :label="item.orgName" :value="item.orgCode"></el-option>
                                    </el-select>
                                    <!-- </el-col> -->
                                </el-form-item>
                                <el-form-item label="上级机构:">
                                    <el-input clearable   v-model.trim="orgInfoFormObj.unitParentName" :disabled="orgInfoFormObjDisableFlag.unitParentName" placeholder="请输入上级机构"></el-input>
                                </el-form-item>
                                <el-form-item label="机构编码:">
                                    <el-input clearable   v-model.trim="orgInfoFormObj.unitId" :disabled="orgInfoFormObjDisableFlag.unitId" placeholder="请输入机构编码"></el-input>
                                </el-form-item>
                                <el-form-item label="机构分类:">
                                    <el-input clearable   v-model.trim="orgInfoFormObj.unitClass" :disabled="orgInfoFormObjDisableFlag.unitClass" placeholder="请输入机构分类"></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话:">
                                    <el-input clearable   v-model.trim="orgInfoFormObj.contactsTel" :disabled="orgInfoFormObjDisableFlag.contactsTel" placeholder="请输入联系电话"></el-input>
                                </el-form-item>
                                <el-form-item label="创建人:">
                                    <el-input clearable   v-model.trim="orgInfoFormObj.updateUser" :disabled="orgInfoFormObjDisableFlag.updateUser" placeholder="请输入创建人"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="创建时间:">
                                    <el-input clearable   v-model.trim="orgInfoFormObj.createTime" :disabled="orgInfoFormObjDisableFlag.createTime" placeholder="请输入创建时间"></el-input>
                                </el-form-item>
                                <el-form-item label="gis坐标:">
                                    <el-col :span="11">
                                        <el-input clearable   v-model.trim="orgInfoFormObj.unitPointX" :disabled="orgInfoFormObjDisableFlag.unitPointX" placeholder="经度"></el-input>
                                    </el-col>
                                    <el-col :span="2">,</el-col>
                                    <el-col :span="11">
                                        <el-input clearable   v-model.trim="orgInfoFormObj.unitPointY" :disabled="orgInfoFormObjDisableFlag.unitPointY" placeholder="维度"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="机构地址:">
                                    <el-input clearable  type="textarea" :autosize="{minRows:4,maxRows:4}"  v-model.trim="orgInfoFormObj.unitAddress" :disabled="orgInfoFormObjDisableFlag.unitAddress" placeholder="请输入机构地址"></el-input>
                                </el-form-item>
                                <el-form-item label="备注:">
                                    <el-input clearable  type="textarea" :autosize="{minRows:4,maxRows:4}"  v-model.trim="orgInfoFormObj.remark" :disabled="orgInfoFormObjDisableFlag.remark" placeholder="请输入备注"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
            <span slot="footer"></span>
            <el-row>
                <el-button @click="appendDialogVisable = false">取 消</el-button>
                <el-button type="primary" @click="handleSaveOrgCode(orgInfoFormObj)">提交</el-button>
            </el-row>
        </el-dialog>
    </el-container>
</div>
</template>

<script>
import api from "~/config/http";
import DragTree from "~/components/DragTree";
import "~/assets/css/style.css";
import "~/assets/css/ggicon.css";
import common from "~/utils/common";
export default {
    components: {
        DragTree
    },
    data() {
        return {
            // 当前组织机构信息对象
            orgInfo: {
                // 机构名称
                unitName: "",
                // 创建时间
                unitId: "",
                // 上级机构
                unitAddress: "",
                // gis坐标：
                unitClass: "",
                // 机构编码
                updateUser: "",
                // 机构地址
                remark: "",
                // 机构分类
                unitPointX: "",
                // 联系电话
                unitPointY: "",
                // 备注：
                subCenterCode: ""
                // 创建人：
            },

            // 当前激活节点信息
            nodeInfo: "",
            // tree对象配置
            tree: {
                // 节点数据
                data: [],
                // tree自定义属性
                props: {
                    label: "orgName",
                    children: "children",
                    isLeaf: "leaf"
                }
            },
            treeRes: "",
            // 平级tree数据副本
            planJsonTemp: [],
            // 嵌套tree数据副本
            nestJsonTemp: [],
            orgInfoFormObj: {},
            // 对话框元素禁用对象
            orgInfoFormObjDisableFlag: {
                unitName: false,
                unitParentName: true,
                unitId: true,
                unitClass: true,
                contactsTel: true,
                updateUser: true,
                createTime: true,
                unitPointX: true,
                unitPointY: true,
                unitAddress: true,
                remark: false
            },
            orgInfoFormSelectData: [],
            orgInfoFormRules: {},
            appendDialogVisable: false,
            // 用户信息列表
            userList: [],
            roleList: []
        };
    },
    mounted() {
        this.initTree();
    },
    methods: {
        async handleDropNodeEnd(obj) {
            let {
                node,
                targetNode,
                nodePos
            } = obj;
            var ret = [];
            // 获取所有节点
            var transRef = this.$refs["transFormer"];
            var filterTreeRef = transRef.$refs["filter-tree"];
            for (var i = 0; i < this.treeRes.length; i++) {
                var item = this.treeRes[i];
                var level = filterTreeRef.getNode(item.orgCode).level - 1;
                // 更改当前移动的节点的parentCode编码为 目标节点的orgCode
                if (item.orgCode == node.data.orgCode) {
                    // 若拖拽到节点内部,则将目标节点设置为父节点
                    if (nodePos == "inner") {
                        item.parentCode = targetNode.data.orgCode;
                    }
                    // 若拖拽到节点上或者下,则和目标节点同父节点
                    if (nodePos == "before" || nodePos == "after") {
                        item.parentCode = targetNode.data.parentCode;
                    }
                }
                ret.push({
                    orgCode: item.orgCode,
                    level,
                    parentCode: item.parentCode
                });
            }
            // this.updateParentAndReOrder()
            let params = {
                targetCode: targetNode.data.orgCode,
                curCode: node.data.orgCode,
                treeNodes: JSON.stringify(ret)
            };
            let {
                code,
                data
            } = await this.updateParentAndReOrder(params);
            if (code == "success") {
                this.$message.success("修改成功");
            }
        },
        handleURLDialogClose(refName) {
            this.$refs[refName].clearValidate();
            this.$refs[refName].resetFields();
        },
        activeClassObj(user) {
            return {
                list_item: true,
                active: user.selected == true
            };
        },
        // 左侧树加载
        async initTree() {
            let treeRes = await api.get(
                api.forent_url.base_url + "/sys/org/allSonIncludSelf", {
                    orgCode: api.getGlobalVal("userObj").orgCode
                }
            );
            if (treeRes.code == "success") {
                this.treeRes = treeRes.data;
                this.tree.data = common.formatJSONTreeData(
                    treeRes.data,
                    "children",
                    "orgCode",
                    "parentCode"
                );
            }
            this.nodeInfo = treeRes.data[0];
            let orgRes = await this.getOrgDetail(treeRes.data[0].orgCode);
            if (orgRes.code == "success") {
                this.orgInfo = orgRes.data;
            }
            let parentCodeRes = await this.getOrgDetail(treeRes.data[0].parentCode);
            if (parentCodeRes.code == "success") {
                this.orgInfo.parentName = parentCodeRes.data;
            }
            await this.changeUserList(treeRes.data[0].orgCode);
            this.roleList = this.userList[0].roleList;
        },
        handleDrag(res) {},
        // 把父子嵌套数据改为平行结构数据
        formatJSONToPlainData(data) {
            var arr = [];
            var root = "-1";
            // var arr_each = function(arr,level){
            //     level=level||0;
            //     // if(!!arr&&arr.length>0){
            //     //     for(var i=0;i<arr.length;i++){
            //     //         if
            //     //     }
            //     // }
            // };
            // var
            // if(data&&data.length>0){
            // }
        },
        async handleSaveOrgCode(orgInfoFormObj) {
            
            // 更新备注
            {
                let {
                    code,
                    data
                } = await this.updateOrgRemark({
                    id: orgInfoFormObj.id,
                    remark: orgInfoFormObj.remark
                });
                if (code == "success") {
                    this.$message.success("备注更新成功!");
                }
            }
            // 更新其他信息
            let params = {
                deleteFlag: "0",
                orgCode: orgInfoFormObj.orgCode,
                orgName: orgInfoFormObj.orgName,
                parentCode: orgInfoFormObj.parentCode,
                tenantId: orgInfoFormObj.orgCode,
                extendstr2: orgInfoFormObj.unitPointX,
                extendstr3: orgInfoFormObj.unitPointY,
                extendstr7: orgInfoFormObj.extendstr7
            };
            // 校验机构是否存在
            {
				
                let {
                    code2,
                    data2
				} = await this.validateOrgIsExistByOrgCode({orgCode: orgInfoFormObj.unitId});
				// 如果已存在,返回
                if (data2 == true) {
                    return;
                }
            }
            // 保存机构信息
            {
                let {
                    code3,
                    data3
                } = await this.saveOrg(params);
                if (code3 == "success") {
                    this.$message.success("保存成功");       
                }
            }
            // 关闭窗口
            this.appendDialogVisable = false;
            
        },

        async changeUserList(orgCode) {
            // 获取当前点击机构信息
            let {
                code,
                data: data1
            } = await this.getOrgDetail(orgCode);
            if (code == "success") {
                this.orgInfo = data1[0];
            }
            // let {code:orgRes_code,data:data} = await this.getParentOrgDetail(this.nodeInfo.parentCode)
            let {
                code: orgRes_code,
                data: data
            } = await this.getParentOrgDetail(
                this.orgInfo.unitParentId
            );
            // 获取当前点击机构父机构信息
            if (orgRes_code == "success") {
                if (!!data) {
                    this.orgInfo.parentName = data.orgName;
                } else {
                    this.orgInfo.parentName = "";
                }
            }
            let user_res = await this.getUserInfo(orgCode);
            // 处理用户信息列表数据
            if (user_res.code == "success") {
                let rows = user_res.data.rows;
                let arr = [];
                this.userList = [];
                if (!!rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        this.userList.push({
                            userName: rows[i].name,
                            roleList: rows[i].belongRoleName.split(","),
                            selected: false
                        });
                    }
                    this.userList[0].selected = true;
                }
            }
        },
        // 树节点后增删改查按钮点击
        async handleTreeOperate(operateType, {
            node,
            data
        }) {
            // 接到
            
            
            
            
            if (operateType == "add") {
                this.appendDialogVisable = true;
                // 获取节点详细信息
                await this.dialogData(data.orgCode);
                // 加载下拉
                {
                    let {
                        code,
                        data: unit_data
                    } = await this.queryChildUnit({
                        unitId: data.orgCode
                    });
                    if (code == "success") {
                        this.orgInfoFormSelectData = unit_data;
                    }
                }
            }
            if (operateType == "delete") {
                this.$confirm("你好!").then((node, data) => {});
            }
        },
        // 机构下来时重新加载表单
        async dialogData(value) {
            // orgCode
            {
                let {
                    code,
                    data
                } = await this.getOrgDetail(value);
                if (code == "success") {
                    [this.orgInfoFormObj] = data;
                }
            }
        },
        changeRoleList(index, item) {
            // for(var i=0;i<this.userList.lenght;i++){
            //
            //     this.userList[i].selected = false;
            //
            // }
            this.userList.forEach((value, index) => {
                value.selected = false;
            });
            this.userList[index].selected = true;
            this.roleList = item.roleList;
        },
        async handleTreeNodeClick({
            node,
            data,
            obj
        }) {
            await this.changeUserList(data.orgCode);
            this.nodeInfo = data;
            this.roleList = this.userList[0].roleList;
        },
        async getOrgDetail(orgCode) {
            let res = await api.get(
                api.forent_url.e_record_url + "/record/enterprises/1/" + orgCode
            );
            if (res.code != "success") {
                this.$message.error("机构信息请求失败!");
            }
            return res;
        },
        async getParentOrgDetail(orgCode) {
            let res = await api.get(api.forent_url.base_url + "/sys/org/" + orgCode);
            if (res.code != "success") {
                this.$message.error("父级机构信息请求失败");
            }
            return res;
        },
        //请求用户信息的数据
        async getUserInfo(orgCode) {
            let res = await api.post(api.forent_url.url + "/user/list/", {
                pageSize: 50,
                pageNo: 1,
                orgCode: orgCode
            });
            if (res&&res.code != "success") {
                this.$message.error("用户数据请求失败!");
            }
            return res;
        },
        // 添加节点
        async saveOrg(params) {
            let res = await api.post(
                api.forent_url.base_url + "/sys/org/save",
                params
            );
            res.code == "success" ? "" : this.$message.error("添加失败!");
            return res;
        },
        async validateOrgIsExistByOrgCode(params) {
            let res = await api.post(
                api.forent_url.base_url + "/sys/org/isExistByOrgCode",
                params
            );
            if (res&&res.code != "success") {
                this.$message.error("该机构已存在");
            }
            return res;
        },
        async updateOrgRemark(params) {
            let res = await api.post(
                api.forent_url.e_record_url + "/enterpriseunit/updateUnitInfo",
                params
            );
            if (res&&res.code != "success") {
                this.$message.error("更新备注失败!");
            }
            return res;
        },
        // 更新树信息
        async updateParentAndReOrder(params) {
            let res = await api.post(
                api.forent_url.base_url + "/sys/org/updateParentAndReOrder",
                params
            );
            if (res&&res.code != "success") {
                this.$message.error("节点更新失败");
            }
            return res;
        },
        // 查询子单位信息
        async queryChildUnit(params) {
            let res = await api.post(
                api.forent_url.e_record_url + "/enterpriseunit/queryChildUnit",
                params
            );
            if (res&&res.code != "success") {
                this.$message.error("请求子机构信息失败");
            }
            return res;
        }
    },
    watch: {}
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
            overflow: hidden;
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
            .content {
                margin: 15px;
                height: calc((100vh - 20rem) / 2);
                $header_height: 40px;

                .content_header {
                    // width:100%;
                    height: $header_height;
                    text-align-last: left;
                    line-height: 3rem;
                    color: #2892e2;

                    padding: {
                        left: 2.4rem;
                    }
                }

                .content_body {
                    height: calc(100% - #{$header_height});

                    .list {
                        width: 100%;
                        text-align-last: left;
                        text-indent: 2rem;
                        text-align: left;

                        .list_item {
                            cursor: pointer;
                            transition: 0.2s;

                            &.active {
                                background-color: #d4e5ff;
                            }

                            &:hover {
                                background-color: #eef3fc;
                            }
                        }
                    }

                    table {
                        width: 100%;
                        padding-left: 2rem;

                        td {
                            height: 3rem;
                            font-size: 1.6rem;
                            color: rgb(100, 100, 101);
                        }

                        td:nth-child(2n-1) {
                            width: 5%;
                            text-align: justify;
                        }

                        td:nth-child(2n-1)>span {
                            display: inline-block;
                            /*padding-left: 100%;*/
                        }

                        td:nth-child(2n) {
                            width: 22%;
                            /*color: #787878;*/
                            color: #232323;
                        }
                    }
                }

                .table_wrapper {
                    padding: {
                        left: 2rem;
                        right: 2rem;
                        top: 2rem;
                        bottom: 2rem;
                    }
                }
            }

            .wrapper_border {
                border: 1.5px solid #d5dde6;
                border-radius: 5px;
                box-sizing: border-box;
            }

            .border_bottom {
                border-bottom: 1.5px solid #d5dde6;
            }

            // .main-header {
            //     font-size: 1.8rem;
            //     padding: .1rem 1.6rem;
            // }
            // .gg-organize-list__title,
            // .gg-organize-detail__title,
            // .gg-organize-user__title,
            // .gg-organize-admin__title {
            //     padding-left: 2.4rem;
            //     height: 3rem;
            //     line-height: 3rem;
            //     border: 2px solid #d5dde6;
            // }
            // .gg-organize-detail__body {
            //     border: 2px solid #d5dde6;
            //     margin-top: 1.5rem;
            //     height: calc((100vh - 20rem) /2);
            //     padding: 1rem 1rem 1rem 2rem;
            // }
            // .gg-organize-detail__body table {
            //     width: 100%;
            //     padding-left: 2rem;
            // }
            // .gg-organize-detail__body table td {
            //     height: 3rem;
            //     font-size: 1.6rem;
            //     color: rgb(100, 100, 101);
            // }
            // .gg-organize-detail__body table td:nth-child(2n-1) {
            //     width: 5%;
            //     text-align: justify;
            // }
            // .gg-organize-detail__body table td:nth-child(2n-1)>span {
            //     display: inline-block;
            //     /*padding-left: 100%;*/
            // }
            // .gg-organize-detail__body table td:nth-child(2n) {
            //     width: 22%;
            //     /*color: #787878;*/
            //     color: #232323;
            // }
            // .gg-organize-admin {
            //     margin-top: 1.3rem;
            //     display: inline-block;
            //     float: left;
            //     width: 49%;
            //     background: #fff;
            // }
            // .gg-organize-admin__body {
            //     margin: 0 !important;
            //     height: 31.5rem;
            //     border: 2px solid #d5dde6;
            //     border-top: 0;
            //     overflow: hidden;
            //     overflow-y: scroll;
            //     height: calc((100vh - 20rem)/2);
            // }
            // .gg-organize-user {
            //     margin-top: 1.3rem;
            //     display: inline-block;
            //     float: right;
            //     width: 49%;
            //     background: #fff;
            // }
            // .gg-organize-user__body {
            //     height: 20rem;
            //     border: 2px solid #d5dde6;
            //     overflow: hidden;
            //     border-top: 0;
            //     height: calc((100vh - 20rem)/2);
            // }
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
