
<template>
    <div>
        <div class="l-head">
            <Title/>
        </div>
        <div  class="punctuation-wrapper">
            <div class="search-bar-wrapper">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="楼栋ID:">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="楼层:">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="" class="t-right">
                        <el-button type="primary" icon="el-icon-search"  class="mag-right-10">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-container class="punctuation-main">
                <el-aside width="220px">
                    <div class="pm-left">
                        <el-input
                                placeholder="输入关键字进行过滤"
                                v-model="filterText">
                        </el-input>
                        <el-tree
                                class="filter-tree"
                                :data="data2"
                                :props="defaultProps"
                                default-expand-all
                                :filter-node-method="filterNode"
                                ref="tree2">
                        </el-tree>
                    </div>
                </el-aside>
                <el-main>
                    <div class="pm-main">main</div>
                </el-main>
                <el-aside width="340px">
                    <div class="pm-right">
                        <div class="notab">
                            <el-scrollbar>
                                <el-table v-loading="isLoading" :data="tableData" stripe>
                                    <el-table-column align="left" min-width="10%" :show-overflow-tooltip="true" pageSize="pageSize" prop="planNo"
                                                     label="序号">
                                    </el-table-column>
                                    <el-table-column align="left" min-width="15%" :show-overflow-tooltip="true" prop="planName" label="设备名称">
                                    </el-table-column>
                                    <el-table-column align="left" min-width="15%" :show-overflow-tooltip="true" prop="planName" label="点位">
                                    </el-table-column>
                                    <el-table-column align="center" min-width="15%" label="操作">
                                        <template slot-scope="scope">
                                            <el-tooltip content="编辑" placement="bottom">
                                                <el-button type="text" icon="icon-l-new ggicon-modification" style="font-size: 16px" @click="handleEditPlan(scope.row)"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-scrollbar>
                            <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
                        </div>
                    </div>

                </el-aside>
            </el-container>
            <div class="bottom-button">
                <el-button type="primary">保存</el-button>
                <el-button>重置</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '~/config/http';
    import Title from '~/components/Title';
    import Pagination from "~/components/Pagination";
    export default {
        components:{
            Title,
            Pagination
        },
        data() {
            return {
                widgetInfo: {
                    total: null,
                    pageSize: 6,
                    pageNo: 1
                },
                filterText: '',
                tableData: [],
                isLoading: false,
                data2: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        methods:{
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            async loadData() {
                this.isLoading = true;
                await api.post(api.forent_url.base_url + '/inspection/plan/list.mvc?routingInspectionTypeId=C', {
                    pageSize: this.widgetInfo.pageSize,
                    pageNo: this.widgetInfo.pageNo,
                    orgId: api.getGlobalVal('userObj').orgCode,
                    isEnable: '',
                    searchStartDate: '',
                    searchEndDate: '',
                    dates: '',
                    planName: ''
                }, 5000).then(res => {
                    if (res.code === "success") {
                        // console.log(res)
                        this.isLoading = false;
                        this.tableData = res.data.rows;
                        this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
                        this.widgetInfo.pageSize = res.data.pageSize;
                        this.widgetInfo.pageNo = res.data.pageNo;
                    }
                }).catch(err => {
                    // console.log(err);
                    this.isLoading = false;
                    this.$message({
                        type: 'warning',
                        message: "加载超时,请重新加载!"
                    });
                });
            },
            // 分页
            sonHandleCurrentChange(widgetInfo) {
                this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
                this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
                this.loadData();
            },
            async handleEditPlan(planObj){
                this.plan = JSON.parse(JSON.stringify(planObj));
                this.dialogFormVisible = true;
                console.log(this.plan)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .punctuation-wrapper {
        background: #fff;
        height: calc(100vh - 138px);
        overflow: hidden;
        font-size: 0;
        text-align: left;
        .search-bar-wrapper{
            padding: 10px 5px;
            border-bottom: 1px solid #dcdcdc;
            margin-bottom: 5px;
            .t-right{
                text-align: right;
                .mag-right-10{
                    margin-right: 10px;
                }
            }
            .el-form-item {
                margin-right: 0;
                margin-bottom: 0;
                width: 33.3%;
                label {
                    width: 70px;
                    text-align: right;
                    padding-left:5px;
                    display: inline-block;

                }
                .el-form-item__content{
                    height: 43px;
                    width:calc(100% - 80px);
                    .span-show{
                        height:32px;
                        display:inline-block;
                        width: auto;
                        max-width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .el-container.punctuation-main{
            height: calc(100vh - 270px);
            .el-main{
                height: calc(100vh - 270px);
            }
            .pm-left{
                margin: 0 5px;
            }
            .pm-right{
                margin: 0 5px;
            }
        }
        .bottom-button{
            text-align: right;
            padding:20px 15px 10px 0;
            border-top: 1px dashed #dcdcdc;
            margin: 10px 0;

        }
    }

</style>

