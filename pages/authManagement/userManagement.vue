<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <p class="tit">组织机构</p>
        <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[1]" :default-checked-keys="[2]"
          :props="defaultProps">
        </el-tree>
      </el-aside>
      <el-main>
        <div class="tit">
          <span>用户管理</span>
          <el-radio-group  v-model.trim="tabPosition" style="margin-left:250px;">
            <el-radio-button label="活动用户">活动用户</el-radio-button>
            <el-radio-button label="注销用户">注销用户</el-radio-button>
          </el-radio-group>
        </div>
        <el-tabs :tab-position="tabPosition" style="height: 200px;">
          <!--列表-->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="序号" type="index">
              </el-table-column>
              <el-table-column label="姓名" prop="name">
              </el-table-column>
              <el-table-column label="用户名" show-overflow-tooltip prop="userName">
              </el-table-column>

              <el-table-column label="角色" width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                      <a size="medium">{{ scope.row.name }}</a>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="状态" :formatter="statusEve" prop="status">
              </el-table-column>
              <el-table-column min-width="100" label="操作">
                <template slot-scope="scope">
                  <el-tooltip content="修改" placement="bottom">
                    <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                  </el-tooltip>
                  <el-tooltip content="修改" placement="bottom">
                    <el-button size="mini" type="success" icon="el-icon-delete"></el-button>
                  </el-tooltip>
                  <el-tooltip content="修改" placement="bottom">
                    <el-button size="mini" type="info" icon="el-icon-delete"></el-button>
                  </el-tooltip>
                  <el-tooltip content="修改" placement="bottom">
                    <el-button size="mini" type="warning" icon="el-icon-delete"></el-button>
                  </el-tooltip>
                  <el-tooltip content="删除" placement="bottom">
                    <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
                  </el-tooltip>

                </template>
              </el-table-column>
            </el-table>

        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 2,
            label: '一级 1-1'
          }, {
            id: 3,
            label: '一级 1-2'
          }, {
            id: 4,
            label: '一级 1-3'
          }, {
            id: 5,
            label: '一级 1-4'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [{
          name: '王小虎',
          userName: 'xiaohu',
          status: '0',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          name: '王小虎',
          userName: 'xiaohuxiaohuxiaohuxiaohuxiaohuxiaohuxiaohuxiaohuxiaohuxiaohuxiaohuxiaohuxiaohuxiaohu',
          status: '0',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          name: '王小虎',
          userName: 'xiaohu',
          status: '1',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          name: '王小虎',
          userName: 'xiaohu',
          status: '0',
          address: '上海市普陀区金沙江路 1516 弄'
        }]

      };
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      statusEve: function (row, column, cellValue, index) {
        return row.status == 0 ? "已激活" : "待激活"
      }

    },
    mounted() {},
  };

</script>
<style lang="scss" scoped>
  .tit {
    border-bottom: 1px solid #bfcbd9;
    margin: 0;
    line-height: 30px;
    padding: 0 0 0 10px;
  }

  .el-button--mini,
  .el-button--small {
    padding: 5px;
    margin: 2px;
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    border: 1px solid #bfcbd9;
    margin: 10px;
    height: inherit;
  }

  .el-main {
    background-color: #fff;
    color: #333;
    border: 1px solid #bfcbd9;
    margin: 10px;
    padding: 0;
   /*  height: -webkit-fill-available; */
    //height: fill-available;
  }

</style>
