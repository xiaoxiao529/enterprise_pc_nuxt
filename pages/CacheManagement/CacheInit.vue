<template>
  <div>
    <el-container>
      <el-main>
        <el-row class="header" :gutter="10">
          <el-col :span="5" class="title">
            <span>缓存类</span>
          </el-col>
          <!--<el-col :span="19" class="right">
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleUserClick('add')">添加系统</el-button>
          </el-col>
          -->
        </el-row>
        <!--列表-->
        <el-row class="body">
          <div class="userNotab">
            <el-table ref="table" :data="tableData" v-loading="isLoading"  style="width: 100%;" height="100%" >
              <el-table-column label="类名" prop="className" type="index" width="300"></el-table-column>
              <el-table-column label="描述" prop="description"></el-table-column>
              <el-table-column label="启动自执行" prop="isinit" show-overflow-tooltip ></el-table-column>
              <el-table-column label="运行" prop="isinitDesc" v-if="cloShow" show-overflow-tooltip></el-table-column>
            </el-table>
            <!-- FIXME: 样式修复 2018年12月14日     -->
            <Pagination class="userPage" :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />

          </div>
        </el-row>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import api from "~/config/http";
  import Mock from "mockjs";
  // import qs from "qs";
  import ModifyUser from "~/components/SystemManagement/UserManagement/ModifyUser";
  import ModifyRoleUser from "~/components/SystemManagement/UserManagement/ModifyRoleUser";
  import AddUser from "~/components/SystemManagement/UserManagement/AddUser";
  import RefuseUser from "~/components/SystemManagement/UserManagement/RefuseUser";
  import Pagination from "~/components/Pagination"
  import "~/assets/css/style.css";
  import "~/assets/css/ggicon.css";
  /* 本地数据开始 */
  const Random = Mock.Random;
  //数结构
  const loginData = function () {
    let newArticleObject = {
      status: "OK",
      code: "success",
      message: "",
      data: [{
        orgName: "全部",
        parentCode: "-1",
        orgCode: "1",
        tenantId: "1",
        leaf: false,
        orgId: "1"
      }],
      token: "",
      refreshToken: "",
      dataType: "json"
    };
    return newArticleObject;
  };

  export default {
    components: {
      ModifyUser,
      ModifyRoleUser,
      AddUser,
      RefuseUser,
      Pagination
    },

    data() {
      ///upmsUser/queryUserList
      return {
        ACCEPT_URL: "/user/acceptOrRefuse",
        tenantId: "",
        isLoading:false,
        orgCode: "", //组织机构编码
        cloShow: true, //隐藏不显示的列
        userStatus: "0",
        setFlag: true,
        searchUserName: "",
        flag: true,
        firstLevel: false,
        menuVisible: false,
        markFloat: 1,
        iconClass: "el-icon-delete",
        iconCont: "已激活",
        orgObj: "",
        keys: [],
        node: "",
        widgetInfo: {
          pageSize: 6,
          pageNo: 1,
          list: [],
          total:0,
          fileName:'',
          key:''
        },
        pageNo: 1,
        pageSize: 15,
        total: 0,
        islock: true,
        props: {
          label: "orgName",
          children: "zones",
          isLeaf: "leaf"
        },

        defaultProps: {
          children: "children",
          label: "label"
        },

        tableData: [],
        tempTreeData: []
      };
    },

    mounted() {
      //this.getTables();
    },

    methods: {
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        //this.getTables();
      },
      getTables() {//cache/cacheClassList.mvc
        this.isLoading = true;
        api.post(api.forent_url.base_url + '/cache/cacheClassList.mvc', {
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          //proprietorId:api.getGlobalVal('userObj').orgCode,
          //accidentTimeStart: this.dateTime === '' || this.dateTime === null? "" :this.dateTime[0] + ''+ '00:00:00' ,
          //accidentTimeEnd: this.dateTime === '' || this.dateTime === null? "" :this.dateTime[1] + ''+ '23:59:59' ,
          //build: this.formInline.buildId,
          //accidentTimeEndBind:this.dateTime ? new Date(this.dateTime === '' || this.dateTime === null? "":this.dateTime[0] ) + ',' + new Date( this.dateTime === '' || this.dateTime === null? "" :this.dateTime[1]):'' ,
        },5000).then(res => {
          if (res.code === "success" ) {
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.list = res.data.rows;
            this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
          }else {
            this.isLoading = false;
            this.tableData = [];
            //this.widgetInfo.list = res.data.rows;
            this.widgetInfo.total = 0;
            //console.log('没有数值。。。。。')
          }
        }).catch(err => {
          this.isLoading = false;
          console.log(err);
          this.$message(
              { type:'warning',
                message:"加载超时,请重新加载!"});
        })
      },
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

  // .l-icon {
  //     i {
  //         font-size: 2rem;
  //         color: #2892e2;
  //     }
  // }

  .l-icons {
    font-size: 2rem;
    cursor: pointer;
    color: #2892e2;
  }

  .el-container {
    height: calc(100vh - 75px);
    overflow:hidden;
    /* 左侧侧栏 */
    .el-aside {
      background-color: #fff;
      color: #333;
      border: 1px solid #bfcbd9;
      margin: 10px 10px 0 0;
      height: calc(100% - 13px);

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
        }

        /* 右键菜单 */
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
          border:none;
          .el-pagination {

            // text-align: right;
            height: 100%;
          }
        }
        .userPage{

        }

      }

      .is-ableClick {
        cursor: pointer;
      }

      .table-row {
        height: 46px;
      }

    }

    .left {
      // float: left;
      text-align: left;
    }

  }

  // .r,
  // .el-button-group {
  //     line-height: 40px;
  // }

  // .r {
  //     overflow: hidden;

  //     // span {
  //     //     float: left;
  //     // }

  //     // .el-radio-group {
  //     //     float: right;
  //     //     line-height: 40px;
  //     // }

  //     // .addBtn {
  //     //     float: right;
  //     //     margin: 6px 0 0 10px;
  //     // }

  //     // .addBtn {
  //     //     float: right;
  //     // }
  // }

  // .zTree .el-tree-node__content {
  //     background-color: red !important;
  // }

  // .el-button--mini,
  // .el-button--small {
  //     padding: 5px;
  //     margin: 2px;
  // }
</style>
