<template>
<div class="menu-dialog">
    <el-dialog :title="title" :visible="show" width="30%" @close="onClose">
        <el-form :model="menuObj" :ref="refName" label-width="150px" :rules="rules">
            <el-form-item label="菜单名称" prop="menuName">
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-input clearable  :rows="4"  v-model.trim="menuObj.menuName"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="菜单别名" prop="menuAlias">
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-input clearable  :rows="4"  v-model.trim="menuObj.menuAlias"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="菜单url" prop="menuUrl">
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-input clearable  :rows="4"  v-model.trim="menuObj.menuUrl"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="菜单图片" prop="iconUrl">
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-input clearable  :rows="4"  v-model.trim="menuObj.iconUrl"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="所属组件名称" prop="moduleName">
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-input clearable  :rows="4"  v-model.trim="menuObj.moduleName"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="序号" prop="menuOrder">
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-input clearable  :rows="4"  v-model.trim="menuObj.menuOrder"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="同步到其它系统" prop="belongSystemCode">
                <FilterTree :ref="refTree" :data="treeData" :nodeKeyName="'systemCode'" :checkedArray="checkedArray" :check="true" :defaultProps="props"></FilterTree>
            </el-form-item>
        </el-form>

        <span slot="footer">
                    <el-button @click="onClose">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
                </span>
    </el-dialog>
</div>
</template>

<script>
import FilterTree from "~/components/FilterTree"
import common from "~/utils/common"
import api from "~/config/http"
export default {
    name: 'menu-dialog',
    props: {
        title: String,
        show: Boolean,
        data: '',
        treeData: {
            require: true,
            type: Array,
            default: () => {
                return []
            }
        },
        systemCode:'',
        checkedArray: {
            default: ()=>[],
            type:Array,
        },
        props: {
            default () {
                return {
                    label: 'systemName',
                    children: 'children',
                    isLeaf: 'leaf'
                }
            },
            type: Object
        }
    },
    components: {
        FilterTree
    },
    data() {

        return {
            refName: 'menu-dialog',
            refTree: 'menu-tree',
            menuObj: {
                systemCode: '',
                parentId: '',
                menuId: '',
                menuFlag: '',
                belongSystemCode: [],
                oldBelongSystemCode: [],
                oldMenuUrl: '',
                menuName: '',
                menuAlias: '',
                menuUrl: '',
                iconUrl: '',
                moduleName: '',
                menuOrder: '',
            },
            rules: {
                menuName: {
                    required: true,
                    message: '菜单名称不能为空',
                    trigger: "blur",

                },
                menuUrl: {
                    required: true,
                    message: '菜单url不能为空',
                    trigger: "blur"
                },
                moduleName: {
                    required: true,
                    message: '所属组件名称不能为空',
                    trigger: "blur"
                },
                menuOrder: [{
                            
                        message: '不能为空',
                        trigger: "blur",
                    },
                    {
                        pattern: /\d+/,
                        message: '序号必须为数字'
                    }
                ],
            },
        }
    },
    methods: {
        onSubmit() {
            let checked = this.$refs[this.refTree].$refs['filter-tree'].getCheckedNodes();
            let checkedIds = [];
            for (let i = 0; i < checked.length; i++) {
                checkedIds.push(checked[i].systemCode);

            }
            this.menuObj.belongSystemCode = checkedIds.join(',')
            
            if(!this.data){
                
                api.post(api.forent_url.url + '/menu/save.mvc', {
                    systemCode: this.menuObj.systemCode||this.systemCode,
                    parentId: this.menuObj.parentId||'-1',
                    menuId: this.menuObj.menuId,
                    menuFlag: this.menuObj.menuFlag,
                    belongSystemCode: this.menuObj.belongSystemCode,
                    oldBelongSystemCode: this.menuObj.systemCode,
                    oldMenuUrl: this.menuObj.oldMenuUrl,
                    menuName: this.menuObj.menuName,
                    menuAlias: this.menuObj.menuAlias,
                    menuUrl: this.menuObj.menuUrl,
                    iconUrl: this.menuObj.iconUrl,
                    moduleName: this.menuObj.moduleName,
                    menuOrder: this.menuObj.menuOrder,
                }).then(res => {
                    if (res.code === 'success') {
                        
                        this.$message({
                            message: '创建成功',
                            type: 'success',
                        })
                        // this.$emit(,res.data);        
                        // this.$emit('close');
                        this.$emit('menuDialogSubmit',{type:'add',value:res.data});
                    }
                });
            }else{
                api.post(api.forent_url.url + '/menu/save.mvc', {
                        systemCode: this.menuObj.systemCode||this.systemCode,
                        parentId: this.menuObj.parentId||'-1',
                        menuId: this.menuObj.menuId,
                        menuFlag: this.menuObj.menuFlag,
                        belongSystemCode: this.menuObj.belongSystemCode,
                        oldBelongSystemCode: this.menuObj.systemCode,
                        oldMenuUrl: this.menuObj.oldMenuUrl,
                        menuName: this.menuObj.menuName,
                        menuAlias: this.menuObj.menuAlias,
                        menuUrl: this.menuObj.menuUrl,
                        iconUrl: this.menuObj.iconUrl,
                        moduleName: this.menuObj.moduleName,
                        menuOrder: this.menuObj.menuOrder,
                }).then(res => {
                    if (res.code === 'success') {
                        this.$message({
                            message: '修改成功',
                            type: 'success',
                        })
                        // this.$emit(,res.data);        
                        // this.$emit('close');
                    }
                });
            }
            this.complete();
            
        },
        onClose() {
            this.complete()
        },
        complete(){
            this.$refs[this.refName].resetFields();
            this.$emit('close')
            
        }
    },
    mounted() {
        // 切断传入数据与vue的联系,防止父组件数据发生篡改
        this.treeData;
        this.checkedArray;
        if (!!this.data) {
            this.menuObj = this.data;
        }

    },

}
</script>

<style lang="scss" scoped>
.menu-dialog {}
</style>
