<template>
    <!-- 动态版表格 -->

    <!-- 设施名称	设施类型	设施地址	运行状态	回路点位	数据时间 -->
    <el-col :span="24">
        <el-table :data="dataList.rows" stripe  :row-style="rowStyle" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
            <el-table-column v-for="header in headers" :prop="header.prop" :key="header.prop" show-overflow-tooltip :label="header.label" ></el-table-column>
            <!-- :width="header.percentWidth*parentWidth+'px'" -->
            <!-- <el-table-column prop="deviceName" label="設備名稱" width="180"></el-table-column>
            <el-table-column prop="deviceTypeName" label="设备类型" width="180"></el-table-column>
            <el-table-column prop="deviceAddress" label="设备地址" width="180"></el-table-column> -->
        </el-table>
                
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="dataList.pageNo" :page-size="dataList.pageSize" layout="total,prev, pager, next, jumper" :total="dataList.total">
                        <!-- TODO: 使用公共分页组件 2018年12月14日 -->
        </el-pagination>
    </el-col>
    <!-- <div class="table">

    </div> -->
</template>

<script>
export default {
    props: ['dataList', 'widgetInfo', 'loading', 'headers', 'tab',],
    mounted() {
        console.log('document.body.clientWidth :', document.body.clientWidth);
        console.log('process.browser', process.browser);
        console.log('window.navigator.userAgent',window.navigator.userAgent);
        // this.init();

    },
    created() {},
    data() {
        return {
            currentPage: 1,
            total: null,
            parentWidth:1920,
            tableData: [],
            rowStyle: {
                'height': '48px',
                'font-size':'17px',
            },
            cellStyle:{
                'font-size':'16px',
            },
            headerCellStyle: {
                'height': '60px',
                'background-color': '#eef5fc',
                'font-size':'15px',
            }
        }
    },
    computed: {
    },
    methods: {
        // init(val) {
        //     // 计算当前浏览器元素的宽度
        //     var table = $('#dataTable');
        //     var width = 0;
        //     if(this.isIE()){
        //         width= table.width()-40;
        //     }else{
        //         width= table.width()-40;
        //     }
        //     this.parentWidth = width;
        //     console.log('width:',width);
        //     console.log('this.parentWidth :', this.parentWidth);
        // },
        initWidth(){

        },
        handleSizeChange(val) {
            // this.$emit('',);
        },
        handleCurrentChange(val) {

            this.$emit('sonHandleCurrentChange', {
                pageNo: val
            });
        },
        
        runState_formatter(row, column, cellValue, index) {
            return this.transformRunState(cellValue);
        },
        transformRunState(key) {
            var transTxt = '';
            switch (key) {
                case '':
                    return '全部';
                    break;
                case 0:
                    return '正常';
                    break;
                case 1:
                    return '报警';
                    break;
                case 2:
                    return '故障';
                    break;
                case 3:
                    return '其他';
                    break;
                default:
                    return '全部';
            }
        },
         isIE() {
                if (!!window.ActiveXObject || "ActiveXObject" in window){
                    return true;
                }else{
                    return false;
                }
            } ,
        // rowStyle(row,index){
        //     return 'height:48px';
        // },
        // headerRowStyle(row,index){
        //     return 'height:48px;background:#eef5fc';
        // }
    },

}
</script>

<style lang="scss" scoped>
/* 表格 */
.table {
    width: 100vw;
    overflow-y: hidden;
}

.hasTab {
    // .table {
    //     // height:calc(100% - 64px);
    //     width:calc(100vw - 600px);
    //     height: calc(100vh - 240px);
    //     position: relative;
    // }
    // .el-pagination {
    //     float: right;
    //     margin-top: 2rem;
    // }
}

.noTab {
    // .table {
    //     // height:calc(100% - 64px);
    //     width:calc(100vw - 285px);
    //     height: calc(100vh - 240px);
    //     position: relative;
    // }

    // .el-pagination {
    //     position: absolute;
    //     bottom: 2.1rem;
    //     right: 5rem;
    // }
    // .el-pagination {
    //     float: right;
    //     margin-top: 2rem;
    // }
}

// .el-table tr {
//     td {
//         padding: 0 10px;
//     }
// }

// .el-table .el-table__row {
//     line-height: 48px;
// }

// .el-table thead th {
//     background: #eef5fc;
//     border-bottom: 1px solid #b2d2f2 !important;
// }

/* 分页样式 */
// .el-pager {
//     border: 1px solid #d1dbe5;
//     border-right: none;

//     li {
//         border-right: 1px solid #d1dbe5;
//     }

//     li.active {
//         background: #409EFF;
//         color: #fff;
//     }
// }
</style>
