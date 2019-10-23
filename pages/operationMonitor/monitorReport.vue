<template>
  <div class="main">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <Title />
          <div id="monitor" class="hasTab">
            <el-tabs  v-model.trim="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="用户管理" name="first">
                <div class="tabpane">
                    <!-- 筛选条件 -->
                    <MonitorSearch />
                    <!-- 表格 -->
                    <Table />
                </div>
              </el-tab-pane>
              <el-tab-pane label="配置管理" name="second">
                  <div class="tabpane">
                    <!-- 筛选条件 -->
                    <MonitorSearch />
                    <!-- 表格 -->
                    <Table />
                </div>
              </el-tab-pane>
              <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
              <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>



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
  //@/pages/authManagement/component/son.vue
  export default {
    components: {
      Title , MonitorSearch ,Table
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
  .hasTab {

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
  }

  .tabpane{position:relative;height:100%;}
  




 
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
