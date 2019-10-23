<template>
  <div>
    <el-container>
      <el-aside width="18vw">
        <div class="closeBox">
          <div class="title">
            <span class="tit-span">组织机构</span>
            <el-button-group class="tit-btns">
              <el-button type="primary" size="mini" icon="el-icon-plus" @click="orgOperation('add')"></el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="orgOperation('edit')"></el-button>
              <el-button type="primary" size="mini" icon="el-icon-close" @click="orgOperation('remove')"></el-button>
            </el-button-group>
          </div>
          <FilterTree style="margin-top:20px;" refData="transFormer" :data="tree.transFormer" :defaultProps="tree.props"
            @handleTreeNodeClick="handleTreeNodeClick" />
        </div>
      </el-aside>
      <el-main>
        <el-row class="header" :gutter="10">
          <el-col :span="5" class="title">
            <span>配置信息列表</span>
          </el-col>
          <el-col :span="19" class="right">
            <el-row>
              <el-col :span="12" :offset="3" class="right">
                <el-row>
                  <el-col :span="24">
                    <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleConfigClick('add')">新增配置</el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-input placeholder="请输入配置描述关键字" v-model.trim="searchUserName" ref="inputSearch" clearable @keyup.enter.native="handleSearch" style="outline: none;" size="mini">
                <el-button @click="handleSearch" slot="append" icon="el-icon-search" style="color:#409eff"></el-button>
                </el-input>

                
              </el-col>

            </el-row>
          </el-col>
        </el-row>
        <!--列表-->
        <el-row class="body">
          <div class="userNotab">
            <el-table ref="table" :data="tableData" style="width: 100%;" height="100%">
              <el-table-column label="配置ID" prop="key" show-overflow-tooltip min-width="20%"></el-table-column>
              <el-table-column label="配置值" prop="value" show-overflow-tooltip min-width="20%">
              </el-table-column>
              <el-table-column label="配置描述" prop="comment" show-overflow-tooltip min-width="50%">
              </el-table-column>
              <el-table-column min-width="18%" label="操作">
                <template slot-scope="scope">
                  <el-tooltip content="编辑" placement="bottom">
                    <i @click="handleConfigClick('edit',scope.row)" class="el-icon-edit icon-l-new l-icons"></i>
                  </el-tooltip>

                  <el-tooltip content="删除" placement="bottom">
                    <i @click="handleConfigClick('remove',scope.row)" class="el-icon-delete icon-l-new l-icons"></i>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <Pagination class="userPage" :widgetInfo="pageInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
          </div>
        </el-row>
      </el-main>
      <AddOrg :addVis="formObj.addFormVisible" :formObj="formObj" @userPageListener="userPageListener" />
      <AddConfig :addVis="configObj.show" :formObj="configObj" @configListener="configListener" />
    </el-container>

  </div>
</template>

<script>
  import api from "~/config/http";
  import common from '~/utils/common';
  import Pagination from "~/components/Pagination";
  import FilterTree from "~/components/FilterTree";
  import AddOrg from "~/components/SystemManagement/ConfigManagement/AddOrg";
  import AddConfig from "~/components/SystemManagement/ConfigManagement/AddConfig";

  export default {
    components: {
      Pagination,
      FilterTree,
      AddOrg,
      AddConfig
    },
    data() {
      return {
        searchUserName: "",
        configNode: '',
        parentId: '',
        configName: '',
        pageInfo: {
          pageNo: 1,
          pageSize: 6,
          total: 1,
        },
        tree: {
          transFormer: [],
          props: {
            label: "className",
            children: "children",
            isLeaf: "leaf"
          }
        },
        formObj: {
          addFormVisible: false,
        },
        configObj: {
          show: false
        },
        tableData: [],
        tempTreeData: []
      };
    },
    mounted() {
      this.initConfigTree();
    },
    methods: {
      initConfigTree() {
        api
          .post(api.forent_url.url + "/configclass/queryConfigClassTree.mvc")
          .then(res => {
            this.tree.transFormer = common.formatJSONTreeData(res, 'children', 'classId', 'parentId');
          });
      },
      getConfigList() {
        let params = {
          pageNo: this.pageInfo.pageNo,
          pageSize: this.pageInfo.pageSize,
          classId: this.configNode,
          comment: this.searchUserName
        };
        return api.post(api.forent_url.url + "/config/list.mvc", params).then(res => {
          if (!res.data) {}
          this.pageInfo.total = res.data.total;
          this.tableData = res.data.rows;
          this.listLoading = false;
        });
      },
      handleConfigClick(operateType, row) {
        // 判断本次操作是否执行
        var isExcute = false;
        let params = {};
        // 修改
        if (operateType === "add") {
          if (!this.configNode) {
            this.$message({
              type: "success",
              message: "请选择配置分类节点!"
            });
          } else {
            this.configObj = {
              show: true,
              title: "新增配置",
              configName: this.configName,
              configId: '',
              classId: this.configNode,
              formObj: {}
            }
          }

        }
        if (operateType === "edit") {
          api
            .post(api.forent_url.url + "/config/view.mvc", {
              configId: row.configId
            })
            .then(res => {
              if (res.code == "success") {
                let data = res.data;
                this.configObj = {
                  show: true,
                  title: "编辑配置",
                  configName: res.className,
                  configId: data.configId,
                  classId: data.classId,
                  formObj: row
                }
              }
            });

        }
        if (operateType === "remove") {
          var _this = this;
          this.$confirm("确认要删除选择的数据吗？", "通知", {
              confirmButtonText: "确定",
              cancelButtonText: "取消"
            })
            .then(() => {
              api
                .post(api.forent_url.url + "/config/delete.mvc", {
                  configId: row.configId
                })
                .then(res => {
                  let data = res.data;
                  if (res.success) {
                    _this.$message({
                      type: "success",
                      message: "操作成功"
                    });
                    this.getConfigList();
                  }
                });
            })
            .catch((a, b) => {});

          isExcute = true;
        }
        if (!isExcute) {
          return;
        }
      },
      // 处理input框回车搜索事件
      handleSearch() {
        this.getConfigList();
      },
      // 过滤树监听事件
      handleTreeNodeClick({
        data,
        obj,
        node
      }) {
        this.configNode = data.classId;
        this.parentId = data.parentId;
        this.configName = data.className;
        this.getConfigList();
      },
      sonHandleCurrentChange(pageInfo) {
        // 处理分页信息并赋值
        this.pageInfo.pageSize = (pageInfo.pageSize ? parseInt(pageInfo.pageSize) : this.pageInfo.pageSize);
        this.pageInfo.pageNo = (pageInfo.pageNo ? parseInt(pageInfo.pageNo) : this.pageInfo.pageNo);
        //重新加载列表
        this.getConfigList();
      },
      orgOperation(type) {
        switch (type) {
          case 'add':
            this.formObj = {
              addFormVisible: true,
              title: '新增配置类型',
              classId: '',
              configName: '',
              parentId: this.configNode ? this.configNode : '',
            }
            break;
          case 'edit':
            if (!this.configNode) {
              this.$message({
                type: "success",
                message: "请选择配置分类节点!"
              });
            } else {
              this.formObj = {
                addFormVisible: true,
                title: '修改配置类型',
                classId: this.configNode,
                parentId: this.parentId,
                configName: this.configName
              }
            }
            break;
          case 'remove':
            if (!this.configNode) {
              this.$message({
                type: "success",
                message: "请选择配置分类节点!"
              });
            } else {

              this.$confirm("确定要删除选择的数据吗？", "通知", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消"
                })
                .then(() => {
                  api.post(api.forent_url.url + "/configclass/delCfgCalss.mvc", {
                    classId: this.configNode
                  }).then(res => {
                    if (res.success) {
                      this.$message({
                        type: "success",
                        message: "删除成功!"
                      });
                      this.initConfigTree();
                      this.configNode = '';
                    } else {
                      this.$message({
                        type: "success",
                        message: res.msg
                      });
                    }
                  });
                })
                .catch(err => {
                  // this.$message({
                  //   type: "info",
                  //   message: "已取消删除"
                  // });
                });

            }
            break;
          default:
            break;
        }
      },
      userPageListener: function (type, val) {
        this.formObj.addFormVisible = val;
        this.initConfigTree(); //组织机构重置
      },
      configListener: function (type, val) {
        this.configObj.show = val;
        this.getConfigList();
      }
    }
  };

</script>

<style lang="scss" scoped>
  @import "~/assets/css/table.scss";

  [v-cloak] {
    display: none;
  }

  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background: rgba(32, 160, 255, 0.5) !important;
  }

  .l-icons {
    font-size: 2rem;
    cursor: pointer;
    color: #2892e2;
  }

  .el-container {
    height: calc(100vh - 75px);
    overflow: hidden;

    /* 左侧侧栏 */
    .el-aside {
      background-color: #fff;
      color: #333;
      border: 1px solid #bfcbd9;
      margin: 10px 10px 0 0;
      height: calc(100% - 13px);

      // 手风琴容器
      .el-collapse {
        .el-collapse-item {
          span.title {
            text-indent: 2em;
            font-size: 16px;
            color: #2892e2;

          }
        }
      }

      /* tree容器 */
      .closeBox {
        width: 100%;
        height: 100%;

        /* 标题 */
        .title {
          border-bottom: 1px solid #bfcbd9;
          margin: 0;
          line-height: 30px;
          padding: 5px;
          font-size: 16px;
          font-weight: bold;
          color: #2892e2;
          text-align: left;
          text-indent: 1em;
          padding: 5px;
          position: relative;

          .tit-span {
            margin-right: 15px;
          }

          .tit-btns {
            position: absolute;
            right: 10px;
          }
        }
      }

    }

    .el-main {
      position: relative;
      background-color: #fff;
      color: #333;
      border: 1px solid #bfcbd9;
      margin: 10px 0 0 0;
      padding: 0;
      height: calc(100% - 13px);

      .header {
        padding: 5px;
        border-bottom: 1px solid #bfcbd9;

        .title {
          // border-bottom: 1px solid #bfcbd9;
          margin: 0;
          line-height: 30px;
          padding: 0 10px 0 10px;
          font-size: 16px;
          font-weight: bold;
          color: #2892e2;
          text-align: left;
          // text-indent: 1em;
        }

        .right {
          text-align: right;

        }

        .left {
          text-align: left;
        }
      }

      .body {
        .userNotab {
          border: none;

          .el-pagination {
            height: 100%;
          }
        }

        .userPage {}

      }

      .is-ableClick {
        cursor: pointer;
      }

      .table-row {
        height: 46px;
      }

    }

    .left {
      text-align: left;
    }

  }

</style>
