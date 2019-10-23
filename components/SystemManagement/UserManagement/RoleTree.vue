<template>
<el-scrollbar :style="borderStyle">
    <el-tree :data="data" :props="defaultProps" node-key="id" @check="handleNodeClick" show-checkbox ref="tree" :default-expanded-keys="['ff808081614234ef0161426c5d850004','ff808081614234ef01614274cbf90021']"></el-tree>
</el-scrollbar>
</template>

<script>
import api from "~/config/http";
import Vue from "vue";
import Router from "vue-router";
export default {
    name: "role-tree",

    props: {
        refName: {
            require: true,
            type: String
        },
        height: {
            default: null,
        },
    },

    data() {
        return {
            data: [],
            defaultProps: {
                children: "children",
                label: "title",
                disabled: "chkDisabled"
            },
            getRoleListURL: "/user/allroles.mvc",
            getCurRoleURL: "/common/emsrole/getListByUserId.mvc"
        };
    },

    computed: {
        treeHeight() {
            if (this.height) {
                return this.height
            } else {
                return `unset`
            }
        },
        borderStyle() {
            return {
                height: this.treeHeight,
                border: '1px solid #d8d8d8',
                width: '90%',
                margin: '0px 20px',
                borderRadius: '5px'
            };
        }
    },

    mounted() {
        this.initTree();
    },

    methods: {
        initTree() {
            let params = {
                id: api.getGlobalVal("userObj").id
            };
            // FIXME:角色树逻辑不明白,暂时写死 2018年12月14日
            this.data = [{
                checked: false,
                text: "企业消防服务平台",
                title: "企业消防服务平台",
                hasCheck: false,
                id: "ff808081614234ef0161426c5d850004",
                leaf: false,
                parentId: "-1",
                chkDisabled: true,
                children: [{
                    checked: false,
                    hasCheck: false,
                    id: "ff808081614234ef01614274cbf90021",
                    leaf: false,
                    parentId: "ff808081614234ef0161426c5d850004",
                    text: "企业消防",
                    title: "企业消防",
                    chkDisabled: true,
                    children: [{
                        checked: false,
                        children: [],
                        hasCheck: true,
                        id: "2c91a663648ddd0d0164abc39405000d",
                        leaf: false,
                        parentId: "ff808081614234ef01614274cbf90021",
                        text: "企业超级管理员",
                        title: "企业超级管理员"
                    }]
                }]
            }];
            api.post(api.forent_url.url + this.getRoleListURL, params).then(res => {
                console.log("res");
                console.log(res);
                // this.data = this.formatJSON(this.hideTreeNode(1,res.data));
                // this.data = this.hideTreeNode(res.data);
                console.log('this.data :', this.data);
                this.data = this.formatJSON(res.data);
            });
            console.log("initTree", this.data);
        },

        formatJSON(json) {
            var ret = [],
                o = {};

            function add(arr, data) {
                var obj = {
                    checked: data.checked,
                    children: [],
                    chkDisable: data.chkDisable,
                    hasCheck: data.hasCheck,
                    id: data.id,
                    leaf: data.leaf,
                    parentId: data.parentId,
                    text: data.text,
                    title: data.title
                };
                o[data.id] = obj;
                arr.push(obj);
            }

            json.forEach(x => {
                if (o[x.parentId]) {
                    add(o[x.parentId].children, x);
                } else {
                    add(ret, x);
                }
            });

            return ret;
        },
        hideTreeNode(rolesData) {
            var id = api.getGlobalVal("userObj").id;
            var fire_manager_role = api.fire_manager_role;
            var curRoles = api.getGlobalVal("cur_usr_roles");
            console.log("hideTreeNode:", curRoles);
            console.log("fire_manager_role", fire_manager_role);
            for (var index in curRoles) {
                console.log("hideTreeNode:", curRoles[index]);
                var role = curRoles[index];
                console.log("role", role, index);
                if (role == fire_manager_role.qyglyRoleId) {
                    console.log("qyglyRoleId");
                    var forbidRoles = [
                        fire_manager_role.qyglyRoleId,
                        fire_manager_role.qyaqglyRoleId,
                        fire_manager_role.qyaqzyRoleId,
                        fire_manager_role.snzyjsRoleId,
                        fire_manager_role.appRoleGroupId,
                        fire_manager_role.kdlaRoleId,
                        fire_manager_role.lyzyjsRoleId
                    ];
                    for (var o in rolesData) {
                        console.log("o");
                        console.log(rolesData[o]);
                        for (forbid_role in forbidRoles) {
                            // console.log(`rolesData[o] == forbidRoles[forbid_role]:${rolesData[o].id},${forbidRoles[forbid_role]}`);
                            if (rolesData[o].id == forbidRoles[forbid_role]) {
                                console.log("删除!", o);
                                Vue.delete(rolesData, o);
                            }
                        }
                    }
                }

                if (role == fire_manager_role.zglyRoleId) {
                    console.log("zglyRoleId");
                    var forbidRoles = [
                        fire_manager_role.qyglyRoleId,
                        fire_manager_role.zglyRoleId,
                        fire_manager_role.snzyjsRoleId,
                        fire_manager_role.appRoleGroupId,
                        fire_manager_role.kdlaRoleId,
                        fire_manager_role.lyzyjsRoleId
                    ];

                    for (o in rolesData) {
                        console.log("o");
                        console.log(o);
                        for (var forbid_role in forbidRoles) {
                            if (rolesData[o].id == forbidRoles[forbid_role]) {
                                console.log("删除!", o);
                                Vue.delete(rolesData, o);
                            }
                        }
                    }
                }
            }

            console.log("rolesData", rolesData);
            return rolesData;
        },
        handleNodeClick(e, v) {
            console.log(e, v);
            var arr = this.$refs.tree.getCheckedNodes(true);
            var ids = [];
            arr.forEach(function (value) {
                ids.push(value.id);
            })
            console.log('ids:', ids);
            this.$emit('userPageListener', 'roleTreeChange', ids.join(','))
        }
    },
    watch: {
        show() {
            console.log('进入watch!');
            this.initTree();
        }
    }

};
</script>

<style lang="scss" scoped>
.role-tree {
    margin: 0 20px;
}
</style>
