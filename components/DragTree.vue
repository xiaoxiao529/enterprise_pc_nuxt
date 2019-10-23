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
            <el-col :span="treeWidth" :offset="treeOffset">
                <!-- 业务基础平台组织树 -->

                <!-- <div v-if="!treeHeight"> -->
                    <el-scrollbar :style="treeStyle">
                        <el-tree
                            :ref="refData"
                            v-cloak
                            :props="defaultProps"
                            :data="data"
                            :draggable="draggable"
                            :default-checked-keys="checkedArray"
                            :filter-node-method="filterNode"
                            :node-key="nodeKeyName"
                            :show-checkbox="check"
                            accordion
                            :allow-drag="handleAllowDrag"
                            :allow-drop="handleAllowDrop"
                            @node-click="handleNodeClick"
                            @node-drag="handleNodeDrag"
                            @node-drag-start="handleDragStart"
                            @node-drag-enter="handleNodeDragEnter"
                            @node-drag-leave="handleDragLeave"
                            @node-drag-over="handleDragOver"
                            @node-drop="handleDrop"
                            @node-drag-end="handleDragEnd"
                            @remove="removeTree"
                            :highlight-current="flag">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>{{ node.label }}</span>
                                <span class="operation-btn">
                                    <span
                                        title="添加"
                                        class="fa fa-plus-square-o"
                                        @click.prevent="() => clickOperation('add',{node,data})">
                                    </span>
                                    <!-- <span
                                        title="删除"
                                        class="fa fa-trash"
                                        @click.prevent="() => clickOperation('delete',{node, data})">
                                    </span> -->
                                </span>
                            </span>
                        </el-tree>
                    </el-scrollbar>

                <!-- </div> -->

                <!-- <el-scrollbar v-if="treeHeight"> -->
                    <!-- <div :style="treeStyleObj">
                        <el-tree
                            :ref="refData"
                            v-cloak
                            :props="defaultProps"
                            :data="data"
                            :draggable="draggable"
                            :default-checked-keys="checkedArray"
                            :filter-node-method="filterNode"
                            :node-key="nodeKeyName"
                            :show-checkbox="check"
                            accordion
                            :allow-drag="handleAllowDrag"
                            :allow-drop="handleAllowDrop"
                            @node-click="handleNodeClick"
                            @node-drag="handleNodeDrag"
                            @node-drag-start="handleDragStart"
                            @node-drag-enter="handleNodeDragEnter"
                            @node-drag-leave="handleDragLeave"
                            @node-drag-over="handleDragOver"
                            @node-drop="handleDrop"
                            @node-drag-end="handleDragEnd"
                            :highlight-current="flag"></el-tree>
                    </div> -->
                <!-- </el-scrollbar> -->
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
        draggable: {
            default: false,
            type: Boolean,
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
        setCheckedKeys: {
            default: false,
            type: Boolean,
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
        treeHeight: {
            default: '',
        },
        treeStyle:{
            default:'',
        }
    },
    data() {
        return {
            // 过滤器v-modle对象
            filterText: "",
            flag: true,
            hasLoad: false,
        };
    },
    methods: {
        //过滤方法
        filterNode(value, data, node) {
            if (!value) return true;
            return node.label.indexOf(value) !== -1;
        },
        // 节点点击事件
        handleNodeClick(data, node,obj) {
            
            
            
            this.$emit("handleTreeNodeClick", {
                data,
                obj,
                node
            });
        },
        //判断是否可被拖拽
        handleAllowDrag(node){
            
            
            if(node.data.parentCode!='-1'){
                return true;
            }else{
                return false;
            }
            
        },
        handleAllowDrop(node,targetNode,nodePos){
            if(targetNode.data.parentCode=='-1'&&(nodePos=='prev'||nodePos=='next')){
                 return false
             }else{
                 return true
             }

        },
        // 右键点击事件
        hanleContextmenu(event, obj, node, self) {},
        // 拖拽释放
        handleDrop(node,targetNode,nodePos,event){
            
            this.$emit('dropNodeEnd', {node,targetNode,nodePos})
        },
        // 拖拽事件
        handleNodeDrag(node, targetNode, nodePos, event) {
        },
        // 拖拽喀什
        handleDragStart(node,targetNode,nodePos,event){
        },
        // 拖拽进入
        handleNodeDragEnter(node,targetNode,nodePos) {
            
        },
        // 拖拽离开
        handleDragLeave(node,targetNode,nodePos,event){
        },
        // 拖拽经过
        handleDragOver(node,targetNode,nodePos,event){
        },
        handleDragEnd(node,targetNode,nodePos){
            
            
        },
        // 移除事件
        onCheckChange(node, data, obj) {
            var parentId = node[this.nodeKeyName].parentId;
            var index = this.checkedArray.indexOf(parentId);
            if (index > 0) {
                this.checkedArray.splice(index, 1);
            }

        },
        removeTree(node, data) {},
        renderContent(h, {
            node,
            data,
            store
        }) {
            
            this.$set(data,'is_show',false);           
            // return (
            //     <span class="custom-tree-node" on-mouseenter={()=>{
            //                     
            //                   data.isShow = true;
            //                   this.$forceUpdate();
            //               }}
            //               on-mouseout={data=>{
            //                     
            //                   data.isShow = false;
            //                   this.$forceUpdate();
            //               }}
            //               >
            //         <span v-if="data.isShow">{node.label}</span>
            //         <span v-if="data.isShow">
            //             <el-button size="mini" type="text" 
            //              on-click={ () => this.append(data) }>Append</el-button>
            //             <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            //         </span>
            //     </span>);
            return h('span', 
            {
                //这里添加hover事件
                on: {
                    'mouseenter': () => {
                        
                        this.$set(data,'is_show',true);
                        
                        this.$nextTick(()=>{
                            this.$forceUpdate();
                        })
                    },
                    //鼠标离开
                    'mouseleave': () => {
                        
                        this.$set(data,'is_show',false);   
                        
                        this.$nextTick(()=>{
                            this.$forceUpdate();
                        })
                    }
                }
            }, [
                h('span', {
                    //显示名称
                }, node.label),
                h('span', {
                    style: {
                        display: data.is_show ? '' : 'none',
                    },
                }, [
                    //添加
                    h('el-button', {
                        props: {
                            type: 'text',
                            size: 'small',
                        },
                        style: {
                            marginLeft: "15px",
                        },
                        on: {
                            click: () => {
                                // ceshi
                                this.test(data)
                            }
                        }
                    }, "添加"),
                    h('el-button', {
                        props: {
                            type: 'text',
                            size: 'small',
                        },
                        style: {

                        },
                        on: {
                            click: () => {
                                // ceshi
                                this.test(node, data)
                            }
                        }
                    }, "删除"),
                ]),
            ]);
        },
        clickOperation(operateType,{node,data}){
            
            
            
            this.$emit('handleTreeOperate',
                operateType,{node,data})

        },
        // 只设置子节点,不勾选父节点
        setCheckedkeys(arr) {
            var filterParentNode = function (arr) {

            };
            if (arr.length > 0) {
                for (let index = 0; index < arr.length; index++) {
                    var element = arr[index];

                }
            }

        },
        showAppend(){

        },
        showRemove(){

        },
        test(){
            
        },
        

    },
    computed:{
    },
    watch: {
        filterText(val) {
            this.$refs[this.refData].filter(val);
            
        },
        checkedArray(n, o) {
            //解决复选过程中,后台传回的id中存在父id,则子元素全部被选中的问题
            for (var i = 0; i < n.length; i++) {

                var node = this.$refs['filter-tree'].getNode(n[i]);
                if (node) {
                    var parentId = node.data.parentId;
                    var index = this.checkedArray.indexOf(parentId)
                    if (index > -1) {
                        this.checkedArray.splice(index, 1);
                    }
                }

            }
            this.$refs['filter-tree'].getCheckedKeys(n, false);

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
    .custom-tree-node{
        .operation-btn{
            display: none;

        }
    }
    .custom-tree-node:hover{
        position: relative;
        .operation-btn{
            display: unset;
            color:#2892e2;
            font-size:16px;
            
            span:active{
                transition: .3s;
                position: relative;
                right: -1px;
                bottom: -1px;
                color:orange;
            }
        }
    }

}
</style>
