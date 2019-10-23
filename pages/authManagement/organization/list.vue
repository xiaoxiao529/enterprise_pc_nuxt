<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <div class="closeBox" @click="closeBox()">
          <p class="tit">组织机构</p>
          <!-- :default-checked-keys="[1]" :default-expanded-keys="[1]" @node-expand="handleNodeClick"-->
          <ul id="treeDemo" class="ztree">

          </ul>
          <ol v-show="menuVisible" id="menu" class="orgBox" ref="menu">
            <li>
              <!--  @click="addUserEve()" -->
              <nuxt-link :to="{'name':'authManagement-organization-orgAdd','params':{'orgObj':orgObj}}">添加</nuxt-link>
            </li>
            <li v-show="firstLevel">
              <nuxt-link :to="{'name':'authManagement-organization-orgEdit','params':{'orgObj':orgObj}}">修改</nuxt-link>
            </li>
            <li @click="orgDel(node,orgObj)" v-show="firstLevel">删除</li>
          </ol>
        </div>
      </el-aside>
      <el-main>
        <div class="tit r">
          <span>用户管理</span>
          <!-- <nuxt-link :to="{'name':'authManagement-organization-add','params':{'orgObj':orgObj}}"> -->
          <el-button @click="addUpdate('authManagement-organization-add',orgObj)" class="addBtn" size="mini" type="primary"
            icon="el-icon-plus">新增用户</el-button>
          <!-- </nuxt-link> -->
          <el-radio-group  v-model.trim="userStatus" @change="changeUser" size="mini">
            <el-radio-button label="0">活动用户</el-radio-button>
            <el-radio-button label="1">注销用户</el-radio-button>
          </el-radio-group>

        </div>
        <!--列表-->
        <div v-loading="isLoad">
          <el-table ref="table" :data="tableData" style="width: 100%">
            <el-table-column label="序号" type="index">
            </el-table-column>
            <el-table-column label="姓名" prop="userName">
            </el-table-column>
            <el-table-column label="用户名" show-overflow-tooltip prop="loginName">
            </el-table-column>
            <el-table-column label="角色" v-if="cloShow" width="180">
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
                <el-tooltip content="编辑" placement="bottom">
                  <!-- <nuxt-link :to="{'name':'authManagement-organization-edit','params':{'rowDetail':scope.row}}"> -->
                  <el-button @click="addUpdate('authManagement-organization-edit',orgObj,scope.row)" size="mini" type="primary"
                    icon="el-icon-edit"></el-button>
                  <!-- </nuxt-link> -->
                </el-tooltip>
                <el-tooltip v-show="setFlag" content="注销" placement="bottom">
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click.stop="handleDelete(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip v-show="setFlag" :content="iconCont" placement="bottom">
                  <el-button size="mini" type="info" @click.stop="changeIcon(scope.$index, scope.row)" :icon="scope.row.status==0?'el-icon-unlock':'el-icon-lock'"></el-button>
                </el-tooltip>
                <el-tooltip v-show="setFlag" content="重置" placement="bottom">
                  <el-button size="mini" type="warning" icon="el-icon-minus-circle"></el-button>
                </el-tooltip>
                <el-tooltip v-show="setFlag" content="角色配置" placement="bottom">
                  <el-button size="mini" type="success" icon="el-icon-setting"></el-button>
                </el-tooltip>

                <el-tooltip v-show="!setFlag" content="还原" placement="bottom">
                  <el-button size="mini" type="warning" icon="el-icon-delete"></el-button>
                </el-tooltip>
              </template>

            </el-table-column>

          </el-table>
          <el-pagination small layout="total, prev, pager, next, jumper" @current-change="changePage" :current-page="pageNo"
            :page-size="pageSize" :total="total">
          </el-pagination>
        </div>
      </el-main>

    </el-container>

  </div>
</template>
<script>
  import api from '~/config/http'
  export default {
    data() {
      ///upmsUser/queryUserList
      let tenantId = "";
      let orgCode = -1;
      let curExpandNode = null;

      let filter = (treeId, parentNode, childNodes) => {
        if (!childNodes) return;
        if (!childNodes.data) return null;
        for (var i = 0, l = childNodes.data.length; i < l; i++) {
          childNodes.data[i].name = childNodes.data[i].orgName;
          childNodes.data[i].id = childNodes.data[i].orgId;
          childNodes.data[i].isParent = !childNodes.data[i].leaf;
        }
        return childNodes.data;
      };

      let singlePath = (newNode) => {
        if (newNode === curExpandNode) return;

        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
          rootNodes, tmpRoot, tmpTId, i, j, n;

        if (!curExpandNode) {
          tmpRoot = newNode;
          while (tmpRoot) {
            tmpTId = tmpRoot.tId;
            tmpRoot = tmpRoot.getParentNode();
          }
          rootNodes = zTree.getNodes();
          for (i = 0, j = rootNodes.length; i < j; i++) {
            n = rootNodes[i];
            if (n.tId != tmpTId) {
              zTree.expandNode(n, false);
            }
          }
        } else if (curExpandNode && curExpandNode.open) {
          if (newNode.parentTId === curExpandNode.parentTId) {
            zTree.expandNode(curExpandNode, false);
          } else {
            var newParents = [];
            while (newNode) {
              newNode = newNode.getParentNode();
              if (newNode === curExpandNode) {
                newParents = null;
                break;
              } else if (newNode) {
                newParents.push(newNode);
              }
            }
            if (newParents != null) {
              var oldNode = curExpandNode;
              var oldParents = [];
              while (oldNode) {
                oldNode = oldNode.getParentNode();
                if (oldNode) {
                  oldParents.push(oldNode);
                }
              }
              if (newParents.length > 0) {
                zTree.expandNode(oldParents[Math.abs(oldParents.length - newParents.length) - 1], false);
              } else {
                zTree.expandNode(oldParents[oldParents.length - 1], false);
              }
            }
          }
        }
        curExpandNode = newNode;
      };
      let zTreeOnClick = (event, treeId, treeNode) => {
        tenantId = this.tenantId = treeNode.tenantId;
        orgCode = this.orgCode = treeNode.orgCode;
        this.orgObj = treeNode;
        this.tempTreeData = treeNode.orgId;
        console.log("点击treenodes")
      };
      let zTreeOnBeforeExpand = (treeId, treeNode) => {
        tenantId = this.tenantId = treeNode.tenantId;
        orgCode = this.orgCode = treeNode.orgCode;
        this.isFirst = false;
        //通过onbeforeExpand 和 OnExpand 同级菜单只展开一个
        var pNode = curExpandNode ? curExpandNode.getParentNode() : null;
        var treeNodeP = treeNode.parentTId ? treeNode.getParentNode() : null;
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        for (var i = 0, l = !treeNodeP ? 0 : treeNodeP.children.length; i < l; i++) {
          if (treeNode !== treeNodeP.children[i]) {
            zTree.expandNode(treeNodeP.children[i], false);
          }
        }
        while (pNode) {
          if (pNode === treeNode) {
            break;
          }
          pNode = pNode.getParentNode();
        }
        if (!pNode) {
          singlePath(treeNode);
        }

      };

      let zTreeOnAsyncError = (event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) => {
        this.$message({
          type: 'error',
          message: '请求失败'
        });
      };

      let zTreeOnAsyncSuccess = (event, treeId, treeNode, msg) => {
        msg = JSON.parse(msg)
        if (msg.code == "success") {
          if (this.isFirst) {
            this.ztreeObj = $.fn.zTree.getZTreeObj("treeDemo");
            var nodeFirst = this.ztreeObj.getNodeByParam('id', 1);
            this.ztreeObj.selectNode(nodeFirst, true, true);
            this.orgObj = msg.data[0];
            this.tenantId = msg.data[0].tenantId;
            this.orgCode = msg.data[0].orgCode;
            this.tempTreeData = msg.data[0].orgId;
            //this.isFirst = false;
          }
          if (this.$route.params && this.$route.params.id) {
            this.openId = this.$route.params.id;
            tenantId = this.tenantId = this.$route.params.tenantId;
            orgCode = this.orgCode = this.$route.params.id;
            console.log(this.openId)
            var node = this.ztreeObj.getNodeByParam("id", this.openId, null);
            this.ztreeObj.cancelSelectedNode();
            this.ztreeObj.selectNode(node, true); //指定选中ID的节点
            if (this.isFirst) {
              this.ztreeObj.expandNode(node, true, true); //指定选中ID节点展开

            }
          }
        }
      };

      let zTreeOnRightClick = (event, treeId, treeNode) => {
        if (treeNode) {
          this.menuVisible = true;
          this.firstLevel = treeNode.level === 0 ? false : true;
          let menu = document.querySelector("#menu");
          menu.style.left = event.clientX + 20 + "px";
          menu.style.top = event.clientY - 60 + "px";
          this.orgCode = treeNode.orgCode;
          this.keys = treeNode.parentCode;
          this.orgObj = treeNode;
          this.node = treeNode;
        }

      };

      let zTreeOnExpand = (event, treeId, treeNode) => {
        curExpandNode = treeNode;
      };
      return {
        cloShow: false, //隐藏不显示的列
        userStatus: '0',
        setFlag: true,
        flag: true,
        isLoad: true,
        firstLevel: false,
        menuVisible: false,
        markFloat: 1,
        iconClass: 'el-icon-delete',
        iconCont: '已激活',
        orgObj: '',
        tenantId: '',
        orgCode: '',
        keys: [],
        node: '',
        pageNo: 1,
        pageSize: 2,
        total: 0,
        islock: true,
        isFirst: true,
        props: {
          label: 'orgName',
          children: 'zones',
          isLeaf: 'leaf'
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [],
        tempTreeData: "",
        zTreeObj: {},
        openId: '',
        setting: {
          // check: {
          //   enable: true,
          //   chkStyle: "radio",
          //   radioType: "all"   //对所有节点设置单选
          // },
          async: {
            enable: true,
            url: api.ajaxUrl + "/upmsOrg/findUpmsOrgTree", //只支持get
            autoParam: ["tenantId", "parentCode", "userId"],
            otherParam: {
              "tenantId": function () {
                return tenantId
              },
              "parentCode": function () {
                return orgCode
              }
            },
            dataFilter: filter
          },
          callback: {
            onClick: zTreeOnClick,
            beforeExpand: zTreeOnBeforeExpand,
            onAsyncError: zTreeOnAsyncError,
            onAsyncSuccess: zTreeOnAsyncSuccess,
            onRightClick: zTreeOnRightClick,
            onExpand: zTreeOnExpand,
          }
        },
        treeNode: [],
        zNodes: [{
            name: "test1",
            open: true,
            children: [{
              name: "test1_1"
            }, {
              name: "test1_2"
            }]
          },
          {
            name: "test2",
            open: true,
            children: [{
              name: "test2_1"
            }, {
              name: "test2_2"
            }]
          }
        ]
      }
    },
    methods: {

      addUpdate(name, orgObj, rowObj) {
        if (JSON.stringify(this.orgObj) == "{}") {
          this.$message({
            type: "warning",
            message: '请先选择组织机构!'
          })
        } else {
          var params = {}
          if (rowObj) {
            params = {
              orgObj: orgObj,
              rowObj: rowObj ? rowObj : null
            }
          } else {
            params = {
              orgObj: orgObj
            }
          }
          this.$router.push({
            name: name,
            params: params
          })
        }
        // if(this.orgObj){
        //   this.$router.push({
        //     name:orgObj,
        //     params:{
        //       orgObj:orgObj
        //     }
        //   })
        // }else{
        //   this.$message({
        //     type:"warning",
        //     message: '请先选择组织机构!'
        //   })
        // }

      },
      handleDelete(index, row) {
        this.$confirm('确认注销该用户吗?', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let params = {
            tenantId: this.tenantId,
            userIds: row.userId
          }
          api.post(api.ajaxUrl + '/upmsUser/deleteUser', params).then(res => {
            let data = res.data;
            if (data.code == 'success') {
              this.getUserList(0);
              this.$message({
                type: 'success',
                message: '注销成功!'
              });
            } else {
              this.$message({
                type: 'success',
                message: '注销失败!'
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      orgDel(node, orgObj) {
        this.$confirm('确认删除?', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let params = {
            tenantId: orgObj.tenantId,
            orgId: orgObj.orgId
          }
          api.post(api.ajaxUrl + "upmsOrg/deleteOrg", params).then(res => {
            if (res.data.code == "success") {
              this.ztreeObj = $.fn.zTree.getZTreeObj("treeDemo");
              var nodes = this.ztreeObj.getNodeByParam("id", orgObj.orgId, null);
              this.ztreeObj.removeNode(nodes);

              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'success',
                message: '删除失败!'
              });
            }
          })
        }).catch((err) => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })

      },
      closeBox() {
        this.menuVisible = false;
      },
      changeIcon(index, row) {
        console.log(this.$refs.table)
        // this.$refs.table
        this.islock = !this.islock;
        if (this.islock) {
          this.iconClass = 'el-icon-delete'
          this.iconCont = '已激活'
          row.status = 0;
        } else {
          this.iconClass = 'el-icon-edit'
          this.iconCont = '已锁定'
          row.status = 1;
        }
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      },
      changeUser(label) {
        this.setFlag = !this.setFlag;
        this.userStatus = label;
        this.pageNo = 1;
        this.getUserList(label);
      },
      statusEve: function (row, column, cellValue, index) {
        return row.status == 0 ? "已激活" : "待激活"
      },

      changePage: function (page) {
        this.pageNo = page
        this.getUserList(this.userStatus);
      },
      getUserList(userStatus) {
        this.isLoad = true;

        let params = {
          pageNum: this.pageNo,
          pageSize: this.pageSize,
          tenantId: this.tenantId,
          orgCode: this.orgCode,
          userStatus: userStatus
        }

        return api.post(api.ajaxUrl + "/upmsUser/queryUserList",
          params).then((res) => {
          if (!res.data) return;
          if (res.data != "" && res.data.code == "success") {
            this.isLoad = false;
            this.total = res.data.data.totalElements;
            this.tableData = res.data.data.content;
          }

        })
      },
      testT: function () {
        this.$nextTick(function () {
          if (this.markFloat == 1) {
            this.getUserList(this.userStatus);
          } else {

          }
        })
      }
    },
    watch: {
      tempTreeData: function (newValue, oldValue) {
        if (newValue != oldValue) {
          this.testT()
        }
      }
    },
    mounted() {
      //console.log($("#mu").find("#treeDemo").html())
      console.log($.fn.zTree)
      $.fn.zTree.init($("#treeDemo"), this.setting, this.treeNode);

    }

  };

</script>
<style>
  /* 组织机构tree */
  [v-cloak] {
    display: none;
  }

  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background: rgba(32, 160, 255, .5) !important;
  }

  .el-menu-item-group__title {
    padding: 0;
  }

</style>
<style lang="scss" scoped>
  .el-main {
    position: relative;
  }

  .el-pagination {
    height: 26px;
    position: fixed;
    bottom: 22px;
  }

  .tit {
    border-bottom: 1px solid #bfcbd9;
    margin: 0;
    line-height: 30px;
    padding: 0 10px 0 10px;
  }

  .r,
  .el-button-group {
    line-height: 40px;
  }

  .r {
    overflow: hidden;

    span {
      float: left;
    }

    .el-radio-group {
      float: right;
      line-height: 40px;

    }

    .addBtn {
      float: right;
      margin: 6px 0 0 10px;
    }

    .addBtn {
      float: right;
    }


  }

  .zTree .el-tree-node__content {
    background-color: red !important;
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
    height: calc(100vh - 141px);
  }

  //组织机构操作
  .orgBox {
    position: absolute;
    font-size: 12px;
    color: grey;
    border: 1px solid #ccc;
    text-align: center;
    padding: 0;
    width: 90px;
    background: #fff;
    z-index: 2;

    // left:56px;
    li {
      line-height: 23px;
      padding: 5px 0px;
      width: 100%;
      cursor: pointer;

      a {
        width: 100%;
        display: inline-block;
        color: grey;
      }

      :hover {
        background: #eee;
      }
    }
  }

  .closeBox {
    width: 100%;
    height: 100%;
  }

  .el-main {
    background-color: #fff;
    color: #333;
    border: 1px solid #bfcbd9;
    margin: 10px;
    padding: 0;
    height: calc(100vh - 141px);
  }

</style>
