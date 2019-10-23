<template>
    <el-row class="filter-tree">

        <el-row>
            <el-col :span="inputWidth" :offset="inputOffset">
                <el-input
                    clearable
                    placeholder="请输入过滤内容"
                     v-model.trim="filterText"
                    style="text-align:center"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <!-- <el-scrollbar> -->
            <el-col :span="treeWidth" :offset="treeOffset" style="">
                <!-- 业务基础平台组织树 -->
                
                <!-- <div v-if="!treeHeight">
                <el-tree
                    empty-text
                    :ref="refData"
                    v-cloak
                    :props="defaultProps"
                    :data="data"
                    
                    :default-checked-keys="checkedArray"                
                    :filter-node-method="filterNode"
                    :node-key="nodeKeyName"
                    :show-checkbox="check"
                    accordion
                    @node-click="handleNodeClick"
                    @node-contextmenu="hanleContextmenu"
                    @remove="removeTree"
                    :highlight-current="flag"></el-tree>
                </div> -->

                <el-scrollbar :style="treeStyleObj">
                <!-- <div :style="treeStyleObj"> -->
                    <el-tree
                        empty-text
                        :ref="refData"
                        v-cloak
                        :props="defaultProps"
                        :data="data"
                        
                        :default-checked-keys="checkedArray"                
                        :filter-node-method="filterNode"
                        :node-key="nodeKeyName"
                        :show-checkbox="check"
                        accordion
                        @node-click="handleNodeClick"
                        @node-contextmenu="hanleContextmenu"
                        @remove="removeTree"
                        :highlight-current="flag"></el-tree>
                    <!-- </div> -->
                    </el-scrollbar>
            </el-col>
            <!-- </el-scrollbar> -->
        </el-row>

    </el-row>
</template>

<script>
export default {
    name: "filter-tree",
    mounted() {
        
        
        
        
        
    },
    props: {
        // 父子关系树
        data: "",
        // data标签对应关系
        defaultProps: {
            default: {
                children: "children",
                label: "label",
                isLeaf: "leaf"
            }
        },
        // 是否启用懒加载
        lazy: {
            default: false,
            type: Boolean
        },
        // node-key指定属性
        nodeKeyName: {
            default: "id",
            type: String
        },
        // ref名称
        refData: {
            default: "filter-tree",
            type: String,
        },
        // 是否包含checkbox
        check: {
            default: false,
            type: Boolean
        },
        setCheckedKeys:{
            default: false,
            type:Boolean,
        },
        //已选中项数组
        checkedArray: {
            default: function () {
                return [];
            }, //对
            type: Array
        },
        inputWidth: {
            default: 20
        },
        inputOffset: {
            default: 2
        },
        treeWidth: {
            default: 20
        },
        treeOffset: {
            default: 2
        },
        treeHeight:{
            default:'',
        }
    },
    data() {
        return {
            // 过滤器v-modle对象
            filterText: "",
            flag: true,
            hasLoad:false,
        };
    },
    methods: {
        //过滤方法
        filterNode(value, data, node) {
            if (!value) return true;
            return node.label.indexOf(value) !== -1;
        },
        // 节点点击事件
        handleNodeClick(data, obj, node) {
            this.$emit("handleTreeNodeClick", {
                data,
                obj,
                node
            });
        },
        // 右键点击事件
        hanleContextmenu(event, obj, node, self) {},
        // 移除事件
        onCheckChange(node,data,obj){
            var parentId = node[this.nodeKeyName].parentId;
            var index = this.checkedArray.indexOf(parentId);
                if(index>0){
                    this.checkedArray.splice(index,1);
                }
            
        },
        removeTree(node, data) {},
        // 只设置子节点,不勾选父节点
        setCheckedkeys(arr){
            var filterParentNode =function(arr){

            };
            if(arr.length>0){
                for (let index = 0; index < arr.length; index++) {
                    var element = arr[index];

                    
                }
            }

        },
    },
    computed: {
        treeStyleObj(){
            

            var style = '';
            if (this.treeHeight){
                return {height:`${this.treeHeight}px`}
            }else{
                return {height:`unset`}
            }
          
        },
    },
    watch: {
        filterText(val) {
            this.$refs[this.refData].filter(val);
            
        },
        checkedArray(n,o){
            //解决复选过程中,后台传回的id中存在父id,则子元素全部被选中的问题
            for(var i=0;i<n.length;i++){

                var node = this.$refs['filter-tree'].getNode(n[i]);
                if(node){
                    var parentId = node.data.parentId;
                    var index = this.checkedArray.indexOf(parentId)
                    if(index>-1){
                        this.checkedArray.splice(index,1);
                    }
                }
                
            }
            this.$refs['filter-tree'].getCheckedKeys(n,false);
            
            
        }

    }
    
}
</script>

<style lang="scss" scoped>
.filter-tree {

    // 手风琴标题
    span.title {
        text-indent: 2em;
        font-size: 16px;
        color: #2892e2;
    }
}
</style><style lang="scss">
//  .scroll-bar{
//     min-height: 150px;
//     overflow-y: auto;
//     max-height: 150px;
//   }
</style>
