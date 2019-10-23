<template>
    <div class="floor-wrapper">
        <div>
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="楼栋ID:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="楼层:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="" class="t-right">
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button type="primary" icon="el-icon-plus" class="mag-right-10" @click="handNewAddPlan()">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="notab">
            <el-scrollbar>
                <el-table v-loading="isLoading" :data="tableData" stripe>
                    <el-table-column align="left" min-width="10%" :show-overflow-tooltip="true" pageSize="pageSize" prop="planNo"
                                     label="C端ID">
                    </el-table-column>
                    <el-table-column align="left" min-width="15%" :show-overflow-tooltip="true" prop="planName" label="C端地址">
                    </el-table-column>

                </el-table>
            </el-scrollbar>
            <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
        </div>
        <div class="bottom-button">
            <el-button type="primary">保存</el-button>
            <el-button>重置</el-button>
        </div>
        <el-dialog title="新增信息" :visible.sync="dialogFormVisible">
            <el-form  label-position="left" inline class="demo-table-expand dialog-expand">
                <el-form-item label="C端ID:" :label-width="formLabelWidth">
                    <el-input auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="C端地址:" :label-width="formLabelWidth">
                    <el-input auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="C端名称:" :label-width="formLabelWidth">
                    <el-input auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址:" :label-width="formLabelWidth">
                    <el-input auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import api from '~/config/http';
    import Pagination from "~/components/Pagination";
    export default {
        name:'Bluetooth',
        components:{
            Pagination
        },
        props:['facilitiesInData'],
        data(){
            return{
                widgetInfo: {
                    total: null,
                    pageSize: 6,
                    pageNo: 1
                },
                tableData: [],
                isLoading: false,
                dialogFormVisible:false,
                formLabelWidth: '140px'
            }
        },
        methods:{
             loadData() {
                this.isLoading = true;
                 api.post(api.forent_url.base_url + '/inspection/plan/list.mvc?routingInspectionTypeId=C', {
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
            //新增弹框
            handNewAddPlan(){
                this.dialogFormVisible = true;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .floor-wrapper {
        font-size: 0;
        text-align: left;
        /deep/.demo-table-expand{
            font-size: 0;
            &.dialog-expand{
                .el-form-item{
                    margin-bottom: 8px;

                    label {
                        color: #0d87d4;
                        text-align: left;
                    }
                    .el-form-item__content{
                        width: calc(100% - 20px);
                    }
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

            .t-right{
                text-align: right;
                .mag-right-10{
                    margin-right: 10px;
                }
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

