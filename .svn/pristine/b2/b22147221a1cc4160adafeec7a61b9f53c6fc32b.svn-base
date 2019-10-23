<template>
    <div class="task-list-wrapper">
        <div class="l-head">
            <!-- 面包屑 -->
            <Title/>
        </div>

        <div class="task-list-content">
            <div class="task-list-top">
                <el-button type="primary" icon="el-icon-plus" @click="dialogAddVisible = true">新增</el-button>
            </div>
            <el-dialog title="新增类型" :visible.sync="dialogAddVisible">
                <div class="block height-200">
                    <el-cascader
                            :options="options"
                            filterable
                            v-model="selectedOptions"
                            change-on-select>
                    </el-cascader>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
            <div class="notab">

            </div>
        </div>
    </div>
</template>
<script>
    import api from '~/config/http';
    import Title from '~/components/Title';
    export default {
        components:{
            Title
        },
        data() {
            return {
                options: [{
                    value: '1',
                    label: '运营中心',
                    children: [{
                        value: '单位1',
                        label: '单位1111',

                    }, {
                        value: '单位2',
                        label: '单位2222',
                    }, {
                        value: '单位3',
                        label: '单位3333',
                    }]
                },{
                    value: '2',
                    label: '项目',
                    disabled: true
                }],
                selectedOptions: ['1'],
                dialogAddVisible:false
            }
        },
        methods:{

        }
    }
</script>
<style lang="scss" scoped>
    .task-list-content {
        background: #fff;
        padding:5px;
        .task-list-top{
            text-align: right;
            margin:5px 0;
            vertical-align: top;
            .el-button--primary{
                vertical-align: top;
            }
        }
        .height-200{
            padding: 30px 0;
        }
    }
    .notab {
        height: calc(100vh - 78px - 138px);
        width:100%;
        background:#fff;
        border:1px solid #e2e4e8;
    }
</style>

