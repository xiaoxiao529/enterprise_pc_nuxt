<template>
  <div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="10" layout="total,prev, pager, next, jumper" :total="100">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentPage: 1,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }

</script>
<style lang="scss">
  /* 表格 */
  .hasTab {
    .table {
      // height:calc(100% - 64px);
      height: calc(100vh - 240px);
      position: relative;
    }

    .el-pagination {
      position: absolute;
      bottom: 2rem;
      right: 5rem;
    }
  }

  .noTab {
    .table {
      // height:calc(100% - 64px);
      height: calc(100vh - 196px);
      position: relative;
    }

    .el-pagination {
      position: absolute;
      bottom: 2.1rem;
      right: 5rem;
    }
  }

  .el-table tr {
    td {
      padding: 0 10px;
    }
  }

  .el-table .cell {
    line-height: 48px;
  }

  .el-table--small td,
  .el-table--small th {
    padding: 0 10px;
  }

  .el-table thead th {
    background: #eef5fc;
    border-bottom: 1px solid #b2d2f2 !important;
  }

  /* 分页样式 */
  .el-pager {
    border: 1px solid #d1dbe5;
    border-right: none;

    li {
      border-right: 1px solid #d1dbe5;
    }

    li.active {
      background: #409EFF;
      color: #fff;
    }
  }

</style>
