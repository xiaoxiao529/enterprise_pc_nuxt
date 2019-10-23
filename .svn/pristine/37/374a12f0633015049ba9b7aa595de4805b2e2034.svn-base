<template>
  <div class="main">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <Title />
          <div id="monitor" class="noTab">
            <div class="tabpane">
              <!-- 筛选条件 -->
              <MonitorSearch />
              <!-- 表格 -->
              <Table />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import Title from "~/components/Title";
  import MonitorSearch from "~/components/MonitorSearch";
  import Table from "~/components/Table";
  export default {
    components: {
      Title,
      MonitorSearch,
      Table
    },
    data() {
      return {
        activeName2: 'first',
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
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
  .notab {
    height: calc(100% - 56px);

    .el-tab-pane {
      height: 100%;
      background-color: #fff;
      height: calc(100vh - 175px);
    }

    .el-tabs__header {
      margin-bottom: -5px;
    }

    .el-tabs--card>.el-tabs__header .el-tabs__nav {
      border-left: none;
    }

    .el-tabs__nav {
      line-height: 4rem;
      height: 4rem;
    }

    .el-tabs__content {
      background-color: #fff;
    }

    .el-tabs__item.is-top {
      font-size: 1.8rem;
      background: #f0f3fa;
      border-radius: 3px;
      box-shadow: 0 -2px 2px #c5cfe8;
      padding: 0 3rem;

    }

    .el-tabs__item.is-active {
      background-color: #fff;
    }

    .el-tabs__item.is-hover {
      background: none;
    }

    .table {
      height: calc(100vh - 197px);
    }
  }

  .tabpane {
    position: relative;
    height: 100%;
    background: #fff
  }

</style>
<style lang="scss" scoped>
  .main,
  .el-row,
  .el-col,
  .grid-content {
    height: 100%;
  }

  .grid-content {
    padding: 0 10px
  }

</style>
