<template>
    <el-container>
        <el-dialog
            title="角色配置"
            :visible="show"
            :before-close="handleClose"
            width="40%"
            :custom-class="'dialog'">
            <el-row>
                <el-col
                    :span="21"
                    :offset="3"
                    >
                        <el-scrollbar style="height:220px">
                            <el-tree
                                ref='role_tree'
                                default-expand-all
                                node-key="id"
                                :props="defaultProps"
                                :data="roleTree"
                                :default-checked-keys="checkedArr"
                                show-checkbox
                                @check-change="handleNodeCheckChange"></el-tree>

                        </el-scrollbar>
                        
                </el-col>

            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSubmit">保 存</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
import api from '~/config/http';
import Vue from 'vue'
import Router from 'vue-router'
import common from "~/utils/common"
export default {
    name: 'modify-role-user',
    props: {
        modifyRoleFormVisible: {},

        form: {},
        rules: {},
        show: {
            default: true
        }
    },
    data() {
        return {
            checkedArr: [],
            formLabelWidth: '120px',
            formVisble: this.show,
            roleTree: [],
            defaultProps: {
                children: 'children',
                label: 'title',
                disabled: 'chkDisabled'
            }
        };
    },
    mounted() {

        // this.$refs.role_tree.filter();
        this.initList();
        
    },
    methods: {
        handleClose(done) {
            
            this.$emit('userPageListener', 'ModifyRoleUser', false);
            // if(!done){
            //     debugger;
            //     this.$emit('userPageListener', 'ModifyRoleUser', false);
            // }else{
                
            // }
        },
        handleSubmit() {

            var checked = this.$refs['role_tree'].getCheckedKeys().join(',')
            let params = {
                id: this.form.id,
                selectedRoleIds: checked,
            }

            //设置角色 http://112.27.198.15:9832/enterprise-pc/user/roleConfig.mvc
            api.post(api.forent_url.url + '/user/roleConfig.mvc', params).then(res => {

                if (res.code === 'success') {
                    
                    this.$message({
                        type: 'success',
                        message: '角色修改成功'
                    })
                    this.$emit('userPageListener', 'ModifyRoleUser', true)
                }
            }).catch(err => {
                this.$message({
                    type: 'warn',
                    message: '角色修改失败'
                })
            })
            this.handleClose(true);
        },
        handleNodeCheckChange({
            id
        }, isChecked) {

            if (!this.checkedArr.indexOf(id) >= 0 && isChecked) {
                this.checkedArr.push(id);
            }
        },
        // filterNode(value, data, node) {
        //     
        //     
        //     
        //     
        //     
        //     
        //     
        // },
        initList() {
            // 请求所有角色 http://112.27.198.15:9832/enterprise-pc/user/allroles.mvc

            let params = {
                id: this.form.id
            }

            api.post(api.forent_url.url + '/user/allroles.mvc', params)
                .then(res => {

                    if (res.code == "success") {

                        var data = [];
                        res.data.forEach(function (value, index) {
                            if (!value.chkDisabled && value.checked) {
                                data.push(value.id);
                            }

                        })

                        this.roleTree = common.formatJSONTreeData(res.data, 'children', 'id', 'parentId');

                        this.checkedArr = data;
                    }
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '加载失败!'
                    });
                })
        },

        //将同级父子json转换成嵌套父子
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
                    title: data.title,
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
        }
    },
    watch: {
        show() {
            this.visible = this.show;
        },

    }
}
</script>

<style lang="scss" scoped>

    // .el-dialog {
    //     // display: flex;
        
    //     .el-dialog__body {
    //         max-height: 100px;
    //         overflow: auto
    //     }
    // }

</style>
