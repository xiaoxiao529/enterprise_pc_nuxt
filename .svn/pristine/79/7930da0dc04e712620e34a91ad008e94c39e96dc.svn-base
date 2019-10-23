<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <div class="closeBox" @click="closeBox()">
          <p class="tit">组织机构</p>
          <!-- :default-checked-keys="[1]" :default-expanded-keys="[1]" @node-expand="handleNodeClick"-->
          <el-tree ref="tree" class="zTree" v-cloak :props="props" :load="loadNode" lazy node-key="orgCode" accordion
            @node-click="handleNodeClick" @node-contextmenu="hanleContextmenu" @remove="removeTree" :highlight-current="flag">
          </el-tree>
          <ul v-show="menuVisible" id="menu" class="orgBox" ref="menu">
            <li>
              <!--  @click="addUserEve()" -->
              <nuxt-link :to="{'name':'authManagement-user-orgAdd','params':{'orgObj':orgObj}}">添加</nuxt-link>
            </li>
            <li v-show="firstLevel">
              <nuxt-link :to="{'name':'authManagement-user-orgEdit','params':{'orgObj':orgObj}}">修改</nuxt-link>
            </li>
            <li @click="orgDel(node,orgObj)" v-show="firstLevel">删除</li>
          </ul>
        </div>
      </el-aside>
      <el-main>
        <div class="tit r">
          <span>用户管理</span>
          <nuxt-link :to="{'name':'authManagement-user-add','params':{'orgObj':orgObj}}">
            <el-button class="addBtn" size="mini" type="primary" icon="el-icon-plus">新增用户</el-button>
          </nuxt-link>
          <el-radio-group  v-model.trim="userStatus" @change="changeUser" size="mini">
            <el-radio-button label="0">活动用户</el-radio-button>
            <el-radio-button label="1">注销用户</el-radio-button>
          </el-radio-group>
          <!-- <el-button-group >
            <el-button @click="userChange()" :type="btnType" >活动用户</el-button>
            <el-button @click="userChange()" type="">注销用户</el-button>
          </el-button-group> -->
        </div>
        <!--列表-->
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
        <el-pagination small layout="prev, pager, next" @current-change="changePage" :current-page="pageNo" :page-size="pageSize"
          :total="total">
        </el-pagination>
        <!-- <input type="hidden" :value="pageNo" name="pageNo">
        <input type="hidden" :value="pageSize" name="pageSize"> -->
      </el-main>

    </el-container>
  </div>
</template>
<script>
  import api from '~/config/http'
  import Mock from "mockjs"
  import qs from 'qs';

  /* 本地数据开始 */
  const Random = Mock.Random;
  //数结构
  const loginData = function () {
    let newArticleObject = {
      "status": "OK",
      "code": "success",
      "message": "",
      "data": [{
        "orgName": "全部",
        "parentCode": "-1",
        "orgCode": "1",
        "tenantId": "1",
        "leaf": false,
        "orgId": "1"
      }],
      "token": "",
      "refreshToken": "",
      "dataType": "json"

    }
    return newArticleObject
  }

  
if(!api.isOnline){
    Mock.mock(RegExp(api.ajaxUrl + '/upmsOrg/findUpmsOrgTree' + ".*"), 'post', loginData);
    Mock.mock(RegExp(api.ajaxUrl + '/upmsUser/queryUserList' + ".*"), 'post', {
      "status": "OK",
      "code": "success",
      "message": "",
      "data": {
        "content|3-10": [{
          "userId|+1": "1",
          "loginName": "@name",
          "password": "Y13RNmw6TBE=",
          "userName": "@cname",
          "userSex": "0",
          "userEmail": "@email",
          "userPhone":  /\d{11}/,
          "createDate": "@date",
          "userType": "0",
          "userPhoto": "",
          "status": "0",
          "tenantId|+1": "1",
          "orgCode|+1": "1",
          "extendstr1": "",
          "extendstr2": "",
          "extendstr3": ""
        }],
        "last": true,
        "totalPages": 1,
        "totalElements": 10,
        "number": 0,
        "size": 15,
        "sort": [{
          "direction": "DESC",
          "property": "createDate",
          "ignoreCase": false,
          "nullHandling": "NATIVE",
          "ascending": false,
          "descending": true
        }],
        "first": true,
        "numberOfElements": 1
      },
      "token": "",
      "refreshToken": "",
      "dataType": "json"
    });
}


  export default {
    data() {
      ///upmsUser/queryUserList
      return {
        tenantId: '',
        orgCode: '', //组织机构编码
        cloShow: false, //隐藏不显示的列
        userStatus: '0',
        setFlag: true,
        flag: true,
        firstLevel: false,
        menuVisible: false,
        markFloat: 1,
        iconClass: 'el-icon-delete',
        iconCont: '已激活',
        orgObj: '',
        keys: [],
        node: '',
        pageNo: 1,
        pageSize: 15,
        total: 0,
        islock: true,
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
        tempTreeData: []

      };
    },
    methods: {
      addUpdate(name,orgObj,rowObj){
        if(JSON.stringify(this.orgObj) == "{}"){
           this.$message({
            type:"warning",
            message: '请先选择组织机构!'
          })
        }else{
          var params = {}
          if(rowObj){
            params = {
              orgObj:orgObj,
              rowObj:rowObj?rowObj:null
            }
          }else{
            params = {
              orgObj:orgObj
            }
          }
           this.$router.push({
            name:name,
            params:params
          })
        }
      },
      handleEdit(index, row) {
        console.log(index, row);
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
      handleNodeClick(data, obj, node) {
        this.tenantId = data.tenantId;
        this.orgCode = data.orgCode;
        this.orgObj = data;
        this.flag = true;
        this.markFloat = obj.id;
        this.keys = data.parentCode;
        if (obj.id != 1) {
          this.getUserList(this.userStatus);
        } else {
          this.orgCode = "";
          this.getUserList(this.userStatus);
        }
      },
      hanleContextmenu(event, obj, node, self) {
        this.menuVisible = true;
        this.firstLevel = node.level === 1 ? false : true;
        let menu = document.querySelector("#menu");
        menu.style.left = event.clientX + 20 + "px";
        menu.style.top = event.clientY - 60 + "px";
        this.orgCode = obj.orgCode;
        this.keys = obj.parentCode;
        this.orgObj = obj;
        this.node = node;

      },
      removeTree(node, data) {
        // debugger
        //  const parent = node.parent;
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
        // debugger
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
              var inn = 0;;
              for (var i = 0; i < this.tempTreeData.length; i++) {
                if (this.tempTreeData[i].tenantId == orgObj.tenantId && this.tempTreeData[i].orgId == orgObj.orgId) {
                  inn = i;
                }
              }
              this.tempTreeData.splice(inn, 1);
              this.$refs.tree.updateKeyChildren([this.keys], this.tempTreeData)
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
      //ztree
      async loadNode(node, resolve) {
        var that = this;
        let paramsChild = {
          tenantId: node.level === 0 ? '' : node.data.tenantId,
          parentCode: node.level === 0 ? -1 : node.data.orgCode,
          userId: 0
        }
        await api.post(api.ajaxUrl + "/upmsOrg/findUpmsOrgTree", paramsChild).then((res) => {
          if (res.data.code == "success") {
            if (!res.data) return;
            that.tempTreeData = res.data.data;
            this.tenantId = res.data.data[0].tenantId;
            this.orgCode = res.data.data[0].orgCode;
            this.orgObj = res.data.data[0];
            return resolve(that.tempTreeData);

          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '加载失败'
          })
        })
        // await this.getUserList(this.userStatus);
      },
      changePage: function (page) {
        this.pageNo = page
        this.getUserList(this.userStatus);
      },
      getUserList(userStatus) {
        let params = {
          pageNum: this.pageNo,
          pageSize: this.pageSize,
          tenantId: this.tenantId,
          orgCode: this.orgCode,
          userStatus: userStatus
        }
        console.log("aaaa：" + api.ajaxUrl)
        return api.post(api.ajaxUrl + "/upmsUser/queryUserList",
          params).then((res) => {
          if (!res.data) return;
          this.total = res.data.data.totalElements;
          this.tableData = res.data.data.content;
          this.listLoading = false;
        })
      },
      testT: function () {
        this.$nextTick(function () {
          if (this.markFloat == 1) {
            document.getElementsByClassName('el-tree-node')[0].classList.add('is-current');
            this.orgCode = "";
            this.getUserList(this.userStatus);
          } else {
            document.getElementsByClassName('el-tree-node')[0].classList.remove('is-current');
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
    position: fixed;
    bottom: 19px;
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
